# gardiens.idf.immo — consignes pour les sessions automatisées

Site du **réseau des gardiens et gardiennes d'immeubles d'Île-de-France** de
Marie-Céline Etave. Un gardien partage l'opportunité d'un propriétaire qui
envisage de vendre ; si la vente se réalise, il reçoit **1 000 €**.

Membre de la famille `idf.immo` (voir antony.immo, cse.idf.immo,
associations.idf.immo, etudiants.idf.immo). **Chaque site est autonome : ne jamais
mélanger les contenus, ne jamais modifier un autre dépôt depuis celui-ci.**

## État du projet

Le **site public** est écrit et fonctionnel en statique. L'**espace personnel**
(comptes, statuts, primes) et le **back-office** sont décidés mais restent à
construire : ils exigent une base de données, ce que GitHub Pages ne fait pas.
Voir `ARCHITECTURE.md`, qui est le document de référence du produit.

En attendant, le formulaire de `partager.html` compose un message `mailto:` vers
`contact@idf.immo` — comme le reste de la famille, rien n'est stocké côté site.

## Le vocabulaire — règle absolue

**Le mot « signalement » ne doit apparaître nulle part** : ni dans les textes, ni
dans les URLs, ni dans les attributs `alt`, ni dans les noms de classes CSS, ni
dans les futurs noms de tables. On écrit toujours **« opportunité »** et
**« partager une opportunité »**.

Éviter tout ce qui évoque la dénonciation, la surveillance ou le contrôle. Le ton
est humain, direct, positif : le gardien est un acteur de proximité qui connaît
son immeuble, jamais un informateur.

Règle commune à la famille : **ne pas écrire « minimum » ni « sans minimum »** dans
le texte visible. La promesse se formule en positif.

## Les règles du programme (arbitrées le 13 août 2026)

Ces valeurs sont écrites en dur dans les pages. **Ne jamais les modifier sans
validation explicite de Marie-Céline** — et si l'une change, la changer partout :
`index.html`, `la-prime.html`, `conditions-de-la-prime.html`, `vos-questions.html`,
les 8 pages départementales et `ARCHITECTURE.md`.

