# gardiens.idf.immo — architecture fonctionnelle et UX

**Proposition, avant tout développement.** À arbitrer par Marie-Céline Etave.
Rien n'est codé tant que les décisions du § 12 ne sont pas tranchées.

> **Note d'emplacement.** Ce document est provisoirement déposé sur la branche de
> travail d'`antony-immo` faute de dépôt dédié. Il doit rejoindre
> `mariecelineetave-source/gardiens-idf-immo` dès sa création : GitHub Pages
> n'accepte qu'un domaine par dépôt, et la règle de la famille est qu'aucun site
> n'écrit dans le dépôt d'un autre. **Rien de tout ceci ne doit arriver sur `main`
> d'antony.immo.**

---

## 0. Décisions arbitrées par Marie-Céline — 13 août 2026

| # | Question | Décision |
|---|---|---|
| 1 | Plafond de ventes primées par an | **Aucune limite** — voir § 9.2, la contrepartie |
| 2 | Formulaire en ligne ou téléphone | **Formulaire** |
| 3 | Prime intermédiaire au mandat | **Non.** 1 000 € à la vente, et rien avant |
| 4 | Écart avec les 850 € étudiants | **Assumé** — ce n'est pas le même apport |
| 5 | Position de BSK Immobilier | **Pas de position** — pas de blocage de ce côté |
| 6 | Espace personnel | **Dès le lancement** (contre la recommandation initiale — voir § 10) |
| 7 | Fenêtre d'attribution | **24 mois glissants** |
| 8 | Deux gardiens sur le même bien | **Premier arrivé** |
| 9 | Vente réalisée par un autre conseiller | **Prime due quand même** |
| 10 | Nom du gardien communiqué au propriétaire | **Jamais sans son accord**, opportunité par opportunité |

Ces décisions sont reportées dans les sections concernées. Ce qui reste ouvert
est regroupé au § 12.

---

## 1. Le précédent qui change la conception : etudiants.idf.immo

Avant toute chose : ce projet n'est pas un terrain vierge. `etudiants.idf.immo`
fait déjà, pour les étudiants, exactement ce que le brief décrit pour les
gardiens — et il a déjà résolu la partie juridique.

| | etudiants.idf.immo (en ligne) | gardiens.idf.immo (proposé) |
|---|---|---|
| Qui | Étudiants d'Île-de-France | Gardiens, gardiennes, concierges, employés d'immeuble |
| Statut juridique | **Indicateur d'affaires**, convention signée | Le même cadre |
| Prime | 50 € au mandat exclusif + 800 € à l'acte | **1 000 € à la vente** |
| Plafond | **3 ventes primées par an et par personne** | à trancher — voir § 9.2 |
| Transmission | **Par téléphone. Aucun formulaire, aucun stockage** | Formulaire — c'est LA rupture, voir § 4 |
| Suivi | Aucun | Espace personnel avec statuts — la 2e rupture |

