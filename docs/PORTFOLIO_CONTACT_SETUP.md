# Réalisations et prise de contact

## Réalisations

- Le catalogue, les filtres et les fiches partagent les données de `scripts/portfolio-data.mjs`.
- Les fiches d’origine viennent du portfolio public de Jean-Émilien Massoda et de son Business Systems Lab. Les visuels WebP du dossier `assets/realisations/` sont issus de ces fiches. Les prototypes, projets internes et projets présentés par le cofondateur ont des libellés distincts.
- Avant de fusionner, confirmer l’attribution et la possibilité de réutiliser sur le site de l’agence les visuels et les citations déjà publiés sur le portfolio. Les citations sont reproduites dans leur langue d’origine.
- Les démonstrations interactives de Deux Rives Web restent accessibles dans leurs rubriques habituelles. Les fiches proposent aussi des liens vers les démonstrations autonomes existantes lorsqu’une URL figure dans le portfolio source.
- La production continue à générer le sitemap avec les fiches, tandis que les règles de prépublication conservent `Disallow: /` et `noindex,nofollow`.

## Réservation Google Calendar

1. Se connecter à Google Calendar avec le compte associé à `services@deuxrivesweb.fr`. Si nécessaire, créer un compte Google en choisissant d’utiliser l’adresse existante et confirmer celle-ci depuis Hostinger.
2. Créer un planning de rendez-vous, définir les créneaux dans le fuseau voulu, puis copier le **lien public du planning**. Ouvrir le lien sans être connecté pour vérifier le nom affiché et les créneaux.
3. Dans le dépôt GitHub, ouvrir **Settings → Secrets and variables → Actions → Variables** et enregistrer ce lien dans `GOOGLE_BOOKING_URL`.

## Envoi des briefs

1. Dans Formspree, créer un formulaire et vérifier `services@deuxrivesweb.fr` comme destination des notifications. Configurer les protections antispam et les règles de rétention dans le tableau de bord.
2. Copier l’identifiant du formulaire depuis **Integration**. Pour une URL de type `https://formspree.io/f/abc123`, la valeur à copier est uniquement `abc123`.
3. Créer la variable GitHub Actions `FORMSPREE_FORM_ID`. Le workflow Pages lit les deux variables. Lancer le workflow après modification des variables pour mettre le site à jour.
4. Faire un essai avec un brief fictif et confirmer sa réception dans la boîte Hostinger. Le site confirme l’acceptation par le service. Les options de copie, téléchargement et ouverture de la messagerie restent disponibles.

Si les variables sont absentes, le site propose de convenir d’un créneau par e-mail et de préparer le brief pour l’envoyer depuis sa messagerie.

## Vérification locale

```sh
npm ci
npm test
npm run dev
```

Ouvrir `/realisations/` pour tester les filtres et `/contact/#consultation` pour contrôler les options de contact. Fournir les variables d’environnement avant `npm run dev` pour afficher les parcours configurés.
