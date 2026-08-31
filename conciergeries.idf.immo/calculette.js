/* conciergeries.idf.immo — la calculette de la commission.

   Chaîne de calcul, identique à celle d'associations.idf.immo :
   honoraires d'agence TTC → hors taxes → part nette qui revient réellement
   à Marie-Céline après son réseau mandant → 10 % pour la conciergerie.

   Les 10 % portent sur les honoraires NETS HORS TAXES. Le montant affiché
   est donc hors taxes : la TVA s'ajoute sur la facture de la conciergerie
   si celle-ci y est assujettie.

   Tout est calculé dans le navigateur. Rien n'est envoyé, rien n'est stocké. */
(function () {
  "use strict";

  var PART_CONCIERGERIE = 0.10;  // la part reversée à la conciergerie
  var TVA = 1.20;                // TVA appliquée aux honoraires d'agence

  var prix = document.getElementById("prix");
  var taux = document.getElementById("taux");
  var part = document.getElementById("part");
  var ops  = document.getElementById("ops");
  if (!prix || !taux || !part || !ops) return;

  var eur = function (n) {
    return Math.round(n).toLocaleString("fr-FR") + " €";
  };

  function maj() {
    var p = Number(prix.value);
    var t = Number(taux.value);
    var q = Number(part.value);
    var n = Number(ops.value);

    var ttc = p * t / 100;              // honoraires d'agence, TTC
    var net = (ttc / TVA) * q / 100;    // ce que perçoit réellement la conseillère, HT
    var com = net * PART_CONCIERGERIE;  // la commission de la conciergerie, HT

    document.getElementById("prix-val").textContent = eur(p);
    document.getElementById("part-val").textContent = q + " %";
    document.getElementById("ops-val").textContent  = n;

    document.getElementById("out-ttc").textContent   = eur(ttc);
    document.getElementById("out-net").textContent   = eur(net);
    document.getElementById("out-com").textContent   = eur(com);
    document.getElementById("out-annee").textContent = eur(com * n);
  }

  prix.addEventListener("input", maj);
  taux.addEventListener("change", maj);
  part.addEventListener("input", maj);
  ops.addEventListener("input", maj);
  maj();
})();
