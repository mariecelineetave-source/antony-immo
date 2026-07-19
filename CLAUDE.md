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
3. Dans les archives, les cartes n'ont pas la classe `reveal` (pas de JS sur
   cette page).
4. Contenu : uniquement des faits sourcés issus de recherches (WebSearch), avec
   lien source réel — jamais d'invention. Angle : ce que ça change pour un
   vendeur ou propriétaire à Antony. Priorité au juridique.
5. Avant tout commit : vérifier l'équilibre des balises HTML des deux fichiers
   (python `html.parser`).

## Publication

- La mise à jour de la rubrique Actu immo (`index.html` section `#actus` +
  `actualites.html`) et du dossier `veille/` est autorisée en publication
  automatique sur `main` par Marie-Céline.
- Toute autre modification (design, sections, textes) reste sur la branche de
  travail et attend sa validation explicite (« publie »).
- Sur `main`, ne jamais modifier autre chose que la section actus,
  `actualites.html` et `veille/` sans validation.

## Divers

- Tout en français. Commits clairs en français.
- Le proxy réseau bloque le fetch HTTP direct (curl/WebFetch) vers l'extérieur :
  utiliser WebSearch uniquement ; un échec curl ne signifie PAS que le site est
  en panne.
- Push : `git push -u origin <branche>` ; en cas d'erreur réseau, retenter
  jusqu'à 4 fois (2, 4, 8, 16 s).
- Ne jamais contacter qui que ce soit ; ne jamais collecter de coordonnées
  personnelles dans le dépôt.
