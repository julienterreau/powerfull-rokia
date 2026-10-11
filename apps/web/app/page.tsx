import type { HomeSection } from "@/content/types";
import { BlogPreview } from "@/components/home/BlogPreview";
import { DiagnosticTeaser } from "@/components/home/DiagnosticTeaser";
import { FaqPreview } from "@/components/home/FaqPreview";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LatestVideos } from "@/components/home/LatestVideos";
import { Podcast } from "@/components/home/Podcast";
import { Highlights } from "@/components/home/Highlights";
import { Testimonials } from "@/components/home/Testimonials";
import { TextHighlight } from "@/components/home/TextHighlight";
import { ThemesStrip } from "@/components/home/ThemesStrip";
import { Verse } from "@/components/home/Verse";
import { WhyUs } from "@/components/home/WhyUs";
import { getArticles, getFaq, getHome, getTestimonials, getVideos } from "@/lib/content";

export default async function HomePage() {
  const [home, videos, articles, testimonials, faq] = await Promise.all([getHome(), getVideos(), getArticles(), getTestimonials(), getFaq()]);

  const blocks: React.ReactNode[] = [];
  for (let index = 0; index < home.sections.length; index += 1) {
    const section = home.sections[index];
    const next = home.sections[index + 1];
    if (section.__component === "sections.text-highlight" && next?.__component === "sections.text-highlight") {
      blocks.push(<Highlights key={`highlights-${index}`} items={[section, next]} />);
      index += 1;
      continue;
    }
    blocks.push(
      <HomeBlock
        key={`${section.__component}-${index}`}
        section={section}
        videos={videos}
        articles={articles}
        testimonials={testimonials}
        faq={faq}
        tone="sand2"
      />,
    );
  }

  return <main id="contenu">{blocks}</main>;
}

function HomeBlock({
  section,
  videos,
  articles,
  testimonials,
  faq,
  tone,
}: {
  section: HomeSection;
  videos: Awaited<ReturnType<typeof getVideos>>;
  articles: Awaited<ReturnType<typeof getArticles>>;
  testimonials: Awaited<ReturnType<typeof getTestimonials>>;
  faq: Awaited<ReturnType<typeof getFaq>>;
  tone: "sand" | "sand2";
}) {
  switch (section.__component) {
    case "home.hero":
      return <Hero data={section} />;
    case "home.themes-strip":
      return <ThemesStrip data={section} />;
    case "home.how-it-works":
      return <HowItWorks data={section} />;
    case "home.diagnostic-teaser":
      return <DiagnosticTeaser data={section} />;
    case "home.latest-videos":
      return <LatestVideos data={section} videos={videos} />;
    case "home.why-us":
      return <WhyUs data={section} />;
    case "sections.text-highlight":
      return <TextHighlight data={section} tone={tone} />;
    case "home.blog-preview":
      return <BlogPreview data={section} articles={articles} />;
    case "home.testimonials":
      return <Testimonials data={section} items={testimonials} />;
    case "home.faq-preview":
      return <FaqPreview data={section} items={faq} />;
    case "home.podcast":
      return <Podcast data={section} />;
    case "home.verse":
      return <Verse data={section} />;
    default:
      return null;
  }
}
