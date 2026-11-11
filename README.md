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
| `site.config.mjs` | Domaine de production, coordonnées et mentions légales. |

## Mise en production

GitHub Pages publie la branche `main` sur `https://deuxrivesweb.fr`. Le build autorise l’indexation uniquement pour ce domaine, quand `publishReady` et les mentions légales requises sont renseignés. Un build sur une autre origine conserve `Disallow: /` et `noindex,nofollow`.

Suivez le [guide de lancement](docs/LAUNCH_CHECKLIST.md) pour vérifier le domaine, tester la prise de contact et soumettre le sitemap à Google Search Console.

Les démonstrations utilisent des scénarios fictifs et fonctionnent localement dans le navigateur. Pour les options de réservation et d’envoi du brief, consultez le [guide de prise de contact](docs/PORTFOLIO_CONTACT_SETUP.md).

## Parcours de contrôle manuel

1. Vérifiez l'accueil, les menus déroulants et le menu mobile.
2. Ouvrez les cinq démonstrations. Ajoutez un dossier, faites avancer une ligne, puis réinitialisez.
3. Remplissez le brief de contact, générez-le et téléchargez le fichier texte.
4. Vérifiez les pages sur mobile et avec la préférence de réduction des animations.

