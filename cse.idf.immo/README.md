# cse.idf.immo — dossier de transit

⚠️ **Ce dossier n'a pas vocation à rester dans le dépôt antony-immo.**

Il contient le site **cse.idf.immo** — la proposition de Marie-Céline Etave aux
comités d'entreprise (CSE) d'Île-de-France : 3 % d'honoraires sur le mandat de
vente comme sur le mandat de recherche du bien personnel de leurs salariés, et
expertise en valeur vénale à 990 €.

Il est stocké ici, **sur la branche de travail uniquement**, parce que la
création d'un dépôt GitHub dédié n'est pas autorisée depuis la session
automatisée (`403 Resource not accessible by integration`).

**Ne jamais fusionner ce dossier sur `main`** : il serait alors servi par GitHub
Pages à l'adresse `antony.immo/cse.idf.immo/`, ce qui créerait du contenu
dupliqué et nuirait au référencement d'antony.immo.

## Ce qu'il reste à faire

1. Créer sur GitHub un dépôt **public** vide nommé `cse-idf-immo`
   (github.com/new — sans README, sans .gitignore, sans licence).
2. Y pousser le contenu de ce dossier à la racine, sur la branche `main`
   (ce fichier `README.md` de transit n'est pas à reprendre).
3. Dépôt → Settings → Pages → Source = `main`, dossier `/ (root)`, puis
   « Custom domain » = `cse.idf.immo`.
4. Chez le registrar du domaine `idf.immo`, créer un enregistrement **CNAME**
   pour le sous-domaine `cse` pointant vers `mariecelineetave-source.github.io.`
5. Une fois le certificat émis, cocher **Enforce HTTPS** dans GitHub Pages.
6. Facultatif : un second enregistrement CNAME pour `ce` (même cible), afin que
   `ce.idf.immo` redirige vers `cse.idf.immo`.
7. Supprimer ce dossier de la branche de travail d'antony-immo.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Proposition aux comités d'entreprise (CSS et JS inclus) |
| `expertise.html` | Expertise en valeur vénale, 990 € pour les salariés des CSE partenaires |
| `mentions-legales.html` | Mentions légales et RGPD |
| `CNAME` | Domaine personnalisé `cse.idf.immo` |
| `robots.txt`, `sitemap.xml` | Référencement |
| `CLAUDE.md` | Consignes pour les futures sessions automatisées du site |
