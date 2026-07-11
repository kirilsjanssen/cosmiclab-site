(() => {
  'use strict';

  const api = window.GromvexStudio;
  const server = window.GromvexServer;
  const serverMode = Boolean(server?.isServerMode?.());
  if (!api || (!serverMode && !window.indexedDB)) {
    console.warn('Gromvex assets module: storage or studio API is unavailable.');
    return;
  }

  const DB_NAME = 'gromvex_movie_assets_v03';
  const DB_VERSION = 1;
  const STORE = 'assets';
  const MAX_FILE_SIZE = 300 * 1024 * 1024;
  const objectUrls = new Map();
  let dbPromise = null;
  let currentContext = null;
  let previewAssetId = null;
  let decorateTimer = 0;
  let libraryAssets = [];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
  const uid = (prefix = 'asset') => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;

  const els = {
    assetDialog: $('#assetDialog'),
    assetTitle: $('#assetDialogTitle'),
    assetKicker: $('#assetDialogKicker'),
    assetOwnerLabel: $('#assetDialogOwnerLabel'),
    assetChooseBtn: $('#assetChooseBtn'),
    assetFileInput: $('#assetFileInput'),
    assetDropzone: $('#assetDropzone'),
    assetStatus: $('#assetDialogStatus'),
    assetList: $('#assetDialogList'),
    previewDialog: $('#assetPreviewDialog'),
    previewTitle: $('#assetPreviewTitle'),
    previewHost: $('#assetPreviewHost'),
    previewDownloadBtn: $('#assetPreviewDownloadBtn')
  };

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.objectStoreNames.contains(STORE)
          ? request.transaction.objectStore(STORE)
          : db.createObjectStore(STORE, { keyPath: 'id' });
        if (!store.indexNames.contains('projectId')) store.createIndex('projectId', 'projectId', { unique: false });
        if (!store.indexNames.contains('ownerKey')) store.createIndex('ownerKey', 'ownerKey', { unique: false });
        if (!store.indexNames.contains('createdAt')) store.createIndex('createdAt', 'createdAt', { unique: false });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return dbPromise;
  }

  async function tx(mode, action) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, mode);
      const store = transaction.objectStore(STORE);
      let result;
      try { result = action(store); } catch (error) { reject(error); return; }
      transaction.oncomplete = () => resolve(result?.result ?? result);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error || new Error('IndexedDB transaction aborted'));
    });
  }

  async function putAsset(record) {
    if (serverMode) return server.uploadAsset(record);
    return tx('readwrite', store => store.put(record));
  }

  async function getAsset(id) {
    if (serverMode) return server.getAsset(id);
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const request = db.transaction(STORE, 'readonly').objectStore(STORE).get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async function deleteAssetRecord(id) {
    if (serverMode) return server.deleteAsset(id);
    return tx('readwrite', store => store.delete(id));
  }

  async function listProjectAssets(projectId) {
    if (serverMode) return server.listAssets(projectId);
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const store = db.transaction(STORE, 'readonly').objectStore(STORE);
      const index = store.index('projectId');
      const request = index.getAll(IDBKeyRange.only(projectId));
      request.onsuccess = () => resolve((request.result || []).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      request.onerror = () => reject(request.error);
    });
  }

  async function listOwnerAssets(projectId, ownerType, ownerId) {
    if (serverMode) return server.listAssets(projectId, ownerType, ownerId);
    const ownerKey = `${projectId}:${ownerType}:${ownerId}`;
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const store = db.transaction(STORE, 'readonly').objectStore(STORE);
      const index = store.index('ownerKey');
      const request = index.getAll(IDBKeyRange.only(ownerKey));
      request.onsuccess = () => resolve((request.result || []).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      request.onerror = () => reject(request.error);
    });
  }

  function project() { return api.activeProject(); }
  function scene() { return api.activeScene(); }
  function projectId() { return project().id; }
  function ownerKey(type, id, pid = projectId()) { return `${pid}:${type}:${id}`; }

  function context(type, id, label) {
    return { projectId: projectId(), ownerType: type, ownerId: String(id), ownerLabel: label || labelForOwner(type, id) };
  }

  function labelForOwner(type, id) {
    const p = project();
    if (type === 'project') return `Проект: ${p.title}`;
    if (type === 'character') return `Персонаж: ${p.characters.find(item => item.id === id)?.name || 'Новый персонаж'}`;
    if (type === 'location') return `Локация: ${p.locations.find(item => item.id === id)?.name || 'Новая локация'}`;
    if (type === 'scene') {
      const item = p.scenes.find(sceneItem => sceneItem.id === id);
      return item ? `Сцена ${item.number}: ${item.title}` : 'Новая сцена';
    }
    if (type === 'prompt') return `Промт: ${String(id).split(':').at(-1)}`;
    if (type === 'frame') return `Кадр ${String(id).split(':').at(-1)}`;
    if (type === 'section') return `Раздел: ${sectionLabel(id)}`;
    return 'Ассеты проекта';
  }

  function sectionLabel(id) {
    return ({
      overview: 'Обзор', world: 'Библия мира', structure: 'Структура', script: 'Сценарий',
      characters: 'Персонажи', locations: 'Локации', scenes: 'Сцены', prompts: 'Промты',
      renders: 'Рендеры', editing: 'Монтаж', export: 'Экспорт', settings: 'Настройки',
      synopsis: 'Синопсис', overviewStructure: 'Структура проекта', overviewCharacters: 'Ключевые персонажи',
      overviewScenes: 'Последние сцены', overviewMeta: 'Параметры проекта'
    })[id] || id;
  }

  function formatBytes(bytes = 0) {
    if (bytes < 1024) return `${bytes} Б`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} КБ`;
    if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(bytes < 10 * 1024 ** 2 ? 1 : 0)} МБ`;
    return `${(bytes / 1024 ** 3).toFixed(2)} ГБ`;
  }

  function fileKind(mime = '', name = '') {
    const lower = name.toLowerCase();
    if (mime.startsWith('image/')) return 'image';
    if (mime.startsWith('video/')) return 'video';
    if (mime.startsWith('audio/')) return 'audio';
    if (mime.includes('pdf') || mime.startsWith('text/') || /\.(txt|md|json|srt|vtt|docx?|rtf|csv)$/i.test(lower)) return 'document';
    return 'other';
  }

  function kindIcon(kind, mime = '') {
    if (kind === 'image') return '🖼️';
    if (kind === 'video') return '🎬';
    if (kind === 'audio') return '🎵';
    if (mime.includes('pdf')) return '📕';
    if (kind === 'document') return '📄';
    return '📦';
  }

  function objectUrlFor(asset) {
    if (asset?.contentUrl) return asset.contentUrl;
    if (!asset?.blob) return '';
    if (!objectUrls.has(asset.id)) objectUrls.set(asset.id, URL.createObjectURL(asset.blob));
    return objectUrls.get(asset.id);
  }

  function revokeObjectUrl(id) {
    const url = objectUrls.get(id);
    if (url) URL.revokeObjectURL(url);
    objectUrls.delete(id);
  }

  function assetThumbHtml(asset) {
    const kind = fileKind(asset.mime, asset.name);
    const url = objectUrlFor(asset);
    if (kind === 'image') return `<div class="asset-thumb"><img src="${url}" alt="${escapeHtml(asset.name)}" loading="lazy"></div>`;
    if (kind === 'video') return `<div class="asset-thumb"><video src="${url}" muted preload="metadata"></video><span class="asset-media-badge">▶</span></div>`;
    if (kind === 'audio') return `<div class="asset-thumb"><span>${kindIcon(kind)}</span><audio src="${url}" controls preload="metadata"></audio></div>`;
    return `<div class="asset-thumb"><span>${kindIcon(kind, asset.mime)}</span></div>`;
  }

  function assetCardHtml(asset, compact = false) {
    if (compact) {
      return `<button type="button" class="dialog-asset-mini" data-asset-preview="${asset.id}" title="${escapeHtml(asset.name)}">
        ${assetThumbHtml(asset)}<strong>${escapeHtml(asset.name)}</strong>
      </button>`;
    }
    return `<article class="asset-item" data-asset-card="${asset.id}">
      ${assetThumbHtml(asset)}
      <div class="asset-item-copy"><strong title="${escapeHtml(asset.name)}">${escapeHtml(asset.name)}</strong><small>${formatBytes(asset.size)} · ${escapeHtml(asset.mime || 'файл')}</small></div>
      <div class="asset-actions"><button type="button" data-asset-preview="${asset.id}">Открыть</button><button type="button" data-asset-download="${asset.id}">Скачать</button><button type="button" class="asset-delete" data-asset-delete="${asset.id}" title="Удалить">×</button></div>
    </article>`;
  }

  async function openAssetDialog(ctx) {
    currentContext = ctx;
    els.assetKicker.textContent = ctx.ownerType === 'project' ? 'Ассеты проекта' : 'Прикреплённые материалы';
    els.assetTitle.textContent = ctx.ownerLabel;
    els.assetOwnerLabel.textContent = serverMode ? 'Файлы сохраняются в защищённом хранилище сервера' : 'Файлы сохраняются локально в этом браузере';
    els.assetStatus.textContent = '';
    if (!els.assetDialog.open) els.assetDialog.showModal();
    await renderAssetDialogList();
  }

  async function renderAssetDialogList() {
    if (!currentContext) return;
    els.assetList.innerHTML = '<div class="asset-empty">Загружаю файлы...</div>';
    try {
      const assets = await listOwnerAssets(currentContext.projectId, currentContext.ownerType, currentContext.ownerId);
      els.assetList.innerHTML = assets.length ? assets.map(asset => assetCardHtml(asset)).join('') : '<div class="asset-empty">Здесь пока нет файлов. Нажми «Выбрать файлы» или перетащи их в область выше.</div>';
      els.assetStatus.textContent = assets.length ? `${assets.length} файл(ов), общий размер ${formatBytes(assets.reduce((sum, item) => sum + item.size, 0))}` : 'Можно добавлять несколько файлов сразу.';
    } catch (error) {
      console.error(error);
      els.assetList.innerHTML = '<div class="asset-empty">Не удалось прочитать локальное хранилище.</div>';
    }
  }

  async function uploadFiles(files) {
    if (!currentContext || !files?.length) return;
    const valid = Array.from(files).filter(Boolean);
    let completed = 0;
    for (const file of valid) {
      if (file.size > MAX_FILE_SIZE) {
        api.toast(`Файл «${file.name}» больше 300 МБ`, 'error');
        continue;
      }
      els.assetStatus.textContent = `Сохраняю ${completed + 1} из ${valid.length}: ${file.name}`;
      const record = {
        id: uid(),
        projectId: currentContext.projectId,
        ownerType: currentContext.ownerType,
        ownerId: currentContext.ownerId,
        ownerKey: ownerKey(currentContext.ownerType, currentContext.ownerId, currentContext.projectId),
        ownerLabel: currentContext.ownerLabel,
        name: file.name,
        mime: file.type || 'application/octet-stream',
        size: file.size,
        lastModified: file.lastModified || Date.now(),
        createdAt: new Date().toISOString(),
        blob: file
      };
      try {
        await putAsset(record);
        completed += 1;
      } catch (error) {
        console.error(error);
        api.toast(`Не удалось сохранить «${file.name}». Возможно, закончилось место.`, 'error');
      }
    }
    els.assetFileInput.value = '';
    await renderAssetDialogList();
    await refreshAllAssetUi();
    if (completed) api.toast(`Добавлено файлов: ${completed}`);
  }

  async function deleteAssetById(id) {
    const asset = await getAsset(id);
    if (!asset) return;
    if (!window.confirm(`Удалить ассет «${asset.name}»?`)) return;
    await deleteAssetRecord(id);
    revokeObjectUrl(id);
    if (currentContext && els.assetDialog.open) await renderAssetDialogList();
    await refreshAllAssetUi();
    api.toast('Ассет удалён');
  }

  async function downloadAssetById(id) {
    const asset = await getAsset(id);
    if (!asset) return;
    const link = document.createElement('a');
    link.href = objectUrlFor(asset);
    link.download = asset.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function previewAssetById(id) {
    const asset = await getAsset(id);
    if (!asset) return;
    previewAssetId = id;
    els.previewTitle.textContent = asset.name;
    els.previewHost.innerHTML = '';
    const kind = fileKind(asset.mime, asset.name);
    const url = objectUrlFor(asset);
    if (kind === 'image') els.previewHost.innerHTML = `<img src="${url}" alt="${escapeHtml(asset.name)}">`;
    else if (kind === 'video') els.previewHost.innerHTML = `<video src="${url}" controls autoplay></video>`;
    else if (kind === 'audio') els.previewHost.innerHTML = `<audio src="${url}" controls autoplay></audio>`;
    else if (asset.mime.includes('pdf')) els.previewHost.innerHTML = `<iframe src="${url}" title="${escapeHtml(asset.name)}"></iframe>`;
    else if (asset.mime.startsWith('text/') || /\.(txt|md|json|srt|vtt|csv)$/i.test(asset.name)) {
      const text = asset.blob ? await asset.blob.text() : await fetch(url, { credentials: 'same-origin' }).then(response => response.text());
      els.previewHost.innerHTML = `<pre>${escapeHtml(text.slice(0, 300000))}</pre>`;
    } else {
      els.previewHost.innerHTML = `<div class="asset-empty"><div style="font-size:54px">${kindIcon(kind, asset.mime)}</div><h3>${escapeHtml(asset.name)}</h3><p>${formatBytes(asset.size)} · Предпросмотр этого формата недоступен, но файл можно скачать.</p></div>`;
    }
    if (!els.previewDialog.open) els.previewDialog.showModal();
  }

  function ensureDraftOwner(type) {
    const map = {
      character: ['#characterId', 'char'],
      location: ['#locationId', 'loc'],
      scene: ['#sceneId', 'scene']
    };
    const [selector, prefix] = map[type] || [];
    const input = selector ? $(selector) : null;
    if (!input) return '';
    if (!input.value) input.value = uid(`${prefix}_draft`);
    return input.value;
  }

  function dialogContext(type) {
    const id = ensureDraftOwner(type);
    return context(type, id, labelForOwner(type, id));
  }

  async function renderDialogAssetZones() {
    const configs = [
      ['character', '#characterDialog', '#characterId', '#characterAssetList'],
      ['location', '#locationDialog', '#locationId', '#locationAssetList'],
      ['scene', '#sceneDialog', '#sceneId', '#sceneAssetList']
    ];
    for (const [type, dialogSelector, idSelector, listSelector] of configs) {
      const dialog = $(dialogSelector);
      const list = $(listSelector);
      if (!dialog?.open || !list) continue;
      const id = ensureDraftOwner(type);
      const assets = await listOwnerAssets(projectId(), type, id);
      list.innerHTML = assets.length ? assets.slice(0, 8).map(asset => assetCardHtml(asset, true)).join('') : '<small>Ассеты ещё не добавлены.</small>';
      const button = $(`.dialog-asset-add[data-dialog-owner="${type}"]`, dialog);
      if (button) button.innerHTML = `📎 Добавить с компьютера${assets.length ? ` <span class="inline-asset-count">${assets.length}</span>` : ''}`;
    }
  }

  function createPin(type, id, label, className = '') {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `asset-pin ${className}`.trim();
    button.dataset.assetOwnerType = type;
    button.dataset.assetOwnerId = String(id);
    button.dataset.assetOwnerLabel = label;
    button.dataset.tooltip = 'Прикрепить ассет';
    button.title = `Прикрепить ассет — ${label}`;
    button.setAttribute('aria-label', `Прикрепить ассет — ${label}`);
    button.innerHTML = `
      <span class="asset-pin-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false"><path d="M8.8 12.8 14.9 6.7a3.3 3.3 0 1 1 4.7 4.7l-8.3 8.3a5.1 5.1 0 0 1-7.2-7.2l8.1-8.1a2.9 2.9 0 0 1 4.1 4.1l-8 8a1.2 1.2 0 0 1-1.7-1.7l7.2-7.2"/></svg>
      </span>
      <span class="asset-count" hidden></span>`;
    return button;
  }

  function appendHeaderPin(card, type, id, label) {
    if (!card || card.querySelector(`:scope > .card-header [data-asset-owner-type="${type}"][data-asset-owner-id="${CSS.escape(String(id))}"]`)) return;
    const header = card.querySelector(':scope > .card-header');
    if (!header) {
      card.append(createPin(type, id, label, 'card-asset-pin'));
      return;
    }
    const pin = createPin(type, id, label);
    const action = header.querySelector(':scope > button:last-child');
    if (action) header.insertBefore(pin, action);
    else header.append(pin);
  }

  function removeLegacyPins() {
    $$('.entity-actions > .asset-pin, .scene-card-actions > .asset-pin').forEach(pin => pin.remove());
  }

  function decorateView() {
    const p = project();
    const activeView = api.getState().activeView || 'overview';
    removeLegacyPins();

    const pageHeader = $('.view-page-header');
    if (pageHeader && !pageHeader.querySelector('.page-asset-btn') && !pageHeader.closest('[data-assets-page]')) {
      const button = createPin('section', activeView, `Раздел: ${sectionLabel(activeView)}`, 'page-asset-btn');
      const actionArea = pageHeader.lastElementChild;
      if (actionArea?.tagName === 'BUTTON') {
        const group = document.createElement('div');
        group.className = 'view-header-actions';
        actionArea.replaceWith(group);
        group.append(button, actionArea);
      } else {
        const group = document.createElement('div');
        group.className = 'view-header-actions';
        group.append(button);
        pageHeader.append(group);
      }
    }

    const overviewSections = [
      ['.synopsis-card', 'synopsis'], ['.structure-card', 'overviewStructure'], ['.characters-card', 'overviewCharacters'],
      ['.scenes-card', 'overviewScenes']
    ];
    overviewSections.forEach(([selector, id]) => {
      const card = $(selector);
      if (!card) return;
      appendHeaderPin(card, 'section', id, `Раздел: ${sectionLabel(id)}`);
    });
    const meta = $('.meta-strip');
    if (meta && !meta.querySelector(':scope > .card-asset-pin')) meta.append(createPin('section', 'overviewMeta', `Раздел: ${sectionLabel('overviewMeta')}`, 'card-asset-pin'));

    $$('[data-open-character]').forEach(card => {
      const id = card.dataset.openCharacter;
      if (!id || card.querySelector(`:scope > [data-asset-owner-type="character"]`)) return;
      card.append(createPin('character', id, labelForOwner('character', id), 'card-asset-pin'));
    });

    $$('[data-open-location]').forEach(card => {
      const id = card.dataset.openLocation;
      if (!id || card.querySelector(`:scope > [data-asset-owner-type="location"]`)) return;
      card.append(createPin('location', id, labelForOwner('location', id), 'card-asset-pin'));
    });

    $$('.scene-card[data-scene-id]').forEach(card => {
      const id = card.dataset.sceneId;
      if (!id || card.querySelector(`:scope > [data-asset-owner-type="scene"]`)) return;
      card.append(createPin('scene', id, labelForOwner('scene', id), 'card-asset-pin'));
    });

    $$('.scene-table tr[data-scene-id]').forEach(row => {
      const id = row.dataset.sceneId;
      if (!id || row.querySelector(`[data-asset-owner-type="scene"]`)) return;
      const cell = row.lastElementChild;
      if (cell) cell.append(createPin('scene', id, labelForOwner('scene', id), 'table-asset-pin'));
    });

    $$('.prompt-engine-card').forEach((card, index) => {
      if (card.querySelector(`[data-asset-owner-type="prompt"]`)) return;
      const textarea = card.querySelector('[data-prompt-engine]');
      const engine = textarea?.dataset.promptEngine || ['seedance', 'kling', 'luma'][index] || `engine${index + 1}`;
      const sceneId = scene()?.id || p.id;
      const id = `${sceneId}:${engine}`;
      const head = card.querySelector('.prompt-engine-head, .card-header') || card;
      head.append(createPin('prompt', id, `Промт: ${engine}`));
    });

    $$('.story-card').forEach((card, index) => {
      if (card.querySelector(`[data-asset-owner-type="frame"]`)) return;
      const number = card.querySelector('.story-number')?.textContent?.trim() || String(index + 1);
      const id = `${scene()?.id || p.id}:${number}`;
      card.append(createPin('frame', id, `Кадр ${number}`));
    });

    $$('.render-card').forEach((card, index) => {
      if (card.querySelector(`[data-asset-owner-type="frame"]`)) return;
      const number = String(index + 1);
      const id = `${scene()?.id || p.id}:${number}`;
      card.append(createPin('frame', id, `Кадр ${number}`));
    });

    renderDialogAssetZones().catch(console.error);
    refreshPinCountsAndThumbs().catch(console.error);
    if ($('#projectAssetGrid')) hydrateAssetLibrary().catch(console.error);
  }

  function scheduleDecorate() {
    clearTimeout(decorateTimer);
    decorateTimer = window.setTimeout(decorateView, 40);
  }

  async function refreshPinCountsAndThumbs() {
    const assets = await listProjectAssets(projectId());
    const byOwner = new Map();
    for (const asset of assets) {
      if (!byOwner.has(asset.ownerKey)) byOwner.set(asset.ownerKey, []);
      byOwner.get(asset.ownerKey).push(asset);
    }

    $$('.asset-pin').forEach(pin => {
      const key = ownerKey(pin.dataset.assetOwnerType, pin.dataset.assetOwnerId);
      const count = byOwner.get(key)?.length || 0;
      let badge = pin.querySelector('.asset-count');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'asset-count';
        pin.append(badge);
      }
      badge.textContent = String(count);
      badge.hidden = !count;
      pin.classList.toggle('has-assets', count > 0);
      pin.dataset.tooltip = count ? `Прикреплённые ассеты: ${count}` : 'Прикрепить ассет';
    });

    const firstImage = (type, id) => (byOwner.get(ownerKey(type, id)) || []).find(item => fileKind(item.mime, item.name) === 'image');
    const setBackground = (node, asset, className = 'asset-hero-applied') => {
      if (!node) return;
      if (asset) {
        node.style.backgroundImage = `url("${objectUrlFor(asset)}")`;
        node.classList.add(className);
      } else {
        node.style.removeProperty('background-image');
        node.classList.remove(className);
      }
    };

    project().characters.forEach(item => {
      const asset = firstImage('character', item.id);
      $$(`[data-open-character="${CSS.escape(item.id)}"] .entity-avatar`).forEach(node => setBackground(node, asset));
    });

    project().locations.forEach(item => {
      const asset = firstImage('location', item.id);
      $$(`[data-open-location="${CSS.escape(item.id)}"] .location-thumb`).forEach(node => setBackground(node, asset));
    });

    project().scenes.forEach(item => {
      const asset = firstImage('scene', item.id);
      $$(`.scene-card[data-scene-id="${CSS.escape(item.id)}"]`).forEach(card => {
        let preview = card.querySelector(':scope > .scene-asset-preview');
        if (asset && !preview) {
          preview = document.createElement('span');
          preview.className = 'scene-asset-preview';
          const copy = card.querySelector('.scene-card-copy');
          if (copy) card.insertBefore(preview, copy);
          else card.append(preview);
        }
        if (preview) setBackground(preview, asset, 'asset-hero-applied');
        if (!asset && preview) preview.remove();
        card.classList.toggle('scene-has-asset', Boolean(asset));
      });
    });

    $$('.prompt-engine-card').forEach((card, index) => {
      const textarea = card.querySelector('[data-prompt-engine]');
      const engine = textarea?.dataset.promptEngine || ['seedance', 'kling', 'luma'][index] || `engine${index + 1}`;
      const id = `${scene()?.id || project().id}:${engine}`;
      const asset = firstImage('prompt', id);
      const head = card.querySelector('.prompt-engine-head, .card-header');
      if (!head) return;
      let preview = head.querySelector('.prompt-asset-preview');
      if (asset && !preview) {
        preview = document.createElement('span');
        preview.className = 'prompt-asset-preview';
        const pin = head.querySelector('.asset-pin');
        if (pin) head.insertBefore(preview, pin);
        else head.append(preview);
      }
      if (preview) setBackground(preview, asset, 'asset-hero-applied');
      if (!asset && preview) preview.remove();
    });

    $$('.story-card').forEach((card, index) => {
      const number = card.querySelector('.story-number')?.textContent?.trim() || String(index + 1);
      setBackground(card, firstImage('frame', `${scene()?.id || project().id}:${number}`), 'asset-image-applied');
    });
    $$('.render-card').forEach((card, index) => {
      const number = String(index + 1);
      setBackground(card, firstImage('frame', `${scene()?.id || project().id}:${number}`), 'asset-image-applied');
    });

    const projectOwned = byOwner.get(ownerKey('project', projectId())) || [];
    const projectImage = projectOwned.find(item => fileKind(item.mime, item.name) === 'image');
    setBackground($('#projectThumb'), projectImage);

    const projectAssetsBtn = $('#projectAssetsBtn');
    if (projectAssetsBtn) projectAssetsBtn.dataset.count = String(projectOwned.length);
    const currentScene = scene();
    const sceneAssets = currentScene ? (byOwner.get(ownerKey('scene', currentScene.id)) || []) : [];
    const assistantAssetsBtn = $('#assistantAssetsBtn');
    if (assistantAssetsBtn) assistantAssetsBtn.dataset.count = String(sceneAssets.length);

    await updateStorageEstimate(assets);
  }

  async function updateStorageEstimate(knownAssets = null) {
    const assets = knownAssets || await listProjectAssets(projectId());
    const assetBytes = assets.reduce((sum, item) => sum + (item.size || 0), 0);
    const stateBytes = new Blob([JSON.stringify(api.getState())]).size;
    const total = assetBytes + stateBytes;
    const value = $('#storageValue');
    const bar = $('#storageBar');
    if (!value || !bar) return;
    let quota = 1024 ** 3;
    try {
      const estimate = await navigator.storage?.estimate?.();
      if (estimate?.quota) quota = estimate.quota;
    } catch {}
    value.textContent = formatBytes(total);
    bar.style.width = `${Math.max(2, Math.min(100, (total / quota) * 100))}%`;
  }

  async function hydrateAssetLibrary() {
    const grid = $('#projectAssetGrid');
    if (!grid) return;
    libraryAssets = await listProjectAssets(projectId());
    renderFilteredAssetLibrary();
    const search = $('#assetLibrarySearch');
    const type = $('#assetLibraryType');
    if (search && !search.dataset.bound) {
      search.dataset.bound = '1';
      search.addEventListener('input', renderFilteredAssetLibrary);
    }
    if (type && !type.dataset.bound) {
      type.dataset.bound = '1';
      type.addEventListener('change', renderFilteredAssetLibrary);
    }
  }

  function renderFilteredAssetLibrary() {
    const grid = $('#projectAssetGrid');
    if (!grid) return;
    const query = ($('#assetLibrarySearch')?.value || '').trim().toLowerCase();
    const kind = $('#assetLibraryType')?.value || 'all';
    const filtered = libraryAssets.filter(asset => {
      const matchesText = !query || asset.name.toLowerCase().includes(query) || labelForOwner(asset.ownerType, asset.ownerId).toLowerCase().includes(query);
      const matchesKind = kind === 'all' || fileKind(asset.mime, asset.name) === kind;
      return matchesText && matchesKind;
    });
    grid.innerHTML = filtered.length ? filtered.map(asset => `
      <article class="asset-library-card" data-asset-card="${asset.id}">
        ${assetThumbHtml(asset)}
        <div class="asset-library-copy"><strong title="${escapeHtml(asset.name)}">${escapeHtml(asset.name)}</strong><small>${formatBytes(asset.size)} · ${escapeHtml(asset.mime || 'файл')}</small><span class="asset-owner-tag">${escapeHtml(labelForOwner(asset.ownerType, asset.ownerId))}</span></div>
        <div class="asset-actions"><button type="button" data-asset-preview="${asset.id}">Открыть</button><button type="button" data-asset-download="${asset.id}">Скачать</button><button type="button" class="asset-delete" data-asset-delete="${asset.id}">×</button></div>
      </article>`).join('') : '<div class="empty-state"><h3>Ассетов пока нет</h3><p>Нажми кнопку со скрепкой и добавь фотографии, видео, музыку, звуки, PDF или другие референсы с компьютера.</p><button type="button" class="primary-btn" data-asset-open="project">📎 Добавить первый ассет</button></div>';
    const summary = $('#assetLibrarySummary');
    if (summary) summary.textContent = `${filtered.length} из ${libraryAssets.length} · ${formatBytes(filtered.reduce((sum, item) => sum + item.size, 0))}`;
  }

  async function refreshAllAssetUi() {
    await renderDialogAssetZones();
    await refreshPinCountsAndThumbs();
    if ($('#projectAssetGrid')) await hydrateAssetLibrary();
  }

  function eventContextFromPin(pin) {
    return context(pin.dataset.assetOwnerType, pin.dataset.assetOwnerId, pin.dataset.assetOwnerLabel || labelForOwner(pin.dataset.assetOwnerType, pin.dataset.assetOwnerId));
  }

  function bindEvents() {
    document.addEventListener('click', async event => {
      const toggle = event.target.closest('#assistantToggleBtn');
      if (toggle) {
        document.body.classList.toggle('assistant-collapsed');
        localStorage.setItem('gromvex_assistant_collapsed_v03', document.body.classList.contains('assistant-collapsed') ? '1' : '0');
        toggle.textContent = document.body.classList.contains('assistant-collapsed') ? '◧ Показать помощника' : '◫ Помощник';
        return;
      }

      const projectButton = event.target.closest('#projectAssetsBtn');
      if (projectButton) {
        event.preventDefault();
        await openAssetDialog(context('project', projectId(), `Проект: ${project().title}`));
        return;
      }

      const assistantButton = event.target.closest('#assistantAssetsBtn');
      if (assistantButton) {
        event.preventDefault();
        const active = scene();
        await openAssetDialog(active ? context('scene', active.id, labelForOwner('scene', active.id)) : context('project', projectId(), `Проект: ${project().title}`));
        return;
      }

      const pageAsset = event.target.closest('[data-asset-open]');
      if (pageAsset) {
        event.preventDefault();
        event.stopPropagation();
        await openAssetDialog(context('project', projectId(), `Проект: ${project().title}`));
        return;
      }

      const pin = event.target.closest('.asset-pin');
      if (pin) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        await openAssetDialog(eventContextFromPin(pin));
        return;
      }

      const dialogAdd = event.target.closest('.dialog-asset-add');
      if (dialogAdd) {
        event.preventDefault();
        event.stopPropagation();
        await openAssetDialog(dialogContext(dialogAdd.dataset.dialogOwner));
        return;
      }

      const preview = event.target.closest('[data-asset-preview]');
      if (preview) {
        event.preventDefault();
        event.stopPropagation();
        await previewAssetById(preview.dataset.assetPreview);
        return;
      }

      const download = event.target.closest('[data-asset-download]');
      if (download) {
        event.preventDefault();
        event.stopPropagation();
        await downloadAssetById(download.dataset.assetDownload);
        return;
      }

      const remove = event.target.closest('[data-asset-delete]');
      if (remove) {
        event.preventDefault();
        event.stopPropagation();
        await deleteAssetById(remove.dataset.assetDelete);
      }
    }, true);

    els.assetChooseBtn?.addEventListener('click', () => els.assetFileInput.click());
    els.assetDropzone?.addEventListener('click', () => els.assetFileInput.click());
    els.assetDropzone?.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') els.assetFileInput.click(); });
    els.assetFileInput?.addEventListener('change', () => uploadFiles(els.assetFileInput.files));

    ['dragenter', 'dragover'].forEach(type => els.assetDropzone?.addEventListener(type, event => {
      event.preventDefault();
      els.assetDropzone.classList.add('dragover');
    }));
    ['dragleave', 'drop'].forEach(type => els.assetDropzone?.addEventListener(type, event => {
      event.preventDefault();
      els.assetDropzone.classList.remove('dragover');
    }));
    els.assetDropzone?.addEventListener('drop', event => uploadFiles(event.dataTransfer.files));

    els.previewDownloadBtn?.addEventListener('click', () => previewAssetId && downloadAssetById(previewAssetId));


    [$('#characterDialog'), $('#locationDialog'), $('#sceneDialog')].forEach(dialog => {
      if (!dialog) return;
      new MutationObserver(() => {
        if (dialog.open) window.setTimeout(() => renderDialogAssetZones().catch(console.error), 20);
      }).observe(dialog, { attributes: true, attributeFilter: ['open'] });
    });

    const observer = new MutationObserver(scheduleDecorate);
    [$('#viewHost'), $('#promptCards'), $('#storyboard')].filter(Boolean).forEach(node => observer.observe(node, { childList: true, subtree: true }));
  }

  function init() {
    if (localStorage.getItem('gromvex_assistant_collapsed_v03') === '1') {
      document.body.classList.add('assistant-collapsed');
      const toggle = $('#assistantToggleBtn');
      if (toggle) toggle.textContent = '◧ Показать помощника';
    }
    bindEvents();
    scheduleDecorate();
    const storageLabel = $('#storageModeLabel');
    if (storageLabel) storageLabel.textContent = serverMode ? 'Защищённое серверное хранилище' : 'Локальное хранилище браузера';
    const boot = serverMode ? Promise.resolve() : openDb();
    boot.then(refreshAllAssetUi).catch(error => {
      console.error(error);
      api.toast(serverMode ? 'Серверное хранилище ассетов недоступно' : 'Локальное хранилище ассетов недоступно', 'error');
    });
  }

  window.GromvexAssets = {
    openProjectAssets: () => openAssetDialog(context('project', projectId(), `Проект: ${project().title}`)),
    refresh: refreshAllAssetUi
  };

  init();
})();
