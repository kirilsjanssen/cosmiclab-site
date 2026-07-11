(function () {
  const OWNER_EMAIL = 'agenhill@local';
  const OWNER_PASSWORD = 'agenhill2026';
  const drawer = document.getElementById('ownerDrawer');
  const backdrop = document.getElementById('ownerDrawerBackdrop');
  const form = document.getElementById('ownerLoginForm');
  const email = document.getElementById('ownerEmail');
  const password = document.getElementById('ownerPassword');
  const error = document.getElementById('ownerLoginError');

  function openDrawer() {
    if (!drawer || !backdrop) return;
    backdrop.hidden = false;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ah-drawer-open');
    setTimeout(() => email && email.focus(), 80);
  }
  function closeDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ah-drawer-open');
    setTimeout(() => { backdrop.hidden = true; }, 180);
  }

  document.querySelectorAll('[data-owner-drawer-open]').forEach(btn => btn.addEventListener('click', openDrawer));
  document.querySelectorAll('[data-owner-drawer-close]').forEach(btn => btn.addEventListener('click', closeDrawer));
  backdrop && backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const ok = (email.value || '').trim().toLowerCase() === OWNER_EMAIL.toLowerCase() && (password.value || '') === OWNER_PASSWORD;
      if (ok) {
        sessionStorage.setItem('agenhill_cabinet_open', '1');
        window.location.href = 'cabinet.html';
      } else {
        error.hidden = false;
        password.focus();
      }
    });
  }
})();
