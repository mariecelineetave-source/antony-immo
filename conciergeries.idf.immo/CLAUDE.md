# conciergeries.idf.immo — consignes pour les sessions automatisées

Site du **réseau des conciergeries de location courte durée d'Île-de-France**
de Marie-Céline Etave. Une conciergerie partage l'opportunité d'un propriétaire
de son portefeuille ; si l'opération se conclut, elle perçoit **10 % des
honoraires nets hors taxes** de la conseillère.

Membre de la famille `idf.immo`, au même titre que `gardiens.idf.immo`,
`nounous.idf.immo`, `etudiants.idf.immo`, `associations.idf.immo` et
`pros.idf.immo`. **Chaque site est autonome : ne jamais mélanger les contenus,
ne jamais modifier un autre dépôt depuis celui-ci.** `antony.immo`,
`paris7e.immo` et `cse.immo` n'appartiennent pas à la famille : ce sont les
vitrines de Marie-Céline elle-même.

## ⚠️ État : rien n'est en ligne, rien n'est publié

Arbitré par Marie-Céline le 31 août 2026 : **le site ne doit pas être mis en
ligne, et ne doit pas partir sur GitHub tout de suite.** Il vit pour l'instant
dans le dossier `conciergeries.idf.immo/` de la branche
`claude/conciergeries-idf-immo-x53555` du dépôt `antony-immo` — c'est le même
chemin de fabrication qu'ont suivi `pros`, `nounous`, `etudiants` et `gardiens`
avant d'avoir leur propre dépôt.

Mettre le site en ligne demandera **trois gestes délibérés**, qu'aucune session
ne doit faire d'elle-même :

1. créer le dépôt `mariecelineetave-source/conciergeries-idf-immo` et y
   déplacer le contenu de ce dossier, à la racine ;
2. activer GitHub Pages sur `main`, à la racine, HTTPS forcé ;
3. ajouter chez Gandi l'enregistrement **CNAME** `conciergeries` →
   `mariecelineetave-source.github.io.`

Le fichier `CNAME` est déjà écrit : il est inerte tant que Pages n'est pas
activé.

## Le public : des dirigeants, pas des particuliers

On s'adresse à des **gérants et directeurs de conciergerie** — cadres
supérieurs, chefs d'entreprise. Le ton est celui d'une proposition entre
professionnels : précis, chiffré, sans familiarité, sans point d'exclamation,
sans promesse de résultat. On écrit « portefeuille », « mandat de gestion »,
« apport d'affaires », « arbitrage patrimonial », « fait générateur ».

Ne pas retomber dans le registre de `pros.idf.immo` (« au comptoir », « dans le
fauteuil ») : ce n'est pas le même interlocuteur.

## La rémunération — règle absolue

**10 % des honoraires NETS HORS TAXES effectivement perçus par Marie-Céline
Etave.** Arbitré le 31 août 2026, sur le modèle exact d'`associations.idf.immo`.

La chaîne de calcul, écrite dans `calculette.js` et dans `la-remuneration.html` :

| Étape | Ce qu'on retire | Exemple : 450 000 € à 4 % |
|---|---|---|
| Honoraires d'agence facturés | — | 18 000 € TTC |
| Passage hors taxes | la TVA (20 %) | 15 000 € HT |
| Part revenant à la conseillère | la quote-part du réseau mandant | 11 250 € HT |
| **Commission de la conciergerie** | 10 % | **1 125 € HT** |

- **Ce n'est jamais 10 % du prix du bien, ni 10 % des honoraires bruts.**
- Les montants annoncés sont **hors taxes** : la TVA s'ajoute sur la facture de
  la conciergerie si elle y est assujettie.
- **Aucun plafond**, aucun palier dégressif, aucune limite de nombre. Ne jamais
  réintroduire une limite (« trois prescriptions » ou autre) : arbitré.
- Règlement **sous 15 jours** après encaissement, sur **facture d'apport
  d'affaires**.

Ces valeurs sont écrites en dur dans `index.html`, `calculette.js`,
`la-remuneration.html`, `vos-questions.html`, `conditions-du-partenariat.html`
et `partager.html`. **Si l'une change, la changer partout.**

## Les trois missions

Vente, mandat de recherche et **expertise en valeur vénale** ouvrent le même
droit. Pour l'expertise, le fait générateur est la **remise du rapport et son
règlement**, sans qu'une vente soit nécessaire — c'est ce qui rend le
partenariat intéressant pour une conciergerie dont le propriétaire ne vend pas.

