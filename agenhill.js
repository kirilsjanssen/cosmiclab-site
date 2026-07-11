(function () {
  const OWNER_EMAIL = 'agenhill@local';
  const OWNER_PASSWORD = 'agenhill2026';
  const drawer = document.getElementById('ownerDrawer');
  const backdrop = document.getElementById('ownerDrawerBackdrop');
  const form = document.getElementById('ownerLoginForm');
  const email = document.getElementById('ownerEmail');
  const password = document.getElementById('ownerPassword');
  const error = document.getElementById('ownerLoginError');

  const I18N = {
    en: {
      'nav.home':'Home','nav.projects':'Projects','nav.mt5':'MT5 Indicators','nav.models':'3D Models','nav.apps':'Apps','nav.ai':'AI Lab','nav.contact':'Contact','nav.explore':'Explore Projects',
      'hero.pill':'Personal Digital Project Lab','hero.status':'Website currently under development','hero.lead':'Personal digital project lab featuring MT5 indicators, 3D models, apps, AI tools and future concepts. Some products are already available on external marketplaces while new projects are still in development.','hero.btn1':'Available products','hero.btn2':'Development projects',
      'card.mt5':'MT5 Indicators','card.models':'3D Models','card.apps':'Android Apps','card.ai':'AI Tools','card.concepts':'Concept Projects','tag.external':'Available externally','tag.dev':'In development','tag.proto':'Prototype',
      'info.lab':'Personal Project Lab','info.labtext':'Passion-driven creations and experiments from my digital lab.','info.future':'Building the Future','info.futuretext':'Exploring ideas today that become tools for tomorrow.','info.evolving':'Always Evolving','info.evolvingtext':'New projects, tools and concepts added regularly.',
      'projects.kicker':'Project archive','projects.title':'Current and future projects','projects.text':'CosmiCLab Indicators is a personal creator portfolio and project space under the pseudonym Agenhill.','projects.photoreport':'Mobile app for work photo reports, object documentation, markings, GPS notes and export.','projects.capturedeck':'Screen recording and mobile video editing concept with floating control panel and timeline editor.','projects.private':'Private concept','projects.gromvex':'Experimental AI workspace for prompts, scripts, video ideas and private project tools.','projects.vpn':'Android VPN concept with backend, server logic and free/boost access model.','common.open':'Open page →',
      'contact.kicker':'Contact','contact.title':'External marketplaces and contact','contact.text':'Selected MT5 indicators and 3D models are available on external marketplaces. Direct selling through this website is not active yet.','footer.note':'Website under development. Personal project archive and digital product showcase.',
      'drawer.kicker':'Owner workspace','drawer.title':'Cabinet login','drawer.text':'Login to the private workspace for scenarios, AI Movie Studio, prompts and ideas.','drawer.email':'Email','drawer.password':'Password','drawer.open':'Open cabinet','drawer.error':'Wrong email or password.','drawer.note':'Static test login for now. Real server login can be connected later.'
    },
    ru: {
      'nav.home':'Главная','nav.projects':'Проекты','nav.mt5':'MT5 Индикаторы','nav.models':'3D Модели','nav.apps':'Приложения','nav.ai':'AI Lab','nav.contact':'Контакт','nav.explore':'Проекты',
      'hero.pill':'Персональная цифровая лаборатория','hero.status':'Сайт находится в разработке','hero.lead':'Персональная цифровая проектная лаборатория: MT5-индикаторы, 3D-модели, приложения, AI-инструменты и будущие концепты. Часть продуктов уже доступна на внешних площадках, а новые проекты всё ещё в разработке.','hero.btn1':'Доступные продукты','hero.btn2':'Проекты в разработке',
      'card.mt5':'MT5 Индикаторы','card.models':'3D Модели','card.apps':'Android Приложения','card.ai':'AI Инструменты','card.concepts':'Концепт проекты','tag.external':'Доступно внешне','tag.dev':'В разработке','tag.proto':'Прототип',
      'info.lab':'Личная лаборатория','info.labtext':'Проекты и эксперименты из моей цифровой лаборатории.','info.future':'Создавая будущее','info.futuretext':'Исследую идеи сегодня, чтобы завтра они стали инструментами.','info.evolving':'Постоянное развитие','info.evolvingtext':'Новые проекты, инструменты и концепты добавляются регулярно.',
      'projects.kicker':'Архив проектов','projects.title':'Текущие и будущие проекты','projects.text':'CosmiCLab Indicators — это личное портфолио и пространство проектов под псевдонимом Agenhill.','projects.photoreport':'Мобильное приложение для фотоотчётов, документации объектов, пометок, GPS-заметок и экспорта.','projects.capturedeck':'Концепт записи экрана и мобильного видеоредактора с плавающей панелью и таймлайном.','projects.private':'Приватный концепт','projects.gromvex':'Экспериментальное AI-пространство для промтов, сценариев, видео-идей и приватных инструментов.','projects.vpn':'Концепт Android VPN с backend-логикой, серверной частью и free/boost моделью доступа.','common.open':'Открыть страницу →',
      'contact.kicker':'Контакт','contact.title':'Внешние площадки и контакт','contact.text':'Некоторые MT5-индикаторы и 3D-модели доступны на внешних площадках. Прямые продажи через этот сайт пока не активны.','footer.note':'Сайт в разработке. Личный архив проектов и витрина цифровых продуктов.',
      'drawer.kicker':'Рабочая панель владельца','drawer.title':'Вход в кабинет','drawer.text':'Вход в приватную рабочую панель для сценариев, AI Movie Studio, промтов и идей.','drawer.email':'Email','drawer.password':'Пароль','drawer.open':'Открыть кабинет','drawer.error':'Неверный email или пароль.','drawer.note':'Пока это статический тестовый вход. Позже можно подключить настоящий серверный логин.'
    },
    de: {
      'nav.home':'Start','nav.projects':'Projekte','nav.mt5':'MT5 Indikatoren','nav.models':'3D Modelle','nav.apps':'Apps','nav.ai':'AI Lab','nav.contact':'Kontakt','nav.explore':'Projekte ansehen',
      'hero.pill':'Persönliches digitales Projektlabor','hero.status':'Website befindet sich im Aufbau','hero.lead':'Persönliches digitales Projektlabor mit MT5-Indikatoren, 3D-Modellen, Apps, AI-Tools und zukünftigen Konzepten. Einige Produkte sind bereits auf externen Plattformen verfügbar, während neue Projekte noch in Entwicklung sind.','hero.btn1':'Verfügbare Produkte','hero.btn2':'Projekte in Entwicklung',
      'card.mt5':'MT5 Indikatoren','card.models':'3D Modelle','card.apps':'Android Apps','card.ai':'AI Tools','card.concepts':'Konzeptprojekte','tag.external':'Extern verfügbar','tag.dev':'In Entwicklung','tag.proto':'Prototyp',
      'info.lab':'Persönliches Projektlabor','info.labtext':'Leidenschaftliche Projekte und Experimente aus meinem digitalen Labor.','info.future':'Die Zukunft bauen','info.futuretext':'Ideen von heute erforschen, die morgen zu Tools werden.','info.evolving':'Ständige Entwicklung','info.evolvingtext':'Neue Projekte, Tools und Konzepte kommen regelmäßig dazu.',
      'projects.kicker':'Projektarchiv','projects.title':'Aktuelle und zukünftige Projekte','projects.text':'CosmiCLab Indicators ist ein persönliches Portfolio und Projektbereich unter dem Pseudonym Agenhill.','projects.photoreport':'Mobile App für Foto-Reports, Objektdokumentation, Markierungen, GPS-Notizen und Export.','projects.capturedeck':'Konzept für Screen-Recording und mobilen Video-Editor mit schwebender Steuerung und Timeline.','projects.private':'Privates Konzept','projects.gromvex':'Experimenteller AI-Arbeitsbereich für Prompts, Skripte, Videoideen und private Tools.','projects.vpn':'Android-VPN-Konzept mit Backend-Logik, Server-Teil und Free/Boost-Zugangsmodell.','common.open':'Seite öffnen →',
      'contact.kicker':'Kontakt','contact.title':'Externe Plattformen und Kontakt','contact.text':'Ausgewählte MT5-Indikatoren und 3D-Modelle sind auf externen Plattformen verfügbar. Der direkte Verkauf über diese Website ist derzeit noch nicht aktiv.','footer.note':'Website im Aufbau. Persönliches Projektarchiv und digitale Produktpräsentation.',
      'drawer.kicker':'Eigener Arbeitsbereich','drawer.title':'Cabinet Login','drawer.text':'Login zum privaten Arbeitsbereich für Szenarien, AI Movie Studio, Prompts und Ideen.','drawer.email':'E-Mail','drawer.password':'Passwort','drawer.open':'Cabinet öffnen','drawer.error':'Falsche E-Mail oder falsches Passwort.','drawer.note':'Vorerst statischer Test-Login. Später kann ein echter Server-Login angeschlossen werden.'
    }
  };

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('.langBtn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    document.documentElement.lang = lang;
    localStorage.setItem('agenhill_lang', lang);
  }

  document.querySelectorAll('.langBtn').forEach(btn => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));
  applyLang(localStorage.getItem('agenhill_lang') || 'en');

  function openDrawer() {
    if (!drawer || !backdrop) return;
    backdrop.hidden = false;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    setTimeout(() => email && email.focus(), 80);
  }
  function closeDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
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
