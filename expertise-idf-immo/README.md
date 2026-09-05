# expertise.idf.immo

Site du **cabinet d'expertise immobilière en valeur vénale** de Marie-Céline
Etave, en **Île-de-France**.

Destiné à être mis en ligne sur **https://expertise.idf.immo** (GitHub Pages,
domaine personnalisé — voir « Mise en ligne » plus bas).

> **Ce dossier est un projet autonome.** Il a été développé dans le dépôt
> `antony-immo`, sur la branche `claude/expertise-idf-immo-f6el79`, faute d'un
> dépôt dédié au moment de sa création. **Il ne doit pas être fusionné dans la
> branche `main` d'antony-immo** : `main` publie antony.immo, et ces fichiers
> s'y retrouveraient servis sous `https://antony.immo/expertise-idf-immo/`.
> La destination normale est un dépôt à lui, `expertise-idf-immo`, dans lequel
> le contenu de ce dossier devient la racine.

## Ce que c'est, ce que ce n'est pas

- Un site **spécialisé dans l'expertise en valeur vénale** : succession,
  divorce, donation, partage, rachat de soulte, IFI, indivision, litige,
  garantie bancaire. Pas un site d'agence immobilière.
- Il reprend **la page Expertise de paris7e.immo comme base éditoriale** et
  **la charte graphique de paris7e.immo à l'identique** (bleu marine `#0E1E33`,
  or `#A9814A`, Fraunces + Archivo, logo `logo-mce.png`).
- **Il n'appartient pas à la famille `idf.immo`** malgré son domaine. La famille
  `idf.immo`, ce sont les réseaux de prescripteurs et leur socle
  (`gardiens`, `etudiants`, `associations`, `nounous`, `pros`, `app`). Ce site-ci
  est, comme `paris7e.immo`, `antony.immo` et `cse.immo`, un site de
  Marie-Céline elle-même : pas de prescripteurs, pas de compte dans la base
  commune, **jamais branché sur la Supabase de la famille**.

## Contenu

| Fichier / dossier | Rôle |
|---|---|
| `index.html` | Accueil |
| `pourquoi-une-expertise/` | Estimation ou expertise : la différence |
| `methode/` | Le déroulement d'une mission, en cinq étapes |
| `professionnels/` | Avocats, notaires, professionnels du patrimoine |
| `tarif/` | 1 190 € net — ce qui est compris, ce qui fait l'objet d'un devis |
| `a-propos/` | Marie-Céline Etave |
| `contact/` | Formulaire de demande d'expertise |
| `faq/` | Douze questions fréquentes (avec données structurées `FAQPage`) |
| `secteurs/` | Les huit départements franciliens |
| `expertise-*/` | Les huit pages « situation » |
| `mentions-legales/`, `confidentialite/` | Pages légales |
| `signature-mail/` | Trois signatures de courriel prêtes à coller (Proton Mail). Page-outil, en `noindex` et exclue du sitemap |
| `404.html` | Page d'erreur |
| `assets/site.css`, `assets/site.js` | La feuille de style et le script, uniques et partagés |
| `images/` | Logo, monogramme, icônes, portrait — copiés de paris7e.immo |
| `sitemap.xml`, `robots.txt`, `CNAME` | Référencement et domaine |
| `tools/verifie_site.py` | Contrôle d'intégrité avant publication |

Chaque page est un fichier HTML complet et modifiable à la main. Il n'y a ni
générateur, ni dépendance, ni bibliothèque externe : seules les polices sont
chargées depuis Google Fonts.

## Avant tout commit

```bash
python3 tools/verifie_site.py
```

Le script doit renvoyer 0. Il contrôle notamment : l'équilibre des balises, un
seul `<h1>` par page, l'unicité des `title` et des `meta description`, la
justesse des `canonical`, la validité de **tous** les liens internes, les
dimensions réelles des images, la cohérence du téléphone et de l'e-mail, la
présence des balises Open Graph, l'exhaustivité du `sitemap.xml`, et l'absence
de formulations juridiquement trop affirmatives (« fait foi », « opposable »,
« assermenté »…).

## Formulaire

Le site n'a **pas de serveur**. Le formulaire de `contact/` ouvre la messagerie
du visiteur avec un message pré-rempli (`mailto:`). Aucune donnée n'est
enregistrée — c'est ce que dit la page `confidentialite/`. Si un formulaire
serveur est mis en place un jour, cette page doit être réécrite en conséquence.

## Mise en ligne