| Règle | Valeur |
|---|---|
| Taux | **10 % des honoraires nets HT** |
| Fait générateur, vente et recherche | **Signature de l'acte authentique** |
| Fait générateur, expertise | **Remise et règlement du rapport** |
| Plafond | **Aucun** |
| Délai de règlement | **15 jours** après encaissement |
| Validité d'une opportunité | **24 mois glissants**, relancés à chaque contact effectif |
| Deux structures, même bien | **La première enregistrée** |
| Opération menée par un autre conseiller du réseau | **Commission due quand même** |
| Nom de la conciergerie communiqué | **Jamais sans son accord**, opportunité par opportunité |
| Zone | **Île-de-France uniquement** (75, 77, 78, 91, 92, 93, 94, 95) |
| Versement | **Facture d'apport d'affaires**, ou virement simple pour un salarié agissant à titre personnel |

## Le vocabulaire — règle de la famille

- **Le mot « signalement » ne doit apparaître nulle part** : ni dans les textes,
  ni dans les URL, ni dans les attributs `alt`, ni dans les noms de classes.
  On écrit toujours **« opportunité »** et **« partager une opportunité »**.
- **Ne pas écrire « minimum » ni « sans minimum »** : la promesse se formule en
  positif.
- **Antony n'apparaît nulle part** : c'est le terrain d'`antony.immo`.
- Contact : **`contact@idf.immo` uniquement**, jamais
  `contact@conciergeries.idf.immo`, qui n'existe pas. Téléphone :
  **06 60 98 92 92**.

`outils/verifier.py` contrôle ces quatre points.

## La règle propre à ce site : le portefeuille

C'est la différence de fond avec les autres sites de la famille, et elle est
structurante : **on ne demande jamais un portefeuille, une liste, un export
d'outil de gestion (Beds24, Smoobu, Hostaway…) ni un calendrier de
réservations.** Une opportunité concerne **un propriétaire, informé et
consentant**. Cette règle est écrite dans `notre-engagement.html`,
`vos-questions.html` (question « portefeuille »), `conditions-du-partenariat.html`
(article 11) et `mentions-legales.html`. Ne jamais l'affaiblir.

Second point propre à ce site, dans `notre-engagement.html` : **on ne promet
pas à la conciergerie qu'elle récupérera la gestion du logement vendu.** Cette
décision appartient à l'acquéreur. L'engagement pris est plus étroit et
vérifiable : ne jamais recommander une conciergerie concurrente à l'acquéreur
d'un logement signalé. Ne pas transformer cela en promesse commerciale.

## Structure

- `index.html` — accueil : héros, principe en 5 temps, **calculette**,
  manifeste, trois missions, profils, zone, interlocutrice.
- `partager.html` — le formulaire en 3 écrans, CSS et JS inclus. La page la
  plus importante. Champs propres à ce site : **société**, **fonction**,
  **SIREN** (facultatif), **portefeuille** (le logement est-il géré par vous),
  **mission** et **réservations en cours**.
- `comment-ca-marche.html`, `la-remuneration.html`, `vos-questions.html`,
  `notre-engagement.html` — les pages de contenu.
- `conditions-du-partenariat.html` — le règlement en 13 articles.
- `contact.html`, `mentions-legales.html`.
- `mon-espace.html` — le tableau de bord d'une conciergerie.
- `back-office.html` — l'écran de pilotage de Marie-Céline (`noindex`).
- `base/` — le raccordement à la base : `correctif-3a-enum.sql` et
  `correctif-3.sql` à passer dans Supabase (dans cet ordre), `config.js`
  volontairement vide, `socle.js` qui bascule tout seul une fois rempli.
  Voir `base/LISEZMOI.md`, qui dit ce qui a été vérifié et comment.
- `styles.css` — feuille commune. `site.js` — barre d'action mobile.
  `calculette.js` — le calcul des 10 %.
- `outils/verifier.py` — le contrôle avant commit.
- `CNAME`, `robots.txt`, `sitemap.xml`.

## Le site n'est pas multilingue

