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

⚠️ **Refonte du 24 septembre 2026.** La direction sombre (noir chaud, marron, Newsreader,
guilloché, duotone marron) a été **abandonnée** à la demande du client, qui a désigné
https://nsassocies.com comme référence et a choisi d'en reprendre aussi les couleurs. Ne pas
réintroduire l'ancienne charte.

Registre visé : **cabinet corporate établi**, clair dominant, bleu de nuit et corail.

### Palette (section 3 de `css/style.css`)

| Rôle | Jeton | Valeur |
|---|---|---|
| Fonds clairs | `--paper` / `--paper-2` / `--paper-3` | `#F7F9FC` / `#EDF2F8` / `#E3EAF3` |
| Fonds chauds, section Méthode | `--blush` / `--blush-2` | `#FBF1EF` / `#EFDFDC` |
| Bleu de nuit, encre et sections sombres | `--navy` / `--navy-2` / `--navy-3` | `#0F2740` / `#17385A` / `#24507A` |
| Encres | `--ink` / `--ink-2` / `--muted` | `#0F2740` / `#47596F` / `#7C8B9D` |
| Filets | `--hairline` / `--hairline-2` | `#DCE4EE` / `#C6D2E0` |
| **Accent unique** | `--coral` / `--coral-deep` / `--coral-pale` | `#DF5660` / `#BE414B` / `#F7E4E5` |

Jamais de blanc pur : le blanc légèrement bleuté tient la page avec le bleu de nuit. **Un seul
accent**, le corail, employé avec parcimonie : filets de libellés, numéros, survols, un mot dans
le titre du hero. Jamais en aplat de fond large.

### Typographie

**Une seule famille, Archivo variable**, avec ses deux axes : la graisse (100 à 900) et surtout
la **largeur** (62 à 125 %). Le contraste typographique vient de l'axe de largeur, titres très
étendus contre texte de labeur normal, plutôt que d'une seconde famille. 88 Ko pour toute la
palette typographique.

- `.display` avec `.d-hero` / `.d-xl` / `.d-lg` / `.d-md` / `.d-sm` : `wdth` 116, `wght` 680
- `.eyebrow` : `wdth` 94, capitales, `letter-spacing` 0.16em, couleur `--muted`, **sans filet**
- Texte courant : `wdth` 100, `wght` 400

### ⚠️ Section Formules : squelette provisoire

Le tableau « Le détail des missions » a été remplacé par trois blocs de formules. **Tout le
contenu est un placeholder**, posé pour habiller la structure pendant que le client arbitre.

À remplacer avant toute mise en ligne :

- les deux montants, actuellement `000 €` avec un badge « à définir »
- le découpage en trois formules, Indépendant / Société / Sur mesure
- le contenu des quatre lignes de chaque formule

Contrainte déontologique sur cette section : afficher des honoraires est autorisé, mais sans
comparaison avec des confrères, sans superlatif et sans promesse. Le chapô précise déjà que les
honoraires dépendent du dossier et qu'une proposition écrite précède la mission.

Comment elle évite le gabarit des pages de prix : angles vifs, **aucune ombre portée**, aucun
badge « le plus populaire », aucun décalage vertical de la formule centrale. Celle-ci se signale
par un **aplat bleu de nuit**, et le prix est posé en très grand corps étendu.

### La section Méthode, et la notion de « froid »

Elle était sur `--paper-2`, un bleu-gris pâle, avec des filets fins et beaucoup de vide. Jugée
« vide et froide », au sens propre : toute la palette claire du site tire vers le bleu.

Le remède a donc été **chromatique avant d'être décoratif** : la section passe sur `--blush`, le
seul fond chaud du site. Les étapes deviennent des panneaux blancs pleins, séparés par un filet
partagé, et un **trait corail coiffe la rangée**.

⚠️ Ce trait est en `z-index: 3`. Posé à la hauteur des marqueurs, il passait derrière les panneaux
blancs et ne se voyait que dans les interstices.

Chaque étape porte un marqueur carré corail et une **ligne de livrable** en capitales corail en
bas de panneau (« Sans engagement », « Un document remis », « Lettre de mission », « Points
réguliers »). Ces mentions ne sont pas de nouvelles promesses : chacune reprend un élément déjà
présent dans le texte de l'étape.

### Traitement d'image, et le cas du fond bleu

Sur la section Domaines, le traitement général rendait les photos trop sombres : elles se
confondaient avec le fond bleu. Elles y sont donc **éclaircies** (`brightness(1.12)`) et leur
voile allégé, pour se détacher comme des planches posées. À refaire si une autre section passe
sur fond sombre.

### Traitement d'image

