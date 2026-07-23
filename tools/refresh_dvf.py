#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rafraîchit les prix au m² PAR RUE de estimation.html à partir de la base DVF
officielle (fichiers geo-dvf de data.gouv.fr) pour Antony (INSEE 92002).

- Ne touche QU'AU bloc entre <!-- ESTIM:DATA:START --> et <!-- ESTIM:DATA:END -->
  (la sous-liste "rues", le repli "antony-ville", et le champ "maj").
- N'écrit QUE si au moins un chiffre change (sinon : rien, pas de commit).
- Données Antony uniquement. Aucune donnée personnelle : on agrège par rue.

Méthode : fenêtre glissante des 4 dernières années DVF disponibles ; ventes
« Vente » à une seule unité bâtie (appartement ou maison) ; prix/m² plausible
(1 500–15 000 €) ; médiane par rue avec seuils (>=5 ventes appart., >=4 maison).

Usage :
    python3 tools/refresh_dvf.py            # met à jour estimation.html si besoin
    python3 tools/refresh_dvf.py --check    # n'écrit rien, indique seulement si ça changerait
Codes retour : 0 = aucun changement · 1 = mis à jour (ou changement détecté en --check) · 2 = abandon (téléchargement/robustesse).
"""
import csv, os, re, sys, json, tempfile, subprocess, statistics, unicodedata, datetime
from collections import defaultdict

INSEE = "92002"
DEPT = "92"
NB_ANNEES = 4
SEUIL = {"a": 5, "m": 4}
HTML = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "estimation.html"))

MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
        "août", "septembre", "octobre", "novembre", "décembre"]

EXPAND = {"av": "avenue", "bd": "boulevard", "all": "allée", "imp": "impasse",
          "pl": "place", "sq": "square", "che": "chemin", "rte": "route",
          "pas": "passage", "pass": "passage", "vla": "villa", "sen": "sente",
          "res": "résidence", "crs": "cours", "rpt": "rond-point", "ham": "hameau",
          "qu": "quai", "ste": "sainte"}
PARTIC = {"de", "du", "des", "la", "le", "les", "et", "sur", "sous", "aux", "au", "a", "l", "d"}


def fnum(x):
    try:
        return float(x)
    except (TypeError, ValueError):
        return None


def slug(v):
    s = unicodedata.normalize("NFD", v.lower())
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def titre(v):
    mots = v.lower().split()
    if mots and mots[0] in EXPAND:
        mots[0] = EXPAND[mots[0]]
    out = []
    for i, m in enumerate(mots):
        if i > 0 and m in PARTIC:
            out.append(m)
        else:
            out.append("-".join(w.capitalize() for w in m.split("-")))
    return " ".join(out)


def download_years():
    """Télécharge les CSV geo-dvf des NB_ANNEES années les plus récentes dispo."""
    year = datetime.date.today().year
    tmp = tempfile.mkdtemp(prefix="dvf-")
    got = []
    for y in range(year, year - 7, -1):
        if len(got) >= NB_ANNEES:
            break
        url = ("https://files.data.gouv.fr/geo-dvf/latest/csv/%d/communes/%s/%s.csv"
               % (y, DEPT, INSEE))
        dest = os.path.join(tmp, "%d.csv" % y)
        r = subprocess.run(
            ["curl", "-sSL", "-m", "150", "--retry", "3", "--retry-delay", "4",
             "-o", dest, "-w", "%{http_code}", url],
            capture_output=True, text=True)
        code = (r.stdout or "").strip()[-3:]
        if code == "200" and os.path.exists(dest) and os.path.getsize(dest) > 1000:
            got.append((y, dest))
    return got


def compute(files):
    mut = defaultdict(list)
    for _y, f in files:
        with open(f, encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                mut[row["id_mutation"]].append(row)
    agg = defaultdict(list)
    for rows in mut.values():
        if rows[0]["nature_mutation"] != "Vente":
            continue
        bati = [r for r in rows
                if r["type_local"] in ("Appartement", "Maison")
                and fnum(r["surface_reelle_bati"])]
        if len(bati) != 1:
            continue
        r = bati[0]
        val = fnum(r["valeur_fonciere"])
        surf = fnum(r["surface_reelle_bati"])
        if not val or not surf or surf < 9:
            continue
        pm2 = val / surf
        if pm2 < 1500 or pm2 > 15000:
            continue
        voie = (r["adresse_nom_voie"] or "").strip()
        if not voie:
            continue
        agg[(voie, "a" if r["type_local"] == "Appartement" else "m")].append(pm2)
    return agg


def build(agg):
    rues = {}
    for (voie, t), lst in agg.items():
        if len(lst) < SEUIL[t]:
            continue
        s = slug(voie)
        rues.setdefault(s, {"nom": titre(voie)})
        rues[s][t] = int(round(statistics.median(lst) / 10) * 10)
    rues = {k: v for k, v in sorted(rues.items()) if "a" in v or "m" in v}
    for v in rues.values():
        v["src"] = "dvf"
    va = [p for (v, t), l in agg.items() if t == "a" for p in l]
    vm = [p for (v, t), l in agg.items() if t == "m" for p in l]
    ville = {"nom": "Antony — toute la ville",
             "a": int(round(statistics.median(va) / 10) * 10),
             "m": int(round(statistics.median(vm) / 10) * 10),
             "src": "dvf"}
    return rues, ville


def main():
    check = "--check" in sys.argv
    files = download_years()
    if len(files) < 2:
        print("DVF: téléchargement insuffisant (%d fichier·s) — abandon, rien modifié." % len(files))
        return 2
    agg = compute(files)
    rues, ville = build(agg)
    if len(rues) < 50:
        print("DVF: seulement %d rues calculées (<50) — abandon par sécurité." % len(rues))
        return 2

    html = open(HTML, encoding="utf-8").read()
    m = re.search(r'<!-- ESTIM:DATA:START -->\s*<script id="estim-data" type="application/json">(.*?)</script>\s*<!-- ESTIM:DATA:END -->',
                  html, re.S)
    if not m:
        print("DVF: bloc ESTIM:DATA introuvable — abandon.")
        return 2
    data = json.loads(m.group(1))

    if data.get("rues") == rues and data["secteurs"].get("antony-ville") == ville:
        print("DVF: aucun changement de prix (%d rues) — rien à committer." % len(rues))
        return 0

    if check:
        print("DVF: changement détecté (%d rues) — mode --check, aucune écriture." % len(rues))
        return 1

    data["rues"] = rues
    data["secteurs"]["antony-ville"] = ville
    today = datetime.date.today()
    data["maj"] = "%d %s %d" % (today.day, MOIS[today.month - 1], today.year)
    newjson = json.dumps(data, ensure_ascii=False, indent=2)
    block = ("<!-- ESTIM:DATA:START -->\n<script id=\"estim-data\" type=\"application/json\">\n"
             + newjson + "\n</script>\n<!-- ESTIM:DATA:END -->")
    html2 = html[:m.start()] + block + html[m.end():]
    open(HTML, "w", encoding="utf-8").write(html2)
    print("DVF: estimation.html mis à jour — %d rues, maj=%s (années %s)."
          % (len(rues), data["maj"], ", ".join(str(y) for y, _ in files)))
    return 1


if __name__ == "__main__":
    sys.exit(main())
