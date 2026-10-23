(function () {
  "use strict";

  const locales = window.PixelGiftLocales || {};
  const supported = ["ru", "de", "en"];
  const page = document.body.dataset.page || "home";
  let activeLanguage = getInitialLanguage();

  function getInitialLanguage() {
    const saved = localStorage.getItem("pixelgift-language");
    if (supported.includes(saved)) return saved;
    const browser = (navigator.language || "ru").slice(0, 2).toLowerCase();
    return supported.includes(browser) ? browser : "ru";
  }

  function readPath(object, path) {
    return path.split(".").reduce((value, part) => value && value[part], object);
  }

  function translate(key, params) {
    const dictionary = locales[activeLanguage] || locales.ru || {};
    const fallback = locales.ru || {};
    let value = readPath(dictionary, key);
    if (value === undefined) value = readPath(fallback, key);
    if (value === undefined) return key;
    if (typeof value !== "string") return value;
    return Object.entries(params || {}).reduce(
      (text, entry) => text.replaceAll(`{${entry[0]}}`, String(entry[1])),
      value,
    );
  }

  function applyTranslations(root) {
    (root || document).querySelectorAll("[data-i18n]").forEach((element) => {
      const value = translate(element.dataset.i18n);
      if (typeof value === "string") element.textContent = value;
    });
    (root || document).querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = translate(element.dataset.i18nHtml);
      if (typeof value === "string") element.innerHTML = value;
    });
    (root || document).querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", translate(element.dataset.i18nPlaceholder));
    });
    (root || document).querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", translate(element.dataset.i18nAria));
    });

    document.documentElement.lang = activeLanguage;
    document.title = translate(`meta.${page}.title`);
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (description) description.content = translate(`meta.${page}.description`);
    if (ogTitle) ogTitle.content = translate(`meta.${page}.title`);
    if (ogDescription) ogDescription.content = translate(`meta.${page}.description`);
    document.querySelectorAll("[data-language-select]").forEach((select) => {
      select.value = activeLanguage;
    });
    document.dispatchEvent(new CustomEvent("pixelgift:language", { detail: { language: activeLanguage } }));
  }

  function setLanguage(language) {
    if (!supported.includes(language)) return;
    activeLanguage = language;
    localStorage.setItem("pixelgift-language", language);
    renderPackages();
    applyTranslations(document);
  }

  function setupLanguageSelectors() {
    document.querySelectorAll("[data-language-select]").forEach((select) => {
      select.addEventListener("change", () => setLanguage(select.value));
    });
  }

  function setupNavigation() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      menu.dataset.open = String(!isOpen);
      document.body.classList.toggle("nav-open", !isOpen);
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.dataset.open = "false";
      document.body.classList.remove("nav-open");
    }));
  }

  function setupFaq() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!button || !answer) return;
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        answer.hidden = expanded;
      });
    });
  }

  function setupReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    items.forEach((item) => observer.observe(item));
  }

  function renderPackages() {
    const grid = document.querySelector("[data-package-grid]");
    if (!grid || !window.PixelGiftConfig) return;
    grid.innerHTML = window.PixelGiftConfig.packages.map((item, index) => {
      const featureKeys = translate(`${item.key}.features`);
      const features = Array.isArray(featureKeys) ? featureKeys : [];
      return `<article class="price-card${index === 1 ? " price-card--featured" : ""}" data-reveal>
        ${index === 1 ? `<span class="price-card__flag">${translate("packages.recommended")}</span>` : ""}
        <h3>${translate(`${item.key}.name`)}</h3>
        <p class="price"><span>${translate("packages.from")}</span> ${item.price} €</p>
        <p class="price-card__lead">${translate(`${item.key}.description`)}</p>
        <ul class="check-list">${features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
        <a class="button ${index === 1 ? "button--primary" : "button--ghost"}" href="customize.html?package=${item.id}">${translate("packages.choose")}</a>
      </article>`;
    }).join("");
    setupReveal();
  }

  function setActiveNavigation() {
    document.querySelectorAll("[data-nav-page]").forEach((link) => {
      if (link.dataset.navPage === page) link.setAttribute("aria-current", "page");
    });
  }

  function setupImageFallbacks() {
    document.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => image.closest(".media-frame")?.classList.add("media-frame--missing"), { once: true });
    });
  }

  window.PixelGiftI18n = Object.freeze({
    t: translate,
    apply: applyTranslations,
    setLanguage,
    get language() { return activeLanguage; },
  });

  setupLanguageSelectors();
  setupNavigation();
  setupFaq();
  renderPackages();
  setActiveNavigation();
  setupImageFallbacks();
  applyTranslations(document);
  setupReveal();
})();

