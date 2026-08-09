# etudiants.idf.immo

Site du programme de recommandation étudiant de Marie-Céline Etave, pour l'Île-de-France.

**Le deal :** 50 € à la signature d'un mandat exclusif (diagnostics réalisés),
800 € à la signature de l'acte de vente chez le notaire.

> ⚠️ **Ce site n'est pas en ligne.** Il est pour l'instant uniquement dans ce dossier, sur
> la branche de travail. Rien n'a été publié, et **aucun autre site n'a été touché** :
> `antony.immo` (les fichiers à la racine du dépôt) est strictement inchangé.

---

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Le site entier — HTML, CSS et JS dans un seul fichier, comme antony.immo |
| `mentions-legales.html` | Mentions légales, RGPD et **règlement complet du programme** |
| `convention-indicateur-affaires.md` | Modèle de convention à faire signer **avant tout versement** |
| `CNAME` | Domaine personnalisé, à utiliser une fois le site dans son propre dépôt |
| `robots.txt`, `sitemap.xml` | Référencement |

---

## Ce que fait le site

**Deux visages, une seule page.**

- **Par défaut** (`etudiants.idf.immo`) : la page s'adresse à l'étudiant. Le deal, les
  étapes, le générateur de kit, le simulateur de gains, les règles, la FAQ.
- **Avec un code** (`etudiants.idf.immo/?r=LEA4K2`) : la page bascule automatiquement en
  **mode vendeur**. Un bandeau annonce « Léa vous a envoyé ici », et le contenu devient
  une page d'estimation classique. C'est ce que voit la personne qui scanne le QR code —
  elle ne tombe pas sur une page qui parle de primes étudiantes.

**Le kit de parrainage.** L'étudiant saisit son prénom et son contact, et obtient
instantanément :

- un **code** personnel (prénom + 3 caractères de contrôle) et son **lien** ;
- un **QR code** généré dans le navigateur ;
- des **textes prêts à coller** (story, groupe WhatsApp familial, message direct) ;
- le partage natif (`navigator.share`), WhatsApp, SMS, copie ;
- trois téléchargements : **QR en PNG**, **visuel story 1080×1920**, **affiche A4** à
  imprimer et punaiser sur un campus.

**Aucune donnée ne sort du téléphone.** Tout est calculé en local ; la seule transmission
est le `mailto:` que l'étudiant déclenche lui-même pour enregistrer son code. C'est
volontaire : c'est la seule manière d'être honnête sur la vie privée dans un programme qui
consiste, par nature, à parler d'autres personnes.

### Pourquoi ces choix « jeunes »

Ils ne sortent pas de nulle part — recherches d'août 2026 :

