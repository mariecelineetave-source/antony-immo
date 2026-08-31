/* =====================================================================
   conciergeries.idf.immo — coordonnées de la base

   VOLONTAIREMENT VIDE POUR L'INSTANT.

   Tant que ces deux valeurs sont vides, « Mon espace » et le back-office
   fonctionnent en MODE DÉMONSTRATION : ils affichent des données fictives,
   signalées par un bandeau, et n'interrogent aucun serveur. C'est ce qui
   permet de voir et de valider les écrans avant que la base existe.

   La base n'appartiendra pas à ce site : ce sera celle de toute la famille
   idf.immo, la même que gardiens, étudiants, associations et pros, pilotée
   depuis app.idf.immo (dépôt app-idf-immo). On ne crée JAMAIS un second
   projet Supabase pour un site de la famille : Marie-Céline doit voir tous
   les réseaux au même endroit.

   Pour raccorder ce site, deux choses, dans cet ordre :
     1. passer le correctif SQL décrit dans base/LISEZMOI.md dans le projet
        Supabase de la famille (il ouvre le réseau « conciergeries » et crée
        la vue que ces écrans interrogent) ;
     2. renseigner ci-dessous l'URL du projet et sa clé PUBLIABLE
        (sb_publishable_…), reprises de base/config.js d'un site déjà
        raccordé.

   Ces deux valeurs sont PUBLIQUES par conception : elles voyagent dans le
   navigateur de chaque visiteur, et Supabase les qualifie lui-même de
   « safe to use in a browser ». Les voir ne donne accès à rien. Ce qui
   protège les données, ce sont les règles par ligne du socle : la base
   refuse de servir à un partenaire autre chose que ses propres
   opportunités, quelle que soit la requête.

   La clé secrète (sb_secret_…) n'a sa place ni ici ni dans aucun fichier.
   ===================================================================== */

window.CONFIG_BASE = {
  url: "",
  cle: ""
};
