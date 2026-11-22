import fs from 'node:fs';

const contentRoot = new URL('../content/blog/', import.meta.url);
const readJson = name => JSON.parse(fs.readFileSync(new URL(name, contentRoot), 'utf8'));
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const journalPosts = readJson('manifest.json');
const existingEditorial = readJson('existing-editorial.json');
const context = readJson('company-context.json');
const text = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const imageUrl = (post, base) => base + post.image;

const readingOrder = [
  'enterprise-ai-agents-business-software',
  'business-cloud-hosting-control',
  'website-software-supply-chain-security',
  'ai-search-seo-customer-discovery',
  'website-accessibility-wcag-customer-journeys',
  'website-performance-core-web-vitals-peak-traffic',
  'buy-configure-or-build-business-software',
  'your-next-customer-may-never-start-on-your-website',
  'logiciel-metier-ou-saas-comment-choisir', 'cadrer-mvp-logiciel-metier-questions',
  'ai-productivity-after-the-first-draft', 'integrations-api-webhooks-reprise-erreurs',
  'woocommerce-order-reliability', 'autonomous-ai-audit-logs',
  'architecture-logiciel-metier-roles-donnees-permissions', 'skills-your-company-cannot-see',
  'quand-un-tableur-devient-un-systeme', 'payment-api-reliability',
  'facturation-electronique-integration-logiciel-2026-2027', 'un-site-qui-continue-apres-le-formulaire',
  'when-the-customer-sends-an-assistant', 'fake-conversation-invoice-fraud',
  'when-paid-still-means-waiting', 'automatiser-sans-perdre-le-controle',
  'agentic-engineering-workflows', 'ai-coding-agents-what-actually-changed-2026',
  'ai-engineering-judgment', 'ci-cd-pipelines-2026-ai-assisted-devops',
  'du-prototype-au-produit-saas-securite-exploitation', 'aws-vs-azure-vs-google-cloud-2026',
  'finops-cloud-cost-management-devops-skill', 'serverless-vs-containers-2026',
  'what-is-platform-engineering', 'great-cloud-storage-consolidation',
  'ai-infrastructure-boom-what-it-means-for-developers',
  'surveillance-pricing-algorithms-personal-data', 'the-demo-worked-would-the-workday',
  'when-ai-security-agents-leave-the-sandbox', 'ai-supply-chain-tariff-enforcement',
  'the-ai-race-for-electricity', 'why-big-tech-nuclear-powered-data-centers',
  'ai-data-centers-small-modular-reactors', 'why-gaming-consoles-keep-getting-more-expensive',
  'africa-electric-vehicle-shift-infrastructure', 'african-fintech-offline-reliability'
];

function existingBody(post, editorial) {
  return post.paragraphs.map((paragraph, index) => {
    // The official references now sit beside the calendar and format they support.
    if (post.id === 'facturation-electronique-integration-logiciel-2026-2027') {
      if (paragraph.startsWith('Références officielles')) return '';
      if (index === 0) paragraph = paragraph.replace('calendrier prévu', '<a href="https://www.impots.gouv.fr/professionnel/questions/partir-de-quand-suis-je-concerne-par-la-reforme-de-la-facturation">calendrier publié par la DGFiP</a>');
      if (index === 1) paragraph = paragraph.replace('formats et transmissions applicables', '<a href="https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises">formats et transmissions applicables</a>');
    }
    return `${editorial.headings[index] ? `<h2>${esc(editorial.headings[index])}</h2>` : ''}<p>${paragraph}</p>`;
  }).join('');
}

