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
  assert.equal(pages.length,60);
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
