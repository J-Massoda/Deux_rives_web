// Wave 2: four interactive flagship demos with detailed, reader-first French editorial copy.
const APP_DATA={
'clientflow-pro':{
 name:'ClientFlow Pro',sector:'Services professionnels',subtitle:'CRM, qualification commerciale et lancement de mission',
 head:'Du premier contact à une mission claire : un CRM pensé pour les entreprises de services',
 intro:'Une nouvelle demande arrive, plusieurs personnes échangent avec le prospect, puis un devis est accepté. Pourtant, sans passage de relais structuré, le démarrage de la prestation reste incertain. ClientFlow Pro explore un CRM qui relie opportunités, contacts, décisions commerciales et missions, plutôt que de s’arrêter au pipeline des ventes.',
 audience:'Cabinets de conseil, agences, prestataires B2B, bureaux d’études et équipes commerciales qui doivent transmettre des dossiers à la production.',
 pain:'Les informations commerciales sont fréquemment fragmentées entre boîtes de réception, documents, notes individuelles et tableurs. Une opportunité peut avancer sans que les documents demandés, le responsable ou la prochaine action soient clairement identifiés. Le risque n’est pas uniquement la vente perdue : c’est aussi une mission qui démarre sans contexte, avec des demandes répétées au client.',
 difference:'Le parcours proposé commence par un enregistrement unique de la demande, puis une qualification, une proposition et une décision. Lorsqu’une opportunité devient acceptée, une mission de préparation est créée. Les personnes qui doivent livrer le travail peuvent alors repartir du bon dossier, avec un état et une responsabilité visibles.',
 pieces:[
 ['Qualification et priorités','Conserver un contact, une entreprise et une valeur estimée au même endroit. Les étapes sont explicites pour que chacun sache si le dossier attend une information, une décision ou une préparation commerciale.'],
 ['Pipeline vers exécution','Le passage « proposition acceptée » déclenche la création d’une mission fictive à cadrer. Ce mécanisme illustre la liaison entre relation commerciale et prestation, souvent absente des CRM génériques.'],
 ['Historique et continuité','Chaque transition s’ajoute à un journal local. Même dans une petite équipe, un changement de responsable doit pouvoir être compris sans reconstituer des discussions dispersées.']
 ],
 workflow:['Créer un prospect et renseigner le contact','Qualifier la demande et ses informations','Faire passer une proposition à l’étape suivante','Accepter et créer automatiquement une mission'],
 seo:'logiciel CRM pour société de services, gestion du pipeline commercial B2B, portail client, logiciel de gestion des prospects, automatisation de la relation client',
 qa:[
 ['Pourquoi relier le CRM à la gestion des missions ?','Parce que la signature n’efface pas les informations recueillies pendant la vente. La liaison permet de préparer le dossier de réalisation, d’attribuer un responsable et d’éviter une deuxième collecte des mêmes informations.'],
 ['À quoi sert la démonstration ClientFlow Pro ?','Elle permet de manipuler un pipeline, de créer des opportunités fictives et de constater la conversion d’un dossier commercial en mission. Elle n’envoie aucune donnée à un serveur et ne remplace pas un CRM déployé.'],
 ['Un CRM sur mesure est-il préférable à un CRM standard ?','Pas systématiquement. Un produit du marché est souvent préférable lorsque les besoins sont couverts. Un développement spécifique mérite d’être étudié lorsque les droits, le cycle de mission ou les intégrations métier dépassent les possibilités raisonnables de configuration.']
 ],
 linked:'services-professionnels'
},
'chantierpilot':{
 name:'ChantierPilot',sector:'Bâtiment & interventions',subtitle:'Planning opérationnel, avancement et suivi des coûts',
 head:'Piloter un chantier sans séparer les travaux, les équipes et les coûts engagés',
 intro:'Dans une entreprise du bâtiment, un retard ou une dépense supplémentaire peut modifier plusieurs décisions : l’affectation d’une équipe, la date d’un contrôle, le budget restant ou le prochain échange avec le donneur d’ordre. ChantierPilot illustre un espace de suivi qui relie l’avancement des lots au coût engagé, dans une interface conçue pour la coordination entre le bureau et le terrain.',
 audience:'Entreprises de rénovation, installateurs, contractants, conducteurs de travaux et responsables opérationnels du BTP.',
 pain:'Un chantier suivi par des fichiers différents n’offre pas toujours une vision cohérente de l’avancement et des dépenses. Les réunions reconstituent alors une situation qui aurait dû être visible dans l’outil. Un lot annoncé « presque terminé » peut masquer une dépense non enregistrée ou une réception encore à prévoir.',
 difference:'Le démonstrateur suit plusieurs lots fictifs, chacun avec un budget, un coût engagé et un pourcentage d’avancement. Ajouter un lot ou enregistrer une dépense recalcule immédiatement le total et le solde budgétaire. Un rapport CSV peut ensuite être exporté pour montrer comment l’information pourrait être transmise.',
 pieces:[
 ['Budgets et lots de travaux','Chaque poste est suivi individuellement. La somme des budgets forme le montant prévisionnel du chantier, tandis que les dépenses enregistrées montrent les engagements fictifs en cours.'],
 ['Avancement visible','Les incréments de progression matérialisent l’état du lot. L’interface présente l’avancement global comme moyenne simple, afin de ne pas prétendre mesurer une progression pondérée non calculée.'],
 ['Rapport et transmission','Le CSV présente le détail des lots et des montants. Dans une vraie application, les règles de validation, justificatifs, signatures et accès seraient définis au cadrage.']
 ],
 workflow:['Créer un lot avec son budget prévu','Augmenter l’avancement après une étape de travail','Enregistrer une nouvelle dépense sur le lot','Comparer budget et coûts puis exporter le rapport'],
 seo:'logiciel de suivi de chantier, logiciel BTP sur mesure, tableau de suivi de coûts, gestion des travaux, application de chantier pour équipes terrain',
 qa:[
 ['Comment suivre les coûts d’un chantier avec une application ?','En organisant les lots, les budgets initiaux, les dépenses, les engagements et les documents justificatifs dans un même parcours. Les règles de calcul doivent refléter les pratiques comptables et contractuelles de l’entreprise.'],
 ['Le solde affiché est-il la rentabilité du chantier ?','Non. La démo affiche budget moins coûts engagés, sans calcul de facturation, taxes, sous-traitance ni marge. Elle illustre un suivi de dépenses et non une comptabilité de chantier complète.'],
 ['Peut-on relier la solution aux équipes mobiles ?','Oui, dans un projet de production cela peut impliquer une interface adaptée au terrain, des documents accessibles, des synchronisations et éventuellement un mode hors ligne. Ces fonctions ne sont pas présentes dans la démo actuelle.']
 ],
 linked:'batiment-interventions'
},
'commercepilot':{
 name:'CommercePilot',sector:'Commerce & opérations',subtitle:'Stocks, commandes fournisseurs et mouvements',
 head:'De la commande fournisseur à la disponibilité réelle : une gestion des stocks lisible',
 intro:'Le stock n’est pas seulement un nombre affiché sur une fiche produit. Une unité vendue, réservée, reçue ou déplacée affecte la promesse faite au client. CommercePilot explore un outil qui regroupe catalogue, seuils de réapprovisionnement et mouvements opérationnels pour éviter les écarts entre la vente et l’exécution.',
 audience:'Commerçants multicanaux, petites enseignes, distributeurs, négoces spécialisés et équipes d’approvisionnement.',
 pain:'Lorsque les ventes et les achats sont suivis dans plusieurs plateformes, les écarts de disponibilité se multiplient. Une référence peut apparaître disponible après une vente alors que la quantité réelle a diminué. Une commande fournisseur peut arriver sans que le système de stock soit mis à jour.',
 difference:'Dans la démonstration, vendre une unité décrémente immédiatement le stock ; un seuil franchi crée une alerte visuelle. Le bon de commande fournisseur reste ouvert jusqu’à une réception explicite. Réceptionner augmente le stock et ajoute une ligne dans l’historique. Aucun fournisseur réel n’est contacté.',
 pieces:[
 ['Catalogue et niveaux de stock','Chaque référence possède une quantité, un seuil et un prix fictif. La quantité affichée évolue en fonction des opérations déclenchées dans l’interface.'],
 ['Commandes fournisseurs','Un bon de commande est créé avec un produit et une quantité. Le stock ne change qu’à la réception : un point de contrôle essentiel pour éviter de compter des marchandises non livrées.'],
 ['Alertes et journal de mouvements','Les alertes rendent visibles les faibles disponibilités. Le journal aide à distinguer une vente d’une réception et ouvre la discussion sur les contrôles d’inventaire nécessaires en production.']
 ],
 workflow:['Vendre une unité depuis une fiche produit','Identifier les références sous le seuil de stock','Créer un bon de commande fournisseur','Réceptionner pour mettre à jour la disponibilité'],
 seo:'logiciel gestion de stock pour PME, gestion des achats fournisseurs, commandes B2B, suivi des inventaires, logiciel commerce sur mesure',
 qa:[
 ['Pourquoi séparer la commande fournisseur et la réception ?','Parce qu’un achat confirmé ne prouve pas que les produits sont physiquement disponibles. Séparer les deux événements évite de promettre du stock non réceptionné.'],
 ['La démonstration se connecte-t-elle à WooCommerce ou à un ERP ?','Non. Elle fonctionne localement avec des données fictives. Dans un projet réel, une intégration peut être étudiée selon les API, les webhooks et la règle définissant la source de vérité du stock.'],
 ['Un inventaire peut-il être automatisé entièrement ?','Les échanges de données peuvent l’être en partie, mais les contrôles physiques, les ajustements et les erreurs de préparation nécessitent souvent une intervention humaine clairement tracée.']
 ],
 linked:'commerce-operations'
},
'docupilot-ai':{
 name:'DocuPilot AI',sector:'IA & documents',subtitle:'Extraction simulée, vérification humaine et export structuré',
 head:'Traitement documentaire : automatiser les vérifications simples sans masquer les erreurs',
 intro:'Recevoir une facture ou un devis n’est que le début d’un processus documentaire. Il faut identifier les données, vérifier leur cohérence, décider d’une correction éventuelle et transmettre un résultat exploitable. DocuPilot AI présente une approche de traitement assisté où l’interface distingue clairement l’analyse simulée de la validation humaine.',
 audience:'Services achats, directions administratives, opérations comptables et équipes qui traitent de nombreux documents métier.',
 pain:'La saisie manuelle répétée prend du temps, mais une extraction erronée peut être encore plus coûteuse qu’une saisie lente. Une solution sérieuse doit signaler les incertitudes et conserver la possibilité de contrôler le résultat avant de l’envoyer vers un système de gestion.',
 difference:'La version de démonstration utilise trois documents synthétiques intégrés et un calcul déterministe : sous-total plus taxe doit correspondre au total indiqué. Un document contient volontairement une erreur. L’utilisateur lance le contrôle, corrige le montant, valide le dossier puis exporte un JSON marqué fictif. Aucun vrai fichier ni service d’IA n’est utilisé.',
 pieces:[
 ['Analyse illustrative, sans promesse de détection','Le bouton d’analyse vérifie une cohérence arithmétique sur des valeurs préchargées. Cette simulation aide à montrer le rôle d’un contrôle sans attribuer les résultats à un modèle inexistant.'],
 ['Revue et correction humaines','Un dossier ne peut être validé que si son total correspond au calcul attendu. Les champs restent modifiables dans l’interface, pour montrer la logique de correction et de responsabilité.'],
 ['Export de données validées','Le document approuvé peut être exporté au format JSON. Il s’agit d’un exemple de sortie structurée destiné à illustrer une future intégration, non d’une transmission comptable réelle.']
 ],
 workflow:['Choisir un document fictif préchargé','Lancer le contrôle déterministe des champs','Corriger manuellement une incohérence','Valider puis exporter les données structurées'],
 seo:'traitement documentaire IA entreprise, contrôle de factures, extraction de données documents, automatisation documentaire, validation humaine de documents',
 qa:[
 ['DocuPilot AI analyse-t-il réellement des factures envoyées par les visiteurs ?','Non. Cette démonstration ne contient ni téléversement de fichiers ni appel à un service d’intelligence artificielle. Les documents et les résultats sont entièrement fictifs.'],
 ['Quel intérêt présente la validation humaine ?','Elle permet de vérifier une information sensible ou incertaine avant de l’intégrer dans un système métier. Le contrôle humain doit être placé là où une erreur aurait des conséquences importantes.'],
 ['Peut-on utiliser ce concept pour la facturation électronique française ?','Un projet réel doit passer par les formats, obligations et plateformes applicables. Cette démo n’est pas une plateforme agréée et ne prétend pas émettre ou recevoir des factures électroniques réglementaires.']
 ],
 linked:'industrie-ia-pilotage'
}
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const assets={
'clientflow-pro':'ChatGPT Image Oct 26, 2026, 11_22_39 AM-2.png',
'chantierpilot':'ChatGPT Image Oct 26, 2026, 11_22_40 AM-3.png',
'commercepilot':'ChatGPT Image Oct 26, 2026, 11_22_42 AM-4.png',
'docupilot-ai':'ChatGPT Image Oct 26, 2026, 11_22_44 AM-5.png'
};
export const flagshipIds=Object.keys(APP_DATA);
export function buildFlagships(write){
 for(const [id,d] of Object.entries(APP_DATA)){
  const side=Object.entries(APP_DATA).filter(([key])=>key!==id).map(([key,v])=>'<a href="../../applications/'+key+'/"><b>'+esc(v.name)+'</b><span>'+esc(v.subtitle)+' ↗</span></a>').join('');
  const editorial='<section class="wave-editorial wave-editorial--deep"><div class="wave-heading"><span>LE DÉFI OPÉRATIONNEL</span><h2>Un outil métier doit résoudre un problème vérifiable.</h2></div><div class="wave-columns"><div><h3>Le constat</h3><p>'+esc(d.pain)+'</p></div><div><h3>L’approche proposée</h3><p>'+esc(d.difference)+'</p></div></div></section>'+
   '<section class="wave-editorial"><div class="wave-heading"><span>FONCTIONS ESSENTIELLES</span><h2>Une expérience conçue autour des gestes du métier</h2></div><div class="wave-feature-grid">'+d.pieces.map((p,i)=>'<article><small>0'+(i+1)+' / '+esc(d.name)+'</small><h3>'+esc(p[0])+'</h3><p>'+esc(p[1])+'</p></article>').join('')+'</div></section>'+
   '<section class="wave-editorial wave-editorial--sage"><div class="wave-heading"><span>PARCOURS DE DÉMONSTRATION</span><h2>Quatre actions pour comprendre le système</h2></div><ol class="wave-flow">'+d.workflow.map((s,i)=>'<li><strong>'+String(i+1).padStart(2,'0')+'</strong><span>'+esc(s)+'</span></li>').join('')+'</ol><p>Les données sont fictives. Aucune action dans cette démonstration ne crée un dossier client, une commande, une analyse IA ou une transaction réelle.</p></section>'+
   '<section class="wave-editorial wave-editorial--deep"><div class="wave-heading"><span>UN PROJET SUR MESURE</span><h2>Ce que nécessiterait une mise en production</h2></div><div class="wave-columns"><div><h3>Cadrage technique et métier</h3><p>La solution devrait préciser les droits d’accès, la disponibilité attendue, le volume de données, les intégrations et les règles de contrôle. Les flux doivent être testés avec les personnes qui utilisent réellement l’outil. Le modèle de données, la supervision et les responsabilités de maintenance sont à définir avant toute promesse de livraison.</p></div><div><h3>Évolution après la première version</h3><p>Les interfaces montrées ici privilégient la compréhension du processus. Dans un environnement réel, la sécurité, les sauvegardes, les journaux auditables et la fiabilité des échanges avec les systèmes tiers demanderaient des développements complémentaires. Une première version devrait être mesurée par son utilité, pas par le nombre d’écrans.</p></div></div></section>'+
   '<section class="wave-editorial"><div class="wave-heading"><span>QUESTIONS FRÉQUENTES</span><h2>Comprendre les possibilités et les limites</h2></div><div class="studio-faq-grid">'+d.qa.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</div></section>';
  const body='<section class="wave-app-intro"><a href="../../studio/" class="wave-back">← Studio de logiciels métier</a><div class="wave-hero"><div><span class="eyebrow">'+esc(d.sector)+' · APPLICATION INTERACTIVE</span><h1>'+esc(d.head)+'</h1><p>'+esc(d.intro)+'</p><div class="wave-hero-actions"><a href="#essayer" class="wave-action">Essayer le scénario ↓</a><a href="../../contact/" class="wave-action secondary">Parler d’un besoin similaire ↗</a></div></div><figure><img src="../../assets/'+assets[id]+'" loading="eager" alt="Illustration conceptuelle de '+esc(d.name)+'"><figcaption>Maquette illustrative — '+esc(d.name)+'</figcaption></figure></div></section>'+
  '<section class="wave-trust"><div><strong>Une démonstration réellement interactive</strong><p>Création, transitions et calculs fonctionnels dans votre navigateur.</p></div><div><strong>Aucune donnée personnelle requise</strong><p>Les données de test sont stockées localement et réinitialisables.</p></div><div><strong>Pas un produit déployé</strong><p>Ce prototype de découverte n’est pas un service commercial opérationnel.</p></div></section>'+
  '<section class="wave-demo-section" id="essayer"><div class="wave-demo-section-head"><span class="eyebrow">SCÉNARIO INTERACTIF · '+esc(d.name)+'</span><h2>Testez le parcours, observez les conséquences.</h2><p>Les boutons, les formulaires et les changements d’état fonctionnent. L’actualisation conserve votre scénario local ; le bouton de réinitialisation restaure les données de départ.</p></div><div data-flagship-app="'+id+'" class="live-root"><p>Activation de la démonstration…</p></div></section>'+
  editorial+
  '<section class="wave-editorial wave-editorial--sage"><div class="wave-heading"><span>POUR ALLER PLUS LOIN</span><h2>Une interface utile découle des bonnes questions.</h2></div><p class="wave-last-note">Ce concept s’adresse notamment à '+esc(d.audience.toLowerCase())+'. Les termes métier liés à cette application comprennent : '+esc(d.seo)+'. Nous les abordons au travers des contraintes de travail, sans prétendre que chaque organisation aurait besoin du même outil.</p><div class="wave-more-links"><a href="../../secteurs/'+d.linked+'/">Explorer les enjeux du secteur ↗</a><a href="../../studio/'+id+'/">Voir la fiche du concept ↗</a><a href="../../contact/">Discuter de votre projet ↗</a></div></section>'+
  '<section class="wave-related"><span class="eyebrow">AUTRES APPLICATIONS PHARES</span><h2>Quatre parcours, quatre métiers.</h2><div>'+side+'</div></section>';
  write('applications/'+id+'/',{title:d.name+' — démonstration interactive de logiciel métier',description:d.intro.slice(0,155),body});
 }
}