export function getJournalArticles(insights) {
  const imported = journalPosts.map(post => ({...post, body: fs.readFileSync(new URL(`${post.file}.html`, contentRoot), 'utf8')
    .replace(/<h1>[\s\S]*?<\/h1>\s*/, '')
    .replace(/<p class="blog-category">[\s\S]*?<\/p>\s*/, '')
    .replace(/<p class="blog-lead">[\s\S]*?<\/p>\s*/, '')}));
  const existing = insights.map(post => {
    const editorial = existingEditorial[post.id];
    if (!editorial) throw Error(`Missing company editorial brief: ${post.id}`);
    return {...post, ...editorial, title: editorial.title || post.title, file: post.id, body: existingBody(post, editorial)};
  });
  const articles = [...imported, ...existing].map(post => {
    const additions = context[post.file];
    if (!additions) throw Error(`Missing company context: ${post.file}`);
    const body = additions.hook + post.body + additions.panel;
    const citations = [...new Set([...body.matchAll(/href="(https:\/\/[^\"]+)"/g)].map(match => match[1].replace(/&amp;/g, '&')))];
    return {...post, body, citations, readingMinutes: Math.max(1, Math.ceil(text(body).split(/\s+/).length / 200))};
  });
  const rank = new Map(readingOrder.map((id, index) => [id, index]));
  if (articles.length !== readingOrder.length || articles.some(post => !rank.has(post.file))) throw Error('Journal coverage mismatch');
  return articles.sort((a, b) => rank.get(a.file) - rank.get(b.file));
}

const listingStyle = `<style>
.journal-index{padding-bottom:60px}.journal-index-heading{font:400 clamp(2rem,4vw,3.5rem)/1.15 Georgia,serif;margin:0 0 16px}.journal-index-intro{max-width:760px;color:#53665a;line-height:1.75;margin-bottom:35px}.journal-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px 24px}.journal-card{display:flex;flex-direction:column;min-width:0;background:#fff;border:1px solid #d8dfd5;border-radius:14px;overflow:hidden;transition:transform .2s,box-shadow .2s}.journal-card:hover{transform:translateY(-4px);box-shadow:0 14px 35px #18282014}.journal-card img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#e8ece4}.journal-card-copy{display:flex;flex:1;flex-direction:column;padding:25px}.journal-card small{color:#68745f;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase}.journal-card h2{font:400 1.6rem/1.25 Georgia,serif;margin:15px 0}.journal-card p{font-size:.94rem;line-height:1.65;color:#53665a;margin:0 0 25px}.journal-card b{margin-top:auto;font-size:.85rem}.journal-card:focus-visible{outline:3px solid #325c42;outline-offset:4px}@media(max-width:1000px){.journal-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:650px){.journal-cards{grid-template-columns:1fr}.journal-card-copy{padding:22px}}@media(prefers-reduced-motion:reduce){.journal-card{transition:none}}
</style>`;

export function journalListing(insights, arrow) {
  const articles = getJournalArticles(insights);
  return `${listingStyle}<section class="section journal-index" aria-labelledby="journal-index-heading"><h2 id="journal-index-heading" class="journal-index-heading">Le journal Deux Rives Web</h2><p class="journal-index-intro">Logiciels métier, intégrations, IA, cloud et parcours clients : des repères concrets pour décider et mettre en œuvre, en France et dans les contextes explorés par nos analyses.</p><div class="journal-cards">${articles.map(post => `<a class="journal-card" href="../regards/${esc(post.id)}/"><img src="${esc(imageUrl(post, '../'))}" alt="${esc(post.imageAlt)}" width="${post.imageWidth || 1600}" height="${post.imageHeight || 900}" loading="lazy" decoding="async"><div class="journal-card-copy"><small>${esc(post.tag)} · ${post.readingMinutes} min de lecture</small><h2>${esc(post.title)}</h2><p>${esc(post.lead)}</p><b>Lire l’article ${arrow}</b></div></a>`).join('')}</div></section>`;
}

function tableOfContents(body) {
  const headings = [];
  body = body.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, title) => {
    const id = `section-${headings.length + 1}`;
    headings.push({id, title: text(title)});
    return `<h2 id="${id}">${title}</h2>`;
  });
  const toc = `<details class="journal-toc"><summary>Dans cet article</summary><ol>${headings.map(heading => `<li><a href="#${heading.id}">${esc(heading.title)}</a></li>`).join('')}</ol></details>`;
  return {body, toc};
}

