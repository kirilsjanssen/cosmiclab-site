(() => {
  'use strict';

  const API = '/api/gromvex';
  const localPreview = ['127.0.0.1', 'localhost'].includes(location.hostname) || location.protocol === 'file:';
  let authenticatedUser = null;
  let ready = false;
  let saveTimer = 0;
  let saveInFlight = false;
  let queuedState = null;
  let changedBeforeReady = false;

  async function request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    const response = await fetch(`${API}${path}`, {
      credentials: 'same-origin',
      cache: 'no-store',
      ...options,
      headers,
    });
    let payload = null;
    const type = response.headers.get('content-type') || '';
    if (type.includes('application/json')) {
      payload = await response.json().catch(() => null);
    }
    if (!response.ok) {
      const error = new Error(payload?.detail || `Ошибка сервера ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return payload;
  }

  function setStatus(text, state = 'idle') {
    const badge = document.getElementById('serverSyncStatus');
    if (!badge) return;
    badge.textContent = text;
    badge.dataset.state = state;
    badge.title = state === 'server' ? 'Проекты и ассеты сохраняются на сервере' : text;
  }

  async function flushState() {
    if (!ready || localPreview || saveInFlight || !queuedState) return;
    saveInFlight = true;
    const stateToSave = queuedState;
    queuedState = null;
    setStatus('Сохраняю…', 'saving');
    try {
      await request('/studio/state', { method: 'PUT', body: JSON.stringify(stateToSave) });
      setStatus('Сервер ✓', 'server');
    } catch (error) {
      console.error('Gromvex server save failed:', error);
      queuedState = stateToSave;
      setStatus('Нет связи', 'error');
      window.GromvexStudio?.toast?.('Не удалось сохранить на сервер. Локальная копия сохранена.', 'error');
    } finally {
      saveInFlight = false;
      if (queuedState) window.setTimeout(flushState, 1800);
    }
  }

  function scheduleStateSave(state) {
    if (localPreview) return;
    queuedState = typeof structuredClone === 'function' ? structuredClone(state) : JSON.parse(JSON.stringify(state));
    clearTimeout(saveTimer);
    if (!ready) {
      changedBeforeReady = true;
      setStatus('Жду сервер…', 'saving');
      return;
    }
    saveTimer = window.setTimeout(flushState, 700);
  }

  async function bootstrapStudio() {
    if (localPreview) {
      ready = true;
      setStatus('Локально', 'local');
      return { mode: 'local', user: null };
    }

    setStatus('Подключение…', 'saving');
    try {
      const me = await request('/auth/me');
      authenticatedUser = me.user;
    } catch (error) {
      if (error.status === 401) {
        location.replace('/index.html?login=1&next=%2Fgromvex-studio%2F');
        return null;
      }
      setStatus('Ошибка API', 'error');
      throw error;
    }

    const profileName = document.querySelector('#profileBtn strong');
    const profileRole = document.querySelector('#profileBtn small');
    if (profileName) profileName.textContent = authenticatedUser.email.split('@')[0];
    if (profileRole) profileRole.textContent = authenticatedUser.role === 'owner' ? 'Владелец' : 'Пользователь';

    const serverPayload = await request('/studio/state');
    const localState = window.GromvexStudio?.getState?.();

    if (changedBeforeReady && localState) {
      await request('/studio/state', { method: 'PUT', body: JSON.stringify(localState) });
      queuedState = null;
      window.GromvexStudio?.toast?.('Новые локальные изменения сохранены на сервере');
    } else if (serverPayload?.state) {
      window.GromvexStudio?.replaceState?.(serverPayload.state, { saveLocal: true });
      const normalizedState = window.GromvexStudio?.getState?.();
      if (normalizedState && Number(serverPayload.state.version || 0) < Number(normalizedState.version || 0)) {
        await request('/studio/state', { method: 'PUT', body: JSON.stringify(normalizedState) });
      }
    } else if (localState) {
      await request('/studio/state', { method: 'PUT', body: JSON.stringify(localState) });
      queuedState = null;
      window.GromvexStudio?.toast?.('Локальный проект перенесён на сервер');
    }

    ready = true;
    setStatus('Сервер ✓', 'server');
    if (queuedState) window.setTimeout(flushState, 50);
    return { mode: 'server', user: authenticatedUser };
  }

  async function listAssets(projectId, ownerType = null, ownerId = null) {
    const params = new URLSearchParams({ project_id: projectId });
    if (ownerType !== null) params.set('owner_type', ownerType);
    if (ownerId !== null) params.set('owner_id', ownerId);
    const payload = await request(`/studio/assets?${params.toString()}`);
    return payload.assets || [];
  }

  async function getAsset(id) {
    const payload = await request(`/studio/assets/${encodeURIComponent(id)}`);
    return payload.asset || null;
  }

  async function uploadAsset(record) {
    const form = new FormData();
    form.append('project_id', record.projectId);
    form.append('owner_type', record.ownerType);
    form.append('owner_id', record.ownerId);
    form.append('owner_label', record.ownerLabel || '');
    form.append('files', record.blob, record.name);
    const payload = await request('/studio/assets', { method: 'POST', body: form });
    return payload.assets?.[0] || null;
  }

  async function deleteAsset(id) {
    await request(`/studio/assets/${encodeURIComponent(id)}`, { method: 'DELETE' });
  }

  async function logout() {
    if (!localPreview) await request('/auth/logout', { method: 'POST' }).catch(() => null);
    location.href = '/index.html';
  }

  window.GromvexServer = {
    request,
    bootstrapStudio,
    scheduleStateSave,
    flushState,
    listAssets,
    getAsset,
    uploadAsset,
    deleteAsset,
    logout,
    isLocalPreview: () => localPreview,
    isServerMode: () => !localPreview,
    isReady: () => ready,
    getUser: () => authenticatedUser,
  };

  window.addEventListener('beforeunload', () => {
    if (!localPreview && queuedState && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(queuedState)], { type: 'application/json' });
      navigator.sendBeacon(`${API}/studio/state`, blob);
    }
  });
})();
