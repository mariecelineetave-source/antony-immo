#!/usr/bin/env python3
"""conciergeries.idf.immo — vérification avant commit.

Sept contrôles, sur les fichiers passés en argument (ou tout le site) :
  1. l'équilibre des balises HTML (html.parser) ;
  2. la validité des blocs JSON-LD ;
  3. les mots proscrits par la charte de la famille ;
  4. l'adresse de contact (contact@idf.immo, jamais contact@<ce site>) ;
  5. les liens internes : toute cible doit exister dans le dossier ;
  6. les mots doublés (« de de », « la la ») ;
  7. la typographie française : espace insécable avant ; : ? ! » et après «.

Il n'y a PAS de contrôle orthographique : aucun dictionnaire français n'est
installé. Les contrôles 6 et 7 sont mécaniques et sans faux positifs connus ;
ils ne remplacent pas une relecture.

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

# Un mot répété deux fois de suite. On ignore les cas légitimes du français.
DOUBLONS_LEGITIMES = {"nous", "vous", "on", "en", "si", "y", "a"}
MOT_DOUBLE = re.compile(r"\b([^\W\d_]{2,})\s+\1\b", re.I | re.UNICODE)

# Typographie française : les signes doubles se précèdent d'une espace
# insécable, et le guillemet ouvrant s'en fait suivre. Dans le HTML on écrit
# &nbsp; ; après convert_charrefs, c'est U+00A0.
AVANT_SIGNE = re.compile(r"[^\s\u00a0]([;?!»])")          # aucune espace du tout
ESPACE_SIMPLE = re.compile(r" ([;?!»])")                   # espace ordinaire au lieu d'insécable
APRES_GUILLEMET = re.compile(r"«(?![\u00a0])")             # « non suivi d'une insécable


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

    for extrait in lecteur.textes:
        t = extrait.strip(" \t\r\n")
        if not t:
            continue
        for m in MOT_DOUBLE.finditer(t):
            if m.group(1).lower() not in DOUBLONS_LEGITIMES:
                lecteur.erreurs.append("mot doublé : « %s »" % m.group(0))
        for motif, quoi in ((AVANT_SIGNE, "espace manquante avant"),
                            (ESPACE_SIMPLE, "espace ordinaire au lieu d'insécable avant"),
                            (APRES_GUILLEMET, "espace insécable manquante après «")):
            m = motif.search(t)
            if m:
                lecteur.erreurs.append(
                    "typographie : %s %s — « …%s… »"
                    % (quoi, m.group(1) if m.groups() else "«",
                       t[max(0, m.start() - 28):m.end() + 12].replace("\u00a0", "·")))

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
