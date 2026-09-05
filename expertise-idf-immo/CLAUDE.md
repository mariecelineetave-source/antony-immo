# expertise.idf.immo — consignes pour les sessions automatisées

Site du cabinet d'**expertise immobilière en valeur vénale** de Marie-Céline
Etave, en Île-de-France. Destiné à `https://expertise.idf.immo` (GitHub Pages).

## Ce site n'appartient PAS à la famille `idf.immo`

Malgré son domaine. La famille `idf.immo`, ce sont **les réseaux de
prescripteurs et leur socle** : `gardiens.idf.immo`, `etudiants.idf.immo`,
`associations.idf.immo`, `nounous.idf.immo`, `pros.idf.immo` et `app.idf.immo`
— la base commune et le back-office.

`expertise.idf.immo` est, comme `paris7e.immo`, `antony.immo` et `cse.immo`, un
**site de Marie-Céline elle-même** : vitrine et offre commerciale, sans
prescripteurs et sans compte dans la base commune. La charte graphique est
partagée avec la famille, l'architecture ne l'est pas.

Conséquences : ne jamais brancher ce site sur la base Supabase de la famille, ne
jamais le citer comme membre de la famille, et ne jamais recopier ici le contenu
d'un site de réseau (ni l'inverse).

## Positionnement — à ne pas dévier

- Marie-Céline y est présentée comme **experte immobilière spécialisée en valeur
  vénale**, pas comme une agence qui propose accessoirement des expertises.
- Un seul titre autorisé : **« Expert immobilier en valeur vénale »**. **Ne
  jamais ajouter** un diplôme, un ordre, une certification, un agrément, une
  assurance, une carte, une adhésion ou un organisme professionnel qui ne
  figurerait pas déjà dans le dépôt : cela relève d'une validation explicite de
  Marie-Céline.
- Paris 7ᵉ peut être mentionné comme implantation, jamais comme périmètre : le
  périmètre, c'est **toute l'Île-de-France**.
- `paris7e.immo` = activité immobilière locale. Ici = expertise en valeur
  vénale. Les deux restent distincts ; ne jamais recopier les contenus locaux de
  l'un vers l'autre. **Ne jamais modifier paris7e.immo, antony.immo, cse.immo ni
  aucun site de la famille depuis ce dépôt.**

## Prudence juridique — contrôlée automatiquement

Une expertise amiable n'a pas de portée juridique automatique. Ne jamais écrire
que le rapport « fait foi », est « opposable », « s'impose au juge », possède
une « force probante », « remplace une expertise judiciaire » ou est
« reconnu par l'administration ». Ne jamais qualifier Marie-Céline d'expert
« judiciaire », « agréé », « certifié » ou « assermenté ».

`tools/verifie_site.py` refuse le commit si l'une de ces expressions apparaît.

Formulations à employer à la place : « rapport écrit et argumenté »,
« expertise indépendante », « valeur documentée », « analyse permettant d'étayer
la valeur retenue », « rapport pouvant être communiqué aux conseils des
parties », « expertise amiable », « analyse susceptible d'être produite dans le
cadre d'un dossier ou d'échanges ».

Sur les pages sensibles, les avertissements suivants doivent rester en place :

- **soulte** : le calcul juridique et financier définitif relève du notaire ou
  de l'avocat ;
- **IFI** : l'expertise ne remplace pas un conseil fiscal ;
- **litige** : une expertise amiable ne se substitue pas à une expertise
  judiciaire ;
- **garantie bancaire** : au client de vérifier les exigences de son
  établissement avant la mission.

## Charte graphique — reprise de paris7e.immo, à l'identique

Valeurs **relevées sur le fichier du logo de Marie-Céline**, pas choisies :

- **Bleu marine `#0E1E33`** (`--ombre`) — bandeaux, en-têtes, pied de page.
- **Or `#A9814A`** (`--or`) — le liseré, toujours **plat**, jamais dégradé.
  `--or-clair #C9A167` et `--or-fonce #8C6A38` ne servent qu'aux petits accents.
