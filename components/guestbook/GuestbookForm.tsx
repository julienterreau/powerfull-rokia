"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { publishGuestbook } from "@/app/(site)/temoignages/actions";
import { guestbookSchema, publicGuestbookSchema, type GuestbookInput } from "@/lib/guestbook-shared";

export function GuestbookForm({
  parentId,
  askName,
  submitLabel,
  onDone,
}: {
  parentId?: string;
  askName: boolean;
  submitLabel: string;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [done, setDone] = useState("");
  const form = useForm<GuestbookInput>({
    resolver: zodResolver(askName ? publicGuestbookSchema : guestbookSchema),
    defaultValues: { authorName: "", message: "", parentId: parentId ?? "", company: "" },
  });

  async function onSubmit(values: GuestbookInput) {
    setDone("");
    const result = await publishGuestbook(values);
    if ("error" in result) {
      form.setError("message", { message: result.error });
      return;
    }
    form.reset({ authorName: "", message: "", parentId: parentId ?? "", company: "" });
    setDone("Votre message est publié.");
    router.refresh();
    onDone?.();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <input className="absolute -left-[9999px] h-0 w-0 opacity-0" tabIndex={-1} autoComplete="off" aria-hidden {...form.register("company")} />
      <input type="hidden" {...form.register("parentId")} />
      {askName ? (
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-emerald">Prénom</span>
          <input
            className="h-12 w-full rounded-full border border-line bg-white px-4 text-[15px] text-ink outline-none focus:border-emerald"
            placeholder="Votre prénom"
            {...form.register("authorName")}
          />
          {form.formState.errors.authorName ? <span className="mt-1 block text-sm text-gold">{form.formState.errors.authorName.message}</span> : null}
        </label>
      ) : null}
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-emerald">Message</span>
        <textarea
          rows={askName ? 5 : 3}
          className="w-full resize-y rounded-3xl border border-line bg-white px-4 py-3 text-[15px] leading-relaxed text-ink outline-none focus:border-emerald"
          placeholder={askName ? "Votre témoignage" : "Votre réponse"}
          {...form.register("message")}
        />
        {form.formState.errors.message ? <span className="mt-1 block text-sm text-gold">{form.formState.errors.message.message}</span> : null}
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          className="cursor-pointer rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-2 disabled:opacity-60"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Publication…" : submitLabel}
        </button>
        {done ? <p className="text-sm text-emerald">{done}</p> : null}
      </div>
    </form>
  );
}
