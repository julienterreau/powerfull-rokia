import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { FeaturedVideo } from "@/components/videos/FeaturedVideo";
import { SubscribeBanner } from "@/components/videos/SubscribeBanner";
import { VideoGrid } from "@/components/videos/VideoGrid";
import { getGlobal, getVideos, getVideosPage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getVideosPage();
  return { title: page.seo.metaTitle, description: page.seo.metaDescription };
}

export default async function VideosPage({ searchParams }: { searchParams: Promise<{ categorie?: string }> }) {
  const params = await searchParams;
  const [global, page, videos] = await Promise.all([getGlobal(), getVideosPage(), getVideos()]);
  const categorie = params.categorie;
  const filtered = videos.filter((video) => !categorie || categorie === "Toutes" || video.category === categorie);
  const featured = filtered.find((video) => video.featured) ?? filtered[0];
  const grid = filtered.filter((video) => video !== featured);

  return (
    <main id="contenu">
      <PageHero global={global} crumb={page.crumb} eyebrow={page.eyebrow} title={page.title} titleAccent={page.titleAccent} lead={page.lead} />
      <section style={{ padding: "0 0 110px" }}>
        <div className="c">
          {featured ? <FeaturedVideo video={featured} kicker={page.latestLabel} watchLabel={page.watchLabel} /> : null}
          <VideoGrid videos={grid} />
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Button label={page.allLabel} url={page.allUrl} variant="outline" />
          </div>
          <SubscribeBanner page={page} />
        </div>
      </section>
    </main>
  );
}
