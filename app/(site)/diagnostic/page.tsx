import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { DiagnosticTool } from "@/components/diagnostic/DiagnosticTool";
import { getAudios, getDiagnosticPage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDiagnosticPage();
  return { title: page.seo.metaTitle, description: page.seo.metaDescription };
}

const theme = {
  "--d-bg": "oklch(18% 0.03 165)",
  "--d-fg": "oklch(95% 0.02 85)",
  "--d-card": "oklch(23% 0.035 165)",
  "--d-primary": "oklch(78% 0.17 55)",
  "--d-primary-fg": "oklch(18% 0.03 165)",
  "--d-muted": "oklch(27% 0.03 165)",
  "--d-muted-fg": "oklch(75% 0.03 120)",
  "--d-border": "oklch(78% 0.17 55 / 0.28)",
  "--d-input": "oklch(78% 0.17 55 / 0.4)",
  "--d-destructive": "oklch(62% 0.2 28)",
  "--d-success": "oklch(72% 0.14 155)",
} as CSSProperties;

export default async function DiagnosticPage() {
  const [page, audios] = await Promise.all([getDiagnosticPage(), getAudios()]);
  return (
    <main
      id="contenu"
      className="min-h-svh text-(--d-fg)"
      style={{
        ...theme,
        background: "radial-gradient(ellipse at top, oklch(78% 0.17 55 / 0.14), transparent 60%), var(--d-bg)",
        backgroundAttachment: "fixed",
      }}
    >
      <DiagnosticTool page={page} audios={audios} />
    </main>
  );
}
