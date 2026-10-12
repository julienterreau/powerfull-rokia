import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { PostContent } from "@/components/blog/PostContent";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Pattern } from "@/components/ui/Pattern";
import { getArticle, getArticles, getGlobal, relatedArticles, withReadingTime } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getArticles().then((articles) => articles.map((article) => ({ slug: article.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return { title: article.seo.metaTitle, description: article.seo.metaDescription, openGraph: { type: "article", title: article.seo.metaTitle, description: article.seo.metaDescription } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const global = await getGlobal();
  const detailed = withReadingTime(article);
  const articles = await getArticles();
  const related = relatedArticles(articles, article.slug, article.category);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    description: article.excerpt,
  };

  return (
    <main id="contenu">
      <PageHero global={global} crumb={article.category} eyebrow={article.category} title={article.title} lead={`${formatDate(article.publishedAt)} · ${detailed.minutes} min de lecture`} />
      <section style={{ padding: "0 0 110px" }}>
        <div className="c article">
          <div className="cover">
            <Pattern />
          </div>
          <PostContent blocks={article.blocks} />
          <div style={{ marginTop: 36 }}>
            <Button label="Faire le diagnostic" url="/diagnostic" variant="gold" />
          </div>
        </div>
        {related.length > 0 ? (
          <div className="c related">
            <div className="learn">
              {related.map((item) => (
                <PostCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
