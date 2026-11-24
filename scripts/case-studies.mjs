// Detailed case-study content for every project page (realisations/<id>/).
// Facts come from the project records and the client work itself; no figures are
// invented. Prototype pages say plainly what the demonstration does not prove.
//
// Fields (all optional except headline):
//  headline   statement used as the page title (the project name stays in the label)
//  accent     hero glow colour
//  services   short service tags shown in the hero
//  stack      technologies (tiles near the end of the page)
//  stats      [{n, label}] factual numbers only
//  about      [lead, more]          challenge [lead, more]
//  example    a concrete everyday scenario
//  process    [{title, text, frame?, alt?}]  frame = assets/video/frames/<frame>.webp
//  results    list; resultsTitle overrides the heading
//  flow       system flow steps
//  videos     [{file, title, text}] = assets/video/<file>.mp4 (8-second loops)
//  scope      what Deux Rives Web owned
//  limits / next  honest boundaries and the next stage (prototypes)

export const caseStudies = {
  'freshbox-tech-marketplace': {
    headline: 'Une marketplace B2B où chaque vendeur garde la main sur son catalogue',
    accent: '#19C08E',
    services: ['Architecture marketplace', 'Développement WordPress', 'WooCommerce et WCFM', 'Intégrations'],
    stack: ['WordPress', 'WooCommerce', 'WCFM', 'Ultimate Member', 'ACF', 'Elementor', 'PHP', 'WPCode'],
    stats: [
      {n: '2', label: 'sites livrés : la marketplace et le site Solutions'},
      {n: '7', label: 'grandes rubriques dans un en-tête de quatre rangées'},
      {n: '9', label: 'phases de construction, de l’architecture au catalogue'}
    ],
    about: [
      'FreshBox Tech Marketplace est une plateforme B2B multi-vendeurs, sur le modèle des grandes places de marché : FreshBox fournit la plateforme, et chaque vendeur indépendant reste maître de son stock, de ses prix et de sa relation avec les acheteurs.',
      'Deux Rives Web a conçu l’architecture de la marketplace et l’a construite sur WooCommerce, la suite multi-vendeurs WCFM et Ultimate Member, puis a ajouté des systèmes sur mesure là où les extensions de base s’arrêtaient. Le travail s’est prolongé avec un second site : FreshBox Solutions.'
    ],
    challenge: [
      'La navigation devait réunir sept grandes rubriques dans un en-tête de quatre rangées, et le méga-menu natif du thème ne savait pas l’afficher.',
      'Reconstruire l’en-tête de zéro risquait de déstabiliser tout le système de menus du thème. Il fallait aussi offrir aux marques partenaires une vraie vitrine dans la marketplace, sans modifier les fichiers du thème.'
    ],
    process: [
      {title: 'Une architecture multi-vendeurs', text: 'La plateforme a été construite par phases : rôles vendeurs et acheteurs, comptes, catalogue, puis parcours de demande de devis. Chaque vendeur gère ses produits depuis son propre espace.', frame: '02-freshbox-1', alt: 'Recherche dans le catalogue de la marketplace FreshBox'},
      {title: 'Un méga-menu enfin fiable', text: 'Plutôt que de lutter contre le thème, un extrait PHP branché sur le filtre walker_nav_menu_start_el prend le contrôle du rendu de chaque entrée. Les sept rubriques s’affichent correctement, sans toucher aux fichiers du thème.', frame: '02-freshbox-2', alt: 'Les catégories du méga-menu FreshBox'},
      {title: 'Un catalogue pour les marques partenaires', text: 'Un type de contenu dédié, des champs ACF et une grille Elementor donnent à chaque marque partenaire une page structurée. Le formulaire de candidature partenaire propose désormais des catégories à choisir plutôt qu’un champ libre.', frame: '02-freshbox-3', alt: 'Catalogue Énergie et solaire avec demande de devis envoyée'},
      {title: 'Vérifier avant de livrer', text: 'Chaque hook et chaque métadonnée envisagés ont été vérifiés dans le code réel des extensions et du thème avant d’être utilisés. Cette règle a évité plusieurs erreurs avant la mise en ligne.'},
      {title: 'Le site FreshBox Solutions', text: 'Sur le second site, l’interface est passée d’un thème sombre à un thème clair, et une recherche instantanée alimentée par l’API REST de WordPress propose des suggestions pendant la saisie.'}
    ],
    results: [
      'Un méga-menu sur plusieurs rangées, rendu de façon contrôlée sans modifier le thème.',
      'Des pages catalogue structurées pour chaque marque partenaire.',
      'Des candidatures partenaires classées dans des catégories validées.',
      'Un site Solutions en thème clair, avec recherche instantanée.',
      'Un concept testé avec de vrais utilisateurs.'
    ],
    videos: [{file: '02-freshbox', title: 'De la recherche à la demande de devis', text: 'Un acheteur cherche une solution, ouvre la catégorie Énergie et envoie une demande de devis à un vendeur vérifié.'}],
    scope: ['Architecture de la marketplace', 'Ingénierie WordPress et WooCommerce', 'Débogage du thème et rendu PHP sur mesure', 'Catalogue des marques partenaires', 'Site FreshBox Solutions']
  },

  mobikumbu: {
    headline: 'Le mobile money accessible depuis un simple téléphone, par code court',
    accent: '#F7B51D',
    services: ['Canal USSD', 'Développement backend', 'API REST', 'Intégration du code court'],
    stack: ['USSD', 'API REST', 'AWS', 'Application mobile', 'Flux financiers'],
    about: [
      'Mobi-Kumbu est un service de mobile money avec un canal USSD pour les téléphones basiques, et une plateforme d’applications et de services plus large.',
      'Deux Rives Web a d’abord construit un MVP bancaire USSD indépendant pour démontrer le concept. La version suivante est devenue un système collaboratif, avec des responsabilités réparties entre plusieurs développeurs.'
    ],
    challenge: [
      'L’accès au mobile money reste difficile pour les personnes équipées d’un téléphone basique ou d’une connexion de données peu fiable.',
      'Une session USSD doit rester courte, claire et fiable, tout en dialoguant avec le reste du produit. Le défi consistait à relier ce canal à la plateforme et à gérer les frontières entre la session de l’utilisateur, les réponses des services et l’intégration du code court.'
    ],
    process: [
      {title: 'Un premier MVP pour valider la direction', text: 'Le prototype initial réunissait l’USSD et les fonctions bancaires dans une seule application, pour fixer une direction de travail.', frame: '03-mobikumbu-1', alt: 'Un transfert lancé depuis un téléphone basique'},
      {title: 'Le canal USSD de bout en bout', text: 'Dans la version collaborative, Deux Rives Web a pris en charge l’expérience USSD : les menus, la logique serveur, le front-end associé et l’intégration du code court.', frame: '03-mobikumbu-2', alt: 'Confirmation du transfert dans la session USSD'},
      {title: 'Des passages de relais nets', text: 'Un autre développeur était responsable du portefeuille et des composants bancaires. L’intégration repose sur des API REST et des frontières claires entre les deux parties du système, dans un environnement cloud AWS.', frame: '03-mobikumbu-3', alt: 'La transaction apparaît dans le portefeuille Android'}
    ],
    resultsTitle: 'USSD, API REST et environnement AWS',
    results: [
      'Une session ouverte par code court, reliée aux services de la plateforme.',
      'Un accès au service sans smartphone ni connexion de données.',
      'Des échanges entre composants par API REST.',
      'Une application Android de portefeuille disponible sur Google Play.'
    ],
    videos: [{file: '03-mobikumbu', title: 'Un transfert, trois systèmes', text: 'Le transfert est lancé en USSD, traité par l’API, puis visible dans le portefeuille Android, en kwanzas.'}],
    scope: ['MVP bancaire USSD indépendant', 'Canal USSD : backend et front-end', 'Intégration du code court', 'Coordination avec l’équipe portefeuille']
  },

  'bpetale-ltd': {
    headline: 'Trois marques, une seule plateforme : beauté, voyages et confiserie',
    accent: '#F06BA8',
    services: ['Design system', 'WordPress et Elementor', 'WooCommerce', 'Extensions sur mesure', 'Gestion des stocks'],
    stack: ['WordPress', 'PHP', 'WooCommerce', 'Elementor', 'Rank Math', 'Accès par rôles'],
    stats: [
      {n: '3', label: 'marques réunies sur un même site'},
      {n: '47', label: 'fiches produits consolidées pour Natural Essence'},
      {n: '241', label: 'vérifications locales avant la dernière mise à jour'}
    ],
    about: [
      'BPÉTALE réunit les soins Natural Essence, l’agence Travels & Tours et la confiserie Krunchies.',
      'Deux Rives Web a traduit la maquette Webflow d’origine en WordPress et Elementor, et organisé les marques de vente avec WooCommerce. Le travail s’est étendu du site public aux outils produits, voyages et équipe qui le font fonctionner.'
    ],
    challenge: [
      'Présenter trois activités très différentes sur un même site, en donnant à chacune un parcours clair.',
      'L’équipe devait aussi pouvoir faire évoluer le site sans risque : catalogue, offres de voyage et stocks devaient changer sans écraser les contenus existants.'
    ],
    process: [
      {title: 'Un design system commun', text: 'Une base visuelle partagée relie les trois marques, tout en laissant à chacune son univers.', frame: '04-bpetale-1', alt: 'Natural Essence dans la boutique BPÉTALE'},
      {title: 'Un catalogue Natural Essence consolidé', text: '47 produits ont été consolidés avec des descriptions optimisées pour le référencement, des variantes de prix et les champs Rank Math. Les textes sont rapprochés par référence produit : une mise à jour complète les champs vides sans écraser les modifications du commerçant.', frame: '13-naturalessence-2', alt: 'Fiche produit Natural Essence avec variantes et prix en naira'},
      {title: 'Travels & Tours : vols, hôtels et forfaits', text: 'Des onglets Vols, Hôtels et Forfaits guident la recherche. Une offre peut rester en brouillon pendant que l’équipe confirme le prix, la disponibilité et les conditions.', frame: '14-travels-3', alt: 'Un forfait Travels & Tours et sa demande de réservation'},
      {title: 'Des extensions installables et versionnées', text: 'Les fonctions propres à BPÉTALE ont été déplacées dans des extensions et un thème compagnon : Core 1.4.0, Storefront 1.7.0 et Companion Theme 1.4.0. Chaque mise à jour suit une procédure d’installation documentée.'},
      {title: 'Un espace stocks pour l’équipe', text: 'L’extension Inventaire 1.2.0 suit les matières de la livraison à la production : livraisons fournisseurs, recettes, lots, retours et corrections. Les droits par rôle déterminent qui peut enregistrer, valider ou voir les coûts.'}
    ],
    results: [
      'Une boutique, une agence de voyages et une confiserie sur un même site.',
      'Navigation ordinateur et mobile, recherche et panier WooCommerce revus.',
      'Des offres de voyage publiées seulement après validation.',
      'Un historique de stock traçable jusqu’à la livraison, au lot ou à la correction.',
      'Des mises à jour vérifiées : installation, navigation, formulaires, catalogue et paiement.'
    ],
    videos: [
      {file: '04-bpetale', title: 'Une boutique, trois univers', text: 'Soins naturels, voyages et confiserie partagent la même navigation et le même panier.'},
      {file: '13-naturalessence', title: 'Natural Essence : du filtre à la fiche produit', text: 'Filtrer par catégorie, ouvrir une fiche, choisir un format : les prix s’affichent en naira.'},
      {file: '14-travels', title: 'Travels & Tours : préparer un voyage', text: 'Vols, hôtels et forfaits dans une même recherche, jusqu’à la demande de réservation.'}
    ],
    scope: ['Design system partagé', 'Intégration WordPress et Elementor', 'Contenus produits et WooCommerce', 'Extensions et thème compagnon', 'Espace de gestion des stocks']
  },

  'residences-loumia': {
    headline: 'Cinq résidences, une seule expérience de réservation',
    accent: '#FF6A3D',
    services: ['UI/UX', 'Développement WordPress', 'Formulaires de réservation', 'Animations GSAP', 'Traduction'],
    stack: ['WordPress', 'Thème EliteStay', 'Contact Form 7', 'GSAP', 'Cloudflare Turnstile', 'TranslatePress'],
    stats: [
      {n: '5', label: 'résidences présentées sur une même plateforme'},
      {n: '2', label: 'langues : français et anglais'}
    ],
    about: [
      'Résidences Loumia est une plateforme d’hébergement haut de gamme au Cameroun, qui réunit cinq résidences sous une même identité.',
      'Deux Rives Web a conçu l’interface et étendu un site WordPress construit sur le thème EliteStay : parcours de découverte des propriétés, formulaires de réservation, traduction et animations.'
    ],
    challenge: [
      'Chaque résidence a sa propre équipe et sa propre boîte de réception : une demande de séjour devait arriver directement à la bonne résidence.',
      'Le site devait aussi rester fluide. Un défilement animé renvoyait les visiteurs en haut de page dès qu’ils touchaient un champ de formulaire.'
    ],
    process: [
      {title: 'Un parcours commun pour cinq propriétés', text: 'La conception UI/UX et les interactions GSAP accompagnent la découverte de chaque résidence, avec une navigation et une identité partagées.', frame: '05-loumia-1', alt: 'Choisir une résidence dans le formulaire de réservation'},
      {title: 'Des demandes routées vers la bonne résidence', text: 'Les formulaires Contact Form 7 envoient chaque demande vers la boîte de la résidence choisie. Cloudflare Turnstile filtre les envois indésirables.', frame: '05-loumia-3', alt: 'La demande arrive dans la boîte de la résidence choisie'},
      {title: 'Un défilement qui ne saute plus', text: 'Le module ScrollSmoother de GSAP renvoyait la page en haut à chaque fois qu’un champ prenait le focus. La correction a été appliquée dans la bibliothèque, puis validée en vidant ensemble le cache du serveur et celui de LiteSpeed.', frame: '05-loumia-2', alt: 'Calendrier et nombre de voyageurs dans le formulaire'},
      {title: 'Un site bilingue et joignable', text: 'TranslatePress propose le site en français et en anglais, et un widget WhatsApp permet de contacter l’équipe directement.'}
    ],
    results: [
      'Une navigation rétablie entre les pages, sans retour intempestif en haut de page.',
      'Chaque demande de séjour envoyée à la résidence sélectionnée.',
      'Une protection anti-spam sur les formulaires.',
      'Un site en français et en anglais, avec contact WhatsApp.',
      'Une gestion quotidienne simplifiée, selon l’équipe de la résidence.'
    ],
    videos: [{file: '05-loumia', title: 'Réserver un séjour', text: 'Choisir une résidence, des dates et le nombre de voyageurs : la demande part vers la boîte de la résidence choisie.'}],
    scope: ['Conception UI/UX', 'Développement WordPress sur EliteStay', 'Formulaires et routage des demandes', 'Animations et correction GSAP', 'Traduction et contact WhatsApp']
  },

  afremit: {
    headline: 'Payer des frais de scolarité depuis l’étranger, et savoir ce qui se passe ensuite',
    accent: '#3B82F6',
    services: ['Cofondation', 'Stratégie produit', 'Développement full-stack', 'Pilote'],
    stack: ['JavaScript', 'Node.js', 'Cloudflare Pages Functions', 'Supabase', 'PostgreSQL', 'Authentification et audit'],
    about: [
      'Afremit teste un parcours plus clair pour soutenir un service précis depuis l’étranger, en commençant par l’éducation.',
      'Deux Rives Web a participé à la cofondation du projet : définition de la direction produit, puis construction du pilote pour tester les passages de relais les plus importants. La santé et la construction sont aussi à l’étude.'
    ],
    challenge: [
      'Imaginez un parent à Londres qui règle des frais de scolarité pour un élève au Ghana.',
      'La famille doit savoir quel établissement a émis la demande, le montant, la référence, et si l’école a reçu les informations nécessaires. L’école doit pouvoir émettre la demande et la rapprocher de ses propres registres.'
    ],
    example: 'Une responsable financière crée une demande pour les frais du trimestre d’automne, avec la référence de l’élève et une condition de confirmation. Un membre de la famille consulte la demande et crée un paiement simulé. L’école fournit une référence d’affectation ; un responsable Afremit vérifie la condition avant que le registre de test enregistre la libération. Si le montant diffère ou si le payeur conteste, le parcours s’arrête pour revue.',
    process: [
      {title: 'L’accès pilote', text: 'Une école, une clinique ou une entreprise de construction demande l’accès ; un responsable Afremit décide d’autoriser ou non le test.'},
      {title: 'Une demande, une référence', text: 'Le prestataire commence par un seul frais, devis ou jalon, avec une référence privée. Inutile de charger tout son catalogue.'},
      {title: 'Le payeur à l’étranger', text: 'Le payeur ouvre un code privé, consulte la demande et accepte une condition de libération simulée.'},
      {title: 'La preuve avant la libération', text: 'Le prestataire fournit un justificatif, vérifié avant la libération de la valeur de test. Les écarts et contestations restent visibles, avec la raison de chaque décision.'}
    ],
    flow: ['Demande d’accès', 'Validation du prestataire', 'Demande avec référence', 'Paiement simulé', 'Justificatif', 'Vérification', 'Libération ou contestation'],
    resultsTitle: 'Ce que le pilote démontre',
    results: [
      'Un site public responsive et un espace de travail par rôle.',
      'Un registre de test en partie double : valeurs retenues, libérées ou remboursées.',
      'Un journal d’audit et des tests automatisés du parcours.',
      'Un déploiement préparé sur Cloudflare Pages et Supabase, avec comptes authentifiés.'
    ],
    limits: 'Le registre simule les valeurs retenues, libérées et remboursées. Afremit ne prend ni ne détient d’argent, ne propose pas de séquestre et n’a pas de partenaire de paiement actif. L’accès au pilote donne accès à un logiciel de test, pas à une vérification financière.',
    next: 'Vérifier que les prestataires s’inscrivent rapidement, que les payeurs comprennent la demande et sa condition de libération, et observer comment les équipes traitent les écarts au quotidien.',
    scope: ['Cofondation et direction produit', 'Site public et espace par rôle', 'Logique de service et fonctions serveur', 'Schéma Supabase et migrations', 'Tests automatisés du parcours']
  },

  'africa-payment-reconciliation-lab': {
    headline: 'Ce qui se passe après qu’un prestataire de paiement signale une transaction',
    accent: '#12B76A',
    services: ['Ingénierie backend', 'Fintech', 'Rapprochement des paiements'],
    stack: ['TypeScript', 'Node.js', 'API REST', 'Webhooks', 'HMAC', 'Idempotence'],
    stats: [
      {n: '12', label: 'tests automatisés sur le rapprochement et les échecs'},
      {n: '3', label: 'anomalies simulées : écriture manquante, montant différent, doublon'}
    ],
    about: [
      'ReconLab reçoit des événements signés, empêche les doublons, compare les enregistrements du prestataire au registre interne et donne aux opérateurs une voie de reprise contrôlée.',
      'Il s’adresse aux équipes d’ingénierie fintech, aux équipes opérations paiement et aux entreprises qui intègrent plusieurs prestataires de paiement.'
    ],
    challenge: [
      'Un paiement peut arriver deux fois, en retard, avec un montant différent ou sans écriture correspondante dans le registre.',
      'Un délai d’attente chez le prestataire ne prouve pas qu’une opération a échoué. Le système doit séparer les preuves du prestataire et le registre interne, au lieu de supposer qu’ils concordent toujours.'
    ],
    process: [
      {title: 'Valider chaque événement', text: 'Les webhooks sont signés en HMAC et vérifiés à leur arrivée.'},
      {title: 'Écarter les doublons', text: 'Des clés d’idempotence stables rendent les nouvelles tentatives sans danger.'},
      {title: 'Rapprocher', text: 'Chaque transaction du prestataire est comparée au registre interne. Une écriture manquante, un montant différent ou un webhook en double ouvre une exception.'},
      {title: 'Reprendre sous contrôle', text: 'Les exceptions restent visibles jusqu’à leur revue. La santé des prestataires et le journal d’audit sont consultables.'}
    ],
    flow: ['Événement signé', 'Validation', 'Contrôle d’idempotence', 'Enregistrement', 'Comparaison au registre', 'Rapprochement ou exception', 'Revue et reprise'],
    resultsTitle: 'Ce que le projet démontre',
    results: ['Validation des webhooks signés en HMAC.', 'Prévention des doublons par idempotence.', 'Rapprochement entre prestataire et registre interne.', 'Revue des exceptions et reprise contrôlée.', 'Visibilité sur la santé des prestataires et l’audit.'],
    limits: 'La version en ligne est une simulation dans le navigateur. Elle ne déplace pas d’argent, ne contacte aucun prestataire et n’écrit dans aucune base de production. Les montants affichés sont fictifs.',
    next: 'Une version de production ajouterait des connecteurs authentifiés, des migrations de base de données, la gestion chiffrée des secrets, des files de traitement, des rapprochements planifiés, la supervision et des accès par rôle.',
    scope: ['Modèle de rapprochement', 'Validation des événements', 'États d’exception et actions de reprise', 'Journal d’audit', 'Démonstration dans le navigateur']
  },

  'ai-agent-security-sandbox': {
    headline: 'Donner des capacités à un agent IA sans lui donner tous les pouvoirs',
    accent: '#8B5CF6',
    services: ['Sécurité de l’IA', 'Moteur de règles', 'Interface de contrôle'],
    stack: ['JavaScript', 'Moteur de règles', 'Moindre privilège', 'Validation humaine', 'Journaux d’audit', 'Réponse à incident'],
    stats: [
      {n: '11', label: 'tests de règles : autorisation, validation et confinement'},
      {n: '4', label: 'décisions possibles : autoriser, suspendre, bloquer, contenir'}
    ],
    about: [
      'Sentinel évalue chaque action proposée par un agent IA selon l’identité, le périmètre, la sensibilité des données, la destination et le risque, avant de l’autoriser, la suspendre, la bloquer ou la contenir.',
      'Il s’adresse aux équipes produit IA, aux ingénieurs sécurité et aux responsables techniques qui introduisent des agents outillés dans leurs processus.'
    ],
    challenge: [
      'Un agent qui utilise des outils agit vite, et parfois au mauvais endroit.',
      'Une validation ne doit autoriser qu’une capacité précise, pas un accès illimité. Et un signal d’injection de consignes doit couper l’accès avant que l’enquête ne commence.'
    ],
    process: [
      {title: 'Refuser par défaut', text: 'Aucun outil n’est accessible sans autorisation explicite, avec des périmètres au plus juste.'},
      {title: 'Suspendre les actions sensibles', text: 'Les actions sensibles attendent une validation humaine. Une autorisation vaut pour une seule utilisation, puis expire.'},
      {title: 'Contenir un comportement hostile', text: 'Le confinement révoque la capacité active, bloque les sorties réseau, met la session en quarantaine et conserve les preuves.'},
      {title: 'Garder une trace vérifiable', text: 'Chaque décision est enregistrée dans un journal chaîné par empreintes. La restauration se fait au plus juste, après revue.'}
    ],
    flow: ['Requête de l’agent', 'Identité et périmètre', 'Données, destination, risque', 'Autoriser, suspendre ou refuser', 'Preuve enregistrée', 'Confinement si besoin'],
    resultsTitle: 'Ce que le projet démontre',
    results: ['Accès aux outils refusé par défaut.', 'Permissions au plus juste.', 'Validation humaine des actions sensibles.', 'Autorisations à usage unique.', 'Confinement des injections de consignes et preuves d’audit chaînées.'],
    limits: 'La démonstration ne se connecte à aucun modèle d’IA externe, système de production, identifiant réel ou donnée client. Les agents et les événements sont fictifs.',
    next: 'Un plan de contrôle de production ajouterait l’identité de l’organisation, des versions de règles signées, des connecteurs vers les modèles et les outils, un courtage sécurisé des identifiants, un stockage d’audit durable et le lien avec la supervision de sécurité.',
    scope: ['Modèle de permissions', 'Circuit de validation', 'Évaluation du risque', 'Scénarios de confinement', 'Interface du plan de contrôle']
  },

  'woocommerce-integration-reliability-kit': {
    headline: 'Une commande payée qui arrive chez le prestataire, même quand l’API flanche',
    accent: '#12B76A',
    services: ['Extension WordPress', 'Intégrations API', 'Fiabilité'],
    stack: ['PHP', 'WordPress', 'WooCommerce', 'API REST', 'Action Scheduler', 'HMAC'],
    about: [
      'RelayKit montre comment une commande WooCommerce payée peut rejoindre un prestataire externe (livraison, licence, recharge ou logistique) sans dépendre d’une seule requête API fragile.',
      'Les envois sont enregistrés avant la transmission, reçoivent une clé d’idempotence stable et passent par des états de reprise visibles. Pour les boutiques WooCommerce, les agences WordPress et les équipes d’intégration.'
    ],
    challenge: [
      'Une requête qui échoue au mauvais moment peut faire disparaître une commande payée.',
      'L’extension ne promet pas un envoi « exactement une fois », impossible à garantir. Elle assume un envoi « au moins une fois » avec idempotence, enregistre l’intention avant tout effet externe et cesse de réessayer les erreurs qui ne se résoudront pas.'
    ],
    process: [
      {title: 'Enregistrer avant d’envoyer', text: 'Les hooks du cycle de vie des commandes payées créent un enregistrement d’envoi persistant.'},
      {title: 'Signer et protéger', text: 'Les requêtes sont signées en HMAC-SHA256 et les secrets des prestataires sont chiffrés.'},
      {title: 'Réessayer avec mesure', text: 'Les erreurs temporaires sont reprogrammées avec un délai croissant et un plafond de tentatives, via Action Scheduler ou WP-Cron.'},
      {title: 'Reprendre à la main', text: 'Les échecs définitifs restent visibles. Une reprise manuelle exige les droits de gestion WooCommerce et un jeton valide ; les journaux sont expurgés.'}
    ],
    flow: ['Commande payée', 'Envoi enregistré', 'Tâche en file', 'Requête signée', 'Envoi ou classement de l’échec', 'Nouvelle tentative ou revue manuelle'],
    resultsTitle: 'Ce que le projet démontre',
    results: ['Hooks du cycle de vie des commandes payées.', 'Enregistrements d’envoi persistants et clés d’idempotence stables.', 'Signature HMAC-SHA256 et secrets chiffrés.', 'Traitement par Action Scheduler, avec WP-Cron en secours.', 'Tentatives limitées, journaux expurgés et reprise manuelle.'],
    limits: 'La démonstration en ligne est statique : elle n’exécute ni PHP ni WordPress. Le dépôt contient l’extension installable, à tester en local.',
    next: 'Une mise en production demande un mappage propre à chaque prestataire, une gestion des clés adaptée à l’hébergement, des règles de conservation, de la supervision et des tests de bout en bout en environnement de test.',
    scope: ['Extension installable', 'Modèle d’états des envois', 'Signature et gestion des secrets', 'Stratégie de planification', 'Écran de reprise pour l’administration']
  },

  'offline-first-sme-operations-suite': {
    headline: 'Continuer à vendre quand la connexion tombe',
    accent: '#0EA5E9',
    services: ['Application web progressive', 'Hors ligne d’abord', 'Synchronisation'],
    stack: ['PWA', 'IndexedDB', 'Service Workers', 'JavaScript', 'Synchronisation'],
    about: [
      'KioskFlow permet à une petite entreprise de continuer à enregistrer ses ventes et à protéger son stock quand la connexion est instable.',
      'Une transaction valide est d’abord enregistrée sur l’appareil, marquée à synchroniser, puis rejouée sans risque au retour du réseau. Pour les petites entreprises, les équipes terrain et les produits dont les utilisateurs n’ont pas toujours une connexion abordable.'
    ],
    challenge: [
      'Une confirmation locale ne doit pas se faire passer pour une écriture serveur réussie.',
      'Les données et l’intention de synchronisation doivent rester consultables, et deux versions concurrentes doivent devenir un conflit explicite plutôt qu’un écrasement silencieux.'
    ],
    process: [
      {title: 'Valider sur place', text: 'La vente et le stock sont vérifiés localement, puis enregistrés dans IndexedDB.'},
      {title: 'Une file d’envoi durable', text: 'Chaque changement ajoute un événement à une file de synchronisation qui résiste aux rechargements.'},
      {title: 'Des états toujours visibles', text: 'En ligne, hors ligne, en synchronisation : l’opérateur sait toujours où en sont ses données.'},
      {title: 'Des conflits explicites', text: 'Quand deux versions divergent, un conflit s’ouvre. Il se résout à la main, avec un rapport JSON.'}
    ],
    flow: ['Vente validée en local', 'Commande et stock enregistrés', 'Événement en file', 'Attente du réseau', 'Envoi', 'Accusé de réception ou conflit'],
    resultsTitle: 'Ce que le projet démontre',
    results: ['Application web progressive installable.', 'Commandes et stock conservés dans IndexedDB.', 'Validation du stock en local.', 'File de synchronisation durable.', 'États en ligne, hors ligne et synchronisation visibles, conflits résolus explicitement.'],
    limits: 'La démonstration fonctionne sur un seul appareil, avec un serveur simulé. Elle ne gère ni l’authentification de production, ni le chiffrement entre appareils, ni le règlement réel des stocks.',
    next: 'Une version de production ajouterait l’identité de l’organisation, l’enregistrement des appareils, le chiffrement des champs sensibles, des points de synchronisation idempotents, la synchronisation différentielle et la supervision de la file.',
    scope: ['Frontière de transaction hors ligne', 'Modèle IndexedDB', 'File de synchronisation', 'Gestion des conflits', 'Cache et interface']
  },

  'developer-productivity-release-intelligence-hub': {
    headline: 'Une vue partagée de la vitesse, de la sûreté et de la reprise des mises en production',
    accent: '#8B5CF6',
    services: ['Plateforme développeurs', 'DevOps', 'Outils internes'],
    stack: ['JavaScript', 'CI/CD', 'Indicateurs DORA', 'DevOps', 'Gestion des incidents', 'Outils internes'],
    about: [
      'PulseDeck transforme les événements de déploiement, de pull request et d’incident en une vue commune : vitesse de livraison, sûreté des mises en production, reprise et responsabilité par service.',
      'Ses indicateurs sont calculés à partir d’un flux d’événements, et non affichés comme des chiffres décoratifs. Pour les équipes plateforme, DevOps et les responsables techniques.'
    ],
    challenge: [
      'Mesurer la livraison sans réduire la productivité au nombre de lignes de code.',
      'Les indicateurs doivent découler d’événements, la responsabilité des services doit être explicite, et la préparation d’une version doit être pondérée plutôt que binaire.'
    ],
    process: [
      {title: 'Des indicateurs calculés', text: 'Fréquence de déploiement, taux d’échec des changements, temps moyen de reprise et délai des pull requests sont calculés sur la période choisie.'},
      {title: 'Préparer chaque version', text: 'Un registre des versions et un contrat de préparation pondéré montrent ce qui reste à vérifier.'},
      {title: 'Voir la chaîne CI/CD', text: 'Les pipelines et les tests instables sont visibles, service par service.'},
      {title: 'Raconter l’incident', text: 'Un déploiement raté simulé crée un incident de retour arrière et modifie les indicateurs. La reprise est séparée du suivi post-incident.'}
    ],
    flow: ['Pull request', 'Vérifications', 'Version', 'Déploiement', 'Bon fonctionnement ou retour arrière', 'Incident', 'Reprise et suivi'],
    resultsTitle: 'Ce que le projet démontre',
    results: ['Fréquence de déploiement et taux d’échec calculés.', 'Temps moyen de reprise et délai des pull requests.', 'Choix de la période de mesure.', 'Registre des versions et contrat de préparation.', 'Chronologie d’incident, responsabilités et simulation de déploiement.'],
    limits: 'La version en ligne ne se connecte à aucun compte réel de gestion de code, d’intégration continue, de cloud, de supervision ou d’incidents. Les données sont fictives.',
    next: 'Une version de production vérifierait la signature des webhooks, dédoublonnerait les livraisons, normaliserait les événements des fournisseurs, conserverait les preuves brutes et exposerait les indicateurs par équipe via des API authentifiées.',
    scope: ['Modèle d’événements', 'Calcul des indicateurs', 'Modèle de préparation des versions', 'Catalogue des services', 'Simulation et tests']
  },

  'eventflow-go': {
    headline: 'Quand une commande change, le système suivant doit le savoir',
    accent: '#0EA5E9',
    services: ['Backend Go', 'Événements', 'Fiabilité des intégrations'],
    stack: ['Go', 'PostgreSQL', 'API HTTP', 'Webhooks'],
    about: [
      'EventFlow Go fait en sorte qu’une mise à jour atteigne le système suivant, même s’il est momentanément indisponible.',
      'Pour les plateformes de commerce, les équipes SaaS et les équipes opérations qui relient des services séparés.'
    ],
    challenge: [
      'Une mise à jour d’intégration perdue peut laisser une commande en suspens.',
      'Elle crée du travail pour le support et oblige l’équipe à fouiller les journaux de plusieurs systèmes.'
    ],
    example: 'Un commerçant enregistre la commande 1042. Le système de préparation répond par une erreur temporaire : l’événement reste visible et repart plus tard. Un opérateur consulte les tentatives au lieu de se demander si la mise à jour a disparu. Une requête répétée avec la même identité ne crée pas de second événement.',
    process: [
      {title: 'Une réception authentifiée', text: 'Les événements arrivent par une API authentifiée, avec des clés d’idempotence stables.'},
      {title: 'Des tentatives en base', text: 'Chaque tentative est enregistrée dans PostgreSQL ; une erreur temporaire laisse l’événement visible et programmé pour un nouvel essai.'},
      {title: 'Des workers concurrents', text: 'Plusieurs workers se partagent la file grâce à des baux, et l’historique des envois reste consultable.'}
    ],
    flow: ['Événement reçu', 'Clé d’idempotence', 'Enregistrement PostgreSQL', 'Worker avec bail', 'Envoi signé', 'Succès ou nouvelle tentative'],
    limits: 'La démonstration en ligne utilise des événements fictifs ; le service Go fonctionne en local. Les systèmes destinataires doivent encore dédoublonner les envois.',
    next: 'Choisir un événement métier important, décrire ce que fait l’équipe quand sa destination est indisponible, puis tester le parcours avec des événements fictifs.',
    scope: ['Service Go', 'Transactions PostgreSQL', 'Concurrence des workers', 'Webhooks signés', 'Tests']
  },

  intakedesk: {
    headline: 'Savoir où en est chaque nouvelle demande, avant que le travail commence',
    accent: '#FF5A1F',
    services: ['Extension WordPress', 'Accueil des demandes', 'Organisation du travail'],
    stack: ['PHP', 'WordPress', 'Extension', 'Formulaires'],
    about: [
      'IntakeDesk rend visible l’étape suivante de chaque demande entrante, pour les cabinets comptables, consultants, agences et entreprises de services.',
      'C’est une extension WordPress installable : formulaire par shortcode, file privée pour l’administration, étapes, informations manquantes et dates de relance.'
    ],
    challenge: [
      'Une demande peut se perdre entre un e-mail, un formulaire et un rappel personnel.',
      'En haute saison, de nombreux clients attendent des éléments différents au même moment.'
    ],
    example: 'Un cabinet comptable reçoit une demande en pleine saison fiscale. Un collaborateur la marque en attente d’un récapitulatif de revenus, note la prochaine action et la date de relance, puis la passe à « prête » quand l’information arrive. Le contexte reste avec la demande, et non dans la mémoire d’une seule personne.',
    process: [
      {title: 'Recevoir', text: 'Un formulaire par shortcode alimente une file privée, visible par l’administration.'},
      {title: 'Suivre', text: 'Étapes, informations manquantes, dates de relance et historique d’activité.'},
      {title: 'Exporter et protéger', text: 'Export CSV, suppression et protections de base contre les envois abusifs : type de contenu privé, droits, nonces et validation.'}
    ],
    limits: 'La démonstration en ligne est fictive. L’extension ne collecte pas de documents et n’envoie pas de relances automatiques. Aucun résultat client n’a été mesuré.',
    next: 'Installer l’extension sur un site WordPress de test et suivre une demande fictive du premier contact jusqu’à « prête ».',
    scope: ['Conception du parcours', 'Extension PHP et WordPress', 'Droits et sécurité', 'Tests']
  },

  vendorpulse: {
    headline: 'Un suivi humain pour les commandes lentes ou bloquées',
    accent: '#FF5A1F',
    services: ['Extension WooCommerce', 'Opérations e-commerce'],
    stack: ['PHP', 'WooCommerce', 'WordPress', 'Commandes'],
    about: [
      'VendorPulse donne aux commandes lentes ou bloquées une prochaine action claire, plutôt qu’un chiffre de plus dans un tableau de bord oublié.',
      'Pour les commerçants WooCommerce et leurs équipes opérations.'
    ],
    challenge: [
      'Une boutique en croissance accumule des commandes « en cours » anciennes, des dossiers en attente et des paiements échoués.',
      'La prochaine action reste dans des messages, ou dans la tête de quelqu’un.'
    ],
    example: 'Une commande est « en cours » depuis trois jours. La boutique voit une relance d’expédition, demande un point à l’entrepôt, note qui agit et quand, et garde la note interne avec la commande. Une note résolue ne masque pas la commande tant que son statut demande encore une action.',
    process: [
      {title: 'Une file d’opérations', text: 'Construite à partir du statut et de l’ancienneté des commandes.'},
      {title: 'Une prochaine action', text: 'Action, échéance, état du suivi et note privée sur la commande.'},
      {title: 'Un résumé quotidien', text: 'Un e-mail de synthèse programmé par WordPress. Compatible avec le stockage des commandes HPOS, avec contrôle des droits et tests.'}
    ],
    limits: 'L’extension ne prépare pas les commandes, ne modifie pas les paiements et n’écrit pas aux clients. Aucun résultat client n’a été mesuré.',
    next: 'Tester l’extension dans une boutique WooCommerce de démonstration et comparer la file à la routine de suivi actuelle de l’équipe.',
    scope: ['Conception du parcours', 'Extension WooCommerce', 'Compatibilité HPOS', 'Tests']
  },

  packetlens: {
    headline: 'Voir quels documents sont arrivés, et pourquoi un dossier n’est pas prêt',
    accent: '#0EA5E9',
    services: ['Service Python', 'Revue de documents'],
    stack: ['Python', 'FastAPI', 'Extraction de texte', 'Revue humaine'],
    about: [
      'PacketLens aide les équipes achats, d’intégration fournisseurs et de services à suivre des dossiers de documents récurrents.',
      'Le système suggère des catégories à partir du texte, mais une personne vérifie toujours les originaux.'
    ],
    challenge: [
      'Les équipes courent après des pièces jointes dans plusieurs boîtes de réception.',
      'Personne n’a de vue commune sur ce qui manque, ce qui a expiré ou ce qui a été validé.'
    ],
    example: 'Un fournisseur envoie son immatriculation, son attestation fiscale et son assurance. Deux pièces sont validées ; l’attestation d’assurance a expiré. Le dossier reste « pas prêt » jusqu’à la revue d’un document valide.',
    process: [
      {title: 'Recevoir et classer', text: 'Extraction du texte des fichiers PDF, DOCX et TXT, avec des suggestions de catégories transparentes.'},
      {title: 'Valider par une personne', text: 'Validation humaine, contrôle des dates d’expiration et historique de revue.'},
      {title: 'Rendre compte', text: 'Rapport CSV et suppression du dossier.'}
    ],
    limits: 'Le prototype Python local ne fait pas de reconnaissance de caractères, n’est pas hébergé et ne vérifie pas l’authenticité juridique des documents.',
    next: 'Reproduire un dossier de trois documents avec des fichiers fictifs, et laisser les réviseurs repérer où le processus actuel devient flou.',
    scope: ['API Python', 'Extraction PDF, DOCX et TXT', 'Validation et stockage', 'Tests']
  },

  signaldesk: {
    headline: 'Les exceptions de plusieurs outils, au même endroit, avec un responsable',
    accent: '#8B5CF6',
    services: ['Console d’opérations', 'Front-end React'],
    stack: ['React', 'TypeScript', 'Accessibilité', 'Tests'],
    about: [
      'SignalDesk réunit dans une seule file les exceptions nées dans des outils séparés : paiements, commerce, intégrations, opérations clients.',
      'Chaque exception reçoit un responsable et une prochaine action.'
    ],
    challenge: [
      'Les problèmes opérationnels apparaissent dans des outils différents.',
      'Difficile alors de savoir ce qui est urgent, qui s’en occupe et ce qui doit se passer ensuite.'
    ],
    example: 'Un écart de versement, une mise à jour de commande retentée et un client en attente d’information apparaissent dans la même file. Une responsable filtre les urgences, attribue chaque cas, note l’étape suivante et consulte l’historique, sans reconstituer l’histoire à partir de messages.',
    process: [
      {title: 'Prioriser', text: 'File priorisée, filtres, vues enregistrées et responsables.'},
      {title: 'Traiter', text: 'Panneau de revue, prochaines actions, fil d’activité et mises à jour groupées.'},
      {title: 'Exporter', text: 'Export CSV et génération d’alertes fictives, avec des transitions d’état typées et des tests.'}
    ],
    limits: 'L’interface fonctionne avec des données fictives stockées dans le navigateur, sans serveur, connexion ni intégration réelle.',
    next: 'Apporter trois types d’exceptions récurrentes à une session guidée avec des données fictives, et vérifier si la file clarifie les responsabilités.',
    scope: ['Conception de la console', 'React et TypeScript', 'Accessibilité', 'Tests']
  },

  bridgegate: {
    headline: 'Rendre visible, puis récupérable, un passage de relais qui a échoué',
    accent: '#12B76A',
    services: ['Passerelle d’intégration', 'Backend Node.js'],
    stack: ['Node.js', 'TypeScript', 'SQLite', 'Intégrations'],
    about: [
      'BridgeGate est une passerelle d’intégration pour les équipes qui relient boutiques, CRM et services internes.',
      'Chaque échange est authentifié, tracé et récupérable.'
    ],
    challenge: [
      'Une intégration peut indiquer qu’elle a envoyé une mise à jour alors que le système destinataire n’a rien fait.',
      'Deux équipes se retrouvent alors avec des données contradictoires.'
    ],
    example: 'Une boutique envoie une mise à jour de commande à un service opérations. Le destinataire échoue une fois, puis accepte une nouvelle tentative signée. La passerelle enregistre la tentative et renvoie le résultat stocké si une requête identique se répète. L’équipe consulte un historique expurgé au lieu de supposer que tout s’est bien passé.',
    process: [
      {title: 'Recevoir', text: 'Réception authentifiée vers une destination configurée, avec limitation du débit.'},
      {title: 'Réessayer', text: 'Nouvelles tentatives en cas d’échec temporaire et requêtes idempotentes.'},
      {title: 'Tracer', text: 'Historique d’audit SQLite expurgé et envois signés.'}
    ],
    limits: 'La passerelle est un prototype local, et le destinataire doit encore dédoublonner les nouvelles tentatives.',
    next: 'Choisir un passage de relais fragile, simuler une panne temporaire du destinataire avec des événements fictifs, et examiner les preuves utiles aux opérateurs.',
    scope: ['Passerelle Node.js', 'Authentification et limitation', 'Gestion des échecs', 'Tests']
  },

  changemap: {
    headline: 'Une décision change : retrouver chaque endroit où l’ancienne consigne subsiste',
    accent: '#FF5A1F',
    services: ['Prototype de processus', 'Coordination des changements'],
    stack: ['JavaScript', 'Stockage local', 'Export JSON', 'Tests automatisés'],
    about: [
      'ChangeMap suit tous les points à mettre à jour après une décision interne : pages, formulaires, messages, documents et consignes d’équipe.',
      'Pour les services d’admission, les équipes opérations et les équipes produit qui coordonnent des changements sur plusieurs canaux.'
    ],
    challenge: [
      'L’annonce a changé. L’ancienne consigne, elle, n’a pas disparu.',
      'La page principale est à jour, mais un formulaire, un e-mail de confirmation ou un guide téléchargeable porte encore l’ancienne version. L’équipe pense le travail terminé, alors que les clients reçoivent des instructions contradictoires.'
    ],
    example: 'Une école prolonge sa date limite de candidature. Le site affiche la nouvelle date, mais le formulaire ferme encore trop tôt et l’e-mail de confirmation répète l’ancienne. Il faut connaître chaque point concerné, son responsable, et savoir si quelqu’un a vérifié le parcours réel après la mise à jour.',
    process: [
      {title: 'Cartographier', text: 'Un seul dossier de changement liste les pages, formulaires, messages, documents et consignes concernés.'},
      {title: 'Attribuer', text: 'Chaque mise à jour a un responsable et un état visible.'},
      {title: 'Vérifier', text: 'Une note de vérification est enregistrée ; si la décision change, les vérifications se rouvrent.'}
    ],
    limits: 'Le compteur de vérifications ne couvre que les points cartographiés, à partir de notes saisies. Ce n’est ni un audit indépendant, ni un système d’approbation de production.',
    next: 'Choisir un changement récent de procédure et cartographier les points à revoir, avec des exemples fictifs.',
    scope: ['Modèle de décision', 'Interface responsive', 'Export JSON', 'Tests des règles']
  },

  sourcecheck: {
    headline: 'Quand deux systèmes ne sont pas d’accord, quelqu’un doit décider',
    accent: '#12B76A',
    services: ['Comparaison de données', 'Revue des écarts'],
    stack: ['JavaScript', 'CSV', 'Correspondance de colonnes', 'Tests automatisés'],
    about: [
      'SourceCheck compare deux exports CSV pour repérer les données manquantes, en double ou contradictoires.',
      'Pour les équipes relation client, les services, l’administration financière et toutes les équipes qui exportent les données de deux outils sans source de vérité commune.'
    ],
    challenge: [
      'Un écart de données peut devenir une erreur auprès d’un client.',
      'Le CRM indique un client actif, le registre de service le dit inactif. Agir sur la mauvaise ligne peut entraîner un message inadapté, une relance manquée ou une mauvaise décision.'
    ],
    example: 'Un responsable prépare une liste de relance. Un client a des statuts différents dans le CRM et le registre ; un autre a le même e-mail mais un identifiant différent. SourceCheck montre les deux cas avec les lignes d’origine et laisse la question d’identité à une personne.',
    process: [
      {title: 'Importer et associer', text: 'Deux fichiers CSV et une correspondance de colonnes configurable.'},
      {title: 'Comparer', text: 'Identifiants en double, lignes manquantes, statuts ou coordonnées différents.'},
      {title: 'Décider', text: 'Chaque décision est notée avec sa raison ; un rapport d’écarts s’exporte sans modifier les fichiers source.'}
    ],
    limits: 'Deux fichiers CSV de 1 Mo et 500 lignes au maximum. Le prototype n’établit pas l’identité à partir d’un nom ou d’un e-mail et ne synchronise aucun outil.',
    next: 'Commencer avec des données inventées qui reproduisent un écart connu, avant d’envisager un accès sécurisé aux données réelles.',
    scope: ['Lecture CSV', 'Comparaison déterministe', 'Interface de revue', 'Tests']
  },

  workflowfit: {
    headline: 'Savoir où le parcours actuel attend, avant d’adopter un nouvel outil',
    accent: '#0EA5E9',
    services: ['Évaluation de pilote', 'Mesure des processus'],
    stack: ['JavaScript', 'Indicateurs', 'Stockage local', 'Rapport JSON'],
    about: [
      'WorkflowFit compare un parcours existant et un pilote avant de généraliser un changement.',
      'Pour les responsables opérations, les écoles, les équipes de services et les fondateurs qui préparent un test honnête.'
    ],
    challenge: [
      'Une équipe peut adopter un outil sans savoir où le temps se perd.',
      'Une demande attend une information, une attribution ou une réponse au client. Si l’équipe ne voit que la date de fin, impossible de savoir quel passage de relais mérite l’attention.'
    ],
    example: 'Une école suit ses demandes du premier contact à la réponse au client. L’équipe compare quelques dossiers passés avec des dossiers pilotes fictifs, en mesurant le temps entre les mêmes cinq étapes.',
    process: [
      {title: 'Voir les attentes', text: 'Les dossiers suivent cinq étapes, et le temps entre chacune est comparé.'},
      {title: 'Garder l’inachevé visible', text: 'Les dossiers ouverts restent listés ; seuls les dossiers terminés entrent dans les médianes.'},
      {title: 'Cadrer un pilote équitable', text: 'Hypothèse, résultat utile, garde-fou, responsable de la décision et prochaine décision.'}
    ],
    limits: 'Les groupes sont petits et fictifs, et les durées comptent le temps calendaire. Une différence entre groupes ne prouve pas une causalité.',
    next: 'Choisir un parcours que l’équipe connaît déjà, des dossiers comparables, et ce qui justifierait de poursuivre le test.',
    scope: ['Calcul des indicateurs', 'Chronologie des étapes', 'Rapport JSON', 'Tests']
  },

  clientflow: {
    headline: 'Une demande suivie du premier contact au dossier prêt à traiter',
    accent: '#3B82F6',
    services: ['Pilote', 'Parcours de qualification'],
    about: [
      'ClientFlow accompagne une demande depuis le premier contact jusqu’au dossier prêt à traiter.',
      'Le parcours de qualification rend visibles les étapes et les critères de passage d’un responsable à l’autre.'
    ],
    process: [
      {title: 'Qualifier', text: 'Chaque nouvelle demande entre dans le parcours avec ses critères de qualification.', frame: '07-clientflow-1', alt: 'Le tableau des demandes et du pipeline'},
      {title: 'Collecter', text: 'Les documents et informations attendus sont suivis avant le passage de relais.'},
      {title: 'Transmettre', text: 'Le dossier passe au spécialiste quand les critères sont réunis.', frame: '07-clientflow-3', alt: 'Une mission créée à partir d’une demande'}
    ],
    videos: [{file: '07-clientflow', title: 'Du premier contact à la mission', text: 'Animation illustrative : une demande avance dans le pipeline jusqu’à la création d’une mission.'}]
  },

  citebid: {
    headline: 'Lire un appel d’offres et structurer la préparation de la réponse',
    accent: '#8B5CF6',
    services: ['MVP privé', 'Intelligence artificielle']
  },
  'clinic-operations': {
    headline: 'Coordonner prise de rendez-vous, accueil et suivi administratif',
    accent: '#0EA5E9',
    services: ['Pilote', 'Coordination d’équipe']
  },
  'invoice-follow-up': {
    headline: 'Retrouver les factures à suivre et la dernière action convenue',
    accent: '#FF5A1F',
    services: ['Pilote', 'Suivi des relances']
  },
  knowledgeops: {
    headline: 'Chaque réponse interne reliée à sa source et à son responsable',
    accent: '#12B76A',
    services: ['Pilote', 'Recherche interne']
  },
  'eth-ai-forecaster': {
    headline: 'Une expérimentation de prévision sur l’historique d’Ethereum',
    accent: '#8B5CF6',
    services: ['Analyse de données', 'Apprentissage automatique'],
    stack: ['Python', 'Jupyter'],
    process: [
      {title: 'Collecter', text: 'Récupération de l’historique de prix.'},
      {title: 'Préparer', text: 'Nettoyage et mise en forme des données pour l’expérience.'},
      {title: 'Comparer', text: 'Comparaison des prédictions à court terme avec les valeurs observées.'}
    ]
  },
  'phenotyping-flow': {
    headline: 'Rendre lisible un système de contrôle utilisé par plusieurs opérateurs',
    accent: '#0EA5E9',
    services: ['Conception UX', 'Interface de contrôle'],
    process: [
      {title: 'Cartographier le parcours', text: 'Les étapes des sessions d’observation et des expériences sont représentées dans une carte du parcours.'},
      {title: 'Concevoir l’interface', text: 'Une interface de contrôle en mode sombre rend visibles les états du système pour chaque opérateur.'}
    ]
  },
  agribusiness: {
    headline: 'Relier producteurs et acheteurs dans un même parcours de découverte',
    accent: '#12B76A',
    services: ['Conception', 'Vitrine en ligne']
  },
  'sneaker-shop': {
    headline: 'Une page de présentation responsive pour une boutique de baskets',
    accent: '#FF5A1F',
    services: ['Conception', 'Responsive']
  },
  'vitrine-woocommerce': {
    headline: 'Une vitrine de catalogue claire, tenue à jour par l’équipe',
    accent: '#FF5A1F',
    services: ['Extension WooCommerce', 'Catalogue'],
    stack: ['WordPress', 'WooCommerce']
  },
  'extension-inventaire': {
    headline: 'Savoir ce qui est disponible, et comprendre chaque écart de stock',
    accent: '#12B76A',
    services: ['Extension', 'Gestion des stocks'],
    stack: ['WordPress', 'WooCommerce']
  }
};
