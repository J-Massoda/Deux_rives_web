// Deux Rives Web — illustrative software concept catalogue.
// Each concept is clearly labelled as a prototype; these are not client case studies.
export const concepts = [
['clientflow-pro','ClientFlow Pro','Services professionnels','Qualification des demandes, CRM, documents et missions','Client-centered workspace','01'],
['cabinet-os','CabinetOS','Services professionnels','Dossiers, échéances et répartition des tâches','Matter overview','02'],
['missiondesk','MissionDesk','Services professionnels','Missions, temps passé, livrables et suivi de marge','Project workspace','03'],
['chantierpilot','ChantierPilot','Bâtiment & interventions','Suivi de chantier, planning, équipes et coûts','Construction timeline','01'],
['intervention-360','Intervention 360','Bâtiment & interventions','Planification et compte rendu des interventions','Dispatch board','02'],
['devis-atelier','Devis Atelier','Bâtiment & interventions','Configuration et validation des devis','Estimate builder','03'],
['commercepilot','CommercePilot','Commerce & opérations','Achats, commandes, inventaire et stock','Inventory workspace','01'],
['b2b-orderhub','B2B OrderHub','Commerce & opérations','Commandes professionnelles et tarifs clients','Wholesale storefront','02'],
['factureconnect','FactureConnect','Commerce & opérations','Flux de facturation et intégrations de services conformes','Invoice workflow','03'],
['campusflow','CampusFlow','Éducation','Inscriptions, présence et attestations','Course administration','01'],
['eduprogress','EduProgress','Éducation','Progression, devoirs et communication','Learning workspace','02'],
['clinicdesk','ClinicDesk','Santé administrative','Accueil, agenda et coordination administrative','Appointment planner','01'],
['carefollow','CareFollow','Santé administrative','Rappels et actions administratives non cliniques','Follow-up queue','02'],
['fleetcontrol','FleetControl','Transport & logistique','Gestion du parc, livraisons et maintenance','Fleet operations','01'],
['routeboard','RouteBoard','Transport & logistique','Dispatch, itinéraires et preuve de livraison','Route planner','02'],
['immopilot','ImmoPilot','Immobilier & patrimoine','Prospects, visites et progression des transactions','Property CRM','01'],
['propertycare','PropertyCare','Immobilier & patrimoine','Demandes de maintenance et coordination prestataires','Maintenance portal','02'],
['stayflow','StayFlow','Tourisme & hôtellerie','Réservations, occupation et opérations de séjour','Booking calendar','01'],
['experiencedesk','ExperienceDesk','Tourisme & hôtellerie','Réservation des activités et gestion des capacités','Experience scheduler','02'],
['talentpipeline','TalentPipeline','Ressources humaines','Candidatures, entretiens et décisions','Hiring pipeline','01'],
['teamops','TeamOps','Ressources humaines','Intégration, congés et demandes internes','People workspace','02'],
['productionlens','ProductionLens','Industrie, IA & pilotage','Lots, contrôles qualité et maintenance','Production monitor','01'],
['docupilot-ai','DocuPilot AI','Industrie, IA & pilotage','Lecture, contrôle humain et export des documents','Document review','02'],
['insightboard','InsightBoard','Industrie, IA & pilotage','Indicateurs, exceptions et reporting','Decision workspace','03']
];
const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ui = (title,mode) => `<div class="product-preview"><div class="preview-rail"><span class="preview-mark"></span><i></i><i></i><i></i><i></i></div><div class="preview-area"><div class="preview-bar"><b>${escape(title)}</b><span>•••</span></div><div class="preview-kicker">${escape(mode)}</div><div class="preview-stats"><span>Vue d’ensemble</span><span>Activité</span><span>Suivi</span></div><div class="preview-rows"><i></i><i></i><i></i></div><div class="preview-foot"><span></span><span></span><span></span></div></div></div>`;
export function buildShowcase(write) {
 const cards = concepts.map(([id,name,sector,description,mode])=>`<a class="concept-card reveal" href="../studio/${id}/">${ui(name,mode)}<span class="eyebrow">${escape(sector)}</span><h3>${escape(name)}</h3><p>${escape(description)}</p><span class="concept-more">Explorer le concept ↗</span></a>`).join('');
 write('studio/',{title:'24 concepts de logiciels métier | Studio',description:'Explorez vingt-quatre concepts logiciels couvrant dix secteurs. Démonstrations et interfaces illustratives, sans données clients.',body:`<section class="studio-intro"><span class="eyebrow">Studio de produits · 24 concepts · 10 secteurs</span><h1>Des interfaces pensées pour <em>le travail réel.</em></h1><p>Du chantier au cabinet de conseil, chaque métier mérite un logiciel adapté à ses usages. Ce catalogue présente des concepts illustratifs, et non des réalisations clients.</p><a class="button button-outline" href="../demonstrations/">Essayer les scénarios interactifs ↗</a></section><section class="section"><div class="studio-toolbar"><label for="studio-search">Trouver une solution</label><input id="studio-search" type="search" placeholder="Rechercher un secteur, un logiciel…" autocomplete="off"><span id="studio-count">24 concepts</span></div><div class="concept-grid">${cards}</div><p class="studio-disclaimer">Concepts exploratoires — données et interfaces illustratives. Les applications présentées ne sont pas toutes des produits disponibles.</p></section>`});
 for(const [id,name,sector,description,mode] of concepts){
  write('studio/'+id+'/',{title:name+' — concept logiciel métier',description:description+'. Concept illustratif Deux Rives Web.',body:`<section class="studio-detail"><a class="studio-back" href="../../studio/">← Tous les concepts</a><span class="eyebrow">${escape(sector)} · Concept illustratif</span><h1>${escape(name)}</h1><p>${escape(description)}. Nous imaginons ici un parcours clair, adapté aux équipes et à leurs décisions quotidiennes.</p><div class="studio-detail-preview">${ui(name,mode)}</div><div class="studio-detail-columns"><div><h2>Le défi métier</h2><p>Éviter les informations dispersées, les transmissions manuelles et les étapes sans responsable identifié.</p></div><div><h2>L’expérience proposée</h2><p>Une interface contextualisée, un suivi des statuts et une prochaine action explicite pour chaque dossier.</p></div><div><h2>État du concept</h2><p>Prototype visuel exploratoire, avec données fictives. Ce visuel ne représente pas une application client livrée.</p></div></div><a class="button button-accent" href="../../contact/">Discuter d’une solution similaire ↗</a></section>`});
 }
}
