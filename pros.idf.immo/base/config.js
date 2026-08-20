/* =====================================================================
   pros.idf.immo — coordonnées de la base

   Ces deux valeurs sont PUBLIQUES par conception : elles voyagent dans le
   navigateur de chaque visiteur, et Supabase les qualifie lui-même de
   « safe to use in a browser ». Les voir ne donne accès à rien.

   Ce qui protège réellement les données, ce sont les règles installées par
   base/schema.sql : la base refuse de servir à un professionnel autre chose
   que ses propres opportunités, quelle que soit la requête qu'on lui adresse.

   La clé « secrète » (sb_secret_…), elle, n'a jamais sa place dans ce dépôt
   ni dans aucun fichier du site.

   ⚠️ TANT QUE CES DEUX VALEURS SONT VIDES, l'espace personnel n'est pas
   ouvert : mon-espace.html l'annonce au visiteur au lieu de tomber en panne.
   Pour l'ouvrir : créer un projet Supabase propre à pros.idf.immo (ne jamais
   réutiliser celui de gardiens.idf.immo, les deux réseaux ne se mélangent
   pas), y passer base/schema.sql, puis reporter ici l'URL du projet et la
   clé publiable. base/installer.html décrit la manœuvre pas à pas.
   ===================================================================== */

window.CONFIG_BASE = {
  url: "",
  cle: ""
};
