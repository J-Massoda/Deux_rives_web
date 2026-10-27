/* Deux Rives Web Wave 4 — 16 browser-local, interactive concept laboratories.
 * No backend, tracking, payment, medical records, hiring decisions or real external integrations.
 * Illustrative datasets must not be used for production or client information.
 */
(()=>{'use strict';
const root=document.querySelector('[data-wave4-app]');if(!root)return;
const catalog=window.DRW_WAVE4_CATALOG;
const id=root.dataset.wave4App,definition=Array.isArray(catalog)?catalog.find(x=>x.id===id):null;
if(!definition){root.textContent='Démonstration indisponible';return}
const key='drw:wave4:v1:'+id,kind=definition.kind;
const copy=x=>JSON.parse(JSON.stringify(x)),fmt=new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0});
const eur=n=>fmt.format(Number(n)||0),newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const seed=()=>({items:copy(definition.items),history:['Scénario fictif initialisé'],lastChange:0});
const local={read(){try{return JSON.parse(localStorage.getItem(key))}catch{return null}},save(x){try{localStorage.setItem(key,JSON.stringify(x))}catch{}},clear(){try{localStorage.removeItem(key)}catch{}}};
let state=local.read();if(!state||!Array.isArray(state.items)||!Array.isArray(state.history)||state.items.length>200)state=seed();
let alert='';
const act=(label,action,item='',style='')=>'<button type="button" data-w4-action="'+action+'" data-key="'+esc(item)+'" class="w4-button '+style+'">'+label+'</button>';
const note=title=>'<div class="w4-flag"><span aria-hidden="true">◌</span> '+esc(title)+'</div>';
const rows=()=>state.items;
const summary=(label,value,sub)=>'<div class="w4-kpi"><small>'+label+'</small><strong>'+value+'</strong><span>'+sub+'</span></div>';
const statBar=()=>{
 const n=rows().length,finished=['workflow','learning'].includes(kind)?rows().filter(x=>x.status===definition.stages.at(-1)).length:0;
 if(['workflow','learning'].includes(kind))return summary('Dossiers fictifs',n,'Dans ce scénario')+summary('Étapes clôturées',finished,'Historique local')+summary('Actions restantes',n-finished,'À examiner');
 if(kind==='capacity')return summary('Sessions',n,'Activités proposées')+summary('Réservations',rows().reduce((x,r)=>x+r.booked,0),'Simulées')+summary('Places libres',rows().reduce((x,r)=>x+r.capacity-r.booked,0),'Capacité disponible');
 if(kind==='inventory')return summary('Références',n,'Catalogue B2B')+summary('Unités disponibles',rows().reduce((x,r)=>x+r.stock,0),'Stock de démonstration')+summary('Montant simulé',eur(state.total||0),'Commandes fictives');
 if(kind==='calendar')return summary('Créneaux',n,'Agenda fictif')+summary('Réservés',rows().filter(x=>x.reserved).length,'Sans identité')+summary('Libres',rows().filter(x=>!x.reserved).length,'Réservables');
 if(kind==='fleet')return summary('Parc illustratif',n,'Véhicules')+summary('Disponibles',rows().filter(x=>x.status==='disponible').length,'En circulation')+summary('En maintenance',rows().filter(x=>x.status!=='disponible').length,'Immobilisés');
 if(kind==='quality')return summary('Lots fictifs',n,'À contrôler')+summary('Non conformes',rows().filter(x=>x.quality==='non conforme').length,'Bloqués')+summary('Libérés',rows().filter(x=>x.released).length,'Après contrôle');
 return summary('Indicateurs',n,'Données synthétiques')+summary('Sous la cible',rows().filter(x=>x.value<x.target).length,'À analyser')+summary('Alertes à reprendre',rows().filter(x=>x.value<x.target&&!x.ack).length,'Non acquittées');
};
const workflow=()=>{
 const groups=definition.stages;return '<div class="w4-stage-grid">'+groups.map((stage,i)=>
 '<section class="w4-stage"><div class="w4-stage-head"><b>0'+(i+1)+' / '+esc(stage)+'</b><span>'+rows().filter(x=>x.status===stage).length+'</span></div>'+
 rows().filter(x=>x.status===stage).map(r=>'<article class="w4-record"><small>DOSSIER '+esc(r.id||'DEMO')+'</small><h4>'+esc(r.title)+'</h4><p>'+esc(r.detail)+'</p><span class="w4-state">'+esc(r.status)+'</span>'+ (i<groups.length-1?act('Étape suivante →','next',r.id,'w4-light'):'<span class="w4-complete">Traitement terminé ✓</span>')+'</article>').join('')+'</section>').join('')+'</div>'+
 '<form data-w4-form="new" class="w4-form"><h3>Créer un'+(kind==='learning'?'e ': ' ')+esc(definition.noun)+'</h3><label>Libellé<input name="title" required maxlength="85" placeholder="'+esc(definition.placeholder)+'"></label><label>Contexte<input name="detail" required maxlength="100" placeholder="Précisez un contexte fictif"></label><button class="w4-button primary" type="submit">Ajouter au scénario</button></form>';
};
const capacities=()=>'<div class="w4-capacity-grid">'+rows().map(r=>{
 const available=r.capacity-r.booked;
 return '<article class="w4-capacity"><span class="w4-mini-eyebrow">SESSION DE DÉMONSTRATION</span><h4>'+esc(r.title)+'</h4><div class="w4-capacity-number"><strong>'+available+'</strong><span>/ '+r.capacity+' '+esc(definition.unit)+'</span></div><div class="w4-track"><i style="width:'+Math.round(r.booked/r.capacity*100)+'%"></i></div><p>'+r.booked+' inscriptions fictives enregistrées</p><div class="w4-action-row">'+act('Réserver 1 place','reserve',r.title,'primary'+(available===0?' disabled-look':''))+act('Annuler 1','unreserve',r.title)+'</div></article>';
 }).join('')+'</div>';