| Règle | Valeur |
|---|---|
| Montant de la prime | **1 000 € nets forfaitaires**, par vente |
| Fait générateur | **Signature de l'acte authentique** — jamais le compromis ni le mandat |
| Prime intermédiaire au mandat | **Aucune** |
| Plafond annuel | **Aucun** (contrepartie : l'information fiscale, voir plus bas) |
| Délai de versement | **15 jours** |
| Validité d'une opportunité | **24 mois glissants**, relancés à chaque contact effectif |
| Deux gardiens, même bien | **Le premier enregistré** |
| Vente par un autre conseiller du réseau | **Prime due quand même** |
| Nom du gardien communiqué | **Jamais sans son accord**, opportunité par opportunité |
| Zone | **Île-de-France uniquement** (75, 77, 78, 91, 92, 93, 94, 95) |

**Le plafond ayant été supprimé, l'information fiscale n'est pas optionnelle.**
Elle doit rester visible sur `la-prime.html` et `vos-questions.html` : revenu
imposable, BNC non professionnels, formulaire 2042-C-PRO, et le fait qu'au-delà
d'un rythme régulier le gardien relève d'une activité indépendante à déclarer.
Ne pas la supprimer pour rendre le discours plus vendeur — c'est ce qui rend le
programme crédible.

## Structure

- `index.html` — accueil, 6 blocs. Un seul objectif : cliquer sur « Partager une
  opportunité ». **Aucun contenu SEO ici** ; les mots-clés vivent dans les pages
  de contenu et les pages départementales.
- `partager.html` — le formulaire en 3 écrans, CSS et JS inclus. La page la plus
  importante du site.
- `comment-ca-marche.html`, `la-prime.html`, `vos-questions.html`,
  `notre-engagement.html` — les pages de contenu.
- `conditions-de-la-prime.html` — le règlement du programme.
- `mentions-legales.html` — éditeur, hébergeur, RGPD.
- `ile-de-france/*.html` — 8 pages départementales (SEO local).
- `styles.css` — feuille commune. `site.js` — barre d'action mobile.
- `ARCHITECTURE.md` — le document produit : parcours, attribution des primes,
  cadre juridique, phasage, décisions arbitrées.
- `CNAME`, `robots.txt`, `sitemap.xml`.

## Palette

Le **bleu de la famille `.immo`**, défini dans `styles.css`.

**L'or (`--or`, `--or-clair`) est réservé à une seule chose : la prime de 1 000 €
et le statut « prime versée ».** Ne jamais l'utiliser ailleurs — c'est ce qui lui
donne sa valeur de récompense. Règle de contraste héritée de la famille : **l'or
ne passe en texte que sur fond sombre** ; sur fond clair, il ne sert qu'en aplat,
filet ou bordure.

Aucune image externe : tout est en **SVG inline** reprenant les variables de
couleur, donc un changement de palette fait suivre les dessins. Pas de photo de
famille, pas de poignée de main, pas de maison de banque d'images. La façade du
héros — une fenêtre allumée dans une trame de fenêtres éteintes — est le motif
signature : c'est l'opportunité que le gardien est seul à connaître.

## Contact — règle stricte

- **`contact@idf.immo` uniquement.** Jamais `contact@gardiens.idf.immo`, qui
  n'existe pas.
- **Téléphone : 06 60 98 92 92.**

## Règles de contenu

1. **Aucun chiffre ni référence juridique inventés.** Sans source vérifiée, on
   n'écrit rien.
2. **Ne jamais promettre un résultat.** On décrit la méthode, pas une garantie.
3. **Ne pas dissimuler le point fiscal ni la question de l'employeur.** Ces deux
   sujets sont traités franchement dans `vos-questions.html` et
   `notre-engagement.html` : c'est volontaire, ne pas les édulcorer.
4. **Ne jamais suggérer au gardien de cacher quoi que ce soit à son employeur.**
   Le gardien est salarié de la copropriété : c'est le risque principal du projet,
   et la transparence est la position tenue partout sur le site.
5. **Aucune donnée personnelle dans le dépôt** — il est public. Pas un nom de
   résidence réelle, pas un nom de copropriétaire, pas une coordonnée.
6. **Ne jamais contacter qui que ce soit.**
7. Avant tout commit : vérifier l'équilibre des balises HTML des pages modifiées
   (python `html.parser`) et la validité des blocs JSON-LD.
8. Quand le contenu d'une page publiée change, mettre son `<lastmod>` dans
   `sitemap.xml` à la date du jour (AAAA-MM-JJ).

## Publication

- **Toute modification attend la validation explicite de Marie-Céline
  (« publie »).** Aucune rubrique de ce site n'est en publication automatique.
- Mise en ligne : dépôt `mariecelineetave-source/gardiens-idf-immo`, branche
  `main`, racine, avec le `CNAME` et un enregistrement CNAME `gardiens` →
  `mariecelineetave-source.github.io.` chez Gandi. GitHub Pages n'acceptant qu'un
  domaine par dépôt, ce site ne peut pas être publié depuis `antony-immo`.

## Divers

- Tout en français. Commits clairs en français.
- Le proxy réseau bloque le fetch HTTP direct (curl/WebFetch) : utiliser WebSearch
  uniquement ; un échec curl ne signifie PAS que le site est en panne.
- Push : `git push -u origin <branche>` ; en cas d'erreur réseau, retenter jusqu'à
  4 fois (2, 4, 8, 16 s).

## Points à confirmer avec Marie-Céline

Volontairement absents du site tant qu'ils ne sont pas tranchés — ne rien inventer
en attendant.

- **Relecture juridique de la convention transposée.** Le modèle
  `convention-indicateur-affaires.md` d'etudiants.idf.immo est réutilisable, mais
  son **article 2 fonde le caractère occasionnel sur un plafond de 3 ventes par
  an**. Ce plafond ayant été supprimé ici, cet article doit être réécrit. C'est le
  point précis à soumettre au juriste.
- **Canal de notification** : SMS (coût et enregistrement d'expéditeur) ou e-mail ?
  Le site annonce aujourd'hui un accusé de réception par SMS.
- **Hébergement de la partie applicative** (espace personnel + back-office), qui ne
  peut pas vivre sur GitHub Pages.
