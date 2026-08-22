# hbr-conseil.com : Contexte projet

Site vitrine d'un **cabinet d'expertise comptable**. Prestation client : le donneur d'ordre est
le comptable, qui valide les textes. Profession réglementée, voir la section Déontologie.

## Phase actuelle : PREVIEW sur GitHub Pages

Le domaine définitif n'est pas encore arrêté. Le site est publié temporairement sur GitHub Pages
pour pouvoir itérer et le montrer au client.

- **Dépôt** : `Jorenzo24/hbr-conseil.com` (public, Pages sur dépôt privé exige un compte payant)
- **URL de preview** : https://jorenzo24.github.io/hbr-conseil.com/
- **Déclencheur** : chaque push sur `main` reconstruit Pages (~1 min)

⚠️ **Pages n'a ni Apache ni PHP.** Donc : `.htaccess` est ignoré (aucune redirection, aucun cache,
aucun header de sécurité), et `send-mail.php` ne fonctionnera pas, le formulaire de contact ne
sera testable qu'une fois sur cPanel. Le cache-busting n'est pas non plus observable sur Pages.

## Phase cible : VPS Hetzner / cPanel

- **Hébergement** : VPS Hetzner avec cPanel
- **Username cPanel** : ⚠️ **inconnu**, `USERNAME_CPANEL_A_REMPLACER` dans `.cpanel.yml`
- **Deploy path** : `/home/<username>/public_html/`
- **Méthode** : cPanel Git Version Control, chaque push sur `main` déploie via `.cpanel.yml`
- **Domaine** : non arrêté. `hbr-conseil.com` est utilisé comme provisoire.

## ✅ Checklist de mise en ligne

À exécuter **d'un bloc** le jour où le domaine est connu. Ces points sont liés : impossible d'avoir
un `og:url` et un `sitemap.xml` corrects sans faire la passe complète, ce qui protège de l'oubli
du plus critique (le `noindex`).

1. **`robots.txt`** : supprimer le bloc `Disallow: /`, décommenter le bloc PRODUCTION
2. **`index.html` et toute page ajoutée**, supprimer `<meta name="robots" content="noindex, nofollow">`
3. **Domaine réel** partout où il est absolu : `<link rel="canonical">`, `og:url`, `og:image`,
   `sitemap.xml`, la ligne `Sitemap:` de `robots.txt`
