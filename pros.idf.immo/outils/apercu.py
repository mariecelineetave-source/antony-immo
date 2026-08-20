#!/usr/bin/env python3
"""pros.idf.immo — fabrique un aperçu en une seule page.

Le site est fait de fichiers séparés, servis par GitHub Pages. Pour le montrer
avant sa mise en ligne, ce script réunit toutes les pages françaises dans un
fichier autonome : styles inclus, portrait en base64, navigation interne.

Ce n'est qu'un aperçu : le multilingue est laissé de côté, et l'envoi du
formulaire est simulé (rien ne part).

Usage : python3 outils/apercu.py [fichier de sortie]
"""
import base64
import json
import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent

PAGES = ["index.html", "comment-ca-marche.html", "la-prime.html", "vos-questions.html",
         "notre-engagement.html", "contact.html", "partager.html", "mon-espace.html",
         "conditions-de-la-prime.html", "mentions-legales.html"] + [
         "ile-de-france/" + n for n in
         ("paris-75.html", "hauts-de-seine-92.html", "seine-saint-denis-93.html",
          "val-de-marne-94.html", "seine-et-marne-77.html", "yvelines-78.html",
          "essonne-91.html", "val-d-oise-95.html")]


def cle(chemin):
    return chemin.split("/")[-1]


def corps(source):
    debut = source.index("<body")
    debut = source.index(">", debut) + 1
    return source[debut:source.index("</body>")]


def styles_de_la_page(source):
    return "\n".join(m.group(1) for m in re.finditer(r"<style>(.*?)</style>", source, re.S))


def nettoie(html, page):
    # les scripts sont repris à part, les liens d'évitement et les doublons d'id sautent
    html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S)
    html = re.sub(r'<a class="saut".*?</a>', "", html, flags=re.S)
    html = html.replace(' id="principal"', "")
    html = re.sub(r'<div class="barre-fixe" id="barre">.*?</div>\s*</div>', "", html, flags=re.S)
    html = re.sub(r'<div class="barre-fixe" id="barre">.*?</div>', "", html, flags=re.S)
    # le sélecteur de langue ne sert à rien dans un aperçu français
    html = re.sub(r'<div class="langues">\s*<div class="conteneur">.*?</div>\s*</div>', "", html, flags=re.S)
    # les chemins relatifs des pages départementales
    html = html.replace('href="../', 'href="').replace('src="../', 'src="')
    html = html.replace('href="ile-de-france/', 'href="')
    return html


def fabrique():
    styles = (RACINE / "styles.css").read_text(encoding="utf-8")
    portrait = base64.b64encode((RACINE / "marie-celine-etave.jpg").read_bytes()).decode()

    corps_pages, styles_pages = {}, []
    for chemin in PAGES:
        source = (RACINE / chemin).read_text(encoding="utf-8")
        styles_pages.append(styles_de_la_page(source))
        html = nettoie(corps(source), chemin)
        html = html.replace('src="marie-celine-etave.jpg"',
                            'src="data:image/jpeg;base64,%s"' % portrait)
        corps_pages[cle(chemin)] = html

    # le script du formulaire, avec l'envoi simulé
    formulaire = (RACINE / "partager.html").read_text(encoding="utf-8")
    script = re.search(r"<script>\n(\(function\(\).*?)</script>\s*</body>", formulaire, re.S).group(1)
    script = script.replace(
        'fetch("https://formsubmit.co/ajax/contact@idf.immo", {\n'
        '      method: "POST",\n'
        '      headers: { "Accept": "application/json" },\n'
        '      body: d\n'
        '    })',
        'new Promise(function(ok){ setTimeout(function(){ ok({ json: function(){ '
        'return Promise.resolve({ success: "true" }); } }); }, 500); })')
    assert "formsubmit.co" not in script, "l'envoi n'a pas été neutralisé"
    script = "window.initFormulaire = function(){\n" + script + "\n};"

    sortie = MODELE.replace("/*STYLES*/", styles + "\n" + "\n".join(styles_pages))
    sortie = sortie.replace("/*PAGES*/", json.dumps(corps_pages, ensure_ascii=False))
    sortie = sortie.replace("/*FORMULAIRE*/", script)
    return sortie


