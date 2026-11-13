import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { projects } from './portfolio-data.mjs';

const base='http://127.0.0.1:4173';
const dist=path.resolve('dist');
const imagesDir=path.resolve('artifacts/browser');
fs.mkdirSync(imagesDir,{recursive:true});
const paths=[];
function collect(folder){
 for(const item of fs.readdirSync(folder,{withFileTypes:true})){
  const filename=path.join(folder,item.name);
  if(item.isDirectory())collect(filename);
  else if(item.name==='index.html')paths.push('/'+path.relative(dist,filename).replace(/\\/g,'/').replace(/index\.html$/,''));
 }
}
collect(dist);
assert.equal(paths.length, 94 + projects.length, 'Expected existing pages and all project case studies');
const browser=await chromium.launch({headless:true});
const report={pages:paths.length,viewports:[],warnings:[]};
try{
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  const page=await browser.newPage({viewport,deviceScaleFactor:1});
  const failures=[];
  page.on('pageerror',e=>failures.push(e.message));
  for(const route of paths){
   const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:15000});
   if(!response||response.status()!==200)failures.push('HTTP '+response?.status()+': '+route);
   const state=await page.evaluate(()=>({
    lang:document.documentElement.lang,
    h1:document.querySelectorAll('h1').length,
    width:document.documentElement.scrollWidth,
    client:document.documentElement.clientWidth,
    imageLayoutErrors:[...document.querySelectorAll('.wave-demo-index-grid img,.dr-feature-img img,.studio-image img,.dr-media-card img')].flatMap(img=>{
      const rect=img.getBoundingClientRect(),css=getComputedStyle(img);
      if(!rect.width)return [];
      const expected=img.closest('.dr-media-card')?16/9:4/3;
      return Math.abs(rect.width/rect.height-expected)>.06||css.objectFit!=='contain'
        ?[img.getAttribute('src')+' '+Math.round(rect.width)+'x'+Math.round(rect.height)+' '+css.objectFit]:[];
    }),
    oversizedPhotos:[...document.querySelectorAll('.photo-story img')].filter(img=>img.getBoundingClientRect().height>521).map(img=>img.getAttribute('src'))
   }));
   if(state.lang!==(route.startsWith('/en/')?'en':'fr'))failures.push('wrong language: '+route);
   if(!state.h1)failures.push('missing heading: '+route);
   for(const error of state.imageLayoutErrors)failures.push('cropped or stretched image at '+viewport.width+'px '+route+': '+error);
   for(const src of state.oversizedPhotos)failures.push('oversized photo at '+viewport.width+'px '+route+': '+src);
   if(state.width>state.client+14)report.warnings.push('horizontal overflow '+viewport.width+'px: '+route+' '+state.width+'/'+state.client);
  }
  await page.goto(base+'/', {waitUntil:'domcontentloaded'});
  const workflow = page.locator('[data-home-workflow]');
  const advance = workflow.locator('[data-workflow-advance]');
  const reset = workflow.locator('[data-workflow-reset]');
  const owner = workflow.locator('[data-workflow-owner]');
  const status = workflow.locator('[data-workflow-status]');
  assert.equal(await owner.textContent(), 'À attribuer');
  assert.equal(await status.textContent(), 'Reçue');
  await advance.click();
  assert.equal(await owner.textContent(), 'Camille');
  assert.equal(await status.textContent(), 'Attribuée');
  await advance.click();
  assert.equal(await status.textContent(), 'En cours');
  assert.equal(await workflow.locator('[aria-current="step"]').textContent(), 'En cours');
  assert.equal(await reset.evaluate(button => button === document.activeElement), true);
  await reset.click();
  assert.equal(await status.textContent(), 'Reçue');
  assert.equal(await advance.evaluate(button => button === document.activeElement), true);

  const logos = page.locator('.platform-logos');
  const logoTrack = logos.locator('.platform-logos-track');
  const toggle = logos.getByRole('button', {name: 'Mettre en pause le défilement des logos'});
  const cases = page.locator('#projet-en-vedette');
  const currentCase = cases.locator('[data-case-slide]:visible');
  const nextCase = cases.getByRole('button', {name: 'Réalisation suivante'});
  const prevCase = cases.getByRole('button', {name: 'Réalisation précédente'});
  const caseWidths = [];
  for (const title of ['FreshBox Tech Marketplace', 'Mobi-Kumbu', 'BPÉTALE']) {
    assert.equal(await currentCase.count(), 1);
    assert.equal(await currentCase.getByRole('heading', {level: 2}).textContent(), title);
    const screenshot = currentCase.locator('img');
    await screenshot.scrollIntoViewIfNeeded();
    await screenshot.evaluate(image => image.decode());
    caseWidths.push((await currentCase.boundingBox()).width);
    await nextCase.click();
  }
  assert.equal(await currentCase.getByRole('heading', {level: 2}).textContent(), 'FreshBox Tech Marketplace');
  await prevCase.click();
  assert.equal(await currentCase.getByRole('heading', {level: 2}).textContent(), 'BPÉTALE');
  await nextCase.click();
  assert.ok(caseWidths.every(width => width === caseWidths[0]), 'All featured cases use the same width');

  assert.equal(await logoTrack.evaluate(track => getComputedStyle(track).animationName), 'platform-logos-scroll');
  await toggle.click();
  assert.equal(await logoTrack.evaluate(track => getComputedStyle(track).animationPlayState), 'paused');
  await logos.getByRole('button', {name: 'Reprendre le défilement des logos'}).click();
  assert.equal(await logoTrack.evaluate(track => getComputedStyle(track).animationPlayState), 'running');
  await page.emulateMedia({reducedMotion: 'reduce'});
  assert.equal(await logoTrack.evaluate(track => getComputedStyle(track).animationName), 'none');
  assert.equal(await toggle.isVisible(), false);
  const stripBounds = await logos.evaluate(strip => {
    const style = getComputedStyle(strip);
    const items = [...strip.querySelectorAll('ul:not([aria-hidden]) li')];
    return {
      borders: [style.borderTopWidth, style.borderBottomWidth],
      oversized: items.filter(item => {
        const visual = item.querySelector(':not([hidden])');
        const outer = item.getBoundingClientRect();
        const inner = visual.getBoundingClientRect();
        return inner.width > outer.width || inner.height > outer.height;
      }).length
    };
  });
  assert.deepEqual(stripBounds, {borders: ['0px', '0px'], oversized: 0});
  const jotform = logos.getByRole('img', {name: 'Jotform'});
  await jotform.scrollIntoViewIfNeeded();
  assert.equal(await jotform.evaluate(image => image.decode().then(() => image.naturalWidth > 0)), true);
  await page.emulateMedia({reducedMotion: 'no-preference'});

  await page.goto(base+'/realisations/',{waitUntil:'domcontentloaded'});
  const projectCards=page.locator('#catalogue-realisations [data-project]:visible');
  await page.locator('[data-project-query]').fill('freshbox');
  await page.locator('[data-project-sector]').selectOption('commerce-operations');
  await page.locator('[data-project-type]').selectOption('client');
  assert.equal(await projectCards.count(),1,'Search and filters should select FreshBox');
  assert.match(await projectCards.first().innerText(),/FreshBox/);
  await page.locator('[data-project-expertise]').selectOption('integrations-api');
  assert.ok(await page.locator('[data-project-empty]').isVisible(),'Show the empty state for incompatible filters');
  await page.locator('[data-project-reset]').click();
  assert.equal(await projectCards.count(),projects.length,'Reset should show every project');
  for(const route of ['/', '/realisations/','/realisations/freshbox-tech-marketplace/','/contact/','/regards/','/methode/','/studio/devis-atelier/','/studio/commercepilot/','/applications/clientflow-pro/','/applications/chantierpilot/','/applications/commercepilot/','/applications/docupilot-ai/','/applications/intervention-360/','/applications/factureconnect/','/applications/devis-atelier/','/applications/missiondesk/','/secteurs/transport-logistique/','/regards/facturation-electronique-integration-logiciel-2026-2027/']){
    await page.goto(base+route,{waitUntil:'domcontentloaded'});
    await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=640){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,20))}window.scrollTo(0,0)});await page.waitForTimeout(520);
    if(route==='/')await page.screenshot({path:path.join(imagesDir,'home-'+viewport.width+'.png'),fullPage:true});
    else await page.screenshot({path:path.join(imagesDir,route.replace(/\W+/g,'-')+'-'+viewport.width+'.png'),fullPage:true});
  }
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>window.scrollTo(0,750));
  await page.waitForTimeout(150);
  const header=await page.locator('.header').evaluate(e=>({top:e.getBoundingClientRect().top,scrolled:e.classList.contains('is-scrolled')}));
  if(!header.scrolled || Math.abs(header.top)>15) failures.push('sticky header morph failed at '+viewport.width);
  if(viewport.width>=1241){
   await page.evaluate(()=>window.scrollTo(0,0));
   await page.locator('.nav-toggle').first().click();
   const bounds=await page.locator('.mega').first().evaluate(e=>({left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right}));
   if(bounds.left<0||bounds.right>viewport.width+1)failures.push('mega menu clipped: '+JSON.stringify(bounds));
  }else{
   await page.locator('.menu-button').click();
   await page.locator('.nav-toggle').first().click();
   if(!await page.locator('.mega').first().isVisible())failures.push('mobile menu not visible');
  }
  report.viewports.push({width:viewport.width,height:viewport.height,failures});
  await page.close();
 }
}finally{await browser.close()}
fs.writeFileSync(path.resolve('artifacts/browser/audit.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
const failures=report.viewports.flatMap(x=>x.failures);
if(failures.length)throw new Error('Browser audit failures: '+failures.join('; '));
