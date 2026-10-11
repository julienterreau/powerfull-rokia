import { getGlobal } from "@/lib/content";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const global = await getGlobal();
  return (
    <main id="contenu">
      <PageHero global={global} crumb="Introuvable" eyebrow="404" title="Cette page n'existe pas" lead="Le lien est peut-être ancien. Revenez à l'accueil ou faites le diagnostic." />
      <section style={{ padding: "0 0 110px" }}>
        <div className="c" style={{ display: "flex", gap: 12 }}>
          <Button label="Retour à l'accueil" url="/" variant="primary" />
          <Button label="Faire le diagnostic" url="/diagnostic" variant="gold" />
        </div>
      </section>
    </main>
  );
}
