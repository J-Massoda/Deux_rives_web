import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const origin='http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true});
const results=[];
async function check(name,fn,viewport={width:1366,height:900}){
 const context=await browser.newContext({viewport,acceptDownloads:true});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/applications/'+name+'/',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('.live-app');
 try{
  await fn(page);
  assert.equal(errors.length,0,'Unexpected page errors: '+errors.join('; '));
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  assert.ok(overflow<=14,'Horizontal overflow '+overflow);
  results.push({name,viewport:viewport.width,passed:true});
 }finally{await context.close()}
}
try{
 await check('clientflow-pro',async page=>{
  const original=await page.locator('.live-record').count();
  await page.locator('[data-form="lead"] [name="company"]').fill('Entreprise de Test');
  await page.locator('[data-form="lead"] [name="contact"]').fill('Test Contact');
  await page.locator('[data-form="lead"] [name="amount"]').fill('9900');
  await page.locator('[data-form="lead"] button[type=submit]').click();
  assert.equal(await page.locator('.live-record').count(),original+1);
  const lead=page.locator('.live-record').filter({hasText:'Entreprise de Test'}).first();
  for(let i=0;i<3;i++)await lead.locator('[data-act="advance"]').click();
  assert.ok(await page.locator('.live-aside').getByText('Entreprise de Test').count());
  await page.reload();await page.waitForSelector('.live-app');
  assert.ok(await page.getByText('Entreprise de Test').count()>0,'CRM state did not persist');
  await page.locator('[data-act="reset"]').click();
  assert.equal(await page.getByText('Entreprise de Test').count(),0);
 });
 await check('chantierpilot',async page=>{
  const before=await page.locator('.live-task').count();
  await page.locator('[data-form="lot"] [name="label"]').fill('Lot pilote');
  await page.locator('[data-form="lot"] [name="budget"]').fill('1500');
  await page.locator('[data-form="lot"] button[type="submit"]').click();
  assert.equal(await page.locator('.live-task').count(),before+1);
  const lot=page.locator('.live-task').filter({hasText:'Lot pilote'});
  await lot.locator('[data-act="progress"]').click();
  assert.ok((await lot.textContent()).includes('25 %'));
  await lot.locator('[data-act="spend"]').click();
  assert.ok((await lot.textContent()).includes('250'));
  const downloadPromise=page.waitForEvent('download');
  await page.locator('[data-act="report"]').click();
  const download=await downloadPromise;assert.ok(download.suggestedFilename().endsWith('.csv'));
  await page.reload();await page.waitForSelector('.live-app');
  assert.ok(await page.getByText('Lot pilote').count()>0);
  await page.locator('[data-act="reset"]').click();
  assert.equal(await page.getByText('Lot pilote').count(),0);
 });
 await check('commercepilot',async page=>{
  await page.locator('.live-product').filter({hasText:'Lampe Atelier'}).locator('[data-act="sell"]').click();
  assert.ok((await page.locator('.live-product').filter({hasText:'Lampe Atelier'}).textContent()).includes('16 en stock'));
  await page.locator('[data-form="order"] select[name="product"]').selectOption('p2');
  await page.locator('[data-form="order"] [name="quantity"]').fill('7');
  await page.locator('[data-form="order"] button[type="submit"]').click();
  assert.ok(await page.locator('[data-act="receive"]').count());
  await page.locator('[data-act="receive"]').first().click();
  assert.ok((await page.locator('.live-product').filter({hasText:'Table Chêne'}).textContent()).includes('11 en stock'));
  await page.reload();await page.waitForSelector('.live-app');
  assert.ok((await page.locator('.live-product').filter({hasText:'Table Chêne'}).textContent()).includes('11 en stock'));
  await page.locator('[data-act="reset"]').click();
  assert.ok((await page.locator('.live-product').filter({hasText:'Table Chêne'}).textContent()).includes('4 en stock'));
 });
 await check('docupilot-ai',async page=>{
  assert.ok(await page.getByText('Écart détecté').count()>0);
  await page.locator('[data-act="analyse"]').click();
  await page.locator('[data-form="document"] [name="amount"]').fill('912');
  await page.locator('[data-form="document"] button[type="submit"]').click();
  await page.locator('[data-act="approve"]').click();
  assert.ok((await page.locator('.live-aside').textContent()).includes('validé'));
  const downloadPromise=page.waitForEvent('download');
  await page.locator('[data-act="export"]').click();
  const download=await downloadPromise;assert.ok(download.suggestedFilename().endsWith('.json'));
  await page.reload();await page.waitForSelector('.live-app');
  assert.ok(await page.locator('[data-act="export"]').count());
  await page.locator('[data-act="reset"]').click();
  assert.ok(await page.locator('[data-act="analyse"]').count());
 });
 for(const name of ['clientflow-pro','chantierpilot','commercepilot','docupilot-ai']){
  await check(name,async page=>{
   assert.ok(await page.locator('.live-app').isVisible());
   assert.ok(await page.getByText('Réinitialiser la démonstration').count());
  },{width:390,height:844});
 }
}finally{await browser.close()}
console.log('Wave 2 interaction audit:',JSON.stringify(results,null,2));