const articleStyle = `<style>
.journal-article .article-art{margin:35px 0}.journal-article .article-art img{display:block;width:100%;height:auto;max-height:none;aspect-ratio:16/9;object-fit:cover}.journal-article .article-author a{text-decoration:underline;text-underline-offset:3px}.journal-article .article-body h2{font:400 clamp(1.7rem,3vw,2.4rem)/1.25 Georgia,serif;margin:2em 0 .7em;scroll-margin-top:115px}.journal-article .article-body h3{font-size:1.2rem;margin:1.6em 0 .6em}.journal-article .article-body ul,.journal-article .article-body ol{padding-left:1.5em;line-height:1.8}.journal-article .article-body li{margin-bottom:.65em}.journal-article .article-body a{text-decoration:underline;text-underline-offset:3px;overflow-wrap:anywhere}.journal-article blockquote{border-left:3px solid #7b8d72;margin:30px 0;padding:10px 25px;font:italic 1.35rem/1.6 Georgia,serif}.journal-toc{background:#eef1e9;border:1px solid #d8dfd5;border-radius:10px;padding:20px 24px;margin:30px 0}.journal-toc summary{font-weight:700;cursor:pointer}.journal-toc ol{padding-left:20px;line-height:1.6}.journal-toc li{margin:9px 0}.journal-toc a{text-decoration:underline;text-underline-offset:3px;overflow-wrap:anywhere}
.journal-article .guide-summary{background:#eef1e9;border:1px solid #d8dfd5;border-radius:10px;padding:22px 25px;margin:30px 0}.journal-article .guide-summary strong{font-size:1.1rem}.journal-article .guide-summary ul{margin-bottom:0}.journal-article .guide-chart{margin:35px 0 20px}.journal-article .guide-chart img{display:block;max-width:100%;width:100%;height:auto;border:1px solid #d8dfd5;border-radius:12px}.journal-article .guide-chart figcaption p{font-size:.95rem;line-height:1.75;color:#485e4d;margin-top:16px}.journal-article .guide-table{max-width:100%;overflow-x:auto;border:1px solid #d8dfd5;border-radius:10px;margin:20px 0 35px}.journal-article .guide-table table{border-collapse:collapse;width:100%;font-size:1rem;line-height:1.7}.journal-article .guide-table caption{text-align:left;font-weight:700;padding:16px;background:#eef1e9}.journal-article .guide-table th,.journal-article .guide-table td{padding:14px 16px;text-align:left;border-top:1px solid #d8dfd5;vertical-align:top}.journal-article .guide-table thead{background:#f4f5ef}.journal-article .guide-table tbody th{font-weight:500}.journal-article .guide-table td{white-space:nowrap}.journal-article .guide-table:focus-visible{outline:3px solid #325c42;outline-offset:4px}@media(max-width:650px){.journal-article .guide-summary{padding:18px}.journal-article .guide-table th,.journal-article .guide-table td{padding:12px}.journal-article .guide-chart{margin-inline:0}}

</style>`;

export function buildJournal(write, cta, insights) {
  for (const post of getJournalArticles(insights)) {
    const {body, toc} = tableOfContents(post.body);
    const modified = new Intl.DateTimeFormat('fr-FR', {dateStyle:'long', timeZone:'UTC'}).format(new Date(post.modified));
    const related = post.related ? `<nav class="article-related" aria-label="Pour aller plus loin"><strong>Pour approfondir</strong>${post.related.map(([label, link]) => `<a href="../../${esc(link)}">${esc(label)} ↗</a>`).join('')}</nav>` : '';
    write(`regards/${post.id}/`, {
      title: post.title, seoTitle: post.seoTitle, description: post.description,
      section: 'L’agence', image: post.image, blogMeta: post,
      body: `${articleStyle}<article class="article journal-article"><a class="backlink" href="../../regards/">← Tous les articles</a><span class="eyebrow">Regards · ${esc(post.tag)}</span><h1>${esc(post.title)}</h1><p class="article-lead">${esc(post.lead)}</p><p class="article-author"><a href="../../agence/">Rédaction Deux Rives Web</a> · ${post.readingMinutes} min de lecture · Mise à jour : <time datetime="${esc(post.modified)}">${modified}</time></p><div class="article-art"><img src="${esc(imageUrl(post, '../../'))}" alt="${esc(post.imageAlt)}" width="${post.imageWidth || 1600}" height="${post.imageHeight || 900}" loading="eager" decoding="async" fetchpriority="high"></div>${toc}<div class="article-body">${body}</div>${related}</article>${cta('../../')}`
    });
  }
}

