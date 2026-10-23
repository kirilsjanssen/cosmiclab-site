(function () {
  "use strict";

  const form = document.querySelector("[data-customizer]");
  if (!form || !window.PixelGiftConfig || !window.PixelGiftI18n) return;

  const config = window.PixelGiftConfig;
  const i18n = window.PixelGiftI18n;
  const panels = Array.from(form.querySelectorAll("[data-step-panel]"));
  const stepButtons = Array.from(document.querySelectorAll("[data-step-button]"));
  const progress = document.querySelector("[data-progress-bar]");
  const live = document.querySelector("[data-form-live]");
  const friendList = document.querySelector("[data-friend-list]");
  const addFriendButton = document.querySelector("[data-add-friend]");
  const friendLimitLabel = document.querySelector("[data-friend-limit]");
  const dialog = document.querySelector("[data-order-dialog]");
  const photoObjects = new Map();
  let currentStep = 1;
  let highestVisited = 1;

  const packageFromUrl = new URLSearchParams(location.search).get("package");
  if (config.packages.some((item) => item.id === packageFromUrl)) {
    const input = form.querySelector(`[name="package"][value="${packageFromUrl}"]`);
    if (input) input.checked = true;
  }

  function announce(message) {
    if (live) live.textContent = message;
  }

  function selectedPackage() {
    const id = new FormData(form).get("package") || "classic";
    return config.packages.find((item) => item.id === id) || config.packages[1];
  }

  function showStep(step, focusHeading) {
    currentStep = Math.min(6, Math.max(1, step));
    highestVisited = Math.max(highestVisited, currentStep);
    panels.forEach((panel) => { panel.hidden = Number(panel.dataset.stepPanel) !== currentStep; });
    stepButtons.forEach((button) => {
      const number = Number(button.dataset.stepButton);
      button.setAttribute("aria-current", number === currentStep ? "step" : "false");
      button.disabled = number > highestVisited;
      button.classList.toggle("is-complete", number < currentStep);
    });
    if (progress) progress.style.width = `${(currentStep / 6) * 100}%`;
    updateSummary();
    announce(i18n.t("customizer.stepAnnouncement", { step: currentStep }));
    if (focusHeading) panels[currentStep - 1].querySelector("h2")?.focus();
    document.scrollingElement.scrollLeft = 0;
  }

  function validateCurrentStep() {
    const panel = panels[currentStep - 1];
    const required = Array.from(panel.querySelectorAll("[required]"));
    const invalid = required.find((field) => !field.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      invalid.focus();
      return false;
    }
    return true;
  }

  form.addEventListener("click", (event) => {
    const next = event.target.closest("[data-next-step]");
    const back = event.target.closest("[data-prev-step]");
    if (next && validateCurrentStep()) showStep(currentStep + 1, true);
    if (back) showStep(currentStep - 1, true);
  });

  stepButtons.forEach((button) => button.addEventListener("click", () => {
    const target = Number(button.dataset.stepButton);
    if (target <= highestVisited) showStep(target, true);
  }));

  function humanSize(bytes) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function clearPhoto(wrapper) {
    const input = wrapper.querySelector('input[type="file"]');
    const image = wrapper.querySelector("[data-photo-image]");
    const empty = wrapper.querySelector("[data-photo-empty]");
    const meta = wrapper.querySelector("[data-photo-meta]");
    const remove = wrapper.querySelector("[data-remove-photo]");
    const oldUrl = photoObjects.get(input);
    if (oldUrl) URL.revokeObjectURL(oldUrl);
    photoObjects.delete(input);
    input.setCustomValidity("");
    input.value = "";
    image.removeAttribute("src");
    image.hidden = true;
    empty.hidden = false;
    meta.textContent = i18n.t("customizer.photoNone");
    remove.hidden = true;
    updateSummary();
  }

  function handlePhoto(input) {
    const wrapper = input.closest("[data-photo-upload]");
    const file = input.files && input.files[0];
    if (!file) return clearPhoto(wrapper);
    if (!config.upload.acceptedMimeTypes.includes(file.type)) {
      input.setCustomValidity(i18n.t("customizer.photoTypeError"));
      input.reportValidity();
      clearPhoto(wrapper);
      return;
    }
    if (file.size > config.upload.maxBytes) {
      input.setCustomValidity(i18n.t("customizer.photoSizeError"));
      input.reportValidity();
      clearPhoto(wrapper);
      return;
    }
    input.setCustomValidity("");
    const oldUrl = photoObjects.get(input);
    if (oldUrl) URL.revokeObjectURL(oldUrl);
    const url = URL.createObjectURL(file);
    photoObjects.set(input, url);
    const image = wrapper.querySelector("[data-photo-image]");
    image.src = url;
    image.alt = file.name;
    image.hidden = false;
    wrapper.querySelector("[data-photo-empty]").hidden = true;
    wrapper.querySelector("[data-photo-meta]").textContent = `${file.name} · ${humanSize(file.size)}`;
    wrapper.querySelector("[data-remove-photo]").hidden = false;
    announce(i18n.t("customizer.photoReady"));
    updateSummary();
  }

  form.addEventListener("change", (event) => {
    if (event.target.matches('input[type="file"]')) handlePhoto(event.target);
    if (event.target.name === "package") enforceFriendLimit();
    updateSummary();
  });
  form.addEventListener("input", updateSummary);
  form.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-photo]");
    if (remove) clearPhoto(remove.closest("[data-photo-upload]"));
    const removeFriend = event.target.closest("[data-remove-friend]");
    if (removeFriend) {
      const card = removeFriend.closest("[data-friend]");
      card.querySelectorAll('input[type="file"]').forEach((input) => {
        const url = photoObjects.get(input);
        if (url) URL.revokeObjectURL(url);
      });
      card.remove();
      renumberFriends();
      enforceFriendLimit();
    }
  });

  function friendCard(index) {
    const card = document.createElement("article");
    card.className = "friend-card";
    card.dataset.friend = "";
    card.innerHTML = `<div class="friend-card__head"><h3>${i18n.t("customizer.friendTitle", { number: index + 1 })}</h3><button class="icon-button" type="button" data-remove-friend data-i18n-aria="customizer.removeFriend" aria-label="${i18n.t("customizer.removeFriend")}">×</button></div>
      <div class="form-grid form-grid--three">
        <label class="field"><span data-i18n="customizer.friendName">${i18n.t("customizer.friendName")}</span><input name="friend_${index}_name" maxlength="40" autocomplete="off"></label>
        <label class="field"><span data-i18n="customizer.friendRole">${i18n.t("customizer.friendRole")}</span><select name="friend_${index}_role"><option value="ally" data-i18n="customizer.roleAlly">${i18n.t("customizer.roleAlly")}</option><option value="guide" data-i18n="customizer.roleGuide">${i18n.t("customizer.roleGuide")}</option><option value="rival" data-i18n="customizer.roleRival">${i18n.t("customizer.roleRival")}</option><option value="cameo" data-i18n="customizer.roleCameo">${i18n.t("customizer.roleCameo")}</option></select></label>
        <div class="photo-upload photo-upload--compact" data-photo-upload>
          <div class="photo-preview"><span data-photo-empty data-i18n="customizer.photoEmptyShort">${i18n.t("customizer.photoEmptyShort")}</span><img data-photo-image hidden alt=""></div>
          <label class="button button--small button--ghost"><span data-i18n="customizer.photoChoose">${i18n.t("customizer.photoChoose")}</span><input class="sr-only" type="file" name="friend_${index}_photo" accept="image/jpeg,image/png,image/webp"></label>
          <span class="file-meta" data-photo-meta data-i18n="customizer.photoNone">${i18n.t("customizer.photoNone")}</span>
          <button class="text-button" type="button" data-remove-photo hidden data-i18n="customizer.photoRemove">${i18n.t("customizer.photoRemove")}</button>
        </div>
      </div>`;
    return card;
  }

  function renumberFriends() {
    Array.from(friendList.querySelectorAll("[data-friend]")).forEach((card, index) => {
      card.querySelector("h3").textContent = i18n.t("customizer.friendTitle", { number: index + 1 });
      card.querySelectorAll("[name]").forEach((field) => {
        field.name = field.name.replace(/friend_\d+_/, `friend_${index}_`);
      });
    });
  }

  function enforceFriendLimit() {
    const limit = selectedPackage().extraCharacters;
    let cards = Array.from(friendList.querySelectorAll("[data-friend]"));
    while (cards.length > limit) {
      cards[cards.length - 1].remove();
      cards = Array.from(friendList.querySelectorAll("[data-friend]"));
    }
    addFriendButton.disabled = cards.length >= limit;
    friendLimitLabel.textContent = i18n.t("customizer.friendLimit", { current: cards.length, limit });
    renumberFriends();
  }

  addFriendButton.addEventListener("click", () => {
    const count = friendList.querySelectorAll("[data-friend]").length;
    const limit = selectedPackage().extraCharacters;
    if (count >= limit) return;
    friendList.append(friendCard(count));
    enforceFriendLimit();
  });

  function value(name) {
    const field = form.elements[name];
    if (!field) return "";
    if (field instanceof RadioNodeList) return field.value;
    return field.value;
  }

  function optionLabel(name) {
    const field = form.elements[name];
    if (!field) return "—";
    if (field instanceof RadioNodeList) {
      const checked = Array.from(field).find((item) => item.checked);
      return checked?.closest("label")?.querySelector("span")?.textContent || checked?.value || "—";
    }
    if (field.tagName === "SELECT") return field.selectedOptions[0]?.textContent || "—";
    return field.value || "—";
  }

  function updateSummary() {
    const summary = document.querySelector("[data-order-summary]");
    if (!summary) return;
    const packageItem = selectedPackage();
    const friends = Array.from(friendList.querySelectorAll("[data-friend]"));
    const heroPhoto = form.elements.hero_photo?.files?.[0];
    const heroPhotoUrl = photoObjects.get(form.elements.hero_photo);
    const rows = [
      [i18n.t("customizer.summaryGame"), i18n.t("games.adventure.title")],
      [i18n.t("customizer.summaryHero"), value("hero_name") || "—"],
      [i18n.t("customizer.summaryLook"), `${optionLabel("body_type")} · ${optionLabel("hair")} · ${optionLabel("outfit")}`],
      [i18n.t("customizer.summaryPhoto"), heroPhoto ? heroPhoto.name : i18n.t("customizer.photoNone")],
      [i18n.t("customizer.summaryFriends"), String(friends.length)],
      [i18n.t("customizer.summaryOccasion"), optionLabel("occasion")],
      [i18n.t("customizer.summaryLanguage"), optionLabel("game_language")],
      [i18n.t("customizer.summaryDifficulty"), optionLabel("difficulty")],
      [i18n.t("customizer.summaryMusic"), optionLabel("music")],
      [i18n.t("customizer.summaryPackage"), i18n.t(`${packageItem.key}.name`)],
    ];
    summary.innerHTML = `${heroPhoto && heroPhotoUrl ? `<img class="summary-avatar" src="${heroPhotoUrl}" alt="">` : ""}
      <dl>${rows.map(([label, content]) => `<div><dt>${label}</dt><dd>${escapeHtml(content)}</dd></div>`).join("")}</dl>
      <div class="summary-price"><span>${i18n.t("customizer.preliminaryPrice")}</span><strong>${i18n.t("packages.from")} ${packageItem.price} €</strong></div>
      <p class="form-note">${i18n.t("customizer.priceDisclaimer")}</p>`;
  }

  function escapeHtml(input) {
    return String(input).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateCurrentStep()) return;
    if (dialog && typeof dialog.showModal === "function") dialog.showModal();
    else alert(i18n.t("customizer.closedMessage"));
  });
  document.querySelector("[data-close-dialog]")?.addEventListener("click", () => dialog.close());

  document.addEventListener("pixelgift:language", () => {
    renumberFriends();
    enforceFriendLimit();
    updateSummary();
  });
  window.addEventListener("beforeunload", () => photoObjects.forEach((url) => URL.revokeObjectURL(url)));

  showStep(1, false);
  enforceFriendLimit();
})();
