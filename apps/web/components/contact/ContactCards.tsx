"use client";

import type { ContactCard } from "@/content/types";
import { MailIcon, PhoneLineIcon, VideoIcon } from "../ui/icons";

const icons = { mail: <MailIcon />, phone: <PhoneLineIcon />, video: <VideoIcon /> };

export function ContactCards({ cards }: { cards: ContactCard[] }) {
  return (
    <div className="ct3">
      {cards.map((card) => (
        <article className="cc lift" key={card.title}>
          <div className="ic">{icons[card.icon]}</div>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
          {card.action === "widget" ? (
            <a
              href="#appel"
              onClick={(event) => {
                event.preventDefault();
                document.querySelector<HTMLButtonElement>(".call .ph")?.click();
              }}
            >
              {card.label}
            </a>
          ) : (
            <a href={card.url} target={card.url.startsWith("http") ? "_blank" : undefined} rel={card.url.startsWith("http") ? "noreferrer" : undefined}>
              {card.label}
            </a>
          )}
        </article>
      ))}
    </div>
  );
}
