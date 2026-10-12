import type { DiagnosticTeaserSection } from "@/content/types";
import { Button } from "../ui/Button";
import { Pattern } from "../ui/Pattern";
import { PlayIcon } from "../ui/icons";
import { SectionHeader } from "../ui/SectionHeader";

const waves = [6, 12, 18, 10, 16, 8, 14, 20, 9, 13, 7, 15];

export function DiagnosticTeaser({ data }: { data: DiagnosticTeaserSection }) {
  return (
    <section className="dk">
      <Pattern />
      <div className="c qz">
        <div>
          <SectionHeader eyebrow={data.eyebrow} title={data.title} titleAccent={data.titleAccent} lead={data.lead} onDark />
          <ul className="chk">
            {data.checks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Button {...data.cta} />
        </div>
        <a className="qprev" href="/diagnostic">
          <div className="qcard2" aria-hidden>
            <div className="qtop">
              <span>{data.previewTitle}</span>
              <span>1 / 20</span>
            </div>
            <div className="bar2">
              <i />
            </div>
            <div className="fields">
              <div className="fake">Nom</div>
              <div className="fake">Adresse e-mail</div>
            </div>
            {["Détection 1", "Détection 2", "Détection 3", "Détection 4"].map((title, index) => (
              <div className={index === 0 ? "dr on" : "dr"} key={title}>
                <b className="pb">
                  <PlayIcon />
                </b>
                <span>{title}</span>
                {index === 0 ? (
                  <em className="wv">
                    {waves.map((height, waveIndex) => (
                      <i key={waveIndex} style={{ height }} />
                    ))}
                  </em>
                ) : null}
                <div className="yn">
                  <span className={index === 0 ? "sel" : undefined}>Oui</span>
                  <span>Non</span>
                </div>
              </div>
            ))}
            <div className="more">{data.moreLabel}</div>
          </div>
        </a>
      </div>
    </section>
  );
}
