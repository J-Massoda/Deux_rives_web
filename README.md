# Deux Rives Web — première version locale

Deux Rives Web est une société basée à Paris qui conçoit des logiciels métier, des applications, des sites, des intégrations et des automatisations pour les entreprises. Cette première version du site présente ses expertises, ses secteurs, sa méthode et cinq scénarios interactifs. Elle est principalement en français.

## Ce que contient cette livraison

- 30 pages françaises générées en HTML statique, dont 5 pages d'expertise, 5 pages de secteur, 5 démonstrations, 3 articles, contact, agence, méthode et pages légales.
- Une identité visuelle originale : symbole abstrait, schéma de parcours, cinq visuels sectoriels et aperçu de partage, tous au format SVG dans `assets/`.
- Navigation responsive avec menus, animations de parcours, états de survol et adaptation `prefers-reduced-motion`.
- Cinq démonstrations **dans le navigateur**, chacune permettant de créer un dossier fictif, de changer son état et de réinitialiser. Elles ne stockent ni ne transmettent de données.
- Un générateur de brief qui prépare le texte et permet son téléchargement. L'envoi par e-mail s'active lorsque l'adresse de l'entreprise est configurée.

## Tester localement

Installez Node.js 20 ou plus récent. Aucune installation de dépendances n'est nécessaire.

```bash
npm run dev
```

Ouvrez **http://127.0.0.1:4173/**. Le serveur reconstruit automatiquement les pages lorsque vous modifiez `src/`, `assets/`, `site.config.mjs` ou `scripts/build.mjs`. Rafraîchissez le navigateur après la reconstruction.

Pour produire les fichiers statiques et lancer les contrôles :

```bash
npm run build
npm test
```

Les fichiers destinés à l'hébergement se trouvent dans `dist/`. Pour modifier les graphiques de base, éditez `scripts/generate-art.mjs`, lancez `node scripts/generate-art.mjs`, puis `npm run build`.

## Où modifier le site

| Fichier | Usage |
| --- | --- |
| `scripts/build.mjs` | Pages, textes, navigation, métadonnées et contenu des scénarios. |
| `src/styles.css` | Couleurs, typographie, mise en page et animations. |
| `src/main.js` | Menu, démonstrations et génération du brief. |
| `scripts/generate-art.mjs` | Source des neuf graphiques SVG originaux. |
| `site.config.mjs` | Domaine projeté, coordonnées et données légales à vérifier. |

## Avant toute publication

Cette version est destinée à une revue locale. Le domaine `deuxrivesweb.fr` est un projet d'achat, et les coordonnées de la société ne sont pas encore fournies. La configuration laisse `publishReady: false`; les pages indiquent `noindex,nofollow` et `robots.txt` bloque l'indexation. Les mentions légales affichent les champs à compléter. Ne mettez `publishReady: true` qu'après avoir vérifié **tous** les champs de `legal`, configuré une adresse e-mail qui reçoit réellement les demandes, relu les textes légaux et confirmé le domaine.

Les scénarios sont des exemples fictifs. La page Réalisations ne présente aucun client inventé ni résultat chiffré. Lorsqu'un cas client réel peut être publié avec autorisation, ajoutez une étude de cas distincte précisant le rôle de Deux Rives Web et les résultats constatés.

Le site fonctionne sur un hébergement statique tel que GitHub Pages. Les démonstrations actuelles sont des simulations locales : authentification, persistance partagée, notifications, intégrations et envoi de formulaire exigeraient un service serveur séparé. Le générateur de brief n'envoie rien par lui-même. Une évolution possible est GitHub Pages pour le site et des services Cloudflare Workers pour les fonctions serveur.

## Parcours de contrôle manuel

1. Vérifiez l'accueil, les menus déroulants et le menu mobile.
2. Ouvrez les cinq démonstrations. Ajoutez un dossier, faites avancer une ligne, puis réinitialisez.
3. Remplissez le brief de contact, générez-le et téléchargez le fichier texte.
4. Vérifiez les pages sur mobile et avec la préférence de réduction des animations.

La marque et les textes proposés sont une première direction à valider ensemble avant l'achat du domaine et le lancement public.
