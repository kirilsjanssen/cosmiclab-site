const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const I18N = {
  ru: {
    "nav.services": "Услуги",
    "nav.tiles": "Выкладки",
    "nav.inside": "Что внутри",
    "nav.contact": "Контакт",

    "cta.telegramTop": "Telegram",
    "cta.telegram": "Написать в Telegram",
    "cta.services": "Посмотреть услуги",

    "hero.title": "Индикаторы TradingView и MT5 под крипту — на заказ",
    "hero.sub": "Pine Script v5 • MQL5 • Авто-зоны/Фибо/сигналы/алерты<br/>Крипто-боты для сигналов в Telegram (скринеры / алерты / каналы)",

    "sections.tiles": "Выкладки",
    "tiles.hint": "Готовые направления работ — выбирай модуль и пиши в Telegram.",
    "tiles.more": "Открыть →",

    "tiles.tv.title": "TradingView (Pine v5)",
    "tiles.tv.sub": "Сигналы, фильтры, алерты, авто-S/R зоны, Фибо, консервативные условия входа.",

    "tiles.mt5.title": "MetaTrader 5 (MQL5)",
    "tiles.mt5.sub": "SMC структура, BOS/CHoCH, свинги, стрелки, линии/лейблы, оптимизация и брендирование.",

    "tiles.bots.title": "Telegram Crypto Bots",
    "tiles.bots.sub": "Сигналы в каналы/группы, алерты по условиям, скринеры (объём/фандинг/вола/сетки), форматирование сообщений.",

    "tiles.vpn.title": "CosmiCLab VPN",
    "tiles.vpn.sub": "Android VPN приложение, privacy policy, support contact, usage terms и страница для Google Play.",

    "sections.services": "Услуги",
    "services.hint": "Коротко и по делу. Всё индивидуально под твою торговлю.",
    "services.s1.title": "Аудит & Правки",
    "services.s1.text": "Чиним баги, ускоряем, чистим логику, приводим к аккуратному виду.",
    "services.s2.title": "Сигналы & Фильтры",
    "services.s2.text": "Консервативные сигналы, фильтры тренда/волатильности, алерты.",
    "services.s3.title": "Боты в Telegram",
    "services.s3.text": "Скринеры и уведомления по рынку, оформление сообщений, работа с каналами/топиками.",

    "sections.inside": "Что внутри",
    "inside.hint": "Типовые модули, которые можно собрать под твою систему.",
    "inside.i1": "Авто зоны поддержки/сопротивления, плотные уровни",
    "inside.i2": "Фибо уровни + подтверждения входа",
    "inside.i3": "SMC: BOS/CHoCH + свинги",
    "inside.i4": "Фильтры тренда (EMA/SMA/HMA) и ATR-режимы",
    "inside.i5": "Алерты: entry/exit, пересечения, пробои, сетапы",
    "inside.i6": "Telegram: формат, кнопки, антиспам, мульти-чаты",

    "sections.contact": "Контакт",
    "contact.text": "Пиши в Telegram, объясни задачу и скинь пример скрина/референса.",
    "contact.btn": "Открыть Telegram",
    "contact.support": "Support: cosmiclab.support@gmail.com",

    "footer.note": "ВНИМАНИЕ: Все инвестиции на ваш страх и риск. Мы не даём финансовых гарантий.",

    "back": "← Назад",
    "screens.hint": "Заменишь эти картинки на свои: просто кинь файлы в /assets и сохрани имена.",

    "tv.pageTitle": "TradingView (Pine v5)",
    "tv.lead": "Кастомные индикаторы под крипту: зоны, уровни, сигналы, фильтры и алерты — без мусора и лагов.",
    "tv.featuresTitle": "Что можно сделать",
    "tv.f1": "Авто S/R зоны (под твой таймфрейм), плотные уровни",
    "tv.f2": "Фибо уровни + подтверждения (консервативно)",
    "tv.f3": "Сигналы BUY/SELL, фильтры тренда/волатильности",
    "tv.f4": "Алерты под бесплатный план (объединение в 1 индикатор)",
    "tv.f5": "Оптимизация скорости и чистая визуализация",
    "tv.screensTitle": "Примеры / Скрины",
    "tv.next": "Дальше: MT5 →",

    "mt5.pageTitle": "MetaTrader 5 (MQL5)",
    "mt5.lead": "Индикаторы под MT5: структура, зоны, стрелки, алерты, оптимизация и брендирование (логотип/водяной знак).",
    "mt5.featuresTitle": "Что можно сделать",
    "mt5.f1": "SMC: BOS/CHoCH, свинги, структура",
    "mt5.f2": "Авто уровни и зоны (поддержка/сопротивление)",
    "mt5.f3": "Стрелки/метки/линии, алерты в терминале",
    "mt5.f4": "Оптимизация, чтобы не лагало",
    "mt5.f5": "Брендинг: название, watermark, аккуратный стиль",
    "mt5.screensTitle": "Примеры / Скрины",
    "mt5.next": "Дальше: Telegram Bots →",

    "bots.pageTitle": "Telegram Crypto Bots",
    "bots.lead": "Боты для сигналов/алертов/скринеров: красиво оформленные сообщения, каналы, группы и Topics.",
    "bots.featuresTitle": "Что можно сделать",
    "bots.f1": "Сигналы в канал/группу/личку (в т.ч. Topics)",
    "bots.f2": "Скринеры: цена/объём/OI/фандинг/вола/ликвидации",
    "bots.f3": "Антиспам/кулдауны/фильтры, чтобы не сыпалось",
    "bots.f4": "Красивые карточки сообщений + кнопки",
    "bots.f5": "Интеграция Bybit/DEX/TradingView webhooks (по задаче)",
    "bots.screensTitle": "Примеры / Скрины",
    "bots.next": "Дальше: TradingView →",

    "privacy.pageTitle": "CosmiCLab VPN",
    "privacy.lead": "Политика конфиденциальности, условия использования и support contact для VPN-проекта.",
    "privacy.privacyTitle": "Политика конфиденциальности",
    "privacy.p1": "CosmiCLab VPN предоставляет VPN-доступ с использованием технологии WireGuard.",
    "privacy.p2": "Мы НЕ собираем и НЕ храним:",
    "privacy.l1": "Историю браузинга",
    "privacy.l2": "Содержимое трафика",
    "privacy.l3": "DNS-запросы",
    "privacy.p3": "Мы обрабатываем только ограниченные технические данные:",
    "privacy.l4": "Идентификатор устройства (device_id)",
    "privacy.l5": "Статус сессии",
    "privacy.l6": "Временные метки подключений",
    "privacy.l7": "Количество использований boost",
    "privacy.p4": "Эти данные используются только для управления VPN-сессиями, лимитами и работой приложения.",
    "privacy.p5": "Мы НЕ продаём и НЕ передаём данные третьим лицам.",
    "privacy.termsTitle": "Условия использования / Disclaimer",
    "privacy.p6": "Используя приложение, вы соглашаетесь со следующим:",
    "privacy.l8": "VPN-сервис предназначен только для законного использования",
    "privacy.l9": "Пользователь сам несёт ответственность за свою активность",
    "privacy.l10": "Сервис может иметь лимиты (трафик, время, boost)",
    "privacy.l11": "Сервис может быть временно недоступен или прерван",
    "privacy.l12": "Приложение может показывать рекламу",
    "privacy.p7": "CosmiCLab VPN сейчас находится в стадии разработки.",
    "privacy.p8": "Использование — на ваш страх и риск."
  },

  en: {
    "nav.services": "Services",
    "nav.tiles": "Showcase",
    "nav.inside": "What’s inside",
    "nav.contact": "Contact",

    "cta.telegramTop": "Telegram",
    "cta.telegram": "Message on Telegram",
    "cta.services": "View services",

    "hero.title": "Custom TradingView & MT5 indicators for crypto",
    "hero.sub": "Pine Script v5 • MQL5 • Auto zones/Fibo/signals/alerts<br/>Crypto signal bots for Telegram (screeners / alerts / channels)",

    "sections.tiles": "Showcase",
    "tiles.hint": "Ready modules — pick one and we’ll discuss it on Telegram.",
    "tiles.more": "Open →",

    "tiles.tv.title": "TradingView (Pine v5)",
    "tiles.tv.sub": "Signals, filters, alerts, auto S/R zones, Fibo, conservative entry logic.",

    "tiles.mt5.title": "MetaTrader 5 (MQL5)",
    "tiles.mt5.sub": "SMC structure, BOS/CHoCH, swings, arrows, lines/labels, optimization & branding.",

    "tiles.bots.title": "Telegram Crypto Bots",
    "tiles.bots.sub": "Signals to channels/groups, condition alerts, screeners (volume/funding/volatility/grids), message formatting.",

    "tiles.vpn.title": "CosmiCLab VPN",
    "tiles.vpn.sub": "Android VPN app, privacy policy, support contact, usage terms and Google Play policy page.",

    "sections.services": "Services",
    "services.hint": "Short and to the point. Built specifically for your trading style.",
    "services.s1.title": "Audit & Fixes",
    "services.s1.text": "Bug fixes, speed-up, logic cleanup, neat final look.",
    "services.s2.title": "Signals & Filters",
    "services.s2.text": "Conservative signals, trend/volatility filters, alerts.",
    "services.s3.title": "Telegram Bots",
    "services.s3.text": "Market screeners & notifications, clean formatting, channels/topics support.",

    "sections.inside": "What’s inside",
    "inside.hint": "Typical modules we can assemble for your system.",
    "inside.i1": "Auto support/resistance zones, dense key levels",
    "inside.i2": "Fibonacci levels + confirmations",
    "inside.i3": "SMC: BOS/CHoCH + swings",
    "inside.i4": "Trend filters (EMA/SMA/HMA) + ATR modes",
    "inside.i5": "Alerts: entry/exit, crosses, breaks, setups",
    "inside.i6": "Telegram: formatting, buttons, anti-spam, multi-chats",

    "sections.contact": "Contact",
    "contact.text": "Message on Telegram, describe your task and send a reference screenshot.",
    "contact.btn": "Open Telegram",
    "contact.support": "Support: cosmiclab.support@gmail.com",

    "footer.note": "DISCLAIMER: All investments are at your own risk. We do not provide financial guarantees.",

    "back": "← Back",
    "screens.hint": "Replace these images with yours: put files into /assets and keep the names.",

    "tv.pageTitle": "TradingView (Pine v5)",
    "tv.lead": "Custom crypto indicators: zones, levels, signals, filters and alerts — clean and fast.",
    "tv.featuresTitle": "What we can build",
    "tv.f1": "Auto S/R zones (per your timeframe), dense key levels",
    "tv.f2": "Fibo levels + confirmations (conservative)",
    "tv.f3": "BUY/SELL signals, trend/volatility filters",
    "tv.f4": "Alerts for Free plan (combine into one script if needed)",
    "tv.f5": "Performance optimization + clean visuals",
    "tv.screensTitle": "Examples / Screenshots",
    "tv.next": "Next: MT5 →",

    "mt5.pageTitle": "MetaTrader 5 (MQL5)",
    "mt5.lead": "MT5 indicators: structure, zones, arrows, alerts, performance and branding (logo/watermark).",
    "mt5.featuresTitle": "What we can build",
    "mt5.f1": "SMC: BOS/CHoCH, swings, structure",
    "mt5.f2": "Auto levels & zones (support/resistance)",
    "mt5.f3": "Arrows/labels/lines + terminal alerts",
    "mt5.f4": "Optimization to avoid lag",
    "mt5.f5": "Branding: name, watermark, clean style",
    "mt5.screensTitle": "Examples / Screenshots",
    "mt5.next": "Next: Telegram Bots →",

    "bots.pageTitle": "Telegram Crypto Bots",
    "bots.lead": "Signal/alert/screener bots: nice-looking messages, channels, groups and Topics.",
    "bots.featuresTitle": "What we can build",
    "bots.f1": "Signals to channel/group/DM (including Topics)",
    "bots.f2": "Screeners: price/volume/OI/funding/volatility/liquidations",
    "bots.f3": "Anti-spam/cooldowns/filters to reduce noise",
    "bots.f4": "Beautiful message cards + buttons",
    "bots.f5": "Integrations: Bybit/DEX/TradingView webhooks (task-based)",
    "bots.screensTitle": "Examples / Screenshots",
    "bots.next": "Next: TradingView →",

    "privacy.pageTitle": "CosmiCLab VPN",
    "privacy.lead": "Privacy Policy, Terms of Use and support contact for the VPN project.",
    "privacy.privacyTitle": "Privacy Policy",
    "privacy.p1": "CosmiCLab VPN provides VPN access using WireGuard technology.",
    "privacy.p2": "We do NOT collect or store:",
    "privacy.l1": "Browsing history",
    "privacy.l2": "Traffic content",
    "privacy.l3": "DNS queries",
    "privacy.p3": "We process limited technical data only:",
    "privacy.l4": "Device identifier (device_id)",
    "privacy.l5": "Session status",
    "privacy.l6": "Connection timestamps",
    "privacy.l7": "Boost usage count",
    "privacy.p4": "This data is used only to manage VPN sessions, limits and app functionality.",
    "privacy.p5": "We do NOT sell or share data with third parties.",
    "privacy.termsTitle": "Terms of Use / Disclaimer",
    "privacy.p6": "By using this application, you agree to the following:",
    "privacy.l8": "VPN service is for lawful use only",
    "privacy.l9": "You are responsible for your activity",
    "privacy.l10": "The service may include limits (traffic, time, boost)",
    "privacy.l11": "The service may be interrupted or unavailable",
    "privacy.l12": "The app may display advertisements",
    "privacy.p7": "CosmiCLab VPN is currently in development stage.",
    "privacy.p8": "Use at your own risk."
  },

  de: {
    "nav.services": "Leistungen",
    "nav.tiles": "Module",
    "nav.inside": "Inhalte",
    "nav.contact": "Kontakt",

    "cta.telegramTop": "Telegram",
    "cta.telegram": "Auf Telegram schreiben",
    "cta.services": "Leistungen ansehen",

    "hero.title": "TradingView- und MT5-Indikatoren für Krypto nach Maß",
    "hero.sub": "Pine Script v5 • MQL5 • Auto-Zonen/Fibo/Signale/Alerts<br/>Krypto-Signal-Bots für Telegram (Screener / Alerts / Kanäle)",

    "sections.tiles": "Module",
    "tiles.hint": "Fertige Arbeitsrichtungen — wähle ein Modul und schreibe auf Telegram.",
    "tiles.more": "Öffnen →",

    "tiles.tv.title": "TradingView (Pine v5)",
    "tiles.tv.sub": "Signale, Filter, Alerts, Auto-S/R-Zonen, Fibo, konservative Einstiegslogik.",

    "tiles.mt5.title": "MetaTrader 5 (MQL5)",
    "tiles.mt5.sub": "SMC-Struktur, BOS/CHoCH, Swings, Pfeile, Linien/Labels, Optimierung und Branding.",

    "tiles.bots.title": "Telegram Crypto Bots",
    "tiles.bots.sub": "Signale für Kanäle/Gruppen, bedingte Alerts, Screener (Volumen/Funding/Volatilität/Gitter), Nachrichtenformatierung.",

    "tiles.vpn.title": "CosmiCLab VPN",
    "tiles.vpn.sub": "Android-VPN-App, Datenschutzrichtlinie, Support-Kontakt, Nutzungsbedingungen und Google-Play-Seite.",

    "sections.services": "Leistungen",
    "services.hint": "Kurz und direkt. Alles individuell für deinen Trading-Stil.",
    "services.s1.title": "Audit & Fixes",
    "services.s1.text": "Wir beheben Bugs, beschleunigen, bereinigen die Logik und bringen alles in saubere Form.",
    "services.s2.title": "Signale & Filter",
    "services.s2.text": "Konservative Signale, Trend-/Volatilitätsfilter und Alerts.",
    "services.s3.title": "Telegram Bots",
    "services.s3.text": "Markt-Screener und Benachrichtigungen, saubere Nachrichtenformatierung, Arbeit mit Kanälen/Topics.",

    "sections.inside": "Inhalte",
    "inside.hint": "Typische Module, die wir für dein System zusammenbauen können.",
    "inside.i1": "Automatische Support-/Resistance-Zonen, dichte Schlüssel-Level",
    "inside.i2": "Fibonacci-Level + Einstiegsbestätigungen",
    "inside.i3": "SMC: BOS/CHoCH + Swings",
    "inside.i4": "Trendfilter (EMA/SMA/HMA) und ATR-Modi",
    "inside.i5": "Alerts: Entry/Exit, Kreuzungen, Ausbrüche, Setups",
    "inside.i6": "Telegram: Formatierung, Buttons, Anti-Spam, Multi-Chats",

    "sections.contact": "Kontakt",
    "contact.text": "Schreib auf Telegram, erkläre die Aufgabe und sende einen Referenz-Screenshot.",
    "contact.btn": "Telegram öffnen",
    "contact.support": "Support: cosmiclab.support@gmail.com",

    "footer.note": "HINWEIS: Alle Investitionen erfolgen auf eigenes Risiko. Wir geben keine finanziellen Garantien.",

    "back": "← Zurück",
    "screens.hint": "Du kannst diese Bilder durch deine eigenen ersetzen: einfach in /assets ablegen und die Namen beibehalten.",

    "tv.pageTitle": "TradingView (Pine v5)",
    "tv.lead": "Individuelle Krypto-Indikatoren: Zonen, Levels, Signale, Filter und Alerts — sauber und schnell.",
    "tv.featuresTitle": "Was wir bauen können",
    "tv.f1": "Auto-S/R-Zonen (für deinen Timeframe), dichte Schlüssel-Level",
    "tv.f2": "Fibo-Level + Bestätigungen (konservativ)",
    "tv.f3": "BUY/SELL-Signale, Trend-/Volatilitätsfilter",
    "tv.f4": "Alerts für den Free-Plan (bei Bedarf in 1 Skript kombiniert)",
    "tv.f5": "Performance-Optimierung + saubere Visualisierung",
    "tv.screensTitle": "Beispiele / Screenshots",
    "tv.next": "Weiter: MT5 →",

    "mt5.pageTitle": "MetaTrader 5 (MQL5)",
    "mt5.lead": "MT5-Indikatoren: Struktur, Zonen, Pfeile, Alerts, Optimierung und Branding (Logo/Wasserzeichen).",
    "mt5.featuresTitle": "Was wir bauen können",
    "mt5.f1": "SMC: BOS/CHoCH, Swings, Struktur",
    "mt5.f2": "Auto-Level und Zonen (Support/Resistance)",
    "mt5.f3": "Pfeile/Labels/Linien + Terminal-Alerts",
    "mt5.f4": "Optimierung, damit nichts laggt",
    "mt5.f5": "Branding: Name, Wasserzeichen, sauberer Stil",
    "mt5.screensTitle": "Beispiele / Screenshots",
    "mt5.next": "Weiter: Telegram Bots →",

    "bots.pageTitle": "Telegram Crypto Bots",
    "bots.lead": "Bots für Signale/Alerts/Screener: schön formatierte Nachrichten, Kanäle, Gruppen und Topics.",
    "bots.featuresTitle": "Was wir bauen können",
    "bots.f1": "Signale an Kanal/Gruppe/DM (inkl. Topics)",
    "bots.f2": "Screener: Preis/Volumen/OI/Funding/Volatilität/Liquidationen",
    "bots.f3": "Anti-Spam/Cooldowns/Filter zur Reduzierung von Rauschen",
    "bots.f4": "Schöne Nachrichtenkarten + Buttons",
    "bots.f5": "Integrationen: Bybit/DEX/TradingView-Webhooks (je nach Aufgabe)",
    "bots.screensTitle": "Beispiele / Screenshots",
    "bots.next": "Weiter: TradingView →",

    "privacy.pageTitle": "CosmiCLab VPN",
    "privacy.lead": "Datenschutzrichtlinie, Nutzungsbedingungen und Support-Kontakt für das VPN-Projekt.",
    "privacy.privacyTitle": "Datenschutzrichtlinie",
    "privacy.p1": "CosmiCLab VPN bietet VPN-Zugang mit WireGuard-Technologie.",
    "privacy.p2": "Wir sammeln und speichern NICHT:",
    "privacy.l1": "Browserverlauf",
    "privacy.l2": "Verkehrsinhalte",
    "privacy.l3": "DNS-Anfragen",
    "privacy.p3": "Wir verarbeiten nur begrenzte technische Daten:",
    "privacy.l4": "Gerätekennung (device_id)",
    "privacy.l5": "Sitzungsstatus",
    "privacy.l6": "Verbindungszeitstempel",
    "privacy.l7": "Anzahl der Boost-Nutzungen",
    "privacy.p4": "Diese Daten werden nur zur Verwaltung von VPN-Sitzungen, Limits und App-Funktionalität verwendet.",
    "privacy.p5": "Wir verkaufen oder teilen keine Daten mit Dritten.",
    "privacy.termsTitle": "Nutzungsbedingungen / Hinweis",
    "privacy.p6": "Durch die Nutzung dieser Anwendung stimmst du Folgendem zu:",
    "privacy.l8": "Der VPN-Dienst ist nur für rechtmäßige Nutzung bestimmt",
    "privacy.l9": "Du bist selbst für deine Aktivitäten verantwortlich",
    "privacy.l10": "Der Dienst kann Limits enthalten (Traffic, Zeit, Boost)",
    "privacy.l11": "Der Dienst kann unterbrochen oder vorübergehend nicht verfügbar sein",
    "privacy.l12": "Die App kann Werbung anzeigen",
    "privacy.p7": "CosmiCLab VPN befindet sich derzeit in der Entwicklungsphase.",
    "privacy.p8": "Nutzung auf eigenes Risiko."
  }
};

function applyLang(lang) {
  const dict = I18N[lang] || I18N.ru;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = dict[key];
    if (!val) return;
    el.innerHTML = val;
  });

  document.querySelectorAll(".langBtn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("site_lang", lang);
}

const saved = localStorage.getItem("site_lang");
const navLang = (navigator.language || "ru").toLowerCase();
const browser =
  navLang.startsWith("ru") ? "ru" :
  navLang.startsWith("de") ? "de" :
  "en";

applyLang(saved || browser);

document.querySelectorAll(".langBtn").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});