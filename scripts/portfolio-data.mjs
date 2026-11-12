export const projectTypes = {
  client: 'Projet client',
  produit: 'Extension réutilisable',
  interne: 'Projet interne',
  prototype: 'Prototype ou pilote',
  conception: 'Étude de conception'
};

export const projects = [
  {
    id: 'vitrine-woocommerce', name: 'Extension vitrine WooCommerce', type: 'produit', expertise: 'sites-et-commerce', sector: 'commerce-operations', cover: 'commerce-equipe-catalogue.webp',
    summary: 'Une vitrine de catalogue pour organiser les collections, les fiches et les demandes clients dans WordPress.',
    challenge: 'Un commerce doit présenter ses gammes clairement et permettre à son équipe de tenir le catalogue à jour.',
    delivery: 'L’extension organise les catégories et les fiches autour du catalogue WooCommerce. Deux Rives Web étudie les adaptations selon le thème, le catalogue et le parcours du client.'
  },
  {
    id: 'extension-inventaire', name: 'Extension de gestion des stocks', type: 'produit', expertise: 'sites-et-commerce', sector: 'commerce-operations', cover: 'commerce-inventaire-entrepot.webp',
    summary: 'Un module pour consulter les quantités et retrouver l’historique des mouvements de stock.',
    challenge: 'Une équipe doit savoir combien d’articles sont disponibles et comprendre l’origine d’un écart.',
    delivery: 'Le module réunit les quantités, les entrées, les sorties et les corrections. Deux Rives Web étudie l’intégration selon les références et les outils déjà en place.'
  },
  {
    id: 'freshbox-tech-marketplace', name: 'FreshBox Tech Marketplace', type: 'client', expertise: 'sites-et-commerce', sector: 'commerce-operations', cover: 'freshbox-tech-cover.jpg',
    summary: 'Un catalogue B2B pour découvrir des solutions et orienter les demandes vers les bons partenaires.',
    challenge: 'Donner une structure commune à des offres, catégories et partenaires différents pour que les acheteurs puissent s’orienter.',
    delivery: 'Une architecture WooCommerce et WCFM structure le catalogue partenaires. Le parcours de navigation et le méga-menu aident les acheteurs à retrouver les offres par catégorie.',
    outcome: 'Le rendu personnalisé a rétabli la navigation par catégories sans modification des fichiers du thème. Le catalogue donne aux marques partenaires des pages structurées que les acheteurs peuvent parcourir.',
    evidence: { title: 'Un catalogue structuré pour les partenaires', image: 'freshbox-catalogue.webp', alt: 'Écran du projet FreshBox Tech Marketplace', caption: 'Capture de la plateforme présentée dans la fiche d’origine de FreshBox Tech Marketplace.' },
    live: 'https://market.freshboxtech.com/'
  },
  {
    id: 'residences-loumia', name: 'Résidences Loumia', type: 'client', expertise: 'sites-et-commerce', sector: 'tourisme-hotellerie', cover: 'residences-loumia-cover.jpg',
    summary: 'Une expérience web pour présenter plusieurs résidences et faciliter leur découverte.',
    challenge: 'Présenter une offre d’hébergement répartie entre plusieurs résidences avec une navigation et une identité communes.',
    delivery: 'La conception UI/UX et les interactions GSAP accompagnent la découverte des propriétés. La fiche d’origine présente les écrans conçus pour ce parcours.',
    outcome: 'La correction du défilement GSAP a rétabli la navigation entre les pages. Les formulaires de demande orientent les messages vers la boîte de la résidence sélectionnée.',
    evidence: { title: 'Une expérience commune pour plusieurs résidences', image: 'loumia-parcours.webp', alt: 'Aperçu du parcours de découverte des Résidences Loumia', caption: 'Capture du parcours présenté dans la fiche d’origine de Résidences Loumia.' },
    live: 'https://residencesloumia.com/'
  },
  {
    id: 'afremit', name: 'Afremit', type: 'prototype', expertise: 'logiciels-sur-mesure', sector: 'education', cover: 'afremit-cover.svg',
    summary: 'Un pilote pour suivre les demandes de paiement de frais de scolarité à distance.',
    challenge: 'Une famille à l’étranger a besoin de savoir qui traite sa demande, ce qui a été vérifié et où en est le règlement.',
    delivery: 'Le travail de cofondation a porté sur le cadrage produit et le développement du pilote, de l’inscription des prestataires au suivi des demandes de test.',
    demo: 'https://j-massoda.github.io/Afremit/'
  },
  {
    id: 'bridgegate', name: 'BridgeGate', type: 'prototype', expertise: 'integrations-api', sector: 'industrie-ia-pilotage', cover: 'bridgegate-cover.svg',
    summary: 'Un poste de suivi pour repérer et reprendre les échanges qui échouent entre systèmes.',
    challenge: 'Quand une mise à jour n’arrive pas au système suivant, l’équipe doit identifier l’échec et décider quoi faire.',
    delivery: 'Le prototype donne du contexte à chaque incident d’intégration. Il permet d’examiner puis de reprendre un échange en échec.',
    demo: 'https://j-massoda.github.io/bridgegate/'
  },
  {
    id: 'eventflow-go', name: 'EventFlow Go', type: 'prototype', expertise: 'integrations-api', sector: 'commerce-operations', cover: 'eventflow-go-cover.svg',
    summary: 'Un parcours d’intégration qui conserve la trace des changements de commande.',
    challenge: 'Une mise à jour de commande doit parvenir aux autres systèmes même si un destinataire est temporairement indisponible.',
    delivery: 'Le prototype couvre la livraison d’événements, l’observation des erreurs et la reprise des transmissions.',
    demo: 'https://j-massoda.github.io/eventflow-go/'
  },
  {
    id: 'intakedesk', name: 'IntakeDesk', type: 'prototype', expertise: 'automatisation-des-processus', sector: 'services-professionnels', cover: 'intakedesk-cover.svg',
    summary: 'Une file de travail pour qualifier les demandes entrantes avant de démarrer une prestation.',
    challenge: 'Les demandes reçues par plusieurs canaux se perdent facilement avant leur qualification et leur attribution.',
    delivery: 'Le parcours de réception et de suivi rend visibles les informations manquantes et la prochaine action.',
    demo: 'https://j-massoda.github.io/intake-desk-pluggin/'
  },
  {
    id: 'packetlens', name: 'PacketLens', type: 'prototype', expertise: 'automatisation-des-processus', sector: 'services-professionnels', cover: 'packetlens-cover.svg',
    summary: 'Une revue documentaire qui montre les pièces reçues, manquantes ou encore à valider.',
    challenge: 'Un dossier paraît complet jusqu’au moment où une pièce obligatoire manque ou n’a pas été contrôlée.',
    delivery: 'Le prototype de revue relie les exigences aux pièces reçues et indique la raison d’un blocage.',
    demo: 'https://j-massoda.github.io/packetlens/'
  },
  {
    id: 'signaldesk', name: 'SignalDesk', type: 'prototype', expertise: 'automatisation-des-processus', sector: 'industrie-ia-pilotage', cover: 'signaldesk-cover.svg',
    summary: 'Une vue commune pour attribuer et suivre les exceptions opérationnelles.',
    challenge: 'Des alertes issues de plusieurs outils deviennent difficiles à traiter quand personne ne sait qui en est responsable.',
    delivery: 'Le prototype rassemble les exceptions et permet d’associer à chacune un responsable et une prochaine action.',
    demo: 'https://j-massoda.github.io/signaldesk/'
  },
  {
    id: 'vendorpulse', name: 'VendorPulse', type: 'prototype', expertise: 'automatisation-des-processus', sector: 'commerce-operations', cover: 'vendorpulse-cover.svg',
    summary: 'Un outil de suivi des commandes en retard ou bloquées chez un fournisseur.',
    challenge: 'Un tableau de bord peut signaler un retard sans aider l’équipe à savoir qui doit agir.',
    delivery: 'Une file de suivi fait remonter les commandes à examiner et aide l’équipe à décider de la relance.',
    demo: 'https://j-massoda.github.io/vendorpulse-woo-pluggin/'
  },
  {
    id: 'africa-payment-reconciliation-lab', name: 'Africa Payment Reconciliation Lab', type: 'prototype', expertise: 'integrations-api', sector: 'commerce-operations', cover: 'reconlab-cover.svg',
    summary: 'Un banc d’essai pour rapprocher des événements de paiement et des écritures de registre.',
    challenge: 'Les paiements peuvent arriver plusieurs fois, dans un ordre différent ou sans référence directement exploitable.',
    delivery: 'Le MVP combine webhooks signés, traitement idempotent, rapprochement et revue des exceptions.',
    demo: 'https://j-massoda.github.io/africa-payment-reconciliation-lab/'
  },
  {
    id: 'ai-agent-security-sandbox', name: 'AI Agent Security Sandbox', type: 'prototype', expertise: 'intelligence-artificielle', sector: 'industrie-ia-pilotage', cover: 'sentinel-cover.svg',
    summary: 'Un environnement interactif pour superviser les actions sensibles d’un agent IA.',
    challenge: 'Une équipe doit comprendre ce qu’un agent peut faire et garder la main sur les actions qui nécessitent une approbation.',
    delivery: 'La démonstration combine permissions limitées, validation humaine, traces d’audit et scénarios de récupération.',
    demo: 'https://j-massoda.github.io/ai-agent-security-sandbox/'
  },
  {
    id: 'developer-productivity-release-intelligence-hub', name: 'Release Intelligence Hub', type: 'prototype', expertise: 'maintenance-evolution', sector: 'industrie-ia-pilotage', cover: 'pulsedeck-dashboard-preview.png',
    summary: 'Une vue interactive reliant déploiements, incidents, santé CI et responsabilités.',
    challenge: 'Les informations sur une mise en production sont souvent réparties entre plusieurs outils et difficiles à lire ensemble.',
    delivery: 'Le tableau de bord relie les déploiements aux incidents, aux indicateurs inspirés de DORA et aux équipes responsables.',
    demo: 'https://j-massoda.github.io/Developer-Productivity-Release-Intelligence-Hub/'
  },
  {
    id: 'offline-first-sme-operations-suite', name: 'Offline-First SME Operations Suite', type: 'prototype', expertise: 'logiciels-sur-mesure', sector: 'commerce-operations', cover: 'kioskflow-cover.svg',
    summary: 'Une application d’opérations qui accepte des saisies pendant une coupure de réseau.',
    challenge: 'Une équipe doit continuer à travailler sans perdre de données, puis résoudre les conflits à la reconnexion.',
    delivery: 'L’application web progressive combine IndexedDB, un service worker, une file de synchronisation durable et une revue explicite des conflits.',
    demo: 'https://j-massoda.github.io/Offline-First-SME-Operations-Suite/'
  },
  {
    id: 'woocommerce-integration-reliability-kit', name: 'WooCommerce Integration Reliability Kit', type: 'prototype', expertise: 'integrations-api', sector: 'commerce-operations', cover: 'relaykit-cover.svg',
    summary: 'Un plugin WooCommerce pour mieux suivre les transmissions de commandes aux prestataires.',
    challenge: 'Un échec d’intégration peut laisser une commande en attente et créer des doublons si les relances manquent de contrôle.',
    delivery: 'Le plugin réunit requêtes signées, déduplication, reprises limitées et récupération des commandes en échec.',
    demo: 'https://j-massoda.github.io/WooCommerce-Integration-Reliability-Kit/'
  },
  {
    id: 'eth-ai-forecaster', name: 'Eth AI Forecaster', type: 'prototype', expertise: 'intelligence-artificielle',
    cover: 'https://user-images.githubusercontent.com/97313664/185477053-a7ea91b5-e148-4728-8b5b-a5d29b6d9494.png',
    summary: 'Une expérimentation Python et Jupyter sur les données historiques d’Ethereum.',
    challenge: 'Transformer un historique de prix en données utilisables pour évaluer une expérience de prévision à court terme.',
    delivery: 'L’étude exploratoire couvre la collecte des données, leur préparation et la comparaison des prédictions.'
  },
  {
    id: 'phenotyping-flow', name: 'Phenotyping Flow', type: 'conception', expertise: 'logiciels-sur-mesure', sector: 'sante-administrative', cover: 'phenotyping-flow-controller.jpg',
    summary: 'Une étude d’interface pour organiser des sessions d’observation et des expériences en laboratoire.',
    challenge: 'Rendre compréhensibles les étapes et états d’un système de contrôle que plusieurs opérateurs doivent utiliser.',
    delivery: 'Le travail de conception associe une cartographie du parcours à une interface de contrôle en mode sombre. La fiche d’origine présente les planches et les écrans.'
  },
  {
    id: 'agribusiness', name: 'Agribusiness', type: 'conception', expertise: 'sites-et-commerce', cover: 'agribusiness-cover.jpg',
    summary: 'Un projet d’études de vitrine agricole pour mettre en relation producteurs et acheteurs.',
    challenge: 'Permettre à un visiteur de découvrir les produits de plusieurs producteurs dans un parcours de navigation commun.',
    delivery: 'L’interface du concept illustre les étapes de découverte des produits proposés par différents producteurs.',
    demo: 'https://j-massoda.github.io/Shopping-website/'
  },
  {
    id: 'sneaker-shop', name: 'Sneaker Shop', type: 'conception', expertise: 'sites-et-commerce', sector: 'commerce-operations', cover: 'sneaker-shop-cover.jpg',
    summary: 'Un concept de page de présentation responsive pour une boutique de baskets.',
    challenge: 'Présenter une gamme de produits avec une hiérarchie visuelle qui fonctionne sur mobile comme sur ordinateur.',
    delivery: 'La page de présentation explore la composition, la navigation et l’adaptation aux différentes tailles d’écran.',
    demo: 'https://j-massoda.github.io/Sneaker-shop/'
  },
  {
    id: 'changemap', name: 'ChangeMap', type: 'prototype', expertise: 'automatisation-des-processus', sector: 'ressources-humaines', cover: 'lab-changemap.svg', lab: true,
    summary: 'Un suivi des consignes à mettre à jour après une décision interne.',
    challenge: 'Une consigne a changé, mais ses anciennes versions restent dans les procédures, messages ou outils utilisés par l’équipe.',
    delivery: 'Le prototype inventorie les points à mettre à jour, leurs responsables et les vérifications à effectuer.',
    demo: 'https://j-massoda.github.io/changemap/'
  },
  {
    id: 'citebid', name: 'Citebid', type: 'prototype', expertise: 'intelligence-artificielle', sector: 'services-professionnels', cover: 'lab-citebid.svg', lab: true,
    summary: 'Un MVP privé pour lire un appel d’offres et structurer la préparation d’une réponse.',
    challenge: 'Les critères d’éligibilité, pièces et échéances peuvent être dispersés dans un dossier de consultation.',
    delivery: 'Le MVP organise la lecture du dossier et la revue des exigences. Un pilote guidé permet de découvrir le prototype.'
  },
  {
    id: 'clientflow', name: 'ClientFlow', type: 'prototype', expertise: 'logiciels-sur-mesure', sector: 'services-professionnels', cover: 'lab-clientflow.svg', lab: true,
    summary: 'Un pilote pour accompagner une demande depuis le premier contact jusqu’au dossier prêt à traiter.',
    challenge: 'Les équipes de services peuvent perdre le fil entre la demande, la collecte des documents et le transfert à un spécialiste.',
    delivery: 'Le parcours de qualification rend visibles les étapes et les critères de passage d’un responsable à l’autre.'
  },
  {
    id: 'clinic-operations', name: 'Clinic Operations', type: 'prototype', expertise: 'logiciels-sur-mesure', sector: 'sante-administrative', cover: 'lab-clinic.svg', lab: true,
    summary: 'Un pilote de coordination entre la prise de rendez-vous, l’accueil et le suivi administratif.',
    challenge: 'Les demandes, les arrivées et les tâches de l’équipe peuvent se retrouver dans des files séparées.',
    delivery: 'Le pilote décrit un parcours pour tester le passage de relais entre confirmation, accueil et suivi.'
  },
  {
    id: 'invoice-follow-up', name: 'Invoice Follow-up', type: 'prototype', expertise: 'automatisation-des-processus', sector: 'services-professionnels', cover: 'lab-invoice.svg', lab: true,
    summary: 'Un pilote pour retrouver les factures à suivre et la dernière action convenue.',
    challenge: 'Une promesse de règlement peut rester dans la boîte de réception d’un seul collaborateur.',
    delivery: 'L’espace de suivi réunit les factures ouvertes, le contexte de la relance et la prochaine action.'
  },
  {
    id: 'knowledgeops', name: 'KnowledgeOps', type: 'prototype', expertise: 'logiciels-sur-mesure', sector: 'ressources-humaines', cover: 'lab-knowledge.svg', lab: true,
    summary: 'Un pilote de recherche interne qui relie chaque réponse à sa source et à son responsable.',
    challenge: 'Une réponse circule dans plusieurs canaux, sans indication de la version à jour ni du propriétaire de la règle.',
    delivery: 'Le parcours de recherche aide à retrouver la source d’une réponse et à repérer celles qui demandent une validation.'
  },
  {
    id: 'sourcecheck', name: 'SourceCheck', type: 'prototype', expertise: 'integrations-api', sector: 'services-professionnels', cover: 'lab-sourcecheck.svg', lab: true,
    summary: 'Une comparaison de deux exports CSV pour détecter les données manquantes ou contradictoires.',
    challenge: 'Deux outils peuvent donner des réponses différentes sur le même dossier, sans signaler l’écart.',
    delivery: 'Le prototype rapproche deux jeux de données et permet de prioriser les écarts à examiner.',
    demo: 'https://j-massoda.github.io/sourcecheck/'
  },
  {
    id: 'workflowfit', name: 'WorkflowFit', type: 'prototype', expertise: 'automatisation-des-processus', sector: 'industrie-ia-pilotage', cover: 'lab-workflowfit.svg', lab: true,
    summary: 'Un prototype pour comparer un parcours existant et un pilote avant de généraliser un changement.',
    challenge: 'Une équipe peut adopter un outil sans connaître le temps que le parcours actuel perd à chaque étape.',
    delivery: 'La démonstration enregistre les étapes, compare les délais et aide à choisir le prochain point à tester.',
    demo: 'https://j-massoda.github.io/workflowfit/'
  }
];

