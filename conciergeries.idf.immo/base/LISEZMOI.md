# Le raccordement à la base

Ce dossier ne contient pas de base de données : il contient de quoi en
brancher une, le jour où le réseau « conciergeries » sera ouvert.

## En attendant : le mode démonstration

`config.js` est volontairement vide. Tant qu'il l'est :

- `mon-espace.html` et `back-office.html` affichent des **données fictives**,
  générées dans le navigateur par `demonstration.js` ;
- un **bandeau** le dit explicitement, sur les deux pages ;
- aucune requête n'est envoyée nulle part, et aucune donnée réelle n'existe.

C'est ce qui permet de regarder les écrans, de les corriger et de les valider
avant que quoi que ce soit ne soit branché.

## Pour raccorder, le jour venu

1. **Passer le correctif SQL** dans le projet Supabase de la famille (celui
   de gardiens, étudiants, associations et pros), depuis le dépôt
   `app-idf-immo`. Il doit :
   - ouvrir le réseau `conciergeries` ;
   - ajouter à la fiche partenaire les colonnes propres à ce site :
     `societe` (raison sociale), `fonction`, `siren` ;
   - ajouter à l'opportunité les colonnes `mission`
     (`vente` | `recherche` | `expertise`), `portefeuille` (booléen) et
     `reservations` ;
   - créer la vue `conciergeries` que `socle.js` interroge, avec les règles
     par ligne qui interdisent à un partenaire de voir autre chose que ses
     propres opportunités.
2. **Renseigner `config.js`** avec l'URL du projet et sa clé *publiable*,
   reprises du `config.js` d'un site déjà raccordé.

Le code de `socle.js` bascule alors tout seul : il n'y a rien d'autre à
changer dans les pages.

⚠️ Le chemin « base réelle » de `socle.js` n'a jamais pu être essayé, puisque
la vue n'existe pas encore. Il est écrit, commenté, et il devra être vérifié
au premier raccordement.
