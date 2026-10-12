import Link from "next/link";
import type { ButtonVariant } from "@/content/types";
import { cn } from "@/lib/utils";

const variants: Record<ButtonVariant, string> = {
  primary: "bp hover:bg-emerald-2 hover:shadow-[0_14px_28px_-16px_rgba(15,61,51,0.7)]",
  gold: "bg hover:bg-[#c6a15c]",
  outline: "bo hover:border-emerald hover:bg-white hover:text-emerald",
  white: "bw hover:shadow-[0_14px_28px_-16px_rgba(15,61,51,0.45)]",
  "outline-light": "bl hover:border-white hover:bg-white/10",
};

type Props = {
  label: string;
  url?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({ label, url, variant = "primary", className, type = "button", disabled, onClick }: Props) {
  const classNames = cn("btn transition duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0", variants[variant], className);
  if (url && !disabled) {
    const external = url.startsWith("http") || url.startsWith("mailto:");
    if (external) {
      return (
        <a className={classNames} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noreferrer" : undefined}>
          {label}
        </a>
      );
    }
    return (
      <Link className={classNames} href={url}>
        {label}
      </Link>
    );
  }
  return (
    <button className={classNames} type={type} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
