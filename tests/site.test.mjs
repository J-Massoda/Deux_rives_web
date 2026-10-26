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
  assert.equal(pages.length,61);
  for(const file of pages){
    const html=fs.readFileSync(file,'utf8');
    assert.match(html,/<html lang="fr">/);
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
 assert.match(studio,/Concepts exploratoires/);
 const entries=fs.readdirSync(path.join(dist,'studio'),{withFileTypes:true}).filter(x=>x.isDirectory());
 assert.equal(entries.length,24);
 for(const entry of entries){
  const html=fs.readFileSync(path.join(dist,'studio',entry.name,'index.html'),'utf8');
  assert.match(html,/Concept illustratif/);
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
  assert.match(html,/Concept illustratif/);
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
  assert.match(html,/Du besoin à l’usage/);
  assert.match(html,/Des décisions explicites avant le développement/);
  assert.match(html,/Questions pratiques avant de démarrer/);
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
