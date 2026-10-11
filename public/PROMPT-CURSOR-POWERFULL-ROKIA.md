# Prompt Cursor : Powerfull Rokia (Next.js + Strapi, from scratch)

> **Avant de lancer :** crée un dossier vide, dézippe ce kit dedans, puis colle tout ce qui suit dans Cursor (mode Agent). Le kit contient :
> - `design/desktop/` : les 6 pages en **HTML** (valeurs exactes) + **PNG pleine page à 1440 px** : `home`, `apropos`, `diagnostic`, `blog`, `videos`, `contact`
> - `design/mobile/` : les mêmes 6 pages en **HTML** + **PNG pleine page à 390 px** (rendu @2x)
> - `design/fonts/` : Fraunces (titres) et Inter (texte)
>
> Les HTML sont la **source de vérité** : ouvre-les dans le navigateur, inspecte le CSS et reprends les valeurs exactes. Les PNG servent à comparer visuellement.

---

## 0. Mission et règles absolues

Construis **de zéro** le site Powerfull Rokia (roqya, récitations du Coran, diagnostic audio gratuit) en reproduisant **au pixel près** les maquettes desktop **et** mobile, avec un back-office **Strapi** qui permet au client de tout modifier sans code : textes, images, audios du diagnostic, vidéos, articles de blog, FAQ, liens.

- **Pixel perfect** : un écart de plus de 2 px avec les maquettes (desktop 1440 px et mobile 390 px) est à corriger.
- **Aucun texte en dur** dans les composants : tout vient de Strapi (avec des valeurs par défaut uniquement dans les seeds).
- **Ton éditorial** : le site dit **« nous »**. Il présente Julien Terrau à la troisième personne.
- **Responsabilité** : la mention « Ce diagnostic est une orientation spirituelle. Il ne remplace pas un avis médical ou psychologique : en cas de souffrance, consultez un professionnel de santé. » doit **toujours** être visible à côté de chaque bouton du diagnostic et sur la page Diagnostic, avant l'outil. Elle est éditable dans Strapi mais **obligatoire** (champ requis).
- **Honnêteté** : aucun faux témoignage, faux chiffre ou faux compteur. Les témoignages sont des commentaires YouTube réels saisis dans Strapi. Les chiffres « XX » des maquettes sont des emplacements à remplir dans Strapi.
- Avance **par étapes** (§12) et montre-moi le rendu **1440 px et 390 px** à chaque étape.

---

## 1. Stack