Contrairement à `gardiens`, `nounous` et `pros`, il n'y a **ni `i18n.js`, ni
dictionnaires, ni versions `pt/` et `en/`** : les conciergeries franciliennes
sont des sociétés françaises, et le portugais n'a pas ici la raison d'être
qu'il a chez les gardiens. C'est un choix, pas un oubli. Si Marie-Céline
tranche l'inverse, reprendre le moteur de `pros.idf.immo` à l'identique et
ajouter le contrôle de couverture dans `outils/verifier.py`.

## Palette et motif

Le **bleu de la famille `.immo`**, défini dans `styles.css`.

**L'or (`--or`, `--or-clair`) est réservé à une seule chose : la commission de
10 % et le statut « commission versée ».** Ne jamais l'utiliser ailleurs.
Règle de contraste héritée de la famille : **l'or ne passe en texte que sur
fond sombre** ; sur fond clair, il ne sert qu'en aplat, filet ou bordure.

Aucune image externe : tout est en **SVG inline**. Le motif signature de ce
site est le **tableau de clés** (`.trousseau` dans `styles.css`) : une armoire
à clés de conciergerie, dont une seule clé est allumée — le propriétaire qui va
vendre, et que la conciergerie est la première à connaître. Sur
`gardiens.idf.immo` c'est une façade avec une fenêtre allumée, sur
`pros.idf.immo` une rue avec une boutique allumée : même idée, autre métier.
Pas de photo de banque d'images, pas de poignée de main.

## Le formulaire passe par FormSubmit — activation PAR SITE

`partager.html` envoie l'opportunité à `contact@idf.immo` via FormSubmit, avec
un accusé de réception automatique (`_autoresponse`). Rien n'est stocké côté
site.

Ce service exige une **activation à la première soumission de chaque site** :
il envoie un e-mail contenant un lien « Activate Form », et tant que personne
n'a cliqué, **rien ne part**. Cette activation **n'a pas encore été faite pour
ce site** : le premier envoi de test échouera, c'est normal, c'est lui qui
déclenche l'e-mail.

FormSubmit est **injoignable depuis les sessions Claude** (le proxy réseau le
bloque) : ce test ne peut être fait que depuis un vrai navigateur.

L'encart d'échec affiche la réponse exacte du service (« Le service d'envoi a
répondu : … »), ce qui rend le diagnostic immédiat. Ne pas revenir à un message
générique.

## Le reçu, et pas l'accusé de réception — décision du 3 septembre 2026

**Ne jamais réécrire que le partenaire « reçoit un e-mail de confirmation ».**

Les cinq sites de la famille le promettent, trois fois par page, et cet e-mail
**ne part pas** : `partager.html` poste en AJAX avec `_captcha = false`, et la
documentation de FormSubmit dit que l'autoresponse ne fonctionne dans aucun de
ces deux cas. Constat relevé le 22 août 2026 dans `app-idf-immo/CLAUDE.md`, et
jamais corrigé sur les sites en ligne, qui sont gelés.

Ce site ne reproduit pas cette promesse. À la place, l'écran final affiche un
**reçu** — numéro, date, logement, mission, partenaire — présenté comme ce qui
fait foi, avec un bouton « Copier mon reçu » et un bouton « Imprimer ». Le
champ `_autoresponse` continue d'être envoyé (il ne coûte rien et fonctionnera
si le service l'accepte un jour), mais **la page ne s'engage plus dessus**.

Une promesse qu'on ne tient pas vaut moins que pas de promesse du tout — et
ici, ce qui est promis, c'est la preuve d'antériorité d'une commission.

## L'échelle — toute l'Île-de-France, jamais une ville

Le site couvre les **huit départements**. Les exemples (villes, adresses des
champs de formulaire, données de démonstration) **balaient la région** :
aujourd'hui Paris 11e et 18e, Boulogne-Billancourt (92), Versailles (78),
Saint-Ouen (93), Montreuil (93), Vincennes (94), Fontainebleau (77). Quand
l'exemple est parisien, on écrit l'arrondissement (`75011 Paris`), jamais
« Paris » tout court.

Il n'y a **pas de pages départementales**, et il ne faut pas en créer : mesuré
sur `pros.idf.immo` avant leur retrait, elles étaient identiques à 81 % — la
définition d'une page satellite. Si le référencement local redevient un
objectif, chaque page devra dire quelque chose que les autres ne disent pas :
des chiffres locaux sourcés, pas une reformulation.

## Règles de contenu

