# hbr-conseil.com — Contexte projet

Site vitrine d'un **cabinet d'expertise comptable**. Prestation client : le donneur d'ordre est
le comptable, qui valide les textes. Profession réglementée — voir la section Déontologie.

## Phase actuelle : PREVIEW sur GitHub Pages

Le domaine définitif n'est pas encore arrêté. Le site est publié temporairement sur GitHub Pages
pour pouvoir itérer et le montrer au client.

- **Dépôt** : `Jorenzo24/hbr-conseil.com` (public — Pages sur dépôt privé exige un compte payant)
- **URL de preview** : https://jorenzo24.github.io/hbr-conseil.com/
- **Déclencheur** : chaque push sur `main` reconstruit Pages (~1 min)

⚠️ **Pages n'a ni Apache ni PHP.** Donc : `.htaccess` est ignoré (aucune redirection, aucun cache,
aucun header de sécurité), et `send-mail.php` ne fonctionnera pas — le formulaire de contact ne
sera testable qu'une fois sur cPanel. Le cache-busting n'est pas non plus observable sur Pages.

## Phase cible : VPS Hetzner / cPanel

- **Hébergement** : VPS Hetzner avec cPanel
- **Username cPanel** : ⚠️ **inconnu** — `USERNAME_CPANEL_A_REMPLACER` dans `.cpanel.yml`
- **Deploy path** : `/home/<username>/public_html/`
- **Méthode** : cPanel Git Version Control — chaque push sur `main` déploie via `.cpanel.yml`
- **Domaine** : non arrêté. `hbr-conseil.com` est utilisé comme provisoire.

## ✅ Checklist de mise en ligne

À exécuter **d'un bloc** le jour où le domaine est connu. Ces points sont liés : impossible d'avoir
un `og:url` et un `sitemap.xml` corrects sans faire la passe complète, ce qui protège de l'oubli
du plus critique (le `noindex`).

1. **`robots.txt`** — supprimer le bloc `Disallow: /`, décommenter le bloc PRODUCTION
2. **`index.html` et toute page ajoutée** — supprimer `<meta name="robots" content="noindex, nofollow">`
3. **Domaine réel** partout où il est absolu : `<link rel="canonical">`, `og:url`, `og:image`,
   `sitemap.xml`, la ligne `Sitemap:` de `robots.txt`