- **Le liseré doré se place toujours entre le fond clair et le bleu marine.**
- Typographies : **Fraunces** (titres) et **Archivo** (texte).

Deux règles absolues :

1. **Ne jamais poser `images/logo-mce.png` sur un fond sombre** : son lettrage
   est bleu marine, il y disparaît. Le logo se pose sur blanc ou sur `--craie`.
   Il n'existe pas de version inversée — elle doit être demandée à
   Marie-Céline, jamais fabriquée en recolorisant son fichier.
2. **Les attributs `width` et `height` d'une `<img>` doivent correspondre
   exactement aux pixels du fichier.** `tools/verifie_site.py` le contrôle.

## Le numéro de téléphone — ne jamais le reformater

Le site affiche **07. 656. 75007**, écrit exactement ainsi : deux points, deux
espaces insécables. C'est l'écriture voulue par Marie-Céline (arbitrée le
5 septembre 2026, après un reformatage automatique qu'elle a fait corriger).
Ne jamais le réécrire en `07 65 67 50 07`, en `07 656 75007`, ni sous aucune
autre forme.

En HTML, cela s'écrit `07.&nbsp;656.&nbsp;75007` — les espaces insécables
empêchent le numéro de se couper en fin de ligne sur un téléphone. Les liens
`tel:` et les données structurées portent la forme internationale
`+33765675007`, qui ne s'affiche jamais.

`tools/verifie_site.py` refuse le commit si une autre écriture apparaît, y
compris le numéro d'antony.immo (06 60 98 92 92), qui n'a rien à faire ici.

## Forme des boutons

Les boutons d'action (`.btn` et la barre d'action mobile) sont **arrondis**
(`border-radius:999px`) — demandé par Marie-Céline le 5 septembre 2026. Les
cartes, les encadrés et les champs de formulaire gardent leurs angles à 4 px :
seuls les boutons sont arrondis. C'est le seul écart assumé avec la charte de
paris7e.immo, qui utilise des boutons à angles droits.

## Structure

Chaque page est un fichier HTML complet, modifiable à la main. Une seule feuille
de style (`assets/site.css`) et un seul script (`assets/site.js`), partagés par
toutes les pages. **Aucune bibliothèque externe** : seules les polices viennent
de Google Fonts. Ne pas introduire de framework, de gestionnaire de paquets ni
d'étape de compilation.

Les URL sont des dossiers avec un `index.html` (`/methode/`, `/expertise-ifi/`…).
En ajouter une impose : le fichier, le lien dans le menu de **toutes** les pages,
le `canonical`, et une entrée dans `sitemap.xml`.

`assets/site.js` masque les blocs `.reveal` seulement si la classe `js` est
posée sur `<html>` par le script en-tête. **Ne jamais masquer de contenu par
défaut en CSS** : sans JavaScript, le site doit rester entièrement lisible.

## Avant tout commit — obligatoire

```bash
python3 tools/verifie_site.py
```

Le script doit renvoyer 0. Si une modification le fait échouer, corriger la
page, pas le script — sauf si le contrôle lui-même est devenu faux.

Après toute modification du contenu d'une page publiée, mettre à jour la balise
`<lastmod>` de cette page dans `sitemap.xml` à la date du jour (AAAA-MM-JJ).

## Publication

**Rien n'est publié automatiquement sur ce site.** Toute modification (contenu,
design, textes, tarif) attend une validation explicite de Marie-Céline
(« publie »). Le tarif affiché — **1 190 € net**, TVA non applicable article
293 B du CGI — ne se change jamais sans son accord.

## Divers

- Tout en français. Commits clairs en français.
- Le formulaire n'envoie rien au site : il ouvre la messagerie du visiteur
  (`mailto:`). Si cela change un jour, réécrire `confidentialite/index.html`.
- Ne jamais collecter de coordonnées personnelles dans le dépôt (il est public).
- Ne jamais contacter qui que ce soit.
- Push : `git push -u origin <branche>` ; en cas d'erreur réseau, retenter
  jusqu'à 4 fois (2, 4, 8, 16 s).
