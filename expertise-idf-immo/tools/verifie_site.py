#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Vérifie l'intégrité du site expertise.idf.immo avant publication.

Chaque contrôle correspond à une panne réelle possible, pas à une vérification
de principe :

  · une balise mal fermée casse la mise en page sur tout le reste de la page ;
  · deux titles identiques font que Google n'indexe qu'une des deux pages ;
  · un canonical erroné fait disparaître une page de l'index ;
  · un lien interne mort est une impasse pour un notaire pressé ;
  · des dimensions d'image fausses font sauter la mise en page au chargement ;
  · deux numéros de téléphone différents, et l'appel n'arrive pas ;
  · une formulation juridiquement trop affirmative engage Marie-Céline.

Usage :
    python3 tools/verifie_site.py           # contrôle complet
    python3 tools/verifie_site.py --bref    # n'affiche que les échecs

Codes retour : 0 = tout est conforme · 1 = au moins un contrôle a échoué.
"""
import os
import re
import struct
import sys
from html.parser import HTMLParser

RACINE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SITE = "https://expertise.idf.immo"
TEL_AFFICHE = "07 65 67 50 07"
TEL_LIEN = "+33765675007"
MAIL = "contact@paris7e.immo"
PRIX = "1&nbsp;190&nbsp;€"

BALISES_VIDES = {"area", "base", "br", "col", "embed", "hr", "img", "input",
                 "link", "meta", "param", "source", "track", "wbr"}

# Formulations à ne jamais employer : elles prêtent au rapport une portée
# juridique qu'une expertise amiable n'a pas.
INTERDITS = [
    "fait foi",
    "opposable",
    "s'impose au juge",
    "s’impose au juge",
    "force probante",
    "remplace une expertise judiciaire",
    "reconnue par l'administration",
    "reconnue par l’administration",
    "expert judiciaire",
    "expert agréé",
    "certifié",
    "assermenté",
]

echecs = []
controles = 0


def verifie(condition, libelle, detail=""):
    global controles
    controles += 1
    if not condition:
        echecs.append((libelle, detail))
    return condition


def pages_html():
    """Toutes les pages publiées, chemin relatif à la racine."""
    trouvees = []
    for dossier, sous, fichiers in os.walk(RACINE):
        sous[:] = [d for d in sous if d not in (".git", "tools", "images", "assets")]
        for f in sorted(fichiers):
            if f.endswith(".html"):
                trouvees.append(os.path.relpath(os.path.join(dossier, f), RACINE))
    return sorted(trouvees)


def lire(rel):
    with open(os.path.join(RACINE, rel), encoding="utf-8") as fh:
        return fh.read()


def url_de(rel):
    if rel == "index.html":
        return SITE + "/"
    if rel == "404.html":
        return SITE + "/404.html"
    return SITE + "/" + os.path.dirname(rel) + "/"


# ───────────────────────── Structure des balises ─────────────────────────────

class Balises(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pile, self.erreurs = [], []

    def handle_starttag(self, tag, attrs):
        if tag not in BALISES_VIDES:
            self.pile.append((tag, self.getpos()[0]))

    def handle_startendtag(self, tag, attrs):
        pass

    def handle_endtag(self, tag):
        if tag in BALISES_VIDES:
            return
        if not self.pile:
            self.erreurs.append("</%s> sans ouverture, ligne %d" % (tag, self.getpos()[0]))
        elif self.pile[-1][0] != tag:
            attendu, ligne = self.pile[-1]
            self.erreurs.append("</%s> ligne %d alors que <%s> (ligne %d) est ouverte"
                                % (tag, self.getpos()[0], attendu, ligne))
            self.pile.pop()
        else:
            self.pile.pop()

    def reste(self):
        return ["<%s> jamais fermée (ligne %d)" % (t, l) for t, l in self.pile]


# ─────────────────────────── Dimensions des images ───────────────────────────

def dimensions(chemin):
    with open(chemin, "rb") as fh:
        donnees = fh.read()
    if donnees[:8] == b"\x89PNG\r\n\x1a\n":
        return struct.unpack(">II", donnees[16:24])
    if donnees[:2] == b"\xff\xd8":
        i = 2
        while i < len(donnees) - 9:
            if donnees[i] != 0xFF:
                i += 1
                continue
            marqueur = donnees[i + 1]
            if marqueur in (0xC0, 0xC1, 0xC2, 0xC3):
                hauteur, largeur = struct.unpack(">HH", donnees[i + 5:i + 9])
                return largeur, hauteur
            if marqueur in (0xD8, 0x01) or 0xD0 <= marqueur <= 0xD7:
                i += 2
                continue
            i += 2 + struct.unpack(">H", donnees[i + 2:i + 4])[0]
    return None


# ────────────────────────────────── Contrôles ────────────────────────────────

def main():
    bref = "--bref" in sys.argv
    liste = pages_html()
    verifie(len(liste) >= 20, "Toutes les pages sont présentes",
            "%d pages trouvées" % len(liste))

    titles, descriptions = {}, {}

    for rel in liste:
        html = lire(rel)

        # 1. Balises équilibrées
        parseur = Balises()
        parseur.feed(html)
        problemes = parseur.erreurs + parseur.reste()
        verifie(not problemes, "Balises équilibrées — %s" % rel, " · ".join(problemes[:3]))

        # 2. Un seul H1
        h1 = re.findall(r"<h1[\s>]", html)
        verifie(len(h1) == 1, "Un seul <h1> — %s" % rel, "%d trouvé(s)" % len(h1))

        # 3. title unique et non vide
        m = re.search(r"<title>(.*?)</title>", html, re.S)
        titre = m.group(1).strip() if m else ""
        verifie(bool(titre), "Balise <title> renseignée — %s" % rel)
        if titre:
            verifie(titre not in titles, "Title unique — %s" % rel,
                    "identique à %s" % titles.get(titre, ""))
            titles[titre] = rel

        # 4. meta description unique et non vide
        m = re.search(r'<meta name="description" content="(.*?)">', html, re.S)
        desc = m.group(1).strip() if m else ""
        verifie(bool(desc), "Meta description renseignée — %s" % rel)
        if desc:
            verifie(desc not in descriptions, "Meta description unique — %s" % rel,
                    "identique à %s" % descriptions.get(desc, ""))
            descriptions[desc] = rel

        # 5. canonical correct
        m = re.search(r'<link rel="canonical" href="(.*?)">', html)
        verifie(m is not None and m.group(1) == url_de(rel), "Canonical exact — %s" % rel,
                "trouvé %s, attendu %s" % (m.group(1) if m else "aucun", url_de(rel)))

        # 6. Open Graph et favicon
        for balise in ('property="og:title"', 'property="og:description"',
                       'property="og:url"', 'property="og:image"', 'rel="icon"',
                       'rel="apple-touch-icon"'):
            verifie(balise in html, "Balise %s présente — %s" % (balise, rel))

        # 7. Dimensions des images
        for src, largeur, hauteur in re.findall(
                r'<img src="([^"]+)"\s+width="(\d+)"\s+height="(\d+)"', html):
            fichier = os.path.join(RACINE, src.lstrip("/"))
            reelles = dimensions(fichier) if os.path.exists(fichier) else None
            verifie(reelles == (int(largeur), int(hauteur)),
                    "Dimensions de %s — %s" % (src, rel),
                    "déclarées %sx%s, réelles %s" % (largeur, hauteur, reelles))

        # 8. Texte alternatif sur chaque image
        for balise in re.findall(r"<img\b[^>]*>", html):
            verifie('alt="' in balise, "Attribut alt présent — %s" % rel, balise[:70])

        # 9. Liens internes valides
        for lien in re.findall(r'href="(/[^"#]*)"', html):
            if lien.startswith("//"):
                continue
            cible = os.path.join(RACINE, lien.lstrip("/"))
            existe = os.path.isfile(cible) or os.path.isfile(os.path.join(cible, "index.html"))
            verifie(existe, "Lien interne valide — %s" % rel, lien)

        # 10. Coordonnées cohérentes
        for tel in re.findall(r'href="tel:([^"]+)"', html):
            verifie(tel == TEL_LIEN, "Lien tel: conforme — %s" % rel, tel)
        for affiche in re.findall(r"0\d(?:[ .]?\d\d){4}", html):
            verifie(affiche == TEL_AFFICHE, "Numéro affiché conforme — %s" % rel, affiche)
        for adresse in re.findall(r'mailto:([^"?]+)', html):
            verifie(adresse == MAIL, "Adresse e-mail conforme — %s" % rel, adresse)

        # 11. Formulations juridiquement trop affirmatives
        texte = re.sub(r"<[^>]+>", " ", html).lower()
        for expression in INTERDITS:
            verifie(expression not in texte,
                    "Formulation prudente — %s" % rel, "« %s » trouvé" % expression)

        # 12. Le tarif, partout écrit de la même façon dans le texte visible
        #     (les métadonnées et le JSON-LD utilisent une espace ordinaire)
        visible = html.split("<body>", 1)[-1]
        visible = re.sub(r"<script\b.*?</script>", " ", visible, flags=re.S)
        for montant in re.findall(r"1(?:&nbsp;|\s)*190(?:&nbsp;|\s)*€", visible):
            verifie(montant == PRIX, "Tarif écrit uniformément — %s" % rel, repr(montant))

    # 13. Le sitemap liste exactement les pages publiées (hors 404)
    sitemap = lire("sitemap.xml")
    dans_sitemap = set(re.findall(r"<loc>(.*?)</loc>", sitemap))
    attendues = {url_de(r) for r in liste if not r.endswith("404.html")}
    verifie(dans_sitemap == attendues, "Sitemap complet",
            "manquantes : %s · en trop : %s"
            % (sorted(attendues - dans_sitemap), sorted(dans_sitemap - attendues)))

    # 14. Le domaine du CNAME
    verifie(lire("CNAME").strip() == "expertise.idf.immo", "CNAME correct")

    # 15. La feuille de style et le script existent
    for actif in ("assets/site.css", "assets/site.js"):
        verifie(os.path.isfile(os.path.join(RACINE, actif)), "%s présent" % actif)

    # ── Rapport ──────────────────────────────────────────────────────────────
    if echecs:
        print("%d contrôle(s) en échec sur %d :\n" % (len(echecs), controles))
        for libelle, detail in echecs:
            print("  ✗ %s%s" % (libelle, (" — " + detail) if detail else ""))
        return 1
    if not bref:
        print("%d contrôles passés — le site est conforme." % controles)
        print("%d pages vérifiées." % len(liste))
    return 0


if __name__ == "__main__":
    sys.exit(main())
