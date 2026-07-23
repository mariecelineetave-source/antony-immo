# antony.immo — consignes pour les sessions automatisées

Site vitrine de Marie-Céline Etave, conseillère immobilière indépendante à
Antony (92160). Hébergé sur GitHub Pages : la branche `main` est le site en
ligne (https://antony.immo). Branche de travail : `claude/anthony-imo-setup-dev-wzo4h1`.

## Structure

- `index.html` — page d'accueil (tout-en-un : CSS et JS inclus).
- `actualites.html` — archives de la rubrique « Actu immo », groupées par jour.
- `veille/journal.md` — journal quotidien de la veille vendeurs (jamais publié sur le site, mais le dépôt est public : ne jamais y mettre de données personnelles).
- `CNAME` — domaine personnalisé, ne pas toucher.

## Règles de la rubrique « Actu immo » (mise à jour quotidienne)

1. Les cartes visibles sur l'accueil sont entre `<!-- ACTUS:START -->` et
   `<!-- ACTUS:END -->` dans `index.html` : **6 cartes maximum**, la plus
   récente en premier. Mettre à jour la date entre `<!-- ACTUS:DATE -->` et
   `<!-- /ACTUS:DATE -->`.
2. **Historique complet dans `actualites.html`** : chaque carte ajoutée à
   l'accueil doit AUSSI être ajoutée dans la zone `<!-- ARCHIVE:START -->` /
   `<!-- ARCHIVE:END -->`, dans le groupe du jour (`<section class="jour">`
   avec `<h2>JJ mois AAAA</h2>` — créer le groupe du jour en premier s'il
   n'existe pas, les jours les plus récents en haut). **On ne supprime jamais
   rien des archives.** Les cartes qui sortent de l'accueil (au-delà de 6) sont
   simplement retirées de `index.html` : elles existent déjà dans les archives.
3. Dans les archives, les cartes n'ont pas la classe `reveal`, mais chaque
   `<article>` porte un **id unique et stable** au format
   `actu-AAAA-MM-JJ-sujet-court` : c'est l'ancre de partage permanente.
4. **Partage** : chaque carte (accueil ET archives) se termine, après le
   `<span class="chip">`, par un bouton
   `<button class="partage" type="button" data-url="actualites.html#ID">Partager</button>`
   où ID est l'id de la carte dans les archives. Le script de partage existe
   déjà sur les deux pages : il construit toujours l'URL absolue
   https://antony.immo/actualites.html#ID — le lien partagé est TOUJOURS celui
   d'antony.immo, jamais celui de la source.
5. Contenu : uniquement des faits sourcés issus de recherches (WebSearch), avec
   lien source réel — jamais d'invention. Angle : ce que ça change pour un
   vendeur ou propriétaire à Antony. Priorité au juridique.
6. Avant tout commit : vérifier l'équilibre des balises HTML des deux fichiers
   (python `html.parser`).

## Règles de l'estimateur en ligne (`estimation.html`, mise à jour quotidienne)

1. `estimation.html` est un estimateur instantané : le visiteur saisit son bien
   (type, **rue**, surface, état, étage, extérieur, DPE) et obtient une
   fourchette de prix calculée dans son navigateur. **Aucune donnée saisie n'est
   stockée** ; le contact se fait via un lien `mailto:` pré-rempli.
2. **Seule zone mise à jour automatiquement** : la grille de prix au m², entre
   `<!-- ESTIM:DATA:START -->` et `<!-- ESTIM:DATA:END -->` (un bloc JSON avec le
   champ `maj` = date). Le bloc contient `secteurs` (repli à l'échelle du
   quartier / de la ville) et `rues` (prix par rue quand une source publique le
   donne). `"a"` = prix appartement, `"m"` = prix maison, en €/m². **Ne jamais
   inventer un prix de rue** : si une rue n'est pas sourcée, on ne l'ajoute pas
   (le calcul retombe automatiquement sur le prix de la ville). Les modificateurs
   (état, étage, extérieur, DPE) sont de la **méthodologie fixe dans le JS** :
   ne jamais y toucher automatiquement.
3. **Données Antony uniquement** — ne pas ajouter Massy ni d'autres communes sur
   antony.immo, même si Marie-Céline y travaille.
4. Chiffres **uniquement sourcés**, jamais inventés. `"src":"publie"` = valeur
   publiée par une source (MeilleursAgents, SeLoger, efficity, PAP…) ;
   `"src":"derive"` = dérivée du prix tous biens du quartier ; `"src":"dvf"` =
   médiane des **ventes réelles** de la rue, calculée à partir de la base **DVF**
   officielle (fichiers `geo-dvf` de data.gouv.fr, années glissantes). Les rues
   (`rues`) sont issues de DVF ; on peut les recalculer en retéléchargeant les
   CSV `geo-dvf` de la commune 92002 et en prenant la médiane du prix/m² par rue
   (ventes « Vente » à une seule unité bâtie, seuils : ≥5 ventes appart., ≥4
   maison). Les prix bougent lentement : la plupart des jours, **rien à changer**
   — dans ce cas, ne rien committer. Ne changer `maj` que si un chiffre change.

## Publication

- La mise à jour de la rubrique Actu immo (`index.html` section `#actus` +
  `actualites.html`), de la grille de prix de `estimation.html` (bloc
  `ESTIM:DATA` uniquement) et du dossier `veille/` est autorisée en publication
  automatique sur `main` par Marie-Céline.
- Toute autre modification (design, sections, textes) reste sur la branche de
  travail et attend sa validation explicite (« publie »).
- Sur `main`, ne jamais modifier autre chose que la section actus,
  `actualites.html`, le bloc `ESTIM:DATA` de `estimation.html` et `veille/` sans
  validation.

## Divers

- Tout en français. Commits clairs en français.
- Le proxy réseau bloque le fetch HTTP direct (curl/WebFetch) vers l'extérieur :
  utiliser WebSearch uniquement ; un échec curl ne signifie PAS que le site est
  en panne.
- Push : `git push -u origin <branche>` ; en cas d'erreur réseau, retenter
  jusqu'à 4 fois (2, 4, 8, 16 s).
- Ne jamais contacter qui que ce soit ; ne jamais collecter de coordonnées
  personnelles dans le dépôt.
