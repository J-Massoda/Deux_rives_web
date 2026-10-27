import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true});
try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173/contact/');
  await page.getByLabel('Votre nom',{exact:true}).fill('Visiteur de test');
  await page.getByLabel('Votre adresse e-mail',{exact:true}).fill('visiteur@example.test');
  await page.getByLabel('Quel processus souhaitez-vous améliorer ?',{exact:true}).fill('Mieux coordonner les demandes et leurs documents.');
  await page.getByRole('button',{name:'Préparer le message'}).click();
  await page.locator('.brief-output').waitFor({state:'visible'});
  assert.match(await page.locator('.brief-output').innerText(),/Il n’a pas encore été envoyé/);
  const mailto=await page.locator('[data-send]').getAttribute('href');
  assert.equal(new URL(mailto).pathname,'services@deuxrivesweb.fr');
  assert.match(decodeURIComponent(mailto),/Visiteur de test/);
  await page.locator('[data-copy]').click();
  await page.getByRole('status').filter({hasText:'Message copié.'}).waitFor();
  const copied=await page.evaluate(()=>navigator.clipboard.readText());assert.match(copied,/Mieux coordonner/);
  for(const route of ['/agence/','/studio/','/expertises/logiciels-sur-mesure/']){
   await page.goto('http://127.0.0.1:4173'+route);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),route+' overflow at '+width);
  }
  await context.close();
 }
 console.log('Trust and contact audit passed at desktop and mobile widths; no email was sent.');
}finally{await browser.close();}
