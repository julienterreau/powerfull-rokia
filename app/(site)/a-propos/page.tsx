import type { Metadata } from "next";
import { AboutCta } from "@/components/about/AboutCta";
import { Stats } from "@/components/about/Stats";
import { Story } from "@/components/about/Story";
import { Values } from "@/components/about/Values";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAbout, getGlobal } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAbout();
  return { title: page.seo.metaTitle, description: page.seo.metaDescription };
}

export default async function AboutPage() {
  const [global, page] = await Promise.all([getGlobal(), getAbout()]);
  return (
    <main id="contenu">
      <PageHero global={global} crumb={page.crumb} eyebrow={page.eyebrow} title={page.title} titleAccent={page.titleAccent} titleAfter={page.titleAfter} lead={page.lead} />
      <Section>
        <Story page={page} />
        <Stats items={page.stats} />
      </Section>
      <Section className="pt0">
        <SectionHeader eyebrow={page.valuesEyebrow} title={page.valuesTitle} titleAccent={page.valuesAccent} align="center" />
        <Values items={page.values} />
      </Section>
      <AboutCta page={page} />
    </main>
  );
}