const inventory=()=>'<div class="w4-commerce-grid">'+rows().map(r=>
 '<article class="w4-stock"><div class="w4-stock-cover" aria-hidden="true">▤</div><small>'+esc(r.sku)+'</small><h4>'+esc(r.title)+'</h4><div class="w4-stock-split"><span>'+eur(r.price)+' / unité</span><strong>'+r.stock+' unités</strong></div><form data-w4-form="order" data-key="'+esc(r.sku)+'" class="w4-order-form"><label>Quantité <input name="quantity" type="number" min="1" max="999" value="1" required></label><button type="submit" class="w4-button primary">Commander</button></form>'+act('+ 5 unités fictives','restock',r.sku,'w4-light')+'</article>').join('')+'</div>';
const calendar=()=>'<div class="w4-cal-grid">'+rows().map((r,i)=>'<article class="w4-slot '+(r.reserved?'is-reserved':'')+'"><span>CRÉNEAU '+String(i+1).padStart(2,'0')+'</span><h4>'+esc(r.title)+'</h4><p>'+ (r.reserved?'Réservation fictive confirmée':'Disponible dans cette démonstration')+'</p>'+act(r.reserved?'Annuler la réservation':'Réserver le créneau','toggle',r.title,r.reserved?'':'primary')+'</article>').join('')+'</div>';
const fleet=()=>'<div class="w4-fleet-grid">'+rows().map(r=>'<article class="w4-fleet '+(r.status==='maintenance'?'is-maintenance':'')+'"><div class="w4-fleet-icon">▰</div><div><small>PARC · '+esc(r.status)+'</small><h4>'+esc(r.title)+'</h4><p>Compteur de démonstration : '+Number(r.mileage).toLocaleString('fr-FR')+' km</p></div>'+act(r.status==='disponible'?'Mettre en maintenance':'Remettre en service','fleet',r.title,r.status==='disponible'?'':'primary')+'</article>').join('')+'</div>';
const quality=()=>'<div class="w4-quality-grid">'+rows().map(r=>'<article class="w4-lot"><div class="w4-lot-head"><span>LOT DE DÉMONSTRATION</span><strong>'+esc(r.title)+'</strong></div><div class="w4-lot-status '+(r.quality==='non conforme'?'is-danger':'')+'">'+esc(r.quality)+'</div><p>'+ (r.released?'Libération fictive confirmée':'La libération nécessite un contrôle conforme.')+'</p><div class="w4-action-row">'+act('Conforme','pass',r.title,'w4-light')+act('Non conforme','fail',r.title)+act('Libérer','release',r.title,'primary')+'</div></article>').join('')+'</div>';
const analytics=()=>'<div class="w4-metrics-grid">'+rows().map(r=>{
 const gap=r.value-r.target,warning=gap<0;
 return '<article class="w4-metric"><small>MESURE SYNTHÉTIQUE</small><h4>'+esc(r.title)+'</h4><div class="w4-metric-row"><strong>'+r.value+esc(r.unit)+'</strong><span>Cible : '+r.target+esc(r.unit)+'</span></div><div class="w4-meter"><i style="width:'+Math.min(100,Math.max(0,r.value))+'%"></i><b style="left:'+Math.min(100,r.target)+'%"></b></div><p>'+ (warning?'Sous la cible de '+Math.abs(gap)+' points':'Objectif atteint ou dépassé')+'</p><div class="w4-action-row">'+act('− 5 points','down',r.title)+act('+ 5 points','up',r.title)+ (warning?act(r.ack?'Alerte acquittée':'Prendre en charge','ack',r.title,'primary'):'')+'</div></article>';
 }).join('')+'</div>';
