(() => {
  'use strict';

  const STORAGE_KEY = 'gromvex_movie_studio_v06';
  const LEGACY_STORAGE_KEYS = ['gromvex_movie_studio_v05', 'gromvex_movie_studio_v04', 'gromvex_movie_studio_v03', 'gromvex_movie_studio_v02', 'gromvex_movie_studio_v01'];
  const APP_VERSION = 6;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const uid = (prefix = 'id') => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  function createDemoProject() {
    return {
      id: uid('project'),
      title: 'Район мёртвых',
      genre: 'Постапокалипсис / зомби',
      format: 'Полнометражный фильм',
      duration: 90,
      style: 'Мрачный реализм',
      mood: 'Напряжённое, безысходность',
      continuity: 'Логлайн, тон, временная шкала',
      logline: 'Бывший инженер ведёт группу выживших через заражённый район к последнему уцелевшему госпиталю, где может находиться лекарство.',
      synopsis: 'После вспышки неизвестного вируса городской район оказывается отрезанным от внешнего мира. Выжившие ведут борьбу не только с заражёнными, но и друг с другом. Артём, бывший инженер, должен вывести группу людей через опасную территорию к последнему уцелевшему госпиталю, где есть шанс найти лекарство.',
      worldBible: 'МИР\nГород изолирован военными после внезапной вспышки. Электросеть работает фрагментами. Связь нестабильна. Ночью заражённые становятся агрессивнее.\n\nПРАВИЛА ЗАРАЖЕНИЯ\nПередача через кровь и укусы. Первые симптомы через 20–40 минут. Холод замедляет развитие вируса.\n\nТОН\nМрачный реализм, минимум героизации, физически правдоподобные действия и последствия.',
      script: 'СЦЕНА 1. ДВОР У ПАНЕЛЬКИ — НОЧЬ\n\nТусклый свет аварийной лампы. Артём проверяет самодельное радио. Вдалеке слышны крики и металлический грохот.\n\nАРТЁМ\n(тихо)\nУ нас десять минут. Потом они перекроют проход.\n\nЛёха смотрит на тёмный подъезд.\n\nЛЁХА\nЕсли больница ещё стоит.\n\nАртём убирает радио в рюкзак.\n\nАРТЁМ\nДругого пути нет.',
      acts: [
        { name: 'Акт 1', title: 'Завязка', time: '0–30 мин', text: 'Знакомство с миром и героями. Вспышка заражения в районе. Группа собирается для рискованного путешествия.' },
        { name: 'Акт 2', title: 'Противостояние', time: '30–75 мин', text: 'Путь через опасные локации. Потери, конфликты, моральный выбор. Надежда на спасение тает.' },
        { name: 'Акт 3', title: 'Развязка', time: '75–90 мин', text: 'Финальная схватка. Правда о вирусе. Выбор Артёма. Неожиданный финал.' }
      ],
      characters: [
        { id: uid('char'), name: 'Артём', age: '36 лет', role: 'Главный герой', occupation: 'Бывший инженер', goal: 'Провести группу к больнице и найти лекарство.', motivation: 'Он винит себя в гибели семьи и пытается спасти хотя бы этих людей.', conflict: 'Рациональность сталкивается со страхом снова принять неверное решение.', appearance: 'Усталое лицо, короткая тёмная щетина, шрам над бровью.', wardrobe: 'Тёмная куртка, рабочие перчатки, рюкзак с радио и инструментами.', voice: 'Говорит коротко, тихо и по делу. В напряжении сжимает челюсть.', arc: 'От замкнутого одиночки к лидеру, готовому доверять другим.', notes: '' },
        { id: uid('char'), name: 'Лёха', age: '41 год', role: 'Союзник и источник конфликта', occupation: 'Бывший военный', goal: 'Вывести группу из района любой ценой.', motivation: 'Он уверен, что выживание важнее морали.', conflict: 'Не верит в план Артёма и скрывает собственную травму.', appearance: 'Крепкое телосложение, короткая стрижка, заметная усталость.', wardrobe: 'Военная куртка, разгрузка, фонарь, старый нож.', voice: 'Резкий голос, сухой юмор, часто перебивает.', arc: 'Учится снова ставить людей выше безусловного приказа.', notes: '' },
        { id: uid('char'), name: 'Марина', age: '32 года', role: 'Врач и моральный центр группы', occupation: 'Врач-инфекционист', goal: 'Найти образцы и понять, можно ли остановить заражение.', motivation: 'Она верит, что болезнь ещё обратима.', conflict: 'Научная надежда заставляет её рисковать всей группой.', appearance: 'Собранная, бледная, тёмные волосы убраны назад.', wardrobe: 'Медицинская куртка под плащом, сумка с препаратами.', voice: 'Спокойная речь, но при разговоре о пациентах становится эмоциональной.', arc: 'От веры в универсальное спасение к трудному личному выбору.', notes: '' }
      ],
      locations: [
        { id: uid('loc'), name: 'Жилой квартал', description: 'Разрушенные панельные дома, дворы, заброшенные машины.', atmosphere: 'Холодный ветер, ощущение открытой опасной территории.', lighting: 'Лунный свет, редкие аварийные фонари и пожары вдали.', sound: 'Скрип металла, ветер, далёкие крики.', props: 'Брошенные автомобили, детская площадка, баррикады.', continuity: 'Положение машин и следы на мокром асфальте должны сохраняться.', notes: '' },
        { id: uid('loc'), name: 'Подъезд', description: 'Тёмные пролёты, аварийное освещение, следы недавней борьбы.', atmosphere: 'Теснота, сырость, ощущение присутствия за стенами.', lighting: 'Мерцающие лампы и свет фонарей персонажей.', sound: 'Эхо шагов, капли воды, шорох сверху.', props: 'Сломанный лифт, почтовые ящики, перевёрнутая мебель.', continuity: 'Следы крови и положение дверей не меняются между кадрами.', notes: '' },
        { id: uid('loc'), name: 'Городская больница', description: 'Холодные коридоры, мерцающие лампы, затопленный подвал.', atmosphere: 'Стерильность превратилась в тревожную заброшенность.', lighting: 'Холодный люминесцентный свет, дымка и глубокие тени.', sound: 'Гул вентиляции, капли, далёкий металлический удар.', props: 'Каталки, медицинские шкафы, плёнка, аварийные лампы.', continuity: 'Вода на полу, включённые лампы и двери палат должны совпадать.', notes: '' }
      ],
      scenes: [
        { id: uid('scene'), number: 12, title: 'Двор у панельки', location: 'Жилой квартал', timeOfDay: 'Ночь', pages: '4 2/8', durationSec: 190, status: 'draft', summary: 'Группа готовится покинуть безопасный двор.', purpose: 'Запустить путь и показать напряжение между Артёмом и Лёхой.', conflict: 'Лёха требует отказаться от больницы.', action: 'Артём проверяет радио. Марина собирает лекарства. За баррикадой появляется движение.', dialogue: 'ЛЁХА: Мы ещё можем уйти на север.\nАРТЁМ: Север уже закрыт.', characters: [], camera: 'Общий план двора, затем медленный наезд на Артёма.', lighting: 'Лунный контровой свет и аварийная лампа.', sound: 'Ветер, радио-помехи, далёкий грохот.', promptNote: 'Сохранять одежду и лица персонажей между кадрами.', notes: '' },
        { id: uid('scene'), number: 13, title: 'Подъезд', location: 'Подъезд', timeOfDay: 'Ночь', pages: '3 6/8', durationSec: 160, status: 'draft', summary: 'Лёха слышит движение этажом выше.', purpose: 'Поднять угрозу и проверить доверие внутри группы.', conflict: 'Лёха хочет стрелять, Артём запрещает выдавать позицию.', action: 'Группа медленно поднимается. Свет фонаря скользит по стенам. Сверху падает металлический предмет.', dialogue: 'МАРИНА: Это мог быть человек.\nЛЁХА: Люди так не двигаются.', characters: [], camera: 'Ручная камера, узкие планы, детали рук и фонаря.', lighting: 'Только фонари и редкое мерцание аварийного света.', sound: 'Шаги, дыхание, скрип перекрытий.', promptNote: 'Без резких телепортаций и смены расположения персонажей.', notes: '' },
        { id: uid('scene'), number: 14, title: 'Больница', location: 'Городская больница', timeOfDay: 'День', pages: '5 1/8', durationSec: 230, status: 'work', summary: 'Герои входят в заброшенную больницу и понимают, что внутри кто-то есть.', purpose: 'Дать ложную надежду и открыть новую тайну.', conflict: 'Марина хочет немедленно идти в лабораторию, остальные замечают свежие следы.', action: 'Двери открываются с усилием. В коридоре горит часть ламп. На мокром полу видны свежие отпечатки.', dialogue: 'МАРИНА: Здесь ещё есть питание.\nАРТЁМ: Значит, здесь кто-то есть.', characters: [], camera: 'Медленный проход по коридору, 24 мм, затем крупные планы реакций на 50 мм.', lighting: 'Холодный люминесцентный свет, мерцание, глубокие тени, мягкий туман.', sound: 'Гул вентиляции, капли, далёкий удар металла.', promptNote: 'Сохранить положение каталок, отражения на полу и направление света.', notes: '' }
      ],
      activeSceneId: null,
      cameraNotes: 'Медленный проход по коридору, чередование широких планов и тревожных крупных планов. Объектив 24 мм для пространства, 50 мм для реакций.',
      lightNotes: 'Холодный люминесцентный свет, мерцание, глубокие тени, мягкий объёмный туман. Контрастный контровой свет в дальнем конце коридора.',
      frameCount: 8,
      storyboard: [],
      prompts: {
        seedance: '',
        kling: '',
        luma: ''
      },
      renderCount: 24,
      renderTarget: 180,
      production: {
        promptsReady: true,
        editingProgress: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  function normalizeCharacter(character = {}) {
    return {
      id: character.id || uid('char'),
      name: character.name || 'Новый персонаж',
      age: character.age || '',
      role: character.role || '',
      occupation: character.occupation || '',
      goal: character.goal || '',
      motivation: character.motivation || '',
      conflict: character.conflict || '',
      appearance: character.appearance || '',
      wardrobe: character.wardrobe || '',
      voice: character.voice || '',
      arc: character.arc || '',
      notes: character.notes || ''
    };
  }

  function normalizeLocation(location = {}) {
    return {
      id: location.id || uid('loc'),
      name: location.name || 'Новая локация',
      description: location.description || '',
      atmosphere: location.atmosphere || '',
      lighting: location.lighting || '',
      sound: location.sound || '',
      props: location.props || '',
      continuity: location.continuity || '',
      notes: location.notes || ''
    };
  }

  function normalizeScene(scene = {}) {
    return {
      id: scene.id || uid('scene'),
      number: Number(scene.number) || 1,
      title: scene.title || 'Новая сцена',
      location: scene.location || '',
      timeOfDay: scene.timeOfDay || 'День',
      pages: scene.pages || '1',
      durationSec: Number(scene.durationSec) || 0,
      status: scene.status || 'draft',
      summary: scene.summary || '',
      purpose: scene.purpose || '',
      conflict: scene.conflict || '',
      action: scene.action || '',
      dialogue: scene.dialogue || '',
      characters: Array.isArray(scene.characters) ? scene.characters : [],
      camera: scene.camera || '',
      lighting: scene.lighting || '',
      sound: scene.sound || '',
      promptNote: scene.promptNote || '',
      notes: scene.notes || ''
    };
  }

  function normalizeProject(project) {
    const fallback = createDemoProject();
    const merged = { ...fallback, ...project };
    merged.acts = Array.isArray(project.acts) && project.acts.length ? project.acts : fallback.acts;
    merged.characters = (Array.isArray(project.characters) ? project.characters : []).map(normalizeCharacter);
    merged.locations = (Array.isArray(project.locations) ? project.locations : []).map(normalizeLocation);
    merged.scenes = (Array.isArray(project.scenes) ? project.scenes : []).map(normalizeScene);
    merged.prompts = { ...fallback.prompts, ...(project.prompts || {}) };
    merged.storyboard = Array.isArray(project.storyboard) ? project.storyboard : [];
    const savedPromptCount = Object.values(project.prompts || {}).filter(value => String(value || '').trim().length > 0).length;
    merged.production = {
      promptsReady: project.production?.promptsReady ?? (savedPromptCount === 3),
      editingProgress: Math.max(0, Math.min(100, Number(project.production?.editingProgress ?? project.editingProgress ?? 0) || 0))
    };

    const demoActsSignature = fallback.acts.map(act => act.text).join('|');
    const projectActsSignature = merged.acts.map(act => act.text || '').join('|');
    const sparseLegacyProject = merged.title !== fallback.title &&
      !String(project.script || '').trim() &&
      !String(project.worldBible || '').trim() &&
      merged.characters.length === 0 && merged.locations.length === 0 && merged.scenes.length === 0 &&
      projectActsSignature === demoActsSignature;
    if (sparseLegacyProject) {
      merged.acts = [
        { name: 'Акт 1', title: 'Завязка', time: '0–30%', text: '' },
        { name: 'Акт 2', title: 'Противостояние', time: '30–75%', text: '' },
        { name: 'Акт 3', title: 'Развязка', time: '75–100%', text: '' }
      ];
      merged.style = !project.style || project.style === fallback.style ? 'Не задан' : merged.style;
      merged.mood = !project.mood || project.mood === fallback.mood ? 'Не задано' : merged.mood;
      merged.continuity = !project.continuity || project.continuity === fallback.continuity ? '' : merged.continuity;
      merged.cameraNotes = !project.cameraNotes || project.cameraNotes === fallback.cameraNotes ? '' : merged.cameraNotes;
      merged.lightNotes = !project.lightNotes || project.lightNotes === fallback.lightNotes ? '' : merged.lightNotes;
      merged.prompts = { seedance: '', kling: '', luma: '' };
      merged.production.promptsReady = false;
    }

    if (!merged.activeSceneId && merged.scenes.length) merged.activeSceneId = merged.scenes[merged.scenes.length - 1].id;
    return merged;
  }

  function initialState() {
    const demo = createDemoProject();
    demo.activeSceneId = demo.scenes[demo.scenes.length - 1].id;
    return {
      version: APP_VERSION,
      activeProjectId: demo.id,
      activeView: 'overview',
      activeRole: 'director',
      projects: [demo],
      settings: {
        language: 'ru',
        autoSave: true,
        defaultEngine: 'seedance',
        apiMode: 'local-prototype'
      }
    };
  }

  function loadState() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        for (const key of LEGACY_STORAGE_KEYS) {
          raw = localStorage.getItem(key);
          if (raw) break;
        }
      }
      if (!raw) return initialState();
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.projects) || !parsed.projects.length) return initialState();
      return {
        ...initialState(),
        ...parsed,
        version: APP_VERSION,
        projects: parsed.projects.map(normalizeProject)
      };
    } catch (error) {
      console.warn('Gromvex state reset:', error);
      return initialState();
    }
  }

  let state = loadState();
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { console.warn('State migration save failed:', error); }
  let textDialogAction = null;
  let confirmDialogAction = null;

  const els = {
    viewHost: $('#viewHost'),
    mainNav: $('#mainNav'),
    topTabs: $('#topTabs'),
    projectTitleHeading: $('#projectTitleHeading'),
    projectSubtitle: $('#projectSubtitle'),
    projectSwitcherTitle: $('#projectSwitcherTitle'),
    projectSwitcherMeta: $('#projectSwitcherMeta'),
    projectSwitcher: $('#projectSwitcher'),
    projectMenu: $('#projectMenu'),
    projectList: $('#projectList'),
    projectCount: $('#projectCount'),
    activeSceneLabel: $('#activeSceneLabel'),
    frameCountLabel: $('#frameCountLabel'),
    promptCards: $('#promptCards'),
    storyboard: $('#storyboard'),
    storyboardRange: $('#storyboardRange'),
    cameraNotes: $('#cameraNotes'),
    lightNotes: $('#lightNotes'),
    breakdownList: $('#breakdownList'),
    storageValue: $('#storageValue'),
    storageBar: $('#storageBar'),
    scriptStep: $('#scriptStep'),
    scriptProgressValue: $('#scriptProgressValue'),
    scriptProgressLabel: $('#scriptProgressLabel'),
    promptsStep: $('#promptsStep'),
    promptsProgressValue: $('#promptsProgressValue'),
    promptsProgressLabel: $('#promptsProgressLabel'),
    rendersStep: $('#rendersStep'),
    renderProgressValue: $('#renderProgressValue'),
    renderCountValue: $('#renderCountValue'),
    editingStep: $('#editingStep'),
    editingProgressValue: $('#editingProgressValue'),
    editingProgressLabel: $('#editingProgressLabel'),
    projectDialog: $('#projectDialog'),
    projectForm: $('#projectForm'),
    textDialog: $('#textDialog'),
    textDialogForm: $('#textDialogForm'),
    textDialogTitle: $('#textDialogTitle'),
    textDialogLabel: $('#textDialogLabel'),
    textDialogInput: $('#textDialogInput'),
    characterDialog: $('#characterDialog'),
    characterForm: $('#characterForm'),
    locationDialog: $('#locationDialog'),
    locationForm: $('#locationForm'),
    sceneDialog: $('#sceneDialog'),
    sceneForm: $('#sceneForm'),
    confirmDialog: $('#confirmDialog'),
    confirmForm: $('#confirmForm'),
    toastHost: $('#toastHost')
  };

  function activeProject() {
    let project = state.projects.find(item => item.id === state.activeProjectId);
    if (!project) {
      project = state.projects[0];
      state.activeProjectId = project.id;
    }
    return project;
  }

  function activeScene(project = activeProject()) {
    return project.scenes.find(scene => scene.id === project.activeSceneId) || project.scenes[project.scenes.length - 1] || null;
  }

  function persistLocalState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateStorageMeter();
  }

  function saveState({ silent = true } = {}) {
    const project = activeProject();
    project.updatedAt = new Date().toISOString();
    try {
      persistLocalState();
      window.GromvexServer?.scheduleStateSave?.(state);
      if (!silent) toast(window.GromvexServer?.isServerMode?.() ? 'Проект отправлен на сервер' : 'Проект сохранён локально');
    } catch (error) {
      console.error(error);
      toast('Не удалось сохранить проект', 'error');
    }
  }

  function autosave() {
    renderProgress();
    renderProjectList();
    if (state.settings.autoSave) saveState();
  }

  function toast(message, type = 'ok') {
    const node = document.createElement('div');
    node.className = `toast ${type}`;
    node.textContent = message;
    els.toastHost.appendChild(node);
    window.setTimeout(() => node.remove(), 2600);
  }

  function updateStorageMeter() {
    const bytes = new Blob([JSON.stringify(state)]).size;
    const kb = bytes / 1024;
    const label = kb > 1024 ? `${(kb / 1024).toFixed(2)} МБ` : `${Math.max(1, Math.round(kb))} КБ`;
    els.storageValue.textContent = label;
    const percent = Math.min(100, Math.max(2, (bytes / (5 * 1024 * 1024)) * 100));
    els.storageBar.style.width = `${percent}%`;
  }

  function setActiveView(view, { persist = true } = {}) {
    state.activeView = view;
    $$('#mainNav [data-view]').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
    $$('#topTabs [data-view]').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
    renderView();
    if (persist) {
      try { persistLocalState(); } catch (error) { console.warn(error); }
    }
  }

  function renderShell() {
    const p = activeProject();
    els.projectTitleHeading.textContent = p.title;
    els.projectSubtitle.textContent = `${p.genre || 'Без жанра'} / ${p.duration || 0} минут`;
    els.projectSwitcherTitle.textContent = p.title;
    els.projectSwitcherMeta.textContent = `${p.genre || 'Без жанра'} / ${p.duration || 0} минут`;

    const scene = activeScene(p);
    els.activeSceneLabel.textContent = scene ? `сцену ${scene.number} — ${scene.title}...` : 'проект без сцен';
    els.frameCountLabel.textContent = `${p.frameCount || 8} кадров`;
    els.cameraNotes.value = scene?.camera || p.cameraNotes || '';
    els.lightNotes.value = scene?.lighting || p.lightNotes || '';

    renderProjectMenu();
    renderProjectList();
    renderPromptCards();
    renderBreakdown();
    renderStoryboard();
    renderProgress();
    updateStorageMeter();
  }

  function renderProjectMenu() {
    const current = activeProject();
    els.projectMenu.innerHTML = state.projects.map(project => `
      <button type="button" data-project-id="${project.id}" class="${project.id === current.id ? 'active' : ''}">
        ${escapeHtml(project.title)}
        <small>${escapeHtml(project.genre || 'Без жанра')} / ${Number(project.duration) || 0} минут</small>
      </button>
    `).join('');
  }

  function renderProjectList() {
    if (!els.projectList) return;
    const current = activeProject();
    els.projectCount.textContent = String(state.projects.length);
    els.projectList.innerHTML = state.projects.map(project => {
      const metrics = productionMetrics(project);
      const overall = Math.round((metrics.script + metrics.prompts + metrics.renders + metrics.editing) / 4);
      return `
        <article class="project-list-item ${project.id === current.id ? 'active' : ''}">
          <button type="button" class="project-list-open" data-project-list-id="${project.id}">
            <strong>${escapeHtml(project.title)}</strong>
            <small>${escapeHtml(project.genre || 'Без жанра')} · ${Number(project.duration) || 0} мин</small>
            <span class="project-mini-progress"><i style="width:${overall}%"></i></span>
          </button>
        </article>`;
    }).join('');
  }

  function renderOverview() {
    const p = activeProject();
    const rows = p.scenes.slice(-4);
    return `
      <div class="dashboard-grid">
        <article class="card synopsis-card">
          <div class="card-header"><h2>▣ Синопсис</h2><button data-action="focus-synopsis">✎</button></div>
          <div class="card-body"><textarea data-field="synopsis" aria-label="Синопсис">${escapeHtml(p.synopsis)}</textarea></div>
        </article>

        <article class="card structure-card">
          <div class="card-header"><h2>⚒ Трёхактная структура</h2><button data-action="go-structure">Развернуть</button></div>
          <div class="card-body">
            ${p.acts.map((act, index) => `
              <div class="act-row">
                <div class="act-label">${escapeHtml(act.name)}</div>
                <div class="act-copy">
                  <input data-act-index="${index}" data-act-field="title" value="${escapeHtml(act.title)}" aria-label="Название акта" />
                  <textarea data-act-index="${index}" data-act-field="text" aria-label="Описание акта">${escapeHtml(act.text)}</textarea>
                </div>
                <div class="act-time">${escapeHtml(act.time)}</div>
              </div>
            `).join('')}
          </div>
        </article>

        <article class="card meta-strip">
          <div class="meta-grid">
            <label class="meta-item"><span>Жанр</span><input data-field="genre" value="${escapeHtml(p.genre)}" /></label>
            <label class="meta-item"><span>Хронометраж</span><input data-field="duration" type="number" min="1" value="${Number(p.duration) || 0}" /></label>
            <label class="meta-item"><span>Стиль</span><input data-field="style" value="${escapeHtml(p.style)}" /></label>
            <label class="meta-item"><span>Настроение</span><input data-field="mood" value="${escapeHtml(p.mood)}" /></label>
            <label class="meta-item"><span>Непрерывность</span><input data-field="continuity" value="${escapeHtml(p.continuity)}" /></label>
          </div>
        </article>

        <article class="card characters-card">
          <div class="card-header"><h2>Ключевые персонажи</h2><button data-action="go-characters">Все персонажи</button></div>
          <div class="entity-strip">
            ${p.characters.slice(0, 3).map(character => `
              <article class="entity-card overview-entity-card interactive-card" data-open-character="${character.id}" tabindex="0">
                <span class="entity-avatar" aria-hidden="true"></span>
                <div><strong>${escapeHtml(character.name)}</strong><small>${escapeHtml(character.role || character.occupation || 'Роль не указана')}</small></div>
                <button class="mini-open-btn" type="button" data-action="edit-character" data-id="${character.id}">Открыть</button>
              </article>
            `).join('')}
            <button class="add-entity" data-action="add-character">＋<br><small>Добавить персонажа</small></button>
          </div>
        </article>

        <article class="card scenes-card">
          <div class="card-header"><h2>Последние сцены</h2><button data-action="go-scenes">Открыть все</button></div>
          <table class="scene-table">
            <thead><tr><th>№</th><th>Название сцены</th><th>Локация</th><th>День/Ночь</th><th>Страниц</th><th>Статус</th></tr></thead>
            <tbody>
              ${rows.map(scene => `
                <tr data-scene-id="${scene.id}" class="${scene.id === p.activeSceneId ? 'active' : ''}">
                  <td>${scene.number}</td><td>Сцена ${scene.number} — ${escapeHtml(scene.title)}</td><td>${escapeHtml(scene.location)}</td><td>${scene.timeOfDay === 'Ночь' ? '☾' : '☀'} ${escapeHtml(scene.timeOfDay)}</td><td>${escapeHtml(scene.pages)}</td><td><span class="badge ${scene.status}">${statusLabel(scene.status)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </article>
      </div>
    `;
  }

  function renderWorld() {
    const p = activeProject();
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Библия мира</h2><p>Правила вселенной, тон, хронология и ограничения.</p></div><button class="primary-btn" data-action="generate-world">✣ Развить мир</button></header>
        <article class="card editor-card world-editor"><textarea data-field="worldBible">${escapeHtml(p.worldBible)}</textarea></article>
      </div>
    `;
  }

  function renderStructure() {
    const p = activeProject();
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Трёхактная структура</h2><p>Редактируй драматургию и ключевые поворотные точки.</p></div><button class="primary-btn" data-action="generate-structure">✣ Предложить структуру</button></header>
        <div class="two-column">
          ${p.acts.map((act, index) => `
            <article class="card editor-card">
              <div class="card-header"><h3>${escapeHtml(act.name)} · ${escapeHtml(act.time)}</h3></div>
              <div class="card-body">
                <label class="scene-form">Название<input data-act-index="${index}" data-act-field="title" value="${escapeHtml(act.title)}" /></label>
                <label class="scene-form">Содержание<textarea data-act-index="${index}" data-act-field="text">${escapeHtml(act.text)}</textarea></label>
              </div>
            </article>
          `).join('')}
          <article class="card editor-card">
            <div class="card-header"><h3>Логлайн проекта</h3></div>
            <div class="card-body"><textarea class="notes-area" data-field="logline" rows="10">${escapeHtml(p.logline)}</textarea></div>
          </article>
        </div>
      </div>
    `;
  }

  function renderScript() {
    const p = activeProject();
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Сценарий</h2><p>Черновик сценария с локальным сохранением.</p></div><button class="primary-btn" data-action="format-script">▤ Форматировать сцену</button></header>
        <article class="card editor-card script-editor"><textarea data-field="script" spellcheck="true">${escapeHtml(p.script)}</textarea></article>
      </div>
    `;
  }

  function renderCharacters() {
    const p = activeProject();
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Персонажи</h2><p>Полные карточки: цель, мотивация, конфликт, внешность и дуга.</p></div><button class="primary-btn" data-action="add-character">＋ Добавить персонажа</button></header>
        <div class="entity-grid detailed-entity-grid">
          ${p.characters.map(character => `
            <article class="card entity-card large-entity interactive-card" data-open-character="${character.id}" tabindex="0">
              <span class="entity-avatar"></span>
              <div class="entity-card-copy">
                <div class="entity-card-kicker">${escapeHtml(character.occupation || 'Профессия не указана')}</div>
                <h3>${escapeHtml(character.name)}</h3>
                <p class="entity-role">${escapeHtml(character.role || 'Роль не указана')}</p>
                <p>${escapeHtml(character.goal || character.motivation || 'Открой карточку и добавь цель, мотивацию и конфликт.')}</p>
                <div class="entity-tags">
                  ${character.age ? `<span>${escapeHtml(character.age)}</span>` : ''}
                  ${character.arc ? '<span>Есть дуга</span>' : '<span>Дуга не заполнена</span>'}
                </div>
              </div>
              <div class="entity-actions">
                <button class="soft-btn" data-action="edit-character" data-id="${character.id}">Открыть</button>
                <button data-action="duplicate-character" data-id="${character.id}">Дублировать</button>
                <button class="danger-link" data-action="delete-character" data-id="${character.id}">Удалить</button>
              </div>
            </article>
          `).join('') || '<div class="empty-state"><h3>Персонажей пока нет</h3><p>Создай первого персонажа и задай ему цель, конфликт и визуальную непрерывность.</p><button class="primary-btn" data-action="add-character">＋ Создать персонажа</button></div>'}
        </div>
      </div>
    `;
  }

  function renderLocations() {
    const p = activeProject();
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Локации</h2><p>Среда, атмосфера, свет, звук, реквизит и непрерывность.</p></div><button class="primary-btn" data-action="add-location">＋ Добавить локацию</button></header>
        <div class="entity-grid detailed-entity-grid">
          ${p.locations.map(location => `
            <article class="card entity-card large-entity interactive-card" data-open-location="${location.id}" tabindex="0">
              <span class="location-thumb"></span>
              <div class="entity-card-copy">
                <div class="entity-card-kicker">Локация проекта</div>
                <h3>${escapeHtml(location.name)}</h3>
                <p>${escapeHtml(location.description || 'Описание не заполнено.')}</p>
                <div class="entity-tags">
                  ${location.lighting ? '<span>Свет задан</span>' : '<span>Свет не задан</span>'}
                  ${location.sound ? '<span>Звук задан</span>' : '<span>Звук не задан</span>'}
                </div>
              </div>
              <div class="entity-actions">
                <button class="soft-btn" data-action="edit-location" data-id="${location.id}">Открыть</button>
                <button data-action="duplicate-location" data-id="${location.id}">Дублировать</button>
                <button class="danger-link" data-action="delete-location" data-id="${location.id}">Удалить</button>
              </div>
            </article>
          `).join('') || '<div class="empty-state"><h3>Локаций пока нет</h3><p>Создай первую локацию и опиши её атмосферу, свет и звук.</p><button class="primary-btn" data-action="add-location">＋ Создать локацию</button></div>'}
        </div>
      </div>
    `;
  }

  function renderScenes() {
    const p = activeProject();
    const sorted = [...p.scenes].sort((a, b) => Number(a.number) - Number(b.number));
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Сцены</h2><p>Открывай сцену как отдельную карточку и заполняй действие, конфликт, камеру, свет и звук.</p></div><button class="primary-btn" data-action="add-scene">＋ Новая сцена</button></header>
        <div class="scene-list detailed-scene-list">
          ${sorted.map(scene => {
            const names = (scene.characters || []).map(id => p.characters.find(item => item.id === id)?.name).filter(Boolean);
            return `
            <article class="card scene-card ${scene.id === p.activeSceneId ? 'active' : ''}" data-scene-id="${scene.id}" data-open-scene="${scene.id}" tabindex="0">
              <span class="scene-number">${scene.number}</span>
              <div class="scene-card-copy">
                <div class="scene-card-title"><h3>${escapeHtml(scene.title)}</h3><span class="badge ${scene.status}">${statusLabel(scene.status)}</span></div>
                <p>${escapeHtml(scene.location || 'Локация не указана')} · ${escapeHtml(scene.timeOfDay)} · ${escapeHtml(scene.pages || '0')} стр.${scene.durationSec ? ` · ${scene.durationSec} сек.` : ''}</p>
                <p class="scene-summary">${escapeHtml(scene.summary || 'Описание сцены не заполнено.')}</p>
                ${names.length ? `<div class="entity-tags">${names.map(name => `<span>${escapeHtml(name)}</span>`).join('')}</div>` : ''}
              </div>
              <div class="scene-card-actions">
                <button class="soft-btn" data-action="edit-scene" data-id="${scene.id}">Открыть</button>
                <button data-action="duplicate-scene" data-id="${scene.id}">Дублировать</button>
              </div>
            </article>`;
          }).join('') || '<div class="empty-state"><h3>Сцен пока нет</h3><p>Создай первую сцену, выбери локацию и участников.</p><button class="primary-btn" data-action="add-scene">＋ Создать сцену</button></div>'}
        </div>
      </div>
    `;
  }

  function renderPromptsView() {
    const p = activeProject();
    ensurePrompts(p);
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Промты</h2><p>Версии промтов для разных видеогенераторов.</p></div><button class="primary-btn" data-action="regenerate-prompts">✣ Обновить промты</button></header>
        <div class="prompt-library">
          ${Object.entries(p.prompts).map(([engine, value]) => `
            <article class="card editor-card prompt-engine-card">
              <div class="card-header"><h3>${engineLabel(engine)}</h3><button data-copy-engine="${engine}">Копировать</button></div>
              <textarea class="prompt-edit" data-prompt-engine="${engine}" rows="12">${escapeHtml(value)}</textarea>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderRenders() {
    const p = activeProject();
    const cards = p.storyboard.length ? p.storyboard : Array.from({ length: 8 }, (_, index) => ({ number: index + 1, caption: 'Кадр ещё не создан' }));
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Рендеры</h2><p>Черновые кадры, референсы и результаты генерации.</p></div><button class="primary-btn" data-action="generate-frames">✣ Создать 8 черновиков</button></header>
        <div class="render-grid">${cards.map(card => `<article class="render-card"><span>${card.number}. ${escapeHtml(card.caption)}</span></article>`).join('')}</div>
      </div>
    `;
  }

  function renderEditing() {
    const progress = Number(activeProject().production?.editingProgress) || 0;
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Монтаж</h2><p>Черновая монтажная схема проекта. Полный видеоредактор будет отдельным модулем.</p></div><button class="soft-btn" data-action="toast-prototype">Прототип v02</button></header>
        <article class="card editing-progress-card">
          <div><h3>Прогресс чернового монтажа</h3><p>Отмечай готовность монтажа — показатель сразу обновится в правой панели.</p></div>
          <output id="editingProgressOutput">${progress}%</output>
          <input type="range" min="0" max="100" step="5" value="${progress}" data-production-field="editingProgress" aria-label="Прогресс монтажа" />
          <div class="editing-progress-presets">
            <button type="button" data-editing-progress="0">Не начат</button>
            <button type="button" data-editing-progress="25">Черновая сборка</button>
            <button type="button" data-editing-progress="50">Половина</button>
            <button type="button" data-editing-progress="75">Полировка</button>
            <button type="button" data-editing-progress="100">Готово</button>
          </div>
        </article>
        <article class="card timeline">
          <div class="timeline-track"><span>Видео 1</span>${Array.from({ length: 8 }, (_, i) => `<div class="clip">Кадр ${i + 1}</div>`).join('')}</div>
          <div class="timeline-track"><span>Звук</span>${Array.from({ length: 8 }, (_, i) => `<div class="clip audio">FX ${i + 1}</div>`).join('')}</div>
          <div class="timeline-track"><span>Музыка</span><div class="clip audio" style="grid-column: 2 / span 8">Атмосферная дорожка</div></div>
        </article>
      </div>
    `;
  }

  function renderExport() {
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Экспорт</h2><p>Сохрани данные проекта в переносимом формате.</p></div></header>
        <div class="export-grid">
          <article class="card export-option"><h3>Markdown</h3><p>Синопсис, акты, персонажи, сцены и промты в одном текстовом документе.</p><button class="primary-btn" data-action="export-md">Скачать .md</button></article>
          <article class="card export-option"><h3>JSON проекта</h3><p>Полная резервная копия данных для переноса между браузерами и сервером.</p><button class="soft-btn" data-action="export-json">Скачать .json</button></article>
          <article class="card export-option"><h3>Шотлист CSV</h3><p>Таблица кадров выбранной сцены для съёмки или видеогенерации.</p><button class="soft-btn" data-action="export-shotlist">Скачать .csv</button></article>
        </div>
      </div>
    `;
  }

  function renderSettings() {
    return `
      <div class="view-page">
        <header class="view-page-header"><div><h2>Настройки</h2><p>Параметры локального прототипа.</p></div><button class="primary-btn" data-action="save-settings">Сохранить</button></header>
        <article class="card settings-form">
          <label>Язык интерфейса<select data-setting="language"><option value="ru" ${state.settings.language === 'ru' ? 'selected' : ''}>Русский</option><option value="de" ${state.settings.language === 'de' ? 'selected' : ''}>Deutsch (позже)</option><option value="en" ${state.settings.language === 'en' ? 'selected' : ''}>English (позже)</option></select></label>
          <label>Основной видеогенератор<select data-setting="defaultEngine"><option value="seedance" ${state.settings.defaultEngine === 'seedance' ? 'selected' : ''}>Seedance</option><option value="kling" ${state.settings.defaultEngine === 'kling' ? 'selected' : ''}>Kling</option><option value="luma" ${state.settings.defaultEngine === 'luma' ? 'selected' : ''}>Luma</option></select></label>
          <label>Режим ИИ<input value="Локальный конструктор промтов — API ещё не подключён" disabled /></label>
          <label><input type="checkbox" data-setting="autoSave" ${state.settings.autoSave ? 'checked' : ''} /> Автоматически сохранять изменения</label>
          <button class="soft-btn" data-action="reset-demo">Сбросить все локальные данные</button>
        </article>
      </div>
    `;
  }

  function renderAssetsView() {
    return `
      <div class="view-page assets-page" data-assets-page>
        <header class="view-page-header"><div><h2>Ассеты проекта</h2><p>Все загруженные с компьютера фото, видео, аудио, документы и референсы.</p></div><button class="primary-btn" type="button" data-asset-open="project">📎 Добавить ассеты</button></header>
        <div class="asset-library-toolbar">
          <input id="assetLibrarySearch" placeholder="Поиск по названию файла..." />
          <select id="assetLibraryType"><option value="all">Все типы</option><option value="image">Изображения</option><option value="video">Видео</option><option value="audio">Аудио</option><option value="document">Документы</option><option value="other">Другие</option></select>
          <span id="assetLibrarySummary">Загрузка библиотеки...</span>
        </div>
        <div class="asset-library-grid" id="projectAssetGrid"><div class="empty-state"><h3>Загружаю ассеты...</h3></div></div>
      </div>`;
  }

  function renderView() {
    const views = {
      overview: renderOverview,
      world: renderWorld,
      structure: renderStructure,
      script: renderScript,
      characters: renderCharacters,
      locations: renderLocations,
      scenes: renderScenes,
      assets: renderAssetsView,
      prompts: renderPromptsView,
      renders: renderRenders,
      editing: renderEditing,
      export: renderExport,
      settings: renderSettings
    };
    els.viewHost.innerHTML = (views[state.activeView] || renderOverview)();
    bindViewEvents();
  }

  function statusLabel(status) {
    return ({ draft: 'Черновик', work: 'В работе', ready: 'Готово' })[status] || 'Черновик';
  }

  function engineLabel(engine) {
    return ({ seedance: 'Seedance', kling: 'Kling', luma: 'Luma' })[engine] || engine;
  }

  function ensurePrompts(project = activeProject()) {
    const scene = activeScene(project);
    const base = buildPromptBase(project, scene);
    if (!project.prompts.seedance) project.prompts.seedance = `Cinematic ${base}, continuous character consistency, expressive acting, controlled camera motion, high detail, 16:9, no text, no watermark.`;
    if (!project.prompts.kling) project.prompts.kling = `${base}. Long controlled shot, physically plausible movement, realistic cloth and hair motion, detailed environment, 24mm lens, cinematic lighting.`;
    if (!project.prompts.luma) project.prompts.luma = `${base}. Dramatic composition, soft volumetric fog, moody atmosphere, hyperrealistic, cinematic framing, subtle handheld camera.`;
  }

  function buildPromptBase(project, scene) {
    const title = scene ? scene.title : project.title;
    const location = scene ? scene.location : 'cinematic environment';
    const summary = scene ? scene.summary : project.logline;
    const action = scene?.action ? `Action: ${scene.action}` : '';
    const camera = scene?.camera ? `Camera: ${scene.camera}` : project.cameraNotes;
    const light = scene?.lighting ? `Lighting: ${scene.lighting}` : project.lightNotes;
    const sound = scene?.sound ? `Sound atmosphere: ${scene.sound}` : '';
    const note = scene?.promptNote || '';
    const characterNames = (scene?.characters || []).map(id => project.characters.find(item => item.id === id)?.name).filter(Boolean).join(', ');
    return [title, location, summary, characterNames ? `Characters: ${characterNames}` : '', action, camera, light, sound, note, project.style, project.mood].filter(Boolean).join(', ');
  }

  function renderPromptCards() {
    const p = activeProject();
    ensurePrompts(p);
    els.promptCards.innerHTML = Object.entries(p.prompts).map(([engine, value]) => `
      <article class="prompt-engine-card">
        <div class="prompt-engine-head">
          <span class="prompt-engine-name"><i class="engine-icon">${engine[0].toUpperCase()}</i>${engineLabel(engine)}</span>
          <button class="copy-prompt" data-copy-engine="${engine}">▣ Копировать</button>
        </div>
        <textarea class="prompt-edit" data-prompt-engine="${engine}">${escapeHtml(value)}</textarea>
      </article>
    `).join('');
  }

  function frameDescriptions(project = activeProject()) {
    const scene = activeScene(project);
    const title = scene?.title || 'Сцена';
    const location = scene?.location || 'Локация';
    const variants = [
      `Общий план: ${location}`,
      `Герой входит в пространство`,
      `Крупный план реакции`,
      `Деталь окружения и опасности`,
      `Движение через ${title.toLowerCase()}`,
      `Контрплан второго персонажа`,
      `Поворотный момент сцены`,
      `Финальный атмосферный кадр`
    ];
    return variants.slice(0, project.frameCount || 8);
  }

  function renderBreakdown() {
    const frames = frameDescriptions();
    els.breakdownList.innerHTML = frames.map((text, index) => `<div class="mini-row"><b>${index + 1}</b><span>${escapeHtml(text)}</span></div>`).join('');
  }

  function renderStoryboard() {
    const p = activeProject();
    const frames = p.storyboard.length ? p.storyboard : frameDescriptions(p).map((caption, index) => ({ number: index + 1, caption }));
    els.storyboard.innerHTML = frames.slice(0, 3).map(frame => `
      <article class="story-card"><span class="story-number">${frame.number}</span><span class="story-caption">${escapeHtml(frame.caption)}</span></article>
    `).join('');
    els.storyboardRange.textContent = `кадры 1–${Math.min(3, frames.length)} из ${frames.length}`;
  }

  function productionMetrics(project = activeProject()) {
    const textReady = (value, minLength) => String(value || '').trim().length >= minLength;
    const actsReady = Math.min(3, (project.acts || []).filter(act => textReady(act?.text, 35)).length);
    const characterScore = Math.min(10, Math.round(((project.characters || []).length / 3) * 10));
    const locationScore = Math.min(10, Math.round(((project.locations || []).length / 3) * 10));
    const sceneScore = Math.min(10, Math.round(((project.scenes || []).length / 3) * 10));
    const script = Math.max(0, Math.min(100,
      (textReady(project.logline, 25) ? 10 : 0) +
      (textReady(project.synopsis, 80) ? 20 : 0) +
      (textReady(project.script, 200) ? 25 : 0) +
      Math.round((actsReady / 3) * 15) +
      characterScore + locationScore + sceneScore
    ));
    const prompts = project.production?.promptsReady ? 100 : 0;
    const renders = Math.max(0, Math.min(100, Math.round((Number(project.renderCount) / Math.max(1, Number(project.renderTarget) || 1)) * 100)));
    const editing = Math.max(0, Math.min(100, Number(project.production?.editingProgress) || 0));
    return { script, prompts, renders, editing };
  }

  function applyProductionStep(element, percent) {
    if (!element) return;
    element.classList.toggle('done', percent >= 100);
    element.classList.toggle('progress', percent > 0 && percent < 100);
    element.classList.toggle('pending', percent <= 0);
  }

  function renderProgress() {
    const p = activeProject();
    const metrics = productionMetrics(p);

    els.scriptProgressValue.textContent = metrics.script >= 100 ? '✓' : `${metrics.script}%`;
    els.scriptProgressLabel.textContent = metrics.script >= 100 ? 'готов' : metrics.script > 0 ? `${metrics.script}%` : 'не начат';
    applyProductionStep(els.scriptStep, metrics.script);

    els.promptsProgressValue.textContent = metrics.prompts >= 100 ? '✓' : `${metrics.prompts}%`;
    els.promptsProgressLabel.textContent = metrics.prompts >= 100 ? 'готовы' : 'не готовы';
    applyProductionStep(els.promptsStep, metrics.prompts);

    els.renderProgressValue.textContent = metrics.renders >= 100 ? '✓' : `${metrics.renders}%`;
    els.renderCountValue.textContent = `${Number(p.renderCount) || 0}/${Number(p.renderTarget) || 0}`;
    applyProductionStep(els.rendersStep, metrics.renders);

    els.editingProgressValue.textContent = metrics.editing >= 100 ? '✓' : `${metrics.editing}%`;
    els.editingProgressLabel.textContent = metrics.editing >= 100 ? 'готов' : metrics.editing > 0 ? `${metrics.editing}%` : 'не начат';
    applyProductionStep(els.editingStep, metrics.editing);
  }

  function bindViewEvents() {
    $$('[data-field]', els.viewHost).forEach(input => {
      input.addEventListener('input', () => {
        const p = activeProject();
        const field = input.dataset.field;
        p[field] = input.type === 'number' ? Number(input.value) : input.value;
        if (['genre', 'duration'].includes(field)) renderShell();
        autosave();
      });
    });

    $$('[data-act-index]', els.viewHost).forEach(input => {
      input.addEventListener('input', () => {
        const p = activeProject();
        const index = Number(input.dataset.actIndex);
        const field = input.dataset.actField;
        if (p.acts[index]) p.acts[index][field] = input.value;
        autosave();
      });
    });

    $$('[data-character-id]', els.viewHost).forEach(input => {
      input.addEventListener('input', () => {
        const p = activeProject();
        const character = p.characters.find(item => item.id === input.dataset.characterId);
        if (character) character[input.dataset.characterField] = input.value;
        autosave();
      });
    });

    $$('[data-location-id]', els.viewHost).forEach(input => {
      input.addEventListener('input', () => {
        const p = activeProject();
        const location = p.locations.find(item => item.id === input.dataset.locationId);
        if (location) location[input.dataset.locationField] = input.value;
        autosave();
      });
    });

    $$('[data-prompt-engine]', els.viewHost).forEach(input => {
      input.addEventListener('input', () => {
        const p = activeProject();
        p.prompts[input.dataset.promptEngine] = input.value;
        p.production = p.production || { promptsReady: false, editingProgress: 0 };
        p.production.promptsReady = true;
        renderPromptCards();
        autosave();
      });
    });

    $$('[data-production-field]', els.viewHost).forEach(input => {
      input.addEventListener('input', () => {
        const p = activeProject();
        p.production = p.production || { promptsReady: false, editingProgress: 0 };
        p.production[input.dataset.productionField] = Math.max(0, Math.min(100, Number(input.value) || 0));
        const output = $('#editingProgressOutput', els.viewHost);
        if (output) output.textContent = `${p.production.editingProgress}%`;
        autosave();
      });
    });

    $$('[data-editing-progress]', els.viewHost).forEach(button => {
      button.addEventListener('click', () => {
        const value = Math.max(0, Math.min(100, Number(button.dataset.editingProgress) || 0));
        const p = activeProject();
        p.production = p.production || { promptsReady: false, editingProgress: 0 };
        p.production.editingProgress = value;
        const range = $('[data-production-field="editingProgress"]', els.viewHost);
        const output = $('#editingProgressOutput', els.viewHost);
        if (range) range.value = String(value);
        if (output) output.textContent = `${value}%`;
        autosave();
      });
    });

    $$('[data-open-character]', els.viewHost).forEach(card => {
      const open = event => {
        if (event.target.closest('button, input, textarea, select')) return;
        openCharacterDialog(card.dataset.openCharacter);
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') open(event); });
    });

    $$('[data-open-location]', els.viewHost).forEach(card => {
      const open = event => {
        if (event.target.closest('button, input, textarea, select')) return;
        openLocationDialog(card.dataset.openLocation);
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') open(event); });
    });

    $$('[data-scene-id]', els.viewHost).forEach(row => {
      row.addEventListener('click', event => {
        if (event.target.closest('button')) return;
        activeProject().activeSceneId = row.dataset.sceneId;
        renderShell();
        renderView();
        saveState();
      });
      row.addEventListener('dblclick', event => {
        if (!event.target.closest('button')) openSceneDialog(row.dataset.sceneId);
      });
    });

    $$('[data-setting]', els.viewHost).forEach(control => {
      control.addEventListener('change', () => {
        const key = control.dataset.setting;
        state.settings[key] = control.type === 'checkbox' ? control.checked : control.value;
        saveState();
      });
    });

    $$('[data-action]', els.viewHost).forEach(btn => btn.addEventListener('click', () => handleAction(btn.dataset.action, btn)));
    $$('[data-copy-engine]', els.viewHost).forEach(btn => btn.addEventListener('click', () => copyEngine(btn.dataset.copyEngine)));
  }

  function handleAction(action, button) {
    const p = activeProject();
    switch (action) {
      case 'go-structure': return setActiveView('structure');
      case 'go-characters': return setActiveView('characters');
      case 'go-scenes': return setActiveView('scenes');
      case 'focus-synopsis': return $('[data-field="synopsis"]', els.viewHost)?.focus();
      case 'add-character': return addCharacter();
      case 'edit-character': return openCharacterDialog(button.dataset.id);
      case 'duplicate-character': return duplicateCharacter(button.dataset.id);
      case 'delete-character': return requestDeleteCharacter(button.dataset.id);
      case 'add-location': return addLocation();
      case 'edit-location': return openLocationDialog(button.dataset.id);
      case 'duplicate-location': return duplicateLocation(button.dataset.id);
      case 'delete-location': return requestDeleteLocation(button.dataset.id);
      case 'add-scene': return addScene();
      case 'edit-scene': return editScene(button.dataset.id);
      case 'duplicate-scene': return duplicateScene(button.dataset.id);
      case 'generate-world':
        p.worldBible += `

КОНФЛИКТЫ МИРА
— Нехватка медикаментов.
— Распад доверия внутри групп.
— Военный периметр скрывает истинную причину вспышки.`;
        saveState(); renderView(); toast('Раздел мира дополнен локальным шаблоном'); return;
      case 'generate-structure':
        p.acts[0].text = 'Представление героя и мира. Инцидент нарушает обычный порядок. Герой вынужден принять цель.';
        p.acts[1].text = 'Серия усложнений, потерь и моральных выборов. Центральный поворот меняет понимание цели.';
        p.acts[2].text = 'Финальное решение, кульминация и последствия выбора героя. Закрытие основной эмоциональной дуги.';
        saveState(); renderView(); toast('Структура обновлена локальным шаблоном'); return;
      case 'format-script':
        p.script = p.script.replace(/\n{3,}/g, '\n\n').trim();
        saveState(); renderView(); toast('Форматирование применено'); return;
      case 'regenerate-prompts': return regeneratePrompts();
      case 'generate-frames': return generateFrames();
      case 'export-md': return exportMarkdown();
      case 'export-json': return exportJson();
      case 'export-shotlist': return exportShotlist();
      case 'toast-prototype': return toast('Монтажный модуль пока показан как прототип');
      case 'save-settings': saveState({ silent: false }); return;
      case 'reset-demo':
        return openConfirmDialog({
          title: 'Сбросить локальные данные?',
          message: 'Все локальные проекты в этом браузере будут удалены и вернётся демонстрационный проект.',
          confirmLabel: 'Сбросить всё',
          onConfirm: () => { state = initialState(); saveState(); renderAll(); toast('Локальные данные сброшены'); }
        });
    }
  }

  function addCharacter() {
    openCharacterDialog();
  }

  function addLocation() {
    openLocationDialog();
  }

  function addScene() {
    openSceneDialog();
  }

  function editScene(id) {
    openSceneDialog(id);
  }

  function openCharacterDialog(id = '') {
    const p = activeProject();
    const character = id ? p.characters.find(item => item.id === id) : normalizeCharacter({ name: '', role: '', occupation: '' });
    if (!character) return;
    $('#characterDialogKicker').textContent = id ? 'Персонаж проекта' : 'Новый персонаж';
    $('#characterDialogTitle').textContent = id ? character.name : 'Создать персонажа';
    $('#characterId').value = id || '';
    const fields = ['Name','Age','Role','Occupation','Goal','Motivation','Conflict','Appearance','Wardrobe','Voice','Arc','Notes'];
    const keys = ['name','age','role','occupation','goal','motivation','conflict','appearance','wardrobe','voice','arc','notes'];
    fields.forEach((field, index) => { $(`#character${field}`).value = character[keys[index]] || ''; });
    $('#characterDeleteBtn').hidden = !id;
    els.characterDialog.showModal();
    setTimeout(() => $('#characterName').focus(), 30);
  }

  function saveCharacterFromDialog(event) {
    event.preventDefault();
    const p = activeProject();
    const id = $('#characterId').value;
    const data = normalizeCharacter({
      id: id || uid('char'),
      name: $('#characterName').value.trim() || 'Без имени',
      age: $('#characterAge').value.trim(),
      role: $('#characterRole').value.trim(),
      occupation: $('#characterOccupation').value.trim(),
      goal: $('#characterGoal').value.trim(),
      motivation: $('#characterMotivation').value.trim(),
      conflict: $('#characterConflict').value.trim(),
      appearance: $('#characterAppearance').value.trim(),
      wardrobe: $('#characterWardrobe').value.trim(),
      voice: $('#characterVoice').value.trim(),
      arc: $('#characterArc').value.trim(),
      notes: $('#characterNotes').value.trim()
    });
    const index = p.characters.findIndex(item => item.id === id);
    if (index >= 0) p.characters[index] = data; else p.characters.push(data);
    els.characterDialog.close();
    saveState(); renderView(); renderShell(); toast(index >= 0 ? 'Карточка персонажа сохранена' : 'Персонаж создан');
  }

  function duplicateCharacter(id) {
    const p = activeProject();
    const source = p.characters.find(item => item.id === id);
    if (!source) return;
    p.characters.push(normalizeCharacter({ ...source, id: uid('char'), name: `${source.name} — копия` }));
    saveState(); renderView(); renderShell(); toast('Персонаж продублирован');
  }

  function requestDeleteCharacter(id) {
    const p = activeProject();
    const character = p.characters.find(item => item.id === id);
    if (!character) return;
    openConfirmDialog({
      title: `Удалить «${character.name}»?`,
      message: 'Персонаж будет удалён из проекта и из списка участников сцен.',
      confirmLabel: 'Удалить персонажа',
      onConfirm: () => {
        p.characters = p.characters.filter(item => item.id !== id);
        p.scenes.forEach(scene => { scene.characters = scene.characters.filter(charId => charId !== id); });
        if (els.characterDialog.open) els.characterDialog.close();
        saveState(); renderView(); renderShell(); toast('Персонаж удалён');
      }
    });
  }

  function openLocationDialog(id = '') {
    const p = activeProject();
    const location = id ? p.locations.find(item => item.id === id) : normalizeLocation({ name: '' });
    if (!location) return;
    $('#locationDialogKicker').textContent = id ? 'Локация проекта' : 'Новая локация';
    $('#locationDialogTitle').textContent = id ? location.name : 'Создать локацию';
    $('#locationId').value = id || '';
    const fields = ['Name','Description','Atmosphere','Lighting','Sound','Props','Continuity','Notes'];
    const keys = ['name','description','atmosphere','lighting','sound','props','continuity','notes'];
    fields.forEach((field, index) => { $(`#location${field}`).value = location[keys[index]] || ''; });
    $('#locationDeleteBtn').hidden = !id;
    els.locationDialog.showModal();
    setTimeout(() => $('#locationName').focus(), 30);
  }

  function saveLocationFromDialog(event) {
    event.preventDefault();
    const p = activeProject();
    const id = $('#locationId').value;
    const oldName = p.locations.find(item => item.id === id)?.name || '';
    const data = normalizeLocation({
      id: id || uid('loc'),
      name: $('#locationName').value.trim() || 'Без названия',
      description: $('#locationDescription').value.trim(),
      atmosphere: $('#locationAtmosphere').value.trim(),
      lighting: $('#locationLighting').value.trim(),
      sound: $('#locationSound').value.trim(),
      props: $('#locationProps').value.trim(),
      continuity: $('#locationContinuity').value.trim(),
      notes: $('#locationNotes').value.trim()
    });
    const index = p.locations.findIndex(item => item.id === id);
    if (index >= 0) {
      p.locations[index] = data;
      if (oldName && oldName !== data.name) p.scenes.forEach(scene => { if (scene.location === oldName) scene.location = data.name; });
    } else p.locations.push(data);
    els.locationDialog.close();
    saveState(); renderView(); renderShell(); toast(index >= 0 ? 'Карточка локации сохранена' : 'Локация создана');
  }

  function duplicateLocation(id) {
    const p = activeProject();
    const source = p.locations.find(item => item.id === id);
    if (!source) return;
    p.locations.push(normalizeLocation({ ...source, id: uid('loc'), name: `${source.name} — копия` }));
    saveState(); renderView(); toast('Локация продублирована');
  }

  function requestDeleteLocation(id) {
    const p = activeProject();
    const location = p.locations.find(item => item.id === id);
    if (!location) return;
    openConfirmDialog({
      title: `Удалить «${location.name}»?`,
      message: 'Сцены останутся в проекте, но название локации в них не будет изменено.',
      confirmLabel: 'Удалить локацию',
      onConfirm: () => {
        p.locations = p.locations.filter(item => item.id !== id);
        if (els.locationDialog.open) els.locationDialog.close();
        saveState(); renderView(); toast('Локация удалена');
      }
    });
  }

  function openSceneDialog(id = '') {
    const p = activeProject();
    const nextNumber = p.scenes.length ? Math.max(...p.scenes.map(scene => Number(scene.number) || 0)) + 1 : 1;
    const scene = id ? p.scenes.find(item => item.id === id) : normalizeScene({
      number: nextNumber,
      title: '',
      location: p.locations[0]?.name || '',
      camera: p.cameraNotes || '',
      lighting: p.lightNotes || ''
    });
    if (!scene) return;
    $('#sceneDialogKicker').textContent = id ? `Сцена ${scene.number}` : 'Новая сцена';
    $('#sceneDialogTitle').textContent = id ? scene.title : 'Создать сцену';
    $('#sceneId').value = id || '';
    $('#sceneNumber').value = scene.number || nextNumber;
    $('#sceneTitle').value = scene.title || '';
    $('#sceneLocation').value = scene.location || '';
    $('#sceneLocationList').innerHTML = p.locations.map(location => `<option value="${escapeHtml(location.name)}"></option>`).join('');
    $('#sceneTime').value = scene.timeOfDay || 'День';
    $('#scenePages').value = scene.pages || '1';
    $('#sceneDurationSec').value = scene.durationSec || '';
    $('#sceneStatus').value = scene.status || 'draft';
    $('#sceneSummary').value = scene.summary || '';
    $('#scenePurpose').value = scene.purpose || '';
    $('#sceneConflict').value = scene.conflict || '';
    $('#sceneAction').value = scene.action || '';
    $('#sceneDialogue').value = scene.dialogue || '';
    $('#sceneCamera').value = scene.camera || '';
    $('#sceneLighting').value = scene.lighting || '';
    $('#sceneSound').value = scene.sound || '';
    $('#scenePromptNote').value = scene.promptNote || '';
    $('#sceneNotes').value = scene.notes || '';
    $('#sceneCharactersPicker').innerHTML = p.characters.length ? p.characters.map(character => `
      <label class="character-chip"><input type="checkbox" value="${character.id}" ${(scene.characters || []).includes(character.id) ? 'checked' : ''}><span>${escapeHtml(character.name)}</span></label>
    `).join('') : '<small>Сначала добавь персонажей в проект.</small>';
    $('#sceneDeleteBtn').hidden = !id;
    els.sceneDialog.showModal();
    setTimeout(() => $('#sceneTitle').focus(), 30);
  }

  function saveSceneFromDialog(event) {
    event.preventDefault();
    const p = activeProject();
    const id = $('#sceneId').value;
    const selectedCharacters = $$('#sceneCharactersPicker input:checked').map(input => input.value);
    const data = normalizeScene({
      id: id || uid('scene'),
      number: Number($('#sceneNumber').value) || 1,
      title: $('#sceneTitle').value.trim() || 'Без названия',
      location: $('#sceneLocation').value.trim(),
      timeOfDay: $('#sceneTime').value,
      pages: $('#scenePages').value.trim(),
      durationSec: Number($('#sceneDurationSec').value) || 0,
      status: $('#sceneStatus').value,
      summary: $('#sceneSummary').value.trim(),
      purpose: $('#scenePurpose').value.trim(),
      conflict: $('#sceneConflict').value.trim(),
      action: $('#sceneAction').value.trim(),
      dialogue: $('#sceneDialogue').value.trim(),
      characters: selectedCharacters,
      camera: $('#sceneCamera').value.trim(),
      lighting: $('#sceneLighting').value.trim(),
      sound: $('#sceneSound').value.trim(),
      promptNote: $('#scenePromptNote').value.trim(),
      notes: $('#sceneNotes').value.trim()
    });
    const index = p.scenes.findIndex(item => item.id === id);
    if (index >= 0) p.scenes[index] = data; else p.scenes.push(data);
    p.activeSceneId = data.id;
    p.prompts = { seedance: '', kling: '', luma: '' };
    els.sceneDialog.close();
    saveState(); renderView(); renderShell(); toast(index >= 0 ? 'Сцена сохранена' : 'Сцена создана');
  }

  function duplicateScene(id) {
    const p = activeProject();
    const source = p.scenes.find(item => item.id === id);
    if (!source) return;
    const nextNumber = p.scenes.length ? Math.max(...p.scenes.map(scene => Number(scene.number) || 0)) + 1 : 1;
    const copy = normalizeScene({ ...source, id: uid('scene'), number: nextNumber, title: `${source.title} — копия`, status: 'draft' });
    p.scenes.push(copy);
    p.activeSceneId = copy.id;
    saveState(); renderView(); renderShell(); toast('Сцена продублирована');
  }

  function requestDeleteScene(id) {
    const p = activeProject();
    const scene = p.scenes.find(item => item.id === id);
    if (!scene) return;
    openConfirmDialog({
      title: `Удалить сцену ${scene.number}?`,
      message: `Сцена «${scene.title}» и её данные будут удалены из проекта.`,
      confirmLabel: 'Удалить сцену',
      onConfirm: () => {
        p.scenes = p.scenes.filter(item => item.id !== id);
        p.activeSceneId = p.scenes.at(-1)?.id || null;
        if (els.sceneDialog.open) els.sceneDialog.close();
        saveState(); renderView(); renderShell(); toast('Сцена удалена');
      }
    });
  }

  function openConfirmDialog({ title, message, confirmLabel = 'Подтвердить', onConfirm }) {
    $('#confirmTitle').textContent = title;
    $('#confirmMessage').textContent = message;
    $('#confirmSubmitBtn').textContent = confirmLabel;
    confirmDialogAction = onConfirm;
    els.confirmDialog.showModal();
  }

  function regeneratePrompts() {
    const p = activeProject();
    const scene = activeScene(p);
    const base = buildPromptBase(p, scene);
    p.prompts.seedance = `Cinematic sequence: ${base}. Shot progression from a clear establishing shot to expressive character close-ups, natural body motion, consistent faces and clothing, coherent environment, cinematic lighting, 16:9, no subtitles, no watermark.`;
    p.prompts.kling = `${base}. Controlled camera movement through the environment, wide lens changing to a natural close-up, grounded acting, realistic physics, coherent background, cinematic color grading.`;
    p.prompts.luma = `${base}. Dramatic but genre-appropriate lighting, expressive performance, strong depth, detailed textures, cinematic framing, smooth camera movement, visual continuity.`;
    p.production = p.production || { promptsReady: false, editingProgress: 0 };
    p.production.promptsReady = true;
    saveState(); renderPromptCards(); renderProgress(); renderProjectList(); if (state.activeView === 'prompts') renderView(); toast('Промты обновлены');
  }

  function generateFrames() {
    const p = activeProject();
    p.storyboard = frameDescriptions(p).map((caption, index) => ({ id: uid('frame'), number: index + 1, caption, status: 'draft' }));
    p.renderCount = Math.min(p.renderTarget, p.renderCount + p.storyboard.length);
    saveState(); renderStoryboard(); renderProgress(); if (state.activeView === 'renders') renderView(); toast('Создана разбивка на 8 черновых кадров');
  }

  function markdownForProject(p) {
    ensurePrompts(p);
    return `# ${p.title}

**Жанр:** ${p.genre}

**Формат:** ${p.format}

**Хронометраж:** ${p.duration} минут

## Логлайн

${p.logline}

## Синопсис

${p.synopsis}

## Трёхактная структура

${p.acts.map(act => `### ${act.name}: ${act.title} (${act.time})

${act.text}`).join('\n\n')}

## Персонажи

${p.characters.map(char => `### ${char.name}

- Роль: ${char.role || '—'}
- Возраст: ${char.age || '—'}
- Профессия: ${char.occupation || '—'}
- Цель: ${char.goal || '—'}
- Мотивация: ${char.motivation || '—'}
- Конфликт: ${char.conflict || '—'}
- Внешность: ${char.appearance || '—'}
- Одежда: ${char.wardrobe || '—'}
- Речь: ${char.voice || '—'}
- Дуга: ${char.arc || '—'}`).join('\n\n')}

## Локации

${p.locations.map(loc => `### ${loc.name}

${loc.description}

- Атмосфера: ${loc.atmosphere || '—'}
- Свет: ${loc.lighting || '—'}
- Звук: ${loc.sound || '—'}
- Реквизит: ${loc.props || '—'}
- Непрерывность: ${loc.continuity || '—'}`).join('\n\n')}

## Сцены

${p.scenes.map(scene => `### Сцена ${scene.number}: ${scene.title}

Локация: ${scene.location}. Время: ${scene.timeOfDay}. Статус: ${statusLabel(scene.status)}.${scene.durationSec ? ` Длительность: ${scene.durationSec} сек.` : ''}

**Кратко:** ${scene.summary || '—'}

**Цель сцены:** ${scene.purpose || '—'}

**Конфликт:** ${scene.conflict || '—'}

**Действие:**

${scene.action || '—'}

**Диалог:**

${scene.dialogue || '—'}

**Камера:** ${scene.camera || '—'}

**Свет:** ${scene.lighting || '—'}

**Звук:** ${scene.sound || '—'}`).join('\n\n')}

## Промты

${Object.entries(p.prompts).map(([engine, value]) => `### ${engineLabel(engine)}

${value}`).join('\n\n')}
`;
  }

  function safeFilename(value) {
    return String(value || 'project').trim().replace(/[\\/:*?"<>|]+/g, '_').replace(/\s+/g, '_');
  }

  function downloadFile(filename, content, mime = 'text/plain;charset=utf-8') {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportMarkdown() {
    const p = activeProject();
    downloadFile(`${safeFilename(p.title)}.md`, markdownForProject(p), 'text/markdown;charset=utf-8');
    toast('Markdown-файл подготовлен');
  }

  function exportJson() {
    const p = activeProject();
    downloadFile(`${safeFilename(p.title)}.json`, JSON.stringify(p, null, 2), 'application/json;charset=utf-8');
    toast('JSON-файл подготовлен');
  }

  function exportShotlist() {
    const p = activeProject();
    const scene = activeScene(p);
    const rows = frameDescriptions(p).map((text, index) => [index + 1, scene?.number || '', scene?.title || '', scene?.location || '', text, p.cameraNotes, p.lightNotes]);
    const csv = [['Кадр', 'Сцена', 'Название', 'Локация', 'Описание кадра', 'Камера', 'Свет'], ...rows]
      .map(row => row.map(cell => `"${String(cell).replaceAll('"', '""')}"`).join(';')).join('\n');
    downloadFile(`${safeFilename(p.title)}_shotlist.csv`, '\ufeff' + csv, 'text/csv;charset=utf-8');
    toast('Шотлист подготовлен');
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast('Скопировано в буфер обмена');
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      toast('Скопировано в буфер обмена');
    }
  }

  function copyEngine(engine) {
    ensurePrompts();
    copyText(activeProject().prompts[engine] || '');
  }

  function openTextDialog({ title, label, value, onSave }) {
    els.textDialogTitle.textContent = title;
    els.textDialogLabel.childNodes[0].nodeValue = `${label}`;
    els.textDialogInput.value = value;
    textDialogAction = onSave;
    els.textDialog.showModal();
    setTimeout(() => els.textDialogInput.focus(), 50);
  }

  function createProjectFromDialog(event) {
    event.preventDefault();
    const title = $('#newProjectTitle').value.trim();
    if (!title) return;
    const project = normalizeProject({
      id: uid('project'),
      title,
      genre: $('#newProjectGenre').value.trim() || 'Без жанра',
      duration: Number($('#newProjectDuration').value) || 15,
      format: 'Новый проект',
      style: 'Не задан',
      mood: 'Не задано',
      continuity: '',
      logline: $('#newProjectLogline').value.trim(),
      synopsis: $('#newProjectLogline').value.trim(),
      script: '',
      worldBible: '',
      acts: [
        { name: 'Акт 1', title: 'Завязка', time: '0–30%', text: '' },
        { name: 'Акт 2', title: 'Противостояние', time: '30–75%', text: '' },
        { name: 'Акт 3', title: 'Развязка', time: '75–100%', text: '' }
      ],
      characters: [],
      locations: [],
      scenes: [],
      cameraNotes: '',
      lightNotes: '',
      storyboard: [],
      prompts: { seedance: '', kling: '', luma: '' },
      renderCount: 0,
      renderTarget: 80,
      production: {
        promptsReady: false,
        editingProgress: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    state.projects.push(project);
    state.activeProjectId = project.id;
    state.activeView = 'overview';
    els.projectDialog.close();
    els.projectForm.reset();
    saveState(); renderAll(); toast('Новый проект создан. Предыдущие проекты сохранены слева.');
  }

  function executeCommand() {
    const input = $('#commandInput');
    const command = input.value.trim();
    if (!command) return;
    const normalized = command.toLowerCase();
    if (normalized.includes('8 кадр') || normalized.includes('разбей') || normalized.includes('сториборд')) generateFrames();
    if (normalized.includes('промт') || normalized.includes('seedance') || normalized.includes('kling')) regeneratePrompts();
    if (normalized.includes('структур')) handleAction('generate-structure', document.createElement('button'));
    if (normalized.includes('персонаж')) addCharacter();
    if (normalized.includes('локац')) addLocation();
    if (normalized.includes('нов') && normalized.includes('сцен')) addScene();
    input.value = '';
    toast('Команда обработана локальным помощником');
  }

  function bindGlobalEvents() {
    els.mainNav.addEventListener('click', event => {
      const btn = event.target.closest('[data-view]');
      if (btn) setActiveView(btn.dataset.view);
    });
    els.topTabs.addEventListener('click', event => {
      const btn = event.target.closest('[data-view]');
      if (btn) setActiveView(btn.dataset.view);
    });

    $('#newProjectBtn').addEventListener('click', () => els.projectDialog.showModal());
    els.projectForm.addEventListener('submit', createProjectFromDialog);
    els.characterForm.addEventListener('submit', saveCharacterFromDialog);
    els.locationForm.addEventListener('submit', saveLocationFromDialog);
    els.sceneForm.addEventListener('submit', saveSceneFromDialog);
    els.confirmForm.addEventListener('submit', event => {
      event.preventDefault();
      const action = confirmDialogAction;
      confirmDialogAction = null;
      els.confirmDialog.close();
      if (typeof action === 'function') action();
    });
    $$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.closeDialog);
      if (dialog?.open) dialog.close();
    }));
    $('#characterDeleteBtn').addEventListener('click', () => requestDeleteCharacter($('#characterId').value));
    $('#locationDeleteBtn').addEventListener('click', () => requestDeleteLocation($('#locationId').value));
    $('#sceneDeleteBtn').addEventListener('click', () => requestDeleteScene($('#sceneId').value));

    els.projectSwitcher.addEventListener('click', () => {
      const hidden = els.projectMenu.hidden;
      els.projectMenu.hidden = !hidden;
      els.projectSwitcher.setAttribute('aria-expanded', String(hidden));
    });
    els.projectMenu.addEventListener('click', event => {
      const btn = event.target.closest('[data-project-id]');
      if (!btn) return;
      state.activeProjectId = btn.dataset.projectId;
      els.projectMenu.hidden = true;
      try { persistLocalState(); } catch (error) { console.warn(error); }
      renderAll();
    });
    els.projectList?.addEventListener('click', event => {
      const btn = event.target.closest('[data-project-list-id]');
      if (!btn) return;
      state.activeProjectId = btn.dataset.projectListId;
      state.activeView = 'overview';
      try { persistLocalState(); } catch (error) { console.warn(error); }
      renderAll();
      toast(`Открыт проект «${activeProject().title}»`);
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.project-switcher') && !event.target.closest('.project-menu')) els.projectMenu.hidden = true;
    });

    $('#renameProjectBtn').addEventListener('click', () => {
      const p = activeProject();
      openTextDialog({ title: 'Переименовать проект', label: 'Название', value: p.title, onSave: value => { p.title = value || p.title; saveState(); renderAll(); } });
    });
    els.textDialogForm.addEventListener('submit', event => {
      event.preventDefault();
      if (typeof textDialogAction === 'function') textDialogAction(els.textDialogInput.value.trim());
      textDialogAction = null;
      els.textDialog.close();
    });

    $('#shareBtn').addEventListener('click', () => copyText(markdownForProject(activeProject())));
    $('#projectMoreBtn').addEventListener('click', () => saveState({ silent: false }));
    $('#manageStorageBtn').addEventListener('click', () => setActiveView('settings'));

    $('#roleTabs').addEventListener('click', event => {
      const btn = event.target.closest('[data-role]');
      if (!btn) return;
      state.activeRole = btn.dataset.role;
      $$('#roleTabs [data-role]').forEach(item => item.classList.toggle('active', item === btn));
      const labels = { writer: 'ИИ-сценарист', director: 'ИИ-режиссёр', camera: 'ИИ-оператор', editor: 'ИИ-монтажёр' };
      $('.assistant-title strong').textContent = labels[state.activeRole];
      try { persistLocalState(); } catch (error) { console.warn(error); }
    });

    $('#assistantAccordion').addEventListener('click', event => {
      const button = event.target.closest('[data-accordion]');
      if (!button) return;
      const key = button.dataset.accordion;
      const panel = $(`[data-panel="${key}"]`);
      const isHidden = panel.hidden;
      panel.hidden = !isHidden;
      button.querySelector('span').textContent = isHidden ? '⌄' : '›';
    });

    els.cameraNotes.addEventListener('input', () => {
      const p = activeProject();
      const scene = activeScene(p);
      if (scene) scene.camera = els.cameraNotes.value; else p.cameraNotes = els.cameraNotes.value;
      autosave();
    });
    els.lightNotes.addEventListener('input', () => {
      const p = activeProject();
      const scene = activeScene(p);
      if (scene) scene.lighting = els.lightNotes.value; else p.lightNotes = els.lightNotes.value;
      autosave();
    });
    els.promptCards.addEventListener('input', event => {
      const input = event.target.closest('[data-prompt-engine]');
      if (!input) return;
      const p = activeProject();
      p.prompts[input.dataset.promptEngine] = input.value;
      p.production = p.production || { promptsReady: false, editingProgress: 0 };
      p.production.promptsReady = true;
      autosave();
    });
    els.promptCards.addEventListener('click', event => {
      const btn = event.target.closest('[data-copy-engine]');
      if (btn) copyEngine(btn.dataset.copyEngine);
    });

    $('#generateFramesBtn').addEventListener('click', generateFrames);
    $('#makeStoryboardBtn').addEventListener('click', generateFrames);
    $('#exportMdBtn').addEventListener('click', exportMarkdown);
    $('#shotlistBtn').addEventListener('click', exportShotlist);
    $('#commandSendBtn').addEventListener('click', executeCommand);
    $('#commandInput').addEventListener('keydown', event => { if (event.key === 'Enter') executeCommand(); });

    $('#themeBtn').addEventListener('click', () => document.body.classList.toggle('light-mode'));
    $('#notifyBtn').addEventListener('click', () => toast('Уведомления появятся после подключения серверного ИИ'));
    $('#profileBtn').addEventListener('click', () => { location.href = '/cabinet.html'; });
  }

  function replaceState(nextState, { saveLocal = true } = {}) {
    if (!nextState || !Array.isArray(nextState.projects) || !nextState.projects.length) return false;
    const base = initialState();
    state = {
      ...base,
      ...nextState,
      version: APP_VERSION,
      projects: nextState.projects.map(normalizeProject)
    };
    if (!state.projects.some(project => project.id === state.activeProjectId)) {
      state.activeProjectId = state.projects[0].id;
    }
    if (saveLocal) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { console.warn(error); }
    }
    renderAll();
    window.GromvexAssets?.refresh?.();
    return true;
  }

  function renderAll() {
    state.version = APP_VERSION;
    renderShell();
    setActiveView(state.activeView || 'overview', { persist: false });
    $$('#roleTabs [data-role]').forEach(item => item.classList.toggle('active', item.dataset.role === state.activeRole));
    const labels = { writer: 'ИИ-сценарист', director: 'ИИ-режиссёр', camera: 'ИИ-оператор', editor: 'ИИ-монтажёр' };
    $('.assistant-title strong').textContent = labels[state.activeRole] || labels.director;
  }

  window.GromvexStudio = {
    getState: () => state,
    activeProject,
    activeScene,
    saveState,
    renderView,
    renderShell,
    renderAll,
    replaceState,
    setActiveView,
    toast,
    uid
  };

  bindGlobalEvents();
  renderAll();
  window.GromvexServer?.bootstrapStudio?.().catch(error => {
    console.error(error);
    toast('Не удалось подключиться к серверу. Проверь backend и вход.', 'error');
  });
})();