Les photos disponibles sont **chaudes** (elles avaient été choisies pour la charte marron). Elles
sont donc fortement désaturées et refroidies pour ne pas jurer avec le bleu :
`saturate(0.28) contrast(1.06) hue-rotate(-8deg)`, plus un voile bleu en `::after`. Variante
`.shot--deep` pour poser un libellé sur l'image. Quand les vraies photos du cabinet arriveront,
revoir ces valeurs.

### Composition

Règle posée par la skill `design-premium` : **deux sections consécutives ne partagent jamais la
même structure**. État actuel :

| # | Section | Composition |
|---|---|---|
| 01 | Hero | pleine hauteur, photo plein cadre, marque **centrée** |
| 02 | Expertises | colonne collante à gauche, grandes lignes cliquables à droite |
| 03 | Le cabinet | partition asymétrique, panneau chevauchant l'image |
| 04 | Domaines | **fond bleu de nuit**, trois panneaux hauts en escalier, libellé sur l'image |
| 05 | Méthode | **fond chaud**, panneaux blancs coiffés d'un trait corail |
| 06 | Formules | trois blocs de prix, **squelette provisoire** |
| 07 | Contact | bloc bleu, carte en vis-à-vis |

### ⚠️ Ce qui est banni comme « marqueur IA »

Joseph rejette tout ce qui signale un site généré. Verdicts déjà rendus, à ne pas réintroduire :

- **la numérotation éditoriale des sections**, 01 / 02 / 03, et les numéros d'items ou d'étapes.
  La skill `design-premium` la demande, le client la refuse : **le client prime**.
- **le petit filet horizontal devant les sur-titres**, et toute barre verticale décorative. Trois
  rejets sur trois chartes différentes.
- **les slogans tournés**, type « Vos décisions, nos chiffres ». Registre institutionnel.
- **les sur-titres qui paraphrasent le titre juste en dessous**, « Spécialités » au-dessus de
  « Trois domaines de spécialisation ». Supprimés partout, le titre suffit. Les `.eyebrow`
  restants ne subsistent que là où ils **portent une information** : libellés sur les images de
  spécialité, intitulés de colonnes du pied de page.

- ⚠️ **l'en-tête « titre à gauche, chapô à droite ».** Rejeté le 6 octobre 2026 comme gabarit
  reconnaissable, et la consigne est **permanente, tous sites confondus**. La classe
  `.section__head.split` a été supprimée. Ne pas la refaire sous un autre nom.

Ce qui l'a remplacé sur la section Domaines : le titre tient sur **deux lignes, la seconde
décalée et en corail**, en écho à la descente en escalier des trois panneaux. L'en-tête fait
ainsi partie de la composition au lieu de se poser dessus. Les sections Méthode et Prestations
n'ont plus que leur titre, elles attendent chacune leur propre traitement.

### ⚠️ Ne jamais supprimer un intervalle de CSS par index

**Régression du 6 octobre 2026.** En retirant les anciennes règles de la timeline, j'ai coupé le
fichier de `.step {` jusqu'à `.contact__grid {`. **Tout le bloc desktop de la section Expertises
se trouvait entre les deux** et a disparu avec. La section est restée cassée sur deux
déploiements : plus de deux colonnes, bloc corail à pleine largeur, lignes empilées en dessous.

Pourquoi ça n'a pas été vu : seules les sections qui venaient d'être modifiées avaient été
capturées.

Deux règles qui en découlent :

1. **Supprimer un bloc par son ouverture et sa fermeture**, jamais par l'index du sélecteur
   suivant. N'importe quoi peut se trouver entre les deux.
2. **Capturer la page entière après chaque modification**, pas seulement la section touchée. Une
   vignette de la page complète réduite à 300px de large suffit à repérer une section effondrée.

### Leçon : retirer un dispositif ne suffit pas

La numérotation portait à elle seule la structure de la section Expertises. Une fois retirée, il
restait trois colonnes égales nues, qui faisaient gabarit encore plus qu'avant. **Trois colonnes
égales sont la signature du gabarit** : quand on enlève un dispositif, il faut recomposer la
section, pas se contenter de la soustraction.

La section a donc été refaite en composition asymétrique :

- à gauche une colonne **collante** (`position: sticky`) qui porte le titre, le chapô et l'appel
  à l'action. Elle a besoin d'un conteneur étiré, `.expertises__aside`, pour avoir de la course.
- à droite trois **grandes lignes cliquables** pleine largeur, chacune avec son titre en grand
  corps, une ligne de mots-clés en capitales, la description et un bouton fléché.
- la colonne de gauche est un **bloc corail plein**, texte en blanc, bouton en contour blanc qui
  se remplit au survol.
- **titres et flèches sont en corail par défaut**, et non au survol. Le survol apporte autre
  chose : un aplat pâle qui déborde (`inset: 0 calc(-1 * var(--gutter)) 0 -1.25rem` au-delà de
  56rem, moins à gauche pour ne pas toucher le bloc corail), un filet corail qui se déploie sous
  la ligne, la flèche qui se remplit et le titre qui se fonce d'un ton.

