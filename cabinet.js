// Agenhill Cabinet — temporary static owner gate.
// IMPORTANT: this is not real security. For production use server-side login and allowed e-mail list.
const PRIVATE_PASS_HASH = "6e0bbf85f919aed24792d9205af911cd494dc34ace3395801257e7813e389a40"; // default password: agenhill2026

const $ = (id) => document.getElementById(id);
const fields = ["scTitle", "scFormat", "scGenre", "scIdea", "scCharacters", "scMood", "scScenes", "scOutput"];

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function showApp() {
  $("cabLock").hidden = true;
  $("cabApp").hidden = false;
  loadProject();
}

function showLock() {
  $("cabApp").hidden = true;
  $("cabLock").hidden = false;
}

function getData() {
  return Object.fromEntries(fields.map((id) => [id, $(id)?.value || ""]));
}

function setData(data) {
  fields.forEach((id) => {
    if ($(id) && data[id] !== undefined) $(id).value = data[id];
  });
}

function loadProject() {
  try { setData(JSON.parse(localStorage.getItem("agenhill_cabinet_script") || "{}")); } catch (_) {}
}

function saveProject(message = "Saved locally") {
  localStorage.setItem("agenhill_cabinet_script", JSON.stringify(getData()));
  const el = $("saveState");
  if (el) {
    el.textContent = message + " · " + new Date().toLocaleString();
    setTimeout(() => (el.textContent = ""), 4000);
  }
}

function baseContext() {
  const title = $("scTitle").value.trim() || "Untitled project";
  const format = $("scFormat").value.trim();
  const genre = $("scGenre").value.trim() || "not specified";
  const idea = $("scIdea").value.trim() || "not specified";
  const characters = $("scCharacters").value.trim() || "not specified";
  const mood = $("scMood").value.trim() || "cinematic, clear, detailed";
  const scenes = $("scScenes").value.trim() || "not specified";
  return { title, format, genre, idea, characters, mood, scenes };
}

function buildTool(tool) {
  const c = baseContext();
  const header = `Project: ${c.title}\nFormat: ${c.format}\nGenre: ${c.genre}\nVisual style / mood: ${c.mood}\n\nMain idea:\n${c.idea}\n\nCharacters:\n${c.characters}\n\nCurrent scene notes:\n${c.scenes}\n`;

  if (tool === "structure") {
    return `${header}\nTASK: Create a strong 3-act story structure. Include:\n1) logline,\n2) Act I setup,\n3) Act II escalation and midpoint,\n4) Act III climax and ending,\n5) 8-12 scene list,\n6) visual notes for each scene,\n7) what should be improved in the idea. Write clearly and cinematically.`;
  }
  if (tool === "scene") {
    return `${header}\nTASK: Turn this idea into a scene-by-scene screenplay plan. For each scene include: location, time, characters, goal, conflict, action beats, camera/visual mood, and short dialogue notes.`;
  }
  if (tool === "dialogue") {
    return `${header}\nTASK: Write natural dialogue for the most important scene. Keep characters distinct. Add emotional subtext, pauses, actions, and a short explanation of why the dialogue works.`;
  }
  if (tool === "video") {
    return `${header}\nTASK: Create a video generation prompt. Include camera movement, lighting, environment, character actions, cinematic style, duration, lens, realism level, and negative prompt. Make it suitable for AI video generation.`;
  }
  return `${header}\nTASK: Act as a professional screenwriter and AI movie prompt engineer. Help improve this project. First analyze the idea, then propose a stronger version, then create a clear script outline, scene list, character motivations, visual direction, and a production-ready AI prompt.`;
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("agenhill_cabinet_unlocked") === "1") showApp();

  $("cabLoginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const hash = await sha256($("cabPassword").value);
    if (hash === PRIVATE_PASS_HASH) {
      localStorage.setItem("agenhill_cabinet_unlocked", "1");
      showApp();
    } else {
      $("cabLoginError").hidden = false;
    }
  });

  $("cabLockBtn")?.addEventListener("click", () => {
    localStorage.removeItem("agenhill_cabinet_unlocked");
    showLock();
  });

  fields.forEach((id) => $(id)?.addEventListener("input", () => saveProject("Draft autosaved")));

  document.querySelectorAll("[data-tool]").forEach((btn) => {
    btn.addEventListener("click", () => {
      $("scOutput").value = buildTool(btn.dataset.tool);
      saveProject("Prompt created");
    });
  });

  $("copyOutput")?.addEventListener("click", async () => {
    await navigator.clipboard.writeText($("scOutput").value || "");
    saveProject("Copied");
  });
  $("saveProject")?.addEventListener("click", () => saveProject("Saved locally"));
  $("clearOutput")?.addEventListener("click", () => {
    $("scOutput").value = "";
    saveProject("Output cleared");
  });
});
