/* =========================================================================
   SÉLECTEUR DE DIRECTION ARTISTIQUE  —  Lucius Arkmann
   -------------------------------------------------------------------------
   Permet de tester plusieurs DA (couleurs + polices) sur tout le site.
   Pour ajuster une DA : modifier les variables CSS dans THEME_CSS ci-dessous.
   Pour ajouter une DA : ajouter un bloc html[data-theme="xxx"] + une entrée
   dans la liste THEMES.
   ========================================================================= */
(function () {
  "use strict";

  /* ---- 1. Liste des directions artistiques ---------------------------- */
  var THEMES = [
    { id: "nocturne",     label: "Nocturne",        note: "actuelle" },
    { id: "galerie",      label: "Galerie",         note: "clair éditorial" },
    { id: "beton",        label: "Béton",           note: "brutaliste" },
    { id: "foret-beton",  label: "Forêt + Béton",   note: "organique" }
  ];
  var STORAGE_KEY = "lucius-da";

  /* ---- 2. Polices (Google Fonts) -------------------------------------- */
  var fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?" +
    "family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&" +
    "family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&" +
    "family=Space+Grotesk:wght@400;500;600;700&" +
    "family=Space+Mono:ital,wght@0,400;0,700;1,400&" +
    "family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&" +
    "display=swap";
  document.head.appendChild(fontLink);

  /* ---- 3. CSS des thèmes ---------------------------------------------- */
  var THEME_CSS = `
  /* Valeurs par défaut (= Nocturne actuelle). Définies ici pour garantir
     que toutes les pages disposent de l'ensemble des variables, même celles
     qui n'en déclaraient qu'une partie dans leur propre :root. */
  :root{
    --black:#07070A; --dark:#111116; --stone:#1C1C22; --warm:#F2EDE6;
    --muted:#8A857C; --gold:#B0ABA4; --gold-dim:#6B6560; --green:#3A3A42;
    --green-l:#5A5A66;
    --line:#2A2A35; --line-2:#3A3A44; --surface:#1E1E26; --surface-2:#1A1A20;
    --black-2:#0E0E14; --accent:#C58A8A; --accent-2:#9DBF9E;
    --font-head:'Barlow',sans-serif; --font-body:'Barlow',sans-serif;
  }

  /* Application des polices dès qu'une DA est sélectionnée */
  html[data-theme] body, html[data-theme] body *{ font-family:var(--font-body); }
  html[data-theme] h1, html[data-theme] h2, html[data-theme] h3, html[data-theme] h4,
  html[data-theme] .hero-name, html[data-theme] h1.hero-name,
  html[data-theme] .nav-logo, html[data-theme] .nav-back{ font-family:var(--font-head); }

  /* ====================== GALERIE — clair éditorial ==================== */
  html[data-theme="galerie"]{
    --black:#F4F1EA; --dark:#ECE7DD; --stone:#E4DED1; --black-2:#FBF9F4;
    --warm:#1A1814; --muted:#6B655B; --gold:#8A7E6A; --gold-dim:#9A9382;
    --green:#4A5A48; --green-l:#6E7E66;
    --line:#D8D1C2; --line-2:#C4BBA8; --surface:#ECE7DD; --surface-2:#E4DED1;
    --accent:#9C5A4A; --accent-2:#6E8A66;
    --font-head:'Cormorant Garamond',serif; --font-body:'Barlow',sans-serif;
  }
  html[data-theme="galerie"] h1, html[data-theme="galerie"] h1.hero-name,
  html[data-theme="galerie"] .hero-name{ font-weight:500; letter-spacing:-0.01em; }

  /* ====================== BÉTON — brutaliste ========================== */
  html[data-theme="beton"]{
    --black:#D9D9D5; --dark:#CFCFCB; --stone:#C6C6C2; --black-2:#E4E4E1;
    --warm:#15150F; --muted:#57574F; --gold:#6E6E64; --gold-dim:#82827A;
    --green:#3C3C36; --green-l:#5A5A52;
    --line:#AFAFA9; --line-2:#97978F; --surface:#CFCFCB; --surface-2:#C6C6C2;
    --accent:#B5452F; --accent-2:#4A4A44;
    --font-head:'Space Mono',monospace; --font-body:'Space Grotesk',sans-serif;
  }
  html[data-theme="beton"] h1, html[data-theme="beton"] h1.hero-name,
  html[data-theme="beton"] .hero-name{ letter-spacing:-0.02em; text-transform:uppercase; }

  /* ====================== FORÊT + BÉTON — organique =================== */
  html[data-theme="foret-beton"]{
    --black:#E6E3D9; --dark:#DCD8CC; --stone:#D0CCBE; --black-2:#EFEDE4;
    --warm:#1E2A1C; --muted:#5E6B52; --gold:#7A8466; --gold-dim:#8E9580;
    --green:#2C3A26; --green-l:#4E6044;
    --line:#BFC0AE; --line-2:#A6A892; --surface:#DCD8CC; --surface-2:#D0CCBE;
    --accent:#A85C3C; --accent-2:#6E8A5A;
    --font-head:'Fraunces',serif; --font-body:'Space Grotesk',sans-serif;
  }
  html[data-theme="foret-beton"] h1, html[data-theme="foret-beton"] h1.hero-name,
  html[data-theme="foret-beton"] .hero-name{ font-weight:500; letter-spacing:-0.01em; }

  /* ====================== UI du sélecteur ============================= */
  .da-switch{ position:relative; display:inline-flex; align-items:center; }
  .da-switch__btn{
    background:transparent; border:1px solid var(--line);
    color:var(--warm); font-family:inherit; font-size:13px;
    letter-spacing:0.18em; text-transform:uppercase;
    padding:5px 12px; cursor:pointer; transition:color .3s,border-color .3s;
    display:inline-flex; align-items:center; gap:8px; white-space:nowrap;
  }
  .da-switch__btn:hover{ border-color:var(--warm); }
  .da-switch__btn span.caret{ font-size:9px; opacity:.7; }
  .da-switch__menu{
    position:absolute; top:calc(100% + 8px); right:0; min-width:188px;
    background:var(--black-2); border:1px solid var(--line);
    padding:6px; z-index:1000; display:none;
    box-shadow:0 12px 40px rgba(0,0,0,.35);
  }
  .da-switch__menu.open{ display:block; }
  .da-switch__item{
    display:flex; justify-content:space-between; align-items:baseline; gap:14px;
    width:100%; background:transparent; border:0; cursor:pointer;
    color:var(--warm); font-family:inherit; text-align:left;
    padding:8px 10px; transition:background .2s;
  }
  .da-switch__item:hover{ background:var(--surface); }
  .da-switch__item[aria-current="true"]{ background:var(--surface); }
  .da-switch__item .nm{ font-size:13px; letter-spacing:0.12em; text-transform:uppercase; }
  .da-switch__item .nt{ font-size:11px; letter-spacing:0.04em; color:var(--muted); }
  .da-switch__item[aria-current="true"] .nm::before{ content:"› "; color:var(--accent); }
  @media(max-width:720px){
    .da-switch__btn{ font-size:11px; padding:4px 9px; letter-spacing:0.12em; }
    .da-switch__menu{ min-width:170px; }
  }
  `;
  var styleEl = document.createElement("style");
  styleEl.id = "da-switch-style";
  styleEl.textContent = THEME_CSS;
  document.head.appendChild(styleEl);

  /* ---- 4. Application du thème ---------------------------------------- */
  function applyTheme(id) {
    if (!id || id === "nocturne") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", id);
    }
    try { localStorage.setItem(STORAGE_KEY, id || "nocturne"); } catch (e) {}
    refreshUI(id || "nocturne");
  }

  function currentTheme() {
    try { return localStorage.getItem(STORAGE_KEY) || "nocturne"; }
    catch (e) { return "nocturne"; }
  }

  // Appliquer le thème mémorisé le plus tôt possible
  applyThemeSilent(currentTheme());
  function applyThemeSilent(id) {
    if (id && id !== "nocturne") document.documentElement.setAttribute("data-theme", id);
    else document.documentElement.removeAttribute("data-theme");
  }

  /* ---- 5. Construction du sélecteur ----------------------------------- */
  var ui = {};
  function refreshUI(active) {
    if (!ui.label) return;
    var t = THEMES.filter(function (x) { return x.id === active; })[0] || THEMES[0];
    ui.label.textContent = "DA · " + t.label;
    Array.prototype.forEach.call(ui.items, function (it) {
      it.setAttribute("aria-current", it.dataset.id === active ? "true" : "false");
    });
  }

  function buildSwitch() {
    var wrap = document.createElement("div");
    wrap.className = "da-switch";

    var btn = document.createElement("button");
    btn.className = "da-switch__btn";
    btn.type = "button";
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    ui.label = document.createElement("span");
    ui.label.textContent = "DA";
    var caret = document.createElement("span");
    caret.className = "caret"; caret.textContent = "▾";
    btn.appendChild(ui.label); btn.appendChild(caret);

    var menu = document.createElement("div");
    menu.className = "da-switch__menu";

    ui.items = [];
    THEMES.forEach(function (t) {
      var item = document.createElement("button");
      item.className = "da-switch__item";
      item.type = "button";
      item.dataset.id = t.id;
      item.innerHTML = '<span class="nm">' + t.label + '</span><span class="nt">' + t.note + "</span>";
      item.addEventListener("click", function () {
        applyTheme(t.id);
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
      menu.appendChild(item);
      ui.items.push(item);
    });

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function () {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });

    wrap.appendChild(btn);
    wrap.appendChild(menu);
    return wrap;
  }

  /* ---- 6. Insertion dans la barre de navigation ----------------------- */
  function mount() {
    var sw = buildSwitch();
    var langBtn = document.getElementById("lang-toggle");

    if (langBtn) {
      // index : <li><button#lang-toggle></li> dans une <ul>
      if (langBtn.parentElement && langBtn.parentElement.tagName === "LI") {
        var li = document.createElement("li");
        li.appendChild(sw);
        langBtn.parentElement.parentElement.insertBefore(li, langBtn.parentElement);
      } else {
        // pages activités : bouton dans une <div>
        langBtn.parentElement.insertBefore(sw, langBtn);
      }
    } else {
      // repli : épingler en haut à droite
      sw.style.position = "fixed";
      sw.style.top = "26px";
      sw.style.right = "48px";
      sw.style.zIndex = "1000";
      document.body.appendChild(sw);
    }
    refreshUI(currentTheme());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
