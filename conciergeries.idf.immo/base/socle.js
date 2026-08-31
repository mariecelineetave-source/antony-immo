/* conciergeries.idf.immo — d'où viennent les données des espaces connectés.

   Deux modes, choisis tout seuls selon base/config.js :

   • config.js VIDE → mode « démonstration ». Les écrans lisent
     window.DEMONSTRATION, un jeu de données fictives, et affichent un
     bandeau qui le dit. Aucune requête n'est envoyée.

   • config.js RENSEIGNÉ → mode « base ». Les écrans interrogent la vue
     « conciergeries » du socle commun de la famille idf.immo, en lecture,
     avec la clé publiable. Ce sont les règles par ligne de la base qui
     décident de ce qu'un partenaire a le droit de voir : le navigateur ne
     protège rien, et n'a pas à le faire.

   ⚠️ Le chemin « base » n'a jamais pu être essayé : la vue n'existe pas
   encore (voir base/LISEZMOI.md). Il devra être vérifié au premier
   raccordement. */
(function () {
  "use strict";

  var cfg = window.CONFIG_BASE || {};
  var raccorde = !!(cfg.url && cfg.cle);

  function demonstration() {
    var d = window.DEMONSTRATION || {};
    return Promise.resolve({
      mode: "demonstration",
      conciergerie: d.conciergerie || null,
      opportunites: d.opportunites || [],
      reseau: d.reseau || [],
      conciergeries: d.conciergeries || []
    });
  }

  function depuisLaBase(vue) {
    var url = cfg.url.replace(/\/+$/, "") + "/rest/v1/" + vue + "?select=*";
    return fetch(url, {
      headers: {
        "apikey": cfg.cle,
        "Authorization": "Bearer " + cfg.cle,
        "Accept": "application/json"
      }
    }).then(function (r) {
      if (!r.ok) throw new Error("la base a répondu " + r.status);
      return r.json();
    });
  }

  window.Socle = {
    raccorde: raccorde,

    /* Renvoie une promesse : { mode, conciergerie, opportunites, reseau,
       conciergeries }. En cas d'échec de la base, on ne laisse pas l'écran
       vide sans explication : on renvoie le mode « panne », à charge de la
       page de le dire. */
    charger: function () {
      if (!raccorde) return demonstration();
      return Promise.all([
        depuisLaBase("conciergeries_opportunites"),
        depuisLaBase("conciergeries_partenaires")
      ]).then(function (res) {
        return {
          mode: "base",
          conciergerie: (res[1] && res[1][0]) || null,
          opportunites: res[0] || [],
          reseau: res[0] || [],
          conciergeries: res[1] || []
        };
      }).catch(function (e) {
        return { mode: "panne", erreur: e.message, conciergerie: null,
                 opportunites: [], reseau: [], conciergeries: [] };
      });
    },

    /* Les libellés de statut, communs aux deux écrans. */
    STATUTS: {
      attente: "À qualifier",
      encours: "Contact en cours",
      mandat:  "Mission engagée",
      conclue: "Conclue — à facturer",
      versee:  "Commission versée",
      close:   "Sans suite"
    },

    euros: function (n) {
      if (n === null || n === undefined || n === "") return "—";
      return Math.round(n).toLocaleString("fr-FR") + " €";
    },

    jour: function (iso) {
      if (!iso) return "—";
      var d = new Date(iso);
      if (isNaN(d)) return iso;
      return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    }
  };
})();