const view={workflow,learning:workflow,capacity:capacities,inventory,calendar,fleet,quality,analytics};
function render(){
 root.innerHTML='<div class="w4-shell" data-kind="'+esc(kind)+'"><div class="w4-top"><div><small>DEUX RIVES WEB · EXPLORATION MÉTIER</small><strong>'+esc(definition.name)+'</strong></div><div><span class="w4-demo-tag">Données fictives · navigateur uniquement</span>'+act('Réinitialiser','reset','','reset')+'</div></div>'+
 '<div class="w4-heading"><span>'+esc(definition.sector)+'</span><h2>'+esc(definition.name)+'</h2><p>'+esc(definition.lead)+'</p></div>'+
 '<div class="w4-stats">'+statBar()+'</div><div class="w4-body"><div class="w4-workspace">'+view[kind]()+'</div><aside class="w4-sidebar"><span class="w4-mini-eyebrow">PARCOURS À ESSAYER</span><h3>Un scénario métier. Des décisions visibles.</h3><ol>'+definition.flow.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><div class="w4-history"><h3>Journal local</h3><ul>'+state.history.slice(-6).reverse().map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><p class="w4-disclaimer">Cette interface est un prototype fonctionnel, sans compte utilisateur, serveur, notification réelle ni intégration externe. Ne saisissez aucune donnée personnelle.</p></aside></div><p class="w4-status" role="status" aria-live="polite">'+esc(alert)+'</p></div>';
 local.save(state);
}
function record(key,type='id'){return rows().find(x=>String(x[type])===String(key))}
function push(message){state.history.push(message);state.history=state.history.slice(-25);state.lastChange=Date.now();}
root.addEventListener('click',ev=>{
 const btn=ev.target.closest('[data-w4-action]');if(!btn)return;
 const action=btn.dataset.w4Action,k=btn.dataset.key;
 if(action==='reset'){state=seed();local.clear();alert='Démonstration remise à zéro.';render();return}
 if(['workflow','learning'].includes(kind)&&action==='next'){
  const r=record(k),i=r&&definition.stages.indexOf(r.status);
  if(i===undefined||i<0||i>=definition.stages.length-1)return;
  r.status=definition.stages[i+1];push(r.title+' : '+r.status);alert='Étape validée.';
 }
 else if(kind==='capacity'&&(action==='reserve'||action==='unreserve')){
  const r=record(k,'title');if(!r)return;
  if(action==='reserve'&&r.booked<r.capacity){r.booked++;push('Réservation fictive : '+r.title)}
  else if(action==='unreserve'&&r.booked>0){r.booked--;push('Annulation : '+r.title)}
  else {alert='Aucune place disponible ou réservation à annuler.';render();return}
  alert='Capacité recalculée.';
 }
 else if(kind==='inventory'&&action==='restock'){
  const r=record(k,'sku');if(!r)return;r.stock+=5;push('Réapprovisionnement fictif : '+r.sku);alert='Stock mis à jour.';
 }
 else if(kind==='calendar'&&action==='toggle'){
  const r=record(k,'title');if(!r)return;r.reserved=!r.reserved;push((r.reserved?'Réservation':'Annulation')+' : '+r.title);alert='Disponibilités recalculées.';
 }
 else if(kind==='fleet'&&action==='fleet'){
  const r=record(k,'title');if(!r)return;r.status=r.status==='disponible'?'maintenance':'disponible';push('Parc '+r.title+' : '+r.status);alert='État du véhicule actualisé.';
 }
 else if(kind==='quality'&&['pass','fail','release'].includes(action)){
  const r=record(k,'title');if(!r)return;
  if(r.released){alert='Ce lot fictif est déjà libéré. Réinitialisez pour reprendre.';render();return}
  if(action==='pass')r.quality='conforme';
  if(action==='fail')r.quality='non conforme';
  if(action==='release'){
   if(r.quality!=='conforme'){alert='Libération bloquée : le lot doit être conforme.';render();return}
   r.released=true;
  }
  push(r.title+' : '+(r.released?'libéré':r.quality));alert='Contrôle mis à jour.';
 }
 else if(kind==='analytics'&&['down','up','ack'].includes(action)){
  const r=record(k,'title');if(!r)return;
  if(action==='ack'){if(r.value>=r.target)return;r.ack=true}
  else{r.value=Math.max(0,Math.min(100,r.value+(action==='up'?5:-5)));r.ack=false}
  push(r.title+' : '+r.value+r.unit+(r.ack?' (écart pris en charge)':''));alert='Indicateur recalculé.';
 }
 else return;
 render();
});
root.addEventListener('submit',ev=>{
 const form=ev.target.closest('[data-w4-form]');if(!form)return;ev.preventDefault();if(!form.reportValidity())return;
 const data=new FormData(form),type=form.dataset.w4Form;
 if(type==='new'&&['workflow','learning'].includes(kind)){
  const title=String(data.get('title')??'').trim().slice(0,85),detail=String(data.get('detail')??'').trim().slice(0,100);
  if(!title||!detail||rows().length>=100)return;
  state.items.unshift({id:newId(),title,detail,status:definition.stages[0]});
  push('Création du dossier fictif : '+title);alert='Nouvelle entrée ajoutée.';
 }
 else if(type==='order'&&kind==='inventory'){
  const r=record(form.dataset.key,'sku'),quantity=Number(data.get('quantity'));
  if(!r||!Number.isInteger(quantity)||quantity<=0||quantity>999)return;
  if(quantity>r.stock){alert='Stock insuffisant : commande refusée.';render();return}
  r.stock-=quantity;state.total=(state.total||0)+quantity*r.price;
  push('Commande B2B fictive : '+quantity+' × '+r.sku);alert='Commande simulée. Stock et total recalculés.';
 }
 else return;
 render();
});
render();
})();