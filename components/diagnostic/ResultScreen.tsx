"use client";

import type { ResultBand, Video } from "@/content/types";
import { openCall } from "@/lib/open-call";
import { ChatIcon } from "../ui/icons";

const EXPERTISE_FROM = 8;

const paragraphs = [
  "Au-delà de 7 réactions, un simple comptage ne suffit plus : certaines magies restent cachées, d'autres ne se révèlent qu'au fil d'un travail précis. Chercher à les débloquer par des écoutes journalières serait long, imprécis et laborieux.",
  "C'est le travail d'une expertise menée avec Julien : magie par magie, il identifie puis dénoue chaque blocage — en moyenne en dix minutes une fois la magie découverte. C'est le fruit de dix années passées à défaire les œuvres les plus tenaces des grands sorciers, des djinns et des démons, une expérience qui lui a donné une profondeur de connaissance rare. Peu de praticiens peuvent en dire autant.",
  "Pour Julien, il y a deux difficultés pour guérir : la plus dure est de trouver les magies et leurs causes ; ensuite, il faut les casser. Rien que pour les détecter, peu de raqis ont une détection très poussée. Ils vous parlent souvent de ce qu'ils connaissent : mauvais œil, magie avalée, magie familiale, blocage du mariage.",
  "Mais lorsqu'on leur demande comment ils traiteraient la situation, certains répondent : « C'est Allah qui guérit, on va faire les causes. » Ils proposent des herbes et vous disent de venir, puis s'en remettent à Dieu pour le reste. Selon Julien, cela peut aussi traduire le fait qu'ils ne savent pas comment intervenir.",
  "Il prend l'image d'un mécanicien qui ne sait ni diagnostiquer les pannes, ni les trouver, ni les réparer, et qui dirait à ses clients : « C'est Allah qui va réparer la voiture. » Si ça n'arrive pas, c'est lui qui décide — pour Julien, la foi ne remplace pas le savoir nécessaire pour identifier le problème et agir.",
  "Julien part du principe qu'Allah a dit que le Coran est une guérison : c'est la parole d'Allah, donc sa démarche. Il faut donc connaître le Coran et approfondir ce savoir. Il considère que les sheytanes et les sorciers étudient eux aussi les versets et les roqyas, et que cela expliquerait pourquoi certaines magies y résistent.",
  "C'est pour cette raison que Julien ne souhaite pas dévoiler son savoir sur YouTube : cela donnerait accès à ses méthodes et au niveau de connaissance qu'il estime avoir atteint.",
];

export function ResultScreen({
  name,
  band,
  score,
  reactions,
  videos,
}: {
  name: string;
  band: ResultBand;
  score: number;
  reactions: number[];
  videos: Video[];
}) {
  const expertise = score >= EXPERTISE_FROM;
  const listed = reactions.map((order) => `#${order}`).join(" • ");
  return (
    <div
      className="rounded-xl border-2 p-6"
      style={{
        borderColor: expertise ? "var(--d-destructive)" : "var(--d-success)",
        background: expertise ? "color-mix(in oklab, var(--d-destructive) 10%, transparent)" : "color-mix(in oklab, var(--d-success) 10%, transparent)",
      }}
    >
      <h2 className="font-serif text-3xl font-semibold">{expertise ? "Votre cas nécessite une expertise sérieuse" : band.title || "Diagnostic terminé"}</h2>
      <p className="mt-3">
        Bonjour <strong>{name}</strong>, votre synthèse fait apparaître <strong>{score}</strong> réaction(s) sur 20 détections.
      </p>
      {expertise ? (
        paragraphs.slice(0, 2).map((paragraph) => (
          <p key={paragraph} className="mt-2 text-[var(--d-muted-fg)]">
            {paragraph}
          </p>
        ))
      ) : (
        <p className="mt-3">{band.text}</p>
      )}
      <section className="mt-6 space-y-3 border-t border-[var(--d-border)] pt-5">
        <h3 className="font-serif text-2xl font-semibold">Les deux difficultés, selon Julien</h3>
        {paragraphs.slice(2).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      {videos.length > 0 && !expertise ? (
        <ul className="mt-4 space-y-2">
          {videos.map((video) => (
            <li key={video.title}>
              <a className="font-semibold text-[var(--d-primary)]" href={video.youtubeUrl} target="_blank" rel="noreferrer">
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-4 text-sm text-[var(--d-muted-fg)]">Réactions : {listed || "aucune"}</p>
      <p className="mt-5 text-sm text-[var(--d-muted-fg)]">Pour tout conseil de déblocage, contactez Julien ici :</p>
      <button className="mt-2 inline-flex h-12 cursor-pointer items-center gap-2 rounded-md bg-[var(--d-primary)] px-5 font-semibold text-[var(--d-primary-fg)] shadow" type="button" onClick={openCall}>
        <ChatIcon color="currentColor" />
        Échanger avec Julien
      </button>
    </div>
  );
}
