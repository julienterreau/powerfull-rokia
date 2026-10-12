import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/PostContent";
import { PageHero } from "@/components/layout/PageHero";
import { getGlobal, getLegal } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegal("confidentialite");
  return { title: page?.seo.metaTitle, description: page?.seo.metaDescription };
}

export default async function PrivacyPage() {
  const page = await getLegal("confidentialite");
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
