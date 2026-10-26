import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

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
assert.equal(paths.length,61,'Expected 61 generated pages');
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
    client:document.documentElement.clientWidth
   }));
   if(state.lang!=='fr')failures.push('wrong language: '+route);
   if(!state.h1)failures.push('missing heading: '+route);
   if(state.width>state.client+14)report.warnings.push('horizontal overflow '+viewport.width+'px: '+route+' '+state.width+'/'+state.client);
  }
  for(const route of ['/', '/regards/','/methode/','/studio/devis-atelier/','/studio/commercepilot/']){
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
  if(viewport.width>=1151){
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
