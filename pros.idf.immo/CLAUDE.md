# pros.idf.immo — consignes pour les sessions automatisées

Site du **réseau des commerçants, artisans et professionnels de proximité
d'Île-de-France** de Marie-Céline Etave. Un professionnel partage l'opportunité
d'un client qui envisage de vendre ; si la vente se réalise, il reçoit
**1 000 €**.

Site jumeau de **gardiens.idf.immo** : même mécanique, même prime, mêmes règles.
Membre de la famille `idf.immo` (voir antony.immo, gardiens.idf.immo,
cse.idf.immo, associations.idf.immo, etudiants.idf.immo). **Chaque site est
autonome : ne jamais mélanger les contenus, ne jamais modifier un autre dépôt
depuis celui-ci.**

## État du projet

Le **site public** est écrit et fonctionnel en statique. L'**espace personnel**
(comptes, statuts, primes) et le **back-office** restent à construire : ils
exigent une base de données, ce que GitHub Pages ne fait pas. `base/config.js`
est volontairement vide ; tant qu'il l'est, `mon-espace.html` annonce que
l'espace n'est pas encore ouvert au lieu de tomber en panne.

Le formulaire de `partager.html` **poste réellement** vers
`https://formsubmit.co/ajax/contact@idf.immo` : Marie-Céline reçoit
l'opportunité par courriel, et le professionnel reçoit immédiatement un accusé
de réception grâce au champ `_autoresponse`. Rien n'est stocké côté site.

**Ce service exige une activation unique par adresse destinataire** : au tout
premier envoi, FormSubmit adresse un courriel de confirmation à
`contact@idf.immo`. Elle a déjà été faite pour gardiens.idf.immo ; si le
formulaire ne part pas, c'est le premier point à vérifier.

`mentions-legales.html` mentionne ce prestataire : si l'acheminement change, la
page doit changer avec.

## ⚠️ À FAIRE AVANT D'OUVRIR LE RÉSEAU

**Publier le site dans son propre dépôt.** Il vit pour l'instant dans le dossier
`pros.idf.immo/` du dépôt `antony-immo`, faute d'accès à un autre dépôt au
moment de sa création. GitHub Pages n'acceptant qu'un domaine par dépôt, il ne
peut pas être servi depuis là : il lui faut `mariecelineetave-source/pros-idf-immo`.

