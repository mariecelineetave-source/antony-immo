/* =====================================================================
   nounous.idf.immo — coordonnées de la base

   Ces deux valeurs sont PUBLIQUES par conception : elles voyagent dans le
   navigateur de chaque visiteuse, et Supabase les qualifie lui-même de
   « safe to use in a browser ». Les voir ne donne accès à rien.

   Ce qui protège réellement les données, ce sont les règles installées par
   base/schema.sql : la base refuse de servir à une nounou autre chose que
   ses propres opportunités, quelle que soit la requête qu'on lui adresse.

   La clé « secrète » (sb_secret_…), elle, n'a jamais sa place dans ce dépôt
   ni dans aucun fichier du site.

   ⚠️ À RENSEIGNER : les deux valeurs du projet Supabase « nounous-idf-immo ».
   Supabase → le projet → Project Settings → API :
     url = « Project URL »
     cle = la clé publiable (sb_publishable_… , anciennement « anon key »)
   Tant qu'elles sont vides, la page « Mon espace » affiche un message
   d'attente au lieu de planter.
   ===================================================================== */

window.CONFIG_BASE = {
  url: "",
  cle: ""
};
