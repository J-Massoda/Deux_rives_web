# Réalisations et prise de contact

## Réalisations

- Le catalogue, les filtres et les fiches partagent les données de `scripts/portfolio-data.mjs`. La page d’accueil met en avant les projets clients, et le catalogue distingue projets clients, prototypes, projets internes et études de conception.
- Les fiches d’origine viennent du portfolio public de Jean-Émilien Massoda et de son Business Systems Lab. Les visuels WebP du dossier `assets/realisations/` proviennent de ces fiches. Le schéma d’inventaire BPÉTALE illustre une opération vérifiée en local avec des données fictives.
- Avant de fusionner, confirmer l’attribution et la possibilité de réutiliser sur le site de l’agence les visuels et les témoignages français.
- Les démonstrations interactives restent accessibles depuis le menu et le catalogue. Les fiches proposent aussi des liens vers les démonstrations autonomes lorsque le portfolio source en fournit une.

## Google Calendar avec l’adresse du domaine

La page publique de réservation est hébergée par Google. Le site Deux Rives Web y renvoie depuis `/contact/#consultation`. Le compte Google peut utiliser `services@deuxrivesweb.fr` tout en conservant la boîte mail chez Hostinger. Cette configuration laisse les enregistrements DNS et MX actuels en place.

### Créer ou vérifier le compte Google

1. Ouvrir [la création de compte Google](https://accounts.google.com/signup) dans une fenêtre privée ou se déconnecter du compte Gmail habituel pour éviter de créer le planning dans le mauvais calendrier.
2. Sélectionner **Créer un compte → Pour mon usage personnel → Utiliser mon adresse e-mail actuelle**. Saisir `services@deuxrivesweb.fr`, puis valider le code envoyé à cette boîte dans Hostinger Webmail. Si un compte Google utilise déjà cette adresse, se connecter à ce compte.
3. Vérifier le nom et la photo de profil affichés par Google. La page publique de réservation utilise l’identité de ce compte. Consulter l’[aide à la création de compte](https://support.google.com/accounts/answer/27441?hl=fr).

### Créer et partager le planning

1. Ouvrir [Google Calendar](https://calendar.google.com/) sur ordinateur avec le compte `services@deuxrivesweb.fr`. Cliquer sur **Créer → Planning de rendez-vous**.
2. Nommer le planning **Consultation projet · Deux Rives Web**. Choisir la durée et les plages horaires. Pour des créneaux de bureau à Paris, sélectionner le fuseau de Paris. Définir le délai minimum de réservation et choisir Google Meet, un appel téléphonique ou une autre modalité.
3. Enregistrer. Dans **Pages de réservation**, sélectionner le planning et copier son **lien public de réservation**. Ouvrir le lien en navigation privée pour vérifier le nom affiché et les créneaux. Consulter l’[aide sur les plannings](https://support.google.com/calendar/answer/10729749?hl=fr) et l’[aide sur le partage](https://support.google.com/calendar/answer/10733297?hl=fr).
4. Dans le [dépôt GitHub](https://github.com/J-Massoda/Deux_rives_web/settings/variables/actions), ouvrir **Settings → Secrets and variables → Actions → Variables → New repository variable**. Créer `GOOGLE_BOOKING_URL` et coller le lien public complet, de la forme `https://calendar.app.google/…` ou `https://calendar.google.com/calendar/appointments/…`.
5. Après fusion, la publication GitHub Pages lit cette variable. Si la variable est ajoutée après la publication, relancer **Preview on GitHub Pages** depuis l’onglet **Actions** en sélectionnant `main`.
6. Vérifier le bouton **Réserver une consultation** sur [la page de contact](https://deuxrivesweb.fr/contact/#consultation). Faire une réservation d’essai depuis une autre adresse, vérifier les confirmations côté organisateur et participant, puis annuler le rendez-vous d’essai.

## Envoi direct des briefs

1. Dans Formspree, créer un formulaire et vérifier `services@deuxrivesweb.fr` comme destination des notifications. Configurer les protections antispam et les règles de rétention dans le tableau de bord.
2. Copier l’identifiant du formulaire depuis **Integration**. Pour une URL de type `https://formspree.io/f/abc123`, la valeur est `abc123`.
3. Créer la variable GitHub Actions `FORMSPREE_FORM_ID`. Le workflow Pages lit les deux variables. Relancer le workflow après modification des variables.
4. Préparer un brief fictif, cliquer sur **Envoyer depuis le site** et vérifier sa réception dans Hostinger Webmail ainsi que l’adresse de réponse. Le site affiche une confirmation quand le service accepte le brief.

Si les variables sont absentes, la page propose de convenir d’un créneau par e-mail et de préparer le brief pour l’envoyer depuis sa messagerie. La copie et le téléchargement du brief restent accessibles.

## Vérification avant le lancement public

- Compléter les champs de `legal` dans `site.config.mjs` à partir des justificatifs de l’entreprise et des informations de l’hébergeur. Relire les mentions légales et la page de confidentialité avec les informations et les services effectivement utilisés.
- Le site de prépublication conserve `Disallow: /` et `noindex,nofollow`. Au moment d’autoriser l’indexation, vérifier les informations, activer `publishReady` et contrôler le résultat sur le domaine de production avant de soumettre le sitemap.

## Vérification locale

```sh
npm ci
npm test
npm run dev
```

Ouvrir `/realisations/` pour tester les filtres et `/contact/#consultation` pour contrôler les options de contact. Fournir les variables d’environnement avant `npm run dev` pour afficher les parcours configurés.
