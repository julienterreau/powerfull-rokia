import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Guestbook } from "@/components/guestbook/Guestbook";
import { payloadClient } from "@/lib/cms";
import { loadGuestbook } from "@/lib/guestbook";

export const metadata: Metadata = {
  title: "Témoignages",
  description: "Le livre d'or de Powerfull Rokia. Écrivez un avis, il est publié immédiatement.",
};

export default async function TestimonialsPage() {
  const payload = await payloadClient();
  const { user } = await payload.auth({ headers: await headers() });
  const visitor = (await cookies()).get("pr-visitor")?.value ?? "";
  const entries = await loadGuestbook(visitor);

  return (
    <main id="contenu" className="px-5 pt-28 pb-20 md:pt-36">
      <div className="mx-auto max-w-[820px]">
        <p className="text-center text-xs font-semibold tracking-[0.16em] text-gold uppercase">Livre d&apos;or</p>
        <h1 className="mt-3 text-center font-serif text-5xl font-medium text-emerald md:text-6xl">Témoignages</h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-relaxed text-text-2">
          Partagez un ressenti. Les messages sont publics et apparaissent dès leur envoi.
        </p>
        <div className="mt-10">
          <Guestbook entries={entries} isClient={Boolean(user)} />
        </div>
      </div>
    </main>
  );
}
