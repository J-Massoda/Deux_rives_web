import {arrowUpRight as arrow} from './icons.mjs';

const productImages = {
  1: 'clientflow-pro-tableau-commercial.png',
  2: 'chantierpilot-tableau-chantier.png',
  3: 'commercepilot-catalogue-stocks.png',
  4: 'docupilot-ai-validation-documents.png'
};
const pic = (i, alt) => `<img src="assets/${productImages[i]}" alt="${alt}" loading="lazy">`;
// Illustrative loops (assets/video) for the demos that have one.
const productVideos = {
  'clientflow-pro': '07-clientflow', chantierpilot: '08-chantierpilot', commercepilot: '09-commercepilot',
  'docupilot-ai': '10-docupilot', 'intervention-360': '11-intervention360', missiondesk: '12-missiondesk'
};
const loop = (name, cls, alt = '') => `<video class="${cls}" muted loop playsinline preload="none" poster="assets/video/${name}.webp" data-autoplay${alt ? ` aria-label="${alt}"` : ' aria-hidden="true"'}><source src="assets/video/${name}.mp4" type="video/mp4"></video>`;

// Small glossy glyphs used for the three hero entry points (decorative).
const glyphs = {
  build: `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="gb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8CF0C4"/><stop offset="1" stop-color="#12B76A"/></linearGradient></defs><rect x="8" y="12" width="48" height="38" rx="9" fill="url(#gb)"/><rect x="8" y="12" width="48" height="10" rx="5" fill="#0B1410" opacity=".14"/><rect x="15" y="29" width="16" height="14" rx="4" fill="#fff" opacity=".9"/><rect x="35" y="29" width="14" height="5" rx="2.5" fill="#fff" opacity=".75"/><rect x="35" y="38" width="10" height="5" rx="2.5" fill="#fff" opacity=".55"/></svg>`,
  flow: `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="gf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB38F"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><path d="M36 6 14 36h16l-4 22 24-32H34z" fill="url(#gf)"/><path d="M36 6 14 36h16" fill="none" stroke="#fff" stroke-width="2" opacity=".55" stroke-linejoin="round"/></svg>`,
  web: `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="gw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9FE8FF"/><stop offset="1" stop-color="#12B76A"/></linearGradient></defs><circle cx="32" cy="32" r="24" fill="url(#gw)"/><g fill="none" stroke="#fff" stroke-width="2.4" opacity=".85"><ellipse cx="32" cy="32" rx="10" ry="24"/><path d="M8 32h48M12 20h40M12 44h40"/></g></svg>`
};

// The Deux Rives Web mark drawn as a glossy object for the expertise section.
const glassMark = `<svg class="h-glass" viewBox="0 0 240 240" aria-hidden="true"><defs>
  <linearGradient id="gm1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1C2A24"/><stop offset="1" stop-color="#060B09"/></linearGradient>
  <linearGradient id="gm2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#D8F5E7"/></linearGradient>
  <linearGradient id="gm3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF9A6B"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient>
  <linearGradient id="gm4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <filter id="gms" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="22" stdDeviation="18" flood-color="#0B1410" flood-opacity=".28"/></filter></defs>
  <g filter="url(#gms)"><rect x="24" y="24" width="192" height="192" rx="40" fill="url(#gm1)"/>
  <g transform="translate(24 24) scale(2)"><path d="M20 23h20v18l-10 7 10 7v18H20V57l14-9-14-9z" fill="url(#gm2)"/><path d="M76 23H56v18l10 7-10 7v18h20V57l-14-9 14-9z" fill="url(#gm3)"/><rect x="42" y="43" width="12" height="10" rx="2" fill="#B7EBD3"/></g>
  <rect x="24" y="24" width="192" height="192" rx="40" fill="url(#gm4)"/></g></svg>`;

