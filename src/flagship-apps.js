/* Deux Rives Web — four self-contained, client-side showcase applications.
 * No personal data, server requests, authentication, AI inference, or real invoices.
 * Each demo uses fictional seeded records; its state can be reset in one click.
 */
(()=>{'use strict';
const root=document.querySelector('[data-flagship-app]');if(!root)return;
const id=root.dataset.flagshipApp, key='drw:demo:v2:'+id;
const text=s=>String(s??'');
const esc=s=>text(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=v=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(Number(v)||0);
const deep=o=>JSON.parse(JSON.stringify(o));
const uid=()=>Math.random().toString(36).slice(2,9);
const clamp=(v,min,max)=>Math.min(max,Math.max(min,Number(v)||0));
const demoSeed={
'clientflow-pro':()=>({leads:[
{id:'l1',company:'Atelier Lierre',contact:'Camille Laurent',amount:12500,stage:'nouveau'},
{id:'l2',company:'Maison Ardent',contact:'Noah Bernard',amount:28500,stage:'qualifie'},
{id:'l3',company:'Studio Noro',contact:'Émilie Roche',amount:18500,stage:'proposition'}],
missions:[],history:['Démonstration initialisée avec trois opportunités fictives']}),
'chantierpilot':()=>({tasks:[
{id:'c1',label:'Préparation et relevés',budget:4200,spent:3900,progress:100},
{id:'c2',label:'Installation technique',budget:11200,spent:6200,progress:50},
{id:'c3',label:'Contrôle et réception',budget:4800,spent:600,progress:0}],
history:['Projet fictif : rénovation Centre Bordeaux']}),
'commercepilot':()=>({products:[
{id:'p1',label:'Lampe Atelier',sku:'LA-101',stock:17,min:7,price:85},
{id:'p2',label:'Table Chêne',sku:'TC-202',stock:4,min:6,price:340},
{id:'p3',label:'Chaise Riviera',sku:'CR-303',stock:22,min:9,price:120}],
orders:[],movements:[]}),
'docupilot-ai':()=>({docs:[
{id:'d1',name:'Facture fournisseur A-104',issuer:'Atelier Exemple',subtotal:1200,tax:240,amount:1440,status:'à analyser',note:'Montants cohérents'},
{id:'d2',name:'Facture fournisseur B-205',issuer:'Maison Fictive',subtotal:760,tax:152,amount:995,status:'à analyser',note:'Écart volontaire de 83 € à corriger'},
{id:'d3',name:'Devis prestation C-018',issuer:'Studio Démonstration',subtotal:1850,tax:370,amount:2220,status:'à analyser',note:'Montants cohérents'}],
selected:'d2',history:[]})
};
if(!demoSeed[id]){root.textContent='Démonstration inconnue';return}
const storageSafe={get:()=>{try{return JSON.parse(localStorage.getItem(key))}catch{return null}},set:v=>{try{localStorage.setItem(key,JSON.stringify(v))}catch{}},clear:()=>{try{localStorage.removeItem(key)}catch{}}};
const validState=s=>id==='clientflow-pro'?(Array.isArray(s.leads)&&Array.isArray(s.missions))
:id==='chantierpilot'?Array.isArray(s.tasks)
:id==='commercepilot'?(Array.isArray(s.products)&&Array.isArray(s.orders))
:(Array.isArray(s.docs)&&typeof s.selected==='string');
let state=storageSafe.get();if(!state||typeof state!=='object'||!validState(state))state=demoSeed[id]();
let notice='';
const button=(label,act,item='',cls='')=>'<button type="button" class="live-button '+cls+'" data-act="'+act+'" data-id="'+esc(item)+'">'+label+'</button>';
const header=(eyebrow,title,desc)=>'<div class="live-heading"><div><span class="live-eyebrow">'+eyebrow+'</span><h2>'+title+'</h2><p>'+desc+'</p></div><div class="live-badges"><span>Mode démonstration</span><span>Données fictives</span></div></div>';
const infoRows=(values)=>'<div class="live-stats">'+values.map(([a,b,c])=>'<div><span>'+a+'</span><strong>'+b+'</strong><small>'+c+'</small></div>').join('')+'</div>';
const feed=entries=>'<div class="live-history"><strong>Journal des actions</strong><ul>'+entries.slice(-5).reverse().map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>';
const leadStages=['nouveau','qualifie','proposition','gagne'];
const leadLabels={'nouveau':'Nouveaux','qualifie':'Qualifiés','proposition':'Propositions','gagne':'Acceptés'};
function clientFlow(){
const leads=state.leads;const total=leads.reduce((n,l)=>n+l.amount,0);
return header('01 / CRM & opérations de services','ClientFlow Pro','Créez une opportunité, faites-la progresser puis ouvrez une mission. Les données restent dans ce navigateur, jusqu’à la réinitialisation.')+
infoRows([['Opportunités',leads.length,'Dossiers du pipeline'],['Valeur indicative',money(total),'Montants fictifs'],['Missions créées',state.missions.length,'Après acceptation']])+
'<div class="live-columns"><div class="live-main"><form class="live-form" data-form="lead"><h3>Ajouter une opportunité</h3><label>Entreprise<input name="company" required maxlength="70" placeholder="Ex. Atelier Exemple"></label><label>Contact<input name="contact" required maxlength="70" placeholder="Nom du contact"></label><label>Montant estimé (€)<input name="amount" type="number" min="1" max="9999999" required value="7500"></label><button type="submit" class="live-button primary">Créer l’opportunité</button></form><div class="live-kanban">'+leadStages.map(stage=>'<section class="live-lane"><div class="live-lane-head"><strong>'+leadLabels[stage]+'</strong><span>'+leads.filter(x=>x.stage===stage).length+'</span></div>'+leads.filter(x=>x.stage===stage).map(l=>'<article class="live-record"><small>PROJET '+esc(l.id.toUpperCase())+'</small><h4>'+esc(l.company)+'</h4><p>'+esc(l.contact)+'</p><b>'+money(l.amount)+'</b>'+ (stage==='gagne'?'<span class="live-chip success">Mission à préparer</span>':button('Étape suivante →','advance',l.id,'subtle'))+'</article>').join('')+'</section>').join('')+'</div></div><aside class="live-aside"><h3>Missions déclenchées</h3><p>Une proposition acceptée devient une mission de préparation.</p>'+ (state.missions.length?state.missions.map(m=>'<article class="live-record"><strong>'+esc(m.company)+'</strong><small>Créée depuis l’opportunité '+esc(m.leadId)+'</small><span class="live-chip success">À cadrer</span></article>').join(''):'<div class="live-empty">Aucune mission créée. Faites progresser une opportunité jusqu’à « Acceptés ».</div>')+feed(state.history)+'</aside></div>';
}
function chantier(){
 const totalBudget=state.tasks.reduce((t,x)=>t+x.budget,0),totalSpent=state.tasks.reduce((t,x)=>t+x.spent,0);
 const completion=state.tasks.length?Math.round(state.tasks.reduce((t,x)=>t+x.progress,0)/state.tasks.length):0;
 return header('02 / Bâtiment & chantier','ChantierPilot','Ajoutez un lot, faites évoluer son avancement et enregistrez une dépense. Le budget, le coût engagé et l’écart se recalculent immédiatement.')+
 infoRows([['Budget prévisionnel',money(totalBudget),'Somme des lots'],['Coûts engagés',money(totalSpent),'Dépenses enregistrées'],['Avancement global',completion+' %','Moyenne des lots'],['Écart actuel',money(totalBudget-totalSpent),'Budget moins coûts engagés']])+
 '<div class="live-columns"><div class="live-main"><form class="live-form live-form-inline" data-form="lot"><h3>Ajouter un lot de chantier</h3><label>Lot<input name="label" required maxlength="65" placeholder="Ex. Revêtements"></label><label>Budget (€)<input name="budget" type="number" min="1" max="9999999" required value="3000"></label><button type="submit" class="live-button primary">Ajouter</button></form><div class="live-task-list">'+state.tasks.map(task=>'<article class="live-task"><div class="live-task-header"><div><small>LOT '+esc(task.id.toUpperCase())+'</small><h4>'+esc(task.label)+'</h4></div><span>'+task.progress+' %</span></div><div class="live-progress"><i style="width:'+task.progress+'%"></i></div><div class="live-task-metrics"><span>Budget '+money(task.budget)+'</span><span>Engagé '+money(task.spent)+'</span><span>Reste '+money(task.budget-task.spent)+'</span></div><div class="live-task-controls">'+button('+ 25 % d’avancement','progress',task.id,'subtle')+button('+ 250 € dépensés','spend',task.id,'subtle')+'</div></article>').join('')+'</div></div><aside class="live-aside"><h3>Suivi d’exécution</h3><p>L’écart présenté est une différence arithmétique entre budget initial et coûts engagés. Il ne représente pas une marge finale.</p><div class="live-calculation"><div><span>Budget total</span><b>'+money(totalBudget)+'</b></div><div><span>Consommé</span><b>'+money(totalSpent)+'</b></div><div><span>Solde actuel</span><strong>'+money(totalBudget-totalSpent)+'</strong></div></div>'+button('Exporter rapport CSV','report','')+feed(state.history)+'</aside></div>';
}
function commerce(){
 const low=state.products.filter(x=>x.stock<x.min),pending=state.orders.filter(x=>x.status==='à réceptionner');
 return header('03 / Commerce & approvisionnement','CommercePilot','Vendez une unité, créez un bon de commande et réceptionnez le stock. Chaque mouvement modifie les quantités et les alertes.')+
 infoRows([['Références',state.products.length,'Catalogue fictif'],['Seuils franchis',low.length,'Produits à réapprovisionner'],['Commandes ouvertes',pending.length,'À réceptionner']])+
 '<div class="live-columns"><div class="live-main"><div class="live-product-list">'+state.products.map(p=>'<article class="live-product"><div class="live-product-icon">▧</div><div><small>'+esc(p.sku)+'</small><h4>'+esc(p.label)+'</h4><p>Prix unitaire fictif : '+money(p.price)+'</p></div><div class="live-product-action"><strong>'+p.stock+' en stock</strong><span class="live-chip '+(p.stock<p.min?'warn':'')+'">Seuil : '+p.min+'</span>'+button('Vendre 1','sell',p.id,'subtle')+'</div></article>').join('')+'</div><form class="live-form live-form-inline" data-form="order"><h3>Créer un bon de commande fournisseur</h3><label>Produit<select name="product">'+state.products.map(p=>'<option value="'+esc(p.id)+'">'+esc(p.label)+'</option>').join('')+'</select></label><label>Quantité<input name="quantity" type="number" min="1" max="9999" required value="10"></label><button class="live-button primary" type="submit">Commander</button></form></div><aside class="live-aside"><h3>Commandes fournisseurs</h3>'+ (state.orders.length?state.orders.map(o=>'<article class="live-record"><small>BC-'+esc(o.id)+'</small><h4>'+esc(state.products.find(p=>p.id===o.product)?.label||'Référence')+'</h4><p>Quantité : '+o.quantity+'</p><span class="live-chip">'+esc(o.status)+'</span>'+ (o.status==='à réceptionner'?button('Réceptionner','receive',o.id,'subtle'):'')+'</article>').join(''):'<div class="live-empty">Aucune commande fournisseur enregistrée.</div>')+'<h3>Derniers mouvements</h3>'+ (state.movements.length?'<ul class="live-moves">'+state.movements.slice(-5).reverse().map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'<p>Le journal apparaîtra après la première vente ou réception.</p>')+'</aside></div>';
}
function docu(){
 const doc=state.docs.find(x=>x.id===state.selected)||state.docs[0];const expected=doc.subtotal+doc.tax;const match=Math.abs(doc.amount-expected)<0.01;
 const approved=state.docs.filter(x=>x.status==='validé').length;
 return header('04 / Vérification documentaire','DocuPilot AI','Scénario d’extraction simulée et déterministe : choisissez un document fictif, lancez son contrôle, corrigez un écart et validez. Aucune IA ni analyse de fichier réel n’est exécutée.')+
 infoRows([['Documents tests',state.docs.length,'Exemples intégrés'],['Validés',approved,'Après contrôle humain'],['À vérifier',state.docs.filter(x=>x.status==='à contrôler').length,'Écarts signalés']])+
 '<div class="live-columns"><div class="live-main"><div class="live-doc-list">'+state.docs.map(d=>'<button type="button" class="live-document '+(doc.id===d.id?'selected':'')+'" data-act="select" data-id="'+esc(d.id)+'"><strong>▤ '+esc(d.name)+'</strong><small>'+esc(d.status)+'</small></button>').join('')+'</div><div class="live-paper"><small>EXEMPLE DOCUMENTAIRE · '+esc(doc.id.toUpperCase())+'</small><h3>'+esc(doc.name)+'</h3><p>Émetteur : '+esc(doc.issuer)+'</p><div><span>Sous-total fictif</span><strong>'+money(doc.subtotal)+'</strong></div><div><span>Taxe illustrative</span><strong>'+money(doc.tax)+'</strong></div><div><span>Total déclaré</span><strong>'+money(doc.amount)+'</strong></div><p class="live-note">Les montants sont des valeurs d’exemple, sans portée fiscale ni comptable.</p></div></div><aside class="live-aside"><h3>Contrôle et validation</h3><p>'+esc(doc.note)+'</p><div class="live-chip '+(match?'success':'warn')+'">'+(match?'Montants cohérents':'Écart détecté : '+money(Math.abs(doc.amount-expected)))+'</div><p>État : <strong>'+esc(doc.status)+'</strong></p>'+ (doc.status==='à analyser'?button('Analyser le document test','analyse',doc.id,'primary'):'')+
 (doc.status==='à contrôler'?'<form class="live-form live-doc-form" data-form="document"><label>Corriger le total déclaré (€)<input name="amount" type="number" required min="0.01" max="9999999" step="0.01" value="'+doc.amount+'"></label><button type="submit" class="live-button">Enregistrer la correction</button></form>'+ (match?button('Valider après vérification','approve',doc.id,'primary'):'<p class="live-warning">Le total doit correspondre à sous-total + taxe pour être validé.</p>'):'')+
 (doc.status==='validé'?button('Exporter les données JSON','export',doc.id,'primary'):'')+
 '<p class="live-note">Données synthétiques. Le traitement ne charge pas de fichiers, n’appelle aucun modèle et ne constitue pas une vérification comptable.</p>'+feed(state.history)+'</aside></div>';
}
const renderers={'clientflow-pro':clientFlow,'chantierpilot':chantier,'commercepilot':commerce,'docupilot-ai':docu};
function render(){
 root.innerHTML='<div class="live-app"><div class="live-global"><strong>◈ '+esc({'clientflow-pro':'ClientFlow Pro','chantierpilot':'ChantierPilot','commercepilot':'CommercePilot','docupilot-ai':'DocuPilot AI'}[id])+'</strong><div>'+button('Réinitialiser la démonstration','reset','','reset')+'</div></div>'+renderers[id]()+ '<p class="live-toast" role="status" aria-live="polite">'+esc(notice)+'</p></div>';
 storageSafe.set(state);
}
const log=msg=>{if(!state.history)state.history=[];state.history.push(msg);if(state.history.length>25)state.history.shift()};
function download(filename,body,type){const blob=new Blob([body],{type});const a=document.createElement('a');const u=URL.createObjectURL(blob);a.href=u;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}
root.addEventListener('click',e=>{
 const b=e.target.closest('[data-act]');if(!b)return;const act=b.dataset.act,item=b.dataset.id;
 if(act==='reset'){state=demoSeed[id]();storageSafe.clear();notice='Scénario réinitialisé.';render();return;}
 if(id==='clientflow-pro' && act==='advance'){
  const lead=state.leads.find(x=>x.id===item);if(!lead)return;
  const i=leadStages.indexOf(lead.stage);if(i>=leadStages.length-1)return;lead.stage=leadStages[i+1];
  if(lead.stage==='gagne'&&!state.missions.some(m=>m.leadId===item))state.missions.unshift({id:uid(),leadId:item,company:lead.company});
  log(lead.company+' : étape '+leadLabels[lead.stage]);notice='Opportunité mise à jour.';
 }
 if(id==='chantierpilot'&&(act==='progress'||act==='spend')){
  const task=state.tasks.find(x=>x.id===item);if(!task)return;
  if(act==='progress')task.progress=clamp(task.progress+25,0,100);else task.spent+=250;
  log(task.label+' : '+(act==='progress'?'progression à '+task.progress+' %':'dépense +250 €'));notice='Chantier recalculé.';
 }
 if(id==='chantierpilot'&&act==='report'){
  const lines=['Lot;Budget EUR;Cout engage EUR;Avancement pour cent',...state.tasks.map(t=>[t.label,t.budget,t.spent,t.progress].join(';'))];
  download('chantierpilot-rapport-fictif.csv','\uFEFF'+lines.join('\n'),'text/csv;charset=utf-8');notice='Rapport CSV fictif exporté.';
 }
 if(id==='commercepilot'&&act==='sell'){
  const p=state.products.find(x=>x.id===item);if(!p)return;
  if(!p.stock){notice='Stock insuffisant : commande fournisseur nécessaire.';render();return}
  p.stock--;state.movements.push('Vente de 1 unité — '+p.label);notice='Stock mis à jour.';
 }
 if(id==='commercepilot'&&act==='receive'){
  const o=state.orders.find(x=>x.id===item);if(!o||o.status!=='à réceptionner')return;
  const p=state.products.find(x=>x.id===o.product);if(!p)return;
  p.stock+=o.quantity;o.status='réceptionnée';state.movements.push('Réception '+o.quantity+' unités — '+p.label);notice='Réception enregistrée.';
 }
 if(id==='docupilot-ai'&&act==='select'){state.selected=item;notice='';}
 if(id==='docupilot-ai'&&act==='analyse'){
  const d=state.docs.find(x=>x.id===item);if(!d)return;
  d.status='à contrôler';log('Contrôle simulé : '+d.name);notice='Analyse déterministe terminée. Vérifiez les champs.';
 }
 if(id==='docupilot-ai'&&act==='approve'){
  const d=state.docs.find(x=>x.id===item);if(!d||d.status!=='à contrôler')return;
  if(Math.abs(d.amount-(d.subtotal+d.tax))>=0.01){notice='Montant incohérent : validation impossible.';render();return}
  d.status='validé';log('Validation humaine : '+d.name);notice='Document fictif validé.';
 }
 if(id==='docupilot-ai'&&act==='export'){
  const d=state.docs.find(x=>x.id===item);if(!d||d.status!=='validé')return;
  const payload={source:'Deux Rives Web — démonstration',fictional:true,document:{name:d.name,issuer:d.issuer,subtotal:d.subtotal,tax:d.tax,total:d.amount,status:d.status}};
  download('docupilot-validation-fictive.json',JSON.stringify(payload,null,2),'application/json');notice='JSON fictif exporté.';
 }
 render();
});
root.addEventListener('submit',e=>{
 const form=e.target.closest('[data-form]');if(!form)return;e.preventDefault();if(!form.reportValidity())return;
 const values=new FormData(form);const kind=form.dataset.form;
 if(kind==='lead'&&id==='clientflow-pro'){
  const company=text(values.get('company')).trim().slice(0,70),contact=text(values.get('contact')).trim().slice(0,70),amount=Number(values.get('amount'));
  if(!company||!contact||amount<=0||amount>9999999)return;
  state.leads.unshift({id:uid(),company,contact,amount,stage:'nouveau'});log('Nouvelle opportunité : '+company);notice='Opportunité créée.';
 }
 if(kind==='lot'&&id==='chantierpilot'){
  const label=text(values.get('label')).trim().slice(0,65),budget=Number(values.get('budget'));
  if(!label||budget<=0||budget>9999999)return;
  state.tasks.push({id:uid(),label,budget,spent:0,progress:0});log('Lot ajouté : '+label);notice='Lot créé.';
 }
 if(kind==='order'&&id==='commercepilot'){
  const product=text(values.get('product')),quantity=Number(values.get('quantity'));
  if(!state.products.some(x=>x.id===product)||!Number.isInteger(quantity)||quantity<1||quantity>9999)return;
  state.orders.unshift({id:uid(),product,quantity,status:'à réceptionner'});state.movements.push('Bon de commande : '+quantity+' unités');notice='Commande fournisseur créée.';
 }
 if(kind==='document'&&id==='docupilot-ai'){
  const d=state.docs.find(x=>x.id===state.selected);const amount=Number(values.get('amount'));
  if(!d||d.status!=='à contrôler'||!Number.isFinite(amount)||amount<=0||amount>9999999)return;
  d.amount=amount;log('Correction enregistrée pour '+d.name);notice='Champ mis à jour. Vérifiez la cohérence.';
 }
 render();
});
render();
})();
