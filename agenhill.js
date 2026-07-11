(function () {
  const logo = document.querySelector('.js-owner-trigger');
  if (!logo) return;
  let clicks = 0;
  let timer = null;
  logo.addEventListener('click', function (event) {
    clicks += 1;
    clearTimeout(timer);
    timer = setTimeout(function () { clicks = 0; }, 1600);
    if (clicks >= 5) {
      event.preventDefault();
      window.location.href = 'cabinet.html';
    }
  });
})();