const seal = `<svg class="h-seal" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="sealpath" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0"/></defs>
  <text font-size="10.5" letter-spacing="3.1" fill="currentColor" font-family="Inter, sans-serif" font-weight="600"><textPath href="#sealpath">STUDIO LOGICIEL · PARIS · DEUX RIVES WEB ·</textPath></text>
  <g transform="translate(36 36) scale(.5)"><rect width="96" height="96" rx="17" fill="#18211f"/><path d="M20 23h20v18l-10 7 10 7v18H20V57l14-9-14-9z" fill="#f6f3eb"/><path d="M76 23H56v18l10 7-10 7v18h20V57l-14-9 14-9z" fill="#FF5A1F"/><rect x="42" y="43" width="12" height="10" rx="2" fill="#b7d5c7"/></g></svg>`;

const valueIcons = [
  '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 26V12l10-6 10 6v14H6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13 26v-7h6v7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="8" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="24" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 14l8-4M12 18l8 4" stroke="currentColor" stroke-width="1.6"/></svg>',
  '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 24l7-7 5 5 8-12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 10h5v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
];

// Cut the portfolio's homepage markup into its sections so they can be placed in the new order.
function splitPortfolio(html) {
  const markers = {
    cases: '<section class="section studio-case"',
    logos: '<section class="platform-logos"',
    lumen: '<section class="section studio-demo"',
    quotes: '<section class="section portfolio-section" aria-label="Témoignages"',
    extensions: '<section class="section portfolio-section" aria-label="Extensions'
  };
  const positions = Object.entries(markers).map(([key, marker]) => [key, html.indexOf(marker)]).sort((a, b) => a[1] - b[1]);
  const parts = {};
  positions.forEach(([key, start], i) => {
    if (start < 0) throw new Error('Homepage section missing: ' + key);
    parts[key] = html.slice(start, i + 1 < positions.length ? positions[i + 1][1] : html.length);
  });
  return parts;
}

