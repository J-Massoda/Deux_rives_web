# Mise en production et Google Search Console

## Avant de fusionner

1. Comparer le nom, le SIREN et l’adresse de l’entreprise aux justificatifs RNE. Relire les [mentions légales](../site.config.mjs), la politique de confidentialité et les durées de conservation avant publication.
2. Vérifier les autorisations de publication pour les visuels et témoignages clients des réalisations.
3. Vérifier **Settings → Pages** dans GitHub. La source doit être **GitHub Actions** et le domaine personnalisé **deuxrivesweb.fr**. Vérifier le contrôle DNS et activer **Enforce HTTPS** quand le certificat est prêt.
4. Ouvrir le lien de réservation en navigation privée et tester un créneau. Vérifier l’identité affichée, le fuseau et la réception des confirmations, puis annuler le rendez-vous d’essai. Envoyer un brief d’essai et vérifier qu’il arrive dans `services@deuxrivesweb.fr`. Le formulaire utilise la messagerie du visiteur tant que la variable `FORMSPREE_FORM_ID` n’est pas configurée. Voir le [guide de prise de contact](PORTFOLIO_CONTACT_SETUP.md).

## Après la fusion et la publication

1. Attendre la réussite du workflow **Deploy to GitHub Pages** sur `main`.
2. Ouvrir [le site](https://deuxrivesweb.fr/) en navigation privée. Vérifier que HTTP et `www` renvoient vers l’adresse HTTPS sans `www`, puis ouvrir les mentions légales, la confidentialité et la page de contact.
3. Ouvrir [robots.txt](https://deuxrivesweb.fr/robots.txt). Il doit afficher `Allow: /` et le lien vers le sitemap. Ouvrir [sitemap.xml](https://deuxrivesweb.fr/sitemap.xml). Il doit répondre en HTTP 200 et répertorier des URL sur `https://deuxrivesweb.fr/`. Le code source de l’accueil doit contenir la balise canonique `https://deuxrivesweb.fr/` et aucune directive `noindex`.
4. Si le site affiche encore `Disallow: /`, vérifier que le déploiement contient le commit de fusion et que la configuration Pages fournit exactement `https://deuxrivesweb.fr` comme origine. Le build bloque l’indexation sur toute autre origine ou si un champ légal requis est vide.

## Soumettre le site à Google

1. Dans [Google Search Console](https://search.google.com/search-console), sélectionner ou ajouter la propriété **Domaine** `deuxrivesweb.fr`. Si Google demande une vérification, ajouter l’enregistrement TXT fourni dans la zone DNS de Hostinger. Conserver les enregistrements de messagerie existants.
2. Dans **Sitemaps**, soumettre `https://deuxrivesweb.fr/sitemap.xml`. Si l’interface affiche déjà le préfixe du site, saisir uniquement `sitemap.xml`.
3. Dans **Inspection de l’URL**, saisir `https://deuxrivesweb.fr/`, cliquer sur **Tester l’URL publiée**, puis sur **Demander une indexation** si le test confirme que Google peut explorer la page.
4. Vérifier ensuite l’état du sitemap et le rapport **Indexation des pages**. Google décide du délai d’exploration et des pages à indexer.

Références [vérification de la propriété](https://support.google.com/webmasters/answer/9008080?hl=fr), [rapport Sitemaps](https://support.google.com/webmasters/answer/7451001?hl=fr) et [inspection d’URL](https://support.google.com/webmasters/answer/9012289?hl=fr).
