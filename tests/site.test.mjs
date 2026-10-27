import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
execFileSync(process.execPath,[path.join(root,'scripts/build.mjs')]);
const dist=path.join(root,'dist');
const pages=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(entry.name==='index.html')pages.push(p);}}
walk(dist);
test('all public page paths and local assets resolve',()=>{
  assert.equal(pages.length,94);
  for(const file of pages){
    const html=fs.readFileSync(file,'utf8');
    assert.match(html,/<html lang="(?:fr|en)">/);
    assert.match(html,/<main id="main">/);
    assert.match(html,/name="robots" content="noindex,nofollow"/);
    for(const [,value] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
      if(value.startsWith('#')||/^(?:https?:|mailto:|data:)/.test(value))continue;
      const pathname=value.split(/[?#]/)[0];
      if(!pathname)continue;
      let target=path.resolve(path.dirname(file),pathname);
      if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
      assert.ok(fs.existsSync(target),`${file}: broken local link ${value}`);
    }
  }
});
test('five working demo surfaces carry fictional-data disclosures and distinct scenarios',()=>{
  const ids=['services-professionnels','batiment-interventions','commerce-operations','education','sante-administrative'];
  for(const id of ids){const html=fs.readFileSync(path.join(dist,'demonstrations',id,'index.html'),'utf8');assert.match(html,new RegExp(`data-demo="${id}"`));assert.match(html,/Données fictives/);assert.match(html,/demo-add/);assert.match(html,/demo-reset/);}
});
test('unverified company details remain unpublished and preview is blocked from indexing',()=>{
  const legal=fs.readFileSync(path.join(dist,'mentions-legales/index.html'),'utf8');
  const contact=fs.readFileSync(path.join(dist,'contact/index.html'),'utf8');
  assert.match(legal,/À compléter avant publication/);
  assert.match(contact,/Préparer votre brief/);
  assert.doesNotMatch(contact,/action="https?:/);
  assert.match(fs.readFileSync(path.join(dist,'robots.txt'),'utf8'),/Disallow: \/$/m);
});

test('studio exposes 24 distinct concept pages and clear prototype disclosures',()=>{
 const studio=fs.readFileSync(path.join(dist,'studio/index.html'),'utf8');
 assert.equal((studio.match(/class="concept-card reveal"/g)||[]).length,24);
 assert.match(studio,/Démonstrations interactives/);
 const entries=fs.readdirSync(path.join(dist,'studio'),{withFileTypes:true}).filter(x=>x.isDirectory());
 assert.equal(entries.length,24);
 for(const entry of entries){
  const html=fs.readFileSync(path.join(dist,'studio',entry.name,'index.html'),'utf8');
  assert.match(html,/Fiche de conception/);
  assert.match(html,/données fictives/);
 }
});

test('Wave 1 content audit: every authored product has a unique story and tailored visual',()=>{
 const projects=fs.readdirSync(path.join(dist,'studio'),{withFileTypes:true}).filter(x=>x.isDirectory());
 assert.equal(projects.length,24);
 const titles=new Set(),types=new Set();
 for(const entry of projects){
  const html=fs.readFileSync(path.join(dist,'studio',entry.name,'index.html'),'utf8');
  const title=html.match(/<h1>([^<]+)<\/h1>/)?.[1];
  assert.ok(title && !titles.has(title),entry.name+' has a unique product heading');
  titles.add(title);
  assert.match(html,/product-experience/);
  assert.match(html,/Scénario représentatif/);
  assert.match(html,/Architecture, qualité et sécurité/);
  assert.match(html,/Fiche de conception/);
  assert.match(html,/Questions fréquentes/);
  const family=html.match(/data-ui="([^"]+)"/)?.[1];
  assert.ok(family,entry.name+' should specify an interface style');
  types.add(family);
  assert.ok(html.split(/<p[\s>]/).length>=9,entry.name+' should have substantive copy');
 }
 assert.ok(types.size>=8,'at least eight visual interface families');
});
test('Wave 1 content audit: every sector and expertise has its own editorial sections',()=>{
 const sectors=['services-professionnels','batiment-interventions','commerce-operations','education','sante-administrative','transport-logistique','immobilier-patrimoine','tourisme-hotellerie','ressources-humaines','industrie-ia-pilotage'];
 const services=['logiciels-sur-mesure','automatisation-des-processus','intelligence-artificielle','sites-et-commerce','integrations-api','maintenance-evolution'];
 for(const id of sectors){
  const html=fs.readFileSync(path.join(dist,'secteurs',id,'index.html'),'utf8');
  assert.match(html,/Expertise terrain/);
  assert.match(html,/Une interface pensée pour la réalité de ce secteur/);
  assert.match(html,/Questions pratiques avant de démarrer/);
 }
 for(const id of services){
  const html=fs.readFileSync(path.join(dist,'expertises',id,'index.html'),'utf8');
  for(const section of ['perimetre','livrables','integrations','calendrier','propriete','support'])assert.ok(html.includes('id="'+section+'"'),id+' must answer '+section);
  assert.equal((html.match(/class="section buying-section"/g)||[]).length,6);
 }
});
test('Wave 1 interaction audit: centered sticky mega menu and seamless carousel',()=>{
 const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
 const css=fs.readFileSync(path.join(dist,'assets/wave1-polish.css'),'utf8');
 const js=fs.readFileSync(path.join(dist,'assets/wave1-polish.js'),'utf8');
 assert.equal((html.match(/class="dr-feature reveal"/g)||[]).length,8);
 assert.match(html,/id="priority-products"/);
 assert.match(html,/mega-preview/);
 assert.match(html,/translate="no"/);
 assert.match(html,/assets\/wave1-polish\.css/);
 assert.match(css,/position:sticky!important/);
 assert.match(css,/left:50%/);
 assert.match(css,/scrollbar-width:none/);
 assert.match(css,/summary::after/);
 assert.match(js,/is-scrolled/);
 assert.match(js,/scrollLeft/);
});
test('Wave 1 editorial audit: the three insights explain implementation considerations',()=>{
 const articles=['quand-un-tableur-devient-un-systeme','automatiser-sans-perdre-le-controle','un-site-qui-continue-apres-le-formulaire'];
 for(const id of articles){
  const html=fs.readFileSync(path.join(dist,'regards',id,'index.html'),'utf8');
  assert.match(html,/Une méthode à appliquer/);
  assert.match(html,/Exemple fictif/);
  assert.match(html,/VÉRIFICATION 01/);
 }
});

test('Wave 2 renders all four separate functional product demos with strong disclosures',()=>{
 const apps=['clientflow-pro','chantierpilot','commercepilot','docupilot-ai'];
 for(const id of apps){
  const html=fs.readFileSync(path.join(dist,'applications',id,'index.html'),'utf8');
  assert.match(html,new RegExp('data-flagship-app="'+id+'"'));
  assert.match(html,/SCÉNARIO INTERACTIF/);
  assert.match(html,/DONNÉES FICTIVES|Données fictives|données fictives/);
  assert.match(html,/QUESTIONS FRÉQUENTES/);
  assert.match(html,/assets\/flagship-apps\.js/);
  assert.match(html,/name="description"/);
  assert.match(html,/logiciel|outil|traitement/i);
  assert.ok(html.split(/<p[\s>]/).length>=10,'SEO context needs substantial paragraphs for '+id);
 }
 const appCode=fs.readFileSync(path.join(dist,'assets','flagship-apps.js'),'utf8');
 for(const command of ['advance','progress','spend','sell','receive','analyse','approve','export','reset']){
  assert.ok(appCode.includes(command),'Missing scenario action '+command);
 }
});

test('Wave 2 editorial: new guides are substantive, attributed and internally linked',()=>{
 for(const id of ['logiciel-metier-ou-saas-comment-choisir','cadrer-mvp-logiciel-metier-questions','facturation-electronique-integration-logiciel-2026-2027']){
  const html=fs.readFileSync(path.join(dist,'regards',id,'index.html'),'utf8');
  assert.match(html,/Rédaction Deux Rives Web/);
  assert.match(html,/article-related/);
  assert.ok(html.split(/<p[\s>]/).length>=9,id+' should contain long-form practical guidance');
 }
});
test('Wave 2: sector and service pages include specific operations and links',()=>{
 const sectorIds=['services-professionnels','batiment-interventions','commerce-operations','education','sante-administrative','transport-logistique','immobilier-patrimoine','tourisme-hotellerie','ressources-humaines','industrie-ia-pilotage'];
 const serviceIds=['logiciels-sur-mesure','automatisation-des-processus','intelligence-artificielle','sites-et-commerce','integrations-api','maintenance-evolution'];
 const sectorHeadings=new Set(),serviceHeadings=new Set();
 for(const id of sectorIds){
  const html=fs.readFileSync(path.join(dist,'secteurs',id,'index.html'),'utf8');
  assert.match(html,/ANALYSE MÉTIER/);
  const match=html.match(/<section class="seo-operations">[\s\S]*?<h2>([^<]+)<\/h2>/);
  assert.ok(match,'Sector analysis heading missing '+id);
  assert.ok(!sectorHeadings.has(match[1]),'Sector duplicate SEO title '+id);
  sectorHeadings.add(match[1]);
  assert.equal((html.match(/ENJEU 0[1-3]/g)||[]).length,3);
 }
 for(const id of serviceIds){
  const html=fs.readFileSync(path.join(dist,'expertises',id,'index.html'),'utf8');
  assert.match(html,/Présenter votre besoin/);
  const match=html.match(/<section class="section buying-section"[^>]*>[\s\S]*?<h2>([^<]+)<\/h2>/);
  assert.ok(match,'Service analysis heading missing '+id);
  assert.ok(!serviceHeadings.has(match[1]),'Service duplicate SEO title '+id);
  serviceHeadings.add(match[1]);
 }
});
test('Technical SEO metadata includes parseable breadcrumbs, site and article schema',()=>{
 for(const file of pages){
  const html=fs.readFileSync(file,'utf8');
  assert.match(html,/meta property="og:locale" content="(?:fr_FR|en_GB)"/);
  const match=html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
  assert.ok(match,'No JSON-LD: '+file);
  const schemas=JSON.parse(match[1]);
  assert.ok(schemas.some(x=>x['@type']==='WebPage'));
  assert.ok(schemas.some(x=>x['@type']==='BreadcrumbList'));
  if(file.includes('/regards/')&&!file.endsWith('/regards/index.html')){
   assert.ok(schemas.some(x=>x['@type']==='Article'));
  }
 }
});

test('Wave 3: four functional app routes, search filters, spotlights and inquiry links',()=>{
 for(const id of ['intervention-360','factureconnect','devis-atelier','missiondesk']){
  const html=fs.readFileSync(path.join(dist,'applications',id,'index.html'),'utf8');
  assert.match(html,new RegExp('data-wave3-app="'+id+'"'));
  assert.match(html,/DÉMONSTRATION FONCTIONNELLE/);
  assert.match(html,/QUESTIONS FRÉQUENTES/);
  assert.match(html,/Données fictives|DONNÉES FICTIVES/);
  assert.match(html,/assets\/wave3-apps\.js/);
 }
 const studio=fs.readFileSync(path.join(dist,'studio/index.html'),'utf8');
 assert.equal((studio.match(/data-studio-sector=/g)||[]).length,11);
 assert.equal((studio.match(/data-sector="/g)||[]).length,24);
 const sectorIds=['services-professionnels','batiment-interventions','commerce-operations','education','sante-administrative','transport-logistique','immobilier-patrimoine','tourisme-hotellerie','ressources-humaines','industrie-ia-pilotage'];
 for(const id of sectorIds){
  const html=fs.readFileSync(path.join(dist,'secteurs',id,'index.html'),'utf8');
  assert.match(html,/sector-immersive/);
  assert.match(html,/APERÇU DU CONCEPT/);
 }
 const css=fs.readFileSync(path.join(dist,'assets/wave3-premium.css'),'utf8');
 assert.match(css,/\.header \.nav\.is-open/);
 assert.match(css,/width:100%!important/);
});

test('Performance: editorial images are optimized WebP and referenced by pages',()=>{
 const assets=fs.readdirSync(path.join(dist,'assets'));
 const webps=assets.filter(name=>name.endsWith('.webp')&&!name.endsWith('-640.webp'));
 assert.equal(webps.length,59,'all approved editorial assets need optimized variants');
 const home=fs.readFileSync(path.join(dist,'index.html'),'utf8');
 assert.match(home,/equipe-conception-logiciel-paris\.webp/);
 assert.ok(!/assets\/[^"']+\.png/.test(home),'homepage must load WebP images');
 for(const file of webps){
  const original=path.join(dist,'assets',file.replace(/\.webp$/,'.png'));
  const optimized=path.join(dist,'assets',file);
  assert.ok(fs.existsSync(original),'source original preserved: '+file);
  assert.ok(fs.statSync(optimized).size<fs.statSync(original).size,'WebP should compress '+file);
 }
});

test('Business contact and founder cards use approved details only',()=>{
 const agency=fs.readFileSync(path.join(dist,'agence/index.html'),'utf8');
 for(const name of ['Jean Emilien Massoda','Claude Armand'])assert.ok(agency.includes(name));
 assert.equal((agency.match(/class="founder-card"/g)||[]).length,2);
 assert.equal((agency.match(/src="..\/assets\/founder-default.svg"/g)||[]).length,2);
 for(const file of pages){const html=fs.readFileSync(file,'utf8');assert.ok(html.includes('services@deuxrivesweb.fr'));assert.ok(html.includes('Paris, France'));assert.doesNotMatch(html,/hello@massoda|671.?260.?005|Illustration générée par IA d’un contexte métier|Les termes métier liés/);}
 const contact=fs.readFileSync(path.join(dist,'contact/index.html'),'utf8');
 assert.ok(contact.includes('data-copy'));assert.ok(contact.includes('data-send'));assert.ok(contact.includes('Il n’a pas encore été envoyé.'));
 assert.doesNotMatch(contact,/l’adresse de l’entreprise sera ajoutée/);
});
test('Each catalogue entry links to a working application demo',()=>{
 const catalog=fs.readFileSync(path.join(dist,'studio/index.html'),'utf8');assert.match(catalog,/24 démonstrations métier/);
 for(const dir of fs.readdirSync(path.join(dist,'studio'),{withFileTypes:true}).filter(x=>x.isDirectory())){
 const html=fs.readFileSync(path.join(dist,'studio',dir.name,'index.html'),'utf8');assert.ok(html.includes('../../applications/'+dir.name+'/'),dir.name);}
});

test('Search indexing requires complete launch details and the production origin',async()=>{
 const {publicLaunchReady}=await import('../scripts/launch-readiness.mjs');
 const {default:config}=await import('../site.config.mjs');
 assert.equal(publicLaunchReady(config,config.origin),false);
 const legal=Object.fromEntries(['companyName','legalForm','siren','rcs','registeredAddress','email','publisher','hostName','hostAddress'].map(k=>[k,'confirmed']));
 const complete={...config,publishReady:true,legal};
 assert.equal(publicLaunchReady(complete,config.origin),true);
 assert.equal(publicLaunchReady(complete,'https://preview.example.test'),false);
 assert.equal(publicLaunchReady({...complete,legal:{...legal,siren:''}},config.origin),false);
});
