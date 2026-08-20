/* =====================================================================
   pros.idf.immo — traduction des pages juridiques

   Même principe que traductions.js : un seul fichier source, en français,
   traduit à l'affichage selon ?lang=pt ou ?lang=en. Marie-Céline a demandé
   ces traductions ; le multilingue sur un fichier unique est ce qui évite
   que trois versions d'un texte qui engage se mettent à diverger.

   Un bandeau est ajouté dans les versions traduites : la version française
   est la seule qui fasse foi. C'est ce qui rend la traduction possible sans
   créer trois régimes juridiques différents.
   ===================================================================== */
(function () {
  "use strict";

  const LANGUE = (new URLSearchParams(location.search).get("lang") || "fr").toLowerCase();
  const L = (LANGUE === "pt" || LANGUE === "en") ? LANGUE : "fr";

  const PAGE = location.pathname.indexOf("mentions") !== -1 ? "mentions" : "conditions";

  const AVIS = {
    pt: "Esta tradução é fornecida para sua compreensão. <strong>Em caso de divergência, apenas a versão francesa faz fé</strong> — é ela que rege o programa e o contrato assinado. <a href=\"?\">Ver a versão francesa</a>",
    en: "This translation is provided to help you understand. <strong>In the event of any discrepancy, only the French version governs</strong> — it is the one that applies to the programme and to the signed agreement. <a href=\"?\">See the French version</a>"
  };

  const LIENS = {
    pt: ["🇫🇷 Français", "🇵🇹 Português", "🇬🇧 English"],
    en: ["🇫🇷 Français", "🇵🇹 Português", "🇬🇧 English"],
    fr: ["🇫🇷 Français", "🇵🇹 Português", "🇬🇧 English"]
  };

  const TITRES = {
    conditions: { pt: "Condições do prémio — pros.idf.immo", en: "Bonus conditions — pros.idf.immo" },
    mentions:   { pt: "Menções legais — pros.idf.immo",      en: "Legal notice — pros.idf.immo" }
  };

  const ENTETES = {
    conditions: {
      pt: ["Condições do prémio", "O regulamento completo do programa. Diz o mesmo que o resto do site, com mais precisão."],
      en: ["Bonus conditions", "The full rules of the programme. They say the same as the rest of the site, in more precise terms."]
    },
    mentions: {
      pt: ["Menções legais", "Editor, alojamento e proteção de dados pessoais."],
      en: ["Legal notice", "Publisher, hosting and personal data protection."]
    }
  };

  /* ---------------- CONDITIONS DE LA PRIME ---------------- */
  const T_CONDITIONS = {

    pt: {
      "Aller au contenu": "Ir para o conteúdo",
      "Vous avez quelqu'un en tête ?": "Tem alguém em mente?",
      "Il vous faut une adresse et une minute. Si vous n'êtes sûr de rien, partagez quand même : c'est nous que ça regarde ensuite.":
        "Basta uma morada e um minuto. Se não tem a certeza de nada, partilhe à mesma: a partir daí o assunto é connosco.",
      "Partager une opportunité": "Partilhar uma oportunidade",
      "À savoir":
        "A saber",
      "Ce règlement décrit le fonctionnement du programme. Avant tout versement, il est complété par une":
        "Este regulamento descreve o funcionamento do programa. Antes de qualquer pagamento, é completado por um",
      "convention d'indicateur d'affaires":
        "contrato de indicador de negócios",
      "signée entre vous et Marie-Céline Etave, qui reprend ces mêmes règles et fait foi.":
        "assinado entre si e Marie-Céline Etave, que retoma estas mesmas regras e faz fé.",
      "1. Objet":
        "1. Objeto",
      "Le programme pros.idf.immo permet à un commerçant, un artisan ou tout autre professionnel de proximité de partager avec Marie-Céline Etave, conseillère en immobilier, qu'une personne de son environnement professionnel envisage de vendre un bien immobilier situé en Île-de-France.":
        "O programa pros.idf.immo permite a um comerciante, a um artesão ou a qualquer outro profissional de proximidade partilhar com Marie-Céline Etave, consultora imobiliária, que uma pessoa do seu ambiente profissional pondera vender um imóvel situado na Île-de-France.",
      "Le rôle du participant se limite":
        "O papel do participante limita-se",
      "exclusivement à la mise en relation":
        "exclusivamente a pôr em contacto",
      "2. Qui peut participer":
        "2. Quem pode participar",
      "Toute personne majeure exerçant une activité professionnelle de proximité en Île-de-France, qu'elle soit indépendante ou salariée : commerce, artisanat, coiffure et esthétique, déménagement, bâtiment, services à la personne, transport de personnes et activités voisines. La participation est libre, gratuite, sans exclusivité, sans durée d'engagement et sans objectif de volume.":
        "Qualquer pessoa maior de idade que exerça uma atividade profissional de proximidade na Île-de-France, por conta própria ou por conta de outrem: comércio, artesanato, cabeleireiro e estética, mudanças, construção, apoio domiciliário, transporte de pessoas e atividades afins. A participação é livre, gratuita, sem exclusividade, sem duração mínima e sem objetivo de volume.",
      "3. Ce que le participant ne peut pas faire":
        "3. O que o participante não pode fazer",
      "Les opérations d'entremise immobilière sont réservées aux titulaires d'une carte professionnelle par la loi n° 70-9 du 2 janvier 1970. En conséquence, le participant ne peut en aucun cas :":
        "As operações de mediação imobiliária estão reservadas aos titulares de licença profissional pela lei n.º 70-9 de 2 de janeiro de 1970. Por conseguinte, o participante não pode em caso algum:",
      "faire visiter un bien immobilier ;":
        "mostrar um imóvel;",
      "procéder à une estimation ou communiquer un prix, même indicatif ;":
        "fazer uma avaliação ou indicar um preço, mesmo aproximado;",
      "négocier une quelconque condition avec un vendeur ou un acquéreur ;":
        "negociar qualquer condição com um vendedor ou um comprador;",
      "rédiger, présenter ou faire signer un mandat ou tout autre document ;":
        "redigir, apresentar ou fazer assinar um mandato ou qualquer outro documento;",
      "se présenter comme agent immobilier, salarié ou mandataire de Marie-Céline Etave ;":
        "apresentar-se como agente imobiliário, empregado ou mandatário de Marie-Céline Etave;",
      "percevoir une somme quelconque d'un vendeur ou d'un acquéreur.":
        "receber qualquer quantia de um vendedor ou de um comprador.",
      "4. Zone géographique":
        "4. Zona geográfica",
      "Le bien doit être situé dans l'un des huit départements d'Île-de-France : 75, 77, 78, 91, 92, 93, 94, 95.":
        "O imóvel tem de estar situado num dos oito departamentos da Île-de-France: 75, 77, 78, 91, 92, 93, 94, 95.",
      "5. Enregistrement et antériorité":
        "5. Registo e anterioridade",
      "Chaque opportunité partagée reçoit un numéro et une date d'enregistrement.":
        "Cada oportunidade partilhada recebe um número e uma data de registo.",
      "En cas de partages concurrents portant sur un même bien, seul le premier enregistré ouvre droit à la prime.":
        "Em caso de partilhas concorrentes sobre o mesmo imóvel, apenas a primeira registada dá direito ao prémio.",
      "Le participant dont le partage arrive en second en est informé, avec la date du premier enregistrement, sans identification de son auteur.":
        "O participante cuja partilha chega em segundo é informado, com a data do primeiro registo, sem identificação do seu autor.",
      "Une opportunité est valable":
        "Uma oportunidade é válida",
      "vingt-quatre (24) mois":
        "vinte e quatro (24) meses",
      "à compter de son enregistrement. Ce délai repart à chaque contact effectif avec la personne concernée.":
        "a contar do seu registo. Este prazo recomeça a cada contacto efetivo com a pessoa em causa.",
      "6. Montant et fait générateur":
        "6. Montante e facto gerador",
      "La prime est de":
        "O prémio é de",
      "1 000 € toutes taxes comprises, forfaitaires": "1 000 € com todos os impostos incluídos, fixos",
      ", indépendants du prix du bien et des honoraires perçus.":
        ", independentes do preço do imóvel e dos honorários recebidos.",
      "Elle est due à la":
        "É devido na",
      "signature de l'acte authentique de vente":
        "assinatura da escritura pública de venda",
      "chez le notaire, du bien ayant fait l'objet de l'opportunité partagée. Ni le compromis, ni la promesse de vente, ni la signature du mandat n'ouvrent droit à un versement.":
        "no notário, do imóvel objeto da oportunidade partilhada. Nem o contrato-promessa, nem a promessa de venda, nem a assinatura do mandato dão direito a pagamento.",
      "Le nombre de primes par participant et par année n'est":
        "O número de prémios por participante e por ano não é",
      "pas plafonné":
        "limitado",
      "7. Versement":
        "7. Pagamento",
      "Par virement bancaire, dans un délai de":
        "Por transferência bancária, no prazo de",
      "quinze (15) jours":
        "quinze (15) dias",
      "suivant le fait générateur, après signature de la convention d'indicateur d'affaires et communication d'un relevé d'identité bancaire.":
        "após o facto gerador, mediante assinatura do contrato de indicador de negócios e comunicação do IBAN.",
      "Le participant immatriculé (SIREN) établit à cette fin une":
        "O participante registado (SIREN) emite para o efeito uma",
      "facture d'apport d'affaires":
        "fatura de angariação de negócio",
      "; le participant qui n'exerce aucune activité indépendante reçoit la prime sans facture. Le montant et le délai sont identiques dans les deux cas, la facture étant établie pour 1 000 € toutes taxes comprises, la taxe sur la valeur ajoutée étant, le cas échéant, comprise dans ce montant.":
        "; o participante que não exerce qualquer atividade independente recebe o prémio sem fatura. O valor e o prazo são idênticos nos dois casos, sendo a fatura emitida por 1 000 € com todos os impostos incluídos, estando o imposto sobre o valor acrescentado, se aplicável, incluído nesse valor.",
      "8. Cas dans lesquels aucune prime n'est due":
        "8. Casos em que nenhum prémio é devido",
      "La personne concernée était déjà en relation d'affaires avec Marie-Céline Etave, ou avait déjà signé un mandat avec elle, antérieurement au partage.":
        "A pessoa em causa já tinha relação comercial com Marie-Céline Etave, ou já tinha assinado um mandato com ela, antes da partilha.",
      "Un autre participant a partagé le même bien antérieurement.":
        "Outro participante partilhou o mesmo imóvel anteriormente.",
      "Le bien n'est pas situé en Île-de-France.":
        "O imóvel não está situado na Île-de-France.",
      "Le participant se recommande lui-même, recommande un membre de son foyer fiscal, ou un bien dont il est propriétaire ou copropriétaire, y compris les locaux de son activité.":
        "O participante recomenda-se a si próprio, recomenda um membro do seu agregado fiscal, ou um imóvel de que é proprietário ou comproprietário, incluindo as instalações da sua atividade.",
      "Le participant est propriétaire, dirigeant ou associé de l'entreprise venderesse du bien.":
        "O participante é proprietário, dirigente ou sócio da empresa que vende o imóvel.",
      "La vente n'est pas réalisée par Marie-Céline Etave ou par un conseiller de son réseau.":
        "A venda não é realizada por Marie-Céline Etave nem por um consultor da sua rede.",
      "Le participant a transmis les coordonnées d'un tiers sans l'accord préalable de celui-ci.":
        "O participante transmitiu os contactos de um terceiro sem o acordo prévio deste.",
      "L'opportunité a été obtenue par de fausses déclarations, ou en violation de l'article 3.":
        "A oportunidade foi obtida mediante falsas declarações, ou em violação do artigo 3.",
      "Lorsque la vente est réalisée par un autre conseiller du réseau auquel appartient Marie-Céline Etave,":
        "Quando a venda é realizada por outro consultor da rede a que pertence Marie-Céline Etave,",
      "la prime reste due":
        "o prémio continua a ser devido",
      "9. Absence de rémunération du parrainage":
        "9. Ausência de remuneração por angariação",
      "Faire connaître le programme à d'autres personnes ne donne lieu à":
        "Dar a conhecer o programa a outras pessoas não dá lugar a",
      "aucune rémunération":
        "qualquer remuneração",
      ". Seules les mises en relation aboutissant à une vente ouvrent droit à la prime prévue à l'article 6.":
        ". Apenas os contactos que resultem numa venda dão direito ao prémio previsto no artigo 6.",
      "10. Protection des données":
        "10. Proteção de dados",
      "Le participant qui transmet les coordonnées d'un tiers garantit en avoir informé cette personne et avoir recueilli son accord préalable et explicite. Cette garantie est une condition essentielle : à défaut, aucune prime n'est due.":
        "O participante que transmite os contactos de um terceiro garante ter informado essa pessoa e ter obtido o seu acordo prévio e explícito. Esta garantia é uma condição essencial: na sua falta, nenhum prémio é devido.",
      "La transmission de tout fichier, liste ou extraction de clientèle est":
        "A transmissão de qualquer ficheiro, lista ou extração de clientes é",
      "exclue":
        "excluída",
      ": une opportunité concerne une personne identifiée, informée et consentante, à l'exclusion de toute communication de données en nombre.":
        ": uma oportunidade diz respeito a uma pessoa identificada, informada e que deu o seu acordo, com exclusão de qualquer comunicação de dados em massa.",
      "Marie-Céline Etave s'engage à n'utiliser ces coordonnées qu'une seule fois, à indiquer dès le début de son premier appel la provenance de l'information, et à les effacer immédiatement à la demande de la personne concernée.":
        "Marie-Céline Etave compromete-se a utilizar esses contactos uma única vez, a indicar logo no início da primeira chamada a origem da informação, e a apagá-los imediatamente a pedido da pessoa em causa.",
      "Détail du traitement des données →":
        "Detalhe do tratamento de dados →",
      "11. Fiscalité":
        "11. Fiscalidade",
      "Pour le participant immatriculé, les sommes versées constituent une recette de son activité professionnelle, soumise au régime fiscal et social qui lui est propre. Il lui appartient de vérifier auprès de son conseil le traitement applicable, notamment en matière de taxe sur la valeur ajoutée.":
        "Para o participante registado, as quantias pagas constituem uma receita da sua atividade profissional, sujeita ao regime fiscal e social que lhe é próprio. Cabe-lhe verificar junto do seu contabilista o tratamento aplicável, nomeadamente em matéria de imposto sobre o valor acrescentado.",
      "Pour le participant n'exerçant aucune activité indépendante, les sommes versées constituent un revenu imposable relevant des bénéfices non commerciaux non professionnels (article 92 du Code général des impôts), à déclarer au moyen du formulaire 2042-C-PRO. Aucune retenue n'est opérée à la source.":
        "Para o participante que não exerce qualquer atividade independente, as quantias pagas constituem um rendimento tributável abrangido pelos rendimentos não comerciais não profissionais (artigo 92.º do Código Geral dos Impostos francês), a declarar no formulário 2042-C-PRO. Não é feita qualquer retenção na fonte.",
      "En l'absence de plafond annuel, il appartient au participant de s'assurer, au-delà d'un rythme régulier, que son activité ne relève pas d'un statut d'indépendant. Le cumul annuel des primes qui lui ont été versées lui est communiqué à cette fin.":
        "Não havendo limite anual, cabe ao participante assegurar-se, a partir de um ritmo regular, de que a sua atividade não exige um estatuto de trabalhador independente. O total anual dos prémios que lhe foram pagos é-lhe comunicado para esse efeito.",
      "12. Durée et modification":
        "12. Duração e alteração",
      "Le programme est ouvert sans durée déterminée. Il peut être modifié ou interrompu à tout moment : les opportunités enregistrées avant la modification restent régies par les conditions en vigueur à la date de leur enregistrement.":
        "O programa está aberto por tempo indeterminado. Pode ser alterado ou interrompido a qualquer momento: as oportunidades registadas antes da alteração continuam regidas pelas condições em vigor à data do seu registo.",
      "Chaque participant peut cesser sa participation à tout moment, sans préavis ni justification.":
        "Cada participante pode cessar a sua participação a qualquer momento, sem pré-aviso nem justificação.",
      "Dernière mise à jour : 20 août 2026.":
        "Última atualização: 20 de agosto de 2026."
    },

    en: {
      "Aller au contenu": "Skip to content",
      "Vous avez quelqu'un en tête ?": "Do you have someone in mind?",
      "Il vous faut une adresse et une minute. Si vous n'êtes sûr de rien, partagez quand même : c'est nous que ça regarde ensuite.":
        "All it takes is an address and a minute. If you are not sure of anything, share it anyway — from there it is our concern, not yours.",
      "Partager une opportunité": "Share an opportunity",
      "À savoir":
        "Worth knowing",
      "Ce règlement décrit le fonctionnement du programme. Avant tout versement, il est complété par une":
        "These rules describe how the programme works. Before any payment, they are completed by a",
      "convention d'indicateur d'affaires":
        "business introducer agreement",
      "signée entre vous et Marie-Céline Etave, qui reprend ces mêmes règles et fait foi.":
        "signed between you and Marie-Céline Etave, which restates these same rules and governs.",
      "1. Objet":
        "1. Purpose",
      "Le programme pros.idf.immo permet à un commerçant, un artisan ou tout autre professionnel de proximité de partager avec Marie-Céline Etave, conseillère en immobilier, qu'une personne de son environnement professionnel envisage de vendre un bien immobilier situé en Île-de-France.":
        "The pros.idf.immo programme allows a shopkeeper, a tradesperson or any other local business to tell Marie-Céline Etave, property adviser, that someone in their working environment is considering selling a property located in the Île-de-France region.",
      "Le rôle du participant se limite":
        "The participant's role is limited",
      "exclusivement à la mise en relation":
        "exclusively to making the introduction",
      "2. Qui peut participer":
        "2. Who may take part",
      "Toute personne majeure exerçant une activité professionnelle de proximité en Île-de-France, qu'elle soit indépendante ou salariée : commerce, artisanat, coiffure et esthétique, déménagement, bâtiment, services à la personne, transport de personnes et activités voisines. La participation est libre, gratuite, sans exclusivité, sans durée d'engagement et sans objectif de volume.":
        "Any adult carrying on a local business activity in the Île-de-France region, whether self-employed or employed: retail, trades, hairdressing and beauty, removals, construction, home care, passenger transport and related activities. Taking part is free, open, non-exclusive, with no minimum term and no volume target.",
      "3. Ce que le participant ne peut pas faire":
        "3. What the participant may not do",
      "Les opérations d'entremise immobilière sont réservées aux titulaires d'une carte professionnelle par la loi n° 70-9 du 2 janvier 1970. En conséquence, le participant ne peut en aucun cas :":
        "Property brokerage is reserved to holders of a professional licence under French law no. 70-9 of 2 January 1970. Accordingly, the participant may under no circumstances:",
      "faire visiter un bien immobilier ;":
        "show anyone around a property;",
      "procéder à une estimation ou communiquer un prix, même indicatif ;":
        "carry out a valuation or quote a price, even a rough one;",
      "négocier une quelconque condition avec un vendeur ou un acquéreur ;":
        "negotiate any term with a seller or a buyer;",
      "rédiger, présenter ou faire signer un mandat ou tout autre document ;":
        "draft, present or have signed a mandate or any other document;",
      "se présenter comme agent immobilier, salarié ou mandataire de Marie-Céline Etave ;":
        "hold themselves out as an estate agent, employee or agent of Marie-Céline Etave;",
      "percevoir une somme quelconque d'un vendeur ou d'un acquéreur.":
        "receive any sum from a seller or a buyer.",
      "4. Zone géographique":
        "4. Geographical area",
      "Le bien doit être situé dans l'un des huit départements d'Île-de-France : 75, 77, 78, 91, 92, 93, 94, 95.":
        "The property must be located in one of the eight departments of Île-de-France: 75, 77, 78, 91, 92, 93, 94, 95.",
      "5. Enregistrement et antériorité":
        "5. Registration and priority",
      "Chaque opportunité partagée reçoit un numéro et une date d'enregistrement.":
        "Every shared opportunity receives a number and a registration date.",
      "En cas de partages concurrents portant sur un même bien, seul le premier enregistré ouvre droit à la prime.":
        "Where competing shares concern the same property, only the first registered gives entitlement to the bonus.",
      "Le participant dont le partage arrive en second en est informé, avec la date du premier enregistrement, sans identification de son auteur.":
        "The participant whose share arrives second is told so, together with the date of the first registration, without its author being identified.",
      "Une opportunité est valable":
        "An opportunity is valid for",
      "vingt-quatre (24) mois":
        "twenty-four (24) months",
      "à compter de son enregistrement. Ce délai repart à chaque contact effectif avec la personne concernée.":
        "from its registration. This period restarts on each effective contact with the person concerned.",
      "6. Montant et fait générateur":
        "6. Amount and triggering event",
      "La prime est de":
        "The bonus is",
      "1 000 € toutes taxes comprises, forfaitaires": "€1,000 including all taxes, a flat amount",
      ", indépendants du prix du bien et des honoraires perçus.":
        ", independent of the price of the property and of the fees received.",
      "Elle est due à la":
        "It falls due on the",
      "signature de l'acte authentique de vente":
        "signing of the deed of sale",
      "chez le notaire, du bien ayant fait l'objet de l'opportunité partagée. Ni le compromis, ni la promesse de vente, ni la signature du mandat n'ouvrent droit à un versement.":
        "before the notary, for the property covered by the shared opportunity. Neither the preliminary contract, nor the promise of sale, nor the signing of the mandate gives entitlement to any payment.",
      "Le nombre de primes par participant et par année n'est":
        "The number of bonuses per participant per year is",
      "pas plafonné":
        "not capped",
      "7. Versement":
        "7. Payment",
      "Par virement bancaire, dans un délai de":
        "By bank transfer, within",
      "quinze (15) jours":
        "fifteen (15) days",
      "suivant le fait générateur, après signature de la convention d'indicateur d'affaires et communication d'un relevé d'identité bancaire.":
        "of the triggering event, once the business introducer agreement has been signed and bank details provided.",
      "Le participant immatriculé (SIREN) établit à cette fin une":
        "A participant registered as a business (SIREN) issues for this purpose an",
      "facture d'apport d'affaires":
        "introducer's invoice",
      "; le participant qui n'exerce aucune activité indépendante reçoit la prime sans facture. Le montant et le délai sont identiques dans les deux cas, la facture étant établie pour 1 000 € toutes taxes comprises, la taxe sur la valeur ajoutée étant, le cas échéant, comprise dans ce montant.":
        "; a participant with no self-employed activity receives the bonus without an invoice. The amount and the deadline are identical in both cases, the invoice being issued for €1,000 including all taxes, value added tax being included in that amount where applicable.",
      "8. Cas dans lesquels aucune prime n'est due":
        "8. Cases in which no bonus is due",
      "La personne concernée était déjà en relation d'affaires avec Marie-Céline Etave, ou avait déjà signé un mandat avec elle, antérieurement au partage.":
        "The person concerned was already in a business relationship with Marie-Céline Etave, or had already signed a mandate with her, before the share.",
      "Un autre participant a partagé le même bien antérieurement.":
        "Another participant shared the same property earlier.",
      "Le bien n'est pas situé en Île-de-France.":
        "The property is not located in Île-de-France.",
      "Le participant se recommande lui-même, recommande un membre de son foyer fiscal, ou un bien dont il est propriétaire ou copropriétaire, y compris les locaux de son activité.":
        "The participant recommends themselves, a member of their tax household, or a property they own or co-own, including the premises of their own business.",
      "Le participant est propriétaire, dirigeant ou associé de l'entreprise venderesse du bien.":
        "The participant owns, runs or is a partner in the company selling the property.",
      "La vente n'est pas réalisée par Marie-Céline Etave ou par un conseiller de son réseau.":
        "The sale is not carried out by Marie-Céline Etave or by an adviser in her network.",
      "Le participant a transmis les coordonnées d'un tiers sans l'accord préalable de celui-ci.":
        "The participant passed on a third party's contact details without that person's prior agreement.",
      "L'opportunité a été obtenue par de fausses déclarations, ou en violation de l'article 3.":
        "The opportunity was obtained through false statements, or in breach of article 3.",
      "Lorsque la vente est réalisée par un autre conseiller du réseau auquel appartient Marie-Céline Etave,":
        "Where the sale is carried out by another adviser in the network to which Marie-Céline Etave belongs,",
      "la prime reste due":
        "the bonus remains due",
      "9. Absence de rémunération du parrainage":
        "9. No payment for referrals",
      "Faire connaître le programme à d'autres personnes ne donne lieu à":
        "Telling others about the programme gives rise to",
      "aucune rémunération":
        "no payment whatsoever",
      ". Seules les mises en relation aboutissant à une vente ouvrent droit à la prime prévue à l'article 6.":
        ". Only introductions resulting in a sale give entitlement to the bonus set out in article 6.",
      "10. Protection des données":
        "10. Data protection",
      "Le participant qui transmet les coordonnées d'un tiers garantit en avoir informé cette personne et avoir recueilli son accord préalable et explicite. Cette garantie est une condition essentielle : à défaut, aucune prime n'est due.":
        "A participant who passes on a third party's contact details warrants that they have informed that person and obtained their prior, explicit agreement. This warranty is an essential condition: failing it, no bonus is due.",
      "La transmission de tout fichier, liste ou extraction de clientèle est":
        "Passing on any customer file, list or data export is",
      "exclue":
        "excluded",
      ": une opportunité concerne une personne identifiée, informée et consentante, à l'exclusion de toute communication de données en nombre.":
        ": an opportunity concerns one identified person who has been informed and has agreed, to the exclusion of any bulk transfer of data.",
      "Marie-Céline Etave s'engage à n'utiliser ces coordonnées qu'une seule fois, à indiquer dès le début de son premier appel la provenance de l'information, et à les effacer immédiatement à la demande de la personne concernée.":
        "Marie-Céline Etave undertakes to use those details once only, to state at the very start of her first call where the information came from, and to erase them immediately at the request of the person concerned.",
      "Détail du traitement des données →":
        "Details of data processing →",
      "11. Fiscalité":
        "11. Tax",
      "Pour le participant immatriculé, les sommes versées constituent une recette de son activité professionnelle, soumise au régime fiscal et social qui lui est propre. Il lui appartient de vérifier auprès de son conseil le traitement applicable, notamment en matière de taxe sur la valeur ajoutée.":
        "For a participant registered as a business, the sums paid are income of their professional activity, subject to their own tax and social security regime. It is for them to check the applicable treatment with their adviser, in particular as regards value added tax.",
      "Pour le participant n'exerçant aucune activité indépendante, les sommes versées constituent un revenu imposable relevant des bénéfices non commerciaux non professionnels (article 92 du Code général des impôts), à déclarer au moyen du formulaire 2042-C-PRO. Aucune retenue n'est opérée à la source.":
        "For a participant with no self-employed activity, the sums paid are taxable income falling under non-professional non-commercial profits (article 92 of the French General Tax Code), to be declared on form 2042-C-PRO. No deduction is made at source.",
      "En l'absence de plafond annuel, il appartient au participant de s'assurer, au-delà d'un rythme régulier, que son activité ne relève pas d'un statut d'indépendant. Le cumul annuel des primes qui lui ont été versées lui est communiqué à cette fin.":
        "As there is no annual cap, it is for the participant to satisfy themselves, beyond a regular pace, that their activity does not require self-employed status. The annual total of bonuses paid to them is provided for that purpose.",
      "12. Durée et modification":
        "12. Duration and amendment",
      "Le programme est ouvert sans durée déterminée. Il peut être modifié ou interrompu à tout moment : les opportunités enregistrées avant la modification restent régies par les conditions en vigueur à la date de leur enregistrement.":
        "The programme runs for an indefinite period. It may be amended or discontinued at any time: opportunities registered before an amendment remain governed by the conditions in force on their registration date.",
      "Chaque participant peut cesser sa participation à tout moment, sans préavis ni justification.":
        "Each participant may stop taking part at any time, without notice or justification.",
      "Dernière mise à jour : 20 août 2026.":
        "Last updated: 20 August 2026."
    }
  };

  const T_MENTIONS = {

    pt: {
      "Aller au contenu": "Ir para o conteúdo",
      "Vous avez quelqu'un en tête ?": "Tem alguém em mente?",
      "Il vous faut une adresse et une minute. Si vous n'êtes sûr de rien, partagez quand même : c'est nous que ça regarde ensuite.":
        "Basta uma morada e um minuto. Se não tem a certeza de nada, partilhe à mesma: a partir daí o assunto é connosco.",
      "Partager une opportunité": "Partilhar uma oportunidade",
      "Éditeur du site":
        "Editor do site",
      ", entrepreneur individuel, agent commercial en immobilier auprès de BSK Immobilier.":
        ", empresária em nome individual, agente comercial imobiliária junto da BSK Immobilier.",
      "Immatriculée au RSAC de Nanterre sous le numéro 431 897 958 00051.":
        "Registada no RSAC de Nanterre sob o número 431 897 958 00051.",
      "Intervenant sous la carte professionnelle n° CP 3101 2018 000 030 369 délivrée par la CCI de Toulouse.":
        "Atuando ao abrigo da licença profissional n.º CP 3101 2018 000 030 369 emitida pela CCI de Toulouse.",
      "Téléphone :":
        "Telefone:",
      "Courriel :":
        "E-mail:",
      "Directrice de la publication : Marie-Céline Etave.":
        "Diretora de publicação: Marie-Céline Etave.",
      "Hébergement":
        "Alojamento",
      "Le site est hébergé par GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.":
        "O site é alojado pelo GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Estados Unidos.",
      "Données personnelles":
        "Dados pessoais",
      "Ce que ce site collecte":
        "O que este site recolhe",
      "Le site n'héberge aucune base de données. Lorsque vous validez le formulaire de partage, son contenu est transmis par courriel à Marie-Céline Etave, ainsi qu'à vous-même sous forme d'accusé de réception.":
        "O site não aloja qualquer base de dados. Quando valida o formulário de partilha, o seu conteúdo é enviado por e-mail a Marie-Céline Etave, e também a si sob a forma de aviso de receção.",
      "Cet acheminement est assuré par le service":
        "Este encaminhamento é assegurado pelo serviço",
      ", prestataire technique qui ne fait que transmettre le message et ne l'exploite pas à d'autres fins. Aucun autre tiers n'y a accès.":
        ", prestador técnico que se limita a transmitir a mensagem e não a utiliza para outros fins. Nenhum outro terceiro lhe tem acesso.",
      "Les informations que vous saisissez sont également conservées temporairement dans la mémoire locale de votre navigateur, uniquement pour vous permettre de reprendre une saisie interrompue. Elles sont effacées dès l'envoi réussi, et vous pouvez les supprimer à tout moment en vidant les données de site de votre navigateur.":
        "As informações que introduz são também guardadas temporariamente na memória local do seu navegador, apenas para lhe permitir retomar um preenchimento interrompido. São apagadas assim que o envio é bem-sucedido, e pode eliminá-las a qualquer momento limpando os dados de sites do seu navegador.",
      "Ce qui est traité ensuite":
        "O que é tratado a seguir",
      "Les informations reçues par courriel sont traitées par Marie-Céline Etave aux seules fins de qualifier l'opportunité, prendre contact et suivre le dossier jusqu'à son terme.":
        "As informações recebidas por e-mail são tratadas por Marie-Céline Etave apenas para avaliar a oportunidade, estabelecer contacto e acompanhar o processo até ao fim.",
      "Base légale":
        "Base legal",
      ": l'exécution de la relation d'indicateur d'affaires pour les données du participant ; l'intérêt légitime à prendre contact, fondé sur l'accord préalable recueilli, pour les données d'un propriétaire transmises par un participant.":
        ": a execução da relação de indicador de negócios para os dados do participante; o interesse legítimo em estabelecer contacto, fundado no acordo prévio obtido, para os dados de um proprietário transmitidos por um participante.",
      "Destinataire":
        "Destinatário",
      ": Marie-Céline Etave uniquement. Aucune donnée n'est cédée, revendue ou transmise à des tiers à des fins commerciales.":
        ": apenas Marie-Céline Etave. Nenhum dado é cedido, revendido ou transmitido a terceiros para fins comerciais.",
      "Durée de conservation":
        "Prazo de conservação",
      ": vingt-quatre mois pour une opportunité restée sans suite ; la durée légale applicable aux dossiers ayant abouti à une transaction.":
        ": vinte e quatro meses para uma oportunidade sem seguimento; o prazo legal aplicável aos processos que resultaram numa transação.",
      "Le programme n'accepte aucun fichier, liste ou extraction de clientèle : une opportunité concerne une personne identifiée, informée et consentante.":
        "O programa não aceita qualquer ficheiro, lista ou extração de clientes: uma oportunidade diz respeito a uma pessoa identificada, informada e que deu o seu acordo.",
      "Si vos coordonnées ont été transmises par un professionnel":
        "Se os seus contactos foram transmitidos por um profissional",
      "Un participant ne peut transmettre vos coordonnées qu'après vous avoir informé et avoir recueilli votre accord. Lors du premier appel, la provenance de l'information vous est indiquée.":
        "Um participante só pode transmitir os seus contactos depois de o ter informado e obtido o seu acordo. Na primeira chamada, é-lhe indicada a origem da informação.",
      "Vos coordonnées ne sont utilisées":
        "Os seus contactos são utilizados",
      "qu'une seule fois":
        "uma única vez",
      ". Si vous ne donnez pas suite, vous n'êtes pas rappelé et rien n'est conservé. Vous pouvez demander leur effacement immédiat à":
        ". Se não der seguimento, não volta a ser contactado e nada é conservado. Pode pedir a sua eliminação imediata para",
      "Vos droits":
        "Os seus direitos",
      "Conformément au règlement (UE) 2016/679 et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité. Écrivez à":
        "Nos termos do regulamento (UE) 2016/679 e da lei francesa Informatique et Libertés, dispõe de direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade. Escreva para",
      "Vous pouvez également introduire une réclamation auprès de la CNIL — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —":
        "Pode igualmente apresentar reclamação junto da CNIL — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —",
      "Cookies":
        "Cookies",
      "Ce site ne dépose":
        "Este site não coloca",
      "aucun cookie":
        "qualquer cookie",
      "et n'utilise aucun outil de mesure d'audience ou de traçage publicitaire.":
        "e não utiliza qualquer ferramenta de medição de audiência ou de rastreio publicitário.",
      "Trois ressources extérieures sont appelées par les pages : les polices de caractères servies par Google Fonts ; l'API publique de la Base Adresse Nationale (":
        "As páginas recorrem a três recursos externos: os tipos de letra servidos pelo Google Fonts; a API pública da Base Adresse Nationale (",
      "), service de l'État français, lorsque vous saisissez une adresse ; et le service d'acheminement de courriel":
        "), serviço do Estado francês, quando introduz uma morada; e o serviço de encaminhamento de e-mail",
      ", appelé uniquement au moment où vous validez le formulaire. Les deux premières ne transmettent aucune coordonnée.":
        ", chamado apenas no momento em que valida o formulário. Os dois primeiros não transmitem qualquer contacto.",
      "Propriété intellectuelle":
        "Propriedade intelectual",
      "L'ensemble des contenus de ce site (textes, illustrations, mise en page) est la propriété de Marie-Céline Etave, sauf mention contraire.":
        "Todos os conteúdos deste site (textos, ilustrações, paginação) são propriedade de Marie-Céline Etave, salvo indicação em contrário.",
      "Portée de l'information":
        "Alcance da informação",
      "Les informations de ce site décrivent le fonctionnement du programme et ne constituent ni un conseil juridique, ni un conseil fiscal, ni une garantie de résultat. Les conditions de la prime font l'objet d'un":
        "As informações deste site descrevem o funcionamento do programa e não constituem aconselhamento jurídico, aconselhamento fiscal, nem garantia de resultado. As condições do prémio são objeto de um",
      "règlement dédié":
        "regulamento próprio",
      "et d'une convention signée avant tout versement.":
        "e de um contrato assinado antes de qualquer pagamento.",
      "Dernière mise à jour : 20 août 2026.":
        "Última atualização: 20 de agosto de 2026."
    },

    en: {
      "Aller au contenu": "Skip to content",
      "Vous avez quelqu'un en tête ?": "Do you have someone in mind?",
      "Il vous faut une adresse et une minute. Si vous n'êtes sûr de rien, partagez quand même : c'est nous que ça regarde ensuite.":
        "All it takes is an address and a minute. If you are not sure of anything, share it anyway — from there it is our concern, not yours.",
      "Partager une opportunité": "Share an opportunity",
      "Éditeur du site":
        "Site publisher",
      ", entrepreneur individuel, agent commercial en immobilier auprès de BSK Immobilier.":
        ", sole trader, commercial property agent with BSK Immobilier.",
      "Immatriculée au RSAC de Nanterre sous le numéro 431 897 958 00051.":
        "Registered with the Nanterre RSAC under number 431 897 958 00051.",
      "Intervenant sous la carte professionnelle n° CP 3101 2018 000 030 369 délivrée par la CCI de Toulouse.":
        "Operating under professional licence no. CP 3101 2018 000 030 369 issued by the Toulouse Chamber of Commerce.",
      "Téléphone :":
        "Telephone:",
      "Courriel :":
        "Email:",
      "Directrice de la publication : Marie-Céline Etave.":
        "Publication director: Marie-Céline Etave.",
      "Hébergement":
        "Hosting",
      "Le site est hébergé par GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.":
        "The site is hosted by GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States.",
      "Données personnelles":
        "Personal data",
      "Ce que ce site collecte":
        "What this site collects",
      "Le site n'héberge aucune base de données. Lorsque vous validez le formulaire de partage, son contenu est transmis par courriel à Marie-Céline Etave, ainsi qu'à vous-même sous forme d'accusé de réception.":
        "The site hosts no database. When you submit the sharing form, its contents are sent by email to Marie-Céline Etave, and to you as a confirmation.",
      "Cet acheminement est assuré par le service":
        "This delivery is handled by the service",
      ", prestataire technique qui ne fait que transmettre le message et ne l'exploite pas à d'autres fins. Aucun autre tiers n'y a accès.":
        ", a technical provider which merely forwards the message and does not use it for any other purpose. No other third party has access to it.",
      "Les informations que vous saisissez sont également conservées temporairement dans la mémoire locale de votre navigateur, uniquement pour vous permettre de reprendre une saisie interrompue. Elles sont effacées dès l'envoi réussi, et vous pouvez les supprimer à tout moment en vidant les données de site de votre navigateur.":
        "The information you enter is also kept temporarily in your browser's local storage, solely so you can resume an interrupted entry. It is erased as soon as sending succeeds, and you can delete it at any time by clearing your browser's site data.",
      "Ce qui est traité ensuite":
        "What is processed afterwards",
      "Les informations reçues par courriel sont traitées par Marie-Céline Etave aux seules fins de qualifier l'opportunité, prendre contact et suivre le dossier jusqu'à son terme.":
        "Information received by email is processed by Marie-Céline Etave solely to assess the opportunity, make contact and follow the matter through to its conclusion.",
      "Base légale":
        "Legal basis",
      ": l'exécution de la relation d'indicateur d'affaires pour les données du participant ; l'intérêt légitime à prendre contact, fondé sur l'accord préalable recueilli, pour les données d'un propriétaire transmises par un participant.":
        ": performance of the business introducer relationship for the participant's data; legitimate interest in making contact, founded on the prior agreement obtained, for an owner's data passed on by a participant.",
      "Destinataire":
        "Recipient",
      ": Marie-Céline Etave uniquement. Aucune donnée n'est cédée, revendue ou transmise à des tiers à des fins commerciales.":
        ": Marie-Céline Etave only. No data is sold, transferred or passed to third parties for commercial purposes.",
      "Durée de conservation":
        "Retention period",
      ": vingt-quatre mois pour une opportunité restée sans suite ; la durée légale applicable aux dossiers ayant abouti à une transaction.":
        ": twenty-four months for an opportunity that came to nothing; the applicable statutory period for matters that led to a transaction.",
      "Le programme n'accepte aucun fichier, liste ou extraction de clientèle : une opportunité concerne une personne identifiée, informée et consentante.":
        "The programme accepts no customer file, list or data export: an opportunity concerns one identified person who has been informed and has agreed.",
      "Si vos coordonnées ont été transmises par un professionnel":
        "If your details were passed on by a local business",
      "Un participant ne peut transmettre vos coordonnées qu'après vous avoir informé et avoir recueilli votre accord. Lors du premier appel, la provenance de l'information vous est indiquée.":
        "A participant may only pass on your details after informing you and obtaining your agreement. On the first call, you are told where the information came from.",
      "Vos coordonnées ne sont utilisées":
        "Your details are used",
      "qu'une seule fois":
        "once only",
      ". Si vous ne donnez pas suite, vous n'êtes pas rappelé et rien n'est conservé. Vous pouvez demander leur effacement immédiat à":
        ". If you do not follow up, you are not called again and nothing is kept. You may request immediate erasure at",
      "Vos droits":
        "Your rights",
      "Conformément au règlement (UE) 2016/679 et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité. Écrivez à":
        "Under Regulation (EU) 2016/679 and the French Data Protection Act, you have rights of access, rectification, erasure, restriction, objection and portability. Write to",
      "Vous pouvez également introduire une réclamation auprès de la CNIL — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —":
        "You may also lodge a complaint with the CNIL — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —",
      "Cookies":
        "Cookies",
      "Ce site ne dépose":
        "This site places",
      "aucun cookie":
        "no cookies",
      "et n'utilise aucun outil de mesure d'audience ou de traçage publicitaire.":
        "and uses no analytics or advertising tracking tools.",
      "Trois ressources extérieures sont appelées par les pages : les polices de caractères servies par Google Fonts ; l'API publique de la Base Adresse Nationale (":
        "Pages call on three external resources: typefaces served by Google Fonts; the public API of the French national address database (",
      "), service de l'État français, lorsque vous saisissez une adresse ; et le service d'acheminement de courriel":
        "), a French state service, when you enter an address; and the email delivery service",
      ", appelé uniquement au moment où vous validez le formulaire. Les deux premières ne transmettent aucune coordonnée.":
        ", called only when you submit the form. The first two transmit no contact details.",
      "Propriété intellectuelle":
        "Intellectual property",
      "L'ensemble des contenus de ce site (textes, illustrations, mise en page) est la propriété de Marie-Céline Etave, sauf mention contraire.":
        "All content on this site (text, illustrations, layout) is the property of Marie-Céline Etave, unless otherwise stated.",
      "Portée de l'information":
        "Scope of the information",
      "Les informations de ce site décrivent le fonctionnement du programme et ne constituent ni un conseil juridique, ni un conseil fiscal, ni une garantie de résultat. Les conditions de la prime font l'objet d'un":
        "The information on this site describes how the programme works and constitutes neither legal advice, nor tax advice, nor a guarantee of any result. The bonus conditions are set out in",
      "règlement dédié":
        "dedicated rules",
      "et d'une convention signée avant tout versement.":
        "and in an agreement signed before any payment.",
      "Dernière mise à jour : 20 août 2026.":
        "Last updated: 20 August 2026."
    }
  };

  const dico = (PAGE === "mentions" ? T_MENTIONS : T_CONDITIONS)[L];

  function traduire(t){
    const clef = t.replace(/ /g, " ").replace(/\s+/g, " ").trim();
    return dico ? dico[clef] : null;
  }

  function selecteur(){
    const barre = document.createElement("div");
    barre.className = "conteneur etroit";
    barre.style.cssText = "display:flex;gap:14px;font-size:.88rem;padding-top:14px";
    const base = location.pathname.split("/").pop();
    [["", 0], ["?lang=pt", 1], ["?lang=en", 2]].forEach(([q, i]) => {
      const a = document.createElement("a");
      a.href = base + q;
      a.textContent = LIENS[L][i];
      if ((q === "" && L === "fr") || q === "?lang=" + L) a.setAttribute("aria-current", "page");
      barre.appendChild(a);
    });
    const contenu = document.querySelector(".contenu");
    if (contenu) contenu.parentNode.insertBefore(barre, contenu);
  }

  function appliquer(){
    selecteur();
    if (L === "fr") return;

    document.documentElement.lang = L;
    document.title = TITRES[PAGE][L];

    const tete = document.querySelector(".page-tete");
    if (tete){
      const h1 = tete.querySelector("h1"), p = tete.querySelector("p");
      if (h1) h1.textContent = ENTETES[PAGE][L][0];
      if (p)  p.textContent  = ENTETES[PAGE][L][1];
    }

    const marcheur = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const aTraduire = [];
    let n;
    while ((n = marcheur.nextNode())){
      if (!n.nodeValue.trim()) continue;
      if (n.parentNode.closest("script,style,.page-tete,.entete,.pied")) continue;
      const v = traduire(n.nodeValue);
      if (v) aTraduire.push([n, v]);
    }
    aTraduire.forEach(([noeud, v]) => { noeud.nodeValue = v; });

    // Le bandeau : la version française est la seule qui engage.
    const avis = document.createElement("div");
    avis.className = "encart or";
    avis.innerHTML = '<span class="etiq">' + (L === "pt" ? "Tradução" : "Translation") + "</span><p>" + AVIS[L] + "</p>";
    const contenu = document.querySelector(".contenu .etroit") || document.querySelector(".contenu");
    if (contenu) contenu.insertBefore(avis, contenu.firstChild);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", appliquer);
  else appliquer();
})();
