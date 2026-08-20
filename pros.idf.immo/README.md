# pros.idf.immo

Le réseau des commerçants, artisans et professionnels de proximité d'Île-de-France.

> **Le principe :** un commerçant, un artisan, un coiffeur, un déménageur voient
> passer leur quartier toute la journée. Quand un client envisage de vendre, ils
> partagent l'opportunité. Ils ne vendent rien, ne font pas visiter, ne donnent
> aucun prix — ils transmettent une information.
> **Si la vente se réalise, ils reçoivent 1 000 € TTC.**

Site jumeau de [gardiens.idf.immo](https://gardiens.idf.immo) : même mécanique,
même prime, mêmes règles ; seuls les textes changent, parce que le métier change.

## Ce qui est fait

Le site public, complet et fonctionnel en statique : accueil, formulaire de
partage en 3 écrans (autocomplétion sur la Base Adresse Nationale, contrôle
Île-de-France, brouillon local, envoi par FormSubmit avec accusé de réception),
pages de contenu, règlement du programme, mentions légales, 8 pages
départementales, et le site en trois langues (français, portugais, anglais).

Aucune dépendance en dehors des polices Google Fonts. Le site reste lisible et
les liens d'appel fonctionnent sans JavaScript.

## ⚠️ Ce qu'il reste à faire avant d'ouvrir le réseau

1. **Publier le site dans son propre dépôt.** Il est pour l'instant écrit dans
   le dossier `pros.idf.immo/` du dépôt `antony-immo`, faute d'accès à un autre
   dépôt. GitHub Pages n'accepte qu'un domaine par dépôt : il lui faut le sien.
   Voir « Mise en ligne » ci-dessous.
2. **Vérifier l'activation FormSubmit** pour `contact@idf.immo` : sans elle, le
   formulaire n'envoie rien. Elle a déjà été faite pour gardiens.idf.immo ; à
   confirmer depuis ce site avec un envoi de test.
3. **L'espace personnel** (`mon-espace.html`) attend un projet Supabase propre à
   `pros.idf.immo`. Tant que `base/config.js` est vide, la page l'annonce
   franchement au visiteur au lieu de tomber en panne.

## Mise en ligne

| | |
|---|---|
| Adresse | https://pros.idf.immo |
| Dépôt visé | `mariecelineetave-source/pros-idf-immo` (branche `main`, racine) |
| DNS | enregistrement **CNAME** `pros` → `mariecelineetave-source.github.io.` chez Gandi |

Pour transplanter le site : créer le dépôt, y copier le **contenu** du dossier
`pros.idf.immo/` (le `CNAME` est déjà dedans), activer GitHub Pages sur `main`,
puis ajouter l'enregistrement DNS.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil — 8 blocs, un seul objectif : « Partager une opportunité » |
| `partager.html` | Le formulaire en 3 écrans (CSS et JS inclus) |
| `comment-ca-marche.html` | Le parcours en 5 étapes |
| `la-prime.html` | Montant, versement, facture, exclusions, fiscalité |
| `vos-questions.html` | FAQ — le droit, les clients, le fichier clients, la facture, les impôts |
| `notre-engagement.html` | La charte du réseau |
| `conditions-de-la-prime.html` | Le règlement complet |
| `mentions-legales.html` | Éditeur, hébergeur, RGPD |
| `mon-espace.html`, `base/` | L'espace personnel (en attente d'une base) |
| `ile-de-france/*.html` | 8 pages départementales (référencement local) |
| `pt/`, `en/` | Les accueils traduits (référencement) |
| `i18n.js`, `dico-*.js` | Le multilingue des pages de contenu |
| `traductions.js`, `traductions-juridiques.js` | Le multilingue du formulaire et des pages juridiques |
| `styles.css`, `site.js` | Feuille commune, barre d'action mobile |
| `outils/verifier.py` | Contrôle avant commit : balises, JSON-LD, traductions |
| `CLAUDE.md` | Consignes pour les sessions automatisées |

## Avant de modifier

Lire `CLAUDE.md`, puis lancer `python3 outils/verifier.py`. En particulier : le
mot « signalement » ne doit apparaître nulle part, l'or est réservé à la prime,
l'adresse de contact est `contact@idf.immo`, et les règles du programme
(1 000 €, 15 jours, 24 mois, pas de plafond) sont écrites en dur dans plusieurs
pages — si l'une change, la changer partout.