| Rôle | Choix |
|---|---|
| Front | **Next.js 15 (App Router)**, React, **TypeScript strict** |
| Styles | **Tailwind CSS** (v4, tokens dans `@theme`) |
| UI de base | **shadcn/ui** uniquement si utile (Accordion, Sheet pour le menu mobile, Input, Checkbox, Toast) ; restylé avec les tokens |
| Animations | **framer-motion** (respect de `prefers-reduced-motion`) |
| Validation | **zod** (formulaires, réponses API Strapi, variables d'environnement) |
| État client | **zustand** (diagnostic audio, lecteur audio global, menu mobile) |
| CMS | **Strapi v5** (TypeScript), PostgreSQL en prod, SQLite en local, uploads (images, audios) via le Media Library |
| Polices | `next/font/local` avec les fichiers de `design/fonts` |

### Monorepo
```
/apps/web      → Next.js
/apps/cms      → Strapi
/packages/types (facultatif) → types partagés générés depuis Strapi
```
`pnpm` workspaces. Un `README.md` explique comment lancer les deux en local.

---

## 2. Architecture du front

```
apps/web/
  app/
    layout.tsx                 # polices, Header, Footer, CallWidget, metadata par défaut
    page.tsx                   # Accueil
    a-propos/page.tsx
    diagnostic/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx       # article
    blog/categorie/[slug]/page.tsx
    videos/page.tsx
    contact/page.tsx
    mentions-legales/page.tsx
    confidentialite/page.tsx
    api/contact/route.ts       # envoi du formulaire → Strapi
    api/diagnostic/route.ts    # envoi des réponses → Strapi
    api/newsletter/route.ts
    sitemap.ts, robots.ts, not-found.tsx
  components/
    layout/      Header.tsx, MobileMenu.tsx, Footer.tsx, CallWidget.tsx, PageHero.tsx
    ui/          Button.tsx, Eyebrow.tsx, SectionHeader.tsx, Card.tsx, Chip.tsx, Pattern.tsx, Disclaimer.tsx, Section.tsx
    home/        Hero.tsx, ThemesStrip.tsx, HowItWorks.tsx, DiagnosticTeaser.tsx, LatestVideos.tsx, WhyUs.tsx, BlogPreview.tsx, Testimonials.tsx, FaqPreview.tsx, Podcast.tsx, Verse.tsx
    about/       Story.tsx, Stats.tsx, Values.tsx, AboutCta.tsx
    diagnostic/  Tips.tsx, DiagnosticTool.tsx, AudioRow.tsx, ProgressBar.tsx, ResultScreen.tsx
    blog/        FeaturedPost.tsx, CategoryFilter.tsx, PostCard.tsx, PostGrid.tsx, Newsletter.tsx, PostContent.tsx
    videos/      FeaturedVideo.tsx, VideoCard.tsx, VideoGrid.tsx, SubscribeBanner.tsx
    contact/     ContactCards.tsx, ContactForm.tsx, Faq.tsx
  lib/
    strapi.ts         # client fetch typé + revalidation (ISR, tags)
    schemas/          # schémas zod (réponses Strapi, formulaires)
    stores/           # zustand : diagnostic.ts, audio.ts, ui.ts
    utils.ts
  types/
```
Règles : **un composant par fichier**, rangé dans le dossier de sa page (`components/<page>/`). Les composants réutilisés sur plusieurs pages vont dans `components/ui` ou `components/layout`. Server Components par défaut, `"use client"` seulement pour : MobileMenu, CallWidget, DiagnosticTool (et enfants), lecteur audio, filtres, formulaires, FAQ, animations.

---

## 3. Design tokens (valeurs exactes des maquettes)

### Couleurs
| Token | Valeur | Usage |
|---|---|---|
| `emerald` | `#0F3D33` | Panneaux sombres, boutons principaux, textes forts |
| `emerald-2` | `#14523F` | Haut du dégradé de hero |
| `emerald-3` | `#0B2E27` | Bas du dégradé, carte du diagnostic |
| `sand` | `#F6F1E7` | Fond de page |
| `sand-2` | `#EDE4D3` | Cartes « Pourquoi », valeurs |
| `gold` | `#B8914A` | Eyebrows, numéros, mot en italique des titres, bouton secondaire plein |
| `gold-light` | `#E9D3A3` | Accent sur fond sombre |
| `ink` | `#1D2A26` | Texte principal |
| `text-2` | `#4E5C57` | Paragraphes |
| `text-3` | `#83908B` | Métadonnées |
| `line` | `#E4DBC9` | Bordures |
| `on-dark` | `#C9D6D0` | Paragraphes sur fond sombre |

**Dégradé des heros** : `linear-gradient(170deg, #14523F 0%, #0F3D33 55%, #0B2E27 100%)` + halo `radial-gradient(45% 55% at 50% 35%, rgba(233,211,163,.18), transparent 70%)` + motif géométrique.
**Motif** : SVG en tuile 80 × 80 (étoile à 8 branches, trait `#B8914A` à 18 % d'opacité), à reprendre exactement depuis la classe `.pat` des HTML → composant `Pattern.tsx`.

### Typographie
| Rôle | Desktop | Mobile | Style |
|---|---|---|---|
| H1 hero accueil | 76 px | 42 px | Fraunces 500, -0.02em, 1.02 |
| H1 pages | 62 px | 38 px | Fraunces 500, 1.05 |
| H2 section | 46 px | 32 px | Fraunces 500, 1.1 |
| Mot accent dans les titres | — | — | Fraunces **italique 400**, couleur `gold` (ou `gold-light` sur fond sombre) |
| H3 carte | 22 à 24 px | 20 px | Fraunces 500 |
| Eyebrow | 13 px | 12 px | Inter 600, majuscules, tracking .12em, `gold`, petit trait de 22 px avant (et après si centré) |
| Lead | 18 à 19 px | 16 px | Inter 400, 1.6 |
| Body | 15 à 16 px | 15 px | Inter 400, 1.6 |

Le titre de chaque section suit le motif **« partie normale + *partie en italique dorée* »** : prévois deux champs dans Strapi (`title` et `titleAccent`).

### Formes
- Panneaux sombres (heros, diagnostic, CTA) : radius **40** (24 en mobile), marge **8 px** (6 en mobile) autour.
- Cartes : radius 24, fond `#fff`, bordure `1px line`.
- Boutons : hauteur 54 (46 dans le header), radius 40, padding 0 26, 15 / 600. Variantes : `primary` (emerald), `gold`, `outline`, `white`, `outline-light`.
- Conteneur : 1120 px, padding latéral 20 px en mobile. Sections : 120 px vertical desktop, 72 px mobile.

---

## 4. Header, menu, footer, bouton d'appel (communs)

- **Header** (dans la hero de chaque page) : logo à gauche, menu en pilule de verre au centre (`Accueil · À propos · Diagnostic · Blog · Vidéos · Contact`, lien actif en `gold-light`), bouton blanc « Faire le diagnostic » à droite. **Mobile** : logo + bouton rond blanc burger 44 px → `MobileMenu` plein écran (fond emerald, liens Fraunces 30 px numérotés, bouton « Faire le diagnostic » en bas, focus piégé, Échap pour fermer).
- **Footer** : logo + baseline · Découvrir (Blog, Vidéos, Diagnostic) · À propos (À propos, Contact) · Nous suivre (YouTube, e-mail) · ligne de bas (© année, Mentions légales, Confidentialité). Mobile : 2 colonnes, logo en pleine largeur.
- **CallWidget (WebCallHub)** : bouton rond bleu `#2F5BEA` 64 px (56 en mobile), halo `0 0 0 12px rgba(47,91,234,.18)`, **fixe** en bas à droite (28 px du bord, 16 en mobile), avec la pastille « ⚡ Powered by WebCallHub » au-dessus (masquée en mobile). Intègre le **script officiel WebCallHub** via `next/script` (`strategy="lazyOnload"`) ; l'identifiant du widget vient d'une variable d'environnement `NEXT_PUBLIC_WEBCALLHUB_ID` et de Strapi (`global.callWidgetEnabled`). Si le script fournit déjà son propre bouton, n'affiche pas le nôtre (pas de doublon).

---

## 5. Pages (structure exacte, voir les HTML)

### Accueil `/`
1. **Hero centrée** (panneau sombre) qui répond aux 4 questions : badge « Diagnostic gratuit · 20 min · résultat immédiat » → H1 « Retrouvez la paix par les *versets du Coran* » → lead → ligne « Pour vous si : » + chips (Mauvais œil, Sorcellerie, Sommeil agité, Blocages) → boutons « Faire le diagnostic gratuit » (gold) + « Écouter les roqyas » (outline-light) → 3 garanties.
2. **Bande de thèmes** (texte Fraunces 22 px séparé par ✦).
3. **Comment ça marche** : 3 cartes numérotées 01 à 03.
4. **Diagnostic (teaser)** : panneau sombre, texte + liste + bouton + disclaimer à gauche ; à droite une **image cliquable** de l'outil (aperçu non interactif, reprend le design de `DiagnosticTool`) avec le bouton « Ouvrir le diagnostic → » posé à cheval sur le bas. Le tout redirige vers `/diagnostic`.
5. **Dernières vidéos** : 3 vidéos (1 large + 2), bouton « S'abonner à la chaîne ».
6. **Pourquoi Powerfull Rokia** : 3 cartes `sand-2`.
7. **Le blog** : 3 derniers articles + bouton « Voir le blog ».
8. **Témoignages** : 3 cartes + mention « Témoignages issus des commentaires de la chaîne. Chaque parcours est personnel. »
9. **FAQ courte** (4 questions) + bouton « Voir toute la FAQ » → `/contact#faq`.
10. **Podcast** (panneau sombre, champ e-mail + « Être prévenu ») : **affiché seulement si `podcast.enabled` est vrai dans Strapi**.
11. **Verset** (arabe + traduction + référence).

### À propos `/a-propos`
Hero de page (fil d'Ariane, eyebrow, H1, lead) → **Histoire** (image + texte riche) → **3 chiffres** → **Notre intention** (4 valeurs en grille 2 × 2) → encadré disclaimer → CTA « Prêt à faire le point ? ».

### Diagnostic `/diagnostic`
Hero de page (avec garanties) → **4 conseils avant de commencer** + disclaimer (**avant l'outil**) → titre « Écoutez, *puis répondez* » → **DiagnosticTool** :
- Champs **Nom** et **E-mail** (zod : nom 2 à 60 caractères, e-mail valide) obligatoires avant de pouvoir répondre.
- Barre de progression « Progression · n / 20 ».
- **20 lignes `AudioRow`** chargées depuis Strapi (titre « Détection n », fichier audio, ordre). Bouton lecture doré → lit l'audio (un seul audio à la fois, géré par le store `audio`), onde animée sur la ligne en cours, lecture/pause, la ligne active a un fond doré léger.
- Boutons **Oui / Non** par ligne (sélection en `gold`). Les lignes répondues passent à 65 % d'opacité.
- Le bouton « Voir mon résultat » s'active quand les 20 réponses sont données. Envoi via `POST /api/diagnostic` → Strapi (`diagnostic-submission` : nom, e-mail, réponses, score = nombre de « oui », date). Puis `ResultScreen` : texte de résultat **défini dans Strapi selon des tranches de score** + vidéos conseillées liées + disclaimer.
- Store zustand `diagnostic` : `name`, `email`, `answers: Record<number,'oui'|'non'>`, `currentAudio`, `progress`, `submit()`, persistance `sessionStorage` (on ne perd pas ses réponses si on recharge).
- Accessibilité : boutons Oui/Non en `role="radiogroup"`, lecture au clavier, `aria-live` sur la progression.

### Blog `/blog` et `/blog/[slug]`
Hero de page + **filtres par catégorie** (chips) → **article à la une** → **grille de 6 articles** (catégorie, titre, extrait, temps de lecture) → « Charger plus d'articles » (pagination Strapi) → **Newsletter**.
Page article : hero simple (catégorie, titre, date, temps de lecture), image de couverture, contenu riche (blocs Strapi : texte, image, citation, verset, vidéo YouTube, encadré), articles liés, CTA diagnostic. Temps de lecture calculé automatiquement.

### Vidéos `/videos`
Hero de page + filtres → **dernière vidéo** en grand (carte blanche, miniature + texte + « Regarder sur YouTube ») → **grille de 6** (miniature, durée, titre, date) → « Voir toutes les vidéos » → bannière « Ne manquez aucune roqya » + « S'abonner à la chaîne ». Les vidéos sont saisies dans Strapi (URL YouTube, titre, durée, catégorie, miniature auto depuis l'ID YouTube si pas d'image). Lecture dans une modale (iframe `youtube-nocookie`), chargée au clic uniquement.

### Contact `/contact`
Hero de page → **3 cartes** (E-mail, Téléphone → ouvre le widget WebCallHub, YouTube) → **formulaire** (nom, e-mail, sujet, message, consentement RGPD ; zod côté client et serveur ; anti-spam honeypot + limite de débit) → envoi dans Strapi (`contact-message`) + e-mail de notification (plugin email Strapi) → **FAQ complète** (`id="faq"`, accordéon, une seule ouverte).

**Important :** aucune carte ne doit chevaucher la hero ; le contenu commence sous la hero avec 96 px d'espace (64 en mobile).

---

## 6. Strapi : modèle de contenu

### Single types
- `global` : logo, nom, baseline footer, liens (YouTube, e-mail), menu (libellés + ordre), texte du disclaimer médical (**requis**), `callWidgetEnabled`, SEO par défaut.
- `home` : **dynamic zone** avec un composant par section (hero, themes-strip, how-it-works, diagnostic-teaser, latest-videos, why-us, blog-preview, testimonials, faq-preview, podcast, verse). Le client peut réordonner, masquer ou modifier chaque section.
- `about-page`, `diagnostic-page` (textes, conseils, textes de résultat par tranche de score), `blog-page`, `videos-page`, `contact-page` : hero + sections, même principe.
- `podcast` : `enabled`, titre, texte, date prévue.

### Collection types
- `diagnostic-audio` : `order` (1 à 20, unique), `title`, `audio` (media, mp3), `isActive`.
- `diagnostic-result` : `minScore`, `maxScore`, `title`, `text` (rich), `recommendedVideos` (relation).
- `diagnostic-submission` : nom, e-mail, réponses (json), score, date (lecture seule pour le client).
- `article` : titre, slug (auto), extrait, couverture, catégorie (relation), contenu (dynamic zone de blocs), `featured`, date de publication, auteur, SEO.
- `category` : nom, slug, couleur de fond de la carte.
- `video` : titre, URL YouTube, durée, catégorie, miniature, `featured`, date.
- `testimonial` : pseudo YouTube, texte (copié tel quel), lien vers le commentaire, `isVisible`.
- `faq-item` : question, réponse (rich), ordre, `showOnHome`.
- `contact-message`, `newsletter-subscriber` (lecture seule).

### Composants partagés
`shared.section-header` (eyebrow, title, titleAccent, lead), `shared.button` (label, url, variant), `shared.seo` (metaTitle, metaDescription, ogImage), `shared.stat`, `shared.step`, `shared.feature`.

### Configuration
- Rôles : **Public** en lecture seule sur le contenu publié ; écriture uniquement via les routes API Next (token serveur `STRAPI_API_TOKEN`, jamais exposé au client).
- **Draft & Publish** activé sur les articles et pages ; **Preview** Next.js branchée sur Strapi.
- **Webhooks** Strapi → `POST /api/revalidate` (Next) pour revalider par tag après chaque publication.
- Upload : limite 20 Mo pour les audios, formats mp3/m4a.
- **Seeds** : script qui crée tout le contenu des maquettes (textes, 20 audios factices, 6 articles, 6 vidéos, FAQ) pour démarrer.
- Interface admin en **français**.

---

## 7. Données et typage
- `lib/strapi.ts` : fonction `fetchStrapi<T>(path, { schema, tags, revalidate })` qui valide chaque réponse avec **zod** et lève une erreur claire si le contenu est incomplet.
- Images via `next/image` (domaine Strapi autorisé), `sizes` adaptés, placeholder flou.
- Rendu : pages en **SSG + ISR** (revalidation par tag), blog paginé côté serveur.

---

## 8. Responsive (strict, voir `design/mobile`)

Teste à **360 · 390 · 768 · 1024 · 1280 · 1440 px**. Aucun scroll horizontal.

| Élément | Desktop | Mobile (< 768) |
|---|---|---|
| Header | pilule complète + bouton | logo + burger 44 px, menu plein écran |
| Hero accueil | H1 76 px, boutons côte à côte, garanties en ligne | H1 42 px, chips centrés sur plusieurs lignes, **boutons pleine largeur empilés**, garanties empilées |
| Grilles 3 colonnes (étapes, pourquoi, blog, témoignages, vidéos, contact) | 3 col. | **1 col.**, gap 14 |
| Diagnostic teaser | 2 col. | texte puis aperçu de l'outil |
| DiagnosticTool | 760 px centré | pleine largeur, padding 18, champs Nom/E-mail empilés, onde masquée, boutons Oui/Non 34 px de haut minimum |
| Article à la une / vidéo à la une | 2 col. | image au-dessus |
| Newsletter, bannière YouTube | en ligne | empilé, champ et bouton pleine largeur |
| FAQ + titre | `380px 1fr` | 1 col. |
| Footer | 4 col. | 2 col. |
| CallWidget | 64 px + pastille | 56 px, pastille masquée |

Zones cliquables ≥ 44 px, `text-wrap: balance` sur les titres.

---

## 9. Animations (framer-motion)
- Apparition au scroll : fondu + 16 px, 500 ms, `easeOut`, une fois, 60 ms de décalage entre cartes.
- Hero : titre et boutons en cascade (0, 80, 160 ms).
- Survol cartes : `y: -4`, ombre plus marquée.
- Onde audio animée pendant la lecture, barre de progression animée.
- Menu mobile : glissement + fondu.
- Tout est désactivé avec `prefers-reduced-motion`.

---

## 10. SEO, accessibilité, performance
- `generateMetadata` par page depuis Strapi (`shared.seo`), Open Graph, `sitemap.ts` (pages + articles), `robots.ts`, JSON-LD `Organization` + `Article` + `FAQPage`.
- **Ne recrée pas de bloc de mots-clés** pour le SEO : le contenu des articles fait ce travail.
- Un seul `h1` par page, `lang="fr"` (et `dir="rtl"` sur le verset arabe), lien « Aller au contenu », focus visible, contraste AA, `alt` obligatoires (champ requis dans Strapi).
- Lighthouse ≥ 95 sur mobile. Audios en `preload="none"`.

---

## 11. Variables d'environnement (validées par zod)
`NEXT_PUBLIC_SITE_URL`, `STRAPI_URL`, `STRAPI_API_TOKEN`, `STRAPI_PREVIEW_SECRET`, `REVALIDATE_SECRET`, `NEXT_PUBLIC_WEBCALLHUB_ID`. Fournis un `.env.example` pour chaque app.

---

## 12. Méthode (étape par étape)
Après chaque étape : capture **1440 px** et **390 px**, comparaison avec les PNG, correction des écarts.

1. Monorepo, Next.js, Tailwind (tokens, polices), Strapi (modèle de contenu complet, rôles, seeds).
2. Composants `ui/` et `layout/` (Header, MobileMenu, Footer, CallWidget, PageHero, Pattern, Disclaimer).
3. Accueil, section par section.
4. Page Diagnostic + store zustand + API + résultats.
5. Blog (liste, catégories, article, newsletter).
6. Vidéos.
7. À propos, Contact (formulaire + FAQ), mentions légales, confidentialité.
8. Revalidation, preview, SEO, accessibilité, passe responsive complète, Lighthouse.

À la fin, donne-moi : la liste des contenus à remplir dans Strapi (chiffres « XX », vraies vidéos, vrais commentaires YouTube, photo de Julien, réponses de la FAQ, 20 audios), et la procédure de déploiement (Vercel pour le front, Strapi Cloud ou un VPS pour le CMS).
