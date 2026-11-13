import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import config from '../site.config.mjs';
import { publicLaunchReady } from '../scripts/launch-readiness.mjs';
import { projects } from '../scripts/portfolio-data.mjs';
import { contactSettings } from '../scripts/contact-settings.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const origin = (process.env.PUBLIC_ORIGIN || config.origin).replace(/\/$/, '');
const launchReady = publicLaunchReady(config, origin);
execFileSync(process.execPath,[path.join(root,'scripts/build.mjs')]);
const dist=path.join(root,'dist');
const pages=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(entry.name==='index.html')pages.push(p);}}
walk(dist);
test('all public page paths and local assets resolve',()=>{
  assert.equal(pages.length,94 + projects.length);
  for(const file of pages){
    const html=fs.readFileSync(file,'utf8');
    assert.match(html,/<html lang="(?:fr|en)">/);
    assert.match(html,/<main id="main">/);
    if (launchReady) assert.doesNotMatch(html,/name="robots" content="noindex,nofollow"/);
    else assert.match(html,/name="robots" content="noindex,nofollow"/);
    for(const [,value] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
      if(value.startsWith('#')||/^(?:https?:|mailto:|tel:|data:)/.test(value))continue;
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
test('launch status is consistent with the current legal and origin state',()=>{
  const legal=fs.readFileSync(path.join(dist,'mentions-legales/index.html'),'utf8');
  const contact=fs.readFileSync(path.join(dist,'contact/index.html'),'utf8');
  if (launchReady) {
    assert.doesNotMatch(legal,/À compléter avant publication|À compléter/);
    assert.match(fs.readFileSync(path.join(dist,'robots.txt'),'utf8'),/^Allow: \/$/m);
    assert.match(fs.readFileSync(path.join(dist,'robots.txt'),'utf8'),/Sitemap: https:\/\/deuxrivesweb\.fr\/sitemap\.xml/);
  } else {
    assert.doesNotMatch(legal,/À compléter avant publication|À compléter/);
    assert.match(contact,/Préparer votre brief/);
    assert.doesNotMatch(contact,/action="https?:/);
    assert.match(fs.readFileSync(path.join(dist,'robots.txt'),'utf8'),/Disallow: \/$/m);
  }
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
 assert.match(home,/assets\/realisations\/freshbox-catalogue\.webp/);
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
 assert.equal((agency.match(/class="founder-card\b/g)||[]).length,2);
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

test('Search indexing requires complete launch details and the production origin', () => {
  assert.equal(publicLaunchReady(config, config.origin), true);
  assert.equal(publicLaunchReady(config, 'https://preview.example.test'), false);
  assert.equal(publicLaunchReady({ ...config, publishReady: false }, config.origin), false);
  for (const key of ['siren', 'registration', 'phone', 'hostPhone']) {
    const incomplete = { ...config, legal: { ...config.legal, [key]: '' } };
    assert.equal(publicLaunchReady(incomplete, config.origin), false, key);
  }
});

test('Legal details and contact information use the same business configuration', () => {
  const readPage = route => fs.readFileSync(path.join(dist, route, 'index.html'), 'utf8');
  const legal = readPage('mentions-legales');
  const privacy = readPage('confidentialite');
  const cookies = readPage('cookies');
  assert.match(legal, /Claude Armand Eboa Ngoupe, entrepreneur individuel/);
  assert.match(legal, /132070814/);
  assert.match(legal, /16 rue Auguste Daix, 94260 Fresnes/);
  assert.match(legal, /Registre national des entreprises/);
  assert.match(legal, /TVA non applicable, art\. 293 B du CGI/);
  assert.match(legal, /GitHub, Inc\./);
  assert.match(legal, /Téléphone de l’hébergeur/);
  assert.doesNotMatch(legal, /Capital social|Immatriculation RCS|Numéro de TVA/);
  for (const route of ['', 'contact', 'mentions-legales']) {
    assert.ok(readPage(route).includes(config.legal.phone), route);
    assert.ok(readPage(route).includes('tel:' + config.legal.phone.replace(/\s/g, '')), route);
  }
  assert.match(privacy, /3 ans à compter du dernier échange/);
  assert.match(privacy, /pendant la relation commerciale, puis 3 ans/);
  assert.match(privacy, /10 ans à compter de la clôture de l’exercice/);
  assert.match(privacy, /https:\/\/www\.cnil\.fr\/fr\/plaintes/);
  assert.match(privacy, /GitHub enregistre l’adresse IP des visiteurs/);
  assert.match(cookies, /stockage local de votre navigateur/);
});

test('project catalogue lists distinct case studies with sitemap entries and preserves the launch gate', () => {
  const catalogue = fs.readFileSync(path.join(dist, 'realisations/index.html'), 'utf8');
  const ids = projects.map(({id}) => id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal((catalogue.match(/data-project data-type=/g) || []).length, ids.length);
  assert.match(catalogue, /data-project-sector/);
  assert.ok(catalogue.indexOf('<h3>Projets clients</h3>') < catalogue.indexOf('<h3>Prototypes et pilotes</h3>'));
  const sitemapPath = path.join(dist, 'sitemap.xml');
  const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
  for (const id of ids) {
    const project = fs.readFileSync(path.join(dist, 'realisations', id, 'index.html'), 'utf8');
    assert.match(project, /Le travail réalisé/);
    if (projects.find(entry => entry.id === id).type === 'produit') {
      assert.match(project, /Extension Deux Rives Web · Intégration sur demande/);
      assert.doesNotMatch(project, /Voir la fiche d’origine/);
    } else {
      assert.equal((project.match(/Jean-Émilien Massoda/g) || []).length, 1);
    }
    if (launchReady) assert.doesNotMatch(project, /noindex,nofollow/);
    else assert.match(project, /noindex,nofollow/);
    if (sitemap) assert.ok(sitemap.includes('<loc>https://deuxrivesweb.fr/realisations/' + id + '/</loc>'));
  }
  for (const id of ['leads-tracker', 'fashionista-africa', 'mobikumbu']) {
    assert.ok(!ids.includes(id));
  }
  assert.match(catalogue, /href="..\/studio\/"/);
  assert.match(catalogue, /<h3>Extensions réutilisables<\/h3>/);
  const bpetale = fs.readFileSync(path.join(dist, 'realisations/bpetale-ltd/index.html'), 'utf8');
  assert.match(catalogue, /href="..\/realisations\/bpetale-ltd\/"/);
  assert.match(bpetale, /href="https:\/\/bpetale\.com\/"/);
  assert.match(bpetale, /assets\/realisations\/bpetale-ltd\.webp/);
  assert.doesNotMatch(bpetale, /href="https:\/\/(?:www\.)?massoda\.me\//);
});

test('when launchReady, sitemap routes resolve without duplicates or internal project links', () => {
  const sitemapPath = path.join(dist, 'sitemap.xml');
  if (origin !== config.origin) {
    assert.equal(fs.existsSync(sitemapPath), false);
    return;
  }
  if (!launchReady) return;
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc);
  assert.ok(locs.length > 0);
  assert.equal(new Set(locs).size, locs.length);
  for (const loc of locs) {
    const route = loc.replace(/^https:\/\/deuxrivesweb\.fr/, '').replace(/\/$/, '');
    const htmlPath = path.join(dist, route.replace(/^\//, ''), 'index.html');
    assert.ok(fs.existsSync(htmlPath), `${loc} does not resolve to a page`);
    const html = fs.readFileSync(htmlPath, 'utf8');
    assert.ok(html.includes('<link rel="canonical" href="' + loc + '">'), loc);
    assert.doesNotMatch(html, /<meta name="robots" content="noindex/);
    assert.doesNotMatch(loc, /\/realisations\/deux-rives-web\//);
  }
});

test('sector pages pair workplace photography with optional video links', () => {
  const media = [
    ['batiment-interventions', '8961001', '6473959'],
    ['commerce-operations', '4483942', '4292903'],
    ['sante-administrative', '4269275', '6755024']
  ];
  for (const [sector, photo, video] of media) {
    const html = fs.readFileSync(path.join(dist, 'secteurs', sector, 'index.html'), 'utf8');
    const story = html.match(/<section class="photo-story sector-media"[\s\S]+?<\/section>/)?.[0];
    assert.ok(story, sector);
    assert.ok(story.includes(`https://images.pexels.com/photos/${photo}/`));
    assert.match(story, new RegExp(`href="https://www[.]pexels[.]com/video/[^"]+-${video}/"`));
    assert.doesNotMatch(story, /<iframe|autoplay/);
    assert.match(html, /class="subhero-art dr-subhero-art sector-hero-ui"/);
  }
});

test('homepage leads with the interactive workflow, client evidence and Lumen demo', () => {
  const homepage = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
  const sections = ['data-home-workflow', 'id="projet-en-vedette"', 'id="demos-clients"', 'id="priority-products"'];
  const positions = sections.map(marker => homepage.indexOf(marker));
  assert.ok(positions.every((position, index) => position >= 0 && (index === 0 || position > positions[index - 1])));
  assert.match(homepage, /aria-current="step">Reçue/);
  assert.match(homepage, /assets\/realisations\/freshbox-catalogue\.webp/);
  assert.match(homepage, /href="realisations\/freshbox-tech-marketplace\/"/);
  assert.match(homepage, /assets\/realisations\/lumen-desktop\.webp/);
  assert.match(homepage, /assets\/realisations\/lumen-mobile\.webp/);
  assert.doesNotMatch(homepage, /dr-hero-photo|dr-float|photo-story|librairie-du-temple/);
});

test('homepage testimonials use French and credit individual projects', () => {
  const homepage = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
  assert.doesNotMatch(homepage, /BPÉTALE|Rosemary Hart/i);
  const section = homepage.match(/<section[^>]+aria-label="Témoignages">[\s\S]+?<\/section>/)?.[0];
  assert.ok(section);
  assert.match(section, /Deux Rives Web/);
  assert.doesNotMatch(section, /Jean-Émilien|Massoda/);
  assert.equal((section.match(/<blockquote lang="fr">/g) || []).length, 3);
  assert.match(section, /Fondateur, FreshBox/);
});

test('contact services use approved URLs and can be configured independently', () => {
  const page = fs.readFileSync(path.join(dist, 'contact/index.html'), 'utf8');
  assert.ok(page.indexOf('id="consultation"') < page.indexOf('id="brief-projet"'));
  assert.match(page, /<details class="brief-optional">/);
  const bookingUrl = 'https://calendar.app.google/example';
  assert.deepEqual(contactSettings({}), { endpoint: '', bookingUrl: 'https://calendar.app.google/sKCVgdHbJ9b6D5NN6' });
  assert.deepEqual(contactSettings({ GOOGLE_BOOKING_URL: bookingUrl }), { endpoint: '', bookingUrl });
  assert.deepEqual(contactSettings({ FORMSPREE_FORM_ID: 'abc123' }), {
    endpoint: 'https://formspree.io/f/abc123', bookingUrl: 'https://calendar.app.google/sKCVgdHbJ9b6D5NN6'
  });
  assert.throws(() => contactSettings({ GOOGLE_BOOKING_URL: 'https://other.example/' }));
  assert.throws(() => contactSettings({ FORMSPREE_FORM_ID: 'https://other.example' }));
});
