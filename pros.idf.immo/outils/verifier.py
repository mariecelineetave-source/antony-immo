#!/usr/bin/env python3
"""pros.idf.immo — vérification avant commit.

Trois contrôles, sur les fichiers passés en argument (ou tout le site) :
  1. l'équilibre des balises HTML (html.parser) ;
  2. la validité des blocs JSON-LD ;
  3. la couverture des traductions : tout texte visible d'une page traduite
     doit avoir son entrée dans le dictionnaire de la page, sinon la phrase
     ressort en français au milieu du portugais.

Trois moteurs de traduction coexistent, et le contrôle s'adapte :
  - la plupart des pages : dico-commun.js + dico-<page>.js, lus par i18n.js ;
  - partager.html : traductions.js (le formulaire a son propre moteur) ;
  - les deux pages juridiques : traductions-juridiques.js, qui ne traduit que
    le corps — l'en-tête, le titre de page et le pied sont traités à part.

Usage : python3 outils/verifier.py [fichier…]
"""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent

VIDES = {"meta", "link", "br", "img", "input", "hr", "source", "col", "area",
         "embed", "param", "track", "wbr", "path", "rect", "line", "circle",
         "ellipse", "polygon", "polyline", "stop", "use"}
SANS_TEXTE = {"script", "style"}

# Ce qui n'a pas à être traduit : ponctuation, chiffres, noms propres, adresses.
INTRADUISIBLE = re.compile(
    r"^(?:[\W\d—→←·✓×+–]+"
    r"|[\w.+-]+@[\w.-]+"
    r"|0[\d ]{9,}"
    r"|www\.[\w.-]+"
    r"|api-adresse\.data\.gouv\.fr|formsubmit\.co"
    r"|Marie-Céline Etave|pros\.idf\.immo"
    r"|pros|idf|immo"                       # la marque, coupée par les points
    r"|2042-C-PRO|SIREN|BSK Immobilier|CNIL|FormSubmit|GitHub Pages"
    r"|Paris|Hauts-de-Seine|Seine-Saint-Denis|Val-de-Marne|Seine-et-Marne"
    r"|Yvelines|Essonne|Val-d'Oise|Île-de-France"
    r"|✉️ [\w.+-]+@[\w.-]+|📞 0[\d ]+)$")


def normalise(t):
    return re.sub(r"\s+", " ", t.replace(" ", " ")).strip()


def intraduisible(texte):
    return bool(INTRADUISIBLE.match(texte))


class Lecteur(HTMLParser):
    """Relève les balises, les textes visibles et les blocs JSON-LD."""

    def __init__(self, zones_ignorees=("langues",)):
        super().__init__(convert_charrefs=True)
        self.zones = set(zones_ignorees)
        self.pile = []
        self.erreurs = []
        self.textes = []
        self.titre = []
        self.attributs = []          # placeholder et aria-label
        self.jsonld = []
        self._ld = False
        self._profondeur_zone = None

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "script" and d.get("type") == "application/ld+json":
            self._ld = True
            self.jsonld.append("")
        if self._profondeur_zone is None and self.zones & set((d.get("class") or "").split()):
            self._profondeur_zone = len(self.pile)
        if self._profondeur_zone is None:
            for cle in ("placeholder", "aria-label"):
                if d.get(cle):
                    self.attributs.append(d[cle])
        if tag not in VIDES:
            self.pile.append((tag, self.getpos()))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VIDES and self.pile:
            self.pile.pop()

    def handle_endtag(self, tag):
        if tag in VIDES:
            return
        if tag == "script":
            self._ld = False
        if not self.pile:
            self.erreurs.append(f"</{tag}> ligne {self.getpos()[0]} : rien à fermer")
            return
        if self.pile[-1][0] != tag:
            ouvert, pos = self.pile[-1]
            self.erreurs.append(
                f"</{tag}> ligne {self.getpos()[0]} : <{ouvert}> ouvert ligne {pos[0]} n'est pas fermé")
            return
        self.pile.pop()
        if self._profondeur_zone is not None and len(self.pile) <= self._profondeur_zone:
            self._profondeur_zone = None

    def handle_data(self, data):
        if self._ld:
            self.jsonld[-1] += data
            return
        if not data.strip():
            return
        if self.pile and self.pile[-1][0] in SANS_TEXTE:
            return
        if self._profondeur_zone is not None:
            return
        if self.pile and self.pile[-1][0] == "title":
            self.titre.append(data)
            return
        self.textes.append(data)


