import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(80),
  email: z.string().trim().email("Indiquez un e-mail valide."),
  subject: z.string().trim().min(2, "Indiquez un sujet.").max(140),
  message: z.string().trim().min(10, "Votre message est trop court.").max(5000),
  consent: z.literal(true, { errorMap: () => ({ message: "Le consentement est nécessaire." }) }),
  company: z.string().max(0).optional().or(z.literal("")),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Indiquez un e-mail valide."),
  company: z.string().max(0).optional().or(z.literal("")),
});

export const diagnosticIdentity = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères.").max(60),
  email: z.string().trim().email("Indiquez un e-mail valide."),
});

export const diagnosticSchema = diagnosticIdentity.extend({
  answers: z.record(z.string(), z.enum(["oui", "non"])).refine((value) => Object.keys(value).length === 20, "Les 20 réponses sont nécessaires."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type DiagnosticInput = z.infer<typeof diagnosticSchema>;
