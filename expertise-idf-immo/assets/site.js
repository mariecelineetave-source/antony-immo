/* ==========================================================================
   expertise.idf.immo — script unique, sans dépendance
   --------------------------------------------------------------------------
   Quatre rôles seulement : le menu mobile, le sous-menu « Vos situations »,
   la révélation au défilement et l'envoi du formulaire par la messagerie du
   visiteur. Aucune donnée n'est transmise ni stockée par le site.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Menu principal (mobile) ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var ouvert = menu.classList.toggle("ouvert");
      burger.setAttribute("aria-expanded", ouvert ? "true" : "false");
      burger.textContent = ouvert ? "Fermer" : "Menu";
      // La barre d'action du bas ferait doublon et masquerait les derniers liens.
      document.body.classList.toggle("menu-ouvert", ouvert);
    });
  }

  /* ---------- Sous-menu « Vos situations » ----------
     Ouverture au clic, au toucher comme au clavier : un seul comportement
     partout. L'ouverture au survol a été écartée volontairement — elle entre en
     conflit avec le clic (le survol ouvre, le clic referme aussitôt) et laisse
     l'utilisateur au tactile sans repère.                                     */
  var sous = document.querySelectorAll(".sous");
  Array.prototype.forEach.call(sous, function (bloc) {
    var bouton = bloc.querySelector("button");
    if (!bouton) return;

    function bascule(etat) {
      bloc.setAttribute("data-ouvert", etat ? "oui" : "non");
      bouton.setAttribute("aria-expanded", etat ? "true" : "false");
    }

    bouton.addEventListener("click", function (e) {
      e.stopPropagation();
      bascule(bloc.getAttribute("data-ouvert") !== "oui");
    });

    bloc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { bascule(false); bouton.focus(); }
    });

    bloc.addEventListener("focusout", function (e) {
      if (!bloc.contains(e.relatedTarget)) bascule(false);
    });

    document.addEventListener("click", function (e) {
      if (!bloc.contains(e.target)) bascule(false);
    });
  });

  /* ---------- Révélation au défilement ---------- */
  var aReveler = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    Array.prototype.forEach.call(aReveler, function (el) { el.classList.add("visible"); });
  } else {
    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add("visible");
          observateur.unobserve(entree.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    Array.prototype.forEach.call(aReveler, function (el) { observateur.observe(el); });
  }

  /* ---------- Année du pied de page ---------- */
  var annee = document.getElementById("annee");
  if (annee) annee.textContent = new Date().getFullYear();

  /* ---------- Formulaire → messagerie du visiteur ----------
     Le site n'a pas de serveur : la demande part de la boîte du visiteur.
     Rien n'est enregistré ici, ce que la page de confidentialité explique.  */
  var formulaire = document.getElementById("form-expertise");
  if (formulaire) {
    formulaire.addEventListener("submit", function (e) {
      e.preventDefault();
      var champ = function (id) {
        var el = document.getElementById(id);
        if (!el) return "";
        if (el.type === "checkbox") return el.checked ? "Oui" : "Non";
        return el.value.trim();
      };
      var destinataire = formulaire.getAttribute("data-destinataire");
      var sujet = "Demande d’expertise en valeur vénale — " + (champ("motif") || "Île-de-France");
      var corps = [
        "Vous êtes : " + champ("qualite"),
        "Nom : " + champ("nom"),
        "Prénom : " + champ("prenom"),
        "E-mail : " + champ("email"),
        "Téléphone : " + (champ("tel") || "—"),
        "",
        "Motif : " + champ("motif"),
        "Adresse ou commune du bien : " + (champ("commune") || "—"),
        "Type de bien : " + champ("type"),
        "",
        "Situation / demande :",
        champ("message") || "—",
        "",
        "Rapport-modèle anonymisé souhaité : " + champ("modele")
      ].join("\n");

      window.location.href = "mailto:" + destinataire +
        "?subject=" + encodeURIComponent(sujet) +
        "&body=" + encodeURIComponent(corps);
    });
  }
})();
