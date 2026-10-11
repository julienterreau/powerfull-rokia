import type { Metadata } from "next";
import { DiagnosticTool } from "@/components/diagnostic/DiagnosticTool";
import { Tips } from "@/components/diagnostic/Tips";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAudios, getDiagnosticPage, getGlobal } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDiagnosticPage();
  return { title: page.seo.metaTitle, description: page.seo.metaDescription };
}

export default async function DiagnosticPage() {
  const [global, page, audios] = await Promise.all([getGlobal(), getDiagnosticPage(), getAudios()]);
  return (
    <main id="contenu">
      <PageHero global={global} crumb={page.crumb} eyebrow={page.eyebrow} title={page.title} titleAccent={page.titleAccent} lead={page.lead}>
        <div className="gar">
          {page.guarantees.map((item) => (
            <span key={item}>✓ {item}</span>
          ))}
        </div>
      </PageHero>
      <section style={{ padding: "0 0 40px" }}>
        <div className="c">
          <SectionHeader eyebrow={page.tipsEyebrow} title={page.tipsTitle} titleAccent={page.tipsAccent} align="center" />
          <Tips items={page.tips} />
        </div>
      </section>
      <section style={{ padding: "0 0 120px" }}>
        <div className="c">
          <div style={{ marginTop: 56 }}>
            <SectionHeader eyebrow={page.toolEyebrow} title={page.toolTitle} titleAccent={page.toolAccent} align="center" />
          </div>
          <DiagnosticTool page={page} audios={audios} />
        </div>
      </section>
    </main>
  );
}
