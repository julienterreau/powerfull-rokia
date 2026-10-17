"use server";

import { z } from "zod";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { payloadClient } from "@/lib/cms";
import { guestbookSchema, publicGuestbookSchema, reactionSchema } from "@/lib/guestbook-shared";
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

  const payload = await payloadClient();
  const requestHeaders = await headers();
  const { user } = await payload.auth({ headers: requestHeaders });
  const parsed = (user ? guestbookSchema : publicGuestbookSchema).safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Message incomplet." };

  const visitor = await visitorId();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`guestbook:${visitor}:${ip}`, 8, 60_000)) return { error: "Trop de messages. Réessayez dans une minute." };

  const parentId = parsed.data.parentId;
  try {
    if (parentId) {
      await payload.findByID({ collection: "guestbook", id: Number(parentId), depth: 0, overrideAccess: true });
    }
    await payload.create({
      collection: "guestbook",
      overrideAccess: Boolean(user),
      data: {
        authorName: user ? "Powerfull Rokia" : parsed.data.authorName,
        message: parsed.data.message,
        ...(parentId ? { parent: Number(parentId) } : {}),
        ...(user ? { fromClient: true } : {}),
      },
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

  const payload = await payloadClient();
  const entry = Number(parsed.data.entryId);
  try {
    await payload.findByID({ collection: "guestbook", id: entry, depth: 0, overrideAccess: true });
  } catch {
    return { error: "Avis introuvable." };
  }
  const existing = await payload.find({
    collection: "guestbook-reactions",
    limit: 1,
    depth: 0,
    overrideAccess: true,
    where: { and: [{ entry: { equals: entry } }, { emoji: { equals: parsed.data.emoji } }, { visitorId: { equals: visitor } }] },
  });
  if (existing.docs[0]) {
    await payload.delete({ collection: "guestbook-reactions", id: existing.docs[0].id, overrideAccess: true });
  } else {
    await payload.create({
      collection: "guestbook-reactions",
      overrideAccess: true,
      data: { entry, emoji: parsed.data.emoji, visitorId: visitor },
    });
  }
  revalidatePath("/temoignages");
  return { ok: true };
}
