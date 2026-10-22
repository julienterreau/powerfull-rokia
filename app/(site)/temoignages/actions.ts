"use server";

import { z } from "zod";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { sanityClient, sanityConfigured } from "@/lib/sanity/client";
import { publicGuestbookSchema, reactionSchema } from "@/lib/guestbook-shared";
import { rateLimit } from "@/lib/rate-limit";

const COOKIE = "pr-visitor";

async function visitorId() {
  const jar = await cookies();
  const current = jar.get(COOKIE)?.value;
  if (current && /^[0-9a-f-]{36}$/i.test(current)) return current;
  const id = crypto.randomUUID();
  jar.set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 400,
  });
  return id;
}


export async function publishGuestbook(input: unknown): Promise<{ ok: true } | { error: string }> {
  const trap = z.object({ company: z.string().optional() }).safeParse(input);
  if (trap.success && trap.data.company) return { ok: true };

  const requestHeaders = await headers();
  const parsed = publicGuestbookSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Message incomplet." };
  if (!sanityConfigured()) return { error: "La publication a échoué." };

  const visitor = await visitorId();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`guestbook:${visitor}:${ip}`, 8, 60_000)) return { error: "Trop de messages. Réessayez dans une minute." };

  const parentId = parsed.data.parentId;
  try {
    if (parentId) {
      const parent = await sanityClient().fetch<string | null>(`*[_id == $id && _type == "guestbookEntry"][0]._id`, { id: parentId });
      if (!parent) return { error: "Avis introuvable." };
    }
    await sanityClient().create({
      _type: "guestbookEntry",
      authorName: parsed.data.authorName,
      message: parsed.data.message,
      fromClient: false,
      ...(parentId ? { parent: { _type: "reference", _ref: parentId } } : {}),
    });
  } catch {
    return { error: "La publication a échoué." };
  }
  revalidatePath("/temoignages");
  return { ok: true };
}

export async function toggleReaction(input: unknown): Promise<{ ok: true } | { error: string }> {
  const parsed = reactionSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Réaction invalide." };

  const visitor = await visitorId();
  if (!rateLimit(`reaction:${visitor}`, 30, 60_000)) return { error: "Trop de réactions. Réessayez dans une minute." };

  if (!sanityConfigured()) return { error: "Réaction invalide." };
  const entry = await sanityClient().fetch<string | null>(`*[_id == $id && _type == "guestbookEntry"][0]._id`, { id: parsed.data.entryId });
  if (!entry) return { error: "Avis introuvable." };
  const existing = await sanityClient().fetch<string | null>(
    `*[_type == "guestbookReaction" && entry._ref == $entry && emoji == $emoji && visitorId == $visitor][0]._id`,
    { entry, emoji: parsed.data.emoji, visitor },
  );
  if (existing) await sanityClient().delete(existing);
  else {
    await sanityClient().create({
      _type: "guestbookReaction",
      entry: { _type: "reference", _ref: entry },
      emoji: parsed.data.emoji,
      visitorId: visitor,
    });
  }
  revalidatePath("/temoignages");
  return { ok: true };
}
