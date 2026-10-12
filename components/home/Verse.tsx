import type { VerseSection } from "@/content/types";

export function Verse({ data }: { data: VerseSection }) {
  return (
    <section className="c verse">
      <div className="ar" dir="rtl" lang="ar">
        {data.arabic}
      </div>
      <blockquote>« {data.translation} »</blockquote>
      <cite>{data.reference}</cite>
    </section>
  );
}
