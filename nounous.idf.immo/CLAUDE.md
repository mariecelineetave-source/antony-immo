# nounous.idf.immo — consignes pour les sessions automatisées

Site du **réseau des nounous d'Île-de-France** de Marie-Céline Etave :
assistantes maternelles agréées, gardes d'enfants à domicile, auxiliaires
parentales, gardes partagées. Une nounou partage l'opportunité d'une famille
qui envisage de vendre ; si la vente se réalise, elle reçoit **1 000 €**.

Membre de la famille `idf.immo` (voir antony.immo, cse.idf.immo,
associations.idf.immo, etudiants.idf.immo, gardiens.idf.immo). **Chaque site est
autonome : ne jamais mélanger les contenus, ne jamais modifier un autre dépôt
depuis celui-ci.**

Le site reprend la mécanique de `gardiens.idf.immo` (même prime, même parcours,
même formulaire, même espace personnel) avec un **texte entièrement réécrit**
pour des prescriptrices nounous. Quand une règle change ici, vérifier si elle
doit changer là-bas aussi — mais **ne jamais copier un texte d'un site à
l'autre** : les deux publics n'ont pas les mêmes craintes.

## État du projet — ce qui reste à faire

1. **Le dépôt.** Le site vit pour l'instant dans le dossier `nounous.idf.immo/`
   du dépôt `antony-immo`, sur la branche de travail. Il doit être déplacé dans
   son propre dépôt `mariecelineetave-source/nounous-idf-immo`
   (GitHub Pages n'accepte qu'un domaine par dépôt : il ne peut pas être publié
   depuis `antony-immo`).
2. **Le DNS.** Enregistrement CNAME `nounous` → `mariecelineetave-source.github.io.`
   chez Gandi, puis GitHub Pages sur la branche `main`, racine, avec le `CNAME`.
3. **FormSubmit.** `partager.html` poste réellement vers
   `https://formsubmit.co/ajax/contact@idf.immo`. **Ce service exige une
   activation unique** : au tout premier envoi, FormSubmit adresse un courriel de
   confirmation à `contact@idf.immo` ; tant que le lien qu'il contient n'est pas
   cliqué, aucun message ne passe. Si le formulaire cesse de fonctionner,
   vérifier ce point en premier. (L'adresse étant déjà activée pour
   gardiens.idf.immo, il est possible que rien ne soit à faire.)
4. **Supabase.** `base/config.js` attend les deux valeurs publiques du projet
   Supabase `nounous-idf-immo` (Project URL + clé publiable). Tant qu'elles sont
   vides, `mon-espace.html` affiche un message d'attente au lieu de planter.
   Le schéma est dans `base/schema.sql`, à coller dans le SQL Editor ; la marche
   à suivre est dans `base/installer.html`.

## ⚠️ À FAIRE AVANT D'OUVRIR LE RÉSEAU À DE VRAIES NOUNOUS

**Brancher un vrai expéditeur d'e-mails.** L'envoi inclus dans Supabase est bridé
à quelques messages par heure et n'est pas prévu pour un service réel. En l'état,
la troisième nounou qui demande un lien de connexion dans la même heure ne
recevra rien — et elle n'aura aucun moyen de comprendre pourquoi.

