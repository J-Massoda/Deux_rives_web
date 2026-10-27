import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const origin='http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true});
const checked=[];
const run=async(path,fn,viewport={width:1366,height:900})=>{
 const ctx=await browser.newContext({viewport,acceptDownloads:true});
 const page=await ctx.newPage();const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.goto(origin+path,{waitUntil:'domcontentloaded'});
 try{
  await fn(page);
  assert.deepEqual(errs,[],'JS errors on '+path);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  assert.ok(overflow<=14,'Horizontal overflow '+overflow+' at '+path+' '+viewport.width);
  checked.push({path,viewport:viewport.width,passed:true});
 }finally{await ctx.close()}
};
try{
 for(const width of [390,375,768]){
  await run('/',async page=>{
   const menu=page.locator('.menu-button');
   await menu.click();const nav=page.locator('.header .nav');
   assert.ok(await nav.isVisible(),'mobile nav should open');
   if(width===390)await page.screenshot({path:'artifacts/browser/wave3-mobile-menu-open.png'});
   const b=await nav.boundingBox();
   assert.ok(b.width>=width*.85,'mobile nav too narrow: '+b.width+'/'+width);
   assert.ok(b.x>=-3&&b.x+b.width<=width+3,'mobile nav clipped: '+JSON.stringify(b));
   await nav.locator('.nav-toggle').first().click();
   assert.ok(await nav.locator('.mega').first().isVisible(),'menu subsection should expand');
   const separation=await nav.evaluate(el=>{const open=el.querySelector('.nav-item.submenu-open'),next=open?.nextElementSibling,mega=open?.querySelector('.mega');if(!open||!next||!mega)return null;const end=mega.getBoundingClientRect().bottom,begin=next.getBoundingClientRect().top;return {end,begin,delta:begin-end}});
   assert.ok(separation&&separation.delta>=-2,'Expanded submenu overlaps following navigation: '+JSON.stringify(separation));
   if(width===390)await page.screenshot({path:'artifacts/browser/wave3-mobile-submenu-open.png'});
   await nav.locator('.nav-toggle').first().click();
   assert.equal(await nav.locator('.mega').first().isVisible(),false,'submenu should collapse');
   await menu.click();assert.equal(await nav.isVisible(),false,'main menu should close');
   await page.evaluate(()=>window.scrollTo(0,700));await page.waitForTimeout(120);
   await menu.click();assert.ok(await nav.isVisible(),'scrolled menu should open');
   const scrolled=await nav.boundingBox();assert.ok(scrolled.width>=width*.85,'scrolled menu clipped');
  },{width,height:844});
 }
 await run('/studio/',async page=>{
  assert.equal(await page.locator('.concept-card:visible').count(),24);
  await page.locator('[data-studio-sector="Bâtiment & interventions"]').click();
  assert.equal(await page.locator('.concept-card:visible').count(),3);
  await page.locator('#studio-search').fill('Devis Atelier');
  assert.equal(await page.locator('.concept-card:visible').count(),1);
  await page.locator('#studio-search').fill('zzzznotfound');
  assert.equal(await page.locator('.concept-card:visible').count(),0);
  assert.ok(await page.locator('#studio-empty').isVisible());
  await page.locator('[data-studio-sector="Tous"]').click();
  await page.locator('#studio-search').fill('');
  assert.equal(await page.locator('.concept-card:visible').count(),24);
 });
 await run('/applications/intervention-360/',async page=>{
  await page.locator('[data-w3-form="job"] [name="title"]').fill('Panne de test');
  await page.locator('[data-w3-form="job"] [name="client"]').fill('Site fictif');
  await page.locator('[data-w3-form="job"] button[type=submit]').click();
  const job=page.locator('.w3-ticket').filter({hasText:'Panne de test'});
  assert.equal(await job.count(),1);
  await job.locator('[data-w3-action="assign"]').click();
  await job.locator('[data-w3-action="start"]').click();
  await job.locator('[data-w3-action="complete"]').click();
  assert.ok((await job.textContent()).includes('clôturé'));
  await page.reload();assert.ok(await page.getByText('Panne de test').count()>0);
  await page.locator('[data-w3-action="reset"]').click();assert.equal(await page.getByText('Panne de test').count(),0);
 });
 await run('/applications/factureconnect/',async page=>{
  await page.locator('[data-w3-form="invoice"] [name="customer"]').fill('Entreprise de test');
  await page.locator('[data-w3-form="invoice"] [name="subtotal"]').fill('500');
  await page.locator('[data-w3-form="invoice"] button[type=submit]').click();
  const invoice=page.locator('.w3-invoice').filter({hasText:'Entreprise de test'});
  await invoice.locator('[data-w3-action="verify"]').click();
  await invoice.locator('[data-w3-action="validate"]').click();
  const got=page.waitForEvent('download');
  await invoice.locator('[data-w3-action="export"]').click();
  assert.ok((await got).suggestedFilename().endsWith('.json'));
  await page.locator('[data-w3-action="reset"]').click();assert.equal(await page.getByText('Entreprise de test').count(),0);
 });
 await run('/applications/devis-atelier/',async page=>{
  await page.locator('[data-w3-form="line"] [name="label"]').fill('Peinture test');
  await page.locator('[data-w3-form="line"] [name="quantity"]').fill('2');
  await page.locator('[data-w3-form="line"] [name="unit"]').fill('125');
  await page.locator('[data-w3-form="line"] button[type=submit]').click();
  assert.ok(await page.getByText('Peinture test').count()>0);
  await page.locator('[data-w3-action="send"]').click();
  await page.locator('.w3-quote-line').filter({hasText:'Peinture test'}).locator('[data-w3-action="increment"]').click();
  assert.ok((await page.locator('.w3-stat').first().textContent()).includes('V2'));
  await page.locator('[data-w3-action="reset"]').click();
  assert.equal(await page.getByText('Peinture test').count(),0);
 });
 await run('/applications/missiondesk/',async page=>{
  await page.locator('[data-w3-form="mission"] [name="client"]').fill('Bureau Test');
  await page.locator('[data-w3-form="mission"] [name="name"]').fill('Audit démonstration');
  await page.locator('[data-w3-form="mission"] [name="planned"]').fill('12');
  await page.locator('[data-w3-form="mission"] button[type=submit]').click();
  const mission=page.locator('.w3-mission').filter({hasText:'Audit démonstration'});
  await mission.locator('[data-w3-action="track"]').click();
  assert.ok((await mission.textContent()).includes('2 h suivies'));
  await mission.locator('[data-w3-action="advance"]').click();
  await mission.locator('[data-w3-action="advance"]').click();
  assert.ok((await mission.textContent()).includes('terminée'));
  await page.reload();assert.ok(await page.getByText('Audit démonstration').count()>0);
  await page.locator('[data-w3-action="reset"]').click();assert.equal(await page.getByText('Audit démonstration').count(),0);
 });
 for(const id of ['intervention-360','factureconnect','devis-atelier','missiondesk']){
  await run('/applications/'+id+'/',async page=>{assert.ok(await page.locator('.w3-app').isVisible());assert.ok(await page.locator('[data-w3-action="reset"]').isVisible())},{width:390,height:844});
 }
}finally{await browser.close()}
console.log('Wave 3 end-to-end QA:',JSON.stringify(checked,null,2));
