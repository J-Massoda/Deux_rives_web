import {arrowUpRight as arrow} from './icons.mjs';
import { clientDemos, projects, projectTypes, testimonials } from './portfolio-data.mjs';
import { platformLogos } from './platform-logos.mjs';

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
    return list.map(({ project, person, role, quote }) => `<figure class="portfolio-quote">
      <blockquote lang="fr"><p>${escape(quote)}</p></blockquote>
      <figcaption><strong>${escape(person)}</strong><span>${escape(role)}</span>
      <a href="${base}realisations/${project}/">Voir la réalisation ${arrow}</a></figcaption>
    </figure>`).join('');
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
      ['freshbox-tech-marketplace', 'Commerce B2B', 'freshbox-tech-marketplace.webp', 'Accueil du catalogue B2B FreshBox Tech Marketplace'],
      ['mobikumbu', 'Fintech · USSD et AWS', 'mobikumbu.webp', 'Accueil du site Mobi-Kumbu'],
      ['bpetale-ltd', 'Commerce en ligne', 'bpetale-ltd.webp', 'Accueil de la boutique BPÉTALE Natural Essence']
    ];
    const slides = featured.map(([id, category, image, caption]) => {
      const project = projects.find(entry => entry.id === id);
      return `<article class="studio-case-slide" id="vedette-${id}" aria-labelledby="vedette-titre-${id}" data-case-slide>
        <div class="studio-section-intro">
          <p class="studio-label">Réalisation client · ${escape(category)}</p>
          <h2 id="vedette-titre-${id}">${escape(project.name)}</h2>
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
      </article>`;
    }).join('');
    return `<section class="section studio-case" id="projet-en-vedette" aria-label="Réalisations en vedette">
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
        <div class="portfolio-quotes">${quotes(testimonials.slice(0, 3), '')}</div>
      </section>` +
      selection(projects.filter(project => project.type === 'produit'), '', 'Extensions pour le commerce');
  }

  function projectEvidence(project, base) {
    const evidence = project.evidence;
    if (!evidence) return '';
    const visual = evidence.image
      ? `<figure class="portfolio-proof">
        <img src="${base}assets/realisations/${escape(evidence.image)}" alt="${escape(evidence.alt)}" loading="lazy" decoding="async">
        <figcaption>${escape(evidence.caption)}</figcaption>
      </figure>`
      : '';
    return `<section class="portfolio-evidence">
      <span class="eyebrow">03 · En pratique</span>
      <h2>${escape(evidence.title)}</h2><p>${escape(project.outcome)}</p>
      ${visual}
    </section>`;
  }

  function build(write) {
    for (const project of projects) {
      const base = '../../';
      const expertise = expertiseNames.get(project.expertise);
      const sector = sectorNames.get(project.sector);
      const isProduct = project.type === 'produit';
      const context = isProduct
        ? 'Extension Deux Rives Web · Intégration sur demande'
        : project.type === 'interne'
        ? 'Projet interne de Deux Rives Web · Contribution de Jean-Émilien Massoda, cofondateur'
        : 'Contribution de Jean-Émilien Massoda, cofondateur de Deux Rives Web';
      const projectQuotes = testimonials.filter(quote => quote.project === project.id);
      const demoUrl = project.internalDemo ? base + project.internalDemo : project.demo;
      const external = project.live ?? demoUrl;
      const externalLabel = project.live ? 'Visiter le site' : 'Ouvrir la démonstration';
      const cover = coverUrl(project, base);

      write('realisations/' + project.id + '/', {
        title: project.name + ' · ' + projectTypes[project.type],
        description: project.summary,
        section: 'Réalisations',
        image: cover.startsWith('https:') ? cover : cover.slice(base.length),
        body: `<article class="section portfolio-case">
          <a class="portfolio-link" href="../">← Toutes les réalisations</a>
          <header class="portfolio-case-header">
            <span class="eyebrow">${escape(projectTypes[project.type])}</span>
            <h1>${escape(project.name)}</h1><p class="portfolio-lead">${escape(project.summary)}</p>
            <p class="portfolio-credit">${escape(context)}</p>
            <div class="portfolio-tags">
              <a href="${base}expertises/${project.expertise}/">${escape(expertise)}</a>
              ${sector ? `<a href="${base}secteurs/${project.sector}/">${escape(sector)}</a>` : ''}
            </div>
          </header>
          <figure class="portfolio-case-cover"><img src="${escape(cover)}" alt="Visuel du projet ${escape(project.name)}" decoding="async"></figure>
          <div class="portfolio-case-body">
            <section><span class="eyebrow">01 · Contexte</span><h2>Le besoin</h2><p>${escape(project.challenge)}</p></section>
            <section><span class="eyebrow">02 · Contribution</span><h2>Le travail réalisé</h2><p>${escape(project.delivery)}</p></section>
          </div>
          ${projectEvidence(project, base)}
          <div class="portfolio-actions">
            ${external ? `<a class="button button-accent" href="${escape(external)}">${externalLabel} ${arrow}</a>` : ''}
            ${project.android ? `<a class="button button-outline" href="${escape(project.android)}">Voir l’application sur Google Play ${arrow}</a>` : ''}
            <a class="portfolio-link" href="${base}contact/">Parler d’un projet similaire ${arrow}</a>
          </div>
          ${projectQuotes.length ? `<section class="portfolio-case-quotes"><h2>Témoignages sur ce projet</h2><div class="portfolio-quotes">${quotes(projectQuotes, base)}</div></section>` : ''}
        </article>`
      });
    }
  }

  return {
    build, catalogue, clientPreviews, homepage,
    forExpertise: id => selection(projects.filter(project => project.expertise === id).slice(0, 4), '../../', 'Projets liés à cette expertise'),
    forSector: id => selection(projects.filter(project => project.sector === id).slice(0, 4), '../../', 'Projets liés à ce secteur')
  };
}
