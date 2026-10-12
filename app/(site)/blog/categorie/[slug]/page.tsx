import { redirect } from "next/navigation";
import { getCategories } from "@/lib/content";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) redirect("/blog");
  redirect(`/blog?categorie=${encodeURIComponent(category.name)}`);
}
