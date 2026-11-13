import fs from 'node:fs';
const images=JSON.parse(fs.readFileSync(new URL('../assets/image-manifest.json',import.meta.url),'utf8'));
const byId=Object.fromEntries(images.map(x=>[x.id,x]));
const sectorMedia = {
 'batiment-interventions': {
  photoId: '8961001',
  photo: 'https://www.pexels.com/photo/person-in-green-and-blue-shirt-holding-white-digital-tablet-8961001/',
  alt: 'Un intervenant consulte des plans sur une tablette en extérieur.',
  credit: 'Mikael Blomkvist',
  video: 'https://www.pexels.com/video/man-using-digital-tablet-6473959/',
  videoLabel: 'Voir la préparation d’une rénovation'
 },
 'commerce-operations': {
  photoId: '4483942',
  photo: 'https://www.pexels.com/photo/photo-of-a-man-scanning-products-in-a-warehouse-4483942/',
  alt: 'Un opérateur scanne des références dans un entrepôt.',
  credit: 'Tiger Lily',
  video: 'https://www.pexels.com/video/man-scanning-the-codes-of-the-stocks-in-the-warehouse-4292903/',
  videoLabel: 'Voir un contrôle de stock par scan'
 },
 'sante-administrative': {
  photoId: '4269275',
  photo: 'https://www.pexels.com/photo/a-receptionist-looking-at-a-tablet-4269275/',
  alt: 'Une personne à l’accueil d’une clinique consulte une tablette.',
  credit: 'Cedric Fauntleroy',
  video: 'https://www.pexels.com/video/patient-in-a-reception-of-a-clinic-6755024/',
  videoLabel: 'Voir un exemple d’accueil en clinique'
 }
};

function sectorMediaStory({photoId, photo, alt, credit, video, videoLabel}) {
 const cdn = `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&amp;cs=tinysrgb`;
 return `<section class="photo-story sector-media" aria-label="Contexte métier">
   <figure>
    <img src="${cdn}&amp;w=1280" srcset="${cdn}&amp;w=640 640w, ${cdn}&amp;w=1280 1280w" sizes="(max-width: 700px) 90vw, 70vw" alt="${alt}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
    <figcaption>Photo d’illustration · <a href="${photo}">${credit} / Pexels</a></figcaption>
   </figure>
   <a class="sector-media-video" href="${video}"><span aria-hidden="true">▶</span> ${videoLabel} <small>(Pexels)</small></a>
 </section>`;
}
export function applyPhotography(route,page){
 const media = route.startsWith('secteurs/') && sectorMedia[route.split('/')[1]];
 let body = media ? page.body.replace('</section>', '</section>' + sectorMediaStory(media)) : page.body;
 // Upgrade all renamed images with responsive sources, dimensions and meaningful descriptions.
 body=body.replace(/<img\b[^>]*>/g,tag=>{const match=tag.match(/src="([^"]*assets\/([^/]+)\.png)"/);if(!match||!byId[match[2]])return tag;const x=byId[match[2]],prefix=match[1].slice(0,-4);let result=tag.replace(match[1],prefix+'.webp');if(!/width=/.test(result))result=result.replace('<img',`<img width="${x.width}" height="${x.height}" decoding="async"`);if(!/srcset=/.test(result))result=result.replace('<img',`<img srcset="${prefix}-640.webp 640w, ${prefix}.webp ${x.width}w" sizes="(max-width: 700px) 100vw, 50vw"`);return result;});
 return {...page,body};
}