export function buildCorporate(write,{sectors,services,insights,portfolio}){
 const featured=[
  ['ClientFlow Pro','CRM et gestion commerciale pensé pour les entreprises de services.','Ventes · CRM · Automatisations','clientflow-pro',1],
  ['ChantierPilot','Suivi de chantiers et pilotage terrain pour les équipes du BTP.','Planning · Équipes · Rentabilité','chantierpilot',2],
  ['CommercePilot','Gestion des achats, du catalogue et des stocks.','Catalogue · Commandes · Intégrations','commercepilot',3],
  ['DocuPilot AI','Traitement intelligent de documents avec vérification humaine.','Documents · IA · Workflows','docupilot-ai',4],
  ['Intervention 360','Coordination des interventions terrain et des comptes rendus.','Terrain · Planning · Rapports','intervention-360',2],
  ['FactureConnect','Flux de facturation, validation et intégration des données.','Facturation · API · Contrôles','factureconnect',4],
  ['Devis Atelier','Création des devis, validation et suivi des estimations.','Devis · Budgets · Validation','devis-atelier',2],
  ['MissionDesk','Gestion des missions, équipes et livrables des prestataires.','Missions · Temps · Livrables','missiondesk',1]
 ];
 const parts = splitPortfolio(portfolio);
 const byId = Object.fromEntries(services.map(s => [s.id, s]));
 const serviceRow = s => `<a class="h-service reveal" href="expertises/${s.id}/"><span class="h-service-name">${s.title}</span><span class="h-service-summary">${s.summary}</span><span class="h-service-arrow" aria-hidden="true">${arrow}</span></a>`;
 const columns = [
   ['Concevoir', 'build', ['logiciels-sur-mesure', 'intelligence-artificielle', 'sites-et-commerce']],
   ['Connecter', 'flow', ['automatisation-des-processus', 'integrations-api', 'maintenance-evolution']]
 ].map(([title, glyph, ids]) => `<div class="h-products-col"><div class="h-products-head"><h3>${title}</h3><span class="h-products-icon">${glyphs[glyph]}</span></div>${ids.map(id => serviceRow(byId[id])).join('')}</div>`).join('');
 const sectorLinks=sectors.map((s,i)=>'<a class="dr-sector reveal" href="secteurs/'+s.id+'/"><span class="dr-sector-glyph" aria-hidden="true">'+['⌂','◇','▤','✦','◈','▣','⊞','♧','◉','✳'][i]+'</span><div><h3>'+s.title+'</h3><p>'+s.summary+'</p></div><span aria-hidden="true">'+arrow+'</span></a>').join('');
 const teams = [
   ['logiciels-sur-mesure', 'Logiciels sur mesure', 'Portails clients, applications métier', 'build'],
   ['automatisation-des-processus', 'Automatisation & IA', 'Workflows, documents, assistants', 'flow'],
   ['sites-et-commerce', 'Sites & commerce', 'Sites rapides, boutiques, intégrations', 'web']
 ].map(([id, title, sub, glyph]) => `<a class="h-team" href="expertises/${id}/"><span class="h-team-icon">${glyphs[glyph]}</span><span class="h-team-copy"><strong>${title}</strong><span>${sub}</span></span><span class="h-team-arrow" aria-hidden="true">${arrow}</span></a>`).join('');
 const stats = [
   ['24', 'démonstrations interactives à essayer'],
   ['30', 'projets, prototypes et extensions présentés'],
   ['10', 'secteurs d’activité explorés'],
   ['6', 'expertises, du logiciel métier à l’IA']
 ].map(([n, label]) => `<div class="h-stat reveal"><span class="h-stat-label">${label}</span><span class="h-stat-number">${n}</span></div>`).join('');
 const reel = ['01-suivi', '02-freshbox', '07-clientflow', '03-mobikumbu', '08-chantierpilot', '04-bpetale', '10-docupilot', '05-loumia', '09-commercepilot', '06-automatisation'];
 const arc = ['07-clientflow', '02-freshbox', '03-mobikumbu', '10-docupilot', '04-bpetale', '08-chantierpilot', '05-loumia'];

 write('',{title:'Développement logiciel sur mesure à Paris',description:'Deux Rives Web développe à Paris des logiciels sur mesure, des applications métier et des automatisations pour simplifier le travail de vos équipes.',body:
 '<section class="dr-home">'+
 // 1 — Hero: one statement, three ways in.
 `<div class="dr-hero studio-hero h-hero">
  <div class="dr-hero-left h-hero-copy">
    <p class="studio-label">Studio logiciel · Paris</p>
    <h1>Des logiciels pour les <em>opérations du quotidien.</em></h1>
    <div class="dr-buttons"><a class="dr-btn dr-btn-dark" href="contact/">Parler de votre projet ${arrow}</a><a class="dr-btn dr-btn-line" href="#projet-en-vedette">Découvrir une réalisation ${arrow}</a></div>
  </div>
  <nav class="h-teams" aria-label="Nos trois façons d’intervenir">${teams}</nav>
 </div>`+
 // 2 — Showreel: the illustrative loops, one after another.
 `<section class="h-showreel" aria-label="Aperçu animé de nos projets"><div class="h-showreel-frame">
   <video class="h-showreel-video" muted playsinline autoplay preload="metadata" poster="assets/video/01-suivi.webp" data-reel="${reel.join(',')}" aria-label="Animations illustrant des projets et démonstrations Deux Rives Web"><source src="assets/video/01-suivi.mp4" type="video/mp4"></video>
   <button class="h-showreel-toggle" type="button" aria-label="Mettre l’animation en pause" data-reel-toggle><span aria-hidden="true"></span></button>
   <span class="h-showreel-caption" data-reel-caption>Suivi des demandes</span>
 </div></section>`+
 // 3 — Tools and platforms marquee.
 `<div class="h-trusted"><p class="h-trusted-title">Les outils et plateformes que nous assemblons</p>${parts.logos}</div>`+
 // 4 — Statement, figures and the interactive request.
 `<section class="h-values">
   <div class="h-values-top">
     <div class="h-badge">${seal}<span>Conçu à Paris,<br>pensé pour le terrain</span></div>
     <p class="h-statement">Nous concevons des <span class="h-chip"><i class="h-dot h-dot--green"></i>portails clients</span>, des <span class="h-chip"><i class="h-dot h-dot--orange"></i>applications métier</span> et des <span class="h-chip"><i class="h-dot"></i>automatisations</span> pour suivre vos demandes, relier vos outils et simplifier le travail de vos équipes.</p>
   </div>
   <div class="h-stats">${stats}</div>
   <div class="h-try">
     <div class="h-try-copy"><span class="eyebrow">Exemple interactif</span><h2>Faites avancer une demande, <em>comme dans vos futurs outils.</em></h2><p>Attribuez la demande, suivez son statut et voyez l’étape suivante s’afficher. Les données sont fictives et restent dans votre navigateur.</p></div>
     <div class="studio-workflow" data-home-workflow>
      <div class="studio-workflow-header"><strong>Suivi des demandes</strong><span>Exemple interactif</span></div>
      <div class="studio-workflow-record">
        <p class="studio-label">Demande fictive · 024</p>
        <h2>Mettre à jour un devis</h2>
        <dl>
          <div><dt>Responsable</dt><dd data-workflow-owner>À attribuer</dd></div>
          <div><dt>Statut</dt><dd data-workflow-status>Reçue</dd></div>
        </dl>
        <ol class="studio-workflow-steps" aria-label="Étapes de la demande">
          <li aria-current="step">Reçue</li><li>Attribuée</li><li>En cours</li>
        </ol>
        <p class="studio-workflow-next" aria-live="polite" aria-atomic="true" data-workflow-next>À faire · Choisir qui prend en charge la demande.</p>
        <div class="studio-workflow-actions" hidden>
          <button class="studio-workflow-action" type="button" data-workflow-advance>Attribuer à Camille</button>
          <button class="studio-workflow-reset" type="button" data-workflow-reset hidden>Réinitialiser</button>
        </div>
      </div>
     </div>
   </div>
 </section>`+
 // 5 — Expertise, presented as two lists.
 `<section class="dr-section dr-expertise h-products"><div class="h-products-visual">${glassMark}</div><div class="dr-section-title h-center"><div><span class="dr-kicker">NOS EXPERTISES</span><h2>Du logiciel métier à l’automatisation, une ingénierie pensée pour durer.</h2></div><a href="expertises/">Toutes nos expertises ${arrow}</a></div><div class="h-products-grid">${columns}</div></section>`+
 // 6 — Featured client work, stacked full-screen slides.
 parts.cases +
 // 7 — Demonstration website.
 parts.lumen +
 // 8 — Eight interactive demos.
 '<section class="dr-section dr-applications"><div class="dr-section-title"><div><span class="dr-kicker">NOS APPLICATIONS PHARES</span><h2>Des scénarios que vous pouvez réellement explorer.</h2></div><a href="studio/">Voir toutes les démonstrations '+arrow+'</a></div><div class="dr-carousel-toolbar"><button type="button" class="dr-carousel-prev" aria-label="Produits précédents">←</button><span>01 — 08</span><button type="button" class="dr-carousel-next" aria-label="Produits suivants">→</button></div><div class="dr-feature-grid" id="priority-products" tabindex="0" aria-label="Huit concepts logiciels prioritaires">'+featured.map(([name,detail,tags,id,img])=>'<a class="dr-feature reveal" href="'+(['clientflow-pro','chantierpilot','commercepilot','docupilot-ai','intervention-360','factureconnect','devis-atelier','missiondesk','cabinet-os'].includes(id)?'applications/':'studio/')+id+'/"><div class="dr-feature-img">'+(productVideos[id]?loop(productVideos[id],'dr-feature-video','Animation illustrant '+name):pic(img,'Maquette conceptuelle de '+name))+'</div><div class="dr-feature-head"><h3>'+name+'</h3><span>'+arrow+'</span></div><p>'+detail+'</p><small>'+tags+'</small></a>').join('')+'</div><p class="dr-disclosure">Ces huit parcours font partie de notre catalogue de 24 applications interactives. Vous pouvez les essayer avec des données fictives.</p></section>'+
 // 9 — Why us + method, on the dark band.
 '<section class="dr-section dr-value h-reasons"><div class="dr-section-title h-center"><div><span class="dr-kicker">POURQUOI DEUX RIVES WEB</span><h2>Le logiciel ne doit pas compliquer le travail. Il doit lui donner de l’élan.</h2></div></div><div class="dr-value-grid">'+[
   ['01','Partir du terrain','Avant de concevoir une interface, nous identifions les demandes qui se perdent, les informations qui circulent mal et les validations qui ralentissent votre activité. Chaque fonction répond à un usage concret.'],
   ['02','Relier vos outils','Votre entreprise dispose déjà de données et de logiciels. Nous recherchons les intégrations pertinentes, tout en anticipant les erreurs de synchronisation et les étapes qui exigent une intervention humaine.'],
   ['03','Concevoir pour évoluer','Une première version utile doit pouvoir accueillir de nouveaux rôles, de nouveaux parcours et des règles métier plus complexes, sans imposer une reconstruction systématique.']
 ].map(([n,t,p],i)=>'<article><i class="h-value-icon">'+valueIcons[i]+'</i><span>'+n+'</span><h3>'+t+'</h3><p>'+p+'</p></article>').join('')+'</div></section>'+
 '<section class="dr-section dr-approach h-approach"><div class="dr-approach-intro"><span class="dr-kicker">NOTRE APPROCHE</span><h2>De l’idée au déploiement,<br>un partenariat sur la durée.</h2><p>Une méthode claire pour transformer vos enjeux métier en solutions durables, conçues autour de vos équipes et de leur réalité.</p><a class="dr-btn dr-btn-dark" href="methode/">Découvrir notre approche '+arrow+'</a></div><div class="dr-approach-steps">'+[['01','Découverte et cadrage','Comprendre vos enjeux, les processus et les objectifs.'],['02','Conception et prototypage','Concevoir l’expérience et valider les priorités.'],['03','Développement et intégration','Construire, tester et connecter les systèmes.'],['04','Déploiement et accompagnement','Mettre en production et faire évoluer la solution.']].map(x=>'<div class="dr-step reveal"><span>'+x[0]+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p></div>').join('')+'</div></section>'+
 // 10 — Testimonials card, then the commerce extensions.
 parts.quotes +
 parts.extensions +
 // 11 — Sectors and writing.
 '<section class="dr-section dr-industries"><div class="dr-section-title"><div><span class="dr-kicker">VOTRE SECTEUR, NOS EXPERTISES</span><h2>10 secteurs d’activité, une compréhension métier approfondie.</h2></div><a href="secteurs/">Voir tous les secteurs '+arrow+'</a></div><div class="dr-sector-grid">'+sectorLinks+'</div></section>'+
 '<section class="dr-section dr-insights"><div class="dr-section-title"><div><span class="dr-kicker">REGARDS</span><h2>Nos dernières publications.</h2></div><a href="regards/">Voir tous les articles '+arrow+'</a></div><div class="dr-insight-grid">'+insights.slice(0,2).map(x=>'<a class="dr-insight-text" href="regards/'+x.id+'/"><span>ANALYSE</span><h3>'+x.title+'</h3><strong>Lire l’article '+arrow+'</strong></a>').join('')+'</div></section>'+
 // 12 — Closing call to action under an arc of project visuals.
 '<section class="dr-final studio-final h-final"><div class="h-arc" aria-hidden="true">'+arc.map((name,i)=>'<img src="assets/video/'+name+'.webp" alt="" loading="lazy" decoding="async" style="--i:'+(i-3)+'">').join('')+'</div><div><span class="dr-kicker">DEUX RIVES WEB</span><h2>Quel processus voulez-vous simplifier ?</h2></div><div><p>Décrivez une tâche répétitive ou une information difficile à retrouver. Nous examinerons avec vous les outils et les personnes concernés.</p><a class="dr-btn dr-btn-dark" href="contact/">Parler de votre projet '+arrow+'</a></div></section></section>'});
}