1. **Aucun chiffre ni référence juridique inventés.** Sans source vérifiée, on
   n'écrit rien. Le site ne cite volontairement aucun texte sur la
   réglementation des meublés de tourisme : il faudrait le vérifier avant, et
   il change vite.
2. **Ne jamais promettre un résultat.** On décrit la méthode, pas une garantie.
3. **Ne pas dissimuler la TVA ni le point fiscal.** Ils sont traités
   franchement dans `la-remuneration.html` et `vos-questions.html` : ne pas les
   édulcorer. On renvoie à l'expert-comptable du partenaire, on ne tranche pas
   à sa place.
4. **Ne jamais suggérer de dissimuler quoi que ce soit** : ni une clause de
   mandat de gestion, ni un contrat de travail. La transparence est la position
   tenue partout.
5. **Aucune donnée personnelle dans le dépôt** — il est public. Les données de
   `base/demonstration.js` sont **entièrement fictives** et doivent le rester.
6. **Ne jamais contacter qui que ce soit.**
7. Avant tout commit : lancer **`python3 outils/verifier.py`**. Il doit
   afficher « Tout est en ordre ».
8. Quand le contenu d'une page change, mettre son `<lastmod>` dans
   `sitemap.xml` à la date du jour (AAAA-MM-JJ).

## Publication

**Aucune rubrique de ce site n'est en publication automatique.** Toute
modification attend la validation explicite de Marie-Céline (« publie »), et la
mise en ligne demande les trois gestes décrits en haut de ce fichier.

## Points à confirmer avec Marie-Céline

Volontairement absents du site tant qu'ils ne sont pas tranchés — ne rien
inventer en attendant.

- **La convention d'apport d'affaires transposée**, et sa relecture juridique.
  Le modèle d'`associations.idf.immo` est réutilisable pour l'assiette, celui
  de `pros.idf.immo` pour les interdits ; deux points changent : le partenaire
  est presque toujours une **société** (facture, TVA), et la question du
  **mandat de gestion** (confidentialité, exclusivité) n'existe sur aucun autre
  site de la famille.
- **Qui perçoit la commission** quand c'est un salarié de la conciergerie qui
  partage : la société, ou lui à titre personnel ? Le site dit aujourd'hui que
  c'est une question interne à la structure, à trancher avant le premier
  partage.
- **L'engagement envers l'acquéreur** : faut-il aller plus loin que « ne jamais
  recommander une conciergerie concurrente » et présenter la conciergerie à
  l'acquéreur investisseur ? Non tranché, donc non écrit.
- **L'hébergement de la partie applicative** (espace partenaire + back-office),
  qui ne peut pas vivre sur GitHub Pages.

## Divers

- **Sauvegarder n'est jamais une question ; publier en est une.** Les deux ne se
  confondent pas. Renvoyer le travail dans le dépôt (`git push` sur la branche
  de travail) ne rend rien visible de personne : c'est le geste ordinaire qui
  clôt une session, et il se fait sans rien demander. Ce qui demande l'accord
  explicite de Marie-Céline, c'est la **mise en ligne** : créer le dépôt dédié,
  activer GitHub Pages, ajouter l'enregistrement DNS. Ne jamais lui faire
  arbitrer la sauvegarde — la session tourne sur une machine temporaire, et ne
  rien renvoyer, c'est perdre le travail.
- **Pas de jargon.** Ne pas écrire « commit », « push », « branche » sans dire
  en français ce que cela fait. Marie-Céline n'est pas développeuse, et un mot
  qu'elle ne comprend pas l'empêche de décider.

- **Marie-Céline travaille sur iPad, où le copier-coller à la main est
  pénible :** tout ce qu'elle doit recopier (nom de dépôt, adresse à ouvrir,
  enregistrement DNS, commande, texte de message) doit être donné dans un
  **bloc de code**, qui affiche un bouton « copier ». Jamais au fil du texte.
  Un élément à copier = un bloc, pour qu'un seul appui suffise.
- **Dire où on en est.** Marie-Céline ne voit pas le travail avancer : annoncer
  l'étape en cours et ce qu'il reste, sans attendre qu'elle le demande.
- Tout en français. Commits clairs en français.
- Le proxy réseau bloque le fetch HTTP direct (curl) : utiliser WebSearch ; un
  échec curl ne signifie PAS que le site est en panne.
- Push : `git push -u origin <branche>` ; en cas d'erreur réseau, retenter
  jusqu'à 4 fois (2, 4, 8, 16 s).
