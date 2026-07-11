(function () {
  const I18N = {
    en: {
      "nav.home":"Home","nav.projects":"Projects","nav.mt5":"MT5 Indicators","nav.models":"3D Models","nav.apps":"Apps","nav.ai":"AI Lab","nav.contact":"Contact","nav.support":"Support Bot",
      "hero.back":"← Back to products","hero.title":"MT5 / MQL5 Indicators","hero.lead":"Custom indicators, EX5 files, dashboard logic, alerts, signal labels and visual trading tools.","hero.bot":"Write to Support Bot","hero.home":"Home page",
      "included.title":"What is included","included.1":"MQL5 custom indicators","included.2":"EX5 delivery","included.3":"Dashboard logic","included.4":"Signal arrows and labels","included.5":"Alerts","included.6":"Branding / watermark",
      "for.title":"Who it is for","for.text":"For a client who needs a working MVP, prototype, separate module, automation or a ready technical part for publication or private use.",
      "need.title":"What I need from you","need.1":"Briefly describe the task","need.2":"Show an example or reference if you have one","need.3":"Explain what must work in the first version","need.4":"Specify the platform and expected behavior",
      "contact.title":"Contact","contact.text":"Use the official support bot. Direct personal Telegram is not used on this website.","contact.bot":"Open Support Bot"
    },
    ru: {
      "nav.home":"Главная","nav.projects":"Проекты","nav.mt5":"MT5 Индикаторы","nav.models":"3D Модели","nav.apps":"Приложения","nav.ai":"AI Lab","nav.contact":"Контакт","nav.support":"Support Bot",
      "hero.back":"← Назад к продуктам","hero.title":"MT5 / MQL5 индикаторы","hero.lead":"Кастомные индикаторы, EX5-файлы, dashboard-логика, alerts, сигнальные метки и визуальные торговые инструменты.","hero.bot":"Написать в Support Bot","hero.home":"На главную",
      "included.title":"Что входит","included.1":"Кастомные MQL5-индикаторы","included.2":"Передача EX5-файла","included.3":"Dashboard-логика","included.4":"Стрелки сигналов и метки","included.5":"Уведомления / alerts","included.6":"Брендинг / watermark",
      "for.title":"Для кого подходит","for.text":"Для клиента, которому нужен рабочий MVP, прототип, отдельный модуль, автоматизация или готовая техническая часть для публикации или личного использования.",
      "need.title":"Что нужно от клиента","need.1":"Кратко описать задачу","need.2":"Показать пример или референс, если есть","need.3":"Объяснить, что должно работать в первой версии","need.4":"Указать платформу и нужное поведение",
      "contact.title":"Связь","contact.text":"Пиши через официальный support bot. Прямой личный Telegram на сайте не используется.","contact.bot":"Открыть Support Bot"
    },
    de: {
      "nav.home":"Start","nav.projects":"Projekte","nav.mt5":"MT5 Indikatoren","nav.models":"3D Modelle","nav.apps":"Apps","nav.ai":"AI Lab","nav.contact":"Kontakt","nav.support":"Support Bot",
      "hero.back":"← Zurück zu Produkten","hero.title":"MT5 / MQL5 Indikatoren","hero.lead":"Custom-Indikatoren, EX5-Dateien, Dashboard-Logik, Alerts, Signal-Labels und visuelle Trading-Tools.","hero.bot":"Support Bot schreiben","hero.home":"Startseite",
      "included.title":"Was enthalten ist","included.1":"Custom MQL5-Indikatoren","included.2":"EX5-Lieferung","included.3":"Dashboard-Logik","included.4":"Signalpfeile und Labels","included.5":"Alerts","included.6":"Branding / Watermark",
      "for.title":"Für wen es passt","for.text":"Für Kunden, die ein funktionierendes MVP, einen Prototyp, ein einzelnes Modul, Automatisierung oder einen fertigen technischen Teil zur Veröffentlichung oder privaten Nutzung brauchen.",
      "need.title":"Was ich vom Kunden brauche","need.1":"Aufgabe kurz beschreiben","need.2":"Beispiel oder Referenz zeigen, falls vorhanden","need.3":"Erklären, was in der ersten Version funktionieren muss","need.4":"Plattform und erwartetes Verhalten angeben",
      "contact.title":"Kontakt","contact.text":"Bitte den offiziellen Support Bot nutzen. Persönliches Telegram wird auf dieser Website nicht verwendet.","contact.bot":"Support Bot öffnen"
    }
  };

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.en;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll(".langBtn").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
    document.documentElement.lang = lang;
    localStorage.setItem("agenhill_lang", lang);
  }

  document.querySelectorAll(".langBtn").forEach(btn => btn.addEventListener("click", () => applyLang(btn.dataset.lang || "en")));
  applyLang(localStorage.getItem("agenhill_lang") || "en");

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
