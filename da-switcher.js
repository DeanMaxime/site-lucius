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
    { id: "beton",        label: "Béton",           note: "architecture" },
    { id: "blueprint",    label: "Blueprint",       note: "plan technique" }
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

  /* ====================== BLUEPRINT — plan technique ================= */
  /* Base béton clair ; la surcouche bleue (grille, rail, cotes, cartouche)
     est gérée par le MODULE BLUEPRINT plus bas. */
  html[data-theme="blueprint"]{
    --black:#DEDED9; --dark:#D4D4CF; --stone:#CBCBC6; --black-2:#E7E7E3;
    --warm:#17223A; --muted:#5A6478; --gold:#5E6C8C; --gold-dim:#7C849A;
    --green:#2E3C56; --green-l:#4C5A78;
    --line:#A9B0BE; --line-2:#909AAC; --surface:#D4D4CF; --surface-2:#CBCBC6;
    --accent:#2F5DA8; --accent-2:#4A4A44;
    --font-head:'Space Mono',monospace; --font-body:'Space Grotesk',sans-serif;
  }
  html[data-theme="blueprint"] h1, html[data-theme="blueprint"] h1.hero-name,
  html[data-theme="blueprint"] .hero-name{ letter-spacing:-0.02em; text-transform:uppercase; }

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


