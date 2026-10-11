import type { GlobalContent } from "@/content/types";
import { Eyebrow } from "../ui/Eyebrow";
import { Pattern } from "../ui/Pattern";
type Props = {
  global: GlobalContent;
  crumb: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  titleAfter?: string;
  lead?: string;
  children?: React.ReactNode;
};

export function PageHero({ crumb, eyebrow, title, titleAccent, titleAfter, lead, children }: Props) {
  return (
    <section className="sub">
      <Pattern />
      <div className="glow" />
      <div className="c">
        <div className="sin">
          <div className="crumb">
            Accueil / <b>{crumb}</b>
          </div>
          <div>
            <Eyebrow centered onDark>
              {eyebrow}
            </Eyebrow>
          </div>
          <h1>
            {title} {titleAccent ? <em>{titleAccent}</em> : null}
            {titleAfter}
          </h1>
          {lead ? <p>{lead}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
