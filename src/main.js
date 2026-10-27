const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
});
document.querySelectorAll('.nav-toggle').forEach(button => button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') !== 'true';
  document.querySelectorAll('.nav-toggle').forEach(other => {
    if (other !== button) { other.setAttribute('aria-expanded','false'); other.closest('.nav-item')?.classList.remove('submenu-open'); }
  });
  button.setAttribute('aria-expanded', String(open));
  button.closest('.nav-item')?.classList.toggle('submenu-open', open);
}));
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  menuButton?.setAttribute('aria-expanded','false');
  nav?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  document.querySelectorAll('.nav-toggle').forEach(button => { button.setAttribute('aria-expanded','false'); button.closest('.nav-item')?.classList.remove('submenu-open'); });
});
document.addEventListener('click', e => {
  if (e.target.closest('.header')) return;
  document.querySelectorAll('.nav-toggle').forEach(button => { button.setAttribute('aria-expanded','false'); button.closest('.nav-item')?.classList.remove('submenu-open'); });
});
const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
}, {threshold: 0.08, rootMargin: '0px 0px 40px 0px'}) : null;
document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('is-visible'));

const demo = document.querySelector('[data-demo]');
if (demo) {
  const steps = JSON.parse(demo.dataset.steps);
  let rows = [];
  const names = {
    'services-professionnels':['Maison Ardent','Atelier Noro','Studio Lierre'],
    'batiment-interventions':['Rue des Forges','Atelier du Nord','Immeuble Sorel'],
    'commerce-operations':['Commande #2048','Commande #2049','Commande #2050'],
    'education':['Famille Laurent','Famille Simon','Famille Moreau'],
    'sante-administrative':['Rendez-vous A12','Rendez-vous A13','Rendez-vous A14']
  };
  const seed = () => (names[demo.dataset.demo] || names.education).map((name,i) => ({id:i+1,name,step:Math.min(i,2)}));
  const list = demo.querySelector('.demo-list');
  function render() {
    list.replaceChildren();
    rows.forEach(row => {
      const article=document.createElement('article'); article.className='demo-record';
      const info=document.createElement('div'); info.className='demo-record-info';
      const code=document.createElement('small'); code.textContent=`DOSSIER ${String(row.id).padStart(3,'0')}`;
      const name=document.createElement('b'); name.textContent=row.name;
      info.append(code,name);
      const status=document.createElement('span'); status.className='demo-status'+(row.step===steps.length-1?' done':''); status.textContent=steps[row.step];
      const button=document.createElement('button'); button.type='button'; button.textContent=row.step===steps.length-1?'Terminé ✓':'Étape suivante →'; button.disabled=row.step===steps.length-1;
      button.setAttribute('aria-label',`Faire avancer ${row.name} depuis ${steps[row.step]}`);
      button.addEventListener('click',()=>{row.step=Math.min(row.step+1,steps.length-1);render();});
      article.append(info,status,button); list.append(article);
    });
    demo.querySelector('.demo-count').textContent=String(rows.length).padStart(2,'0');
    demo.querySelector('.demo-pending').textContent=String(rows.filter(row=>row.step<steps.length-1).length).padStart(2,'0');
  }
  rows=seed(); render();
  demo.querySelector('.demo-reset').addEventListener('click',()=>{rows=seed();render();});
  demo.querySelector('.demo-add').addEventListener('click',()=>{const id=Math.max(0,...rows.map(row=>row.id))+1; rows.unshift({id,name:`Nouveau dossier #${String(id).padStart(3,'0')}`,step:0});render();list.firstElementChild?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});});
}

const brief = document.querySelector('[data-brief]');
if (brief) {
  let content='';
  brief.addEventListener('submit', e => {
    e.preventDefault();
    if (!brief.reportValidity()) return;
    const data=new FormData(brief);
    content=`Projet pour Deux Rives Web\n\nNom : ${data.get('nom')}\nOrganisation : ${data.get('organisation')}\nE-mail : ${data.get('email')}\nHorizon : ${data.get('horizon')}\nSecteur : ${data.get('secteur') || 'À définir'}\nType de projet : ${data.get('typeProjet') || 'À définir'}\nOutils en place et intégrations : ${data.get('outils') || 'À préciser'}\n\nProcessus à améliorer :\n${data.get('besoin')}\n\nRésultat souhaité :\n${data.get('resultat') || 'À définir ensemble'}\n`;
    const output=brief.querySelector('.brief-output'); output.hidden=false;
    output.querySelector('pre').textContent=content;
    const send=output.querySelector('[data-send]');
    if (send && brief.dataset.email) send.href=`mailto:${encodeURI(brief.dataset.email)}?subject=${encodeURIComponent('Projet — Deux Rives Web')}&body=${encodeURIComponent(content)}`;
    output.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});
  });
  brief.querySelector('[data-copy]')?.addEventListener('click',async()=>{
    const status=brief.querySelector('[data-copy-status]');
    try { await navigator.clipboard.writeText(content); status.textContent='Message copié. Collez-le dans votre e-mail à services@deuxrivesweb.fr.'; }
    catch { status.textContent='Sélectionnez le texte ci-dessus pour le copier, ou téléchargez le brief.'; }
  });
  brief.querySelector('[data-download]').addEventListener('click',()=>{
    if (!content) return;
    const blob=new Blob([content],{type:'text/plain;charset=utf-8'});
    const objectUrl=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=objectUrl;a.download='brief-deux-rives-web.txt';a.click();
    setTimeout(()=>URL.revokeObjectURL(objectUrl),1000);
  });
}

const studioSearch=document.querySelector('#studio-search');
if(studioSearch){
 const cards=[...document.querySelectorAll('.concept-card')];
 const counter=document.querySelector('#studio-count');
 studioSearch.addEventListener('input',()=>{
  const term=studioSearch.value.trim().toLocaleLowerCase('fr');
  let visible=0;
  cards.forEach(card=>{
   const match=card.textContent.toLocaleLowerCase('fr').includes(term);
   card.hidden=!match;
   if(match)visible++;
  });
  if(counter)counter.textContent=visible+' démonstration'+(visible===1?'':'s');
 });
}

const priorityCarousel=document.querySelector('#priority-products');
if(priorityCarousel){
 const scrollCards=direction=>{
  const card=priorityCarousel.querySelector('.dr-feature');
  const width=card ? card.getBoundingClientRect().width+20 : 320;
  priorityCarousel.scrollBy({left:direction*width,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 };
 document.querySelector('.dr-carousel-prev')?.addEventListener('click',()=>scrollCards(-1));
 document.querySelector('.dr-carousel-next')?.addEventListener('click',()=>scrollCards(1));
}
document.querySelectorAll('.mega a').forEach(link=>{
 link.addEventListener('focus',()=>link.closest('.nav-item')?.classList.add('submenu-open'));
});
