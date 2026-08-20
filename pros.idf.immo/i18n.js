/* =====================================================================
   pros.idf.immo — moteur de traduction commun

   Chaque page reste écrite en français, dans un seul fichier, et se traduit
   à l'affichage selon ?lang=pt ou ?lang=en. C'est ce qui garantit qu'un
   montant ou un délai modifié une fois l'est dans les trois langues.

   Deux dictionnaires sont fusionnés :
     - window.DICO_COMMUN : en-tête, pied de page, bandeau final (dico-commun.js)
     - window.DICO        : le texte propre à la page (dico-<page>.js)
   Chaque entrée est un triplet [français, portugais, anglais].
   ===================================================================== */
(function () {
  "use strict";

  const brut = (new URLSearchParams(location.search).get("lang") || "fr").toLowerCase();
  const L = (brut === "pt" || brut === "en") ? brut : "fr";
  window.LANGUE = L;

  const PAGE = location.pathname.split("/").pop() || "index.html";

  window.LOCALE = L === "pt" ? "pt-PT" : (L === "en" ? "en-GB" : "fr-FR");

  function normalise(t) {
    return t.replace(/\s+/g, " ").trim();
  }

  // Le dictionnaire est construit tout de suite : les pages qui fabriquent du
  // texte en JavaScript (mon-espace) appellent window.T() bien après le
  // chargement, mais aussi parfois avant DOMContentLoaded.
  const col = (L === "pt") ? 1 : 2;
  const dico = Object.create(null);
  if (L !== "fr") {
    [window.DICO_COMMUN, window.DICO].forEach(function (src) {
      if (!src) return;
      src.forEach(function (t) { if (t && t[col]) dico[normalise(t[0])] = t[col]; });
    });
  }

  // Traduit une chaîne fabriquée en JavaScript ; rend le français si rien.
  window.T = function (fr) {
    const v = dico[normalise(String(fr))];
    return v === undefined ? fr : v;
  };

  // Un lien interne emmène le visiteur dans la langue qu'il a choisie.
  function traduireLien(href) {
    if (!href) return href;
    if (/^(https?:|mailto:|tel:|sms:|#)/i.test(href)) return href;
    // L'accueil traduit vit dans /pt/ et /en/ : chemin absolu, car les pages
    // de département sont dans un sous-dossier.
    if (href === "/" || href === "./" || href === "index.html" || href === "../") {
      return L === "fr" ? href : "/" + L + "/";
    }
    const m = href.match(/^([^?#]*\.html)(\?[^#]*)?(#.*)?$/);
    if (!m) return href;
    if (L === "fr") return m[1] + (m[3] || "");
    return m[1] + "?lang=" + L + (m[3] || "");
  }

  function barreDeLangues() {
    const barre = document.querySelector(".langues .conteneur");
    if (!barre) return;
    const liens = barre.querySelectorAll("a");
    ["", "pt", "en"].forEach(function (code, i) {
      const a = liens[i];
      if (!a) return;
      a.setAttribute("href", code ? PAGE + "?lang=" + code : PAGE);
      if (code === L || (!code && L === "fr")) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function appliquer() {
    barreDeLangues();

    document.querySelectorAll("a[href]").forEach(function (a) {
      if (a.closest(".langues")) return;
      const h = a.getAttribute("href");
      const n = traduireLien(h);
      if (n !== h) a.setAttribute("href", n);
    });

    if (L === "fr") return;

    document.documentElement.lang = L;

    // La page traduite est sa propre référence : sans cela, elle déclarerait
    // que l'original français fait foi, ce qui contredit les balises hreflang
    // et fait ignorer la traduction par les moteurs de recherche.
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon && canon.href.indexOf("lang=") === -1) {
      canon.href = canon.href.split("#")[0] + "?lang=" + L;
    }

    if (window.TITRE && window.TITRE[L]) document.title = window.TITRE[L];
    else if (dico[normalise(document.title)]) document.title = dico[normalise(document.title)];

    const marcheur = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const lot = [];
    let n;
    while ((n = marcheur.nextNode())) {
      if (!n.nodeValue.trim()) continue;
      const p = n.parentNode;
      if (p && p.closest && p.closest("script,style,.langues")) continue;
      // On garde les espaces de bord : le texte est souvent coupé par un <strong>.
      const m = n.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
      const v = dico[normalise(m[2])];
      if (v) lot.push([n, m[1] + v + m[3]]);
    }
    lot.forEach(function (e) { e[0].nodeValue = e[1]; });

    document.querySelectorAll("[placeholder]").forEach(function (el) {
      const v = dico[normalise(el.getAttribute("placeholder"))];
      if (v) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[aria-label]").forEach(function (el) {
      const v = dico[normalise(el.getAttribute("aria-label"))];
      if (v) el.setAttribute("aria-label", v);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", appliquer);
  else appliquer();
})();
