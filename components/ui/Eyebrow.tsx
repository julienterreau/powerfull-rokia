import { cn } from "@/lib/utils";

export function Eyebrow({ children, centered = false, onDark = false }: { children: string; centered?: boolean; onDark?: boolean }) {
  return <span className={cn("eb", centered && "eb-center", onDark && "eb-light")}>{children}</span>;
}
