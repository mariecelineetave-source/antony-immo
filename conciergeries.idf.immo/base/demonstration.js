/* conciergeries.idf.immo — jeu de données de démonstration.

   Tout ce fichier est FICTIF : sociétés, adresses, montants et dates sont
   inventés pour permettre de regarder les écrans avant que la base existe.
   Aucune donnée réelle, aucune donnée personnelle. Le dépôt est public.

   Les montants de commission sont cohérents avec la méthode du site :
   honoraires d'agence TTC → hors taxes → part nette de la conseillère
   (75 %) → 10 % pour la conciergerie. */
window.DEMONSTRATION = {

  // Ce que voit une conciergerie dans « Mon espace ».
  conciergerie: {
    societe: "Clefs de Seine",
    contact: "Claire Vasseur",
    fonction: "Gérante",
    ville: "Boulogne-Billancourt (92)"
  },

  opportunites: [
    { ref:"OPP-2026-4821", date:"2026-02-09", adresse:"12 rue Oberkampf", ville:"75011 Paris",
      mission:"Vente", statut:"versee", commission:1125, honoraires:"450 000 € à 4 %",
      note:"Commission réglée le 12 juin 2026." },

    { ref:"OPP-2026-5107", date:"2026-04-17", adresse:"8 avenue Victor-Hugo", ville:"92100 Boulogne-Billancourt",
      mission:"Vente", statut:"mandat", commission:1300, honoraires:"520 000 € à 4 %",
      note:"Mandat signé. Estimation indicative tant que l'acte n'est pas signé." },

    { ref:"OPP-2026-5233", date:"2026-05-22", adresse:"3 rue des Réservoirs", ville:"78000 Versailles",
      mission:"Expertise", statut:"conclue", commission:240, honoraires:"rapport à 3 840 € TTC",
      note:"Rapport remis et réglé. Facture d'apport d'affaires à établir." },

    { ref:"OPP-2026-5401", date:"2026-06-30", adresse:"27 rue de la Roquette", ville:"75011 Paris",
      mission:"Vente", statut:"encours", commission:null, honoraires:"",
      note:"Premier échange effectué avec le propriétaire." },

    { ref:"OPP-2026-5588", date:"2026-07-24", adresse:"14 rue Championnet", ville:"75018 Paris",
      mission:"Recherche", statut:"attente", commission:null, honoraires:"",
      note:"Qualifiée. Recherche d'un deuxième logement en petite couronne." },

    { ref:"OPP-2026-5602", date:"2026-08-04", adresse:"5 place du Marché", ville:"77300 Fontainebleau",
      mission:"Vente", statut:"close", commission:null, honoraires:"",
      note:"Sans suite : le propriétaire a renoncé à vendre cette année." },

    { ref:"OPP-2026-5744", date:"2026-08-27", adresse:"41 rue Gabriel-Péri", ville:"93400 Saint-Ouen",
      mission:"Vente", statut:"attente", commission:null, honoraires:"",
      note:"Reçue. Réponse attendue sous 24 heures." }
  ],

  // Ce que voit Marie-Céline dans le back-office : le même pipeline, mais
  // pour toutes les conciergeries du réseau.
  reseau: [
    { ref:"OPP-2026-5744", societe:"Clefs de Seine", ville:"93400 Saint-Ouen",
      mission:"Vente", statut:"attente", jours:4, commission:null },
    { ref:"OPP-2026-5761", societe:"Atelier Bagatelle", ville:"75015 Paris",
      mission:"Vente", statut:"attente", jours:2, commission:null },
    { ref:"OPP-2026-5588", societe:"Clefs de Seine", ville:"75018 Paris",
      mission:"Recherche", statut:"attente", jours:38, commission:null },
    { ref:"OPP-2026-5401", societe:"Clefs de Seine", ville:"75011 Paris",
      mission:"Vente", statut:"encours", jours:62, commission:null },
    { ref:"OPP-2026-5510", societe:"Maison Ourcq", ville:"93100 Montreuil",
      mission:"Vente", statut:"encours", jours:51, commission:null },
    { ref:"OPP-2026-5107", societe:"Clefs de Seine", ville:"92100 Boulogne-Billancourt",
      mission:"Vente", statut:"mandat", jours:136, commission:1300 },
    { ref:"OPP-2026-5044", societe:"Atelier Bagatelle", ville:"78000 Versailles",
      mission:"Vente", statut:"mandat", jours:151, commission:1080 },
    { ref:"OPP-2026-5233", societe:"Clefs de Seine", ville:"78000 Versailles",
      mission:"Expertise", statut:"conclue", jours:101, commission:240 },
    { ref:"OPP-2026-4930", societe:"Maison Ourcq", ville:"94300 Vincennes",
      mission:"Expertise", statut:"versee", jours:198, commission:185 },
    { ref:"OPP-2026-4821", societe:"Clefs de Seine", ville:"75011 Paris",
      mission:"Vente", statut:"versee", jours:203, commission:1125 },
    { ref:"OPP-2026-4788", societe:"Atelier Bagatelle", ville:"75017 Paris",
      mission:"Vente", statut:"versee", jours:214, commission:1406 },
    { ref:"OPP-2026-5602", societe:"Clefs de Seine", ville:"77300 Fontainebleau",
      mission:"Vente", statut:"close", jours:27, commission:null }
  ],

  conciergeries: [
    { societe:"Clefs de Seine",     ville:"Boulogne-Billancourt (92)", logements:64,  partagees:7, versees:1125 },
    { societe:"Atelier Bagatelle",  ville:"Paris 15e",                 logements:112, partagees:3, versees:1406 },
    { societe:"Maison Ourcq",       ville:"Montreuil (93)",            logements:38,  partagees:2, versees:185 }
  ]
};
