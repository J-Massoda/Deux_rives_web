// Deux Rives Web — motion and media for the redesign. Progressive enhancement only:
// without this file every section stays readable and every video shows its poster.
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const inView = (el, cb, opts = {threshold: 0.25}) => {
    if (!('IntersectionObserver' in window)) { cb(true); return; }
    new IntersectionObserver(entries => entries.forEach(e => cb(e.isIntersecting, e)), opts).observe(el);
  };

  // Videos marked data-autoplay play only while visible and never under reduced motion.
  document.querySelectorAll('video[data-autoplay]').forEach(video => {
    video.muted = true;
    inView(video, visible => {
      if (reduce.matches) return;
      if (visible) { if (video.preload === 'none') video.preload = 'auto'; video.play().catch(() => {}); }
      else video.pause();
    }, {threshold: 0.2});
  });

  // Showreel: plays the illustrative loops one after another.
  const reel = document.querySelector('[data-reel]');
  if (reel) {
    const names = reel.dataset.reel.split(',');
    const captions = {
      '01-suivi': 'Suivi des demandes', '02-freshbox': 'FreshBox Tech Marketplace', '03-mobikumbu': 'Mobi-Kumbu', '04-bpetale': 'BPÉTALE',
      '05-loumia': 'Résidences Loumia', '06-automatisation': 'Automatisation des processus', '07-clientflow': 'ClientFlow Pro',
      '08-chantierpilot': 'ChantierPilot', '09-commercepilot': 'CommercePilot', '10-docupilot': 'DocuPilot AI'
    };
    const caption = document.querySelector('[data-reel-caption]');
    const toggle = document.querySelector('[data-reel-toggle]');
    const base = reel.querySelector('source').getAttribute('src').replace(/[^/]+\.mp4$/, '');
    let index = 0, userPaused = false;
    const show = i => {
      index = (i + names.length) % names.length;
      reel.poster = base + names[index] + '.webp';
      reel.src = base + names[index] + '.mp4';
      if (caption) caption.textContent = captions[names[index]] || '';
      if (!userPaused) reel.play().catch(() => {});
    };
    reel.removeAttribute('loop');
    reel.addEventListener('ended', () => show(index + 1));
    if (reduce.matches) { reel.removeAttribute('autoplay'); reel.pause(); userPaused = true; }
    const sync = () => {
      toggle?.setAttribute('aria-pressed', String(userPaused));
      toggle?.setAttribute('aria-label', userPaused ? 'Lire l’animation' : 'Mettre l’animation en pause');
    };
    toggle?.addEventListener('click', () => { userPaused = !userPaused; userPaused ? reel.pause() : reel.play().catch(() => {}); sync(); });
    inView(reel, visible => { if (!userPaused) visible ? reel.play().catch(() => {}) : reel.pause(); }, {threshold: 0.1});
    sync();
    // The frame grows to full size as it scrolls into view.
    const frame = reel.closest('.h-showreel-frame');
    if (frame && !reduce.matches) {
      let ticking = false;
      const update = () => {
        const r = frame.getBoundingClientRect(), vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
        frame.style.setProperty('--reel-scale', (0.9 + 0.1 * p).toFixed(4));
        ticking = false;
      };
      window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, {passive: true});
      update();
    }
  }

  // Hero headline: words rise in once.
  document.querySelectorAll('.h-hero h1, [data-split-title]').forEach(title => {
  if (title && !reduce.matches) {
    const wrap = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(part); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.textContent = part; w.append(s); frag.append(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) wrap(child);
      });
    };
    title.setAttribute('aria-label', title.textContent.trim());
    wrap(title);
    title.setAttribute('data-split', '');
    title.querySelectorAll('.w>span').forEach((s, i) => { s.style.transitionDelay = (i * 0.06) + 's'; s.setAttribute('aria-hidden', 'true'); });
    requestAnimationFrame(() => requestAnimationFrame(() => title.classList.add('is-in')));
  }
  });


  // Case studies: the cover grows to full size as it scrolls into view.
  if (!reduce.matches) document.querySelectorAll('[data-scale-on-scroll]').forEach(frame => {
    let ticking = false;
    const update = () => {
      const r = frame.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85)));
      frame.style.setProperty('--cs-scale', (0.94 + 0.06 * p).toFixed(4));
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, {passive: true});
    update();
  });

  // Case-study figures count up once when they come into view.
  document.querySelectorAll('.cs-stat-n').forEach(el => {
    const target = Number(el.textContent.trim());
    if (!Number.isFinite(target) || target < 2 || reduce.matches) return;
    let done = false;
    inView(el, visible => {
      if (!visible || done) return;
      done = true;
      const start = performance.now(), duration = 1100;
      const tick = now => {
        const t = Math.min(1, (now - start) / duration), eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, {threshold: 0.6});
  });

  // Testimonials: previous / next buttons and position dots.
  const quotes = document.querySelector('section[aria-label="Témoignages"] .portfolio-quotes');
  if (quotes && quotes.children.length > 1) {
    const items = [...quotes.children];
    const nav = document.createElement('div'); nav.className = 'h-quote-nav';
    const prev = Object.assign(document.createElement('button'), {type: 'button', textContent: '←'}); prev.setAttribute('aria-label', 'Témoignage précédent');
    const next = Object.assign(document.createElement('button'), {type: 'button', textContent: '→'}); next.setAttribute('aria-label', 'Témoignage suivant');
    const dots = document.createElement('div'); dots.className = 'h-quote-dots'; dots.setAttribute('aria-hidden', 'true');
    items.forEach(() => dots.append(document.createElement('i')));
    nav.append(prev, dots, next); quotes.after(nav);
    const current = () => Math.round(quotes.scrollLeft / quotes.clientWidth);
    const go = i => quotes.scrollTo({left: ((i + items.length) % items.length) * quotes.clientWidth, behavior: reduce.matches ? 'auto' : 'smooth'});
    const mark = () => [...dots.children].forEach((d, i) => d.classList.toggle('is-active', i === current()));
    prev.addEventListener('click', () => go(current() - 1));
    next.addEventListener('click', () => go(current() + 1));
    quotes.addEventListener('scroll', () => requestAnimationFrame(mark), {passive: true});
    mark();
  }

  // Closing section: the arc of visuals opens when it comes into view.
  const final = document.querySelector('.h-final');
  if (final) inView(final, visible => { if (visible) final.classList.add('is-visible'); }, {threshold: 0.15});
})();
