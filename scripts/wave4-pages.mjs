import {wave4Catalog} from './wave4-catalog.mjs';
import {renderIndustryPreview} from './product-ui.mjs';
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sectorSlugs={
'Services professionnels':'services-professionnels',
'Commerce & opérations':'commerce-operations',
'Éducation':'education','Santé administrative':'sante-administrative',
'Transport & logistique':'transport-logistique','Immobilier & patrimoine':'immobilier-patrimoine',
'Tourisme & hôtellerie':'tourisme-hotellerie','Ressources humaines':'ressources-humaines',
'Industrie, IA & pilotage':'industrie-ia-pilotage'
};
const systemVocabulary={
workflow:['Historique des décisions','Rôles & attribution','État de chaque dossier'],
learning:['Remise','Relecture humaine','Validation de l’activité'],
capacity:['Capacité réelle','Inscription confirmée','Annulation contrôlée'],
inventory:['Disponibilité','Quantités engagées','Mouvement de stock'],
calendar:['Créneaux réservés','Annulation','Disponibilité actualisée'],
fleet:['Véhicule disponible','Maintenance planifiée','Remise en circulation'],
quality:['État qualité','Blocage de libération','Contrôle avant clôture'],
analytics:['Source et définition','Écart à une cible','Prise en charge de l’alerte']
};
export function buildWave4(write){
 for(const item of wave4Catalog){
  const features=item.features.map(([title,desc],i)=>'<article class="w4-editor-card"><small>CAPACITÉ 0'+(i+1)+'</small><h3>'+safe(title)+'</h3><p>'+safe(desc)+'</p></article>').join('');
  const flow=item.flow.map((text,i)=>'<li><b>'+String(i+1).padStart(2,'0')+'</b><div><strong>'+safe(text)+'</strong><p>Observez l’état du dossier après l’action. Le scénario conserve un historique et peut être réinitialisé à tout moment.</p></div></li>').join('');
  const faqs=item.faq.map(([q,a])=>'<details><summary>'+safe(q)+'</summary><p>'+safe(a)+'</p></details>').join('');
  const constraints=systemVocabulary[item.kind]||systemVocabulary.workflow;
  const related=wave4Catalog.filter(p=>p.sector===item.sector&&p.id!==item.id).slice(0,3);
  const body='<main class="w4-product-page" data-w4-product="'+item.id+'">'+
  '<section class="w4-editor-hero"><div class="w4-editor-hero-copy"><a href="../../demonstrations/" class="w4-back">← Retour aux démonstrations</a><span class="eyebrow">'+safe(item.sector)+' · APPLICATION EXPLORATOIRE</span><h1>'+safe(item.heading)+'</h1><p>'+safe(item.lead)+'</p><div class="w4-hero-links"><a href="#essai" class="w4-hero-primary">Tester le scénario ↓</a><a href="../../contact/?solution='+encodeURIComponent(item.name)+'" class="w4-hero-secondary">Parler d’un projet similaire ↗</a></div></div><div class="w4-editor-hero-visual">'+renderIndustryPreview(item.name,item.visual)+'<small>Interface illustrative — données synthétiques, pas une réalisation client</small></div></section>'+
  '<section class="w4-editor-trust"><div><strong>Une interaction observable</strong><p>Les commandes changent réellement les données du navigateur.</p></div><div><strong>Aucune infrastructure distante</strong><p>Les opérations de test restent locales et réinitialisables.</p></div><div><strong>Une démarche transparente</strong><p>Ni témoignage client inventé, ni logiciel de production annoncé.</p></div></section>'+
  '<section class="w4-story w4-story-dark"><div class="w4-story-top"><span>01 / COMPRENDRE LE MÉTIER</span><h2>Avant de développer un système, il faut comprendre ce qui peut mal se passer.</h2></div><div class="w4-story-cols"><div><h3>Le contexte opérationnel</h3><p>'+safe(item.challenge)+'</p><p>Une information n’a de valeur que si son origine, son état et la personne habilitée à agir sont connus. La conception doit expliquer les transitions plutôt que masquer les étapes derrière une apparence de tableau de bord.</p></div><div><h3>Une hypothèse de solution vérifiable</h3><p>'+safe(item.approach)+'</p><p>La démonstration met l’accent sur des comportements observables : changement d’état, calcul, validation ou refus d’une action incohérente. Les données illustratives servent à discuter du bon produit, pas à simuler des résultats commerciaux.</p></div></div></section>'+
  '<section id="essai" class="w4-demo-section"><div class="w4-demo-intro"><span class="eyebrow">02 / SCÉNARIO INTERACTIF</span><h2>Essayez '+safe(item.name)+'.</h2><p>'+safe(item.outcome)+' Les données sont fictives et stockées temporairement dans ce navigateur. Utilisez le bouton de réinitialisation pour retrouver les valeurs d’origine.</p></div><div class="w4-demo-mount" data-wave4-app="'+item.id+'"><p>Ouverture de la démonstration…</p></div></section>'+
  '<section class="w4-story w4-story-light"><div class="w4-story-top"><span>03 / CAPACITÉS MÉTIER</span><h2>Un ensemble cohérent de fonctions, pas une collection d’écrans décoratifs.</h2></div><div class="w4-editor-feature-grid">'+features+'</div></section>'+
  '<section class="w4-story w4-story-sage"><div class="w4-story-top"><span>04 / PARCOURS À TESTER</span><h2>Un test concret qui révèle les règles métier.</h2></div><ol class="w4-flow">'+flow+'</ol></section>'+
  '<section class="w4-story w4-story-cream"><div class="w4-story-top"><span>05 / ARCHITECTURE ET QUALITÉ</span><h2>Un prototype dans le navigateur n’est pas encore un logiciel prêt à exploiter.</h2></div><div class="w4-story-cols"><div><h3>Modèle de données et permissions</h3><p>Une implémentation de production devrait documenter les données autorisées, les droits de consultation, les validations côté serveur, les sauvegardes et l’historique des opérations. Les données enregistrées localement ici ne permettent pas la collaboration entre utilisateurs.</p><p>Le périmètre doit être défini avec les équipes réellement concernées : '+safe(item.audience.toLowerCase())+'.</p></div><div><h3>Intégrations et reprise des erreurs</h3><p>Relier un portail à un ERP, un CRM ou un service spécialisé exige des interfaces autorisées, une source de vérité, des contrôles des doublons et un mécanisme de reprise lorsque le service distant échoue.</p><p>Selon le métier, il faut également considérer l’accessibilité, la conservation des données, la sécurité, les obligations sectorielles et la continuité d’exploitation.</p></div></div><div class="w4-constraints">'+constraints.map(x=>'<span>'+safe(x)+'</span>').join('')+'</div></section>'+
  '<section class="w4-story w4-story-light"><div class="w4-story-top"><span>06 / QUESTIONS FRÉQUENTES</span><h2>Ce que la démonstration montre — et ce qu’elle ne promet pas.</h2></div><div class="studio-faq-grid">'+faqs+'<details><summary>Peut-on reprendre le développement de ce concept pour notre organisation ?</summary><p>Oui, un projet sur mesure peut reprendre la logique illustrée, après une étude des utilisateurs, de la donnée, des risques et de l’environnement technique. Il ne s’agit pas d’une vente d’un produit SaaS déjà déployé.</p></details></div></section>'+
  '<section class="w4-contact-strip"><span class="eyebrow">UNE PREMIÈRE VERSION UTILE</span><h2>Votre métier doit définir l’outil, pas l’inverse.</h2><p>Partagez votre processus, ses utilisateurs et les outils en place pour établir un premier scénario réaliste et vérifiable.</p><div><a href="../../contact/?solution='+encodeURIComponent(item.name)+'">Décrire mon besoin ↗</a><a href="../../studio/'+item.id+'/">Consulter la fiche concept ↗</a><a href="../../secteurs/'+sectorSlugs[item.sector]+'/">Explorer ce secteur ↗</a></div></section>'+
  (related.length?'<section class="w4-related"><span class="eyebrow">AUTRES CONCEPTS DU SECTEUR</span><h2>Des interfaces différentes pour d’autres décisions.</h2><div>'+related.map(p=>'<a href="../../applications/'+p.id+'/"><strong>'+safe(p.name)+'</strong><span>'+safe(p.lead)+' ↗</span></a>').join('')+'</div></section>':'')+
  '</main>';
  write('applications/'+item.id+'/',{title:item.name+' — démonstration métier '+item.sector,description:(item.lead+' '+item.challenge).slice(0,155),body});
 }
}
