# gardiens.idf.immo

Le réseau des gardiens et gardiennes d'immeubles d'Île-de-France.

> **Le principe :** un gardien connaît les habitants de sa résidence. Quand un
> propriétaire envisage de vendre, il partage l'opportunité. Il ne vend rien, ne
> fait pas visiter, ne donne aucun prix — il transmet une information.
> **Si la vente se réalise, il reçoit 1 000 €.**

## Ce qui est fait

Le site public, complet et fonctionnel en statique : accueil, formulaire de
partage en 3 écrans (autocomplétion sur la Base Adresse Nationale, contrôle
Île-de-France, brouillon local, envoi par `mailto:`), pages de contenu, règlement
du programme, mentions légales et 8 pages départementales.

Aucune dépendance en dehors des polices Google Fonts. Le site reste lisible et les
liens d'appel fonctionnent sans JavaScript.

## Ce qui reste à construire

L'**espace personnel** du gardien (mes opportunités, statuts, primes) et le
**back-office** qui les fait avancer. Ils sont décidés et spécifiés, mais exigent
une base de données : GitHub Pages ne suffit pas.

Le document de référence du produit — parcours, mécanisme d'attribution des
primes, cadre juridique, phasage — est tenu hors du dépôt : celui-ci est public,
et ce document contient des arbitrages internes.

## Mise en ligne

| | |
|---|---|
| Adresse | https://gardiens.idf.immo |
| Dépôt | `mariecelineetave-source/gardiens-idf-immo` (branche `main`, racine) |
| DNS | enregistrement **CNAME** `gardiens` → `mariecelineetave-source.github.io.` chez Gandi |

GitHub Pages n'acceptant qu'un domaine par dépôt, ce site ne peut pas être publié
depuis `antony-immo` : il lui faut son propre dépôt.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil — 6 blocs, un seul objectif : « Partager une opportunité » |
| `partager.html` | Le formulaire en 3 écrans (CSS et JS inclus) |
| `comment-ca-marche.html` | Le parcours en 5 étapes |
| `la-prime.html` | Montant, versement, exclusions, fiscalité |
| `vos-questions.html` | FAQ — le droit, l'employeur, les impôts, l'anonymat |
| `notre-engagement.html` | La charte du réseau |
| `conditions-de-la-prime.html` | Le règlement complet |
| `mentions-legales.html` | Éditeur, hébergeur, RGPD |
| `ile-de-france/*.html` | 8 pages départementales (SEO local) |
| `styles.css`, `site.js` | Feuille commune, barre d'action mobile |
| `CLAUDE.md` | Consignes pour les sessions automatisées |

## Avant de modifier

Lire `CLAUDE.md`. En particulier : le mot « signalement » ne doit apparaître nulle
part, l'or est réservé à la prime, l'adresse de contact est `contact@idf.immo`, et
les règles du programme (1 000 €, 15 jours, 24 mois, pas de plafond) sont écrites
en dur dans plusieurs pages — si l'une change, la changer partout.
