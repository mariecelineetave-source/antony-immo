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

   Les noms de tables sont ceux du socle, relevés dans son SQL et vérifiés
   sur une base PostgreSQL 16 montée pour l'occasion : la vue
   « conciergeries » est créée par base/correctif-3.sql.

   ⚠️ Le chemin « base » lui-même n'a pas pu être essayé de bout en bout :
   le proxy réseau des sessions Claude bloque Supabase. À vérifier au
   premier raccordement réel. */
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

  /* Une lecture dans le socle commun, par l'API REST de Supabase.
     Les noms ci-dessous sont ceux du socle, vérifiés dans son SQL :
     la vue « conciergeries » porte la fiche du partenaire, et les
     opportunités, primes et événements sont communs à tous les réseaux.
     Ce sont les règles par ligne de la base qui décident de ce que chacun
     a le droit de voir : le navigateur ne protège rien. */
  function depuisLaBase(table, requete) {
    var url = cfg.url.replace(/\/+$/, "") + "/rest/v1/" + table + "?" + (requete || "select=*");
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
        depuisLaBase("conciergeries", "select=*"),
        depuisLaBase("opportunites", "select=*&order=cree_le.desc"),
        depuisLaBase("primes", "select=*")
      ]).then(function (res) {
        return {
          mode: "base",
          conciergerie: (res[0] && res[0][0]) || null,
          opportunites: res[1] || [],
          primes: res[2] || [],
          reseau: res[1] || [],
          conciergeries: res[0] || []
        };
      }).catch(function (e) {
        return { mode: "panne", erreur: e.message, conciergerie: null,
                 opportunites: [], primes: [], reseau: [], conciergeries: [] };
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