- **Instagram** est utilisé par 84 % des 16-25 ans en France, **TikTok** domine le temps
  passé (≈ 38 h/mois), **WhatsApp** reste la messagerie principale.
  → d'où le visuel story vertical prêt à poster, les textes à coller, et le partage
  natif qui ouvre la feuille de partage du téléphone (Instagram et TikTok n'ayant pas
  d'URL de partage web fiable, on passe par « copier » + le partage système).
- Le schéma qui marche pour un programme de recommandation en 2026 :
  **QR code → inscription immédiate → offre à partager**. C'est exactement le parcours
  du site.
- L'explication est un **format vertical, muet, sous-titré, en boucle** — comme un reel.
  Il est ici animé en CSS/SVG (aucune vidéo à héberger, aucun poids, lisible sans son).
  Voir plus bas si vous voulez le remplacer par une vraie vidéo.

---

## Mettre le site en ligne

Le site est **prêt**, mais il ne peut pas être publié depuis ce dépôt : GitHub Pages
n'accepte **qu'un seul domaine par dépôt**, et celui-ci est déjà pris par `antony.immo`
(fichier `CNAME` à la racine). Il faut donc :

1. **Créer un nouveau dépôt** GitHub, par exemple `etudiants-idf-immo`.
2. Y copier le **contenu** de ce dossier (les fichiers à la racine du nouveau dépôt, pas
   dans un sous-dossier).
3. Activer **GitHub Pages** sur la branche `main` de ce nouveau dépôt.
4. Chez le registrar du domaine `idf.immo`, ajouter un enregistrement **CNAME** :
   `etudiants` → `<compte-github>.github.io`.
5. Dans les réglages Pages du nouveau dépôt, renseigner le domaine
   `etudiants.idf.immo` et cocher **Enforce HTTPS**.

Le fichier `CNAME` est déjà présent dans ce dossier : il sera au bon endroit dès que le
contenu sera à la racine du nouveau dépôt.

> Le domaine accentué `étudiants.idf.immo` fonctionne aussi (IDN), mais il s'écrit
> `xn--tudiants-c1a.idf.immo` en DNS et se copie mal dans les messages. Le site utilise
> partout la forme sans accent. Si vous tenez à l'accentué, le plus propre est de le faire
> **rediriger** vers `etudiants.idf.immo`.

---

## À valider avant mise en ligne

Ces points relèvent d'une décision commerciale ou juridique, pas d'un choix technique.
Ils sont **écrits en dur dans le site**, donc à trancher avant publication.

1. **L'accord de BSK Immobilier.** Marie-Céline est agent commercial du réseau : la prime
   sort de sa commission, mais le réseau a probablement une position sur les apporteurs
   d'affaires. À confirmer avant de communiquer.
2. **La limite de 3 ventes primées par personne et par an.** C'est une valeur que j'ai
   fixée pour préserver le caractère *occasionnel* de l'activité — au-delà, l'apport
   d'affaires régulier exige une carte professionnelle. Le principe d'un plafond est
   nécessaire ; le chiffre exact vous appartient. Il apparaît dans `index.html`
   (section « Les règles » + simulateur), dans `mentions-legales.html` (point 8) et dans
   la convention (article 2).
3. **Les 50 € versés au mandat.** Un indicateur d'affaires est classiquement rémunéré
   *après* la transaction. Verser 50 € dès le mandat est votre choix et reste licite,
   mais c'est précisément le point à faire relire, car il rémunère un acte antérieur à la
   vente. Il est encadré dans la convention (article 3).
4. **Le délai de versement (15 jours)** et la **validité du code (12 mois)** : valeurs
   proposées, à ajuster si besoin.
5. **Faire relire la convention** (`convention-indicateur-affaires.md`) par un juriste
   avant la première signature.

### Réglé

- **L'adresse de contact** est `contact@idf.immo` (confirmée le 9 août 2026). Elle figure
  dans `index.html` (variable `MAIL`, données structurées, pied de page, bouton
  d'estimation du mode vendeur) et dans `mentions-legales.html`. Pour en changer, c'est
  la variable `MAIL` en tête de script qui pilote tous les liens générés — le reste est
  du texte affiché.
  **Vérifier que la boîte `contact@idf.immo` est bien créée et relevée avant la mise en
  ligne** : c'est la seule voie de contact du site, tous les boutons pointent dessus.

---

## Remplacer l'animation par une vraie vidéo

L'explication animée est dans `index.html`, dans le bloc `<div class="phone" id="phone">`
(quatre `<div class="scene">`). Pour mettre une vraie vidéo verticale à la place,
remplacer tout le contenu de ce bloc par :

```html
<video src="explication.mp4" poster="explication.jpg"
       autoplay muted loop playsinline
       style="width:100%;height:100%;object-fit:cover"></video>
```

Format conseillé : 1080×1920, moins de 30 secondes, **sous-titres incrustés** (elle sera
regardée sans le son), moins de 5 Mo. Le fichier se place dans le même dossier.

---

## Notes techniques

- **Aucune dépendance externe** en dehors des polices Google Fonts. Le générateur de QR
  code (mode octet, correction M, versions 1 à 10) est écrit à la main dans le fichier :
  pas de CDN, pas de service tiers qui verrait passer les liens.
  Il a été validé en générant 200 liens de parrainage aléatoires et en les faisant
  relire par un décodeur QR indépendant (OpenCV) : 200/200, accents compris.
- **Accessibilité** : contrastes vérifiés, focus visibles, `prefers-reduced-motion`
  respecté (l'animation s'arrête et affiche une image fixe), animation contrôlable au
  clavier, aucun texte porté uniquement par la couleur.
- **Sans JavaScript**, la page reste entièrement lisible : seuls le générateur de kit et
  le mode vendeur nécessitent JS.
- Le code de recommandation est **déterministe** : le même prénom et le même contact
  redonnent toujours le même code. Un étudiant qui revient sur le site retrouve son kit
  (via `localStorage`) sans avoir à s'inscrire à nouveau.
