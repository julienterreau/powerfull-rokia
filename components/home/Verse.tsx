import type { VerseSection } from "@/content/types";
import Image from "next/image";

export function Verse({ data }: { data: VerseSection }) {
  return (
    <section className="verse verse-band mt-20">
      <Image src="/verse.jpg" alt="" width={1920} height={640} className="absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-[rgba(28,22,16,0.42)]" />
      <div className="c relative z-[1]">
        <div className="ar" dir="rtl" lang="ar">
          {data.arabic}
        </div>
        <blockquote>« {data.translation} »</blockquote>
        <cite>{data.reference}</cite>
      </div>
    </section>
  );
}
