import {arrowUpRight as arrow} from './icons.mjs';

const productImages = {
  1: 'clientflow-pro-tableau-commercial.png',
  2: 'chantierpilot-tableau-chantier.png',
  3: 'commercepilot-catalogue-stocks.png',
  4: 'docupilot-ai-validation-documents.png'
};
const pic = (i, alt) => `<img src="assets/${productImages[i]}" alt="${alt}" loading="lazy">`;
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
 const serviceLinks=services.map((s,i)=>'<a class="dr-service reveal" href="expertises/'+s.id+'/"><span class="dr-index">0'+(i+1)+'</span><div><h3>'+s.title+'</h3><p>'+s.summary+'</p></div><span aria-hidden="true">'+arrow+'</span></a>').join('');
 const sectorLinks=sectors.map((s,i)=>'<a class="dr-sector reveal" href="secteurs/'+s.id+'/"><span class="dr-sector-glyph" aria-hidden="true">'+['⌂','◇','▤','✦','◈','▣','⊞','♧','◉','✳'][i]+'</span><div><h3>'+s.title+'</h3><p>'+s.summary+'</p></div><span aria-hidden="true">'+arrow+'</span></a>').join('');
 write('',{title:'Développement logiciel sur mesure à Paris',description:'Deux Rives Web développe à Paris des logiciels sur mesure, des applications métier et des automatisations pour simplifier le travail de vos équipes.',body:
 '<section class="dr-home">'+
 `<div class="dr-hero studio-hero">
  <div class="dr-hero-left">
    <p class="studio-label">Studio logiciel · Paris</p>
    <h1>Des logiciels pour les <em>opérations du quotidien.</em></h1>
    <p>Nous concevons des portails clients, des applications métier et des automatisations pour suivre vos demandes, relier vos outils et simplifier le travail de vos équipes.</p>
    <div class="dr-buttons"><a class="dr-btn dr-btn-dark" href="contact/">Parler de votre projet ${arrow}</a><a class="dr-btn dr-btn-line" href="#projet-en-vedette">Découvrir une réalisation ${arrow}</a></div>
  </div>
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
</div>`+
 portfolio+
 '<section class="dr-section dr-applications"><div class="dr-section-title"><div><span class="dr-kicker">NOS APPLICATIONS PHARES</span><h2>Des scénarios que vous pouvez réellement explorer.</h2></div><a href="studio/">Voir toutes les démonstrations '+arrow+'</a></div><div class="dr-carousel-toolbar"><button type="button" class="dr-carousel-prev" aria-label="Produits précédents">←</button><span>01 — 08</span><button type="button" class="dr-carousel-next" aria-label="Produits suivants">→</button></div><div class="dr-feature-grid" id="priority-products" tabindex="0" aria-label="Huit concepts logiciels prioritaires">'+featured.map(([name,detail,tags,id,img])=>'<a class="dr-feature reveal" href="'+(['clientflow-pro','chantierpilot','commercepilot','docupilot-ai','intervention-360','factureconnect','devis-atelier','missiondesk','cabinet-os'].includes(id)?'applications/':'studio/')+id+'/"><div class="dr-feature-img">'+pic(img,'Maquette conceptuelle de '+name)+'</div><div class="dr-feature-head"><h3>'+name+'</h3><span>'+arrow+'</span></div><p>'+detail+'</p><small>'+tags+'</small></a>').join('')+'</div><p class="dr-disclosure">Ces huit parcours font partie de notre catalogue de 24 applications interactives. Vous pouvez les essayer avec des données fictives.</p></section>'+
 '<section class="dr-section dr-value"><div class="dr-section-title"><div><span class="dr-kicker">POURQUOI DEUX RIVES WEB</span><h2>Le logiciel ne doit pas compliquer le travail. Il doit lui donner de l’élan.</h2></div></div><div class="dr-value-grid"><article><span>01</span><h3>Partir du terrain</h3><p>Avant de concevoir une interface, nous identifions les demandes qui se perdent, les informations qui circulent mal et les validations qui ralentissent votre activité. Chaque fonction répond à un usage concret.</p></article><article><span>02</span><h3>Relier vos outils</h3><p>Votre entreprise dispose déjà de données et de logiciels. Nous recherchons les intégrations pertinentes, tout en anticipant les erreurs de synchronisation et les étapes qui exigent une intervention humaine.</p></article><article><span>03</span><h3>Concevoir pour évoluer</h3><p>Une première version utile doit pouvoir accueillir de nouveaux rôles, de nouveaux parcours et des règles métier plus complexes, sans imposer une reconstruction systématique.</p></article></div></section>'+
 '<section class="dr-section dr-industries"><div class="dr-section-title"><div><span class="dr-kicker">VOTRE SECTEUR, NOS EXPERTISES</span><h2>10 secteurs d’activité, une compréhension métier approfondie.</h2></div><a href="secteurs/">Voir tous les secteurs '+arrow+'</a></div><div class="dr-sector-grid">'+sectorLinks+'</div></section>'+
 '<section class="dr-section dr-expertise"><div class="dr-section-title"><div><span class="dr-kicker">NOS EXPERTISES</span><h2>Du logiciel métier à l’automatisation, une ingénierie pensée pour durer.</h2></div><a href="expertises/">Toutes nos expertises '+arrow+'</a></div><div class="dr-service-grid">'+serviceLinks+'</div></section>'+
 '<section class="dr-section dr-approach"><div class="dr-approach-intro"><span class="dr-kicker">NOTRE APPROCHE</span><h2>De l’idée au déploiement,<br>un partenariat sur la durée.</h2><p>Une méthode claire pour transformer vos enjeux métier en solutions durables, conçues autour de vos équipes et de leur réalité.</p><a class="dr-btn dr-btn-dark" href="methode/">Découvrir notre approche '+arrow+'</a></div><div class="dr-approach-steps">'+[['01','Découverte et cadrage','Comprendre vos enjeux, les processus et les objectifs.'],['02','Conception et prototypage','Concevoir l’expérience et valider les priorités.'],['03','Développement et intégration','Construire, tester et connecter les systèmes.'],['04','Déploiement et accompagnement','Mettre en production et faire évoluer la solution.']].map(x=>'<div class="dr-step reveal"><span>'+x[0]+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p></div>').join('')+'</div></section>'+
 '<section class="dr-section dr-insights"><div class="dr-section-title"><div><span class="dr-kicker">REGARDS</span><h2>Nos dernières publications.</h2></div><a href="regards/">Voir tous les articles '+arrow+'</a></div><div class="dr-insight-grid">'+insights.slice(0,2).map(x=>'<a class="dr-insight-text" href="regards/'+x.id+'/"><span>ANALYSE</span><h3>'+x.title+'</h3><strong>Lire l’article '+arrow+'</strong></a>').join('')+'</div></section>'+
 '<section class="dr-final studio-final"><div><span class="dr-kicker">DEUX RIVES WEB</span><h2>Quel processus voulez-vous simplifier ?</h2></div><div><p>Décrivez une tâche répétitive ou une information difficile à retrouver. Nous examinerons avec vous les outils et les personnes concernés.</p><a class="dr-btn dr-btn-dark" href="contact/">Parler de votre projet '+arrow+'</a></div></section></section>'});
}
