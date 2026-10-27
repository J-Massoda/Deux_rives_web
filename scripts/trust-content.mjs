import fs from 'node:fs';
const buying=JSON.parse(fs.readFileSync(new URL('./service-buying-content.json',import.meta.url),'utf8'));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const catalogue=(base)=>`<section class="catalogue-guide section"><span class="eyebrow">Comprendre le studio</span><h2>Un catalogue, trois repères.</h2><div class="catalogue-guide-grid"><article><strong>24 démonstrations métier</strong><p>Chaque application propose un parcours interactif avec des données fictives. Sa fiche de conception explique le besoin et les choix d’interface.</p><a href="${base}studio/">Explorer les 24 démonstrations ↗</a></article><article><strong>8 démonstrations à découvrir en premier</strong><p>La sélection de la page d’accueil met en avant huit parcours du même catalogue. Les quatre aperçus de la page Démonstrations constituent une porte d’entrée dans cette sélection.</p><a href="${base}#priority-products">Voir la sélection de 8 ↗</a></article><article><strong>5 scénarios guidés</strong><p>Des exercices courts permettent de découvrir le suivi d’un dossier, d’une intervention ou d’une commande. Ils complètent les 24 applications métier.</p><a href="${base}demonstrations/#scenarios-guides">Essayer un scénario guidé ↗</a></article></div><p class="catalogue-note">Statut commun : démonstration interactive · données fictives · stockage local. Les démonstrations ne sont pas des logiciels en production ni des références clients.</p></section>`;
const linkedInMark='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM21 13.8c0-3.5-1.9-5.2-4.4-5.2-2 0-2.9 1.1-3.4 1.9v-2h-3.5V21h3.5v-7c0-1.8.9-2.7 2.2-2.7s2.1.9 2.1 2.7v7H21v-7.2Z"/></svg>';
const founders=`<section class="section founders" id="cofondateurs"><div class="founder-heading"><span class="eyebrow">L’équipe fondatrice</span><h2>Les co-fondateurs.</h2></div><div class="founder-grid"><article class="founder-card"><div class="founder-portrait"><span class="founder-role">Co-fondateur</span><img src="../assets/founder-default.svg" width="480" height="560" alt="" loading="lazy"><span class="founder-monogram" aria-hidden="true">JM</span></div><div class="founder-caption"><h3>Jean Emilien Massoda</h3><p>Ingénierie logicielle, produits numériques et intégrations métier.</p><a class="founder-social" href="https://www.linkedin.com/in/jean-emilien-massoda-l-59b7061a9/?" target="_blank" rel="noopener noreferrer" aria-label="Profil LinkedIn de Jean Emilien Massoda">${linkedInMark}<span>LinkedIn</span><span aria-hidden="true">↗</span></a></div></article><article class="founder-card founder-card--warm"><div class="founder-portrait"><span class="founder-role">Co-fondateur</span><img src="../assets/founder-default.svg" width="480" height="560" alt="" loading="lazy"><span class="founder-monogram" aria-hidden="true">CA</span></div><div class="founder-caption"><h3>Claude Armand</h3><p>Co-fondateur de Deux Rives Web.</p><span class="founder-social founder-social--pending" aria-disabled="true" aria-label="Profil LinkedIn de Claude Armand non renseigné">${linkedInMark}<span>LinkedIn</span></span></div></article></div></section>`;
export function refineTrustContent(route,page){
 let body=page.body; const parts=route.split('/').filter(Boolean),base='../'.repeat(parts.length),id=parts.at(-1);
 if(parts[0]==='expertises'&&buying[id]){
  const hero=body.slice(0,body.indexOf('</section>')+10);
  const cta=body.slice(body.lastIndexOf('<section class="cta-band">'));
  body=hero+buying[id].map(([label,title,copy],i)=>`<section class="section buying-section" id="${['perimetre','livrables','integrations','calendrier','propriete','support'][i]}"><div><span class="eyebrow">0${i+1} · ${label}</span><h2>${title}</h2></div><div><p>${copy}</p></div></section>`).join('')+`<section class="section related"><span class="eyebrow">Préparer votre projet</span><h2>Un périmètre écrit avant de commencer.</h2><p>Présentez-nous vos utilisateurs, vos outils actuels et le processus à améliorer. Nous pourrons identifier les informations manquantes, les dépendances et les prochaines décisions. Les livrables, le calendrier, les droits et le support seront définis dans une proposition adaptée.</p><a class="button button-outline" href="../../contact/">Présenter votre besoin ↗</a><a class="buying-demo-link" href="../../demonstrations/">Explorer une démonstration interactive ↗</a></section>`+cta;
 }
 const replacements=[
 ['Les autres projets restent des concepts exploratoires.','Les huit applications présentées ici sont une sélection du catalogue de 24 démonstrations interactives.'],
 ['Les applications présentées ne sont pas toutes des produits disponibles.','Les 24 démonstrations sont interactives et utilisent des données fictives ; elles ne sont pas des produits en production.'],
 ['Nos scénarios interactifs existants peuvent être essayés indépendamment.','Chaque fiche renvoie à la démonstration interactive correspondante.'],
 ['QUATRE PARCOURS FONCTIONNELS','SÉLECTION · 4 DÉMONSTRATIONS INTERACTIVES'],
 ['Les quatre applications principales enregistrent leurs opérations','Les applications de cette sélection enregistrent leurs opérations'],
 ['Autres scénarios','Scénarios guidés'],
 ['Cinq parcours plus simples à explorer.','5 scénarios guidés pour découvrir les workflows.'],
 ['Les vidéos correspondantes sont en préparation.','Ouvrez les démonstrations interactives pour essayer les parcours.'],
 ['Nos applications phares','Notre sélection de démonstrations'],
 ['NOS APPLICATIONS PHARES','SÉLECTION · 8 DÉMONSTRATIONS INTERACTIVES']
 ]; for(const [a,b] of replacements)body=body.split(a).join(b);
 if(route==='agence/')body=body.replace('</section>','</section>'+founders);
 if(route==='studio/'||route==='demonstrations/')body=body.replace('</section>','</section>'+catalogue(base));
 if(route==='demonstrations/')body=body.replace('<div class="demo-grid">','<div class="demo-grid" id="scenarios-guides">');
 if(route==='studio/')body=body.replace(/(<a class="concept-card reveal"[^>]*>)/g,'$1<span class="demo-status">Démonstration interactive</span>');
 if(parts[0]==='studio'&&parts.length===2)body=body.replace('Fiche de conception · données fictives','Fiche de conception · démonstration interactive · données fictives');
 if(parts[0]==='applications'&&parts.length===2)body=body.replace(/(<h1>)/,'<p class="demo-status">Démonstration interactive · données fictives</p>$1');
 if(route==='contact/'){
  body=body.replace('<section class="section contact-layout">',`<section class="section contact-entry"><span class="eyebrow">Paris, France</span><h2>Votre projet commence par un échange.</h2><p>Écrivez à <a href="mailto:services@deuxrivesweb.fr">services@deuxrivesweb.fr</a> ou préparez votre message ci-dessous. Vous pourrez le relire, le copier ou l’ouvrir dans votre messagerie avant de l’envoyer.</p></section><section class="section contact-layout">`);
  body=body.replace('<h4>Votre brief est prêt</h4>','<h4>Votre message est prêt à être relu</h4><p>Il n’a pas encore été envoyé. Ouvrez votre messagerie et confirmez l’envoi, ou copiez le texte dans un e-mail à services@deuxrivesweb.fr.</p>');
  body=body.replace('<button type="button" data-download>','<button type="button" data-copy>Copier le message</button><span data-copy-status role="status"></span><button type="button" data-download>');
  body=body.replace('Ouvrir ma messagerie','Ouvrir ma messagerie pour envoyer');
  body=body.replace('organisation" autocomplete="organization" required','organisation" autocomplete="organization"');
  body=body.replace('name="email" type="email" autocomplete="email" required','name="email" type="email" autocomplete="email" required maxlength="254"');
 }
 return {...page,body};
}