export const testimonials = [
  { project: 'freshbox-tech-marketplace', person: 'Louis M.', role: 'Fondateur, FreshBox', quote: 'Cette collaboration a donné vie à l’idée de FreshBox en la transformant en un système fonctionnel, pensé pour ses utilisateurs. Les solutions mises en place nous ont permis de tester le concept avec de vrais utilisateurs.' },
  { project: 'residences-loumia', person: 'M. Perez', role: 'Responsable, Résidences Loumia', quote: 'Nos besoins opérationnels ont été bien compris. Les outils numériques mis en place ont simplifié la gestion quotidienne de la résidence.' },
  { project: 'residences-loumia', person: 'M. Pedrel M.', role: 'Direction, Résidences Loumia', quote: 'Nous avons apprécié la fiabilité de l’accompagnement et la vision d’ensemble. Cette collaboration nous a aidés à améliorer nos processus et à mieux comprendre comment les outils numériques soutiennent notre activité.' },
  { project: 'afremit', person: 'M. Mabuti', role: 'Fondateur, Afremit', quote: 'Le travail de cofondation nous a aidés à définir notre vision produit et à construire la première version de la plateforme. La réalisation technique et l’attention portée au produit ont joué un rôle essentiel dans la mise en ligne du concept.' }
];

export const clientDemos = [
  {
    id: 'lumen-clinic',
    name: 'Lumen Clinic',
    category: 'Santé · Site de clinique',
    summary: 'Une visite de clinique fictive, de la présentation des soins à la prise de rendez-vous.',
    live: 'https://deux-rives-web.github.io/Lumen-clinic/'
  }
];
