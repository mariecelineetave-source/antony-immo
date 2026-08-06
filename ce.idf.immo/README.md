# ce.idf.immo — dossier de transit

⚠️ **Ce dossier n'a pas vocation à rester dans le dépôt antony-immo.**

Il contient le site **ce.idf.immo** (expertise immobilière en valeur vénale en
Île-de-France), créé le 6 août 2026. Il est stocké ici, **sur la branche de
travail uniquement**, parce que la création d'un dépôt GitHub dédié n'était pas
autorisée depuis la session automatisée (`403 Resource not accessible by
integration`).

**Ne jamais fusionner ce dossier sur `main`** : il serait alors servi par GitHub
Pages à l'adresse `antony.immo/ce.idf.immo/`, ce qui créerait du contenu
dupliqué et nuirait au référencement d'antony.immo.

## Ce qu'il reste à faire

1. Créer sur GitHub un dépôt **public** vide nommé `ce-idf-immo`
   (github.com/new — sans README, sans .gitignore, sans licence).
2. Y pousser le contenu de ce dossier à la racine, sur la branche `main`
   (ce fichier `README.md` de transit n'est pas à reprendre).
3. Dépôt → Settings → Pages → Source = `main`, dossier `/ (root)`.
4. Chez le registrar du domaine `idf.immo`, créer un enregistrement **CNAME**
   pour le sous-domaine `ce` pointant vers `mariecelineetave-source.github.io.`
5. Une fois le certificat émis, cocher **Enforce HTTPS** dans GitHub Pages.
6. Supprimer ce dossier de la branche de travail d'antony-immo.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Page unique du site (CSS et JS inclus) |
| `mentions-legales.html` | Mentions légales et RGPD |
| `CNAME` | Domaine personnalisé `ce.idf.immo` |
| `robots.txt`, `sitemap.xml` | Référencement |
| `CLAUDE.md` | Consignes pour les futures sessions automatisées du site |
