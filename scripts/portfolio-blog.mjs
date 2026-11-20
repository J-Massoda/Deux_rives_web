import fs from 'node:fs';

const contentRoot = new URL('../content/blog/', import.meta.url);
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const portfolioPosts = JSON.parse(fs.readFileSync(new URL('manifest.json', contentRoot), 'utf8'));
const bySource = new Map(portfolioPosts.map(post => [post.source, post]));
const imageUrl = (post, base) => post.image.startsWith('https://') ? post.image : base + post.image;
const relatedUrl = href => {
  const post = bySource.get(href);
  return post ? `../${post.id}/` : href;
};

// Styles are confined to the imported blog; shared assets and existing pages are unchanged.
const listingStyle = `<style>
.portfolio-blog-index{padding-bottom:60px}.portfolio-blog-index .portfolio-blog-heading{font:400 clamp(2rem,4vw,3.5rem)/1.15 Georgia,serif;margin:0 0 35px}.portfolio-blog-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px 24px}.portfolio-blog-card{display:flex;flex-direction:column;min-width:0;background:#fff;border:1px solid #d8dfd5;border-radius:14px;overflow:hidden;transition:transform .2s,box-shadow .2s}.portfolio-blog-card:hover{transform:translateY(-4px);box-shadow:0 14px 35px #18282014}.portfolio-blog-card img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#e8ece4}.portfolio-blog-card-copy{display:flex;flex:1;flex-direction:column;padding:25px}.portfolio-blog-card small{color:#68745f;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase}.portfolio-blog-card h2{font:400 1.6rem/1.25 Georgia,serif;margin:15px 0}.portfolio-blog-card p{font-size:.94rem;line-height:1.65;color:#53665a;margin:0 0 25px}.portfolio-blog-card b{margin-top:auto;font-size:.85rem}.portfolio-blog-card:focus-visible{outline:3px solid #325c42;outline-offset:4px}@media(max-width:1000px){.portfolio-blog-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:650px){.portfolio-blog-cards{grid-template-columns:1fr}.portfolio-blog-card-copy{padding:22px}}@media(prefers-reduced-motion:reduce){.portfolio-blog-card{transition:none}}
</style>`;

export function portfolioBlogListing(arrow) {
  return `${listingStyle}<section class="section portfolio-blog-index" aria-labelledby="portfolio-blog-heading"><h2 id="portfolio-blog-heading" class="portfolio-blog-heading">Technologie, création et travail au quotidien</h2><div class="portfolio-blog-cards">${portfolioPosts.map(post => `<a class="portfolio-blog-card" href="../regards/${esc(post.id)}/"><img src="${esc(imageUrl(post, '../'))}" alt="${esc(post.imageAlt)}" width="1600" height="900" loading="lazy" decoding="async"><div class="portfolio-blog-card-copy"><small>${esc(post.tag)}</small><h2>${esc(post.title)}</h2><p>${esc(post.lead)}</p><b>Lire l’article ${arrow}</b></div></a>`).join('')}</div></section>`;
}

export function buildPortfolioBlog(write, cta) {
  for (const post of portfolioPosts) {
    const fragment = fs.readFileSync(new URL(`${post.sourceSlug}.html`, contentRoot), 'utf8')
      .replace(/<h1>[\s\S]*?<\/h1>\s*/, '')
      .replace(/<p class="blog-category">[\s\S]*?<\/p>\s*/, '')
      .replace(/<p class="blog-lead">[\s\S]*?<\/p>\s*/, '');
    const publication = post.date ? ` · <time datetime="${esc(post.date)}">${new Intl.DateTimeFormat('fr-FR', {dateStyle:'long', timeZone:'UTC'}).format(new Date(post.date))}</time>` : '';
    const references = post.links.length ? `<section class="portfolio-blog-references"><h2>Sources et lectures complémentaires</h2><ul>${post.links.map(link => `<li><a href="${esc(relatedUrl(link.url))}">${esc(link.label)}</a></li>`).join('')}</ul></section>` : '';
    write(`regards/${post.id}/`, {
      title: post.title,
      description: post.lead,
      section: 'L’agence',
      image: post.image,
      blogMeta: post,
      body: `<style>.portfolio-blog-article .article-art{margin:35px 0}.portfolio-blog-article .article-art img{display:block;width:100%;height:auto;max-height:none;aspect-ratio:16/9;object-fit:cover}.portfolio-blog-article .article-body h2{font:400 clamp(1.7rem,3vw,2.4rem)/1.25 Georgia,serif;margin:2em 0 .7em}.portfolio-blog-article .article-body h3{font-size:1.2rem;margin:1.6em 0 .6em}.portfolio-blog-article .article-body ul,.portfolio-blog-article .article-body ol{padding-left:1.5em;line-height:1.8}.portfolio-blog-article .article-body li{margin-bottom:.65em}.portfolio-blog-article .article-body a{text-decoration:underline;text-underline-offset:3px;overflow-wrap:anywhere}.portfolio-blog-article blockquote{border-left:3px solid #7b8d72;margin:30px 0;padding:10px 25px;font:italic 1.35rem/1.6 Georgia,serif}.portfolio-blog-references{border-top:1px solid #d8dfd5;margin-top:45px;padding-top:10px}.portfolio-blog-source{font-size:.85rem;line-height:1.6;color:#65705f;border-top:1px solid #d8dfd5;padding-top:25px;margin-top:35px}</style><article class="article portfolio-blog-article"><a class="backlink" href="../../regards/">← Tous les regards</a><span class="eyebrow">Regards · ${esc(post.tag)}</span><h1>${esc(post.title)}</h1><p class="article-lead">${esc(post.lead)}</p><p class="article-author">Jean Emilien Massoda · Version française${publication}</p><div class="article-art"><img src="${esc(imageUrl(post, '../../'))}" alt="${esc(post.imageAlt)}" width="1600" height="900" loading="eager" decoding="async" fetchpriority="high"></div><div class="article-body">${fragment}${references}<p class="portfolio-blog-source">Version française de l’article de Jean Emilien Massoda. <a href="${esc(post.source)}" lang="en" hreflang="en">Lire l’original en anglais sur Massoda</a>.</p></div></article>${cta('../../')}`
    });
  }
}
