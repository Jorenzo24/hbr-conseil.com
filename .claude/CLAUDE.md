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

### Implantation : Paris, intervention nationale

Le cabinet est à **Paris** et intervient à peu près partout en France. Conséquence majeure :
**la branche agricole n'a plus d'ancrage local** (pas d'exploitation à Paris), elle est traitée
en national/thématique comme le LMNP. C'est une correction de la v1 de la stratégie, qui
recommandait à tort de prioriser l'agriculture sur des requêtes départementales.

### Plan de pages — 12 pages, une intention chacune

⚠️ **Ne jamais rédiger une page absente de ce tableau sans l'y ajouter d'abord.** C'est le
contrat anti-cannibalisation : une requête n'appartient qu'à une seule page.

| Page | URL | Requêtes possédées | Intention |
|---|---|---|---|
| Accueil | `/` | expert-comptable Paris | commerciale |
| Le cabinet | `/le-cabinet/` | — (marque) | confiance |
| Honoraires | `/honoraires/` | tarif / prix expert-comptable | informationnelle |
| Contact | `/contact/` | — (NAP) | conversion |
| **Pilier BNC** | `/expert-comptable-profession-liberale/` | expert-comptable profession libérale, comptable BNC | commerciale |
| Satellite BNC | `/declaration-2035/` | déclaration 2035, formulaire 2035 | informationnelle |
| Satellite BNC | `/micro-bnc-ou-declaration-controlee/` | micro-BNC ou réel, seuil micro-BNC | comparaison |
| **Pilier LMNP** | `/expert-comptable-lmnp/` | expert-comptable LMNP, comptable location meublée | commerciale |
| Satellite LMNP | `/amortissement-lmnp/` | amortissement LMNP | informationnelle |
| Satellite LMNP | `/plus-value-lmnp/` | plus-value LMNP, réintégration des amortissements | informationnelle |
| **Pilier Agriculture** | `/expert-comptable-agricole/` | expert-comptable agricole, comptabilité agricole | commerciale |
| Satellite Agriculture | `/comptabilite-gaec-earl/` | comptabilité GAEC, EARL | comparaison |

Chaque **pilier** est commercial (on cherche un prestataire), chaque **satellite** est
informationnel (on cherche une réponse). Deux intentions différentes ne se concurrencent pas,
même sur un vocabulaire voisin.

### Pages explicitement refusées

Elles paraissent évidentes et créeraient toutes une cannibalisation :

- ❌ `/expert-comptable-bnc/` en plus du pilier « profession libérale » — même intention.
  « BNC » est le mot du comptable, « profession libérale » celui du client : **une seule page**,
  dont le titre porte les deux vocabulaires.
- ❌ `/expert-comptable-paris/` en plus de l'accueil — **l'accueil EST la page Paris**. Une page
  dédiée diviserait le signal entre deux URL.
- ❌ Les pages d'arrondissement (`/expert-comptable-paris-8/`…) — volume dérisoire, contenu
  quasi identique. Le générateur de cannibalisation le plus efficace qui existe.
- ❌ `/fiscalite-agricole/` — recouvre le champ du pilier. Un satellite agricole doit nommer un
  **dispositif précis** (GAEC, DEP, transmission), jamais un domaine entier.

### Géographie

**Une seule localité sur tout le site : Paris, portée par l'accueil.** Le travail local passe par
la fiche Google d'établissement, pas par des pages.

| Silo | Géographie |
|---|---|
| Accueil | Paris — seule page géolocalisée |
| BNC | Paris et région, mais **par le métier**, jamais par le quartier |
| LMNP | aucune — national |
| Agriculture | aucune — national et thématique |

Seule extension locale propre, si un jour besoin : `métier × ville`
(`/expert-comptable-medecin-paris/`). Jamais `ville × ville`.

### Six règles anti-cannibalisation

1. Une intention par page, décidée **avant** d'écrire (tableau ci-dessus)
2. Une requête n'appartient qu'à une page — si deux pages peuvent la revendiquer, on fusionne
3. **Discipline des ancres internes** : le pilier LMNP se lie toujours avec l'ancre
   « expert-comptable LMNP », et cette ancre ne pointe jamais ailleurs
4. **Aucun lien entre deux silos** — les satellites remontent vers leur pilier, les piliers ne
   sont reliés qu'à l'accueil
5. Canonical auto-référent sur chaque page
6. **Détection** : deux URL sur la même requête dans Search Console plusieurs semaines de suite
   = cannibalisation → fusionner ou désoptimiser la moins bonne

### Règles on-page

- **URL** : un dossier par page avec `index.html` dedans (URL propres sans mod_rewrite)
- Title unique 50-60 caractères, meta description 150-160, Open Graph complet sur chaque page
- Schema.org JSON-LD : `AccountingService` (accueil), `Service` (piliers),
  `FAQPage` (satellites qui traitent une question), `BreadcrumbList` partout
- Mettre à jour `sitemap.xml` à chaque ajout de page, avec un `lastmod` réel
- Mesure : préférer Plausible ou Matomo auto-hébergé (pas de bandeau cookies, site plus léger)
- **Aucune donnée fiscale publiée sans validation du cabinet** (seuils, dispositifs, taux)

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

**Bloquant** pour la rédaction :

1. **Angle du silo agricole — exploitant ou investisseur ?** Détermine mots-clés, ton et clientèle.
   - *Angle A, l'exploitant* : formes sociétaires, TVA agricole, DEP, MSA, installation. Trafic
     réel, mais on se bat sans l'argument de proximité qui fait vendre dans ce milieu.
   - *Angle B, l'investisseur* : foncier agricole et viticole, GFA/GFV, transmission,
     démembrement. **Paris devient un avantage** — ces clients sont largement parisiens — et le
     terrain est bien moins concurrentiel.

Non bloquant :

2. Quel pilier rédiger en premier (proposition : le BNC, seul silo où Paris joue pour nous)
3. Métiers BNC réellement maîtrisés au cabinet — pour que le pilier parle juste
4. Page honoraires : oui ou non ?
5. Nom exact du cabinet, mentions légales, numéro d'inscription à l'Ordre
6. **Adresse et téléphone à Paris** — pour le JSON-LD et la fiche Google, identiques au caractère près
7. Domaine final + username cPanel
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