**Brancher un vrai expéditeur d'e-mails avant d'ouvrir l'espace personnel.**
L'envoi inclus dans Supabase est bridé à quelques messages par heure et n'est
pas prévu pour un service réel (Supabase → Project Settings → Authentication →
SMTP Settings → « Custom SMTP » ; **Brevo** est le candidat naturel : français,
gratuit jusqu'à 300 messages par jour). Même consigne que sur gardiens.idf.immo :
**le rappeler à chaque fois qu'il est question de diffusion, de QR code,
d'affiche ou de lancement.**

## Le vocabulaire — règle absolue

**Le mot « signalement » ne doit apparaître nulle part** : ni dans les textes, ni
dans les URLs, ni dans les attributs `alt`, ni dans les noms de classes CSS, ni
dans les futurs noms de tables. On écrit toujours **« opportunité »** et
**« partager une opportunité »**.

Éviter tout ce qui évoque la dénonciation, la surveillance ou le fichage. Le ton
est humain, direct, positif : le professionnel est un acteur de son quartier,
jamais un informateur. Il **recommande**, comme il recommande déjà un confrère.

Règle commune à la famille : **ne pas écrire « minimum » ni « sans minimum »**
dans le texte visible. La promesse se formule en positif.

## La règle du fichier clients — spécifique à ce site

C'est la différence de fond avec gardiens.idf.immo, et elle est structurante :
**on ne demande jamais un fichier, une liste, un carnet d'adresses ou un export
de clientèle.** Une opportunité concerne **une personne, informée et
consentante**. Cette règle est écrite dans `notre-engagement.html`,
`vos-questions.html` (question « fichier »), `conditions-de-la-prime.html`
(article 10) et `mentions-legales.html`. Ne jamais l'affaiblir : c'est ce qui
protège le professionnel autant que ses clients.

## Les règles du programme (identiques à gardiens.idf.immo)

Ces valeurs sont écrites en dur dans les pages. **Ne jamais les modifier sans
validation explicite de Marie-Céline** — et si l'une change, la changer partout :
`index.html`, `la-prime.html`, `conditions-de-la-prime.html`,
`vos-questions.html`, les 8 pages départementales, les accueils `pt/` et `en/`,
et les dictionnaires correspondants.

| Règle | Valeur |
|---|---|
| Montant de la prime | **1 000 € nets forfaitaires**, par vente |
| Fait générateur | **Signature de l'acte authentique** — jamais le compromis ni le mandat |
| Prime intermédiaire au mandat | **Aucune** |
| Plafond annuel | **Aucun** (contrepartie : l'information fiscale, voir plus bas) |
| Délai de versement | **15 jours** |
| Validité d'une opportunité | **24 mois glissants**, relancés à chaque contact effectif |
| Deux professionnels, même bien | **Le premier enregistré** |
| Vente par un autre conseiller du réseau | **Prime due quand même** |
| Nom du professionnel communiqué | **Jamais sans son accord**, opportunité par opportunité |
| Zone | **Île-de-France uniquement** (75, 77, 78, 91, 92, 93, 94, 95) |
| Canal de suivi | **E-mail** — l'adresse est donc obligatoire dans le formulaire |
| Versement | **Facture d'apport d'affaires** si le participant a un SIREN, **virement simple** sinon |

**Le plafond ayant été supprimé, l'information fiscale n'est pas optionnelle.**
Elle doit rester visible sur `la-prime.html` et `vos-questions.html`, dans ses
deux cas : recette professionnelle pour qui facture ; bénéfices non commerciaux
non professionnels et formulaire 2042-C-PRO pour qui n'a pas d'activité
indépendante. Ne pas la supprimer pour rendre le discours plus vendeur — c'est
ce qui rend le programme crédible.

## Structure

- `index.html` — accueil, 8 blocs. Un seul objectif : cliquer sur « Partager une
  opportunité ». **Aucun contenu SEO ici** ; les mots-clés vivent dans les pages
  de contenu et les pages départementales.
- `partager.html` — le formulaire en 3 écrans, CSS et JS inclus. La page la plus
  importante du site. Champs propres à ce site : **métier** (obligatoire, il sert
  à la phrase d'appel) et **enseigne** (facultatif).
- `comment-ca-marche.html`, `la-prime.html`, `vos-questions.html`,
  `notre-engagement.html` — les pages de contenu.
- `conditions-de-la-prime.html` — le règlement du programme.
- `mentions-legales.html` — éditeur, hébergeur, RGPD.
- `ile-de-france/*.html` — 8 pages départementales (référencement local).
- `mon-espace.html` + `base/` — l'espace personnel, en attente d'une base.
- `styles.css` — feuille commune. `site.js` — barre d'action mobile.
- `outils/verifier.py` — le contrôle avant commit (voir plus bas).
- `CNAME`, `robots.txt`, `sitemap.xml`.
- `i18n.js` + `dico-*.js` — le multilingue (voir ci-dessous).

## Le multilingue — français, portugais, anglais

Comme sur gardiens.idf.immo, le site existe en trois langues **sans jamais
dupliquer une page** : chaque fichier reste écrit en français et se traduit à
l'affichage. C'est la règle qui empêche qu'un montant ou un délai corrigé une
fois se mette à diverger d'une langue à l'autre.

- **`i18n.js`** — le moteur commun. Il lit `?lang=pt` ou `?lang=en`, remplace les
  nœuds de texte, traduit le titre, met `<html lang>` à jour, et **réécrit les
  liens internes** pour que la navigation reste dans la langue choisie.
- **`dico-commun.js`** — en-tête, bandeau final, pied de page. Chargé partout.
- **`dico-<page>.js`** — le texte propre à une page. `dico-departement.js` sert
  les huit pages départementales à lui seul.
- Chaque entrée est un **triplet `[français, portugais, anglais]`**. La clé
  française doit être **exactement** le texte du fichier HTML (les espaces sont
  normalisés, l'insécable compte comme une espace).
- **Un texte coupé par un `<strong>` fait plusieurs entrées** : traduire chaque
  morceau de façon que le recollage donne une phrase correcte.
- `window.T("…")` traduit une chaîne fabriquée en JavaScript
  (`mon-espace.html`) ; `window.LOCALE` donne la locale des dates et des nombres.
- Exceptions volontaires : `index.html` a de vraies pages traduites
  (`pt/index.html`, `en/index.html`) pour le référencement ; `partager.html`
  garde `traductions.js` et les deux pages juridiques `traductions-juridiques.js`,
  qui ajoute le bandeau **« seule la version française fait foi »**.

**Quand on ajoute ou modifie une phrase sur une page traduite, on met à jour son
dictionnaire dans la foulée** — sinon la phrase ressort en français au milieu du
portugais. `outils/verifier.py` le détecte : il n'y a pas d'excuse.

## Palette

Le **bleu de la famille `.immo`**, défini dans `styles.css`.

**L'or (`--or`, `--or-clair`) est réservé à une seule chose : la prime de 1 000 €
et le statut « prime versée ».** Ne jamais l'utiliser ailleurs — c'est ce qui lui
donne sa valeur de récompense. Règle de contraste héritée de la famille : **l'or
ne passe en texte que sur fond sombre** ; sur fond clair, il ne sert qu'en aplat,
filet ou bordure.

Aucune image externe : tout est en **SVG inline** reprenant les variables de
couleur. Le motif signature de ce site est **la devanture** (`.devanture` dans
`styles.css`) : une rue de trois boutiques, dont une seule est allumée — c'est
l'opportunité que le professionnel est le premier à connaître. Sur
gardiens.idf.immo, c'est une façade avec une fenêtre allumée : même idée, autre
métier. Pas de photo de famille, pas de poignée de main, pas de maison de banque
d'images.

## Contact — règle stricte

- **`contact@idf.immo` uniquement.** Jamais `contact@pros.idf.immo`, qui n'existe
  pas.
- **Téléphone : 06 60 98 92 92.**

## Règles de contenu

1. **Aucun chiffre ni référence juridique inventés.** Sans source vérifiée, on
   n'écrit rien.
2. **Ne jamais promettre un résultat.** On décrit la méthode, pas une garantie.
3. **Ne pas dissimuler le point fiscal ni celui de la TVA.** Ils sont traités
   franchement dans `la-prime.html` et `vos-questions.html` : c'est volontaire,
   ne pas les édulcorer. Sur la TVA, on renvoie au comptable du participant — on
   ne tranche pas à sa place.
4. **Ne jamais suggérer de dissimuler quoi que ce soit** : ni à un employeur pour
   un salarié, ni à un client. La transparence est la position tenue partout.
5. **Aucune donnée personnelle dans le dépôt** — il est public. Pas un nom de
   commerce réel, pas un nom de client, pas une coordonnée.
6. **Ne jamais contacter qui que ce soit.**
7. Avant tout commit : lancer **`python3 outils/verifier.py`** (équilibre des
   balises, validité des blocs JSON-LD, couverture des traductions). Il doit
   afficher « Tout est en ordre ».
8. Quand le contenu d'une page publiée change, mettre son `<lastmod>` dans
   `sitemap.xml` à la date du jour (AAAA-MM-JJ).

## Publication

- **Toute modification attend la validation explicite de Marie-Céline
  (« publie »).** Aucune rubrique de ce site n'est en publication automatique.
- Mise en ligne visée : dépôt `mariecelineetave-source/pros-idf-immo`, branche
  `main`, racine, avec le `CNAME` et un enregistrement CNAME `pros` →
  `mariecelineetave-source.github.io.` chez Gandi.

## Divers

- Tout en français. Commits clairs en français.
- Le proxy réseau bloque le fetch HTTP direct (curl) : utiliser WebSearch ; un
  échec curl ne signifie PAS que le site est en panne.
- Push : `git push -u origin <branche>` ; en cas d'erreur réseau, retenter
  jusqu'à 4 fois (2, 4, 8, 16 s).

## Points à confirmer avec Marie-Céline

Volontairement absents du site tant qu'ils ne sont pas tranchés — ne rien
inventer en attendant.

- **La prime de 1 000 € est-elle HT ou TTC pour un participant assujetti à la
  TVA ?** Le site dit « 1 000 € nets » et renvoie le participant à son comptable
  pour la TVA, sans trancher : c'est une décision commerciale, pas technique.
- **Relecture juridique de la convention d'indicateur d'affaires transposée.**
  Le modèle de gardiens.idf.immo est réutilisable, mais deux points changent :
  le participant est le plus souvent une **entreprise** (facture, TVA), et la
  clause sur l'employeur ne vaut que pour les salariés.
- **Un participant peut-il partager le bien d'un client dont il est en train de
  faire les travaux ?** Rien ne l'interdit aujourd'hui ; à confirmer.
- **Hébergement de la partie applicative** (espace personnel + back-office), qui
  ne peut pas vivre sur GitHub Pages.
