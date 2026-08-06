# ce.idf.immo — consignes pour les sessions automatisées

**CE = comité d'entreprise** (aujourd'hui CSE), **IDF = Île-de-France.**

Site de proposition commerciale de Marie-Céline Etave aux **comités d'entreprise
d'Île-de-France**. Objectif unique : convaincre les élus d'un CSE de la
référencer auprès de leurs salariés, pour la **vente** et la **recherche** de
leur bien immobilier **personnel** (pas le patrimoine de l'entreprise).

L'offre faite aux salariés des entreprises partenaires :

| Prestation | Tarif |
|---|---|
| **Mandat de vente** (salarié qui vend son bien personnel) | **3 %** du prix de vente, à la charge du vendeur, dus à la signature de l'acte authentique |
| **Mandat de recherche** (salarié qui cherche un bien) | **3 %** du prix d'acquisition, à la charge du salarié acquéreur, dus uniquement si l'acquisition aboutit |
| Expertise en valeur vénale | **990 €** au lieu de 1 190 € |

**Le 3 % est fixe et sans aucun minimum d'honoraires**, quel que soit le prix du
bien. C'est un argument central et il est confirmé par Marie-Céline : ne jamais
introduire de plancher, de palier ni de barème dégressif dans les textes. Pas de
frais de dossier, de photos ni de publicité ; rien n'est dû si l'opération ne se
fait pas. Le site doit toujours nommer explicitement **les deux mandats** — de
vente et de recherche — et non parler vaguement d'« accompagnement ».

Le CSE, lui, ne paie rien, ne perçoit rien, ne signe aucun engagement financier
et n'a rien à gérer. C'est l'argument central du site : **il faut donner envie
aux élus, en levant d'abord la crainte que ça les engage.**

## Positionnement par rapport aux autres sites

- **antony.immo** — transaction locale à Antony (92), actu immo quotidienne,
  estimateur en ligne, expertise à 1 190 €. Grand public.
- **ce.idf.immo** — offre comités d'entreprise, toute l'Île-de-France. Cible :
  les élus de CSE d'abord, les salariés ensuite.

Ne pas mélanger : pas d'actu immo ni d'estimateur de prix ici, pas de contenu
« comité d'entreprise » sur antony.immo.

## Structure

- `index.html` — la proposition aux comités d'entreprise (page principale,
  CSS et JS inclus). Sections : héros, chiffres clés, pourquoi cet avantage,
  simulateur d'économie, l'offre en trois volets, ce que reçoit le salarié,
  rôle du CSE (ce qu'il fait / ne fait pas), mise en place en 4 étapes, bande
  expertise 990 €, l'interlocutrice, FAQ des élus, formulaire de demande.
- `expertise.html` — l'expertise en valeur vénale, tarif CSE à 990 €.
- `mentions-legales.html` — mentions légales, RGPD, portée du simulateur et de
  l'offre CSE.
- `CNAME` — domaine personnalisé (`ce.idf.immo`), ne pas toucher.
- `sitemap.xml` / `robots.txt` — référencement. **Quand le contenu d'une page
  publiée change, mettre sa balise `<lastmod>` à la date du jour (AAAA-MM-JJ).**

## Règles de contenu

1. **Ne jamais affirmer un « taux moyen du marché »** sans source vérifiable.
   Le simulateur laisse volontairement le visiteur choisir le taux de
   comparaison (4 à 7 %) ; seul le 3 % est présenté comme un engagement ferme.
   Ne pas remplacer ce choix par un chiffre asséné.
2. **Aucun chiffre ni référence juridique inventés.** Sans source vérifiée, on
   n'écrit rien.
3. **Ne jamais promettre un résultat** (« vente garantie », « valeur acceptée
   par le fisc »). On décrit la méthode et la portée, pas une garantie.
4. **Ne rien écrire qui laisse croire que le CSE perçoit quelque chose.**
   L'absence totale de rétrocession est un argument, et c'est vrai : le garder
   explicite.
5. **Tarifs** : 3 % et 990 €. Ne les modifier que sur demande explicite de
   Marie-Céline.
6. **Aucune donnée personnelle dans le dépôt** (le dépôt est public). Les
   formulaires restent en `mailto:` ; rien n'est stocké côté site.
7. **Ne jamais contacter qui que ce soit** ; ne jamais collecter de coordonnées
   d'élus ou d'entreprises dans le dépôt.
8. Avant tout commit : vérifier l'équilibre des balises HTML des pages modifiées
   (python `html.parser`).

## Publication

- Toute modification attend la validation explicite de Marie-Céline (« publie »).
- Aucune rubrique de ce site n'est en publication automatique.

## Divers

- Tout en français. Commits clairs en français.
- Le proxy réseau bloque le fetch HTTP direct (curl/WebFetch) : utiliser
  WebSearch uniquement ; un échec curl ne signifie PAS que le site est en panne.
- Push : `git push -u origin <branche>` ; en cas d'erreur réseau, retenter
  jusqu'à 4 fois (2, 4, 8, 16 s).

## Points à confirmer avec Marie-Céline

- **Honoraires de recherche** : le site indique qu'aucun honoraire de recherche
  supplémentaire n'est facturé au salarié acheteur. À confirmer et préciser si
  besoin.
- **Honoraires minimum** : aucun plancher n'est annoncé sur le site (ex.
  « 3 %, minimum X € »). À ajouter si elle en pratique un.
## Contact — règle stricte

- **Adresse e-mail : `contact@ce.idf.immo` uniquement.** Ne jamais remettre
  `contact@antony.immo` sur ce site : chaque site a son adresse.
  ⚠️ Cette boîte doit être créée (ou redirigée) chez le registrar du domaine
  `idf.immo` pour que les formulaires aboutissent.
- **Téléphone : 06 60 98 92 92** — le même que sur antony.immo.

## Vocabulaire

Dire **« comité d'entreprise »** dans le texte visible, et **« CSE »** (comité
social et économique) seulement en rappel : première mention du héros, section
« Rôle du comité », balises meta et données structurées (les élus cherchent
« CSE » sur Google). Ne pas truffer les pages de sigles.
