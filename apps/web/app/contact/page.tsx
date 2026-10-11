import type { Metadata } from "next";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { Faq } from "@/components/contact/Faq";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getContactPage, getFaq, getGlobal } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return { title: page.seo.metaTitle, description: page.seo.metaDescription };
}

export default async function ContactPage() {
  const [global, page, faq] = await Promise.all([getGlobal(), getContactPage(), getFaq()]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main id="contenu">
      <PageHero global={global} crumb={page.crumb} eyebrow={page.eyebrow} title={page.title} titleAccent={page.titleAccent} lead={page.lead} />
      <section style={{ padding: "0 0 110px" }}>
        <div className="c">
          <ContactCards cards={page.cards} />
          <div className="two" style={{ marginTop: 100, alignItems: "start" }}>
            <ContactForm page={page} />
            <div>
              <Eyebrow>{page.faqEyebrow}</Eyebrow>
              <h2 style={{ marginTop: 16 }}>
                {page.faqTitle} <em>{page.faqAccent}</em>
              </h2>
              <div style={{ marginTop: 20 }}>
                <Faq items={faq} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
