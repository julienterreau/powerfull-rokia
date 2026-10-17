import { z } from "zod";

export const FAVORITE_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "😡"] as const;

export function isSingleEmoji(value: string) {
  const parts = [...new Intl.Segmenter("fr", { granularity: "grapheme" }).segment(value)];
  return parts.length === 1 && /\p{Extended_Pictographic}/u.test(parts[0].segment);
}

const noTags = (value: string) => !/[<>]/.test(value);
const tagsMessage = "Les balises ne sont pas acceptées.";

const messageField = z
  .string()
  .trim()
  .min(2, "Écrivez quelques mots.")
  .max(2000, "2000 caractères maximum.")
  .refine(noTags, tagsMessage);

const parentField = z.string().trim().regex(/^\d*$/, "Réponse invalide.");

export const guestbookSchema = z.object({
  authorName: z.string().trim().max(80).refine((value) => value === "" || (value.length >= 2 && noTags(value)), "Indiquez votre prénom."),
  message: messageField,
  parentId: parentField,
  company: z.string().max(0).optional().or(z.literal("")),
});

export const publicGuestbookSchema = guestbookSchema.extend({
  authorName: z.string().trim().min(2, "Indiquez votre prénom.").max(80, "80 caractères maximum.").refine(noTags, tagsMessage),
});

export const reactionSchema = z.object({
  entryId: z.string().trim().regex(/^\d+$/, "Avis introuvable."),
  emoji: z.string().trim().min(1).max(32).refine(isSingleEmoji, "Émoji invalide."),
});

export type GuestbookInput = z.infer<typeof guestbookSchema>;

export type ReactionCount = { emoji: string; count: number; mine: boolean };

export type GuestbookNode = {
  id: string;
  authorName: string;
  message: string;
  fromClient: boolean;
  dateLabel: string;
  replies: GuestbookNode[];
  reactions: ReactionCount[];
};