def lit(chemin, zones):
    lecteur = Lecteur(zones)
    lecteur.feed(chemin.read_text(encoding="utf-8"))
    for tag, pos in lecteur.pile:
        lecteur.erreurs.append(f"<{tag}> ligne {pos[0]} n'est jamais fermé")
    for bloc in lecteur.jsonld:
        try:
            json.loads(bloc)
        except json.JSONDecodeError as e:
            lecteur.erreurs.append(f"JSON-LD invalide : {e}")
    return lecteur


def chaines(texte):
    """Les chaînes littérales d'un fichier JavaScript, dans l'ordre, avec la
    position du premier caractère qui suit."""
    i, n = 0, len(texte)
    while i < n:
        if texte[i] != '"':
            i += 1
            continue
        j = i + 1
        while j < n and texte[j] != '"':
            j += 2 if texte[j] == "\\" else 1
        yield texte[i:j + 1], j + 1
        i = j + 1


def cles_du_dico(chemin):
    """Les clés françaises d'un dico-*.js (triplets [fr, pt, en])."""
    if not chemin.exists():
        return None
    texte = chemin.read_text(encoding="utf-8")
    return {normalise(json.loads(t, strict=False))
            for t in re.findall(r"\[\s*(\"(?:[^\"\\]|\\.)*\")\s*,", texte)}


def cles_du_moteur(chemin):
    """Les clés françaises d'un traductions*.js (objets « clé » : « valeur »)."""
    if not chemin.exists():
        return None
    texte = chemin.read_text(encoding="utf-8")
    cles = set()
    for brut, suite in chaines(texte):
        reste = texte[suite:suite + 40].lstrip(" \t\r\n")
        if reste.startswith(":"):
            try:
                cles.add(normalise(json.loads(brut, strict=False)))
            except json.JSONDecodeError:
                pass
    return cles


def moteur_de_la_page(source):
    """(fichier de traduction, zones à ignorer, le titre est-il contrôlé ?)"""
    if 'src="traductions-juridiques.js"' in source:
        return RACINE / "traductions-juridiques.js", ("langues", "entete", "page-tete", "pied"), False
    if 'src="traductions.js"' in source:
        return RACINE / "traductions.js", ("langues",), False
    return None, ("langues",), True


def main(argv):
    cibles = [Path(a).resolve() for a in argv] or sorted(
        list(RACINE.glob("*.html")) + list((RACINE / "ile-de-france").glob("*.html"))
        + list((RACINE / "pt").glob("*.html")) + list((RACINE / "en").glob("*.html")))
    total = 0
    for chemin in cibles:
        source = chemin.read_text(encoding="utf-8")
        moteur, zones, avec_titre = moteur_de_la_page(source)
        lecteur = lit(chemin, zones)
        connues, controle = None, False

        if moteur:
            connues = cles_du_moteur(moteur) or set()
            controle = True
        else:
            dicos = [RACINE / n for n in re.findall(r'<script src="(?:\.\./)?(dico-[a-z-]+\.js)"', source)]
            if dicos:
                connues, controle = set(), True
                for d in dicos:
                    c = cles_du_dico(d)
                    if c is None:
                        lecteur.erreurs.append(f"dictionnaire absent : {d.name}")
                    else:
                        connues |= c

        manquantes = []
        if controle:
            a_voir = lecteur.textes + lecteur.attributs + (lecteur.titre if avec_titre else [])
            for t in a_voir:
                n = normalise(t)
                if n and n not in connues and not intraduisible(n):
                    manquantes.append(n)

        try:
            rel = chemin.relative_to(RACINE)
        except ValueError:
            rel = chemin
        if lecteur.erreurs or manquantes:
            total += len(lecteur.erreurs) + len(dict.fromkeys(manquantes))
            print(f"\n✗ {rel}")
            for e in lecteur.erreurs:
                print(f"   {e}")
            for m in dict.fromkeys(manquantes):
                print(f"   traduction manquante : « {m} »")
        else:
            print(f"✓ {rel}")
    print()
    print("Tout est en ordre." if not total else f"{total} problème(s) à corriger.")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
