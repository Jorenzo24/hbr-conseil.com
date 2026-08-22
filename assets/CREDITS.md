# Ressources externes du dossier assets/

## Images : PLACEHOLDERS À REMPLACER

Photos issues d'Unsplash, sous [licence Unsplash](https://unsplash.com/license)
(usage commercial autorisé, attribution non obligatoire). Ce sont des **images
provisoires** destinées à être remplacées par les photos réelles du cabinet.

| Fichier | Sujet | ID Unsplash |
|---|---|---|
| `img/hero-paris-*.webp` | Immeuble haussmannien au crépuscule | `McTpMg_iLgI` |
| `img/cabinet-salle-*.webp` | Salle lambrissée, longue table | `RsAssD3GGt8` |
| `img/specialite-bnc-1100.webp` | Bureaux sombres, baies vitrées | `tFgbDkYwkE0` |
| `img/specialite-lmnp-1100.webp` | Séjour meublé en fin de journée | `rEJxpBskj3Q` |
| `img/specialite-agriculture-1100.webp` | Vignoble au-dessus de la brume | `8hV7wyAWOqo` |

Retéléchargement d'un original : `https://unsplash.com/photos/<ID>/download?w=2600`

Le traitement duotone marron est appliqué **en CSS** (`.duo`, section 5 de
`style.css`), pas dans les fichiers. Les remplaçantes hériteront donc du même
rendu sans retouche : il suffit de respecter les mêmes dimensions et rapports :

- hero : 1400×1900 et 700×950 (portrait 
  ~3:4)
- cabinet : 1800×1200 et 900×600 (3:2)
- spécialités : 1100×1375 (4:5)

Chaîne de conversion utilisée :
`magick <src> -strip -resize "LxH^" -gravity center -extent "LxH" -quality 92 tmp.jpg`
puis `cwebp -q 78 -m 6 tmp.jpg -o <dest>.webp`

## Polices : auto-hébergées

| Fichier | Famille | Licence |
|---|---|---|
| `fonts/newsreader-var-latin.woff2` | Newsreader (variable, 300 à 600) | SIL Open Font License 1.1 |
| `fonts/archivo-var-latin.woff2` | Archivo (variable, 400 à 600) | SIL Open Font License 1.1 |

Sous-ensemble **latin uniquement** : suffisant pour le français, y compris `œ`
(U+0153). L'italique de Newsreader a été volontairement écartée : 144 Ko pour un
usage ponctuel.

⚠️ **Pas de Google Fonts en CDN** : requête vers un serveur tiers, dépendance
réseau au chargement, et zone grise RGPD. Les fichiers sont servis depuis ce
dossier.

## Favicon

`favicon.svg` (source) et `favicon.ico` (32 et 16 px, généré depuis le SVG).
Monogramme H en formes géométriques, jambages champagne, barre marron, et non
en glyphe typographique, pour rester net à 16 px.

Régénérer l'ico après modification du SVG :
`magick -background none favicon.svg -resize 64x64 tmp.png && magick tmp.png -define icon:auto-resize=32,16 favicon.ico`