⚠️ **Cette section est en plein cadre et ne connaît ni le conteneur commun ni la gouttière.**
`.expertises > .shell` écrase `max-width` et met `padding-inline: 0` : le cadre touche les deux
bords de l'écran. Le rembourrage haut de la section est supprimé pour qu'elle vienne au contact
du hero. C'est un parti pris, pas un oubli, et il ne faut pas la « réaligner » sur les autres.

Le trait bleu du cadre se fond avec le bas du hero, également bleu. C'est voulu. Ce qui rend le
cadre lisible malgré cela, c'est le **filet blanc intérieur**, qui dessine la limite là où le
bleu se confond.

Le contenu du bloc corail est centré sur les **deux axes**. Aligné à gauche, il se mettait à
flotter dès que le bloc s'élargissait.

La section est ceinte d'un **cadre bleu de nuit** (`.expertises__frame`), **sans rembourrage** :
le bloc corail touche le trait sur trois côtés. Épaisseur fluide, `clamp(14px, 3.2vw, 45px)` :
45px sur grand écran, mais réduite sur mobile où elle mangeait presque le quart de la largeur.

Un **filet blanc de 2px** sépare le cadre de l'intérieur, surtout visible contre le corail. Il est
posé en pseudo-élément et non en `box-shadow: inset` : l'ombre intérieure aurait été masquée par
le bloc corail, qui est un enfant.

Le contenu de la colonne corail est **centré verticalement** (`align-items: center` sur le
conteneur). Collé en haut, il paraissait déséquilibré quand la section tenait entièrement à
l'écran. L'élément collé ne prend le relais qu'au défilement, à `clamp(5rem, 16vh, 10rem)`. Le fond corail est porté par
`.expertises__aside`, le conteneur, et non par l'élément collé : le conteneur s'étire sur toute la
hauteur de la rangée, donc l'aplat va d'un bord à l'autre du cadre.

Ce sont les lignes de droite qui portent leur propre rembourrage, exposé en variable
`--frame-pad`, dont **l'aplat de survol se sert** pour déborder jusqu'au cadre, exactement, et pas
au-delà.

Pas de filet au-dessus de la première ligne ni sous la dernière : le cadre en tient lieu.

⚠️ C'est le point sensible de la section. L'aplat déborde par marges négatives : s'il dépasse le
cadre, ou la gouttière quand il n'y avait pas de cadre, il provoque un débordement horizontal sur
toute la page. Toujours le vérifier en forçant `opacity: 1` sur `.exp::before`, puis en mesurant
de 320 à 1680px, **1312px inclus**, largeur à laquelle le conteneur atteint son maximum et où la
marge extérieure devient nulle.

### Le hero, et deux choses à ne pas y remettre

Le H1 est **institutionnel** : la marque d'abord et en très grand, « HBR » en corail sur une
ligne, « Conseil » en blanc sur la suivante, puis « Cabinet d'expertise comptable à Paris » en
plus petit. Les deux parties sont dans le **même H1**, la marque dans un `span` : c'est le
sous-titre qui porte la requête de la page, il ne doit donc pas sortir du H1.

Le hero est **entièrement centré**, verticalement et horizontalement. Le voile a été repris en
conséquence : il était appuyé à gauche pour un texte aligné à gauche, il est désormais radial et
centré.

La marque tient sur **une seule ligne**, et le sous-titre est calé exactement sur sa largeur.
Ce calage est fait par `js/main.js` : la taille de police étant linéaire, une seule mesure suffit,
on lit la largeur naturelle à une taille de référence puis on applique le rapport. Le CSS porte un
repli en `clamp()` si le script ne tourne pas. Le recalage est rejoué sur `resize` et après
`document.fonts.ready`, sinon la mesure est faite avec la police de secours.

⚠️ Deux éléments ont été retirés et ne doivent pas revenir :

- **un slogan tourné** du type « Vos décisions, nos chiffres ». Jugé « tournure IA qui a essayé
  de faire quelque chose d'original ». Le registre est institutionnel, pas publicitaire.
- **le filet vertical corail** en bas du hero. « Ça fait trop IA, on voit ça sur tous les sites ».
  C'est le même verdict que sur l'ancienne `.rule-spine`, deux chartes de suite.

### Bandeau de chiffres clés : retiré

Repris de la référence, il a été supprimé parce que les données disponibles ne tenaient pas la
comparaison. Ne le réintroduire que si le cabinet fournit une année de création et un nombre de
collaborateurs réels.

Interdits hérités de la skill : cartes arrondies à ombre portée, icônes de librairie, dégradés
violets ou bleus type SaaS, responsive « par défaut ».

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
