import type { Metadata } from "next";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { Newsletter } from "@/components/blog/Newsletter";
import { PostGrid } from "@/components/blog/PostGrid";
import { PageHero } from "@/components/layout/PageHero";
import { getArticles, getBlogPage, getGlobal } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage();
  return { title: page.seo.metaTitle, description: page.seo.metaDescription };
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ categorie?: string }> }) {
  const params = await searchParams;
  const [global, page, articles] = await Promise.all([getGlobal(), getBlogPage(), getArticles()]);
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const categorie = params.categorie;
  const grid = articles.filter((article) => article.slug !== featured?.slug && (!categorie || categorie === "Tous" || article.category === categorie));

  return (
    <main id="contenu">
      <PageHero global={global} crumb={page.crumb} eyebrow={page.eyebrow} title={page.title} titleAccent={page.titleAccent} lead={page.lead} />
      <section style={{ padding: "0 0 110px" }}>
        <div className="c">
          {featured && (!categorie || categorie === "Tous" || featured.category === categorie) ? (
            <FeaturedPost article={featured} kicker={page.featuredLabel} readLabel={page.readLabel} />
          ) : null}
          <PostGrid articles={grid} loadMore={page.loadMore} empty={page.empty} />
          <Newsletter title={page.newsletterTitle} text={page.newsletterText} placeholder={page.newsletterPlaceholder} button={page.newsletterButton} />
        </div>
      </section>
    </main>
  );
}
