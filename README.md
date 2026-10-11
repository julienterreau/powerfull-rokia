# Powerfull Rokia

Site Next.js (front) et Strapi (contenu) pour les récitations, le diagnostic audio et le blog.

## Lancer en local

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev:web
```

Le front tourne sur [http://localhost:3000](http://localhost:3000). Sans `STRAPI_API_TOKEN`, les pages utilisent le contenu de départ (`apps/web/content/seed.ts`), le même que les maquettes.

Quand le CMS est prêt :

```bash
cp apps/cms/.env.example apps/cms/.env
pnpm dev:cms
```

Strapi : [http://localhost:1337/admin](http://localhost:1337/admin). Créez un jeton API en lecture pour le contenu public et en création pour `contact-message`, `diagnostic-submission` et `newsletter-subscriber`, puis collez-le dans `STRAPI_API_TOKEN`.

## Contenu à remplir dans Strapi

Les valeurs « XX » et les textes entre crochets sont des emplacements, pas des chiffres inventés.

- Photo de Julien (page À propos)
- Chiffres « XX » vidéos et « XX k » abonnés
- 20 vrais fichiers audio du diagnostic (mp3), à la place du silence de démonstration
- Vraies URL YouTube, durées et miniatures
- Vrais commentaires YouTube (pseudo, texte copié tel quel, lien)
- Réponses de FAQ à relire avec le client
- Mentions légales : forme juridique, adresse, hébergeur
- Identifiant WebCallHub (`NEXT_PUBLIC_WEBCALLHUB_ID`)

La phrase sur l'orientation spirituelle est obligatoire. Elle reste éditable, mais le champ ne doit pas être vidé.

## Déploiement

- Front : Vercel. Racine du projet, commande `pnpm --filter web build`, répertoire de sortie `.next` de l'app `apps/web` (ou `Root Directory` = `apps/web`). Renseignez les variables de `apps/web/.env.example`.
- CMS : Strapi Cloud ou un VPS avec PostgreSQL. Passez `DATABASE_CLIENT=postgres` et les variables de connexion. Activez les webhooks Strapi vers `POST https://votre-domaine/api/revalidate` avec l'en-tête `x-revalidate-secret`.
- Aperçu : `GET /api/preview?secret=STRAPI_PREVIEW_SECRET&slug=/blog/un-article`.

Les maquettes de référence restent dans `public/design` (HTML + PNG desktop 1440 et mobile 390).