**GitHub Pages** (Settings → Pages du dépôt qui héberge ces fichiers) : source
`Deploy from a branch`, branche `main`, dossier `/ (root)`, domaine personnalisé
`expertise.idf.immo`, *Enforce HTTPS* activé. Le fichier `CNAME` est déjà là.

**DNS chez le registrar du domaine `idf.immo`** — un seul enregistrement à
ajouter dans la zone, les autres sous-domaines n'y touchent pas :

```
expertise   CNAME   mariecelineetave-source.github.io.
```

(avec le point final). Ne **pas** utiliser d'enregistrements `A` : ceux-ci ne
servent qu'aux domaines racine. Les sous-domaines existants — `gardiens`,
`etudiants`, `associations`, `nounous`, `app` — ne sont pas concernés.

**Domaines de repli éventuels** (`expertises.idf.immo`, `valeur.idf.immo`,
`valeurvenale.idf.immo`) : ils doivent **rediriger** vers expertise.idf.immo, et
non héberger une copie du site. Le plus simple est une redirection web (301) au
niveau du registrar. Ne jamais publier quatre fois le même contenu : Google
sanctionne, et les quatre copies divergent au premier changement.

## Adresse e-mail et délivrabilité

**Arbitré par Marie-Céline le 5 septembre 2026 :**

- adresse : **`marieceline.expertise@idf.immo`** ;
- nom d'affichage : **`Marie-Céline Etave | Expertise IDF`** — à régler dans
  Proton, adresse par adresse. Le nom d'abord, la marque ensuite : c'est ce que
  le destinataire lit en tête de sa boîte de réception.

Cette adresse figure sur tout le site (contact, formulaire, mentions légales,
confidentialité, données structurées) et dans les trois signatures de courriel.
`tools/verifie_site.py` refuse toute autre adresse.

### Avertissement : `idf.immo` est un domaine partagé

Le courrier passe par le domaine **racine**, commun aux sites de réseau
(`gardiens`, `etudiants`, `associations`, `nounous`, `app`). Deux conséquences :

1. **Avant de déclarer le domaine chez Proton**, vérifier qu'aucune adresse
   `@idf.immo` n'existe déjà ailleurs. Changer les enregistrements MX la
   couperait, et un SPF limité à Proton ferait tomber en indésirable tout ce qui
   envoie depuis un autre service avec ce domaine.
2. La réputation d'envoi est **commune**. Si un site de réseau envoie un jour en
   nombre et récolte des plaintes, le courrier d'expertise en pâtit. Un
   sous-domaine dédié (`@expertise.idf.immo`) isolerait cette réputation — c'est
   le repli si le problème se pose.

### Ce qui décide vraiment du classement en indésirables

Le nom avant l'arobase n'y est presque pour rien. Ce qui compte :

1. **SPF, DKIM et DMARC**, sans exception. Proton fournit les enregistrements
   exacts à la déclaration du domaine. **Sans DKIM, Gmail et Outlook classent en
   indésirable ou refusent** — c'est leur exigence depuis 2024.
2. Un **DMARC** au départ permissif, puis resserré :
   `v=DMARC1; p=none; rua=mailto:...` pendant deux à quatre semaines, puis
   `p=quarantine`.
3. **Le site doit être en ligne avant les premiers envois.** Une signature qui
   renvoie vers un domaine qui ne résout pas est un signal négatif net.
4. **Montée en charge progressive** : un domaine neuf qui envoie beaucoup d'un
   coup est suspect. Quelques courriels par jour les deux premières semaines.
5. **Jamais d'envoi en nombre depuis cette boîte.** Une campagne vers des études
   notariales se fait avec un outil dédié et un sous-domaine séparé.
6. Objet factuel, pas de capitales ni de points d'exclamation ; peu de liens ;
   pas de pièce jointe au premier courriel à un inconnu (proposer le
   rapport-modèle, l'envoyer sur réponse).
7. Vérifier la configuration sur `mail-tester.com` avant de commencer : viser 10/10.

Le domaine personnalisé Proton suppose une offre payante — à vérifier dans
l'abonnement en cours, une offre d'entrée de gamme ne couvre parfois qu'un seul
domaine.

## Deux sites, deux périmètres

`paris7e.immo` reste le site de l'activité immobilière locale (7ᵉ
arrondissement). `expertise.idf.immo` est celui de l'expertise en valeur vénale,
dans toute l'Île-de-France. Les deux sites sont **indépendants** : ne jamais
recopier des contenus locaux de l'un vers l'autre. Le lien entre les deux se
limite à une mention discrète en pied de page ici, et — le jour où Marie-Céline
le décide — à un lien depuis la page Expertise de paris7e.immo vers ici.
