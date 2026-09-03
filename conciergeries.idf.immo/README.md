# conciergeries.idf.immo

Le réseau des conciergeries de location courte durée d'Île-de-France.

> **Le principe :** une conciergerie connaît ses propriétaires mieux que
> quiconque — leur rendement réel, leur exposition réglementaire, le moment où
> un logement cesse de tenir sa promesse. Quand l'un d'eux arbitre son
> patrimoine, elle partage l'opportunité. Elle ne commercialise rien, ne fait
> pas visiter, ne donne aucune valeur — elle transmet une information.
> **Si l'opération se conclut, elle perçoit 10 % des honoraires nets hors
> taxes de la conseillère.**

Même mécanique que [gardiens.idf.immo](https://gardiens.idf.immo),
[nounous.idf.immo](https://nounous.idf.immo) et
[pros.idf.immo](https://pros.idf.immo) ; l'assiette des 10 % est celle
d'[associations.idf.immo](https://associations.idf.immo).

## ⚠️ Rien n'est en ligne

Décidé le 31 août 2026 : le site **ne doit pas être publié pour l'instant**, ni
mis sur GitHub dans son propre dépôt. Il vit dans le dossier
`conciergeries.idf.immo/` de la branche `claude/conciergeries-idf-immo-x53555`
du dépôt `antony-immo` — le même chemin de fabrication qu'ont suivi `pros`,
`nounous`, `etudiants` et `gardiens`.

Pour le regarder en local :

```
python3 -m http.server 8000 --directory conciergeries.idf.immo
```

puis ouvrir `http://localhost:8000`.

## Ce qui est fait

Le site public complet et fonctionnel en statique : accueil avec **calculette
des 10 %**, formulaire de partage en 3 écrans (autocomplétion sur la Base
Adresse Nationale, contrôle Île-de-France, brouillon local, envoi par
FormSubmit avec accusé de réception), sept pages de contenu, règlement du
partenariat en 13 articles, mentions légales.

Et les deux écrans connectés, en **mode démonstration** :

- `mon-espace.html` — le tableau de bord d'une conciergerie : ses opportunités,
  leurs statuts, ses commissions versées et à venir, ce qu'elle doit facturer ;
- `back-office.html` — l'écran de pilotage de Marie-Céline : ce qui attend une
  réponse sous 24 heures, tout le pipeline par statut, les commissions dues, et
  les conciergeries du réseau.

Les deux affichent des données **fictives**, signalées par un bandeau, tant que
`base/config.js` est vide. Voir `base/LISEZMOI.md`.

Aucune dépendance en dehors des polices Google Fonts. Le site reste lisible et
les liens d'appel fonctionnent sans JavaScript.

## Ce qu'il reste à faire avant d'ouvrir le réseau

1. **Relire et faire relire la convention d'apport d'affaires** — le partenaire
   est une société (facture, TVA), et la question du mandat de gestion ne se
   pose sur aucun autre site de la famille.
2. **Activer FormSubmit pour ce site** : l'activation est par site, elle n'a
   pas été faite, et le premier envoi de test échouera — c'est lui qui
   déclenche l'e-mail d'activation. À faire depuis un vrai navigateur : le
   proxy des sessions Claude bloque FormSubmit.
   À noter : contrairement aux cinq autres sites, celui-ci **ne promet aucun
   accusé de réception par e-mail**, parce que FormSubmit ne l'envoie pas dans
   ce montage. L'écran final donne un reçu, à copier ou à imprimer. Voir
   `CLAUDE.md`.
3. **Passer les deux scripts SQL** de `base/` dans le projet Supabase de la
   famille — `correctif-3a-enum.sql` puis `correctif-3.sql` —, puis renseigner
   `base/config.js`. Les deux scripts ont été exécutés pour de vrai sur un
   PostgreSQL 16 monté pour l'occasion (voir `base/LISEZMOI.md`) ; en revanche
   l'appel du navigateur à Supabase n'a pas pu être essayé, le proxy des
   sessions Claude le bloquant.
4. **Trancher les points laissés ouverts**, listés en fin de `CLAUDE.md`.

## La mise en ligne, le jour venu

Trois gestes délibérés, qu'aucune session ne doit faire d'elle-même :

1. créer le dépôt et y déplacer le contenu de ce dossier, à la racine :

```
mariecelineetave-source/conciergeries-idf-immo
```

2. activer GitHub Pages sur `main`, à la racine, HTTPS forcé ;
3. ajouter chez Gandi l'enregistrement **CNAME** :

```
conciergeries
```

```
mariecelineetave-source.github.io.
```

Le fichier `CNAME` est déjà écrit. Il est inerte tant que Pages n'est pas
activé.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil — 10 blocs, dont la calculette des 10 % |
| `partager.html` | Le formulaire en 3 écrans (CSS et JS inclus) |
| `comment-ca-marche.html` | Le parcours en 5 étapes, et les trois missions |
| `la-remuneration.html` | Assiette, calendrier, facturation, TVA, fiscalité |
| `vos-questions.html` | 18 questions — le droit, le mandat de gestion, l'argent |
| `notre-engagement.html` | La charte du réseau, et ce que nous ne promettons pas |
| `conditions-du-partenariat.html` | Le règlement en 13 articles |
| `contact.html`, `mentions-legales.html` | Contact, éditeur, RGPD, portée de la calculette |
| `mon-espace.html` | Le tableau de bord d'une conciergerie |
| `back-office.html` | Le pilotage du réseau (`noindex`) |
| `base/` | Le raccordement à la base — vide pour l'instant |
| `calculette.js` | Le calcul des 10 % des honoraires nets |
| `styles.css`, `site.js` | Feuille commune, barre d'action mobile |
| `outils/verifier.py` | Contrôle avant commit : balises, JSON-LD, vocabulaire, liens |
| `CLAUDE.md` | Consignes pour les sessions automatisées |

## Avant de modifier

Lire `CLAUDE.md`, puis lancer :

```
python3 outils/verifier.py
```

En particulier : le mot « signalement » ne doit apparaître nulle part, l'or est
réservé à la commission, l'adresse de contact est `contact@idf.immo`, Antony
n'apparaît pas — et les règles du partenariat (10 % des honoraires **nets**,
15 jours, 24 mois, aucun plafond) sont écrites en dur dans plusieurs pages : si
l'une change, la changer partout.
