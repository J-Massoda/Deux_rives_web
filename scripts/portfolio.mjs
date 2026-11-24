import {arrowUpRight as arrow} from './icons.mjs';
import { clientDemos, projects, projectTypes, testimonials } from './portfolio-data.mjs';
import { platformLogos } from './platform-logos.mjs';
import { caseStudies } from './case-studies.mjs';

const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const projectUrl = (project, base) => base + 'realisations/' + project.id + '/';
function coverUrl(project, base) {
  if (project.cover.startsWith('https:')) return project.cover;
  if (project.type === 'produit') return base + 'assets/' + project.cover;
  return base + 'assets/realisations/' + project.id + '.webp';
}

export function createPortfolio({ services, sectors }) {
  const expertiseNames = new Map(services.map(({id, title}) => [id, title]));
  const sectorNames = new Map(sectors.map(({id, title}) => [id, title]));

  function card(project, base, heading = 'h3') {
    const expertise = expertiseNames.get(project.expertise);
    const sector = sectorNames.get(project.sector);
    const tags = [project.name, project.summary, expertise, sector, projectTypes[project.type]].filter(Boolean).join(' ');
    return `<article class="portfolio-card" data-project data-type="${project.type}" data-expertise="${project.expertise}" data-sector="${project.sector ?? ''}" data-search="${escape(tags)}">
      <a href="${projectUrl(project, base)}">
        <img src="${escape(coverUrl(project, base))}" alt="" loading="lazy" decoding="async">
        <div class="portfolio-card-copy">
          <span class="portfolio-label">${escape(projectTypes[project.type])} · ${escape(expertise)}</span>
          <${heading}>${escape(project.name)}</${heading}><p>${escape(project.summary)}</p>
          <span class="portfolio-link">Voir le projet ${arrow}</span>
        </div>
      </a>
    </article>`;
  }

  function quotes(list, base) {
    const linked = new Set();
    return list.map(({ project, person, role, quote }) => { const showLink = project && !linked.has(project); if (project) linked.add(project); return `<figure class="portfolio-quote">
      <blockquote lang="fr"><p>${escape(quote)}</p></blockquote>
      <figcaption><strong>${escape(person)}</strong><span>${escape(role)}</span>
      ${showLink ? `<a href="${base}realisations/${project}/">Voir la réalisation ${arrow}</a>` : ''}</figcaption>
    </figure>`; }).join('');
  }

  function selection(list, base, title) {
    if (!list.length) return '';
    return `<section class="section portfolio-section" aria-label="${escape(title)}">
      <div class="portfolio-section-head"><div><span class="eyebrow">Réalisations</span><h2>${escape(title)}</h2></div>
      <a class="portfolio-link" href="${base}realisations/">Voir toutes les réalisations ${arrow}</a></div>
      <div class="portfolio-grid">${list.map(project => card(project, base)).join('')}</div>
    </section>`;
  }

  function catalogue() {
    const availableTypes = Object.entries(projectTypes).filter(([id]) => projects.some(project => project.type === id));
    const types = availableTypes.map(([id, name]) => `<option value="${id}">${escape(name)}</option>`).join('');
    const expertise = Array.from(expertiseNames, ([id, name]) => `<option value="${id}">${escape(name)}</option>`).join('');
    const sectors = Array.from(sectorNames, ([id, name]) => projects.some(project => project.sector === id)
      ? `<option value="${id}">${escape(name)}</option>` : '').join('');
    const groups = [
      ['Projets clients', ['client']],
      ['Extensions réutilisables', ['produit']],
      ['Prototypes et pilotes', ['prototype']],
      ['Études de conception', ['conception']]
    ];
    return `<section class="section portfolio-section" id="catalogue-realisations">
      <div class="portfolio-section-head"><div><span class="eyebrow">Explorer les projets</span><h2>Du travail concret, avec son contexte.</h2></div>
      <p>Parcourez les projets clients, les extensions réutilisables, les prototypes et les études de conception présentés par Deux Rives Web.</p></div>
      <div class="portfolio-controls" data-project-filters hidden>
        <label>Rechercher <input data-project-query type="search" placeholder="Nom, secteur, besoin…"></label>
        <label>Expertise <select data-project-expertise><option value="">Toutes les expertises</option>${expertise}</select></label>
        <label>Secteur <select data-project-sector><option value="">Tous les secteurs</option>${sectors}</select></label>
        <label>Type de projet <select data-project-type><option value="">Tous les types</option>${types}</select></label>
        <button type="button" class="button button-outline" data-project-reset>Réinitialiser</button>
      </div>
      <p class="portfolio-count" data-project-count role="status">${projects.length} projets</p>
      ${groups.map(([label, types]) => `<section class="portfolio-group" data-project-group>
        <h3>${label}</h3>
        <div class="portfolio-grid">${projects.filter(project => types.includes(project.type)).map(project => card(project, '../', 'h4')).join('')}</div>
      </section>`).join('')}
      <p data-project-empty hidden>Aucun projet ne correspond à cette recherche.</p>
    </section>`;
  }

  function clientPreviews(base) {
    return `<section class="section portfolio-section" id="demos-clients" aria-labelledby="demos-clients-title">
      <div class="portfolio-section-head">
        <h2 id="demos-clients-title">Sites de démonstration</h2>
        <p>Explorez les sites et les parcours que nous proposons lors de nos échanges avec des clients.</p>
      </div>
      <div class="portfolio-grid">
        ${clientDemos.map(demo => `<article class="portfolio-card">
          <a href="${escape(demo.live)}">
            <img src="${base}assets/realisations/${demo.id}.webp" alt="" loading="lazy" decoding="async">
            <div class="portfolio-card-copy">
              <span class="portfolio-label">${escape(demo.category)}</span>
              <h3>${escape(demo.name)}</h3><p>${escape(demo.summary)}</p>
              <span class="portfolio-link">Ouvrir la démonstration ${arrow}</span>
            </div>
          </a>
        </article>`).join('')}
      </div>
    </section>`;
  }

  function featuredClients() {
    const featured = [
      ['freshbox-tech-marketplace', 'Commerce B2B', 'freshbox-tech-marketplace.webp', 'Accueil du catalogue B2B FreshBox Tech Marketplace', '02-freshbox', ['Marketplace B2B', 'WooCommerce', 'Catalogue partenaires']],
      ['mobikumbu', 'Fintech · USSD et AWS', 'mobikumbu.webp', 'Accueil du site Mobi-Kumbu', '03-mobikumbu', ['USSD', 'API REST', 'AWS']],
      ['bpetale-ltd', 'Commerce en ligne', 'bpetale-ltd.webp', 'Accueil de la boutique BPÉTALE Natural Essence', '04-bpetale', ['Boutique en ligne', 'Voyages', 'Multi-activités']]
    ];
    const slides = featured.map(([id, category, image, caption, video, tags], index) => {
      const project = projects.find(entry => entry.id === id);
      return `<article class="studio-case-slide" id="vedette-${id}" aria-labelledby="vedette-titre-${id}" data-case-slide>
        <div class="studio-case-media" aria-hidden="true"><video class="studio-case-video" muted loop playsinline preload="none" poster="assets/video/${video}.webp" data-autoplay><source src="assets/video/${video}.mp4" type="video/mp4"></video></div>
        <div class="studio-case-inner">
        <div class="studio-section-intro">
          <p class="studio-label">Réalisation client · ${escape(category)}</p>
          <h2 id="vedette-titre-${id}">${escape(project.name)}</h2>
          <ul class="studio-case-tags">${tags.map(tag => `<li>${escape(tag)}</li>`).join('')}</ul>
          <p>${escape(project.summary)}</p>
        </div>
        <div class="studio-case-layout">
          <figure class="studio-case-screen">
            <img src="assets/realisations/${image}" alt="${escape(caption)}" loading="lazy" decoding="async">
            <figcaption>${escape(caption)}</figcaption>
          </figure>
          <div>
            <dl class="studio-case-details">
              <div><dt>Le besoin</dt><dd>${escape(project.challenge)}</dd></div>
              <div><dt>La contribution</dt><dd>${escape(project.delivery)}</dd></div>
              <div><dt>Le résultat</dt><dd>${escape(project.outcome)}</dd></div>
            </dl>
            <a class="portfolio-link" href="${projectUrl(project, '')}">Lire l’étude de cas ${arrow}</a>
            <a class="portfolio-link studio-case-all" href="realisations/">Toutes nos réalisations ${arrow}</a>
          </div>
        </div>
        <span class="studio-case-index" aria-hidden="true">0${index + 1}<small>/0${featured.length}</small></span>
        </div>
      </article>`;
    }).join('');
    return `<section class="section studio-case" id="projet-en-vedette" aria-label="Réalisations en vedette" data-case-stack>
      <div class="studio-case-controls" hidden>
        <button type="button" data-case-step="-1" aria-label="Réalisation précédente">←</button>
        <span class="studio-case-count" aria-live="polite" aria-atomic="true" data-case-count></span>
        <button type="button" data-case-step="1" aria-label="Réalisation suivante">→</button>
      </div>
      ${slides}
    </section>`;
  }

  function featuredDemo() {
    const demo = clientDemos.find(({id}) => id === 'lumen-clinic');
    if (!demo) return clientPreviews('');
    return `<section class="section studio-demo" id="demos-clients" aria-labelledby="demos-clients-title">
      <div class="studio-demo-copy">
        <p class="studio-label">Site de démonstration · Santé</p>
        <h2 id="demos-clients-title">${escape(demo.name)}</h2>
        <p>Explorez le site d’une clinique fictive. Consultez les pages de soins et essayez le parcours de prise de rendez-vous.</p>
        <a class="dr-btn dr-btn-dark" href="${escape(demo.live)}">Ouvrir la démonstration ${arrow}</a>
      </div>
      <figure class="studio-demo-screens">
        <img src="assets/realisations/lumen-desktop.webp" alt="Page d’accueil de Lumen Clinic sur ordinateur" width="1120" height="720" loading="lazy" decoding="async">
        <img src="assets/realisations/lumen-mobile.webp" alt="Page d’accueil de Lumen Clinic sur mobile" width="390" height="650" loading="lazy" decoding="async">
      </figure>
    </section>`;
  }

  function homepage() {
    return featuredClients() + platformLogos() + featuredDemo() +
      `<section class="section portfolio-section" aria-label="Témoignages">
        <div class="portfolio-section-head"><div><span class="eyebrow">Témoignages</span><h2>La parole aux clients et partenaires.</h2></div>
        <p>Deux Rives Web présente leurs retours sur le travail réalisé et l’usage des outils au quotidien.</p></div>
        <div class="portfolio-quotes">${quotes(testimonials.filter(quote => quote.project !== 'bpetale-ltd'), '')}</div>
      </section>` +
      selection(projects.filter(project => project.type === 'produit'), '', 'Extensions pour le commerce');
  }

  const typeCredit = {
    client: 'Projet client · Deux Rives Web',
    prototype: 'Prototype · Deux Rives Web',
    conception: 'Étude de conception · Deux Rives Web',
    interne: 'Projet interne · Deux Rives Web',
    produit: 'Extension Deux Rives Web · Intégration sur demande'
  };
  const expertiseAccent = {
    'logiciels-sur-mesure': '#0EA5E9', 'automatisation-des-processus': '#FF5A1F', 'intelligence-artificielle': '#8B5CF6',
    'sites-et-commerce': '#12B76A', 'integrations-api': '#12B76A', 'maintenance-evolution': '#8B5CF6'
  };
  const video = (base, file, label, cls = '') => `<video class="${cls}" muted loop playsinline preload="none" poster="${base}assets/video/${file}.webp" data-autoplay aria-label="${escape(label)}"><source src="${base}assets/video/${file}.mp4" type="video/mp4"></video>`;
  const paragraphs = list => list.map((text, index) => `<p${index ? '' : ' class="cs-lead"'}>${escape(text)}</p>`).join('');
  const row = (id, label, inner) => `<section class="cs-row reveal" id="${id}"><h2 class="cs-label">${label}</h2><div class="cs-copy">${inner}</div></section>`;

  function relatedProjects(project) {
    const others = projects.filter(entry => entry.id !== project.id);
    const picks = [
      ...others.filter(entry => entry.type === project.type && entry.expertise === project.expertise),
      ...others.filter(entry => entry.type === project.type),
      ...others.filter(entry => entry.expertise === project.expertise),
      ...others.filter(entry => entry.type === 'client')
    ];
    return [...new Map(picks.map(entry => [entry.id, entry])).values()].slice(0, 3);
  }

  function caseStudy(project, base) {
    const study = caseStudies[project.id] ?? {headline: project.summary};
    const expertise = expertiseNames.get(project.expertise);
    const sector = sectorNames.get(project.sector);
    const cover = coverUrl(project, base);
    const demoUrl = project.internalDemo ? base + project.internalDemo : project.demo;
    const external = project.live ?? demoUrl;
    const externalLabel = project.live ? 'Visiter le site' : 'Ouvrir la démonstration';
    const accent = study.accent ?? expertiseAccent[project.expertise] ?? '#12B76A';
    const videos = study.videos ?? [];
    const [heroVideo, ...moreVideos] = videos;
    const projectQuotes = testimonials.filter(quote => quote.project === project.id);
    const process = study.process ?? [];
    const isPrototype = ['prototype', 'conception', 'produit'].includes(project.type);
    const about = study.about ?? [project.summary];
    const challenge = study.challenge ?? [project.challenge];
    const results = study.results ?? (project.outcome ? [project.outcome] : []);

    const hero = `<header class="cs-hero" style="--cs-accent:${accent}">
      <div class="cs-hero-inner">
        <a class="cs-back" href="../">← Toutes les réalisations</a>
        <p class="cs-badge"><span class="cs-badge-mark" aria-hidden="true"></span>${escape(project.name)}</p>
        <h1 class="cs-title" data-split-title><span class="visually-hidden">${escape(project.name)} : </span>${escape(study.headline)}</h1>
        <p class="cs-sub">${escape(project.summary)}</p>
        <dl class="cs-meta">
          <div><dt>Type</dt><dd><span>${escape(projectTypes[project.type])}</span></dd></div>
          <div><dt>Expertise</dt><dd><a href="${base}expertises/${project.expertise}/">${escape(expertise)}</a></dd></div>
          ${sector ? `<div><dt>Secteur</dt><dd><a href="${base}secteurs/${project.sector}/">${escape(sector)}</a></dd></div>` : ''}
          ${study.services ? `<div class="cs-meta-wide"><dt>Services</dt><dd>${study.services.map(item => `<span>${escape(item)}</span>`).join('')}</dd></div>` : ''}
        </dl>
        <p class="cs-credit">${escape(typeCredit[project.type])}</p>
        <div class="cs-actions">
          ${external ? `<a class="button button-accent" href="${escape(external)}">${externalLabel} ${arrow}</a>` : ''}
          ${project.android ? `<a class="button button-outline" href="${escape(project.android)}">Voir l’application sur Google Play ${arrow}</a>` : ''}
        </div>
      </div>
    </header>
    <figure class="cs-cover reveal" data-scale-on-scroll>
      ${heroVideo ? video(base, heroVideo.file, 'Animation illustrant ' + project.name, 'cs-cover-video') : `<img src="${escape(cover)}" alt="Visuel du projet ${escape(project.name)}" decoding="async">`}
      ${heroVideo ? `<figcaption><strong>${escape(heroVideo.title)}</strong> ${escape(heroVideo.text)}</figcaption>` : ''}
    </figure>`;

    const stats = (study.stats ?? []).length > 1 ? `<section class="cs-stats" aria-label="Le projet en chiffres">${study.stats.map(({n, label}) => `<div class="cs-stat reveal"><span class="cs-stat-n">${escape(n)}</span><span class="cs-stat-label">${escape(label)}</span></div>`).join('')}</section>` : '';

    const example = study.example ? `<section class="cs-example reveal"><span class="cs-example-label">Un exemple concret</span><p>${escape(study.example)}</p></section>` : '';

    const steps = process.length
      ? process.map((step, index) => `<li class="cs-step reveal${step.frame ? ' has-frame' : ''}">
          <span class="cs-step-n">${String(index + 1).padStart(2, '0')}</span>
          <div class="cs-step-copy"><h3>${escape(step.title)}</h3><p>${escape(step.text)}</p></div>
          ${step.frame ? `<figure class="cs-step-frame"><img src="${base}assets/video/frames/${step.frame}.webp" alt="${escape(step.alt ?? step.title)}" loading="lazy" decoding="async" width="1280" height="720"></figure>` : ''}
        </li>`).join('')
      : `<li class="cs-step reveal"><span class="cs-step-n">01</span><div class="cs-step-copy"><h3>Notre contribution</h3><p>${escape(project.delivery)}</p></div></li>`;
    const work = `<section class="cs-process" id="travail">
      <div class="cs-section-head reveal"><span class="cs-kicker">Notre démarche</span><h2>Le travail réalisé</h2>
      ${process.length ? `<p>${escape(project.delivery)}</p>` : ''}</div>
      <ol class="cs-steps">${steps}</ol>
    </section>`;

    const motion = moreVideos.length ? `<section class="cs-motion" aria-label="Animations du projet">
      <div class="cs-section-head reveal"><span class="cs-kicker">En mouvement</span><h2>Le projet en quelques secondes</h2></div>
      ${moreVideos.map((clip, index) => `<figure class="cs-clip reveal${index % 2 ? ' is-flipped' : ''}">
        <div class="cs-clip-media">${video(base, clip.file, clip.title)}</div>
        <figcaption><span class="cs-clip-n">${String(index + 2).padStart(2, '0')}</span><h3>${escape(clip.title)}</h3><p>${escape(clip.text)}</p></figcaption>
      </figure>`).join('')}
    </section>` : '';

    const flow = study.flow ? `<section class="cs-flow reveal" aria-labelledby="flux-${project.id}">
      <h2 class="cs-label" id="flux-${project.id}">Flux du système</h2>
      <ol class="cs-flow-steps">${study.flow.map(step => `<li>${escape(step)}</li>`).join('')}</ol>
    </section>` : '';

    const resultsBlock = results.length ? `<section class="cs-results" id="resultats">
      <div class="cs-section-head reveal"><span class="cs-kicker">${isPrototype ? 'Ce qui est démontré' : 'Résultats'}</span><h2>${escape(study.resultsTitle ?? project.evidence?.title ?? (isPrototype ? 'Ce que le projet démontre' : 'Ce que le projet a changé'))}</h2></div>
      <ul class="cs-checks">${results.map(item => `<li class="reveal">${escape(item)}</li>`).join('')}</ul>
    </section>` : '';

    const gallery = [];
    if (heroVideo || project.type === 'produit') gallery.push(`<figure class="cs-shot reveal"><img src="${escape(cover)}" alt="Visuel du projet ${escape(project.name)}" loading="lazy" decoding="async"><figcaption>${escape(project.name)} · aperçu du projet</figcaption></figure>`);
    if (project.evidence?.image) gallery.push(`<figure class="cs-shot reveal"><img src="${base}assets/realisations/${escape(project.evidence.image)}" alt="${escape(project.evidence.alt)}" loading="lazy" decoding="async"><figcaption>${escape(project.evidence.title)}</figcaption></figure>`);
    const galleryBlock = gallery.length && !(gallery.length === 1 && project.type === 'produit' && !heroVideo && false) ? `<section class="cs-gallery${gallery.length > 1 ? ' is-pair' : ''}" aria-label="Aperçus du projet">${gallery.join('')}</section>` : '';

    const quotesBlock = projectQuotes.length ? `<section class="cs-quotes" aria-labelledby="avis-${project.id}">
      <div class="cs-section-head reveal"><span class="cs-kicker">Témoignages</span><h2 id="avis-${project.id}">${projectQuotes.length > 1 ? 'Ils en parlent' : 'Le mot du client'}</h2></div>
      <div class="cs-quote-grid${projectQuotes.length > 1 ? ' is-multi' : ''}">${projectQuotes.map(({person, role, quote}) => `<figure class="cs-quote reveal">
        <div class="cs-rating" aria-label="Note de 5 sur 5"><span aria-hidden="true">★★★★★</span><b>5.0</b></div>
        <blockquote lang="fr"><p>${escape(quote)}</p></blockquote>
        <figcaption><span class="cs-avatar" aria-hidden="true">${escape(person.replace(/^(M\.|Mme)\s+/, '').slice(0, 1))}</span><span><strong>${escape(person)}</strong><small>${escape(role)}</small></span></figcaption>
      </figure>`).join('')}</div>
    </section>` : '';

    const honest = study.limits || study.next ? `<section class="cs-honest">
      ${study.limits ? `<div class="cs-card reveal"><span class="cs-kicker">Limites actuelles</span><h3>Ce que la démonstration ne prétend pas</h3><p>${escape(study.limits)}</p></div>` : ''}
      ${study.next ? `<div class="cs-card reveal"><span class="cs-kicker">Prochaine étape</span><h3>${isPrototype ? 'Vers une version de production' : 'La suite'}</h3><p>${escape(study.next)}</p></div>` : ''}
    </section>` : '';

    const team = study.scope ? `<section class="cs-row reveal"><h2 class="cs-label">Notre rôle</h2><div class="cs-copy"><ul class="cs-scope">${study.scope.map(item => `<li>${escape(item)}</li>`).join('')}</ul></div></section>` : '';
    const tech = study.stack ? `<section class="cs-row reveal"><h2 class="cs-label">Technologies</h2><div class="cs-copy"><ul class="cs-tech">${study.stack.map(item => `<li>${escape(item)}</li>`).join('')}</ul></div></section>` : '';

    const more = `<section class="cs-more" aria-labelledby="autres-${project.id}">
      <div class="portfolio-section-head"><div><span class="eyebrow">Autres réalisations</span><h2 id="autres-${project.id}">D’autres projets à découvrir</h2></div>
      <a class="portfolio-link" href="../">Toutes les réalisations ${arrow}</a></div>
      <div class="portfolio-grid">${relatedProjects(project).map(entry => card(entry, base)).join('')}</div>
    </section>`;

    const cta = `<section class="cs-cta reveal"><div><span class="cs-kicker">Votre projet</span><h2>Un projet similaire en tête ?</h2><p>Décrivez-nous votre besoin : nous revenons vers vous avec une première piste.</p></div>
      <a class="button button-accent" href="${base}contact/">Parler d’un projet similaire ${arrow}</a></section>`;

    return `<article class="cs" data-case-study>
      ${hero}
      <div class="cs-body">
        ${row('a-propos', 'À propos du projet', paragraphs(about))}
        ${stats}
        ${row('defi', 'Le défi', paragraphs(challenge))}
        ${example}
        ${work}
        ${motion}
        ${flow}
        ${resultsBlock}
        ${quotesBlock}
        ${galleryBlock}
        ${honest}
        ${team}
        ${tech}
        ${more}
        ${cta}
      </div>
    </article>`;
  }

  function build(write) {
    for (const project of projects) {
      const base = '../../';
      const cover = coverUrl(project, base);
      write('realisations/' + project.id + '/', {
        title: project.name + ' · ' + projectTypes[project.type],
        description: project.summary,
        section: 'Réalisations',
        image: cover.startsWith('https:') ? cover : cover.slice(base.length),
        body: caseStudy(project, base).replace(/ ([:;!?»])/g, '\u00a0$1').replace(/« /g, '«\u00a0')
      });
    }
  }

  function testimonialWall(base) {
    return `<section class="section portfolio-section cs-wall" aria-label="Témoignages">
      <div class="portfolio-section-head"><div><span class="eyebrow">Témoignages</span><h2>Ils nous font confiance.</h2></div>
      <p>Les retours des équipes avec lesquelles Deux Rives Web a construit des produits, des sites et des outils.</p></div>
      <div class="portfolio-quotes">${quotes(testimonials, base)}</div>
    </section>`;
  }

  return {
    build, catalogue, testimonialWall, clientPreviews, homepage,
    forExpertise: id => selection(projects.filter(project => project.expertise === id).slice(0, 4), '../../', 'Projets liés à cette expertise'),
    forSector: id => selection(projects.filter(project => project.sector === id).slice(0, 4), '../../', 'Projets liés à ce secteur')
  };
}
