(() => {
  'use strict';
  const API_ORIGIN = ['127.0.0.1', 'localhost'].includes(location.hostname) || location.protocol === 'file:'
    ? ''
    : 'https://ai-api.cosmiclabindicators.com';
  const API = `${API_ORIGIN}/api/gromvex`;
  const API_CREDENTIALS = API_ORIGIN ? 'include' : 'same-origin';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  let currentUser = null;

  async function request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    const response = await fetch(`${API}${path}`, { credentials: API_CREDENTIALS, cache: 'no-store', ...options, headers });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      const error = new Error(payload?.detail || `Ошибка ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return payload;
  }

  function escapeHtml(value = '') {
    return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  }

  function showMessage(node, text, error = false) {
    node.textContent = text;
    node.hidden = false;
    node.classList.toggle('error', error);
  }

  function switchSection(name) {
    const titles = {
      products: ['Мои продукты', 'Приватные инструменты, проекты и материалы.'],
      access: ['Управление доступом', 'Только одобренные тобой email могут войти в кабинет.'],
      account: ['Аккаунт', 'Профиль владельца и настройки безопасности.']
    };
    $$('[data-section]').forEach(button => button.classList.toggle('active', button.dataset.section === name));
    $$('[data-panel]').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === name));
    $('#sectionTitle').textContent = titles[name][0];
    $('#sectionSubtitle').textContent = titles[name][1];
  }

  async function loadProducts() {
    const payload = await request('/cabinet/products');
    $('#productGrid').innerHTML = payload.products.map(product => `
      <article class="product-card">
        <div class="product-icon">${escapeHtml(product.icon)}</div>
        <h2>${escapeHtml(product.title)}</h2>
        <p>${escapeHtml(product.description)}</p>
        <footer>
          <span class="status-pill ${product.status === 'active' ? 'active' : ''}">${product.status === 'active' ? 'Доступно' : 'Позже'}</span>
          <a class="product-open ${product.status !== 'active' ? 'disabled' : ''}" href="${escapeHtml(product.href)}">${product.status === 'active' ? 'Открыть' : 'В разработке'}</a>
        </footer>
      </article>`).join('');
  }

  async function loadUsers() {
    if (currentUser.role !== 'owner') return;
    const payload = await request('/admin/users');
    $('#userList').innerHTML = payload.users.map(user => `
      <div class="user-row">
        <div><strong>${escapeHtml(user.email)}</strong><small>Добавлен: ${new Date(user.createdAt).toLocaleDateString('ru-RU')}</small></div>
        <span class="user-role">${escapeHtml(user.role)}</span>
        ${user.id === currentUser.id ? '<span></span>' : `<button class="user-delete" data-delete-user="${user.id}" title="Удалить доступ">×</button>`}
      </div>`).join('');
  }

  async function init() {
    try {
      const payload = await request('/auth/me');
      currentUser = payload.user;
    } catch (error) {
      location.replace('/index.html?login=1&next=%2Fcabinet.html');
      return;
    }
    const nick = currentUser.email.split('@')[0];
    $('#userEmail').textContent = currentUser.email;
    $('#userRole').textContent = currentUser.role === 'owner' ? 'Владелец' : 'Пользователь';
    $('#userAvatar').textContent = nick.charAt(0).toUpperCase();
    $('#accountEmail').textContent = currentUser.email;
    $('#accountRole').textContent = currentUser.role === 'owner' ? 'Владелец' : 'Пользователь';
    if (currentUser.role !== 'owner') {
      $('#accessNavBtn').hidden = true;
      $('[data-panel="access"]').remove();
    }
    await loadProducts();
    if (currentUser.role === 'owner') await loadUsers();
    $('#cabinetLoading').remove();
    $('#cabinetShell').hidden = false;
  }

  $$('[data-section]').forEach(button => button.addEventListener('click', () => switchSection(button.dataset.section)));

  $('#logoutBtn').addEventListener('click', async () => {
    await request('/auth/logout', { method: 'POST' }).catch(() => null);
    location.href = '/index.html';
  });

  $('#addUserForm').addEventListener('submit', async event => {
    event.preventDefault();
    const message = $('#accessMessage');
    message.hidden = true;
    try {
      await request('/admin/users', {
        method: 'POST',
        body: JSON.stringify({ email: $('#newUserEmail').value.trim(), password: $('#newUserPassword').value, role: 'user' })
      });
      event.currentTarget.reset();
      showMessage(message, 'Email добавлен в разрешённый список.');
      await loadUsers();
    } catch (error) {
      showMessage(message, error.message, true);
    }
  });

  $('#userList').addEventListener('click', async event => {
    const button = event.target.closest('[data-delete-user]');
    if (!button) return;
    if (!confirm('Удалить доступ для этого пользователя? Его проекты и ассеты тоже будут удалены.')) return;
    try {
      await request(`/admin/users/${button.dataset.deleteUser}`, { method: 'DELETE' });
      await loadUsers();
    } catch (error) {
      alert(error.message);
    }
  });

  $('#passwordForm').addEventListener('submit', async event => {
    event.preventDefault();
    const message = $('#passwordMessage');
    message.hidden = true;
    try {
      await request('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword: $('#currentPassword').value, newPassword: $('#newPassword').value })
      });
      event.currentTarget.reset();
      showMessage(message, 'Пароль изменён.');
    } catch (error) {
      showMessage(message, error.message, true);
    }
  });

  init().catch(error => {
    console.error(error);
    $('#cabinetLoading').innerHTML = `<strong>Не удалось открыть кабинет</strong><span>${escapeHtml(error.message)}</span>`;
  });
})();
