const logos = [
  ['Codeur.com', 'https://pbs.twimg.com/profile_images/1067045199434653698/IAv3NWoi.jpg'],
  ['Malt', 'malt.svg'],
  ['WeWeb', 'https://developer.weweb.io/assets/WEWEB-LOGO_SANS_TEXTE.HRyat2aV.png'],
  ['Webflow', 'webflow.svg'],
  ['WordPress', 'wordpress.svg'],
  ['Wix', 'wix.svg'],
  ['Firebase', 'firebase.svg'],
  ['AWS', 'aws.svg'],
  ['GoodBarber', 'https://portal.ww-cdn.com/portal_static/images/presse/black_symbol_goodbarber.cdccede38736.svg'],
  ['PandaSuite', 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/96/a6/ea/96a6ea96-1e1a-ca2f-ea4e-6d22960dbb22/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/1200x630wa.png'],
  ['Ksaar', 'https://make-cxp-documentation.ams3.digitaloceanspaces.com/apps-center-icons/ksaar.png'],
  ['Axelor', 'axelor.webp'],
  ['Convertigo', 'convertigo.webp'],
  ['Bonitasoft', 'https://upload.wikimedia.org/wikipedia/commons/2/2a/2022_Logo-Bonitasoft.png'],
  ['Bubble', 'bubble.svg'],
  ['Framer', 'framer.svg'],
  ['Carrd', 'carrd.svg'],
  ['Glide', 'glide.svg'],
  ['Adalo', 'https://pbs.twimg.com/profile_images/1146051540802818049/OT6-JUhc.png'],
  ['FlutterFlow', 'https://cdn.xano.com/home/0.0.654-d8eujKFR/assets/img/v3/home/hero/frontend/flutterflow-icon.svg'],
  ['Softr', 'https://res.cloudinary.com/helpkit/image/upload/v1746441279/softrdocs_logo_light_4233c5958f.png'],
  ['Zapier', 'zapier.svg'],
  ['Make', 'make.svg'],
  ['n8n', 'n8n.svg'],
  ['Airtable', 'airtable.svg'],
  ['Notion', 'notion.svg'],
  ['Xano', 'https://pic.clubic.com/v1/images/2416513/raw'],
  ['Baserow', 'baserow.svg'],
  ['Shopify', 'shopify.svg'],
  ['Gumroad', 'gumroad.svg'],
  ['Stripe Payments', 'stripe.svg'],
  ['Tally', 'https://s3-us-west-2.amazonaws.com/public.notion-static.com/7053b1cc-93fd-4a8b-847c-91b85210754c/Tally_Icon_-_Black_1.png'],
  ['Jotform', 'https://www.jotform.com/resources/assets/logo-nb/jotform-logo-transparent-800x800.png']
];

export function platformLogos() {
  const list = duplicate => `<ul class="platform-logos-list"${duplicate ? ' aria-hidden="true"' : ''}>${logos.map(([name, asset]) => {
    const source = asset.startsWith('https://') ? asset : 'assets/platforms/' + asset;
    return `<li><img src="${source}" alt="${duplicate ? '' : name}" width="108" height="34" loading="lazy" decoding="async" referrerpolicy="no-referrer"></li>`;
  }).join('')}</ul>`;
  return `<section class="platform-logos" aria-label="Outils et plateformes">
    <div class="platform-logos-window"><div class="platform-logos-track">${list(false)}${list(true)}</div></div>
    <button class="platform-logos-toggle" type="button" aria-label="Mettre en pause le défilement des logos" hidden>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path class="platform-logos-pause" d="M9 6v12m6-12v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path class="platform-logos-play" d="m9 6 10 6-10 6Z" fill="currentColor"/>
      </svg>
    </button>
  </section>`;
}
