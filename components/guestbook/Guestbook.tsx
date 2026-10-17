"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { EmojiClickData } from "emoji-picker-react";
import { toggleReaction } from "@/app/(site)/temoignages/actions";
import type { GuestbookNode } from "@/lib/guestbook-shared";
import { GuestbookForm } from "./GuestbookForm";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

function frenchEmojis() {
  return import("emoji-picker-react/data/emojis-fr");
}

function initial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "•";
}

function measurePicker(anchor: HTMLElement) {
  const rect = anchor.getBoundingClientRect();
  const width = Math.min(352, window.innerWidth - 16);
  const height = 400;
  let left = rect.left + window.scrollX;
  const minLeft = window.scrollX + 8;
  const maxLeft = window.scrollX + window.innerWidth - width - 8;
  left = Math.min(Math.max(left, minLeft), maxLeft);
  let top = rect.bottom + window.scrollY + 8;
  if (window.innerHeight - rect.bottom < height + 16 && rect.top > height) {
    top = rect.top + window.scrollY - height - 8;
  }
  return { top, left, width };
}

function Thread({ entries, isClient, depth = 0 }: { entries: GuestbookNode[]; isClient: boolean; depth?: number }) {
  const router = useRouter();
  const pickerRef = useRef<HTMLDivElement>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [picker, setPicker] = useState<string | null>(null);
  const [pickerPos, setPickerPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!picker) return;
    function close(event: MouseEvent) {
      if (!pickerRef.current?.contains(event.target as Node)) setPicker(null);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setPicker(null);
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [picker]);

  function react(entryId: string, emoji: string) {
    startTransition(async () => {
      await toggleReaction({ entryId, emoji });
      router.refresh();
    });
  }

  return (
    <div className={depth > 0 ? "mt-4 space-y-4 border-l border-line pl-4" : "space-y-5"}>
      {entries.map((entry) => (
        <div key={entry.id}>
        <article className={entry.fromClient ? "rounded-3xl bg-emerald px-4 py-4 text-white md:px-5" : "rounded-3xl bg-white px-4 py-4 text-ink md:px-5"}>
          <div className="flex items-center gap-3">
            <span className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold ${entry.fromClient ? "bg-gold text-emerald" : "bg-emerald text-white"}`}>
              {initial(entry.authorName)}
            </span>
            <div className="min-w-0 text-left">
              <p className="text-sm font-semibold">{entry.authorName}</p>
              <p className={`text-xs ${entry.fromClient ? "text-gold-light" : "text-text-3"}`}>{entry.dateLabel}</p>
            </div>
          </div>
          <p className={`mt-3 text-left text-[15px] leading-relaxed whitespace-pre-line ${entry.fromClient ? "text-white" : "text-ink"}`}>{entry.message}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {entry.reactions.map((reaction) => (
              <button
                key={reaction.emoji}
                className={`inline-flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-1 text-sm transition disabled:opacity-60 ${reaction.mine ? "border-gold bg-gold-light text-emerald" : entry.fromClient ? "border-white/25 bg-white/10 text-white" : "border-line bg-sand text-ink"}`}
                type="button"
                disabled={pending}
                onClick={() => react(entry.id, reaction.emoji)}
              >
                <span>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </button>
            ))}
            <button
              className={`grid size-8 cursor-pointer place-items-center rounded-full border text-base font-semibold ${picker === entry.id ? "border-gold bg-gold-light text-emerald" : entry.fromClient ? "border-white/25 text-white" : "border-line bg-sand text-emerald"}`}
              type="button"
              aria-label="Choisir un émoji"
              aria-expanded={picker === entry.id}
              onMouseDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                if (picker === entry.id) {
                  setPicker(null);
                  return;
                }
                setPickerPos(measurePicker(event.currentTarget));
                setPicker(entry.id);
              }}
            >
              +
            </button>
            {depth < 4 ? (
              <button
                className={`cursor-pointer rounded-full px-2.5 py-1 text-sm font-semibold ${entry.fromClient ? "text-gold-light" : "text-emerald"}`}
                type="button"
                onClick={() => setReplyTo(replyTo === entry.id ? null : entry.id)}
              >
                Répondre
              </button>
            ) : null}
          </div>
          {picker === entry.id && pickerPos
            ? createPortal(
                <div
                  ref={pickerRef}
                  className="absolute z-50 overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(28,22,16,0.22)]"
                  style={{ top: pickerPos.top, left: pickerPos.left, width: pickerPos.width }}
                >
                  <EmojiPicker
                    emojiData={frenchEmojis}
                    emojiStyle="native"
                    theme="light"
                    width="100%"
                    height={380}
                    autoFocusSearch={false}
                    lazyLoadEmojis
                    suggestedEmojisMode="recent"
                    previewConfig={{ showPreview: false }}
                    searchPlaceHolder="Rechercher"
                    labels={{
                      searchPlaceholder: "Rechercher",
                      searchLabel: "Rechercher un émoji",
                      searchClear: "Effacer",
                      searchResultsNone: "Aucun émoji",
                      searchResultsOne: "1 émoji",
                      searchResultsMany: "%n émojis",
                      categoryNavigation: "Catégories",
                      loading: "Chargement des émojis",
                      loadingError: "Impossible de charger les émojis",
                      retryLoading: "Réessayer",
                    }}
                    onEmojiClick={(emoji: EmojiClickData) => {
                      react(entry.id, emoji.emoji);
                      setPicker(null);
                    }}
                  />
                </div>,
                document.body,
              )
            : null}
          {replyTo === entry.id ? (
            <div className="mt-4 rounded-3xl bg-sand p-4 text-ink">
              <GuestbookForm parentId={entry.id} askName={!isClient} submitLabel={isClient ? "Publier la réponse" : "Publier"} onDone={() => setReplyTo(null)} />
            </div>
          ) : null}
        </article>
          {entry.replies.length > 0 ? <Thread entries={entry.replies} isClient={isClient} depth={depth + 1} /> : null}
        </div>
      ))}
    </div>
  );
}

export function Guestbook({ entries, isClient }: { entries: GuestbookNode[]; isClient: boolean }) {
  return (
    <div>
      <section className="rounded-[28px] bg-sand-2 p-5 md:p-7">
        <h2 className="font-serif text-3xl font-medium text-emerald">Écrire dans le livre d&apos;or</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-text-2">Votre message est publié tout de suite, sans validation.</p>
        <div className="mt-5">
          <GuestbookForm askName={!isClient} submitLabel={isClient ? "Publier au nom du site" : "Publier mon avis"} />
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-3xl font-medium text-emerald">{entries.length === 0 ? "Aucun avis pour le moment" : `${entries.length} avis`}</h2>
        {entries.length > 0 ? (
          <div className="mt-6">
            <Thread entries={entries} isClient={isClient} />
          </div>
        ) : (
          <p className="mt-3 text-text-2">Soyez le premier à laisser un mot.</p>
        )}
      </section>
    </div>
  );
}