/* =========================================================================
   MODULE BLUEPRINT  —  surcouche pour la DA « Béton »
   -------------------------------------------------------------------------
   Active uniquement quand html[data-theme="beton"].
   Ajoute : grille technique bleue, repères de coin, rail + connecteurs
   orthogonaux ancrés sur les sections, cotes, numérotation, cartouche.
   100 % autonome : ne touche pas au HTML des pages.
   ========================================================================= */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var RAIL = 34;          // x du rail vertical (gouttière gauche)
  var on = false;
  var els = {};           // éléments injectés
  var io = null;          // IntersectionObserver (structure)
  var conceptIO = null;   // IntersectionObserver (fils sémantiques)
  var rafPending = false;

  /* ---- 0. Carte des concepts : terme du texte -> carte d'activité ----- */
  var CONCEPTS = [
    { from:"compositeur", root:"#about", card:"activite_composition.html",
      word:"Composition",  label:"COMPOSITION" },
    { from:"concertiste", root:"#about", card:"activite_interpretation.html",
      word:"Concertiste",  label:"INTERPRÉTATION" },
    { from:"guitariste",  root:"#about", card:"activite_enseignement.html",
      word:"guitare",      label:"GUITARE" }
  ];

  /* ---- 1. CSS (scopée beton) ---------------------------------------- */
  var CSS = `
  html[data-theme="blueprint"]{
    --bp:#2F5DA8; --bp-soft:rgba(47,93,168,.16); --bp-line:rgba(47,93,168,.55);
    --bp-ink:#21477E;
  }
  /* grille technique : fin (28px) + fort (140px) */
  .bp-grid{
    position:fixed; inset:0; pointer-events:none; z-index:2; opacity:.9;
    background-image:
      linear-gradient(var(--bp-soft) 1px, transparent 1px),
      linear-gradient(90deg, var(--bp-soft) 1px, transparent 1px),
      linear-gradient(rgba(47,93,168,.30) 1px, transparent 1px),
      linear-gradient(90deg, rgba(47,93,168,.30) 1px, transparent 1px);
    background-size:28px 28px, 28px 28px, 140px 140px, 140px 140px;
    background-position:-1px -1px, -1px -1px, -1px -1px, -1px -1px;
    mix-blend-mode:multiply;
  }
  .bp-svg{ position:absolute; top:0; left:0; width:100%; pointer-events:none;
    z-index:3; overflow:visible; }
  .bp-svg .rail{ fill:none; stroke:var(--bp-line); stroke-width:1.2; }
  .bp-svg .conn{ fill:none; stroke:var(--bp-line); stroke-width:1.2;
    transition:stroke-dashoffset .9s cubic-bezier(.2,.7,.2,1); }
  .bp-svg .node{ fill:none; stroke:var(--bp); stroke-width:1.4;
    opacity:0; transition:opacity .5s .15s; }
  .bp-svg .node.dot{ fill:var(--bp); }
  .bp-svg .num{ fill:var(--bp-ink); font-family:'Space Mono',monospace;
    font-size:11px; letter-spacing:.06em; opacity:0; transition:opacity .5s .25s; }
  .bp-svg .cote{ stroke:var(--bp-line); stroke-width:1; }
  .bp-svg .cote-txt{ fill:var(--bp-ink); font-family:'Space Mono',monospace;
    font-size:10px; letter-spacing:.08em; }
  .bp-svg .reveal .conn{ stroke-dashoffset:0 !important; }
  .bp-svg .reveal .node, .bp-svg .reveal .num{ opacity:1; }

  /* repères de coin (crosshairs) */
  .bp-corner{ position:fixed; width:22px; height:22px; z-index:6;
    pointer-events:none; }
  .bp-corner::before,.bp-corner::after{ content:''; position:absolute;
    background:var(--bp-line); }
  .bp-corner::before{ left:0; top:10px; width:22px; height:1px; }
  .bp-corner::after{ left:10px; top:0; width:1px; height:22px; }
  .bp-corner.tl{ top:14px; left:14px; } .bp-corner.tr{ top:14px; right:14px; }
  .bp-corner.bl{ bottom:14px; left:14px; } .bp-corner.br{ bottom:14px; right:14px; }

  /* cartouche (cartouche d'architecte, bas-droite) */
  .bp-cartouche{ position:fixed; right:14px; bottom:44px; z-index:6;
    pointer-events:none; border:1px solid var(--bp-line); background:rgba(231,231,225,.78);
    backdrop-filter:blur(2px); font-family:'Space Mono',monospace; color:var(--bp-ink);
    width:248px; }
  .bp-cartouche div{ border-bottom:1px solid var(--bp-line); padding:5px 9px;
    display:flex; justify-content:space-between; gap:10px; font-size:10px;
    letter-spacing:.06em; }
  .bp-cartouche div:last-child{ border-bottom:0; }
  .bp-cartouche .k{ color:var(--bp); text-transform:uppercase; }
  .bp-cartouche .big{ font-size:12px; letter-spacing:.18em; text-transform:uppercase;
    justify-content:flex-start; color:var(--bp-ink); }
  /* fils sémantiques : termes du texte reliés aux activités */
  .bp-svg .cwire{ fill:none; stroke:var(--bp); stroke-width:1.3;
    transition:stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1); }
  .bp-svg .cunder{ stroke:var(--bp); stroke-width:1.6;
    transition:stroke-dashoffset .7s cubic-bezier(.2,.7,.2,1); }
  .bp-svg .cdot{ fill:var(--bp); opacity:0; transition:opacity .4s .2s; }
  .bp-svg .clbl{ fill:var(--bp-ink); font-family:'Space Mono',monospace;
    font-size:9.5px; letter-spacing:.1em; opacity:0; transition:opacity .4s .35s; }
  .bp-svg .reveal .cwire,.bp-svg .reveal .cunder{ stroke-dashoffset:0 !important; }
  .bp-svg .reveal .cdot,.bp-svg .reveal .clbl{ opacity:1; }
  @media(max-width:720px){
    .bp-cartouche{ width:190px; bottom:60px; }
    .bp-svg .num,.bp-svg .cote-txt,.bp-svg .clbl{ display:none; }
  }
  `;
  var style = document.createElement("style");
  style.id = "bp-style";
  style.textContent = CSS;
  document.head.appendChild(style);

  /* ---- 2. helpers ---------------------------------------------------- */
  function svg(tag, attrs){
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function pad2(n){ return (n < 10 ? "0" : "") + n; }

  // rect (viewport) du premier mot trouvé dans un conteneur, sans toucher au DOM
  function wordRect(root, word){
    if (!root) return null;
    var rx = new RegExp(word, "i");
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())){
      var m = rx.exec(n.nodeValue);
      if (m){
        var r = document.createRange();
        r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
        var rc = r.getBoundingClientRect();
        if (rc && rc.width) return rc;
      }
    }
    return null;
  }
  function underline(rect){
    var y  = rect.bottom + window.scrollY + 2;
    var x1 = rect.left + window.scrollX, x2 = rect.right + window.scrollX;
    var ln = svg("line", { "class":"cunder", x1:x1, y1:y, x2:x2, y2:y });
    var L = x2 - x1; ln.style.strokeDasharray = L; ln.style.strokeDashoffset = L;
    return ln;
  }

  // fils sémantiques : relie chaque terme de la phrase-thèse à son activité
  function drawConcepts(){
    if (conceptIO){ conceptIO.disconnect(); conceptIO = null; }
    var about = document.querySelector("#about");
    if (!about) return;
    var g = svg("g", {}), any = false;
    CONCEPTS.forEach(function(c){
      var aRect = wordRect(document.querySelector(c.root), c.from);
      var card  = document.querySelector('.activity-card[onclick*="' + c.card + '"]');
      if (!aRect || !card) return;
      var tRect = wordRect(card, c.word) || card.getBoundingClientRect();
      var sx = aRect.left + window.scrollX + aRect.width / 2;
      var sy = aRect.bottom + window.scrollY + 2;
      var ex = tRect.left + window.scrollX + Math.min(tRect.width, 60) / 2;
      var ey = tRect.top + window.scrollY - 4;
      g.appendChild(underline(aRect));
      g.appendChild(underline(tRect));
      g.appendChild(svg("circle", { "class":"cdot", cx:sx, cy:sy, r:2.3 }));
      g.appendChild(svg("circle", { "class":"cdot", cx:ex, cy:ey, r:2.3 }));
      var dy = ey - sy;
      g.appendChild(svg("path", { "class":"cwire",
        d:"M " + sx + " " + sy +
          " C " + sx + " " + (sy + dy*0.42) + ", " +
                  ex + " " + (ey - dy*0.42) + ", " + ex + " " + ey }));
      var lbl = svg("text", { "class":"clbl", x:(sx+ex)/2 + 8, y:(sy+ey)/2 });
      lbl.textContent = c.label;
      g.appendChild(lbl);
      any = true;
    });
    if (!any) return;
    els.svg.appendChild(g);
    Array.prototype.forEach.call(g.querySelectorAll(".cwire"), function(p){
      var L = p.getTotalLength();
      p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
    });
    about.__bpConcepts = g;
    conceptIO = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting && e.target.__bpConcepts)
          e.target.__bpConcepts.classList.add("reveal");
      });
    }, { rootMargin:"-15% 0px -15% 0px" });
    conceptIO.observe(about);
  }

  function docHeight(){
    var b = document.body, h = document.documentElement;
    return Math.max(b.scrollHeight, h.scrollHeight, b.offsetHeight, h.offsetHeight);
  }

  /* ---- 3. construction de la surcouche ------------------------------ */
  function build(){
    els.grid = document.createElement("div"); els.grid.className = "bp-grid";
    document.body.appendChild(els.grid);

    els.corners = [];
    ["tl","tr","bl","br"].forEach(function(p){
      var c = document.createElement("div"); c.className = "bp-corner " + p;
      document.body.appendChild(c); els.corners.push(c);
    });

    var year = new Date().getFullYear();
    var cart = document.createElement("div"); cart.className = "bp-cartouche";
    cart.innerHTML =
      '<div class="big">Lucius Arkmann</div>' +
      '<div><span class="k">Projet</span><span>Site web</span></div>' +
      '<div><span class="k">DA</span><span>Béton · Blueprint</span></div>' +
      '<div><span class="k">Éch.</span><span>1:1</span></div>' +
      '<div><span class="k">Feuille</span><span>01 / 01</span></div>' +
      '<div><span class="k">Date</span><span>' + year + '</span></div>';
    document.body.appendChild(cart); els.cart = cart;

    els.svg = svg("svg", { "class":"bp-svg" });
    document.body.appendChild(els.svg);

    layout();
    window.addEventListener("scroll", onScroll, { passive:true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
  }

  /* ---- 4. (re)calcul géométrique + dessin --------------------------- */
  function layout(){
    if (!els.svg) return;
    while (els.svg.firstChild) els.svg.removeChild(els.svg.firstChild);
    if (io) io.disconnect();

    var H = docHeight(), W = window.innerWidth;
    els.svg.setAttribute("height", H);
    els.svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    els.svg.style.height = H + "px";

    // ancres = sections avec un id, point = bord gauche / centre du label
    var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
    var nodes = [];
    sections.forEach(function(sec){
      var label = sec.querySelector(".section-label, .section-title, h1, h2") || sec;
      var r = label.getBoundingClientRect();
      var x = Math.max(r.left + window.scrollX, RAIL + 26);
      var y = r.top + window.scrollY + r.height / 2;
      nodes.push({ x:x, y:y, id:sec.id, sec:sec });
    });
    if (nodes.length < 2) return; // dégradation : pages sans sections multiples

    var top = nodes[0].y, bot = nodes[nodes.length - 1].y;

    // rail vertical (dessiné au scroll)
    var rail = svg("path", { "class":"rail",
      d:"M " + RAIL + " " + top + " L " + RAIL + " " + bot });
    els.svg.appendChild(rail); els.rail = rail;
    var railLen = bot - top;
    rail.style.strokeDasharray = railLen;
    rail.style.strokeDashoffset = railLen;
    els.railLen = railLen;

    // connecteurs + nœuds + numéros
    nodes.forEach(function(n, i){
      var g = svg("g", {});
      var connLen = (n.x - 16) - RAIL;
      var conn = svg("path", { "class":"conn",
        d:"M " + RAIL + " " + n.y + " L " + (n.x - 16) + " " + n.y });
      conn.style.strokeDasharray = connLen;
      conn.style.strokeDashoffset = connLen;
      g.appendChild(conn);
      g.appendChild(svg("circle", { "class":"node", cx:n.x - 12, cy:n.y, r:4 }));
      g.appendChild(svg("circle", { "class":"node dot", cx:n.x - 12, cy:n.y, r:1.5 }));
      var num = svg("text", { "class":"num", x:RAIL + 6, y:n.y - 8 });
      num.textContent = pad2(i + 1) + " · " + n.id.toUpperCase();
      g.appendChild(num);
      els.svg.appendChild(g);
      n.sec.__bpGroup = g;
    });

    io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting && en.target.__bpGroup)
          en.target.__bpGroup.classList.add("reveal");
      });
    }, { rootMargin:"-12% 0px -12% 0px" });
    nodes.forEach(function(n){ io.observe(n.sec); });

    // cote verticale globale (marge droite)
    var cx = W - 30, mid = (top + bot) / 2;
    var cote = svg("g", {});
    cote.appendChild(svg("line", { "class":"cote", x1:cx, y1:top, x2:cx, y2:bot }));
    cote.appendChild(svg("line", { "class":"cote", x1:cx-5, y1:top, x2:cx+5, y2:top }));
    cote.appendChild(svg("line", { "class":"cote", x1:cx-5, y1:bot, x2:cx+5, y2:bot }));
    var ct = svg("text", { "class":"cote-txt", x:cx-8, y:mid,
      transform:"rotate(-90 " + (cx-8) + " " + mid + ")", "text-anchor":"middle" });
    ct.textContent = "H = " + Math.round(bot - top) + " px";
    cote.appendChild(ct);
    els.svg.appendChild(cote);

    onScroll();
  }

  /* ---- 5. animation liée au scroll ---------------------------------- */
  function onScroll(){
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function(){
      rafPending = false;
      if (!els.rail) return;
      var max = docHeight() - window.innerHeight;
      var p = max > 0 ? Math.min(1, window.scrollY / max) : 1;
      els.rail.style.strokeDashoffset = els.railLen * (1 - p);
    });
  }
  var resizeT;
  function onResize(){ clearTimeout(resizeT); resizeT = setTimeout(layout, 180); }

  /* ---- 6. activation / désactivation -------------------------------- */
  function enable(){ if (!on){ on = true; build(); } }
  function disable(){
    if (!on) return; on = false;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("load", onResize);
    if (io){ io.disconnect(); io = null; }
    if (conceptIO){ conceptIO.disconnect(); conceptIO = null; }
    [els.grid, els.cart, els.svg].forEach(function(e){ if (e) e.remove(); });
    (els.corners || []).forEach(function(c){ c.remove(); });
    els = {};
  }
  function sync(){
    (document.documentElement.getAttribute("data-theme") === "blueprint")
      ? enable() : disable();
  }

  new MutationObserver(sync).observe(document.documentElement,
    { attributes:true, attributeFilter:["data-theme"] });

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", sync);
  else sync();
})();


