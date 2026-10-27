/* Shared state controller, 16 tailored fictional business workflows.
 * No server, no personal data, no regulated action or real external integration.
 */
(()=>{'use strict';const root=document.querySelector('[data-wave4-app]');if(!root)return;
const escape=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const data=JSON.parse(root.querySelector('script[type="application/json"]').textContent);
const key='drw:wave4:v1:'+data.id;
const seed=()=>({items:data.records.map((r,i)=>({id:'seed'+i,a:r[0],b:r[1],stage:r[2],notes:[]})),history:[]});
let state;try{state=JSON.parse(localStorage.getItem(key))}catch{};if(!state||!Array.isArray(state.items)||!Array.isArray(state.history))state=seed();
let message='';
const write=()=>{try{localStorage.setItem(key,JSON.stringify(state))}catch{}};
const button=(label,action,id,variant='')=>'<button class="w4-button '+variant+'" type="button" data-action="'+action+'" data-id="'+escape(id||'')+'">'+label+'</button>';
function render(){
 const counts=data.stages.map((stage,i)=>[stage,state.items.filter(r=>r.stage===i).length]);
 root.querySelector('.w4-workspace').innerHTML=
 '<header class="w4-app-header"><div><span>ESPACE MÉTIER FICTIF · '+escape(data.kind)+'</span><h2>'+escape(data.label)+'</h2><p>'+escape(data.intro)+'</p></div>'+button('Réinitialiser','reset','','secondary')+'</header>'+
 '<div class="w4-metrics">'+counts.map(([name,count])=>'<div><b>'+count+'</b><small>'+escape(name)+'</small></div>').join('')+'</div>'+
 '<div class="w4-workgrid"><div class="w4-main"><form class="w4-form"><h3>Créer un dossier</h3><label>'+escape(data.fields[0])+'<input name="a" required maxlength="80" autocomplete="off" placeholder="Référence fictive"></label><label>'+escape(data.fields[1])+'<input name="b" required maxlength="80" autocomplete="off" placeholder="Description fictive"></label><button class="w4-button primary" type="submit">Ajouter au flux</button></form>'+
 '<div class="w4-lanes">'+data.stages.map((stage,i)=>'<section><div class="w4-lane-head"><b>'+String(i+1).padStart(2,'0')+' / '+escape(stage)+'</b><span>'+counts[i][1]+'</span></div>'+state.items.filter(r=>r.stage===i).map(r=>'<article class="w4-ticket"><small>'+escape(r.id.toUpperCase())+'</small><h4>'+escape(r.a)+'</h4><p>'+escape(r.b)+'</p><div class="w4-ticket-actions">'+(i===data.stages.length-1?'<span class="w4-completed">Étape finale atteinte ✓</span>':button('Étape suivante →','advance',r.id))+'</div></article>').join('')+'</section>').join('')+'</div></div>'+
 '<aside class="w4-aside"><h3>Journal des décisions</h3><p>Les étapes sont adaptées à ce secteur. Vous pouvez créer un dossier fictif, faire progresser son statut puis revenir au point de départ.</p>'+
 (state.history.length?'<ol>'+state.history.slice(-7).reverse().map(h=>'<li>'+escape(h)+'</li>').join('')+'</ol>':'<p class="w4-placeholder">Aucune nouvelle action enregistrée.</p>')+
 '<div class="w4-limits"><strong>Limites de la démo</strong><p>État stocké uniquement dans ce navigateur. Aucune authentification, connexion métier, message, paiement, traitement médical ni analyse automatisée réelle.</p></div></aside></div>'+
 '<div class="w4-status" role="status" aria-live="polite">'+escape(message)+'</div>';
 write();
}
root.addEventListener('click',event=>{const btn=event.target.closest('[data-action]');if(!btn)return;
 if(btn.dataset.action==='reset'){state=seed();try{localStorage.removeItem(key)}catch{}message='Scénario réinitialisé.';render();return}
 if(btn.dataset.action==='advance'){const item=state.items.find(x=>x.id===btn.dataset.id);if(!item||item.stage>=data.stages.length-1)return;
 item.stage++;state.history.push(item.a+' → '+data.stages[item.stage]);state.history=state.history.slice(-30);message='Dossier actualisé.';render();}
});
root.addEventListener('submit',event=>{const form=event.target.closest('.w4-form');if(!form)return;event.preventDefault();if(!form.reportValidity())return;
 const fields=new FormData(form),a=String(fields.get('a')||'').trim().slice(0,80),b=String(fields.get('b')||'').trim().slice(0,80);if(!a||!b)return;
 const id='demo'+Math.random().toString(36).slice(2,8);state.items.unshift({id,a,b,stage:0,notes:[]});state.history.push('Dossier créé : '+a);message='Nouveau dossier fictif créé.';render();
});
render();
})();