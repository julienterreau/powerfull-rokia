import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Guestbook } from "@/components/guestbook/Guestbook";
import { PageHero } from "@/components/layout/PageHero";
import { getGlobal } from "@/lib/content";
import { loadGuestbook } from "@/lib/guestbook";

export const metadata: Metadata = {
  title: "Témoignages",
  description: "Le livre d'or de Powerfull Rokia. Écrivez un avis, il est publié immédiatement.",
};

export default async function TestimonialsPage() {
  const [global, visitor] = await Promise.all([
    getGlobal(),
    cookies().then((jar) => jar.get("pr-visitor")?.value ?? ""),
  ]);
  const entries = await loadGuestbook(visitor);

  return (
    <main id="contenu">
      <PageHero
        global={global}
        crumb="Témoignages"
        eyebrow="Livre d'or"
        title="Témoignages"
        lead="Partagez un ressenti. Les messages sont publics et apparaissent dès leur envoi."
      />
      <section style={{ padding: "0 0 110px" }}>
        <div className="mx-auto max-w-[820px] px-5">
          <Guestbook entries={entries} isClient={false} />
        </div>
      </section>
    </main>
  );
}
