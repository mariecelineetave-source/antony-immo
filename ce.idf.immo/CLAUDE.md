# ce.idf.immo — consignes pour les sessions automatisées

Site de Marie-Céline Etave, **expert immobilier en valeur vénale**, intervenant
sur toute l'**Île-de-France**. Hébergé sur GitHub Pages : la branche `main` est
le site en ligne (https://ce.idf.immo).

C'est le pendant régional d'antony.immo :

- **antony.immo** — transaction (vente / achat) à Antony et alentours, actu immo
  quotidienne, estimateur en ligne. Site local.
- **ce.idf.immo** — expertise en valeur vénale (succession, divorce, donation,
  partage, IFI, litige, garantie bancaire), sur les huit départements
  franciliens. Site régional, orienté « valeur opposable », pas vente.

Ne pas mélanger les deux : pas de rubrique transaction ni d'estimateur de prix
de vente ici, pas d'expertise détaillée sur antony.immo au-delà de la page
`expertise.html` qui y renvoie.

## Structure

- `index.html` — page unique (tout-en-un : CSS et JS inclus). Sections :
  héros, engagements, expertise/estimation, cas de recours, déroulement, tarif,
  zone d'intervention, l'expert, demande d'expertise.
- `mentions-legales.html` — mentions légales et RGPD.
- `CNAME` — domaine personnalisé (`ce.idf.immo`), ne pas toucher.
- `sitemap.xml` / `robots.txt` — référencement. **Quand le contenu d'une page
  publiée change, mettre à jour sa balise `<lastmod>` à la date du jour
  (AAAA-MM-JJ).** Ne jamais retirer d'URL du sitemap ; en ajouter une seulement
  si une nouvelle page publique est créée.

## Règles de contenu

1. **Aucun chiffre, aucune référence juridique inventés.** Toute affirmation
   sourcée doit renvoyer à une source réelle (Légifrance, Cour de cassation,
   administration). Sans source vérifiée, on n'écrit rien.
2. **Ne jamais promettre un résultat** (« valeur acceptée par le fisc »,
   « rapport opposable à coup sûr »). On décrit la méthode et la portée, pas une
   garantie.
3. **Formulations prudentes sur le plan juridique** : le site donne des
   informations générales, pas un conseil juridique ou fiscal personnalisé. La
   mention correspondante figure en pied de page et dans les mentions légales —
   ne pas la retirer.
4. **Tarif** : 1 190 € net, TVA non applicable (art. 293 B du CGI). Ne le
   modifier que sur demande explicite de Marie-Céline.
5. **Aucune donnée personnelle dans le dépôt** (le dépôt est public). Le
   formulaire reste en `mailto:` ; aucune donnée n'est stockée côté site.
6. **Ne jamais contacter qui que ce soit** ; ne jamais collecter de coordonnées.
7. Avant tout commit : vérifier l'équilibre des balises HTML des pages modifiées
   (python `html.parser`).

## Publication

- Toute modification (design, sections, textes) attend la validation explicite
  de Marie-Céline (« publie ») avant d'aller sur `main`.
- Aucune rubrique de ce site n'est, à ce jour, en publication automatique.

## Divers

- Tout en français. Commits clairs en français.
- Le proxy réseau bloque le fetch HTTP direct (curl/WebFetch) vers l'extérieur :
  utiliser WebSearch uniquement ; un échec curl ne signifie PAS que le site est
  en panne.
- Push : `git push -u origin <branche>` ; en cas d'erreur réseau, retenter
  jusqu'à 4 fois (2, 4, 8, 16 s).

## Mise en ligne (état à la création)

Deux étapes restent à faire côté Marie-Céline :

1. **GitHub Pages** : dépôt → Settings → Pages → Source = branche `main`,
   dossier `/ (root)`. Le fichier `CNAME` fait le reste.
2. **DNS** : chez le registrar du domaine `idf.immo`, créer un enregistrement
   `CNAME` pour le sous-domaine `ce` pointant vers
   `mariecelineetave-source.github.io.` — puis cocher « Enforce HTTPS » dans
   GitHub Pages une fois le certificat émis.
