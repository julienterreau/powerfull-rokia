import { redirect } from "next/navigation";
import { categoriesSeed } from "@/content/seed";

export function generateStaticParams() {
  return categoriesSeed.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoriesSeed.find((item) => item.slug === slug);
  if (!category) redirect("/blog");
  redirect(`/blog?categorie=${encodeURIComponent(category.name)}`);
}
