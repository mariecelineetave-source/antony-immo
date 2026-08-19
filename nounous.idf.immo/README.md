# nounous.idf.immo

Site du **réseau des nounous d'Île-de-France** de Marie-Céline Etave —
assistantes maternelles agréées, gardes d'enfants à domicile, auxiliaires
parentales, gardes partagées.

**Le deal :** une nounou partage l'opportunité d'une famille qui envisage de
vendre. Si la vente se réalise, elle reçoit **1 000 € nets**, par virement, dans
les 15 jours suivant la signature chez le notaire.

> ⚠️ **Le site n'est pas encore en ligne.** Il attend son dépôt, son
> enregistrement DNS et la configuration de Supabase — voir « Ce qu'il reste à
> faire » plus bas.

---

## L'idée

Un gardien d'immeuble connaît les habitants ; une nounou, elle, connaît les
familles. Elle est là tous les jours, aux heures où l'on se parle vraiment : le
matin en vitesse, le soir quand la journée se raconte. « On va être un peu
justes, avec le deuxième », « on aimerait un jardin », « on voudrait se
rapprocher de l'école » : ce sont des projets immobiliers qui commencent, et
personne d'autre ne les entend.

Le site sert à trois choses :

1. **Faire prendre conscience** à une nounou qu'elle détient déjà l'information
   (la section « Ces phrases-là, vous les entendez tout le temps »).
2. **Lui donner les mots** pour en parler à la famille — la phrase exacte, et la
   règle qui va avec : rien ne se fait sans son accord.
3. **Recueillir l'opportunité** en moins d'une minute, par formulaire ou par
   téléphone, selon ce qu'elle préfère.

## Le point sensible, et comment il est traité

La famille dont on parle est très souvent **celle qui emploie la nounou**. C'est
toute la différence avec `gardiens.idf.immo`, et c'est ce qui a guidé la
rédaction :

- l'accord préalable de la famille est une **condition de la prime**, répétée
  partout ;
- le site n'invite **jamais** à dissimuler quoi que ce soit aux employeurs ;
- aucune information sur les enfants n'est demandée, nulle part ;
- une porte de sortie est offerte explicitement : *si vous sentez que le sujet
  est délicat, ne partagez pas — aucune prime ne vaut votre tranquillité au
  travail.*

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'accueil |
| `partager.html` | Le formulaire en 3 écrans (CSS et JS inclus) |
| `comment-ca-marche.html`, `la-prime.html`, `vos-questions.html`, `notre-engagement.html` | Les pages de contenu |
| `conditions-de-la-prime.html` | Le règlement du programme |
| `mentions-legales.html`, `contact.html` | Mentions légales et contact |
| `mon-espace.html`, `base/` | L'espace personnel (Supabase) et son schéma |
| `ile-de-france/*.html` | 8 pages départementales (SEO local) |
| `styles.css`, `site.js` | Feuille commune et barre d'action mobile |
| `CNAME`, `robots.txt`, `sitemap.xml` | Domaine et référencement |
| `CLAUDE.md` | Les consignes pour les sessions automatisées |

Aucune dépendance en dehors des polices Google Fonts, de l'API publique de la
Base Adresse Nationale (autocomplétion d'adresse), de FormSubmit (acheminement
du formulaire) et de Supabase (espace personnel uniquement).

Le site reste entièrement lisible et utilisable **sans JavaScript** : seuls le
formulaire pas-à-pas, l'autocomplétion et l'espace personnel en ont besoin ; le
téléphone et le courriel fonctionnent toujours.

## Ce qu'il reste à faire

1. **Créer le dépôt** `mariecelineetave-source/nounous-idf-immo` et y déplacer le
   contenu de ce dossier à la racine. GitHub Pages n'accepte qu'un domaine par
   dépôt : le site ne peut pas être publié depuis `antony-immo`.
2. **DNS** : enregistrement CNAME `nounous` → `mariecelineetave-source.github.io.`
   chez Gandi, puis GitHub Pages sur `main`, racine.
3. **Supabase** : renseigner les deux valeurs publiques du projet dans
   `base/config.js`, puis exécuter `base/schema.sql` (marche à suivre dans
   `base/installer.html`). Tant que c'est vide, `mon-espace.html` affiche un
   message d'attente au lieu de planter.
4. **SMTP** : brancher un vrai expéditeur d'e-mails sur Supabase (Brevo) **avant**
   toute diffusion du site. L'envoi inclus est bridé à quelques messages par
   heure : sans cela, la promesse « vous recevez un lien de connexion » ne serait
   pas tenue.
5. **FormSubmit** : vérifier que `contact@idf.immo` est bien activé (un courriel
   de confirmation est envoyé au tout premier envoi ; l'adresse est déjà utilisée
   par gardiens.idf.immo, il n'y a peut-être rien à faire).

## À valider avant mise en ligne

Ces points relèvent d'une décision commerciale ou juridique, pas d'un choix
technique. Ils sont écrits en dur dans le site.

1. **L'accord de BSK Immobilier** sur le principe des apporteurs d'affaires.
2. **La convention d'indicateur d'affaires**, à faire relire par un juriste avant
   la première signature. Le modèle d'etudiants.idf.immo est réutilisable, mais
   son article 2 s'appuie sur un plafond annuel qui n'existe pas ici.
3. **Le cas de la nounou salariée d'une entreprise de garde d'enfants** (et non
   d'un particulier employeur), dont la clause de loyauté peut être plus stricte.
   Le site ne traite pas ce cas.
