(function () {
  // Temporary front-end credentials for GitHub Pages/static hosting.
  // For real private access, move this check to a backend later.
  const OWNER_EMAIL = 'agenhill@local';
  const OWNER_PASSWORD = 'agenhill2026';

  const loginPanel = document.getElementById('loginPanel');
  const workspace = document.getElementById('workspace');
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('cabEmail');
  const passInput = document.getElementById('cabPassword');
  const loginError = document.getElementById('loginError');
  const ids = ['projectTitle','logline','genre','format','style','characters','scenes','output'];

  function openWorkspace() {
    sessionStorage.setItem('agenhill_cabinet_open', '1');
    loginPanel.hidden = true;
    workspace.hidden = false;
    loadData();
  }

  function closeWorkspace() {
    sessionStorage.removeItem('agenhill_cabinet_open');
    workspace.hidden = true;
    loginPanel.hidden = false;
    passInput.value = '';
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const ok = (emailInput.value || '').trim().toLowerCase() === OWNER_EMAIL.toLowerCase()
        && (passInput.value || '') === OWNER_PASSWORD;
      if (ok) openWorkspace();
      else loginError.hidden = false;
    });
  }

  if (sessionStorage.getItem('agenhill_cabinet_open') === '1') openWorkspace();

  function collect() {
    const data = {};
    ids.forEach(id => data[id] = (document.getElementById(id)?.value || '').trim());
    return data;
  }
  function loadData() {
    try {
      const data = JSON.parse(localStorage.getItem('agenhill_scenario_workspace') || '{}');
      ids.forEach(id => { if (data[id] !== undefined && document.getElementById(id)) document.getElementById(id).value = data[id]; });
    } catch (e) {}
  }
  function saveData() {
    localStorage.setItem('agenhill_scenario_workspace', JSON.stringify(collect()));
  }

  document.getElementById('saveBtn')?.addEventListener('click', saveData);
  document.getElementById('logoutBtn')?.addEventListener('click', closeWorkspace);
  document.getElementById('clearBtn')?.addEventListener('click', function () {
    if (!confirm('Очистить локальную выкладку?')) return;
    localStorage.removeItem('agenhill_scenario_workspace');
    ids.forEach(id => { if (document.getElementById(id)) document.getElementById(id).value = ''; });
  });

  function baseContext() {
    const d = collect();
    return `Project: ${d.projectTitle || '[project title]'}\nFormat: ${d.format || '[format]'}\nGenre: ${d.genre || '[genre]'}\nLogline: ${d.logline || '[logline]'}\nCharacters:\n${d.characters || '[characters]'}\nVisual style:\n${d.style || '[visual style]'}\nScenes / notes:\n${d.scenes || '[scenes]'}\n`;
  }
  function build(type) {
    const ctx = baseContext();
    const blocks = {
      structure: `Act as an experienced film screenwriter. Based on the project notes below, create a clean 3-act structure with: Act 1 setup, Act 2 conflict/escalation, Act 3 climax/resolution. Add 8-12 key scenes and a short emotional arc.\n\n${ctx}`,
      dialogue: `Act as a dialogue writer. Based on the project notes below, write a natural dialogue scene with strong character voices, conflict, subtext, and cinematic pacing. Keep it usable for a short film or AI video scene.\n\n${ctx}`,
      video: `Create a cinematic AI video generation prompt from the project notes below. Include camera movement, lighting, mood, environment, character action, style, lens language, and negative prompt. Make it suitable for a high-quality video generator.\n\n${ctx}`,
      pitch: `Create a short professional pitch from the project notes below: title, one-sentence logline, genre, target mood, main character, conflict, and why the idea is visually interesting.\n\n${ctx}`
    };
    document.getElementById('output').value = blocks[type] || ctx;
    saveData();
  }
  document.querySelectorAll('[data-build]').forEach(btn => btn.addEventListener('click', () => build(btn.dataset.build)));
  document.getElementById('copyBtn')?.addEventListener('click', async function () {
    const out = document.getElementById('output');
    out.select();
    try { await navigator.clipboard.writeText(out.value); this.textContent = 'Copied'; setTimeout(() => this.textContent = 'Copy output', 1200); }
    catch (e) { document.execCommand('copy'); }
  });
})();
