// Long-form original French guidance for Deux Rives Web Insights.
const guidance={
'quand-un-tableur-devient-un-systeme':{
title:'Les signaux indiquant que le tableur ne suffit plus',
text:'Le vrai seuil n’est pas une taille de fichier. Il apparaît lorsque plusieurs versions sont utilisées, lorsque les mises à jour demandent des vérifications manuelles et lorsque personne ne peut expliquer avec certitude l’état d’un dossier. L’objectif d’un outil métier est alors de rendre explicites les règles qui existaient auparavant uniquement dans les habitudes de l’équipe.',
checks:['Identifier les trois décisions les plus fréquentes et les personnes qui les prennent.','Recenser les colonnes, les fichiers sources et les mises à jour contradictoires.','Définir un état unique du dossier et un historique de modification.'],
examples:'Une petite société de services conserve les demandes dans un tableur et les pièces jointes dans la messagerie. Lorsqu’une personne est absente, le suivi s’arrête. Une première application peut simplement centraliser le dossier, son responsable et son prochain contrôle, sans reconstruire toute l’organisation.'
},
'automatiser-sans-perdre-le-controle':{
title:'Concevoir l’automatisation autour des exceptions',
text:'Un processus automatisé doit être décrit comme une succession d’états vérifiables. Une action doit pouvoir être relancée sans créer un doublon, et un échec doit être visible pour la personne responsable. Les validations humaines sont utiles lorsqu’elles protègent une décision financière, une donnée sensible ou une étape irréversible.',
checks:['Définir un déclencheur clair et une condition de succès observable.','Prévoir les erreurs, doublons, délais dépassés et validations manuelles.','Documenter la reprise : qui intervient, quelles données sont conservées et quel message est envoyé.'],
examples:'Un document reçu peut alimenter automatiquement une file de contrôle. Si une valeur ne correspond pas à une règle, le dossier reste visible dans une liste de vérification. L’automatisation ne décide pas à la place de l’équipe ; elle prépare une information exploitable et permet de reprendre le traitement.'
},
'un-site-qui-continue-apres-le-formulaire':{
title:'Un parcours client doit continuer après le clic',
text:'L’expérience numérique est souvent évaluée jusqu’à la conversion, alors que le client a encore besoin d’une confirmation, d’un interlocuteur et parfois d’informations complémentaires. La conception d’un site utile suppose de décrire les étapes qui suivent une demande : attribution, validation, disponibilité, préparation et réponse.',
checks:['Écrire le message de confirmation en indiquant la prochaine étape.','Vérifier le parcours interne de réception et de traitement des demandes.','Donner au client un moyen de retrouver le contexte de son échange, si le volume le justifie.'],
examples:'Une entreprise reçoit une demande de devis. Le formulaire confirme la réception, l’équipe obtient une tâche contextualisée et le client sait quelles informations manquent. La qualité de l’expérience dépend autant de cette coordination que de l’interface d’accueil.'
}
};
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function enrichArticle(route,body){
 const id=route.split('/')[1],d=guidance[id];if(!d)return body;
 const extra='<section class="dr-narrative dr-narrative--sage"><div class="dr-narrative-heading"><span class="eyebrow">Une méthode à appliquer</span><div><h2>'+safe(d.title)+'</h2><p>'+safe(d.text)+'</p></div></div><div class="dr-narrative-grid">'+d.checks.map((c,i)=>'<article class="dr-narrative-card"><small>VÉRIFICATION 0'+(i+1)+'</small><h3>'+safe(['Comprendre','Structurer','Tester'][i])+'</h3><p>'+safe(c)+'</p></article>').join('')+'</div></section><section class="dr-narrative dr-narrative--dark"><div class="dr-narrative-heading"><span class="eyebrow">Exemple fictif</span><div><h2>Un cas concret à examiner avant le développement</h2><p>'+safe(d.examples)+'</p><p>Ces situations sont illustratives. Elles ne constituent ni des statistiques ni des résultats de projets clients. Elles servent à vérifier les hypothèses de conception avec les utilisateurs.</p></div></div></section>';
 return body.replace('</article>',extra+'</article>');
}
export const articleDepthCount=Object.keys(guidance).length;
