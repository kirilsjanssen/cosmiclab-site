const I18N = {

ru: {
"nav.services":"Услуги",
"nav.tiles":"Выкладки",
"nav.inside":"Что внутри",
"nav.contact":"Контакт",

"cta.telegramTop":"Telegram",
"cta.telegram":"Написать в Telegram",
"cta.services":"Услуги",

"hero.title":"Индикаторы TradingView и MT5 под крипту — на заказ",
"hero.sub":"Pine Script v5 • MQL5 • сигналы, зоны, алерты",

"sections.tiles":"Выкладки",

"tiles.tv.title":"TradingView",
"tiles.tv.sub":"Индикаторы и сигналы",

"tiles.mt5.title":"MT5",
"tiles.mt5.sub":"Индикаторы под MetaTrader",

"tiles.bots.title":"Telegram Bots",
"tiles.bots.sub":"Боты и сигналы",

"tiles.vpn.title":"CosmiCLab VPN",
"tiles.vpn.sub":"VPN приложение, privacy и политика",

"sections.contact":"Контакт",
"contact.btn":"Открыть Telegram"
},

en: {
"nav.services":"Services",
"nav.tiles":"Showcase",
"nav.inside":"Inside",
"nav.contact":"Contact",

"cta.telegramTop":"Telegram",
"cta.telegram":"Message on Telegram",
"cta.services":"Services",

"hero.title":"Custom TradingView & MT5 indicators",
"hero.sub":"Signals, zones, alerts",

"sections.tiles":"Showcase",

"tiles.tv.title":"TradingView",
"tiles.tv.sub":"Indicators and signals",

"tiles.mt5.title":"MT5",
"tiles.mt5.sub":"MetaTrader indicators",

"tiles.bots.title":"Telegram Bots",
"tiles.bots.sub":"Bots and alerts",

"tiles.vpn.title":"CosmiCLab VPN",
"tiles.vpn.sub":"VPN app, privacy & policy",

"sections.contact":"Contact",
"contact.btn":"Open Telegram"
},

de: {
"nav.services":"Dienstleistungen",
"nav.tiles":"Module",
"nav.inside":"Inhalt",
"nav.contact":"Kontakt",

"cta.telegramTop":"Telegram",
"cta.telegram":"Telegram schreiben",
"cta.services":"Services",

"hero.title":"TradingView & MT5 Indikatoren",
"hero.sub":"Signale, Zonen, Alerts",

"sections.tiles":"Module",

"tiles.tv.title":"TradingView",
"tiles.tv.sub":"Indikatoren und Signale",

"tiles.mt5.title":"MT5",
"tiles.mt5.sub":"MetaTrader Indikatoren",

"tiles.bots.title":"Telegram Bots",
"tiles.bots.sub":"Bots und Alerts",

"tiles.vpn.title":"CosmiCLab VPN",
"tiles.vpn.sub":"VPN App, Datenschutz & Policy",

"sections.contact":"Kontakt",
"contact.btn":"Telegram öffnen"
}

};

function applyLang(lang){
  const dict = I18N[lang];

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.dataset.i18n;
    if(dict[key]) el.innerHTML = dict[key];
  });

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
}

document.querySelectorAll(".langBtn").forEach(btn=>{
  btn.onclick = ()=> applyLang(btn.dataset.lang);
});

applyLang(localStorage.getItem("lang") || "ru");