4. **`.cpanel.yml`** — remplacer `USERNAME_CPANEL_A_REMPLACER` par le vrai username, retirer le commentaire d'avertissement
5. **Renommer le dépôt** si le domaine diffère : `gh repo rename <nouveau-nom>` puis
   `git remote set-url origin <nouvelle-url>` (GitHub redirige l'ancienne URL automatiquement)
6. **Connecter** le dépôt dans cPanel > Git Version Control, puis pousser pour déclencher le déploiement
7. **Désactiver GitHub Pages** (ou le garder en préproduction, mais alors `noindex` doit y rester)
8. **Search Console** — ajouter la propriété du vrai domaine, soumettre le sitemap
9. **Fiche Google d'établissement** — créer/valider, NAP identique au site au caractère près
10. **JSON-LD** — compléter le `AccountingService` (adresse, téléphone, horaires) dans `index.html`

## Stack

- HTML5 + CSS3 + JavaScript vanilla, aucun framework
- Pas de build step, pas de bundler
- Tout est servi en statique

## Conventions

- **Mobile-first** : styles mobile d'abord, puis `@media (min-width: …)`
- **Images** : WebP en priorité, fallback JPEG/PNG si nécessaire
- **SVG** : inline dans le HTML pour les icônes (permet `currentColor`)
- **Jamais de hotlink** d'images externes — tout héberger dans `assets/`
- **Alt text obligatoire** sur toutes les images
- **Chemins relatifs uniquement** : `css/style.css` et pas `/css/style.css`. Sinon le site casse
  en `file://` **et** sur GitHub Pages, où il vit dans le sous-dossier `/hbr-conseil.com/`.
  - **Seule exception : `404.html`.** Elle est volontairement autonome (styles en ligne, zéro
    ressource externe) parce qu'une 404 est servie depuis n'importe quelle profondeur d'URL,
    où des chemins relatifs ne résoudraient pas. Ne pas la « factoriser » vers `css/style.css`.

## Cache-busting

⚠️ `.htaccess` configure un cache navigateur d'**1 mois** sur CSS et JS.

À chaque modification de `css/style.css` ou `js/main.js`, **bumper le query string** `?v=AAAAMMJJx`
dans **toutes** les pages qui les référencent, sinon les visiteurs récurrents reçoivent du CSS/JS
périmé pendant un mois.

Format `?v=AAAAMMJJx` : date du jour + lettre de version (a, b, c…) pour plusieurs modifs le même
jour. Version actuelle : **`20260817a`**.

## SEO

Stratégie complète : https://claude.ai/code/artifact/b7e5c7d8-3446-46c7-a9bd-c8a18f2c4c77

**Principe** : les 3 spécialités font le trafic, la marque locale fait la conversion. Les requêtes
génériques d'expertise comptable sont saturées par les plateformes (Dougs, Indy, Pennylane) ;
on entre par les niches.

**Trois silos**, à traiter différemment car ce sont trois marchés distincts :

| Silo | Géographie | URL pilier |
|---|---|---|
| BNC / professions libérales | locale, métier par métier | `/expert-comptable-bnc/` |
| LMNP / location meublée | **nationale**, 100 % à distance | `/expert-comptable-lmnp/` |
| Agriculture | départementale, par filière | `/expert-comptable-agricole/` |

- **Maillage** : chaque satellite pointe vers son pilier. **Jamais de lien entre deux silos** —
  les piliers ne sont reliés qu'à l'accueil.
- **URL** : un dossier par page avec `index.html` dedans (URL propres sans mod_rewrite)
- Title unique 50-60 caractères, meta description 150-160, Open Graph complet sur chaque page
- Schema.org JSON-LD : `AccountingService` (accueil + pages locales), `Service` (piliers),
  `FAQPage` (satellites qui traitent une question), `BreadcrumbList` partout
- Mettre à jour `sitemap.xml` à chaque ajout de page, avec un `lastmod` réel
- **Pas de contenu dupliqué entre pages locales** — piège classique des pages « ville »
- Mesure : préférer Plausible ou Matomo auto-hébergé (pas de bandeau cookies, site plus léger)

## Déontologie — contraintes de rédaction

L'expertise comptable est une profession réglementée, sa communication est encadrée par le code de
déontologie de l'Ordre. **À ne jamais écrire :**

- promesse ou garantie de résultat
- comparaison dénigrante avec des confrères, « le moins cher », superlatifs de classement
- témoignages nominatifs sans autorisation écrite

**À faire figurer** : inscription à l'Ordre, forme juridique, capital, assurance de responsabilité
civile professionnelle. Les simulateurs affichent un avertissement « estimation indicative, ne
remplace pas une consultation ».

Le texte final est validé par le cabinet, au besoin auprès de son conseil régional de l'Ordre.

## Git

- **`main` = production** : chaque push sur `main` déploie (Pages aujourd'hui, cPanel demain)
- **Jamais de push direct sur `main`** : toujours une branche feature + merge
- **Branches** : `feat/nom-feature`, `fix/nom-bug`, `seo/nom-page`
- **Commits** : en français, présent de l'indicatif (« Ajoute formulaire contact »)

## Informations manquantes

Bloquant pour la rédaction du contenu :

1. **Ville et département du cabinet** — toute la partie locale et le silo agricole en dépendent
2. Périmètre d'intervention : clients LMNP/BNC à distance partout en France, ou régional ?
3. Métiers BNC déjà maîtrisés au cabinet
4. Filières agricoles du secteur (viticulture, élevage, céréales, maraîchage…)
5. Nom exact du cabinet, mentions légales, numéro d'inscription à l'Ordre
6. Domaine final + username cPanel
7. Honoraires affichés ou non
8. Photos disponibles (cabinet, équipe, portrait)

## Structure

```
hbr-conseil.com/
├── .claude/CLAUDE.md       # ce fichier
├── .cpanel.yml             # déploiement cPanel (username à remplacer)
├── .htaccess               # Apache — ignoré par GitHub Pages
├── .gitignore
├── robots.txt              # ⚠️ Disallow: / pendant la phase preview
├── sitemap.xml
├── index.html
├── 404.html                # autonome, styles en ligne
├── css/style.css
├── js/main.js
└── assets/                 # images, favicon, og-image
```
