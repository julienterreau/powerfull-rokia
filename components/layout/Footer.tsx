import type { GlobalContent } from "@/content/types";
import { Logo } from "../ui/Logo";

export function Footer({ global }: { global: GlobalContent }) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="c">
        <div className="fg">
          <div>
            <Logo name={global.siteName} large />
            <p>{global.baseline}</p>
          </div>
          <div>
            <h2>Découvrir</h2>
            {global.discover.map((item) => (
              <a key={item.url} href={item.url}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <h2>À propos</h2>
            {global.aboutLinks.map((item) => (
              <a key={item.url} href={item.url}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <h2>Nous suivre</h2>
            <a href={global.youtubeUrl} target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href={`mailto:${global.email}`}>{global.email}</a>
          </div>
        </div>
        <div className="fb">
          <span>
            © {year} {global.siteName}
            {global.legal.map((item) => (
              <a key={item.url} href={item.url}>
                {" · "}
                {item.label}
              </a>
            ))}
          </span>
          <p className="made">
            Made by{" "}
            <a href="https://brandionary.com" target="_blank" rel="noreferrer">
              Brandionary
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
