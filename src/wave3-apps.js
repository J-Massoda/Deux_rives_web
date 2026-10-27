/* Wave 3: four functional, offline-first fictional workflow demonstrations.
No network communication, accounting submission or payment processing. */
(()=>{'use strict';const root=document.querySelector('[data-wave3-app]');if(!root)return;
const id=root.dataset.wave3App,storage='drw:wave3:1:'+id,fmt=new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:2});
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const euro=x=>fmt.format(Number(x)||0),uid=()=>Math.random().toString(36).slice(2,9),clone=x=>JSON.parse(JSON.stringify(x));
const template={
'intervention-360':()=>({jobs:[
{id:'i1',title:'Contrôle des installations',client:'Atelier du Quai',tech:'Non affecté',status:'nouvelle',priority:'Urgente',notes:[]},
{id:'i2',title:'Maintenance préventive',client:'Maison Noro',tech:'M. Laurent',status:'planifiée',priority:'Standard',notes:[]},
{id:'i3',title:'Remplacement équipement',client:'Bureau des Rives',tech:'C. Martin',status:'en cours',priority:'Standard',notes:[]}
],history:[]}),
'factureconnect':()=>({invoices:[
{id:'f1',customer:'Maison Ardent',subtotal:980,tax:196,status:'brouillon',reference:'FAC-DEMO-021'},
{id:'f2',customer:'Atelier Lierre',subtotal:1420,tax:284,status:'à vérifier',reference:'FAC-DEMO-022'}
],history:[]}),
'devis-atelier':()=>({quote:{client:'Atelier Exemple',ref:'DEV-DEMO-104',version:1,status:'brouillon',
lines:[{id:'d1',label:'Préparation du chantier',quantity:1,unit:420},{id:'d2',label:'Pose et finitions',quantity:12,unit:65}]},history:[]}),
'missiondesk':()=>({missions:[
{id:'m1',client:'Studio Noro',name:'Portail partenaire',planned:24,actual:12,rate:85,status:'en cours'},
{id:'m2',client:'Atelier Lierre',name:'Automatisation de dossier',planned:16,actual:16,rate:95,status:'à livrer'}
],history:[]})
};if(!template[id])return;
const valid=x=>x&&typeof x==='object'&&(id==='intervention-360'?Array.isArray(x.jobs):id==='factureconnect'?Array.isArray(x.invoices):id==='devis-atelier'?Array.isArray(x.quote?.lines):Array.isArray(x.missions));
const store={get(){try{return JSON.parse(localStorage.getItem(storage))}catch{return null}},save(){try{localStorage.setItem(storage,JSON.stringify(state))}catch{}},clear(){try{localStorage.removeItem(storage)}catch{}}};
let state=store.get();if(!valid(state))state=template[id]();let msg='';
const act=(label,action,key='',kind='')=>'<button type="button" data-w3-action="'+action+'" data-id="'+e(key)+'" class="w3-button '+kind+'">'+label+'</button>';
const field=(name,label,type='text',opts='')=>'<label>'+label+'<input name="'+name+'" type="'+type+'" '+opts+' required></label>';
const box=(label,value,desc)=>'<div class="w3-stat"><small>'+label+'</small><strong>'+value+'</strong><span>'+desc+'</span></div>';
const feed=()=>'<div class="w3-feed"><h3>Historique local</h3>'+(state.history.length?'<ol>'+state.history.slice(-5).reverse().map(x=>'<li>'+e(x)+'</li>').join('')+'</ol>':'<p>Les actions du scénario apparaîtront ici.</p>')+'</div>';
const log=x=>{state.history.push(x);state.history=state.history.slice(-30)};
const moneyValid=n=>Number.isFinite(n)&&n>0&&n<=10000000;
function intervention(){
 const stages=['nouvelle','planifiée','en cours','terminée'];
 return '<div class="w3-intro"><span>DISPATCH / INTERVENTIONS TERRAIN</span><h2>Intervention 360</h2><p>Déclarez un incident, affectez un technicien et faites progresser le travail jusqu’au compte rendu.</p></div><div class="w3-stats">'+box('Demandes',state.jobs.length,'dossiers terrain')+box('En intervention',state.jobs.filter(x=>x.status==='en cours').length,'suivi opérationnel')+box('À planifier',state.jobs.filter(x=>x.status==='nouvelle').length,'non affectés')+'</div><div class="w3-split"><main><form data-w3-form="job" class="w3-form"><h3>Ouvrir une intervention</h3>'+field('title','Nature de l’intervention','text','maxlength="80" placeholder="Ex. Contrôle sécurité"')+field('client','Site / client','text','maxlength="80" placeholder="Ex. Bâtiment Rivage"')+'<button class="w3-button primary" type="submit">Créer l’ordre de travail</button></form><div class="w3-board">'+stages.map((status,i)=>'<section><div class="w3-stage"><b>0'+(i+1)+' / '+status+'</b><span>'+state.jobs.filter(x=>x.status===status).length+'</span></div>'+state.jobs.filter(x=>x.status===status).map(x=>'<article class="w3-ticket"><small>'+e(x.client)+' · '+e(x.priority)+'</small><h4>'+e(x.title)+'</h4><p>Responsable : '+e(x.tech)+'</p><div class="w3-actions">'+(x.status==='nouvelle'?act('Affecter à C. Martin','assign',x.id):x.status==='planifiée'?act('Démarrer','start',x.id):x.status==='en cours'?act('Terminer','complete',x.id):'<span class="w3-done">Compte rendu clôturé ✓</span>')+'</div></article>').join('')+'</section>').join('')+'</div></main><aside><h3>Centre de coordination</h3><p>Les statuts sont fictifs. L’affectation du technicien ne déclenche aucun appel, notification ou ordre réel.</p><div class="w3-route-art"><span>A</span><i></i><span>B</span><i></i><span>C</span></div>'+feed()+'</aside></div>';
}
function facture(){
 const sum=state.invoices.reduce((a,b)=>a+b.subtotal+b.tax,0);
 return '<div class="w3-intro"><span>ADMINISTRATION / CONNECTEURS</span><h2>FactureConnect</h2><p>Préparez, vérifiez et exportez des documents structurés. Cette simulation ne transmet pas de factures réglementaires.</p></div><div class="w3-stats">'+box('Dossiers',state.invoices.length,'factures fictives')+box('Valeur TTC',euro(sum),'montants illustratifs')+box('Exportables',state.invoices.filter(x=>x.status==='prête').length,'après validation')+'</div><div class="w3-split"><main><form data-w3-form="invoice" class="w3-form"><h3>Créer un dossier facture</h3>'+field('customer','Client','text','maxlength="80" placeholder="Ex. Société Exemple"')+field('subtotal','Montant HT (€)','number','min="1" max="10000000" step="0.01" value="750"')+'<button class="w3-button primary" type="submit">Créer le brouillon</button></form><div class="w3-invoices">'+state.invoices.map(x=>'<article class="w3-invoice"><div><small>'+e(x.reference)+'</small><h4>'+e(x.customer)+'</h4><p>'+e(x.status)+'</p></div><div><strong>'+euro(x.subtotal+x.tax)+'</strong><small>HT '+euro(x.subtotal)+' · Taxe fictive '+euro(x.tax)+'</small></div><div class="w3-actions">'+(x.status==='brouillon'?act('Envoyer au contrôle','verify',x.id):x.status==='à vérifier'?act('Valider le dossier','validate',x.id):x.status==='prête'?act('Exporter JSON','export',x.id):'<span class="w3-done">Export local ✓</span>')+'</div></article>').join('')+'</div></main><aside><h3>Schéma de traitement</h3><div class="w3-chain"><span>Document</span><span>Contrôles</span><span>Validation</span><span>Export local</span></div><p>Les montants utilisent un taux de taxe fictif de 20 % pour illustrer les calculs. Il ne s’agit pas d’un logiciel certifié ni d’une plateforme agréée.</p>'+feed()+'</aside></div>';
}
function devis(){
 const q=state.quote, ht=q.lines.reduce((n,x)=>n+x.quantity*x.unit,0);
 return '<div class="w3-intro"><span>ATELIER / CONFIGURATION DES DEVIS</span><h2>Devis Atelier</h2><p>Composez les prestations, modifiez les quantités, révisez le devis et observez ses montants calculés.</p></div><div class="w3-stats">'+box('Version','V'+q.version,'historique des révisions')+box('Total HT',euro(ht),'somme des lignes')+box('Estimation TTC',euro(ht*1.2),'taxe illustrative de 20 %')+'</div><div class="w3-split"><main><div class="w3-quote-head"><div><small>'+e(q.ref)+'</small><h3>'+e(q.client)+'</h3><p>État : <strong>'+e(q.status)+'</strong></p></div><span class="w3-tag">Devis fictif</span></div><div class="w3-quote-lines"><div class="w3-quote-label"><b>Prestation</b><b>Qté</b><b>Prix/u.</b><b>Montant</b></div>'+q.lines.map(x=>'<div class="w3-quote-line"><strong>'+e(x.label)+'</strong><span>'+x.quantity+'</span><span>'+euro(x.unit)+'</span><b>'+euro(x.quantity*x.unit)+'</b><div>'+act('− 1','decrement',x.id,'small')+act('+ 1','increment',x.id,'small')+'</div></div>').join('')+'</div><form data-w3-form="line" class="w3-form"><h3>Ajouter une prestation</h3>'+field('label','Description','text','maxlength="80" placeholder="Ex. Travaux complémentaires"')+field('quantity','Quantité','number','min="1" max="999" step="1" value="2"')+field('unit','Prix unitaire (€)','number','min="1" max="10000000" step="0.01" value="90"')+'<button type="submit" class="w3-button primary">Ajouter la ligne</button></form></main><aside><h3>Synthèse du devis</h3><div class="w3-sum"><p>HT <b>'+euro(ht)+'</b></p><p>Taxe indicative <b>'+euro(ht*.2)+'</b></p><p>Total TTC <strong>'+euro(ht*1.2)+'</strong></p></div>'+ (q.status==='brouillon'?act('Marquer comme envoyé','send','','primary'):q.status==='envoyé'?act('Marquer comme accepté','accept','','primary'):'<span class="w3-done">Proposition acceptée ✓</span>')+'<p>Modifier une prestation après envoi crée une nouvelle version brouillon. Aucun devis n’est envoyé à un client.</p>'+feed()+'</aside></div>';
}
function mission(){
 const planned=state.missions.reduce((n,x)=>n+x.planned,0),actual=state.missions.reduce((n,x)=>n+x.actual,0);
 return '<div class="w3-intro"><span>PRESTATIONS / ÉQUIPES / LIVRABLES</span><h2>MissionDesk</h2><p>Planifiez une mission, suivez le temps passé et faites passer un livrable en validation puis à l’état terminé.</p></div><div class="w3-stats">'+box('Missions',state.missions.length,'portefeuille local')+box('Heures prévues',planned+' h','charge estimée')+box('Heures enregistrées',actual+' h','simulation d’activité')+'</div><div class="w3-split"><main><form data-w3-form="mission" class="w3-form"><h3>Créer une mission</h3>'+field('client','Organisation','text','maxlength="75" placeholder="Ex. Studio Pilote"')+field('name','Intitulé','text','maxlength="85" placeholder="Ex. Portail collaborateurs"')+field('planned','Charge prévue (heures)','number','min="1" max="10000" value="18"')+'<button type="submit" class="w3-button primary">Créer la mission</button></form><div class="w3-mission-grid">'+state.missions.map(x=>'<article class="w3-mission"><div><small>'+e(x.client)+'</small><h4>'+e(x.name)+'</h4><span class="w3-tag">'+e(x.status)+'</span></div><div class="w3-meter"><i style="width:'+Math.min(100,Math.round(x.actual/x.planned*100))+'%"></i></div><p>'+x.actual+' h suivies / '+x.planned+' h prévues</p><p>Valeur indicative : '+euro(x.planned*x.rate)+'</p><div class="w3-actions">'+(x.status==='terminée'?'<span class="w3-done">Livraison clôturée ✓</span>':act('+ 2 h','track',x.id)+act(x.status==='en cours'?'Soumettre le livrable':'Clôturer la mission','advance',x.id,'primary'))+'</div></article>').join('')+'</div></main><aside><h3>Charge et livraison</h3><p>Les valeurs sont de simples scénarios fictifs. Les heures prévues ne constituent ni une facture ni une marge réelle. Le statut décrit une étape de coordination.</p><div class="w3-chain"><span>Mission</span><span>Suivi du temps</span><span>À livrer</span><span>Terminée</span></div>'+feed()+'</aside></div>';
}
const renderers={'intervention-360':intervention,'factureconnect':facture,'devis-atelier':devis,'missiondesk':mission};
function render(){root.innerHTML='<div class="w3-app"><header class="w3-top"><strong>DEUX RIVES / LAB</strong><div><span>DÉMONSTRATION · DONNÉES FICTIVES</span>'+act('Réinitialiser','reset','','reset')+'</div></header>'+renderers[id]()+ '<div class="w3-alert" role="status" aria-live="polite">'+e(msg)+'</div></div>';store.save();}
function file(name,value){const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500)}
root.addEventListener('click',ev=>{const target=ev.target.closest('[data-w3-action]');if(!target)return;const action=target.dataset.w3Action,entry=target.dataset.id;
 if(action==='reset'){state=template[id]();store.clear();msg='Scénario initial restauré.';render();return}
 if(id==='intervention-360'){
  const j=state.jobs.find(x=>x.id===entry);if(!j)return;
  if(action==='assign'&&j.status==='nouvelle'){j.tech='C. Martin';j.status='planifiée';log('Intervention '+j.title+' affectée')}
  else if(action==='start'&&j.status==='planifiée'){j.status='en cours';log('Intervention démarrée : '+j.title)}
  else if(action==='complete'&&j.status==='en cours'){j.status='terminée';j.notes.push('Compte rendu simulé : intervention effectuée');log('Intervention clôturée : '+j.title)}else return;
  msg='État de l’intervention actualisé.';
 }
 if(id==='factureconnect'){
  const inv=state.invoices.find(x=>x.id===entry);if(!inv)return;
  if(action==='verify'&&inv.status==='brouillon')inv.status='à vérifier';
  else if(action==='validate'&&inv.status==='à vérifier')inv.status='prête';
  else if(action==='export'&&inv.status==='prête'){file('factureconnect-dossier-fictif.json',{fictional:true,notARegulatedInvoice:true,...inv});inv.status='exportée'}else return;
  log('Dossier '+inv.reference+' : '+inv.status);msg='Dossier mis à jour.';
 }
 if(id==='devis-atelier'){
  const q=state.quote;
  if(action==='increment'||action==='decrement'){
   const line=q.lines.find(x=>x.id===entry);if(!line)return;
   line.quantity=Math.max(1,Math.min(999,line.quantity+(action==='increment'?1:-1)));
   if(q.status!=='brouillon'){q.version++;q.status='brouillon'}
   log('Quantité modifiée : '+line.label);
  }else if(action==='send'&&q.status==='brouillon'){q.status='envoyé';log('Devis marqué envoyé, sans communication externe')}
  else if(action==='accept'&&q.status==='envoyé'){q.status='accepté';log('Devis fictif accepté')}else return;
  msg='Devis recalculé.';
 }
 if(id==='missiondesk'){
  const m=state.missions.find(x=>x.id===entry);if(!m||m.status==='terminée')return;
  if(action==='track'){m.actual+=2;log('Temps mis à jour : '+m.name)}
  else if(action==='advance'){m.status=m.status==='en cours'?'à livrer':'terminée';log('Mission '+m.name+' : '+m.status)}else return;
  msg='Mission actualisée.';
 }
 render();
});
root.addEventListener('submit',ev=>{const f=ev.target.closest('[data-w3-form]');if(!f)return;ev.preventDefault();if(!f.reportValidity())return;const values=new FormData(f),kind=f.dataset.w3Form;
 if(kind==='job'&&id==='intervention-360'){
  const title=String(values.get('title')||'').trim().slice(0,80),client=String(values.get('client')||'').trim().slice(0,80);if(!title||!client)return;
  state.jobs.unshift({id:uid(),title,client,tech:'Non affecté',status:'nouvelle',priority:'Standard',notes:[]});log('Nouvelle intervention '+title);msg='Intervention créée.';
 }
 if(kind==='invoice'&&id==='factureconnect'){
  const customer=String(values.get('customer')||'').trim().slice(0,80),subtotal=Number(values.get('subtotal'));if(!customer||!moneyValid(subtotal))return;
  state.invoices.unshift({id:uid(),customer,subtotal,tax:Number((subtotal*.2).toFixed(2)),status:'brouillon',reference:'FAC-DEMO-'+Math.floor(Math.random()*900+100)});log('Facture fictive créée');msg='Brouillon créé.';
 }
 if(kind==='line'&&id==='devis-atelier'){
  const label=String(values.get('label')||'').trim().slice(0,80),quantity=Number(values.get('quantity')),unit=Number(values.get('unit'));
  if(!label||!Number.isInteger(quantity)||quantity<1||quantity>999||!moneyValid(unit))return;
  const q=state.quote;q.lines.push({id:uid(),label,quantity,unit});if(q.status!=='brouillon'){q.version++;q.status='brouillon'}log('Ligne ajoutée : '+label);msg='Prestation ajoutée.';
 }
 if(kind==='mission'&&id==='missiondesk'){
  const client=String(values.get('client')||'').trim().slice(0,75),name=String(values.get('name')||'').trim().slice(0,85),planned=Number(values.get('planned'));
  if(!client||!name||!Number.isInteger(planned)||planned<1||planned>10000)return;
  state.missions.unshift({id:uid(),client,name,planned,actual:0,rate:85,status:'en cours'});log('Mission créée : '+name);msg='Mission ajoutée.';
 }
 render();
});
render();
})();