import type { VideosPageContent } from "@/content/types";
import { Button } from "../ui/Button";
import { Pattern } from "../ui/Pattern";

export function SubscribeBanner({ page }: { page: VideosPageContent }) {
  return (
    <div className="ytc">
      <Pattern />
      <div>
        <h3>{page.bannerTitle}</h3>
        <p>{page.bannerText}</p>
      </div>
      <Button {...page.bannerCta} />
    </div>
  );
}
