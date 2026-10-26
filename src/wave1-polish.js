// Wave 1 navigation and carousel refinements. Progressive enhancement only.
(() => {
  const header=document.querySelector('.header');
  if(!header)return;
  let scheduled=false;
  const refresh=()=>{header.classList.toggle('is-scrolled',window.scrollY>48);scheduled=false;};
  refresh();
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;window.requestAnimationFrame(refresh)}},{passive:true});
  const navItems=[...document.querySelectorAll('.nav-item')];
  const closeItem=item=>{
    item.classList.remove('submenu-open');
    const button=item.querySelector('.nav-toggle');
    if(button)button.setAttribute('aria-expanded','false');
  };
  navItems.forEach(item=>{
    item.addEventListener('focusout',event=>{
      if(!event.relatedTarget || !item.contains(event.relatedTarget))closeItem(item);
    });
    item.addEventListener('pointerleave',()=>{
      if(window.matchMedia('(min-width:1151px)').matches && !item.contains(document.activeElement))closeItem(item);
    });
  });
  const slides=document.querySelector('#priority-products');
  if(slides){
    const cards=[...slides.querySelectorAll('.dr-feature')];
    const progress=document.querySelector('.dr-carousel-toolbar span');
    const prev=document.querySelector('.dr-carousel-prev');
    const next=document.querySelector('.dr-carousel-next');
    const update=()=>{
      const offset=slides.scrollLeft;
      const closest=cards.reduce((best,c,i)=>Math.abs(c.offsetLeft-cards[0].offsetLeft-offset)<Math.abs(cards[best].offsetLeft-cards[0].offsetLeft-offset)?i:best,0);
      if(progress)progress.textContent=String(closest+1).padStart(2,'0')+' — '+String(cards.length).padStart(2,'0');
      if(prev)prev.disabled=slides.scrollLeft<4;
      if(next)next.disabled=slides.scrollLeft + slides.clientWidth >= slides.scrollWidth-4;
    };
    slides.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update);
    update();
    slides.addEventListener('keydown',event=>{
      if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
        event.preventDefault();
        (event.key==='ArrowRight'?next:prev)?.click();
      }
    });
  }
})();
