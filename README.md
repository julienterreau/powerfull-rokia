# Powerfull Rokia

Site Next.js et administration Payload pour les récitations, le diagnostic audio et le blog.

## Lancer en local

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Le site est sur [http://localhost:3000](http://localhost:3000). L'administration est sur [http://localhost:3000/admin](http://localhost:3000/admin).

Sans `DATABASE_URL`, le contenu est enregistré dans une base SQLite locale (`data/`). Avec une URL Neon, c'est PostgreSQL. Sans les clés R2, les images et les audios restent dans `media/`.

Pour recopier les textes de départ dans l'admin :

```bash
pnpm seed
```

## Déploiement

Vercel, à la racine du dépôt. Commande de build : `pnpm build`.

Variables : celles de `.env.example`, plus `DATABASE_URL` (Neon) et les clés R2. `NEXT_PUBLIC_SITE_URL` doit être l'adresse publique du site.

Les maquettes de référence restent dans `public/design`.
