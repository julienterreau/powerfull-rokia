import { FAVORITE_EMOJIS, type GuestbookNode } from "@/lib/guestbook-shared";
import { sanityClient, sanityConfigured } from "@/lib/sanity/client";
import { guestbookQuery, reactionsQuery } from "@/lib/sanity/queries";

export type { GuestbookNode };

function favoriteRank(emoji: string) {
  const index = FAVORITE_EMOJIS.indexOf(emoji as (typeof FAVORITE_EMOJIS)[number]);
  return index === -1 ? FAVORITE_EMOJIS.length : index;
}

function relationId(value: unknown) {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (value && typeof value === "object" && "id" in value) return String((value as { id: unknown }).id);
  return null;
}

export async function loadGuestbook(visitorId: string): Promise<GuestbookNode[]> {
  if (!sanityConfigured()) return [];
  const [entryDocs, reactionDocs] = await Promise.all([
    sanityClient().fetch<Array<Record<string, unknown>>>(guestbookQuery),
    sanityClient().fetch<Array<Record<string, unknown>>>(reactionsQuery),
  ]);
  const entries = { docs: entryDocs };
  const reactions = { docs: reactionDocs };

  const counts = new Map<string, Map<string, { count: number; mine: boolean }>>();
  for (const reaction of reactions.docs) {
    const entryId = relationId(reaction.entry);
    const emoji = String(reaction.emoji || "");
    if (!entryId || !emoji) continue;
    const byEmoji = counts.get(entryId) ?? new Map();
    const current = byEmoji.get(emoji) ?? { count: 0, mine: false };
    current.count += 1;
    if (reaction.visitorId === visitorId) current.mine = true;
    byEmoji.set(emoji, current);
    counts.set(entryId, byEmoji);
  }

  const date = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const nodes = new Map<string, GuestbookNode & { parentId: string | null }>();
  for (const doc of entries.docs) {
    const id = String(doc.id);
    const byEmoji = counts.get(id);
    nodes.set(id, {
      id,
      authorName: String(doc.authorName),
      message: String(doc.message),
      fromClient: Boolean(doc.fromClient),
      dateLabel: date.format(new Date(String(doc.createdAt))),
      parentId: relationId(doc.parent),
      replies: [],
      reactions: [...(byEmoji?.entries() ?? [])]
        .map(([emoji, info]) => ({ emoji, count: info.count, mine: info.mine }))
        .sort((a, b) => favoriteRank(a.emoji) - favoriteRank(b.emoji) || b.count - a.count),
    });
  }

  const roots: GuestbookNode[] = [];
  for (const node of nodes.values()) {
    const parent = node.parentId ? nodes.get(node.parentId) : undefined;
    if (parent) parent.replies.push(node);
    else roots.push(node);
  }
  return roots.reverse();
}
