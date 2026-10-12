import type { AboutContent } from "@/content/types";
import { Button } from "../ui/Button";
import { Pattern } from "../ui/Pattern";

export function AboutCta({ page }: { page: AboutContent }) {
  return (
    <section className="cta" style={{ marginTop: 0 }}>
      <Pattern />
      <div className="c">
        <h2>{page.ctaTitle}</h2>
        <p>{page.ctaLead}</p>
        <div className="hrow">
          <Button {...page.ctaPrimary} />
          <Button {...page.ctaSecondary} />
        </div>
      </div>
    </section>
  );
}
