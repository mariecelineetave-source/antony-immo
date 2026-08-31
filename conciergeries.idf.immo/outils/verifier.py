#!/usr/bin/env python3
"""conciergeries.idf.immo — vérification avant commit.

Cinq contrôles, sur les fichiers passés en argument (ou tout le site) :
  1. l'équilibre des balises HTML (html.parser) ;
  2. la validité des blocs JSON-LD ;
  3. les mots proscrits par la charte de la famille ;
  4. l'adresse de contact (contact@idf.immo, jamais contact@<ce site>) ;
  5. les liens internes : toute cible doit exister dans le dossier.

Ce site n'est pas multilingue : contrairement à gardiens, nounous et pros,
il n'y a donc pas de contrôle de couverture des traductions. S'il le
devient un jour, c'est ici qu'il faudra l'ajouter.

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

# Le vocabulaire de la famille. « signalement » évoque la dénonciation :
# on écrit toujours « opportunité ». « minimum » est proscrit parce que la
# promesse se formule en positif. Antony est le terrain d'antony.immo.
PROSCRITS = [
    (re.compile(r"signalement", re.I), "le mot « signalement » — écrire « opportunité »"),
    (re.compile(r"\bminimum\b", re.I), "le mot « minimum » — formuler en positif"),
    (re.compile(r"\bAntony\b"), "Antony — c'est le terrain d'antony.immo, pas de ce site"),
]
CONTACT_INTERDIT = re.compile(r"contact@conciergeries\.idf\.immo", re.I)


class Lecteur(HTMLParser):
    """Relève les balises, les textes visibles et les blocs JSON-LD."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pile = []
        self.erreurs = []
        self.textes = []
        self.jsonld = []
        self._ld = False

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "script" and d.get("type") == "application/ld+json":
            self._ld = True
            self.jsonld.append("")
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
            self.erreurs.append("</%s> ligne %d : rien à fermer" % (tag, self.getpos()[0]))
            return
        if self.pile[-1][0] != tag:
            ouvert, pos = self.pile[-1]
            self.erreurs.append(
                "</%s> ligne %d : <%s> ouvert ligne %d n'est pas fermé"
                % (tag, self.getpos()[0], ouvert, pos[0]))
            return
        self.pile.pop()

    def handle_data(self, data):
        if self._ld:
            self.jsonld[-1] += data
            return
        if not data.strip():
            return
        if self.pile and self.pile[-1][0] in SANS_TEXTE:
            return
        self.textes.append(data)


def liens_internes(source):
    """Les cibles locales des href/src, sans ancre ni paramètre."""
    for cible in re.findall(r'(?:href|src)="([^"]+)"', source):
        if cible.startswith(("http://", "https://", "mailto:", "tel:", "sms:", "#", "data:")):
            continue
        cible = cible.split("#")[0].split("?")[0]
        if cible in ("", "/"):
            continue
        yield cible


def controle(chemin):
    source = chemin.read_text(encoding="utf-8")
    lecteur = Lecteur()
    lecteur.feed(source)
    for tag, pos in lecteur.pile:
        lecteur.erreurs.append("<%s> ligne %d n'est jamais fermé" % (tag, pos[0]))

    for bloc in lecteur.jsonld:
        try:
            json.loads(bloc)
        except json.JSONDecodeError as e:
            lecteur.erreurs.append("JSON-LD invalide : %s" % e)

    visible = " ".join(lecteur.textes)
    for motif, quoi in PROSCRITS:
        if motif.search(visible):
            lecteur.erreurs.append("mot proscrit : %s" % quoi)

    if CONTACT_INTERDIT.search(source):
        lecteur.erreurs.append(
            "adresse de contact : écrire contact@idf.immo, jamais contact@conciergeries.idf.immo")

    for cible in liens_internes(source):
        if not (chemin.parent / cible).exists():
            lecteur.erreurs.append("lien mort : %s" % cible)

    return lecteur.erreurs


def main(argv):
    cibles = [Path(a).resolve() for a in argv] or sorted(RACINE.glob("*.html"))
    total = 0
    for chemin in cibles:
        erreurs = controle(chemin)
        try:
            rel = chemin.relative_to(RACINE)
        except ValueError:
            rel = chemin
        if erreurs:
            total += len(erreurs)
            print("\n✗ %s" % rel)
            for e in erreurs:
                print("   %s" % e)
        else:
            print("✓ %s" % rel)
    print()
    print("Tout est en ordre." if not total else "%d problème(s) à corriger." % total)
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
