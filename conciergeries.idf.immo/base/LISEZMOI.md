# Le raccordement à la base

Ce dossier contient de quoi brancher le site sur la base commune de la
famille `idf.immo` — celle de gardiens, nounous, étudiants, associations et
pros, pilotée depuis `app.idf.immo` (dépôt `app-idf-immo`). **On ne crée
jamais un second projet Supabase** : Marie-Céline doit voir tous ses réseaux
au même endroit.

## En attendant : le mode démonstration

`config.js` est volontairement vide. Tant qu'il l'est :

- `mon-espace.html` et `back-office.html` affichent des **données fictives**,
  générées dans le navigateur par `demonstration.js` ;
- un **bandeau** le dit explicitement, sur les deux pages ;
- aucune requête n'est envoyée nulle part.

## Le raccordement, en deux gestes

### 1. Passer les deux scripts SQL, dans cet ordre

Dans Supabase : le projet → **SQL Editor** → **New query** → coller → **Run**.

| Ordre | Fichier | Ce qu'il fait |
|---|---|---|
| 1 | `correctif-3a-enum.sql` | Ajoute la catégorie « conciergerie ». **À passer seul** : PostgreSQL refuse qu'une valeur d'énumération serve dans la transaction même qui l'ajoute. |
| 2 | `correctif-3.sql` | Ouvre le réseau, ajoute le SIREN, crée la vue `conciergeries`, enregistre la règle des 10 %. |

Les deux sont **rejouables** : les relancer ne casse rien.

### 2. Renseigner `config.js`

Y recopier l'URL du projet et sa clé **publiable** (`sb_publishable_…`),
reprises du `config.js` d'un site déjà raccordé. `socle.js` bascule alors
tout seul : il n'y a rien d'autre à changer dans les pages.

## Ce qui a été vérifié, et comment

Les deux scripts ont été **exécutés pour de vrai**, sur un PostgreSQL 16
monté pour l'occasion, sur une reconstitution de l'état d'arrivée du socle
(le type `categorie_prescripteur`, les tables `reseaux`, `prescripteurs` et
`regles_remuneration`, la fonction `vue_prescripteur_insertion`, reprises
mot pour mot de `socle.sql` et `correctif-1.sql`).

Ce qui a été constaté :

- **une erreur, trouvée et corrigée** : les deux règles de rémunération
  étant en pourcentage, la colonne « montant » de la liste ne contenait que
  des `NULL`, et PostgreSQL lui donnait le type texte, qui se heurtait à la
  colonne `integer` de la table. Sans le `null::integer` ajouté, le script
  s'arrêtait sur une erreur ;
- le garde-fou fonctionne : lancer `correctif-3.sql` sans avoir passé
  `correctif-3a-enum.sql` affiche le message qui dit quoi faire, et rien
  n'est modifié ;
- le script est bien rejouable : trois passages de suite, aucune erreur,
  aucun doublon dans les règles ;
- une conciergerie peut créer sa fiche par la vue, puis la compléter
  (raison sociale, fonction, SIREN) ;
- la fiche est rangée dans la catégorie `conciergerie` et n'apparaît dans
  aucun autre réseau ;
- la règle lue à la signature est bien **10 % des honoraires nets, sans
  plafond**.

⚠️ **Ce qui n'a pas pu être vérifié** : le chemin « base réelle » de
`socle.js`, c'est-à-dire l'appel HTTP à Supabase depuis le navigateur. Le
proxy réseau des sessions Claude bloque `supabase.co`. Les noms de tables
sont ceux du socle, relevés dans son SQL, mais l'aller-retour complet devra
être regardé au premier raccordement.

## Ce qui reste à faire côté back-office

`correctif-3.sql` ajoute la colonne **`siren`** à la fiche du prescripteur —
elle sert à la facture d'apport d'affaires, puisqu'ici le partenaire est une
société. Le back-office `app.idf.immo` **ne l'affiche pas encore** : c'est
une ligne à ajouter dans le dépôt `app-idf-immo`, séparément.

En revanche, il affiche déjà l'**organisation** et le **rôle**, qui portent
la raison sociale de la conciergerie et la fonction de la personne. C'est
pourquoi ce correctif ne crée pas de colonnes en double : le socle avait
déjà ce qu'il fallait.
