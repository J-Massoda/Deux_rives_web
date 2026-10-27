import fs from 'node:fs';
const images=JSON.parse(fs.readFileSync(new URL('../assets/image-manifest.json',import.meta.url),'utf8'));
const byId=Object.fromEntries(images.map(x=>[x.id,x]));
const names=images.map(x=>x.id);
export const photoIds=names;
const at=n=>["equipe-collaboration-bord-de-seine", "clientflow-pro-tableau-commercial", "chantierpilot-tableau-chantier", "commercepilot-catalogue-stocks", "docupilot-ai-validation-documents", "clientflow-pro-apercu-presentation", "chantierpilot-apercu-terrain", "docupilot-ai-apercu-presentation", "automatisation-traitement-documentaire", "paysage-deux-rives-coucher-soleil", "equipe-conception-logiciel-paris", "atelier-decouverte-besoins", "reunion-cadrage-projet-metier", "equipe-suivi-chantier-tablette", "commerce-conseil-gestion-boutique", "conseil-analyse-dossiers-clients", "coordination-equipe-logistique", "accueil-voyageurs-hotellerie", "atelier-formation-professionnelle", "controle-production-industrielle", "developpeurs-conception-application", "conseil-dirigeant-outils-metier", "atelier-processus-entreprise", "equipe-coordination-projet", "atelier-strategie-produit", "conception-parcours-tableau-blanc", "revue-besoins-logiciel-metier", "coordination-chantier-plans", "reunion-integration-outils", "commerce-gestion-commandes", "conseil-support-utilisateurs", "collaboration-ingenierie-logicielle", "commercante-gestion-boutique", "revue-documents-entreprise", "rencontre-professionnelle-bord-de-seine", "commerce-equipe-catalogue", "architecture-api-tableau-blanc", "presentation-prototype-produit", "revue-code-integration", "maintenance-application-equipe", "clinique-coordination-planning", "conseil-strategie-client", "collaboration-equipe-bureau", "logistique-preparation-expedition", "industrie-ingenieurs-production", "technicien-intervention-electrique", "industrie-controle-qualite", "logistique-planification-tournees", "immobilier-visite-appartement", "rh-entretien-recrutement", "rh-entretien-recrutement", "education-formation-adultes", "immobilier-inspection-batiment", "commerce-gestion-point-de-vente", "commerce-inventaire-entrepot", "hotellerie-coordination-equipe", "hotellerie-coordination-equipe", "hotellerie-accueil-reservation", "hotellerie-accueil-reservation", "sante-accueil-clinique", "rh-integration-collaborateurs", "rh-integration-collaborateurs", "education-accueil-inscriptions"][n];
const sectors={
 'services-professionnels':[41,42], 'batiment-interventions':[27,45], 'commerce-operations':[53,54],
 'education':[51,62], 'sante-administrative':[59,40], 'transport-logistique':[43,47],
 'immobilier-patrimoine':[48,52], 'tourisme-hotellerie':[57,55], 'ressources-humaines':[49,60], 'industrie-ia-pilotage':[44,46]
};
const expertise={'logiciels-sur-mesure':[20,21],'automatisation-des-processus':[22,23],'sites-et-commerce':[32,35],'integrations-api':[36,38],'maintenance-evolution':[39,30],'intelligence-artificielle':[33,26]};
const apps={'clientflow-pro':41,'cabinet-os':15,'missiondesk':42,'chantierpilot':13,'intervention-360':45,'devis-atelier':27,'commercepilot':14,'b2b-orderhub':54,'factureconnect':33,'campusflow':62,'eduprogress':51,'clinicdesk':59,'carefollow':40,'fleetcontrol':43,'routeboard':47,'immopilot':48,'propertycare':52,'stayflow':57,'experiencedesk':55,'talentpipeline':49,'teamops':60,'productionlens':46,'docupilot-ai':38,'insightboard':19};
function photo(n,base,eager=false){const x=byId[at(n)];return `<img class="editorial-photo" src="${base}assets/${x.id}.webp" srcset="${base}assets/${x.id}-640.webp 640w, ${base}assets/${x.id}.webp ${x.width}w" sizes="(max-width: 700px) 100vw, 50vw" width="${x.width}" height="${x.height}" alt="${x.alt}" loading="${eager?'eager':'lazy'}" decoding="async" ${eager?'fetchpriority="high"':''}>`;}
function story(ns,base,en=false){return `<section class="photo-story" aria-label="${en?'Illustrative business photography':'Illustrations des usages métier'}">${ns.map(n=>`<figure>${photo(n,base)}<figcaption>${en?'AI-generated illustration of a business context.':'Illustration générée par IA d’un contexte métier.'}</figcaption></figure>`).join('')}</section>`;}
export function applyPhotography(route,page){
 const parts=route.split('/').filter(Boolean),base='../'.repeat(parts.length),id=parts.at(-1);let body=page.body, chosen;
 if(!route){
  body=body.replace(/<img[^>]+src="assets\/equipe-collaboration-bord-de-seine.png"[^>]*>/,photo(10,'',true));
  body=body.replace(/(<div class="pv-case-visual">)<img[^>]*>/,(_,open)=>open+photo(13,''));
  body=body.replace(/(<div class="pv-case-row pv-case-row--reverse"><div class="pv-case-visual">)<img[^>]*>/,(_,open)=>open+photo(14,''));
  body=body.replace('<div class="dr-value-grid">',story([11],'')+'<div class="dr-value-grid">');
  body=body.replace('<div class="dr-service-grid">',story([12],'')+'<div class="dr-service-grid">');
  body=body.replace('<section class="dr-section dr-approach">',story([25],'')+'<section class="dr-section dr-approach">');
  body=body.replace('assets/paysage-deux-rives-coucher-soleil.png','assets/rencontre-professionnelle-bord-de-seine.png');
  chosen=10;
 }else{
  let pair=parts[0]==='secteurs'?sectors[id]:parts[0]==='expertises'?expertise[id]:null;
  if(pair){chosen=pair[0];body=body.replace(/(<div class="subhero-art[^>]*>)<img[^>]*>/,(_,open)=>open+photo(pair[0],base,true));body=body.replace(/(<div class="feature-art">)<img[^>]*>/,(_,open)=>open+photo(pair[1],base));if(id==='commerce-operations')body=body.replace('</section>','</section>'+story([29],base));if(!body.includes(at(pair[1])+'.webp'))body=body.replace('</section>','</section>'+story([pair[1]],base));}
  else {
   const corporate={'agence/':[24,0],'methode/':[31,37],'contact/':[21,9],'strategie-produits/':[28],'expertises/':[23],'secteurs/':[16,17,18],'demonstrations/':[30],'studio/':[20],'realisations/':[19],'regards/':[15],'en/':[10],'en/software-engineering/':[36]};
   let ns=corporate[route];
   if((parts[0]==='applications'||parts[0]==='studio')&&apps[id]!==undefined)ns=[apps[id]];
   if(parts[0]==='regards'&&parts.length>1)ns=[/tableur/.test(id)?15:/automat/.test(id)?22:/api/.test(id)?36:/factur/.test(id)?33:/saas/.test(id)?37:/mvp/.test(id)?26:/architecture/.test(id)?38:28];
   if(ns){chosen=ns[0];body=body.replace('</section>','</section>'+story(ns,base,parts[0]==='en'));}
  }
 }
 // Upgrade all renamed images with responsive sources, dimensions and meaningful descriptions.
 body=body.replace(/<img\b[^>]*>/g,tag=>{const match=tag.match(/src="([^"]*assets\/([^/]+)\.png)"/);if(!match||!byId[match[2]])return tag;const x=byId[match[2]],prefix=match[1].slice(0,-4);let result=tag.replace(match[1],prefix+'.webp');if(!/width=/.test(result))result=result.replace('<img',`<img width="${x.width}" height="${x.height}" decoding="async"`);if(!/srcset=/.test(result))result=result.replace('<img',`<img srcset="${prefix}-640.webp 640w, ${prefix}.webp ${x.width}w" sizes="(max-width: 700px) 100vw, 50vw"`);return result;});
 return {...page,body,...(chosen!==undefined?{image:'assets/'+at(chosen)+'.webp'}:{})};
}
