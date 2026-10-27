import {renderIndustryPreview} from './product-ui.mjs';
// These pages document demonstrable processes, not past client engagements.
const studies={
'intervention-360':{
name:'Intervention 360',sector:'Bâtiment, maintenance et services terrain',
heading:'Du signalement à la clôture, une intervention qui ne perd pas le fil.',
intro:'Une demande de maintenance traverse généralement plusieurs mains : l’accueil recueille le problème, le responsable coordonne les disponibilités, le technicien intervient, puis une décision confirme la clôture. Intervention 360 explore ce parcours complet sans réduire la gestion terrain à un tableau de tâches.',
problem:'Quand les demandes arrivent par téléphone, courrier électronique et messagerie, il devient difficile de savoir qui a repris un incident, quel site est concerné et quelles actions restent attendues. Le travail réel exige des responsabilités, des statuts explicites et une trace des décisions. La solution à concevoir doit surtout aider à éviter les interventions oubliées, les affectations ambiguës et les comptes rendus dispersés.',
reason:'Ce démonstrateur permet de créer des ordres de travail fictifs, d’affecter un responsable, de démarrer une intervention, puis de la terminer avec un compte rendu simulé. Le bureau voit immédiatement combien de demandes attendent une planification et combien sont en cours de réalisation. Les choix de géolocalisation, de pièces jointes, de signature et de synchronisation terrain devront être cadrés pour un projet réel.',
features:[
['Réception structurée','Chaque demande associe une opération et un site ou client. Dans un système réel, les champs nécessaires dépendraient des métiers et des obligations de suivi.'],
['Affectation et progression','Une mission change de statut entre nouvelle demande, intervention planifiée, démarrage et clôture. La responsabilité est visible à chaque transition.'],
['Traçabilité terrain','Le journal local enregistre les étapes simulées et fait apparaître un compte rendu de fin d’intervention, sans stockage serveur ni géolocalisation.']],
audience:'Entreprises de maintenance, installateurs, services après-vente, facility management et coordination de travaux.',
steps:['Déclarer un nouvel ordre de travail','Affecter un technicien disponible','Faire passer la mission en cours','Terminer avec un compte rendu simulé'],
faq:[
['La démonstration peut-elle gérer plusieurs techniciens en temps réel ?','Non. Elle illustre le cycle de vie d’une intervention dans un seul navigateur. La collaboration, les rôles utilisateurs et les synchronisations demandent une infrastructure serveur adaptée.'],
['Une application mobile peut-elle fonctionner hors ligne ?','C’est possible selon l’architecture choisie, mais cette démonstration ne met pas en œuvre une synchronisation différée. Ce besoin doit être étudié avant le développement.'],
['Quel indicateur est réellement utile ?','L’information doit éclairer l’exploitation : demandes non affectées, travaux en attente, reprises nécessaires et délais, une fois les règles de mesure établies.']],
type:'dispatch',related:'batiment-interventions'
},
'factureconnect':{
name:'FactureConnect',sector:'Commerce, administratif et intégrations',
heading:'Une facture ne doit pas disparaître entre la commande et son traitement.',
intro:'Les factures circulent entre les équipes commerciales, administratives et les outils comptables. Les étapes de contrôle et de transmission doivent être compréhensibles, surtout lorsqu’un document est incomplet ou qu’un système externe ne répond pas. FactureConnect représente une piste d’interface de préparation et de suivi.',
problem:'La circulation manuelle des pièces peut provoquer des doublons, retards et incertitudes sur l’état d’un dossier. Une application métier pertinente doit distinguer la préparation interne, la validation et les échanges réglementés avec un service autorisé. Elle ne peut pas prétendre remplacer une plateforme agréée de facturation électronique.',
reason:'Le scénario permet de créer une facture fictive, d’enregistrer une étape de revue, de confirmer la préparation, puis d’exporter un JSON local. Le calcul de taxe utilisé est illustratif et ne doit pas être interprété comme une règle fiscale applicable à tous les dossiers.',
features:[
['Préparation des données','Un montant hors taxe et un montant de taxe fictif sont rassemblés dans un dossier avec son entreprise et sa référence.'],
['Contrôle progressif','Les états brouillon, à vérifier et prêt à exporter décrivent une succession de validations internes qui pourrait être ajustée à l’organisation.'],
['Sortie structurée','L’export JSON sert de démonstration du format d’échange ; aucun document n’est transmis à un système comptable ou réglementaire.']],
audience:'PME, services achats, équipes de gestion administrative et intégrateurs de logiciels de facturation.',
steps:['Créer un dossier facture fictif','Soumettre le dossier au contrôle','Valider la préparation interne','Exporter les champs structurés en JSON'],
faq:[
['FactureConnect est-il une plateforme agréée ?','Non. Le concept et son démonstrateur ne remplacent aucune plateforme agréée et ne réalisent aucune émission réglementaire de facture électronique.'],
['Les chiffres de TVA sont-ils fiables pour la comptabilité ?','Non. La démonstration utilise un taux purement illustratif. Les règles de TVA doivent être définies avec des professionnels compétents et les outils conformes.'],
['Peut-on connecter une solution au CRM ou à un ERP ?','Un connecteur peut être envisagé lorsque les API et autorisations le permettent. Les règles de reprise, de doublon et de statut doivent être spécifiées avant l’intégration.']],
type:'invoice',related:'commerce-operations'
},
'devis-atelier':{
name:'Devis Atelier',sector:'Artisans, travaux et services sur mesure',
heading:'Un devis vivant, où chaque modification reste compréhensible.',
intro:'Un devis pour un chantier, un atelier ou une prestation complexe n’est pas simplement un document texte. Les quantités, options, ressources et validations évoluent au fil de la discussion. Devis Atelier explore une construction de proposition structurée, avec calcul immédiat et gestion de révision.',
problem:'Quand un client modifie une matière, une prestation ou une quantité, le devis initial peut rapidement devenir incohérent avec la dernière proposition. Le suivi doit distinguer les versions, les montants calculés, les étapes d’envoi et les décisions de validation. Une solution utile prévoit aussi les limites de modification d’un devis déjà accepté.',
reason:'Vous pouvez ajouter une prestation, modifier les quantités, visualiser les montants HT/TTC fictifs et faire progresser l’état de la proposition. Modifier une quantité après envoi génère une nouvelle version brouillon : l’interface montre pourquoi la gestion des versions est une fonction métier essentielle.',
features:[
['Lignes de prestation','Description, quantité et prix unitaire alimentent un calcul réactif. Le système sépare les informations modifiables de la somme calculée.'],
['Version et statut','Un nouveau brouillon est créé lorsque la proposition envoyée change, pour éviter de confondre l’ancienne et la nouvelle.'],
['Présentation claire des totaux','Les montants HT et TTC sont affichés avec une taxe illustrative ; un produit réel demanderait les règles fiscales et commerciales adaptées.']],
audience:'Artisans, entrepreneurs du bâtiment, ateliers, prestataires de rénovation, fabrication sur mesure.',
steps:['Ajouter des prestations et quantités','Vérifier les montants calculés','Marquer la proposition comme envoyée','Modifier une ligne et observer la nouvelle version'],
faq:[
['Le devis est-il envoyé par e-mail ?','Non. Le statut « envoyé » correspond uniquement à une action simulée dans le navigateur. Aucun document n’est transmis.'],
['Les montants permettent-ils de produire un devis légal ?','Non. Les règles contractuelles, fiscales et d’identification de l’émetteur ne sont pas implémentées dans ce prototype.'],
['Peut-on personnaliser les catégories de prestations ?','Une application réelle pourrait proposer catalogues, variantes, unités, conditions et validations selon le métier, sous réserve d’un cadrage adapté.']],
type:'quote',related:'batiment-interventions'
},
'missiondesk':{
name:'MissionDesk',sector:'Conseil, prestations et équipes de service',
heading:'Des missions suivies par leurs livrables, pas uniquement par des heures.',
intro:'Une mission commence avec un engagement, mobilise une équipe et aboutit à un livrable. MissionDesk explore une interface qui rapproche charge prévue, temps enregistré et état de livraison afin de faciliter le passage entre planification, exécution et validation.',
problem:'Dans les entreprises de conseil, l’information relative à la mission peut être fragmentée entre planning, feuilles de temps, dossier client et messagerie. Une charge initiale change, un livrable attend une relecture, et l’équipe ne dispose plus d’un état partagé. La conception d’un logiciel doit donc relier les événements sans confondre effort fourni et qualité livrée.',
reason:'Le démonstrateur permet de créer une mission fictive, d’augmenter le temps suivi, de la soumettre à la livraison puis de la clôturer. Les heures planifiées et enregistrées sont mises à jour immédiatement. La valeur indicative affichée ne constitue pas une facture ni une marge.',
features:[
['Portfolio de missions','Chaque mission relie un client, un titre, une charge prévue et un état opérationnel. Les dossiers restent indépendants et identifiables.'],
['Temps et avancement','Le temps suivi est comparé à la charge estimée, avec une visualisation simple destinée à déclencher un échange sur les écarts.'],
['Validation de livrable','Le passage « en cours » vers « à livrer », puis « terminée », sépare le travail effectué de la confirmation de fin.']],
audience:'Sociétés de conseil, agences, studios, équipes techniques et prestataires B2B.',
steps:['Créer une mission avec une charge estimée','Enregistrer du temps supplémentaire','Soumettre la mission à la livraison','Confirmer le statut terminé'],
faq:[
['MissionDesk produit-il une facturation automatique ?','Non. Les tarifs et heures servent uniquement à illustrer des calculs indicatifs. Aucune facture, paiement ou document contractuel n’est généré.'],
['Le suivi des heures mesure-t-il la productivité d’une personne ?','Pas à lui seul. La qualité des livrables et les contraintes réelles comptent autant que le temps saisi. La démonstration ne classe pas les collaborateurs.'],
['Une organisation peut-elle travailler à plusieurs dans le même espace ?','Ce prototype est local. Les comptes, les autorisations et la collaboration nécessitent un backend et un modèle de sécurité appropriés.']],
type:'timeline',related:'services-professionnels'
}
};
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const wave3Ids=Object.keys(studies);
export function buildWave3(write){
 for(const [id,s] of Object.entries(studies)){
 const peers=Object.entries(studies).filter(([x])=>x!==id);
 const cards=s.features.map(([heading,body],i)=>'<article><small>0'+(i+1)+' / MODULE</small><h3>'+esc(heading)+'</h3><p>'+esc(body)+'</p></article>').join('');
 const flow=s.steps.map((step,i)=>'<li><strong>0'+(i+1)+'</strong><span>'+esc(step)+'</span></li>').join('');
 const faq=s.faq.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('');
 const body='<div class="wave3-page"><section class="wave-app-intro"><a href="../../demonstrations/" class="wave-back">← Toutes les démonstrations</a><div class="wave-hero"><div><span class="eyebrow">WAVE 3 · APPLICATION INTERACTIVE · DONNÉES FICTIVES</span><h1>'+esc(s.heading)+'</h1><p>'+esc(s.intro)+'</p><div class="wave-hero-actions"><a href="#scenario" class="wave-action">Tester le scénario ↓</a><a href="../../contact/?solution='+encodeURIComponent(s.name)+'" class="wave-action secondary">Parlons de votre projet ↗</a></div></div><figure class="wave3-hero-preview"><div class="w3-hero-chip">'+esc(s.name)+'</div><div class="w3-hero-art">◈</div><figcaption>Interface conceptuelle — '+esc(s.sector)+'</figcaption></figure></div></section>'+
 '<section class="wave-trust"><div><strong>Scénarios modifiables</strong><p>Étapes, états et calculs fonctionnent dans le navigateur.</p></div><div><strong>Reprise et réinitialisation</strong><p>Votre scénario est conservé localement puis peut être restauré.</p></div><div><strong>Produit exploratoire</strong><p>Aucun client ou déploiement réel n’est revendiqué.</p></div></section>'+
 '<section class="wave-editorial wave-editorial--deep"><div class="wave-heading"><span>LE PROBLÈME MÉTIER</span><h2>'+esc(s.heading)+'</h2></div><div class="wave-columns"><div><h3>Pourquoi agir ?</h3><p>'+esc(s.problem)+'</p></div><div><h3>Pourquoi ce parcours ?</h3><p>'+esc(s.reason)+'</p></div></div></section>'+
 '<section class="wave-demo-section" id="scenario"><div class="wave-demo-section-head"><span class="eyebrow">DÉMONSTRATION FONCTIONNELLE · '+esc(s.name)+'</span><h2>Faites évoluer les données, observez la logique.</h2><p>Cette démonstration locale repose sur des données fictives. Essayez les interactions, actualisez la page, puis utilisez « Réinitialiser » pour retrouver les valeurs de départ.</p></div><div class="w3-root" data-wave3-app="'+id+'"><p>Chargement du scénario…</p></div></section>'+
 '<section class="wave-editorial"><div class="wave-heading"><span>LES MODULES DU SYSTÈME</span><h2>Une interface conçue autour de ses décisions.</h2></div><div class="wave3-editorial-cards">'+cards+'</div></section>'+
 '<section class="wave-editorial wave-editorial--sage"><div class="wave-heading"><span>PARCOURS À EXPLORER</span><h2>Un test concret, de la demande à la dernière étape.</h2></div><ol class="wave-flow">'+flow+'</ol><p>Le parcours représente une hypothèse de conception. Les règles finales dépendent du métier, de ses obligations et des utilisateurs.</p></section>'+
 '<section class="wave-editorial wave-editorial--deep"><div class="wave-heading"><span>PRÉPARER UNE VERSION RÉELLE</span><h2>La fiabilité n’est pas visible uniquement dans la maquette.</h2></div><div class="wave-columns"><div><h3>Données et permissions</h3><p>La version de démonstration n’a ni identifiants utilisateurs, ni système de rôles, ni serveur. Une mise en production demanderait un contrôle des droits, des sauvegardes, des journaux audités et des validations côté serveur. Les informations sensibles ne doivent pas être saisies dans le prototype.</p></div><div><h3>Intégrations et accompagnement</h3><p>La relation avec un ERP, un CRM, une application mobile ou une plateforme de facturation devrait être étudiée selon les interfaces disponibles et les exigences réglementaires. La maintenance, les tests et le support font partie du périmètre de conception, pas d’une simple option esthétique.</p></div></div></section>'+
 '<section class="wave-editorial"><div class="wave-heading"><span>QUESTIONS FRÉQUENTES</span><h2>Les limites du prototype et les possibilités du produit.</h2></div><div class="studio-faq-grid">'+faq+'</div></section>'+
 '<section class="wave-editorial wave-editorial--sage"><div class="wave-heading"><span>UN BESOIN À VOUS ?</span><h2>Un logiciel utile commence par votre façon de travailler.</h2></div><p>Les secteurs concernés comprennent : '+esc(s.audience)+' La meilleure conception dépendra des équipes, des étapes, des obligations applicables et des outils déjà utilisés.</p><div class="wave-more-links"><a href="../../secteurs/'+s.related+'/">Voir les enjeux du secteur ↗</a><a href="../../contact/?solution='+encodeURIComponent(s.name)+'">Décrire votre projet ↗</a><a href="../../studio/'+id+'/">Fiche de concept ↗</a></div></section>'+
 '<section class="wave-related"><span class="eyebrow">AUTRES PARCOURS OPÉRATIONNELS</span><h2>À chaque métier, son espace de travail.</h2><div>'+peers.map(([key,p])=>'<a href="../../applications/'+key+'/"><b>'+esc(p.name)+'</b><span>'+esc(p.sector)+' ↗</span></a>').join('')+'</div></section></div>';
 write('applications/'+id+'/',{title:s.name+' — démonstration interactive de logiciel métier',description:(s.intro+' '+s.problem).slice(0,155),body});
 }
}