**Conséquence : on ne repart pas de zéro.** La convention
`convention-indicateur-affaires.md` du dépôt étudiants est directement
transposable (articles 1, 4, 5 et 6 quasiment à l'identique). C'est plusieurs
semaines de gagnées, et surtout la garantie que les deux sites de la famille
racontent la même histoire juridique.

**Mais le brief demande deux choses que les étudiants n'ont pas** : un formulaire
en ligne et un espace personnel avec suivi des statuts. Ces deux ruptures sont
défendables — un gardien n'a pas le même rapport au téléphone qu'un étudiant, et
il a besoin de voir où en sont ses opportunités pour continuer à en partager —
mais elles font passer le projet **d'un site statique à une application avec base
de données**. C'est la principale décision de ce document (§ 10).

---

## 2. Ce qu'est réellement le produit

Vu de l'extérieur : une page qui dit « vous connaissez quelqu'un qui envisage de
vendre ? partagez son opportunité, 1 000 € si la vente se fait ».

Vu de l'intérieur : **un mécanisme qui doit relier, dix-huit mois plus tard, un
acte de vente signé chez le notaire à une information partagée un soir depuis une
loge.** Si ce lien n'est pas automatique et démontrable, le réseau meurt à la
première prime oubliée : un gardien qui se croit lésé le dit à tous les gardiens
du secteur. C'est donc la partie à concevoir en premier (§ 5), avant le design.

### Les trois acteurs

| Acteur | Ce qu'il fait | Ce qu'il ne fait jamais |
|---|---|---|
| **Le gardien / la gardienne** | Partage une information qu'il détient déjà | Ne vend pas, ne visite pas, n'estime pas, ne négocie pas, ne signe rien, ne donne aucun prix |
| **Le conseiller** (Marie-Céline) | Qualifie, contacte, prend le mandat, vend | Ne laisse jamais une opportunité sans réponse |
| **Le propriétaire** | C'est le vrai client final | N'est jamais contacté sans avoir donné son accord |

Le propriétaire est le grand absent du brief, alors que c'est la personne dont on
parle. Tout le produit doit être conçu pour que, le jour où le conseiller décroche
son téléphone, **la première phrase soit confortable à prononcer** : « Bonjour, je
suis Marie-Céline Etave, c'est Martine, la gardienne de votre résidence, qui m'a
donné votre numéro avec votre accord. » Cette phrase commande la conception du
formulaire (§ 4.3) et rejoint la doctrine CNIL sur le parrainage, déjà appliquée
sur etudiants.idf.immo.

---

## 3. La question qui décide de tout : le gardien est salarié de la copropriété

C'est la différence de fond avec les étudiants, et **elle mérite d'être tranchée
avant la première ligne de code.**

Un étudiant qui recommande sa tante n'a de comptes à rendre à personne. Un gardien
est salarié — de la copropriété, souvent via le syndic — et relève de la convention
collective des gardiens, concierges et employés d'immeubles. Il est tenu à une
obligation de loyauté envers son employeur. Or **son employeur, c'est le syndicat
des copropriétaires, c'est-à-dire l'assemblée des propriétaires dont on parle.**

Le risque n'est pas théorique. Si un conseil syndical découvre que son gardien est
rémunéré pour transmettre des informations sur les projets des copropriétaires
sans que ce soit assumé, la réaction sera mauvaise — pour le gardien d'abord, pour
l'image du réseau ensuite. Un seul incident de ce type sur une résidence, et le
bouche-à-oreille entre loges se retourne.

**Recommandation : faire de la transparence un principe affiché, pas une
précaution enfouie dans les mentions légales.**

- Le site dit explicitement qu'il n'y a rien à cacher, et pourquoi : le gardien ne
  divulgue pas un secret, il oriente un voisin vers un professionnel, exactement
  comme il recommanderait un plombier.
- Une page `/vos-questions` traite franchement « et mon employeur ? » plutôt que
  de l'esquiver. **Ne jamais suggérer de ne pas en parler** — ce serait un mauvais
  conseil et un risque d'image.
- Le champ « ce que vous savez » du formulaire est cadré pour recueillir une
  intention de vente, jamais des éléments relevant de la vie privée (situation
  financière, séparation, santé).
- La convention rappelle que le gardien s'engage à respecter ses obligations
  contractuelles envers son employeur.

C'est ce qui distinguera une plateforme respectable d'un système d'informateurs —
et c'est aussi, commercialement, le meilleur argument pour convaincre un gardien
hésitant.

---

## 4. Le parcours de partage — l'écran critique

Objectif : **moins de 60 secondes, sans compte, sur un téléphone, dans une loge,
entre deux interruptions.** Trois écrans courts, une barre de progression, et une
sauvegarde locale à chaque champ — un gardien interrompu doit pouvoir reprendre.

### 4.1 Écran 1 — Où ?

- **Adresse du bien** : un seul champ, avec autocomplétion sur la Base Adresse
  Nationale (`api-adresse.data.gouv.fr`, gratuite et sans clé). Le gardien tape
  « 12 rue des Ru » et choisit dans la liste. On récupère une adresse normalisée
  et un identifiant stable : **c'est la clé de tout le mécanisme d'attribution**
  (§ 5).
- **Bâtiment / escalier / étage**, facultatif : c'est ce qui distingue deux
  appartements de la même résidence.
- Contrôle Île-de-France automatique (75, 77, 78, 91, 92, 93, 94, 95). Hors zone :
  message honnête, jamais un rejet sec.

### 4.2 Écran 2 — Ce que vous savez

- **Type de bien** : appartement / maison / autre, en boutons.
- **Où en est le projet ?** quatre boutons : *ils en parlent* / *c'est décidé* /
  *ils cherchent déjà* / *c'est déjà en vente ailleurs*.
- **Ce que vous savez** : champ libre, avec un exemple en repère (« ils partent en
  province à la retraite, ils en ont parlé en juin ») et une phrase de cadrage :
  *on a besoin de savoir qu'un projet existe, pas de détails personnels.*

### 4.3 Écran 3 — Vous, et le propriétaire

- **Vous** : prénom, téléphone (obligatoire, c'est le canal de suivi), e-mail
  facultatif, la résidence dont vous êtes gardien.
- **Le propriétaire** : deux choix explicites, jamais un champ ouvert par défaut.
  - *« Je préfère que vous le contactiez sans me citer »* → **aucune coordonnée
    demandée**, le conseiller travaille l'approche autrement. Cette option est
    présentée **en premier**.
  - *« Je lui en ai parlé, il est d'accord pour être contacté »* → prénom et
    téléphone, avec une **case obligatoire** : « je confirme lui avoir parlé et
    avoir son accord ». C'est la condition de l'article 5 de la convention, et la
    condition pour que le premier appel se passe bien.
- Le site fournit **la phrase exacte** à dire au propriétaire, comme le fait
  etudiants.idf.immo : c'est le vrai blocage, pas la technique.

Validation → **écran d'accusé de réception** : numéro d'opportunité, date et heure
d'enregistrement, prochaine étape et délai annoncé. Le même contenu part par SMS.
**C'est la preuve d'antériorité du gardien**, visible avant même toute création de
compte.

---

## 5. Le mécanisme d'attribution — le cœur du système

Une prime perdue ou contestée coûte plus cher que dix opportunités manquées.

### 5.1 L'empreinte du bien

Chaque opportunité reçoit une **clé de bien** normalisée :

```
clé = identifiant BAN (adresse) + bâtiment + escalier + étage
```

Complétée d'une empreinte secondaire (prénom/nom du propriétaire normalisé, si
fourni) utilisée uniquement comme signal de rapprochement. C'est sur cette clé que
se jouent la détection de doublon, le contrôle du portefeuille existant et le
rapprochement à la vente.

### 5.2 L'antériorité

- Horodatage serveur immuable, communiqué au gardien dans l'accusé de réception.
- **Le premier qui partage gagne** — reprise de l'article 4 de la convention
  étudiants (« seul le premier appel reçu ouvre droit à la prime »). Un second
  partage sur la même clé passe en *Déjà partagée*, avec la date du premier
  affichée sans révéler qui.
- **Contrôle du portefeuille existant, automatique et immédiat.** Si le bien est
  déjà connu (contact, estimation, mandat antérieur), le gardien l'apprend dans
  l'heure, pas dix-huit mois plus tard. Ce contrôle doit être automatisé : s'il
  repose sur la mémoire humaine, il sera contesté.

### 5.3 Durée de validité

**24 mois glissants** à compter du partage — contre 12 mois chez les étudiants.
Justification : un projet évoqué en août peut se conclure deux étés plus tard, et
le gardien, contrairement à l'étudiant, reste sur place et le verra. Une fenêtre
trop courte serait une promesse en trompe-l'œil. Le compteur repart à chaque
contact effectif. Au-delà, l'opportunité expire mais **reste dans l'historique et
dans le périmètre du contrôle de rapprochement** (§ 5.5).

### 5.4 Les statuts

| Statut | Signification | Délai visé |
|---|---|---|
| **Reçue** | Enregistrée, horodatée | immédiat |
| **Qualifiée** | Le conseiller a regardé, l'opportunité est retenue | 48 h ouvrées |
| **Contact en cours** | Le propriétaire a été approché | 7 jours |
| **Projet immobilier** | Mandat signé | — |
| **Vente réalisée** | Acte authentique signé | — |
| **Prime de 1 000 €** | Versée | 15 jours après l'acte (aligné sur la convention étudiants) |

Statuts terminaux sans prime, **toujours avec un motif écrit** : *Déjà partagée* /
*Déjà en portefeuille* (avec date) / *Hors Île-de-France* / *Sans suite* / *Vendu
par un autre intermédiaire*.

**Règle de conception : aucun statut n'est muet.** Chaque changement déclenche un
SMS court. Le silence est ce qui tue ce type de réseau.

### 5.5 Le contrôle de rapprochement — la garantie anti-oubli

À chaque vente signée, recherche automatique sur **toutes** les opportunités
partagées pour cette clé de bien — y compris expirées, y compris classées « sans
suite » — avant l'établissement du décompte de commission.

C'est un filet de sécurité côté conseiller, mais c'est surtout **l'argument de
confiance à afficher publiquement** : « chaque vente que nous réalisons est
recoupée automatiquement avec les opportunités partagées. Vous n'avez rien à
surveiller, rien à réclamer. »

### 5.6 Les cas particuliers, à écrire en français simple

Repris de l'article 4 de la convention étudiants, plus les cas propres aux gardiens :

- **Deux gardiens de la même résidence** → le premier horodaté (ou 50/50 s'ils
  sont dans la même loge : à trancher).
- **Le gardien change de résidence** → il garde ses opportunités en cours.
- **Le gardien se recommande lui-même, ou un membre de son foyer** → exclu.
- **Le bien appartient au syndicat des copropriétaires** (loge, local) → exclu.
- **Le propriétaire vend sans nous, ou par un autre intermédiaire** → pas de
  prime, et on le dit clairement.
- **Le bien est vendu par un autre conseiller du réseau** → décision structurante,
  recommandation : prime due quand même.

---

## 6. Arborescence des pages

### Public

| URL | Rôle |
|---|---|
| `/` | Homepage — un seul but : cliquer sur « Partager une opportunité » |
| `/partager` | Le formulaire en 3 écrans. La page la plus importante |
| `/comment-ca-marche` | Le parcours en 5 étapes |
| `/la-prime` | Les 1 000 € : quand, comment, combien de fois, impôts |
| `/vos-questions` | FAQ, dont « ai-je le droit ? » et « et mon employeur ? » |
| `/notre-engagement` | Charte : ce qu'on fait, ce qu'on ne fait pas |
| `/mon-espace` | Espace personnel, connexion sans mot de passe |
| `/ile-de-france/<departement>` | 8 pages départementales — SEO local |
| `/conditions-de-la-prime` | Le règlement complet du programme |
| `/mentions-legales` | Mentions, RGPD |

**La homepage ne porte aucun contenu SEO.** Tout le texte à mots-clés vit dans les
pages départementales et les pages de contenu, qui remontent vers la home.

### Privé

- **Espace gardien** : mes opportunités, détail avec frise des statuts, mes primes,
  mon profil (coordonnées bancaires demandées **seulement** au moment de la première
  prime), parrainer un collègue.
- **Back-office conseiller**, non indexé : file de qualification, fiche
  opportunité, rattachement aux dossiers de vente, **contrôle de rapprochement**
  (§ 5.5), suivi des primes, annuaire des gardiens.

---

## 7. La homepage, bloc par bloc

Six blocs, pas un de plus. Chacun mène à `/partager`.

1. **Hero** — « Vous connaissez quelqu'un qui envisage de vendre ? / Partagez son
   opportunité. / 1 000 € pour chaque vente réalisée grâce à vous. »
   CTA principal **Partager une opportunité**, secondaire *Comment ça marche ?*
2. **Le principe en cinq temps** — Vous partagez → Nous prenons le relais → Le
   projet avance → La vente se réalise → Vous recevez 1 000 €.
3. **« Vous connaissez votre résidence. Nous connaissons l'immobilier. »** — le
   bloc qui pose le respect du métier : vous ne vendez pas, ne faites pas visiter,
   ne gérez rien. Vous transmettez une information.
4. **Ce que vous devez savoir** — les trois vraies objections : *ai-je le droit ?*
   / *mon nom apparaît-il ?* / *et si la vente ne se fait pas ?*
5. **Le réseau en Île-de-France** — les 8 départements, entrée vers les pages
   locales.
6. **Rappel de l'action** — bandeau final, CTA unique.

Barre d'action fixe en bas d'écran sur mobile dès le premier défilement. C'est elle
qui fera l'essentiel des conversions.

---

## 8. Direction artistique

### Le principe

Ni site d'agence, ni site d'emploi : **une plateforme de réseau.** La référence
mentale est une application de suivi (un colis, un dossier), pas une vitrine
immobilière. Beaucoup de blanc, typographie large, cartes-statuts, peu d'images.

### Palette — le bleu de la famille `.immo`

La règle de la famille est explicite : les sites sont bleus, c'est assumé, et
**ce qui doit rester distinct c'est le contenu, jamais la couleur.**

```
--ombre    #0E2E52   bleu marine — hero, pied de page
--buis     #1C5A9E   bleu profond
--sable    #EBF2F9   fond
--craie    #F7FAFD   cartes
--parterre #DCE8F4   sections alternées
```

L'accent et sa variante claire sont à caler comme sur associations.idf.immo, avec
**vérification du contraste 4,5** avant publication — ne pas recopier un accent
d'un autre site sans le revérifier sur les fonds de celui-ci.

**Une seule couleur chaude, un seul usage : la prime.** Un doré réservé aux
1 000 € et au statut « prime versée », jamais ailleurs — c'est ce qui lui donne sa
valeur de récompense. Règle de contraste impérative héritée de la famille : **le
doré ne passe en texte que sur fond sombre.** Sur fond clair, aplat, filet ou
bordure uniquement.

Typographie : Fraunces pour les titres, Archivo pour le texte, comme le reste de
la famille.

### L'univers visuel

Aucune image externe : **tout en SVG inline reprenant les variables de couleur**,
comme sur les sites frères — un changement de palette fait suivre les dessins. Pas
de photo de famille, pas de poignée de main, pas de maison de banque d'images.
À la place :

- des **trames de façades** — fenêtres, lignes d'immeubles haussmanniens et de
  barres des années 70, en traits fins ;
- des **points reliés** évoquant le réseau, discrets ;
- la **silhouette de l'Île-de-France** en fil de fer sur la section départements ;
- le décor réel du métier : halls, cours, boîtes aux lettres, loges — jamais des
  personnes posées.

Mobile-first strict : conçu pour un écran de 390 px tenu d'une main, CTA dans le
pouce, boutons de 48 px minimum.

---

## 9. Le cadre juridique — ce qui est déjà réglé, ce qui ne l'est pas

### 9.1 Déjà réglé par le précédent étudiants

La convention d'indicateur d'affaires existe et se transpose presque telle quelle :
définition du rôle limité à la mise en relation, interdictions explicites (pas de
visite, pas d'estimation, pas de prix même indicatif, pas de négociation),
information sur la loi Hoguet du 2 janvier 1970, garantie d'accord préalable du
tiers, usage unique des coordonnées, mention du prénom de l'indicateur dès le
premier appel, régime fiscal (BNC non professionnels, formulaire 2042-C-PRO,
aucune retenue à la source).

**Conséquence produit :** aucune fonctionnalité du site ne doit entraîner le
gardien de l'autre côté de la ligne. Pas d'estimation à faire remplir par lui, pas
de prise de rendez-vous de visite, pas d'outil de suivi de négociation. La formule
« selon les conditions applicables » du brief doit renvoyer à un texte réellement
écrit : `/conditions-de-la-prime`.

### 9.2 Non réglé, et structurant : le caractère occasionnel

**Décision : aucun plafond.** Le nombre de ventes primées par gardien et par an
n'est pas limité.

Chez les étudiants, un plafond de 3 ventes par an existe pour préserver le
caractère *occasionnel* de l'activité. Ici, la promesse est l'inverse : un gardien
bien placé peut faire remonter plusieurs opportunités par an, et c'est le but.

**La contrepartie de cette décision est une obligation d'information, pas une
limite.** Elle doit être tenue dans trois endroits :

1. **Sur le site** (`/la-prime`), en clair et sans dramatiser : les primes sont un
   revenu imposable à déclarer (BNC non professionnels, formulaire 2042-C-PRO) ;
   au-delà d'un rythme régulier, le gardien relève d'une activité indépendante à
   déclarer, et il lui appartient de s'en assurer.
2. **Dans la convention** : l'article 2 du modèle étudiants fonde le caractère
   occasionnel sur le plafond de 3. Ce plafond disparaissant, **cet article doit
   être réécrit** — c'est le point précis à soumettre au juriste.
3. **Dans le suivi** : le back-office doit afficher le cumul annuel versé à chaque
   gardien, pour que la question puisse être posée au bon moment plutôt que
   découverte après coup.

Rien de tout cela ne bride le modèle. Mais ne pas traiter le sujet le fragiliserait
davantage qu'un plafond ne l'aurait bridé.

### 9.3 RGPD

On collecte les données du gardien (base : la relation contractuelle) et, parfois,
celles d'un tiers absent de l'écran. D'où, déjà intégré au § 4.3 : champ propriétaire
facultatif et conditionné à une attestation d'accord, option « sans me citer »
proposée en premier, mention de l'origine dès le premier appel, droit d'opposition
immédiat, durées de conservation définies (24 mois pour une opportunité sans suite),
registre des traitements et politique de confidentialité **rédigés avant la première
collecte**.

Nuance importante par rapport aux sites frères : ceux-ci ne stockent **rien** (tout
en `mailto:` ou par téléphone). Dès qu'on ouvre un formulaire et une base, on sort
de ce confort. C'est la contrepartie de l'espace personnel.

### 9.4 Anonymat du gardien

Tous poseront la question. **Recommandation : le nom du gardien n'est jamais
communiqué au propriétaire sans son accord explicite, opportunité par opportunité.**
Attention : c'est en tension avec l'obligation de citer l'origine dès le premier
appel (article 5 de la convention étudiants). Les deux se concilient si le gardien
choisit lui-même, au moment du partage, entre « citez-moi » et « ne me citez pas » —
et si, dans le second cas, on renonce simplement à utiliser des coordonnées
transmises par lui. **C'est exactement pourquoi l'écran 3 est construit ainsi.**

### 9.5 À confirmer

- **La position de BSK Immobilier** sur les apporteurs d'affaires — déjà signalée
  comme à confirmer pour etudiants.idf.immo, et cette fois la cible est une
  profession organisée.
- **L'écart 1 000 € (gardiens) / 850 € (étudiants)** : à assumer explicitement
  (l'information d'un gardien est plus qualifiée et récurrente) ou à aligner. Les
  deux sites étant publics, quelqu'un fera le rapprochement.
- **Une prime intermédiaire au mandat**, comme les 50 € étudiants ? Elle entretient
  la motivation pendant les longs mois entre le partage et l'acte. Mais elle
  rémunère un acte antérieur à la vente : c'est le point que la relecture juridique
  doit examiner.

---

## 10. Faisabilité technique et phasage

Toute la famille `.immo` est faite de sites statiques (un `index.html`, GitHub
Pages, aucun stockage). Le brief demande comptes, statuts et primes : **cela exige
une base de données et un backend.** Deux natures de projet à ne pas mélanger dans
une même livraison.

> **Arbitrage du 13 août 2026 : l'espace personnel est livré dès le lancement.**
> Les étapes 1 à 3 ci-dessous fusionnent donc en une seule mise en ligne, de
> l'ordre de 5 à 6 semaines. Le raisonnement qui justifie ce choix : ce qui
> déclenche le *deuxième* partage d'un gardien, c'est de voir le premier avancer
> et de voir un montant s'afficher. Dans ce modèle, l'espace personnel n'est pas
> un confort, c'est le moteur de rétention — donc c'est le produit.
>
> **La conséquence à ne pas sous-estimer : le back-office part en même temps.** Un
> statut n'existe que si quelqu'un le fait avancer. Un espace personnel qui
> affiche « Reçue » pendant six mois est pire que pas d'espace du tout — il
> transforme une promesse en preuve d'abandon. Le back-office doit donc être
> volontairement minimal : une liste, un statut qui se change d'un geste, la
> notification qui part toute seule.
>
> **Étape 0, livrable immédiat :** le site public complet, en statique, avec le
> formulaire fonctionnel transmis par `mailto:` — comme le reste de la famille.
> Il permet de commencer à distribuer les QR codes et à recueillir de vraies
> opportunités pendant que la partie applicative se construit.

### Étape 1 — Le site et la collecte (1 à 2 semaines)

Site statique complet dans le style de la famille : homepage, comment ça marche,
la prime, FAQ, charte, pages départementales, mentions, conditions. Formulaire en
3 écrans. Suivi accessible par **lien unique** reçu par SMS, **sans compte**.
Hébergement GitHub Pages + une seule fonction serveur pour recevoir le formulaire
et envoyer le SMS d'accusé.

**Cette étape suffit à lancer le réseau et à vérifier que des gardiens partagent
réellement.** Tant que ce n'est pas vérifié, construire l'espace personnel serait
prématuré.

### Étape 2 — L'espace personnel (2 à 3 semaines)

Comptes par code SMS, tableau de bord, frise des statuts, historique, primes.
Base Postgres avec authentification et isolation des données par ligne (Supabase
ou équivalent) : il faut une solution qui gère l'authentification par SMS sans
serveur à administrer.

### Étape 3 — Back-office et rapprochement (2 semaines)

File de qualification, fiche opportunité, rattachement aux ventes, **contrôle de
rapprochement automatique** (§ 5.5), suivi des primes.

### Étape 4 — Le réseau

Parrainage entre gardiens, pages villes, ouverture à d'autres conseillers avec
routage par secteur.

### Contraintes héritées de la famille, non négociables

- **Dépôt séparé** `gardiens-idf-immo`, CNAME `gardiens.idf.immo`, enregistrement
  DNS chez Gandi vers `mariecelineetave-source.github.io.`
- **Contact : `contact@idf.immo` uniquement** et **06 60 98 92 92**. Jamais
  `contact@gardiens.idf.immo`, qui n'existe pas.
- **Aucune donnée personnelle dans le dépôt** — il est public. Pas un nom de
  résidence, pas une coordonnée.
- Vérification de l'équilibre des balises HTML avant chaque commit.
- Ne jamais écrire « minimum » ni « sans minimum » : la promesse se formule en
  positif.
- Aucun chiffre ni référence juridique inventés.
- Le mot **« signalement » n'apparaît nulle part** — ni dans les textes, ni dans les
  URLs, ni dans les `alt`, ni dans les noms de classes CSS, ni dans la base.

---

## 11. Acquisition — le site ne suffira pas

Une plateforme de réseau sans gardiens est une coquille. Le site est le point
d'arrivée ; il faut prévoir les chemins qui y mènent, dès l'étape 1. Le dépôt
étudiants a déjà tout l'outillage (générateur de QR code écrit à la main, visuel
story 1080×1920, affiche A4, textes prêts à coller) : **c'est réutilisable tel
quel**, avec un habillage différent.

- **QR code sur une carte format loge**, déposée en main propre — le canal
  principal. Il doit ouvrir directement `/partager`.
- **Parrainage entre gardiens** : le bouche-à-oreille entre loges d'un même secteur
  est le moteur le plus puissant du modèle. Comme chez les étudiants, **le partage
  du site n'est jamais rémunéré** — garde-fou anti-pyramide, à écrire sur le site,
  dans les mentions et dans la convention.
- **Syndics et conseils syndicaux** : à approcher en transparence, jamais dans leur
  dos (§ 3).
- **Groupes professionnels de gardiens en ligne**, en se présentant pour ce qu'on est.

Indicateurs à suivre : gardiens actifs, opportunités par gardien et par mois, taux
de qualification, taux de mandat, délai partage → mandat, primes versées. Le seul
qui compte vraiment la première année : **le nombre de gardiens qui partagent une
deuxième opportunité.**

---

## 12. Décisions à arbitrer avant de coder

**Bloquantes** — elles changent les textes du site :

1. **Le plafond de ventes primées par an** (§ 9.2). C'est la décision la plus
   structurante du projet.
2. **Formulaire en ligne, ou téléphone comme chez les étudiants ?** Le formulaire
   convertit mieux mais fait sortir la famille de son modèle « aucune donnée
   stockée ». *Recommandation : formulaire, avec l'option « sans me citer ».*
3. **Prime intermédiaire au mandat, oui ou non ?** Et **l'écart avec les 850 €
   étudiants** : assumé ou aligné ?
4. **Position de BSK Immobilier** sur ce réseau.

**Structurantes** — elles changent le produit :

5. **Espace personnel dès le lancement, ou suivi par lien unique d'abord ?**
   *Recommandation : lien unique d'abord.*
6. **Fenêtre d'attribution : 24 mois ?** *Recommandation : oui.*
7. **Deux gardiens sur le même bien : premier arrivé, ou partage ?**
8. **Prime due si un autre conseiller réalise la vente ?** *Recommandation : oui.*
9. **Le nom du gardien est-il communiqué au propriétaire ?** *Recommandation :
   jamais sans son accord, au cas par cas.*

**Intendance :**

10. Création du dépôt `gardiens-idf-immo` et du CNAME chez Gandi.
11. Relecture de la convention transposée par un juriste avant la première signature.
