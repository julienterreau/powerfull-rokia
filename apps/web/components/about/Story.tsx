import type { AboutContent } from "@/content/types";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

export function Story({ page }: { page: AboutContent }) {
  return (
    <div className="prose story">
      <Eyebrow>{page.storyEyebrow}</Eyebrow>
      <h2 style={{ marginTop: 16 }}>
        {page.storyTitle} <em>{page.storyAccent}</em>
      </h2>
      {page.story.map((paragraph) => (
        <p key={paragraph}>
          {paragraph.includes("Julien Terrau") ? (
            <>
              {paragraph.split("Julien Terrau")[0]}
              <b>Julien Terrau</b>
              {paragraph.split("Julien Terrau")[1]}
            </>
          ) : (
            paragraph
          )}
        </p>
      ))}
      <div style={{ marginTop: 28 }}>
        <Button {...page.storyCta} />
      </div>
    </div>
  );
}
