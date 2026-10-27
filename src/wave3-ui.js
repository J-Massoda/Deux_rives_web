/* Progressive enhancement for mobile nav, sector catalog and inquiry qualification */
(()=>{
 const menu=document.querySelector('.menu-button'),nav=document.querySelector('.header .nav');
 if(menu&&nav){
  const close=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Ouvrir le menu');nav.classList.remove('is-open');document.body.classList.remove('menu-open');document.querySelectorAll('.nav-item.submenu-open').forEach(el=>{el.classList.remove('submenu-open');el.querySelector('.nav-toggle')?.setAttribute('aria-expanded','false')})};
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(matchMedia('(max-width:1150px)').matches)close()}));
  window.addEventListener('resize',()=>{if(matchMedia('(min-width:1151px)').matches&&nav.classList.contains('is-open'))close()});
  document.addEventListener('pointerdown',ev=>{if(matchMedia('(max-width:1150px)').matches&&nav.classList.contains('is-open')&&!ev.target.closest('.header'))close()});
  document.addEventListener('keydown',ev=>{
   if(ev.key!=='Tab'||!nav.classList.contains('is-open')||!matchMedia('(max-width:1150px)').matches)return;
   const focusable=[menu,...nav.querySelectorAll('a,button')].filter(el=>el.getClientRects().length>0);
   const first=focusable[0],last=focusable.at(-1);
   if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus()}
   else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus()}
  });
 }
 const search=document.getElementById('studio-search'),cards=[...document.querySelectorAll('.concept-card[data-sector]')],filters=[...document.querySelectorAll('[data-studio-sector]')];
 if(search&&cards.length&&filters.length){
  let selected='Tous';const count=document.getElementById('studio-count'),empty=document.getElementById('studio-empty');
  function update(){
   const query=search.value.trim().toLocaleLowerCase('fr');let visible=0;
   cards.forEach(card=>{
    const found=card.textContent.toLocaleLowerCase('fr').includes(query),sector=selected==='Tous'||card.dataset.sector===selected;
    const shown=found&&sector;card.hidden=!shown;if(shown)visible++;
   });
   if(count)count.textContent=visible+' démonstration'+(visible===1?'':'s');
   if(empty)empty.hidden=visible>0;
   filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.studioSector===selected)));
  }
  filters.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.studioSector;update()}));
  search.addEventListener('input',update);update();
 }
 const brief=document.querySelector('form[data-brief]'),params=new URLSearchParams(location.search),solution=params.get('solution');
 if(brief&&solution&&solution.length<=80){
  const input=brief.querySelector('[name="besoin"]');
  if(input&&!input.value.trim())input.value='Je souhaite discuter d’un projet inspiré par '+solution+'. Voici mon contexte : ';
  const label=brief.querySelector('h3');
  if(label){const note=document.createElement('p');note.className='inquiry-context';note.textContent='Votre demande concerne : '+solution+'. Précisez votre activité et vos besoins avant d’enregistrer le brief.';label.insertAdjacentElement('afterend',note)}
 }
})();