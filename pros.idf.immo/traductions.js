/* =====================================================================
   pros.idf.immo — traduction du formulaire de partage

   Une seule page de formulaire, trois langues. Plutôt que d'en tripler le
   code — et de laisser les montants et les conditions diverger au premier
   changement — la page est écrite en français et traduite au chargement.

   La langue vient de l'adresse : partager.html?lang=pt ou ?lang=en.

   Les libellés du message envoyé à Marie-Céline restent en français : c'est
   elle qui le lit. Seul l'accusé de réception part dans la langue du professionnel.
   ===================================================================== */
(function () {
  "use strict";

  const LANGUE = (new URLSearchParams(location.search).get("lang") || "fr").toLowerCase();
  window.LANGUE_PARTAGE = (LANGUE === "pt" || LANGUE === "en") ? LANGUE : "fr";
  if (window.LANGUE_PARTAGE === "fr") return;

  const T = {
    pt: {
      "Navigation principale": "Navegação principal",
      "Adresses proposées": "Moradas propostas",
      "12 rue des Rabats, Antony": "12 rue des Rabats, Antony",
      "Bât. B": "Bloco B", "Bâtiment": "Bloco",
      "Esc. 2": "Escada 2", "Escalier": "Escada",
      "3e étage": "3.º andar", "Étage": "Andar",
      "— c'est la condition de la prime, et c'est ce qui fait que l'appel se passe bien.":
        "— é a condição do prémio, e é o que faz com que o telefonema corra bem.",
      "Aller au formulaire": "Ir para o formulário",
      "Comment ça marche": "Como funciona",
      "La prime": "O prémio",
      "Vos questions": "Perguntas",
      "Contact": "Contacto",
      "Partager une opportunité": "Partilhar uma oportunidade",
      "Trois écrans, moins d'une minute. Vous pouvez vous arrêter et reprendre plus tard : ce que vous tapez reste sur votre téléphone.":
        "Três ecrãs, menos de um minuto. Pode parar e retomar mais tarde: o que escreve fica no seu telemóvel.",

      "Où se trouve le bien ?": "Onde fica o imóvel?",
      "L'adresse suffit. Si vous connaissez le bâtiment ou l'étage, c'est encore mieux — cela évite les confusions dans un grand immeuble.":
        "A morada basta. Se souber o bloco ou o andar, ainda melhor — evita confusões num prédio grande.",
      "Adresse du bien": "Morada do imóvel",
      "Commencez à taper, puis choisissez dans la liste.": "Comece a escrever e escolha na lista.",
      "Changer d'adresse": "Mudar de morada",
      "Cette adresse ne semble pas être en Île-de-France. Nous n'intervenons que dans les huit départements franciliens : 75, 77, 78, 91, 92, 93, 94 et 95.":
        "Esta morada não parece ser na Île-de-France. Só trabalhamos nos oito departamentos da região: 75, 77, 78, 91, 92, 93, 94 e 95.",
      "Indiquez l'adresse du bien pour continuer.": "Indique a morada do imóvel para continuar.",
      "Bâtiment, escalier, étage": "Bloco, escada, andar",
      "Facultatif.": "Opcional.",
      "Continuer": "Continuar",

      "Ce que vous savez": "O que sabe",
      "Nous avons besoin de savoir qu'un projet existe. Pas de détails sur la vie privée des gens.":
        "Precisamos de saber que existe um projeto. Não queremos pormenores sobre a vida privada de ninguém.",
      "De quel type de bien s'agit-il ?": "Que tipo de imóvel é?",
      "Appartement": "Apartamento", "Maison": "Moradia", "Autre": "Outro",
      "Choisissez le type de bien.": "Escolha o tipo de imóvel.",
      "Où en est le projet, à votre connaissance ?": "Em que ponto está o projeto, tanto quanto sabe?",
      "Ils en parlent": "Falam nisso", "C'est décidé": "Está decidido",
      "Ils cherchent déjà": "Já andam à procura", "Déjà en vente ailleurs": "Já está à venda noutro sítio",
      "Choisissez où en est le projet.": "Escolha em que ponto está o projeto.",
      "Deux lignes suffisent. C'est ce qui nous permet d'appeler au bon moment.":
        "Duas linhas chegam. É o que nos permite telefonar no momento certo.",
      "← Revenir": "← Voltar",

      "Vous, et le propriétaire": "Você e o proprietário",
      "Vos coordonnées servent à vous tenir au courant et à vous verser la prime. Elles ne servent à rien d'autre.":
        "Os seus contactos servem para o manter informado e para lhe pagar o prémio. Não servem para mais nada.",
      "Votre prénom": "O seu nome próprio",
      "Indiquez votre prénom.": "Indique o seu nome próprio.",
      "Votre métier": "A sua profissão",
      "C'est ce que nous dirons au propriétaire si vous nous autorisez à vous citer.":
        "É o que diremos ao proprietário se nos autorizar a citá-lo.",
      "Indiquez votre métier.": "Indique a sua profissão.",
      "Votre téléphone": "O seu telemóvel",
      "Pour que nous puissions vous joindre si nous avons une question.":
        "Para o podermos contactar se tivermos alguma dúvida.",
      "Indiquez un numéro de téléphone.": "Indique um número de telemóvel.",
      "Votre e-mail": "O seu e-mail",
      "C'est là que vous recevrez l'accusé de réception, puis le suivi de votre opportunité.":
        "É aí que receberá o aviso de receção e depois o acompanhamento da sua oportunidade.",
      "Indiquez une adresse e-mail : c'est par là que nous vous tiendrons au courant.":
        "Indique um e-mail: é por aí que o manteremos informado.",
      "Votre enseigne ou votre entreprise": "O nome do seu estabelecimento ou da sua empresa",

      "Le propriétaire": "O proprietário",
      "Pour que nous puissions faire notre travail, il nous faut son nom et son numéro.":
        "Para podermos fazer o nosso trabalho, precisamos do nome e do número dele.",
      "Demandez-lui d'abord son accord": "Peça-lhe primeiro autorização",
      "« Je connais une conseillère immobilière sérieuse, qui travaille dans le quartier. Si votre projet se précise, je peux lui donner votre numéro pour qu'elle vous appelle ? »":
        "« Conheço uma consultora imobiliária séria, que trabalha aqui na zona. Se o seu projeto avançar, posso dar-lhe o seu número para que lhe telefone? »",
      "C'est la phrase la plus simple. Tant qu'il n'a pas dit oui, ne nous donnez pas ses coordonnées.":
        "É a frase mais simples. Enquanto ele não disser que sim, não nos dê os contactos dele.",
      "Vous pouvez aussi lui donner directement mon numéro": "Também lhe pode dar diretamente o meu número",
      "— le 06 60 98 92 92. Beaucoup de gens préfèrent appeler eux-mêmes, quand ils se sentent prêts. Du moment que vous avez partagé l'opportunité ici":
        "— o 06 60 98 92 92. Muita gente prefere telefonar por iniciativa própria, quando se sente pronta. Desde que tenha partilhado a oportunidade aqui",
      "avec ses coordonnées": "com os contactos dele",
      ", le rapprochement est fait : c'est votre partage qui compte, et la prime vous revient même si c'est lui qui m'appelle.":
        ", a ligação é feita: o que conta é a sua partilha, e o prémio é seu mesmo que seja ele a telefonar-me.",
      "Son prénom (ou son nom)": "O nome dele",
      "Indiquez le prénom ou le nom du propriétaire.": "Indique o nome do proprietário.",
      "Son téléphone": "O telefone dele",
      "Indiquez son numéro de téléphone.": "Indique o número de telefone dele.",
      "Je confirme lui avoir parlé et avoir son accord pour que Marie-Céline Etave le contacte.":
        "Confirmo que falei com ele e que tenho a sua autorização para que Marie-Céline Etave o contacte.",
      "Sans son accord, nous ne pouvons pas utiliser ses coordonnées.":
        "Sem a autorização dele, não podemos usar os seus contactos.",
      "Je lui ai aussi donné le 06 60 98 92 92 : il vous appellera peut-être directement.":
        "Também lhe dei o 06 60 98 92 92: talvez lhe telefone diretamente.",
      "Cochez si vous lui avez transmis le numéro. Cela évite que l'appel arrive sans qu'on sache d'où il vient.":
        "Assinale se lhe deu o número. Evita que a chamada chegue sem se saber de onde vem.",

      "Quand nous l'appellerons, pouvons-nous vous citer ?": "Quando lhe telefonarmos, podemos dizer o seu nome?",
      "Dans les deux cas nous lui disons d'où vient l'information — c'est la règle. La seule différence, c'est votre nom.":
        "Nos dois casos dizemos-lhe de onde vem a informação — é a regra. A única diferença é o seu nome.",
      "Oui, vous pouvez me citer": "Sim, podem dizer o meu nome",
      "« C'est votre coiffeuse qui m'a donné votre numéro, avec votre accord. »":
        "« Foi a sua cabeleireira que me deu o seu número, com a sua autorização. »",
      "Non, ne me citez pas": "Não, não digam o meu nome",
      "« J'ai eu votre numéro par un professionnel de votre quartier, qui m'a dit que vous étiez d'accord pour que je vous appelle. » Ni votre nom ni votre enseigne ne sont prononcés.":
        "« Recebi o seu número de um profissional do seu bairro, que me disse que estava de acordo em que eu lhe telefonasse. » Nem o seu nome nem o nome do seu estabelecimento são ditos.",
      "Dites-nous si nous pouvons vous citer.": "Diga-nos se podemos dizer o seu nome.",

      "Votre opportunité n'est pas partie.": "A sua oportunidade não foi enviada.",
      "La connexion a échoué. Vos réponses sont conservées sur cet appareil : réessayez dans un instant, ou appelez le":
        "A ligação falhou. As suas respostas ficam guardadas neste aparelho: tente outra vez daqui a pouco, ou ligue para o",
      "Envoyer l'opportunité": "Enviar a oportunidade",
      "En envoyant, vous acceptez les": "Ao enviar, aceita as",
      "conditions de la prime": "condições do prémio (em francês)",
      ". Vous recevez aussitôt un e-mail de confirmation avec votre numéro d'opportunité.":
        ". Recebe logo um e-mail de confirmação com o número da sua oportunidade.",

      "C'est parti.": "Está feito.",
      "Votre opportunité est enregistrée. Un e-mail de confirmation vient de partir vers":
        "A sua oportunidade está registada. Acabámos de enviar um e-mail de confirmação para",
      "votre adresse": "o seu endereço",
      "— si vous ne le voyez pas, regardez dans les indésirables.": "— se não o vir, verifique o spam.",
      "Votre numéro d'opportunité": "O número da sua oportunidade",
      "Ce numéro est votre repère. Notez-le, ou gardez le message dans vos envois.":
        "Este número é a sua referência. Anote-o, ou guarde a mensagem.",
      "Reçue": "Recebida", "Nous accusons réception par e-mail.": "Confirmamos a receção por e-mail.",
      "Qualifiée": "Avaliada", "Nous vous répondons en moins de 24 heures.": "Respondemos-lhe em menos de 24 horas.",
      "Contact en cours": "Contacto em curso", "Nous approchons le propriétaire.": "Abordamos o proprietário.",
      "Projet immobilier": "Projeto imobiliário", "Un mandat est signé.": "É assinado um mandato.",
      "Vente réalisée": "Venda concretizada", "Signature chez le notaire.": "Assinatura na escritura.",
      "Prime de 1 000 €": "Prémio de 1 000 €", "Virement sous 15 jours.": "Transferência em 15 dias.",
      "Partager une autre opportunité": "Partilhar outra oportunidade",
      "Revenir à l'accueil": "Voltar ao início",
      "Conditions de la prime": "Condições do prémio (FR)",
      "Mentions légales": "Menções legais (FR)",

      "Sophie": "Sofia", "M. Bernard": "Sr. Bernardo",
      "Coiffeuse, plombier, déménageur…": "Cabeleireira, canalizador, mudanças…",
      "Salon Marine, Antony": "Salão Marine, Antony",
      "Ils partent en province à la retraite, ils en ont parlé en juin.":
        "Vão para a província na reforma, falaram nisso em junho.",
      "sophie@exemple.fr": "sofia@exemplo.pt"
    },

    en: {
      "Navigation principale": "Main navigation",
      "Adresses proposées": "Suggested addresses",
      "12 rue des Rabats, Antony": "12 rue des Rabats, Antony",
      "Bât. B": "Block B", "Bâtiment": "Block",
      "Esc. 2": "Stairwell 2", "Escalier": "Stairwell",
      "3e étage": "3rd floor", "Étage": "Floor",
      "— c'est la condition de la prime, et c'est ce qui fait que l'appel se passe bien.":
        "— it is the condition of the bonus, and it is what makes the call go well.",
      "Aller au formulaire": "Skip to the form",
      "Comment ça marche": "How it works",
      "La prime": "The bonus",
      "Vos questions": "Questions",
      "Contact": "Contact",
      "Partager une opportunité": "Share an opportunity",
      "Trois écrans, moins d'une minute. Vous pouvez vous arrêter et reprendre plus tard : ce que vous tapez reste sur votre téléphone.":
        "Three screens, under a minute. You can stop and come back later: what you type stays on your phone.",

      "Où se trouve le bien ?": "Where is the property?",
      "L'adresse suffit. Si vous connaissez le bâtiment ou l'étage, c'est encore mieux — cela évite les confusions dans un grand immeuble.":
        "The address is enough. If you know the block or the floor, better still — it avoids mix-ups in a large building.",
      "Adresse du bien": "Address of the property",
      "Commencez à taper, puis choisissez dans la liste.": "Start typing, then pick from the list.",
      "Changer d'adresse": "Change the address",
      "Cette adresse ne semble pas être en Île-de-France. Nous n'intervenons que dans les huit départements franciliens : 75, 77, 78, 91, 92, 93, 94 et 95.":
        "This address does not appear to be in Île-de-France. We only work in the region's eight departments: 75, 77, 78, 91, 92, 93, 94 and 95.",
      "Indiquez l'adresse du bien pour continuer.": "Enter the address of the property to continue.",
      "Bâtiment, escalier, étage": "Block, stairwell, floor",
      "Facultatif.": "Optional.",
      "Continuer": "Continue",

      "Ce que vous savez": "What you know",
      "Nous avons besoin de savoir qu'un projet existe. Pas de détails sur la vie privée des gens.":
        "We need to know that a plan exists. No details about anyone's private life.",
      "De quel type de bien s'agit-il ?": "What kind of property is it?",
      "Appartement": "Flat", "Maison": "House", "Autre": "Other",
      "Choisissez le type de bien.": "Choose the type of property.",
      "Où en est le projet, à votre connaissance ?": "How far along is the plan, as far as you know?",
      "Ils en parlent": "They're talking about it", "C'est décidé": "It's decided",
      "Ils cherchent déjà": "They're already looking", "Déjà en vente ailleurs": "Already listed elsewhere",
      "Choisissez où en est le projet.": "Choose how far along the plan is.",
      "Deux lignes suffisent. C'est ce qui nous permet d'appeler au bon moment.":
        "Two lines are enough. It's what lets us call at the right moment.",
      "← Revenir": "← Back",

      "Vous, et le propriétaire": "You, and the owner",
      "Vos coordonnées servent à vous tenir au courant et à vous verser la prime. Elles ne servent à rien d'autre.":
        "Your details are used to keep you posted and to pay your bonus. Nothing else.",
      "Votre prénom": "Your first name",
      "Indiquez votre prénom.": "Enter your first name.",
      "Votre métier": "Your trade",
      "C'est ce que nous dirons au propriétaire si vous nous autorisez à vous citer.":
        "This is what we will tell the owner if you let us name you.",
      "Indiquez votre métier.": "Enter your trade.",
      "Votre téléphone": "Your phone number",
      "Pour que nous puissions vous joindre si nous avons une question.":
        "So we can reach you if we have a question.",
      "Indiquez un numéro de téléphone.": "Enter a phone number.",
      "Votre e-mail": "Your email",
      "C'est là que vous recevrez l'accusé de réception, puis le suivi de votre opportunité.":
        "This is where you'll receive the confirmation, then updates on your opportunity.",
      "Indiquez une adresse e-mail : c'est par là que nous vous tiendrons au courant.":
        "Enter an email address: that's how we'll keep you posted.",
      "Votre enseigne ou votre entreprise": "Your shop or business name",

      "Le propriétaire": "The owner",
      "Pour que nous puissions faire notre travail, il nous faut son nom et son numéro.":
        "For us to do our job, we need their name and number.",
      "Demandez-lui d'abord son accord": "Ask their permission first",
      "« Je connais une conseillère immobilière sérieuse, qui travaille dans le quartier. Si votre projet se précise, je peux lui donner votre numéro pour qu'elle vous appelle ? »":
        "“I know a good property adviser who works around here. If your plans firm up, may I give her your number so she can call you?”",
      "C'est la phrase la plus simple. Tant qu'il n'a pas dit oui, ne nous donnez pas ses coordonnées.":
        "That's the simplest way to put it. Until they say yes, don't give us their details.",
      "Vous pouvez aussi lui donner directement mon numéro": "You can also give them my number directly",
      "— le 06 60 98 92 92. Beaucoup de gens préfèrent appeler eux-mêmes, quand ils se sentent prêts. Du moment que vous avez partagé l'opportunité ici":
        "— 06 60 98 92 92. Many people would rather call themselves, when they feel ready. As long as you've shared the opportunity here",
      "avec ses coordonnées": "with their details",
      ", le rapprochement est fait : c'est votre partage qui compte, et la prime vous revient même si c'est lui qui m'appelle.":
        ", the match is made: what counts is your share, and the bonus is yours even if they're the one who calls me.",
      "Son prénom (ou son nom)": "Their name",
      "Indiquez le prénom ou le nom du propriétaire.": "Enter the owner's name.",
      "Son téléphone": "Their phone number",
      "Indiquez son numéro de téléphone.": "Enter their phone number.",
      "Je confirme lui avoir parlé et avoir son accord pour que Marie-Céline Etave le contacte.":
        "I confirm I have spoken to them and have their permission for Marie-Céline Etave to make contact.",
      "Sans son accord, nous ne pouvons pas utiliser ses coordonnées.":
        "Without their permission, we cannot use their details.",
      "Je lui ai aussi donné le 06 60 98 92 92 : il vous appellera peut-être directement.":
        "I also gave them 06 60 98 92 92: they may call you directly.",
      "Cochez si vous lui avez transmis le numéro. Cela évite que l'appel arrive sans qu'on sache d'où il vient.":
        "Tick this if you passed on the number. It stops a call arriving with no idea where it came from.",

      "Quand nous l'appellerons, pouvons-nous vous citer ?": "When we call them, may we name you?",
      "Dans les deux cas nous lui disons d'où vient l'information — c'est la règle. La seule différence, c'est votre nom.":
        "Either way we tell them where the information came from — that's the rule. The only difference is your name.",
      "Oui, vous pouvez me citer": "Yes, you may name me",
      "« C'est votre coiffeuse qui m'a donné votre numéro, avec votre accord. »":
        "“Your hairdresser gave me your number, with your permission.”",
      "Non, ne me citez pas": "No, don't name me",
      "« J'ai eu votre numéro par un professionnel de votre quartier, qui m'a dit que vous étiez d'accord pour que je vous appelle. » Ni votre nom ni votre enseigne ne sont prononcés.":
        "“I was given your number by a local business in your neighbourhood, who told me you were happy for me to call.” Neither your name nor your business name is spoken.",
      "Dites-nous si nous pouvons vous citer.": "Tell us whether we may name you.",

      "Votre opportunité n'est pas partie.": "Your opportunity was not sent.",
      "La connexion a échoué. Vos réponses sont conservées sur cet appareil : réessayez dans un instant, ou appelez le":
        "The connection failed. Your answers are kept on this device: try again in a moment, or call",
      "Envoyer l'opportunité": "Send the opportunity",
      "En envoyant, vous acceptez les": "By sending, you accept the",
      "conditions de la prime": "bonus conditions (in French)",
      ". Vous recevez aussitôt un e-mail de confirmation avec votre numéro d'opportunité.":
        ". You'll receive a confirmation email straight away with your opportunity number.",

      "C'est parti.": "That's done.",
      "Votre opportunité est enregistrée. Un e-mail de confirmation vient de partir vers":
        "Your opportunity is registered. A confirmation email has just gone out to",
      "votre adresse": "your address",
      "— si vous ne le voyez pas, regardez dans les indésirables.": "— if you don't see it, check your spam folder.",
      "Votre numéro d'opportunité": "Your opportunity number",
      "Ce numéro est votre repère. Notez-le, ou gardez le message dans vos envois.":
        "This number is your reference. Note it down, or keep the message.",
      "Reçue": "Received", "Nous accusons réception par e-mail.": "We confirm receipt by email.",
      "Qualifiée": "Assessed", "Nous vous répondons en moins de 24 heures.": "We reply within 24 hours.",
      "Contact en cours": "Contact under way", "Nous approchons le propriétaire.": "We approach the owner.",
      "Projet immobilier": "Property project", "Un mandat est signé.": "A mandate is signed.",
      "Vente réalisée": "Sale completed", "Signature chez le notaire.": "Signing at the notary.",
      "Prime de 1 000 €": "€1,000 bonus", "Virement sous 15 jours.": "Bank transfer within 15 days.",
      "Partager une autre opportunité": "Share another opportunity",
      "Revenir à l'accueil": "Back to the home page",
      "Conditions de la prime": "Bonus conditions (FR)",
      "Mentions légales": "Legal notice (FR)",

      "Sophie": "Sophie", "M. Bernard": "Mr Bernard",
      "Coiffeuse, plombier, déménageur…": "Hairdresser, plumber, removals…",
      "Salon Marine, Antony": "Salon Marine, Antony",
      "Ils partent en province à la retraite, ils en ont parlé en juin.":
        "They're retiring to the countryside, they mentioned it in June.",
      "sophie@exemple.fr": "sophie@example.com"
    }
  };

  const TITRES = {
    pt: "Partilhar uma oportunidade — pros.idf.immo",
    en: "Share an opportunity — pros.idf.immo"
  };

  const dico = T[window.LANGUE_PARTAGE];
  const NBSP = / /g;

  function traduire(t){
    const clef = t.replace(NBSP, " ").replace(/\s+/g, " ").trim();
    return dico[clef];
  }

  function appliquer(){
    document.documentElement.lang = window.LANGUE_PARTAGE;
    document.title = TITRES[window.LANGUE_PARTAGE];

    const marcheur = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const aTraduire = [];
    let n;
    while ((n = marcheur.nextNode())){
      if (!n.nodeValue.trim()) continue;
      if (n.parentNode.closest("script,style")) continue;
      const v = traduire(n.nodeValue);
      if (v) aTraduire.push([n, v]);
    }
    aTraduire.forEach(([noeud, v]) => { noeud.nodeValue = v; });

    document.querySelectorAll("[placeholder]").forEach(el => {
      const v = traduire(el.getAttribute("placeholder"));
      if (v) el.setAttribute("placeholder", v);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", appliquer);
  else appliquer();

  /* L'accusé de réception, dans la langue du professionnel. */
  window.CONFIRMATION = {
    pt: (v) =>
      "Olá " + v.prenom + ",\n\nRecebemos bem a sua oportunidade.\n\n" +
      "Número: " + v.ref + "\nRegistada a: " + v.quand + "\nImóvel: " + v.adresse + "\n\n" +
      "O que acontece agora:\n" +
      "1. Em menos de 24 horas dizemos-lhe se damos seguimento, e porquê.\n" +
      "2. Abordamos o proprietário, respeitando o que escolheu" +
      (v.cite ? " (autorizou-nos a dizer o seu nome)." : " (não diremos o seu nome).") + "\n" +
      (v.numeroDonne ? "   (deu-lhe o meu número: se for ele a telefonar, a sua partilha continua registada e o prémio é seu)\n" : "") +
      "3. Vai sendo informado por e-mail em cada etapa.\n" +
      "4. Se a venda se concretizar, recebe 1 000 € com IVA incluído, nos 15 dias seguintes à escritura.\n" +
      "   (se trabalha com um número SIREN, o prémio passa por uma fatura de angariação de negócio: lembrá-lo-emos na altura)\n\n" +
      "Guarde esta mensagem: é a sua prova de anterioridade se alguém partilhar o mesmo imóvel depois de si.\n\n" +
      "Alguma dúvida? 06 60 98 92 92 ou contact@idf.immo\n(o atendimento é em francês)\n\n" +
      "Marie-Céline Etave\npros.idf.immo",
    en: (v) =>
      "Hello " + v.prenom + ",\n\nWe have received your opportunity.\n\n" +
      "Number: " + v.ref + "\nRegistered on: " + v.quand + "\nProperty: " + v.adresse + "\n\n" +
      "What happens now:\n" +
      "1. Within 24 hours we'll tell you whether we're taking it forward, and why.\n" +
      "2. We approach the owner, respecting what you chose" +
      (v.cite ? " (you allowed us to name you)." : " (we will not say your name).") + "\n" +
      (v.numeroDonne ? "   (you gave them my number: if they call me themselves, your share stays registered and the bonus is yours)\n" : "") +
      "3. You'll be kept posted by email at every stage.\n" +
      "4. If the sale completes, you receive €1,000 including VAT, within 15 days of the signing.\n" +
      "   (if you trade under a SIREN business number, the bonus is paid against an introducer\'s invoice: we will remind you when the time comes)\n\n" +
      "Keep this message: it is your proof of priority if someone shares the same property after you.\n\n" +
      "Any questions? 06 60 98 92 92 or contact@idf.immo\n(we answer in French)\n\n" +
      "Marie-Céline Etave\npros.idf.immo"
  };
})();
