import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/PostContent";
import { PageHero } from "@/components/layout/PageHero";
import { getGlobal, getLegal } from "@/lib/content";

const reserved = new Set(["a-propos", "diagnostic", "blog", "videos", "temoignages", "contact", "mentions-legales", "confidentialite"]);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (reserved.has(slug)) return {};
  const page = await getLegal(slug);
  return { title: page?.seo.metaTitle, description: page?.seo.metaDescription };
}

export default async function LegalSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (reserved.has(slug)) notFound();
  const page = await getLegal(slug);
  if (!page) notFound();
  const global = await getGlobal();
  return (
    <main id="contenu">
      <PageHero global={global} crumb={page.title} eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section style={{ padding: "0 0 110px" }}>
        <div className="c article">
          <PostContent blocks={page.blocks} />
        </div>
      </section>
    </main>
  );
}
