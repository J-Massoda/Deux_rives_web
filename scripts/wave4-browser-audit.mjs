import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const origin='http://127.0.0.1:4173',ids=[
'cabinet-os','b2b-orderhub','campusflow','eduprogress','clinicdesk','carefollow',
'fleetcontrol','routeboard','immopilot','propertycare','stayflow','experiencedesk',
'talentpipeline','teamops','productionlens','insightboard'];
const browser=await chromium.launch({headless:true});const outcomes=[];
try{
 for(const width of [1366,390]){
  for(const id of ids){
   const context=await browser.newContext({viewport:{width,height:850}});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   const url=origin+'/applications/'+id+'/';
   const response=await page.goto(url,{waitUntil:'domcontentloaded'});
   assert.equal(response.status(),200,id+' page status');
   await page.locator('.w4-app-header').waitFor();
   assert.equal(await page.locator('.w4-lanes>section').count(),4,id+' needs four industry stages');
   assert.ok(await page.locator('.w4-special').isVisible(),id+' needs a distinctive sector view');
   assert.ok(await page.locator('.w4-domain-item').count()>=2,id+' needs seeded examples');
   const head=await page.locator('.w4-app-header h2').textContent();
   const before=await page.locator('.w4-domain-measure strong').first().textContent();
   await page.locator('[data-action="metric"]').first().click();
   const after=await page.locator('.w4-domain-measure strong').first().textContent();
   assert.equal(Number(after),Number(before)+1,id+' should update its secondary metric');
   await page.locator('[data-action="advance"]').first().click();
   const sample='Test de scénario '+id;
   await page.locator('.w4-form input[name="a"]').fill(sample);
   await page.locator('.w4-form input[name="b"]').fill('Donnée fictive de validation');
   await page.locator('.w4-form button[type="submit"]').click();
   assert.equal(await page.getByText(sample,{exact:true}).count()>0,true,'created record missing '+id);
   await page.reload({waitUntil:'domcontentloaded'});
   await page.locator('.w4-app-header').waitFor();
   assert.ok(await page.getByText(sample,{exact:true}).count()>0,'state should persist '+id);
   await page.locator('[data-action="reset"]').click();
   assert.equal(await page.getByText(sample,{exact:true}).count(),0,'reset failed '+id);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert.ok(overflow<=14,id+' overflow '+overflow+' at '+width+'px');
   assert.deepEqual(errors,[],id+' JS errors');
   outcomes.push({id,width,passes:['secondary action','stage progression','creation','reload','reset','responsive']});
   await context.close();
  }
 }
}finally{await browser.close()}
console.log('Wave 4 browser QA passed '+outcomes.length+' desktop/mobile scenarios across '+ids.length+' apps');