Ce qu'il faut faire : Supabase → Project Settings → Authentication → SMTP
Settings → activer « Custom SMTP » avec un fournisseur réel (**Brevo** est le
candidat naturel : français, gratuit jusqu'à 300 messages par jour).

Tant que ce n'est pas fait, le site ne doit pas être diffusé : ni QR code, ni
affiche au relais petite enfance, ni annonce dans les groupes de nounous.
**Le rappeler à chaque fois qu'il est question de diffusion, d'affiche, de QR
code ou de lancement.**

## Le vocabulaire — règles absolues

**Le mot « signalement » ne doit apparaître nulle part** : ni dans les textes, ni
dans les URLs, ni dans les attributs `alt`, ni dans les noms de classes CSS, ni
dans les noms de tables. On écrit toujours **« opportunité »** et **« partager
une opportunité »**. Éviter tout ce qui évoque la dénonciation, la surveillance
ou le contrôle.

Règle commune à la famille : **ne pas écrire « minimum » ni « sans minimum »**
dans le texte visible. La promesse se formule en positif.

Propre à ce site :

- On dit **« la famille »**, jamais « le propriétaire » ni « le client ».
- On dit **« nounou »** dans le langage courant, et on nomme les vrais statuts
  quand c'est utile : *assistante maternelle agréée*, *garde d'enfants à
  domicile*, *auxiliaire parentale*, *garde partagée*.
- Le féminin est la forme par défaut (« vous êtes prévenue », « la première »),
  parce que c'est un métier très majoritairement féminin — mais rien n'exclut
  quiconque : `conditions-de-la-prime.html` reste au masculin juridique
  (« le participant »).

## Les règles du programme

Ces valeurs sont écrites en dur dans les pages. **Ne jamais les modifier sans
validation explicite de Marie-Céline** — et si l'une change, la changer partout :
`index.html`, `la-prime.html`, `conditions-de-la-prime.html`,
`vos-questions.html`, `comment-ca-marche.html`, `partager.html` (texte de
confirmation) et les 8 pages départementales.

| Règle | Valeur |
|---|---|
| Montant de la prime | **1 000 € nets forfaitaires**, par vente |
| Fait générateur | **Signature de l'acte authentique** — jamais le compromis ni le mandat |
| Prime intermédiaire au mandat | **Aucune** |
| Plafond annuel | **Aucun** (contrepartie : l'information fiscale, voir plus bas) |
| Délai de versement | **15 jours** |
| Validité d'une opportunité | **24 mois glissants**, relancés à chaque contact effectif |
| Deux nounous, même bien | **La première enregistrée** |
| Vente par un autre conseiller du réseau | **Prime due quand même** |
| Nom de la nounou communiqué | **Jamais sans son accord**, opportunité par opportunité |
| Zone | **Île-de-France uniquement** (75, 77, 78, 91, 92, 93, 94, 95) |
| Canal de suivi | **E-mail** — l'adresse est donc obligatoire dans le formulaire |

**Le plafond étant absent, l'information fiscale n'est pas optionnelle.** Elle
doit rester visible sur `la-prime.html` et `vos-questions.html` : revenu
imposable, BNC non professionnels, formulaire 2042-C-PRO, absence de lien avec
Pajemploi, et le fait qu'au-delà d'un rythme régulier la nounou relève d'une
activité indépendante à déclarer. Ne pas la supprimer pour rendre le discours
plus vendeur — c'est ce qui rend le programme crédible.

## Le point sensible de ce site : la famille est l'employeur

C'est la différence de fond avec gardiens.idf.immo. La famille dont on parle est
très souvent **celle qui emploie la nounou**. Trois règles en découlent, et elles
ne se négocient pas :

1. **Rien dans le dos de la famille.** Son accord préalable est demandé avant
   toute transmission de coordonnées, et c'est une condition de la prime.
2. **Ne jamais suggérer à une nounou de dissimuler quoi que ce soit à ses
   employeurs.** C'est le risque principal du projet ; la transparence est la
   position tenue partout sur le site.
3. **Ne jamais demander d'information sur les enfants.** Ni âge, ni école, ni
   santé, ni rien. Le site l'écrit noir sur blanc (`notre-engagement.html`,
   article 4 des conditions) : ne pas l'affaiblir.

Ajouter, chaque fois que c'est utile, la porte de sortie : *si vous sentez que
le sujet est délicat, ne partagez pas — aucune prime ne vaut votre tranquillité
au travail.*

## Structure

- `index.html` — accueil. Un seul objectif : cliquer sur « Partager une
  opportunité ». La section « Ces phrases-là, vous les entendez tout le temps »
  est le cœur du site : c'est elle qui fait comprendre à une nounou qu'elle
  détient déjà l'information.
- `partager.html` — le formulaire en 3 écrans, CSS et JS inclus. La page la plus
  importante du site.
- `comment-ca-marche.html`, `la-prime.html`, `vos-questions.html`,
  `notre-engagement.html` — les pages de contenu.
- `conditions-de-la-prime.html` — le règlement du programme.
- `mentions-legales.html` — éditeur, hébergeur, RGPD.
- `contact.html` — téléphone, SMS, courriel.
- `mon-espace.html` + `base/` — l'espace personnel (Supabase).
- `ile-de-france/*.html` — 8 pages départementales (SEO local).
- `styles.css` — feuille commune. `site.js` — barre d'action mobile.
- `CNAME`, `robots.txt`, `sitemap.xml`.

**Pas de multilingue sur ce site**, contrairement à gardiens.idf.immo. Si le
besoin apparaît, reprendre le moteur `i18n.js` + `dico-*.js` de gardiens plutôt
que de dupliquer des pages.

## Palette et dessin

Le **bleu de la famille `.immo`**, défini dans `styles.css`.

**L'or (`--or`, `--or-clair`) est réservé à une seule chose : la prime de 1 000 €
et le statut « prime versée ».** Ne jamais l'utiliser ailleurs. Règle de
contraste héritée de la famille : **l'or ne passe en texte que sur fond sombre** ;
sur fond clair, il ne sert qu'en aplat, filet ou bordure.

Aucune image externe : tout est en **SVG inline** reprenant les variables de
couleur. Le motif signature du héros — **une maison en cubes d'enfant, un cube
allumé, un cube qui manque en haut** — dit les deux choses à la fois :
l'opportunité que la nounou est seule à connaître, et la place qui commence à
manquer à la famille. Pas de photo de famille, pas de poussette, pas de maison
de banque d'images.

## Contact — règle stricte

- **`contact@idf.immo` uniquement.** Jamais `contact@nounous.idf.immo`, qui
  n'existe pas.
- **Téléphone : 06 60 98 92 92.**

## Règles de contenu

1. **Aucun chiffre ni référence juridique inventés.** Sans source vérifiée, on
   n'écrit rien. Les chiffres du marché, les statistiques de la petite enfance,
   les taux : rien de tout cela n'a sa place sur le site sans source.
2. **Ne jamais promettre un résultat.** On décrit la méthode, pas une garantie.
3. **Ne pas édulcorer le point fiscal ni la question de l'employeur.** Ces deux
   sujets sont traités franchement dans `vos-questions.html` et
   `notre-engagement.html` : c'est volontaire.
4. **Aucune donnée personnelle dans le dépôt** — il est public. Pas un nom de
   famille réelle, pas une adresse, pas une coordonnée.
5. **Ne jamais contacter qui que ce soit.**
6. Avant tout commit : vérifier l'équilibre des balises HTML des pages modifiées
   (python `html.parser`), la validité des blocs JSON-LD et les liens internes.
7. Quand le contenu d'une page publiée change, mettre son `<lastmod>` dans
   `sitemap.xml` à la date du jour (AAAA-MM-JJ).

## Publication

- **Toute modification attend la validation explicite de Marie-Céline
  (« publie »).** Aucune rubrique de ce site n'est en publication automatique.

## Divers

- Tout en français. Commits clairs en français.
- Le proxy réseau bloque le fetch HTTP direct (curl/WebFetch) : utiliser
  WebSearch uniquement ; un échec curl ne signifie PAS que le site est en panne.
- Push : `git push -u origin <branche>` ; en cas d'erreur réseau, retenter
  jusqu'à 4 fois (2, 4, 8, 16 s).

## Points à confirmer avec Marie-Céline

Volontairement absents du site tant qu'ils ne sont pas tranchés — ne rien
inventer en attendant.

- **Relecture juridique de la convention d'indicateur d'affaires.** Le modèle
  `convention-indicateur-affaires.md` d'etudiants.idf.immo est réutilisable, mais
  son article 2 fonde le caractère occasionnel sur un plafond de 3 ventes par an,
  plafond qui n'existe pas ici : cet article doit être réécrit.
- **L'accord de BSK Immobilier** sur le principe des apporteurs d'affaires.
- **Le cas de la nounou salariée d'une entreprise de garde d'enfants** (et non
  d'un particulier employeur) : sa clause de loyauté peut être plus stricte. Le
  site ne dit rien de ce cas pour l'instant.
