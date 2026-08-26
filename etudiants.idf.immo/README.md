# etudiants.idf.immo

Site du programme de recommandation étudiant de Marie-Céline Etave, pour l'Île-de-France.

**Le deal :** 50 € à la signature d'un mandat exclusif (diagnostics réalisés),
800 € à la signature de l'acte de vente chez le notaire.

> ✅ **Le site est en ligne** sur https://etudiants.idf.immo
>
> Il est publié depuis le dépôt **`mariecelineetave-source/etudiants-idf-immo`** (GitHub
> Pages + enregistrement CNAME `etudiants` chez Gandi). Ce dossier-ci en est la copie de
> travail : toute modification doit être reportée dans les deux dépôts.
> `antony.immo` n'est pas concerné et reste strictement inchangé.

---

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Le site entier — HTML, CSS et JS dans un seul fichier |
| `mentions-legales.html` | Mentions légales, RGPD et **règlement complet du programme** |
| `convention-indicateur-affaires.md` | Modèle de convention à faire signer **avant tout versement** |
| `CNAME` | Domaine personnalisé, à utiliser une fois le site dans son propre dépôt |
| `robots.txt`, `sitemap.xml` | Référencement |

---

## Ce que fait le site

**Le programme repose sur un appel téléphonique.** L'étudiant qui connaît un vendeur
demande d'abord son accord à cette personne, puis téléphone à Marie-Céline pour lui
transmettre ses coordonnées. Le vendeur ne passe jamais par le site.

Le site sert donc à trois choses :

1. **Convaincre l'étudiant** que le programme est réel et simple (le deal, les étapes,
   le simulateur de gains, la FAQ).
2. **Le mettre en relation par téléphone** : bouton d'appel, envoi d'un SMS pour être
   rappelé, et surtout **enregistrement du numéro dans ses contacts** (fiche vCard). Ce
   dernier point est le plus important : un étudiant ne connaît pas forcément un vendeur
   aujourd'hui, mais peut-être dans six mois.
3. **Lui donner les mots** : la phrase exacte pour demander l'accord du vendeur, et la
   liste de ce qu'il devra dire au téléphone. C'est le vrai blocage, pas la technique.

**Le QR code sert au bouche-à-oreille entre étudiants**, pas à toucher les vendeurs. Il
pointe vers l'adresse publique du site, sans code personnel ni suivi. Il est accompagné
d'un visuel story 1080×1920, d'une affiche A4 pour les panneaux de campus, et de textes
prêts à coller.

**Aucune donnée ne circule par le site.** Il ne comporte aucun champ de saisie, aucun
formulaire, aucun stockage. Tout se joue au téléphone, directement.

### Le point juridique central

Un étudiant transmet le numéro d'un tiers. C'est encadré : la personne doit avoir été
informée et avoir donné son accord. Le site en fait une règle affichée, avec la phrase à
employer. Au premier appel, Marie-Céline cite le prénom de l'étudiant et indique d'où
vient le numéro, conformément à la doctrine CNIL sur le parrainage.

### Le garde-fou anti-pyramide

Partager le site à d'autres étudiants n'est **jamais rémunéré**. Seule une vente réelle
ouvre droit à une prime. C'est écrit sur le site, dans les mentions légales et dans la
convention.

### Pourquoi ces choix « jeunes »

Recherches d'août 2026 : Instagram touche 84 % des 16-25 ans en France, TikTok domine le
temps passé, WhatsApp reste la messagerie principale — d'où le visuel story vertical, les
textes prêts à coller et le partage natif. L'explication est un format vertical, muet et
sous-titré, animé en CSS/SVG (aucune vidéo à héberger).

## Où le site est publié

| | |
|---|---|
| Adresse | https://etudiants.idf.immo |
| Dépôt publié | `mariecelineetave-source/etudiants-idf-immo` (branche `main`, racine) |
| DNS | enregistrement **CNAME** `etudiants` → `mariecelineetave-source.github.io.` chez Gandi |
| HTTPS | actif (redirection automatique depuis `http://`) |

GitHub Pages n'acceptant qu'un domaine par dépôt, ce site ne pouvait pas être publié
depuis le dépôt `antony-immo` : d'où un dépôt séparé.

> Le domaine accentué `étudiants.idf.immo` s'écrit `xn--tudiants-c1a.idf.immo` en DNS et
> se copie mal dans les messages. Le site utilise partout la forme sans accent. Pour
> l'accentué, le plus propre est une **redirection** vers `etudiants.idf.immo`.

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
4. **Le délai de versement (15 jours)** et la **durée de validité d'une recommandation
   (12 mois à compter de l'appel)** : valeurs proposées, à ajuster si besoin.
5. **Faire relire la convention** (`convention-indicateur-affaires.md`) par un juriste
   avant la première signature.

### Réglé

- **L'adresse de contact** est `contact@idf.immo` (confirmée le 9 août 2026). Elle figure
  dans les données structurées, les mentions légales et la fiche contact `.vcf`.
- **Le numéro de téléphone `06 60 98 92 92`** est désormais la voie de contact principale :
  il est en gros sur la page, dans la barre fixe, dans les boutons d'appel et de SMS, dans
  la fiche contact et sur l'affiche. Il est piloté par la variable `TEL` en tête de script.

---

## Remplacer l'animation par une vraie vidéo

L'explication animée est dans `index.html`, dans le bloc `<div class="phone" id="phone">`
(quatre `<div class="scene">` : le signal, l'accord, l'appel, les primes). Pour mettre une vraie vidéo verticale à la place,
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
  Il a été validé en générant 200 liens aléatoires relus par un décodeur QR indépendant
  (OpenCV) : 200/200, accents compris. Le QR affiché et ceux des visuels téléchargés ont
  été scannés et vérifiés.
- **Accessibilité** : contrastes vérifiés, focus visibles, `prefers-reduced-motion`
  respecté (l'animation s'arrête et affiche une image fixe), animation contrôlable au
  clavier, aucun texte porté uniquement par la couleur.
- **Sans JavaScript**, la page reste entièrement lisible et les boutons d'appel
  fonctionnent : seuls le QR code, la fiche contact et les visuels nécessitent JS.
- Le texte dessiné sur les visuels (story, affiche) **s'ajuste automatiquement** à la
  largeur disponible : changer une formulation ne peut pas faire déborder une image.
- La fiche contact (`.vcf`) est générée dans le navigateur, sans dépendance.

## Le formulaire passe par FormSubmit — activation PAR SITE

`partager.html` envoie l'opportunité à `contact@idf.immo` via FormSubmit. Ce
service exige une **activation à la première soumission de chaque site** : il
envoie un e-mail contenant un lien « Activate Form », et tant que personne n'a
cliqué, **rien ne part**.

**Fait pour ce site le 22 août 2026** — vérifié : « Form Activated ».

Aucun des cinq sites de la famille n'était activé avant cette date : depuis
leur mise en ligne, aucun formulaire n'aurait transmis quoi que ce soit. Un
nouveau site devra refaire cette activation, et son premier envoi de test
échouera : c'est normal, il déclenche justement l'e-mail.

FormSubmit est **injoignable depuis les sessions Claude** (le proxy réseau le
bloque) : ce test ne peut être fait que depuis un vrai navigateur.
