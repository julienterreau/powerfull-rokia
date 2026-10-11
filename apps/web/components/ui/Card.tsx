import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <article className={cn("lift", className)}>{children}</article>;
}