4. **`.cpanel.yml`** : remplacer `USERNAME_CPANEL_A_REMPLACER` par le vrai username, retirer le commentaire d'avertissement
5. **Renommer le dépôt** si le domaine diffère : `gh repo rename <nouveau-nom>` puis
   `git remote set-url origin <nouvelle-url>` (GitHub redirige l'ancienne URL automatiquement)
6. **Connecter** le dépôt dans cPanel > Git Version Control, puis pousser pour déclencher le déploiement
7. **Désactiver GitHub Pages** (ou le garder en préproduction, mais alors `noindex` doit y rester)
8. **Search Console** : ajouter la propriété du vrai domaine, soumettre le sitemap
9. **Fiche Google d'établissement** : créer/valider, NAP identique au site au caractère près
10. **JSON-LD** : compléter le `AccountingService` (adresse, téléphone, horaires) dans `index.html`

## Stack

- HTML5 + CSS3 + JavaScript vanilla, aucun framework
- Pas de build step, pas de bundler
- Tout est servi en statique

## Système de design

Registre visé : **cabinet haut de gamme, sobre**. Le repère est le grand livre relié, réglures,
alignements, cuir et acajou : et non le noir-et-or qui est devenu le cliché du site « premium ».

### Palette (jetons dans `css/style.css`, section 3)

Le noir est **chaud**, biaisé vers le marron plutôt que vers le bleu : c'est ce qui empêche le
marron de paraître plaqué sur du gris.

| Rôle | Jeton | Valeur |
|---|---|---|
| Fond | `--void` | `#0A0807` |
| Surface / surface haute | `--deep` / `--raise` | `#12100D` / `#1B1712` |
| Filets | `--hairline` / `--hairline-hi` | `#2B2520` / `#3D352E` |
| Marron profond → cognac | `--brown-deep` / `--brown` / `--brown-lit` | `#4A2F1E` / `#7A4E30` / `#A9754C` |
| Accents clairs | `--tan` / `--champagne` | `#C9A47C` / `#E8D5BE` |
| Encres | `--paper` / `--paper-2` / `--muted` | `#F4EFE8` / `#C6BAAC` / `#8C7F72` |
| Teintes de spécialité | `--h-bnc` / `--h-lmnp` / `--h-agri` | `#8FA2AE` / `#C9A47C` / `#8A9469` |

Jamais de blanc pur ni de noir pur. Les trois teintes de spécialité sont deux terres et une note
froide, pour se distinguer sans se battre.

### Typographie

- **Newsreader** (serif variable 300 à 600) pour les titres, via la classe `.display` et
  l'échelle `.h-xl` / `.h-lg` / `.h-md` / `.h-sm`. Utiliser `font-variation-settings: 'opsz'`
  selon la taille de rendu.
- **Archivo** (variable 400 à 600) pour le texte courant et l'interface.
- Libellés : classe `.label`, capitales, `letter-spacing: 0.18em`, petite taille.
- Chiffres alignés : `font-variant-numeric: tabular-nums`.

### Traitement d'image : duotone marron

Section 5 de `style.css`. Un dégradé marron dans le conteneur `.duo`, l'image par-dessus en
`mix-blend-mode: luminosity`. **La couleur vient du calque, pas de la photo** : n'importe quelle
image s'intègre, ce qui compte puisque les visuels actuels sont provisoires.

Variantes : `.duo--scrim` (voile bas pour asseoir un libellé), et `--tint` en style inline pour
le voile de teinte propre à chaque spécialité.

### La page d'accueil reste généraliste

Règle posée par Joseph : **l'accueil parle de l'activité standard d'un cabinet d'expertise
comptable**, pas des spécialités. Celles-ci ne sont qu'un teaser, placé bas dans la page. Ne pas
réintroduire de liste de spécialités dans le hero.

Ordre des sections (une section supplémentaire viendra s'insérer avant les spécialités) :

1. Hero : généraliste
2. Bandeau « comment ça se passe » (4 points)
3. Le cabinet
4. Trois spécialités *(← une section viendra se glisser au-dessus)*
5. Méthode : 4 étapes + visuel qui reste en place au défilement
6. Pourquoi nous choisir, 4 raisons en colonnes séparées par un filet
7. Contact + plan d'accès

Le bandeau des 4 points ne contient **que des faits vérifiables** : ni mention de l'Ordre (jugée
inutile ici), ni « Paris » seul (les rendez-vous ne sont pas tous sur place), ni chiffre inventé
d'ancienneté ou de portefeuille.

### Écriture : aucun marqueur IA

⚠️ **Règle universelle posée par Joseph.** Aucun tiret cadratin (U+2014) ni demi-cadratin
(U+2013), nulle part : texte visible, balises `title`, meta descriptions, commentaires de code,
documentation. Une virgule, un point ou une parenthèse à la place.

Éviter aussi les tics qui trahissent un texte généré :

- les tournures en balancier, « ce n'est pas X, c'est Y », « X, pas Y », « plutôt que »
- les énumérations systématiquement en trois termes
- les deux-points qui créent un effet d'annonce
- les adverbes de posture répétés, « volontairement », « délibérément »
- les emoji en tête de section dans le contenu visible

Vérification rapide avant tout commit :

```
grep -rn "$(printf '\u2014\\|\u2013')" . --exclude-dir=.git
```

### Pas de liste de prestations sur l'accueil

Une section énumérant bilan, TVA, paie, création de société a été retirée : ces missions vont de
soi pour un cabinet complet et n'apportent aucun argument. Elle est remplacée par **Pourquoi nous
choisir**, quatre raisons concrètes. Ne pas réintroduire de catalogue de prestations sur l'accueil.

Contrainte déontologique sur cette section : aucune comparaison avec des confrères, aucune
promesse de résultat, aucune note ou avis tant qu'il n'y en a pas de réels.

### Plan d'accès : chargement au clic

La carte Google Maps ne se charge **qu'au clic** (`loadMap()` dans `js/main.js`). Tant que le
visiteur n'a pas cliqué, aucune requête ne part vers Google : pas de cookie tiers, donc **pas de
bandeau de consentement à prévoir** : ce qui compte pour le site d'une profession réglementée.
Pour la charger d'emblée, appeler `loadMap()` au chargement, mais il faudra alors traiter le
consentement. L'embed utilisé ne demande pas de clé d'API.

### Effets

- **Grain** : bruit fractal SVG en `data:` URI, superposition fixe à 4 % d'opacité. Casse
  l'aplat numérique des grands fonds sombres.
- **Chevauchements** : obtenus **en grille** (`grid-column` / `grid-row` sur la même cellule),
  jamais en `position: absolute` : pas de recouvrement accidentel au redimensionnement.
- **Révélations au défilement** : classe `.reveal` + `IntersectionObserver`, avec
  `.reveal--d1/d2/d3` pour l'échelonnement. Garde-fou `.no-js` : si `main.js` ne se charge pas,
  rien ne reste invisible.
- `prefers-reduced-motion` est respecté partout : tout s'affiche, plus aucune transition.

### Ressources

Voir `assets/CREDITS.md` : sources et licences des images, polices auto-hébergées, chaîne de
conversion WebP, régénération du favicon.

### ⚠️ Deux pièges CSS déjà rencontrés

**`aspect-ratio` + `max-height` sur un bloc → Chrome déduit la LARGEUR.** Au lieu de laisser
le bloc remplir l'espace disponible, il calcule `largeur = max-height × ratio`. La carte faisait
768 px (30rem × 1,6) au lieu de 1120. Solution, ne jamais combiner les deux, poser
`aspect-ratio` sur mobile, puis `aspect-ratio: auto` + une `height` fixe au-dessus du point de
rupture.

**Enfants de grille : `min-width: 0`.** Ils valent `min-width: auto` par défaut, donc leur largeur
min-content peut élargir la piste au-delà du conteneur. Une liste de jetons appliqués aux enfants
de grille du site existe en section 8 de `style.css`, l'étendre à tout nouvel enfant de grille.

### ⚠️ Vérifier le rendu mobile : le piège de Chrome headless

`--window-size=390,…` **ne donne pas un viewport de 390 px**. Chrome (ancien mode *et*
`--headless=new`) plafonne la fenêtre à **500 px de large minimum** sur macOS : la page est mise
en page à 500 px, puis l'image est simplement recadrée à 390. Résultat : du texte paraît coupé à
droite et on croit à un débordement horizontal qui n'existe pas. Mesuré :
`innerWidth === clientWidth === scrollWidth === 500`.

**Contournement** : encapsuler le site dans une iframe à la largeur voulue, qui établit son
propre viewport (GitHub Pages n'envoie pas `X-Frame-Options`, le cadrage fonctionne) :

```html
<!-- /tmp/harness.html -->
<style>html,body{margin:0}iframe{width:390px;height:5600px;border:0;display:block}</style>
<iframe src="https://jorenzo24.github.io/hbr-conseil.com/"></iframe>
```

```
chrome --headless --hide-scrollbars --force-prefers-reduced-motion \
       --window-size=500,5600 --virtual-time-budget=12000 \
       --screenshot=/tmp/m390.png file:///tmp/harness.html
magick /tmp/m390.png -crop 390x5600+0+0 +repage /tmp/m390c.png
```

Deux autres points pour capturer utilement :

- **`--force-prefers-reduced-motion` est indispensable** : sinon les éléments `.reveal` restent à
  `opacity: 0` (l'`IntersectionObserver` ne se déclenche jamais hors viewport) et toutes les
  sections apparaissent noires sur la capture.
- Chrome **ne rend pas la main** après `--screenshot` : l'image est bien écrite, il faut tuer le
  processus (`pkill -f "user-data-dir=…"`).

## Conventions

- **Mobile-first** : styles mobile d'abord, puis `@media (min-width: …)`
- **Images** : WebP en priorité, fallback JPEG/PNG si nécessaire
- **SVG** : inline dans le HTML pour les icônes (permet `currentColor`)
- **Jamais de hotlink** d'images externes, tout héberger dans `assets/`
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

### Plan de pages : 12 pages, une intention chacune

⚠️ **Ne jamais rédiger une page absente de ce tableau sans l'y ajouter d'abord.** C'est le
contrat anti-cannibalisation : une requête n'appartient qu'à une seule page.

| Page | URL | Requêtes possédées | Intention |
|---|---|---|---|
| Accueil | `/` | expert-comptable Paris | commerciale |
| Le cabinet | `/le-cabinet/` | : (marque) | confiance |
| Honoraires | `/honoraires/` | tarif / prix expert-comptable | informationnelle |
| Contact | `/contact/` | : (NAP) | conversion |
| **Pilier BNC** | `/expert-comptable-profession-liberale/` | expert-comptable profession libérale, comptable BNC | commerciale |
| Satellite BNC | `…-profession-liberale/declaration-2035/` | déclaration 2035, formulaire 2035 | informationnelle |
| Satellite BNC | `…-profession-liberale/micro-bnc-ou-declaration-controlee/` | micro-BNC ou réel, seuil micro-BNC | comparaison |
| **Pilier LMNP** | `/expert-comptable-lmnp/` | expert-comptable LMNP, comptable location meublée | commerciale |
| Satellite LMNP | `…-lmnp/amortissement-lmnp/` | amortissement LMNP | informationnelle |
| Satellite LMNP | `…-lmnp/plus-value-lmnp/` | plus-value LMNP, réintégration des amortissements | informationnelle |
| **Pilier Agriculture** | `/expert-comptable-agricole/` | expert-comptable agricole, comptabilité agricole | commerciale |
| Satellite Agriculture | `…-agricole/comptabilite-gaec-earl/` | comptabilité GAEC, EARL | comparaison |

### Cocon sémantique : les satellites sont imbriqués dans l'URL du pilier

Deux niveaux maximum. La structure d'URL rend le cocon explicite et donne du sens au fil
d'Ariane. Un satellite n'appartient qu'à **un seul** pilier, s'il en concernait deux, c'est
qu'il est mal découpé.

### Deux formats de page, jamais mélangés

C'est ce qui matérialise la séparation d'intention, et donc la protection anti-cannibalisation :

- **Piliers = format page de vente.** Bénéfices, preuves, réassurance, appels à l'action
  répétés. On cherche la prise de contact.
- **Satellites = format article.** Titre de question, chapô, sous-titres, exemples chiffrés,
  ton pédagogique. **Pas** de pavé commercial : un seul renvoi discret vers le pilier en fin
  d'article, plus les liens contextuels dans le corps du texte.

### Agriculture : national assumé, sans page par département

Décision de Joseph : on ne localise pas la branche agricole. La page pilier **nomme de gros
départements agricoles** (Corrèze, etc.) et précise que le cabinet est à Paris et suit les
dossiers à distance.

⚠️ À savoir : cette liste de départements **ne fera pas ranker** sur « comptable agricole
Corrèze » : il faudrait une page par département, ce qu'on refuse. Elle sert à **rassurer le
visiteur humain** sur le fait que la distance n'est pas un obstacle. C'est assumé, ce n'est pas
un oubli d'optimisation.

### Pages explicitement refusées

Elles paraissent évidentes et créeraient toutes une cannibalisation :

- ❌ `/expert-comptable-bnc/` en plus du pilier « profession libérale », même intention.
  « BNC » est le mot du comptable, « profession libérale » celui du client : **une seule page**,
  dont le titre porte les deux vocabulaires.
- ❌ `/expert-comptable-paris/` en plus de l'accueil, **l'accueil EST la page Paris**. Une page
  dédiée diviserait le signal entre deux URL.
- ❌ Les pages d'arrondissement (`/expert-comptable-paris-8/`…), volume dérisoire, contenu
  quasi identique. Le générateur de cannibalisation le plus efficace qui existe.
- ❌ `/fiscalite-agricole/` : recouvre le champ du pilier. Un satellite agricole doit nommer un
  **dispositif précis** (GAEC, DEP, transmission), jamais un domaine entier.

### Géographie

**Une seule localité sur tout le site : Paris, portée par l'accueil.** Le travail local passe par
la fiche Google d'établissement, pas par des pages.

| Silo | Géographie |
|---|---|
| Accueil | Paris : seule page géolocalisée |
| BNC | Paris et région, mais **par le métier**, jamais par le quartier |
| LMNP | aucune : national |
| Agriculture | aucune : national et thématique |

Seule extension locale propre, si un jour besoin : `métier × ville`
(`/expert-comptable-medecin-paris/`). Jamais `ville × ville`.

### Six règles anti-cannibalisation

1. Une intention par page, décidée **avant** d'écrire (tableau ci-dessus)
2. Une requête n'appartient qu'à une page, si deux pages peuvent la revendiquer, on fusionne
3. **Discipline des ancres internes** : le pilier LMNP se lie toujours avec l'ancre
   « expert-comptable LMNP », et cette ancre ne pointe jamais ailleurs
4. **Aucun lien entre deux silos** : les satellites remontent vers leur pilier, les piliers ne
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

## Déontologie : contraintes de rédaction

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

## Décisions arrêtées

- **Adresse du cabinet : 76 rue de la Pompe, Paris 16ᵉ.** ⚠️ Code postal à confirmer : 75016
  (générique du 16ᵉ) ou 75116 (partie nord). Actuellement 75016 sur le site.
- **Silo agricole : angle exploitant** (et non investisseur/patrimonial). Donc formes sociétaires,
  TVA agricole, DEP, MSA, installation, transmission d'exploitation. Pas de GFA/GFV ni de
  démembrement pour investisseurs parisiens.
- **Courriel** : sera créé au nom de domaine, une fois celui-ci arrêté.

## Informations manquantes

Aucune ne bloque plus la rédaction des piliers.

1. Métiers BNC réellement maîtrisés au cabinet, pour que le pilier parle juste
2. Quel pilier rédiger en premier (proposition : le BNC, seul silo où Paris joue pour nous)
3. Page honoraires : oui ou non ?
4. Nom exact du cabinet, mentions légales, numéro d'inscription à l'Ordre
5. Téléphone, et courriel au nom de domaine
6. Domaine final + username cPanel
7. Photos réelles du cabinet (les visuels actuels sont des placeholders Unsplash)

## Structure

```
hbr-conseil.com/
├── .claude/CLAUDE.md       # ce fichier
├── .cpanel.yml             # déploiement cPanel (username à remplacer)
├── .htaccess               # Apache, ignoré par GitHub Pages
├── .gitignore
├── robots.txt              # ⚠️ Disallow: / pendant la phase preview
├── sitemap.xml
├── index.html
├── 404.html                # autonome, styles en ligne
├── css/style.css
├── js/main.js
└── assets/                 # images, favicon, og-image
```