/* =========================================================================
   MODULE ARCHITECTURE  —  surcouche pour la DA « Béton »
   -------------------------------------------------------------------------
   Active uniquement quand html[data-theme="beton"].
   Pas de quadrillage : révèle le maillage interne du site avec des lignes.
   - cadres qui se délimitent (équerres) autour de chaque section ;
   - leads horizontaux partant de chaque titre vers la marge droite ;
   - chaîne verticale reliant les sections entre elles (maillage) ;
   - numérotation discrète, tout se trace à l'entrée à l'écran.
   100 % autonome : ne touche pas au HTML des pages.
   ========================================================================= */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var on = false, els = {}, io = null, conceptIO = null;
  var INSET = 22;   // retrait du cadre par rapport au bord de section
  var BR = 30;      // longueur des bras d'équerre
  var GUT = 44;     // marge droite (x de la chaîne verticale)

  var CSS = `
  html[data-theme="beton"]{
    --ar:rgba(21,21,15,.50); --ar-soft:rgba(21,21,15,.26); --ar-accent:#B5452F;
  }
  .ar-svg{ position:absolute; top:0; left:0; width:100%; pointer-events:none;
    z-index:3; overflow:visible; }
  .ar-svg path,.ar-svg line{ fill:none; }
  .ar-svg .frame{ stroke:var(--ar-soft); stroke-width:1.1;
    transition:stroke-dashoffset 1.1s cubic-bezier(.2,.7,.2,1); }
  .ar-svg .lead{ stroke:var(--ar); stroke-width:1.1;
    transition:stroke-dashoffset .9s cubic-bezier(.2,.7,.2,1); }
  .ar-svg .chain{ stroke:var(--ar); stroke-width:1.1;
    transition:stroke-dashoffset .9s .1s cubic-bezier(.2,.7,.2,1); }
  .ar-svg .nbox{ fill:none; stroke:var(--ar-accent); stroke-width:1.4;
    opacity:0; transition:opacity .5s .2s; }
  .ar-svg .nbox.fill{ fill:var(--ar-accent); }
  .ar-svg .num{ fill:var(--ar-accent); font-family:'Space Mono',monospace;
    font-size:11px; letter-spacing:.08em; opacity:0; transition:opacity .5s .3s; }
  .ar-svg .reveal .frame,.ar-svg .reveal .lead,.ar-svg .reveal .chain{
    stroke-dashoffset:0 !important; }
  .ar-svg .reveal .nbox,.ar-svg .reveal .num{ opacity:1; }
  /* fils sémantiques : termes du texte reliés aux activités (lignes droites) */
  .ar-svg .cwire{ stroke:var(--ar-accent); stroke-width:1.3;
    transition:stroke-dashoffset 1.1s cubic-bezier(.2,.7,.2,1); }
  .ar-svg .cunder{ stroke:var(--ar-accent); stroke-width:1.6;
    transition:stroke-dashoffset .7s cubic-bezier(.2,.7,.2,1); }
  .ar-svg .cdot{ fill:var(--ar-accent); opacity:0; transition:opacity .4s .2s; }
  .ar-svg .clbl{ fill:var(--ar-accent); font-family:'Space Mono',monospace;
    font-size:9.5px; letter-spacing:.1em; opacity:0; transition:opacity .4s .35s; }
  .ar-svg .reveal .cwire,.ar-svg .reveal .cunder{ stroke-dashoffset:0 !important; }
  .ar-svg .reveal .cdot,.ar-svg .reveal .clbl{ opacity:1; }
  @media(max-width:720px){ .ar-svg .num,.ar-svg .clbl{ display:none; } }
  `;
  var style = document.createElement("style");
  style.id = "ar-style"; style.textContent = CSS;
  document.head.appendChild(style);

  function svg(tag, a){ var e = document.createElementNS(NS, tag);
    for (var k in a) e.setAttribute(k, a[k]); return e; }
  function pad2(n){ return (n < 10 ? "0" : "") + n; }
  function docHeight(){ var b=document.body,h=document.documentElement;
    return Math.max(b.scrollHeight,h.scrollHeight,b.offsetHeight,h.offsetHeight); }

  // équerre : path de longueur 2*BR partant des deux bras vers le coin
  function corner(cx, cy, dx, dy){
    return svg("path", { "class":"frame",
      d:"M " + (cx+dx*BR) + " " + cy + " L " + cx + " " + cy +
        " L " + cx + " " + (cy+dy*BR) });
  }
  function dash(el){ var L = el.getTotalLength();
    el.style.strokeDasharray = L; el.style.strokeDashoffset = L; }

  /* ---- fils sémantiques : terme du texte -> carte d'activité --------- */
  var CONCEPTS = [
    { from:"compositeur", root:"#about", card:"activite_composition.html",
      word:"Composition",  label:"COMPOSITION" },
    { from:"concertiste", root:"#about", card:"activite_interpretation.html",
      word:"Concertiste",  label:"INTERPRÉTATION" },
    { from:"guitariste",  root:"#about", card:"activite_enseignement.html",
      word:"guitare",      label:"GUITARE" }
  ];
  function wordRect(root, word){
    if (!root) return null;
    var rx = new RegExp(word, "i");
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())){
      var m = rx.exec(n.nodeValue);
      if (m){
        var r = document.createRange();
        r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
        var rc = r.getBoundingClientRect();
        if (rc && rc.width) return rc;
      }
    }
    return null;
  }
  function underline(rect){
    var y  = rect.bottom + window.scrollY + 2;
    var x1 = rect.left + window.scrollX, x2 = rect.right + window.scrollX;
    var ln = svg("line", { "class":"cunder", x1:x1, y1:y, x2:x2, y2:y });
    var L = x2 - x1; ln.style.strokeDasharray = L; ln.style.strokeDashoffset = L;
    return ln;
  }
  function drawConcepts(){
    if (conceptIO){ conceptIO.disconnect(); conceptIO = null; }
    var about = document.querySelector("#about");
    if (!about) return;
    var g = svg("g", {}), any = false;
    CONCEPTS.forEach(function(c){
      var aRect = wordRect(document.querySelector(c.root), c.from);
      var card  = document.querySelector('.activity-card[onclick*="' + c.card + '"]');
      if (!aRect || !card) return;
      var tRect = wordRect(card, c.word) || card.getBoundingClientRect();
      var sx = aRect.left + window.scrollX + aRect.width / 2;
      var sy = aRect.bottom + window.scrollY + 2;
      var ex = tRect.left + window.scrollX + Math.min(tRect.width, 60) / 2;
      var ey = tRect.top + window.scrollY - 4;
      g.appendChild(underline(aRect));
      g.appendChild(underline(tRect));
      g.appendChild(svg("circle", { "class":"cdot", cx:sx, cy:sy, r:2.3 }));
      g.appendChild(svg("circle", { "class":"cdot", cx:ex, cy:ey, r:2.3 }));
      var ln = svg("line", { "class":"cwire", x1:sx, y1:sy, x2:ex, y2:ey });
      var L = Math.round(Math.sqrt((ex-sx)*(ex-sx) + (ey-sy)*(ey-sy)));
      ln.style.strokeDasharray = L; ln.style.strokeDashoffset = L;
      g.appendChild(ln);
      var lbl = svg("text", { "class":"clbl", x:(sx+ex)/2 + 8, y:(sy+ey)/2 });
      lbl.textContent = c.label;
      g.appendChild(lbl);
      any = true;
    });
    if (!any) return;
    els.svg.appendChild(g);
    about.__arConcepts = g;
    conceptIO = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting && e.target.__arConcepts)
          e.target.__arConcepts.classList.add("reveal");
      });
    }, { rootMargin:"-15% 0px -15% 0px" });
    conceptIO.observe(about);
  }

  function build(){
    els.svg = svg("svg", { "class":"ar-svg" });
    document.body.appendChild(els.svg);
    layout();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
  }

  function layout(){
    if (!els.svg) return;
    while (els.svg.firstChild) els.svg.removeChild(els.svg.firstChild);
    if (io) io.disconnect();

    var H = docHeight(), W = window.innerWidth;
    els.svg.setAttribute("height", H);
    els.svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    els.svg.style.height = H + "px";

    var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
    if (sections.length < 1) return;
    var rightX = W - GUT;

    // 1er passage : points de nœud (centre vertical du titre de chaque section)
    var data = sections.map(function(sec){
      var t = sec.querySelector(".section-title, h1, h2, .section-label") || sec;
      var tr = t.getBoundingClientRect();
      return {
        sec: sec, id: sec.id,
        nodeY: tr.top + window.scrollY + tr.height/2,
        leadStart: Math.min(tr.right + window.scrollX + 14, rightX - 40),
        rect: sec.getBoundingClientRect()
      };
    });

    io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting && en.target.__arGroup)
          en.target.__arGroup.classList.add("reveal");
      });
    }, { rootMargin:"-10% 0px -10% 0px" });

    data.forEach(function(d, i){
      var g = svg("g", {});
      var r = d.rect;
      var x0 = r.left + window.scrollX + INSET,
          y0 = r.top  + window.scrollY + INSET,
          x1 = r.right + window.scrollX - INSET,
          y1 = r.bottom + window.scrollY - INSET;
      // cadre : 4 équerres
      [corner(x0,y0,1,1), corner(x1,y0,-1,1),
       corner(x0,y1,1,-1), corner(x1,y1,-1,-1)].forEach(function(c){
        g.appendChild(c);
      });
      // lead horizontal du titre vers la marge droite
      var lead = svg("line", { "class":"lead",
        x1:d.leadStart, y1:d.nodeY, x2:rightX, y2:d.nodeY });
      g.appendChild(lead);
      // chaîne verticale reliant à la section précédente
      if (i > 0){
        var chain = svg("line", { "class":"chain",
          x1:rightX, y1:data[i-1].nodeY, x2:rightX, y2:d.nodeY });
        g.appendChild(chain);
      }
      // nœud (carré) + point + numéro
      g.appendChild(svg("rect", { "class":"nbox", x:rightX-4, y:d.nodeY-4, width:8, height:8 }));
      g.appendChild(svg("rect", { "class":"nbox fill", x:rightX-1.5, y:d.nodeY-1.5, width:3, height:3 }));
      var num = svg("text", { "class":"num", x:rightX-12, y:d.nodeY-9, "text-anchor":"end" });
      num.textContent = pad2(i+1) + " · " + d.id.toUpperCase();
      g.appendChild(num);

      els.svg.appendChild(g);
      // init dash (après insertion dans le DOM, pour getTotalLength)
      Array.prototype.forEach.call(g.querySelectorAll(".frame, .lead, .chain"), dash);
      d.sec.__arGroup = g;
      io.observe(d.sec);
    });

    drawConcepts();
  }

  var rt;
  function onResize(){ clearTimeout(rt); rt = setTimeout(layout, 180); }

  function enable(){ if (!on){ on = true; build(); } }
  function disable(){
    if (!on) return; on = false;
    window.removeEventListener("resize", onResize);
    window.removeEventListener("load", onResize);
    if (io){ io.disconnect(); io = null; }
    if (conceptIO){ conceptIO.disconnect(); conceptIO = null; }
    if (els.svg) els.svg.remove();
    els = {};
  }
  function sync(){
    (document.documentElement.getAttribute("data-theme") === "beton")
      ? enable() : disable();
  }

  new MutationObserver(sync).observe(document.documentElement,
    { attributes:true, attributeFilter:["data-theme"] });

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", sync);
  else sync();
})();
