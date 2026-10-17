import type { Article, BlogPreviewSection } from "@/content/types";
import { articleText, readingTime } from "@/lib/utils";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

const editorial = new Set(["methodes-avancees-captage-spirituel", "magie-transgenerationnelle-maledictions-familiales", "bien-commencer-la-roqya"]);
const textLink =
  "mt-[18px] inline-flex w-fit items-center gap-1.5 border-b border-current pb-0.5 text-[15px] font-semibold text-emerald transition-[color,gap] hover:gap-2.5 hover:text-gold motion-reduce:transition-none";

function minutes(article: Article) {
  return `${readingTime(articleText(article.blocks))} min`;
}

export function BlogPreview({ data, articles }: { data: BlogPreviewSection; articles: Article[] }) {
  const pool = articles.filter((article) => !editorial.has(article.slug));
  const lead = pool.find((article) => article.slug === "qu-est-ce-que-la-roqya") ?? pool[0];
  const side = pool.filter((article) => article.slug !== lead?.slug).slice(0, Math.max(0, data.limit - 1));
  if (!lead) return null;

  return (
    <Section className="bg-sand">
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-8">
        <SectionHeader className="min-w-0 flex-1" eyebrow={data.eyebrow} title={data.title} titleAccent={data.titleAccent} />
        <Button {...data.cta} />
      </div>
      <div className="mt-12 grid items-start gap-7 md:grid-cols-[1.15fr_0.9fr] md:gap-14">
        <a className="group" href={`/blog/${lead.slug}`}>
          <div className="pat relative h-[200px] overflow-hidden rounded-3xl bg-sand-2 md:h-[300px]">
            <span className="absolute top-4 left-4 z-10 rounded-full bg-emerald px-3 py-1.5 text-[13px] font-semibold text-white">À la une</span>
          </div>
          <span className="mt-4 block text-xs font-semibold tracking-[0.14em] text-gold uppercase">{lead.category}</span>
          <h3 className="mt-2 font-serif text-[30px] font-medium tracking-normal transition-colors group-hover:text-emerald md:text-[32px]">{lead.title}</h3>
          <p className="mt-2.5 text-base leading-relaxed text-text-2">{lead.excerpt}</p>
          <span className={textLink}>{"Lire l'article →"}</span>
        </a>
        <div>
          {side.map((article, index) => (
            <a className="group block rounded-2xl border-t border-line py-[24px] transition-colors first:border-t-0 first:pt-0 hover:bg-white/50" href={`/blog/${article.slug}`} key={article.slug}>
              <span className={`block text-xs font-semibold tracking-[0.14em] text-gold uppercase ${index === 0 ? "" : "mt-[18px]"}`}>
                {article.category} · {minutes(article)}
              </span>
              <h3 className="mt-2 font-serif text-2xl font-medium tracking-normal transition-colors group-hover:text-emerald md:text-[26px]">{article.title}</h3>
              <p className="mt-2.5 text-base leading-relaxed text-text-2">{article.excerpt}</p>
              <span className={textLink}>Lire →</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
