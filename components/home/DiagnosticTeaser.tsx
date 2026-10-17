import type { DiagnosticTeaserSection } from "@/content/types";
import { Button } from "../ui/Button";
import { Pattern } from "../ui/Pattern";
import { SectionHeader } from "../ui/SectionHeader";

export function DiagnosticTeaser({ data }: { data: DiagnosticTeaserSection }) {
  return (
    <section className="dk">
      <Pattern />
      <div className="c relative z-[1] flex justify-center py-[110px] text-center max-md:py-16">
        <div className="flex flex-col items-center justify-center">
          <SectionHeader className="max-w-[980px]" eyebrow={data.eyebrow} title={data.title} titleAccent={data.titleAccent} align="center" onDark />
          <Button {...data.cta} className="mt-8" />
        </div>
      </div>
    </section>
  );
}
