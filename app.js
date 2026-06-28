const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const I18N = {
  ru: {
    "nav.services": "Услуги",
    "nav.projects": "Проекты",
    "nav.photoreport": "PhotoReport",
    "nav.process": "Процесс",
    "nav.contact": "Контакт",
    "hero.badge": "CosmiCLab / Development Services",
    "hero.title": "Разработка приложений, ботов, серверов и торговых инструментов",
    "hero.sub": "Android-приложения, AI tools, Telegram-боты, backend/API, VPS-серверы, TradingView / MT5 индикаторы, сайты и игровые прототипы — под конкретную задачу клиента.",
    "hero.mini": "<b>CosmiCLabIndicators</b> начинался с торговых инструментов, но теперь охватывает и более широкие направления: Android apps, AI tools, backend systems, Telegram bots, websites, automation и game prototypes.",
    "cta.support": "Написать в Support Bot",
    "cta.services": "Посмотреть услуги",
    "cta.projects": "Примеры работ",
    "cta.photoreport": "PhotoReport App",
    "services.title": "Услуги",
    "services.hint": "Основные направления разработки. Можно сделать MVP, прототип, отдельный модуль, backend, бота, приложение или готовую страницу под публикацию.",
    "tile.open": "Открыть →",
    "tile.android": "Kotlin / Jetpack Compose, Google Play, AdMob, Privacy Policy, backend connection, экраны, лимиты, профили.",
    "tile.photoreport": "Outdoor photo reports для объектов, рабочих зон, планов, GPS, маркировок, комментариев и PNG/PDF экспорта.",
    "tile.photoreport.open": "Открыть PhotoReport →",
    "tile.ai": "AI chat, writer, rewrite, translate tools, prompt tools, backend API, free/pro limits, monetization.",
    "tile.backend": "VPS, Ubuntu, FastAPI, PostgreSQL, Nginx, SSL/HTTPS, API endpoints, deployment, базовая настройка сервера.",
    "tile.telegram": "Telegram bots на Python, aiogram, каналы, группы, topics, crypto alerts, market signals, admin logic.",
    "tile.tradingview": "Pine Script v5, S/R zones, Fibonacci, trend filters, alerts, buy/sell signal logic, crypto indicators.",
    "tile.mt5": "Custom MT5 indicators, EX5 files, dashboard logic, signals, visual trading tools, брендирование.",
    "tile.websites": "Лендинги, product pages, app support/privacy pages, dark sci-fi design, responsive layout, HTML/CSS/JS.",
    "tile.games": "Browser games, Telegram Mini App prototypes, clicker games, UI panels, game logic, assets integration.",
    "tile.automation": "Python scripts, API integrations, parsers, screeners, bots, data processing, small backend utilities.",
    "projects.title": "Примеры работ / Projects",
    "projects.hint": "Selected projects and prototypes. Реальные направления, прототипы и рабочие проекты, которые можно развивать под конкретную задачу.",
    "project.photoreport": "Google Play app для outdoor photo reports: объекты, рабочие фото, проблемные фото, маркировка плана/карты, GPS, PNG/PDF экспорт и локальное хранение.<br><a href=\"photoreport.html\">Открыть страницу →</a>",
    "process.title": "Как работаю",
    "process.hint": "Без лишней бюрократии: сначала понятная задача, потом рабочая первая версия, тест, правки и подготовка к публикации.",
    "contact.title": "Контакт",
    "contact.text": "Для связи по разработке, приложениям, ботам, серверам, индикаторам, сайтам и прототипам — пиши в официальный support bot или на email.",
    "contact.bot": "Открыть Support Bot",
    "footer.note": "ВНИМАНИЕ: торговые индикаторы, боты и рыночные инструменты не являются финансовой рекомендацией. Все решения пользователь принимает самостоятельно и на свой риск."
  },
  en: {
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.photoreport": "PhotoReport",
    "nav.process": "Process",
    "nav.contact": "Contact",
    "hero.badge": "CosmiCLab / Development Services",
    "hero.title": "Custom apps, bots, servers and trading tools",
    "hero.sub": "Android apps, AI tools, Telegram bots, backend/API, VPS servers, TradingView / MT5 indicators, websites and game prototypes — built around the client task.",
    "hero.mini": "<b>CosmiCLabIndicators</b> started with trading tools, but now also covers Android apps, AI tools, backend systems, Telegram bots, websites, automation and game prototypes.",
    "cta.support": "Message Support Bot",
    "cta.services": "View services",
    "cta.projects": "Work examples",
    "cta.photoreport": "PhotoReport App",
    "services.title": "Services",
    "services.hint": "Main development directions. I can build an MVP, prototype, module, backend, bot, app or publication-ready page.",
    "tile.open": "Open →",
    "tile.android": "Kotlin / Jetpack Compose, Google Play, AdMob, Privacy Policy, backend connection, screens, limits, profiles.",
    "tile.photoreport": "Outdoor photo reports for objects, work areas, plans, GPS, markings, comments and PNG/PDF export.",
    "tile.photoreport.open": "Open PhotoReport →",
    "tile.ai": "AI chat, writer, rewrite, translation tools, prompt tools, backend API, free/pro limits and monetization.",
    "tile.backend": "VPS, Ubuntu, FastAPI, PostgreSQL, Nginx, SSL/HTTPS, API endpoints, deployment and basic server setup.",
    "tile.telegram": "Telegram bots in Python, aiogram, channels, groups, topics, crypto alerts, market signals and admin logic.",
    "tile.tradingview": "Pine Script v5, S/R zones, Fibonacci, trend filters, alerts, buy/sell signal logic and crypto indicators.",
    "tile.mt5": "Custom MT5 indicators, EX5 files, dashboard logic, signals, visual trading tools and branding.",
    "tile.websites": "Landing pages, product pages, app support/privacy pages, dark sci-fi design, responsive HTML/CSS/JS.",
    "tile.games": "Browser games, Telegram Mini App prototypes, clicker games, UI panels, game logic and asset integration.",
    "tile.automation": "Python scripts, API integrations, parsers, screeners, bots, data processing and small backend utilities.",
    "projects.title": "Work examples / Projects",
    "projects.hint": "Selected projects and prototypes. Real directions, prototypes and active products that can be adapted to a specific task.",
    "project.photoreport": "Google Play app for outdoor photo reports: objects, work photos, problem photos, plan/map marking, GPS, PNG/PDF export and local storage.<br><a href=\"photoreport.html\">View product page →</a>",
    "process.title": "Work process",
    "process.hint": "Simple workflow: clear task, first working version, testing, fixes and release preparation.",
    "contact.title": "Contact",
    "contact.text": "For development, apps, bots, servers, indicators, websites and prototypes — use the official support bot or email.",
    "contact.bot": "Open Support Bot",
    "footer.note": "DISCLAIMER: trading indicators, bots and market tools are not financial advice. Users make all decisions independently and at their own risk."
  },
  de: {
    "nav.services": "Leistungen",
    "nav.projects": "Projekte",
    "nav.photoreport": "PhotoReport",
    "nav.process": "Ablauf",
    "nav.contact": "Kontakt",
    "hero.badge": "CosmiCLab / Development Services",
    "hero.title": "Entwicklung von Apps, Bots, Servern und Trading-Tools",
    "hero.sub": "Android-Apps, AI-Tools, Telegram-Bots, Backend/API, VPS-Server, TradingView / MT5-Indikatoren, Websites und Game-Prototypen — passend zur Aufgabe des Kunden.",
    "hero.mini": "<b>CosmiCLabIndicators</b> begann mit Trading-Tools, deckt jetzt aber auch Android-Apps, AI-Tools, Backend-Systeme, Telegram-Bots, Websites, Automatisierung und Game-Prototypen ab.",
    "cta.support": "Support Bot schreiben",
    "cta.services": "Leistungen ansehen",
    "cta.projects": "Arbeitsbeispiele",
    "cta.photoreport": "PhotoReport App",
    "services.title": "Leistungen",
    "services.hint": "Hauptbereiche der Entwicklung. Möglich sind MVP, Prototyp, Modul, Backend, Bot, App oder veröffentlichungsfertige Seite.",
    "tile.open": "Öffnen →",
    "tile.android": "Kotlin / Jetpack Compose, Google Play, AdMob, Privacy Policy, Backend-Anbindung, Screens, Limits, Profile.",
    "tile.photoreport": "Outdoor-Fotoberichte für Objekte, Arbeitsflächen, Pläne, GPS, Markierungen, Kommentare und PNG/PDF-Export.",
    "tile.photoreport.open": "PhotoReport öffnen →",
    "tile.ai": "AI Chat, Writer, Rewrite, Translation Tools, Prompt Tools, Backend API, Free/Pro Limits und Monetarisierung.",
    "tile.backend": "VPS, Ubuntu, FastAPI, PostgreSQL, Nginx, SSL/HTTPS, API Endpoints, Deployment und Server-Grundsetup.",
    "tile.telegram": "Telegram Bots in Python, aiogram, Kanäle, Gruppen, Topics, Crypto Alerts, Market Signals und Admin-Logik.",
    "tile.tradingview": "Pine Script v5, S/R-Zonen, Fibonacci, Trendfilter, Alerts, Buy/Sell-Signallogik und Crypto-Indikatoren.",
    "tile.mt5": "Custom MT5 Indicators, EX5-Dateien, Dashboard-Logik, Signale, visuelle Trading-Tools und Branding.",
    "tile.websites": "Landing Pages, Produktseiten, App-Support/Privacy-Seiten, dunkles Sci-Fi-Design, responsive HTML/CSS/JS.",
    "tile.games": "Browser Games, Telegram Mini App Prototypen, Clicker Games, UI-Panels, Game-Logik und Asset-Integration.",
    "tile.automation": "Python Scripts, API-Integrationen, Parser, Screener, Bots, Datenverarbeitung und kleine Backend-Utilities.",
    "projects.title": "Arbeitsbeispiele / Projekte",
    "projects.hint": "Selected projects and prototypes. Reale Richtungen, Prototypen und aktive Produkte, die an konkrete Aufgaben angepasst werden können.",
    "project.photoreport": "Google-Play-App für Outdoor-Fotoberichte: Objekte, Arbeitsfotos, Problemfotos, Plan-/Kartenmarkierung, GPS, PNG/PDF-Export und lokale Speicherung.<br><a href=\"photoreport.html\">Produktseite öffnen →</a>",
    "process.title": "Arbeitsablauf",
    "process.hint": "Einfacher Prozess: klare Aufgabe, erste funktionierende Version, Test, Korrekturen und Release-Vorbereitung.",
    "contact.title": "Kontakt",
    "contact.text": "Für Entwicklung, Apps, Bots, Server, Indikatoren, Websites und Prototypen — nutze den offiziellen Support Bot oder E-Mail.",
    "contact.bot": "Support Bot öffnen",
    "footer.note": "HINWEIS: Trading-Indikatoren, Bots und Markt-Tools sind keine Finanzberatung. Alle Entscheidungen trifft der Nutzer selbst und auf eigenes Risiko."
  }
};

function applyLang(lang) {
  const dict = I18N[lang] || I18N.ru;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll(".langBtn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  localStorage.setItem("cosmiclab_lang", lang);
}

document.querySelectorAll(".langBtn").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang || "ru"));
});

applyLang(localStorage.getItem("cosmiclab_lang") || "ru");