MODELE = r"""<meta charset="utf-8">
<title>pros.idf.immo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap" rel="stylesheet">
<style>
/*STYLES*/

/* ---- le bandeau propre à l'aperçu ---- */
.apercu{
  position:sticky;top:0;z-index:300;
  background:#12263C;color:#C9DDF2;
  font-family:"Archivo",system-ui,sans-serif;font-size:.82rem;line-height:1.5;
  padding:9px 20px;display:flex;gap:10px;align-items:baseline;justify-content:center;
  flex-wrap:wrap;text-align:center;border-bottom:1px solid rgba(201,161,103,.5);
}
.apercu b{color:#C9A167;font-weight:600}
.apercu .adresse{color:#8FC6F2}
.entete{top:38px}
@media (max-width:600px){ .entete{top:56px} }
body{padding-bottom:0}
</style>

<div class="apercu">
  <span><b>Aperçu</b> du site avant sa mise en ligne sur <span class="adresse">pros.idf.immo</span></span>
  <span>— navigation complète, version française&nbsp;; le formulaire n'envoie rien.</span>
</div>

<div id="site"></div>

<script>
/*FORMULAIRE*/
</script>

<script>
(function(){
  "use strict";
  var PAGES = /*PAGES*/;
  var site = document.getElementById("site");

  function affiche(nom, ancre){
    if (!PAGES[nom]) nom = "index.html";
    site.innerHTML = PAGES[nom];
    document.title = "pros.idf.immo";
    if (nom === "partager.html" && window.initFormulaire) window.initFormulaire();
    if (nom === "mon-espace.html") espace();
    if (ancre){
      var cible = document.getElementById(ancre);
      if (cible){
        if (cible.tagName === "DETAILS") cible.open = true;
        cible.scrollIntoView({block:"start"});
        return;
      }
    }
    window.scrollTo({top:0});
  }

  /* L'espace personnel attend sa base : on montre ce que verra le visiteur. */
  function espace(){
    var attente = document.getElementById("ecran-attente");
    var connexion = document.getElementById("ecran-connexion");
    if (!attente || !connexion) return;
    attente.hidden = true;
    connexion.hidden = false;
    var form = document.getElementById("form-connexion");
    if (form) form.hidden = true;
    var m = document.getElementById("message-connexion");
    if (m){
      m.className = "message ok on";
      m.innerHTML = "<strong>L'espace personnel n'est pas encore ouvert.</strong> " +
        "En attendant, vous recevez le suivi de chaque opportunité par e-mail, et vous pouvez " +
        "appeler le <a href=\"tel:+33660989292\">06 60 98 92 92</a> à tout moment pour savoir où elle en est.";
    }
  }

  document.addEventListener("click", function(e){
    var a = e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || /^(mailto:|tel:|sms:)/i.test(href)) return;
    if (/^https?:/i.test(href)){ a.target = "_blank"; a.rel = "noopener"; return; }
    if (href === "/" || href === "./" || href === ""){
      e.preventDefault(); location.hash = "#index.html"; return;
    }
    var m = href.match(/^([^?#]*\.html)?(?:#(.*))?$/);
    if (!m) return;
    var nom = m[1] ? m[1].split("/").pop() : null;
    if (nom){
      e.preventDefault();
      location.hash = "#" + nom + (m[2] ? "#" + m[2] : "");
    } else if (m[2]){
      var cible = document.getElementById(m[2]);
      if (cible){ e.preventDefault(); cible.scrollIntoView({behavior:"smooth", block:"start"}); }
    }
  });

  function route(){
    var h = location.hash.replace(/^#/, "");
    var bouts = h.split("#");
    affiche(bouts[0] || "index.html", bouts[1]);
  }
  window.addEventListener("hashchange", route);
  route();

  /* La barre d'action mobile, une seule pour tout l'aperçu. */
  var barre = document.createElement("div");
  barre.className = "barre-fixe";
  barre.innerHTML = '<a class="bouton bouton-1" href="partager.html">Partager une opportunité</a>';
  document.body.appendChild(barre);
  document.body.classList.add("a-barre");
  function ajuste(){
    barre.classList.toggle("visible", window.scrollY > window.innerHeight * 0.55);
  }
  window.addEventListener("scroll", ajuste, {passive:true});
  ajuste();
})();
</script>
"""


if __name__ == "__main__":
    cible = Path(sys.argv[1] if len(sys.argv) > 1 else "apercu.html")
    cible.write_text(fabrique(), encoding="utf-8")
    print("aperçu écrit :", cible, "(%.0f Ko)" % (cible.stat().st_size / 1024))
