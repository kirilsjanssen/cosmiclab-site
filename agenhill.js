(function () {
  // Temporary front-end credentials for GitHub Pages/static hosting.
  // For real private access, move this check to the server later.
  const OWNER_EMAIL = 'agenhill@local';
  const OWNER_PASSWORD = 'agenhill2026';

  const form = document.getElementById('ownerLoginForm');
  if (!form) return;

  const email = document.getElementById('ownerEmail');
  const password = document.getElementById('ownerPassword');
  const error = document.getElementById('ownerLoginError');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const ok = (email.value || '').trim().toLowerCase() === OWNER_EMAIL.toLowerCase()
      && (password.value || '') === OWNER_PASSWORD;

    if (ok) {
      sessionStorage.setItem('agenhill_cabinet_open', '1');
      window.location.href = 'cabinet.html';
    } else {
      error.hidden = false;
      password.focus();
    }
  });
})();
