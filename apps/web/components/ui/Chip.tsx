import { cn } from "@/lib/utils";

export function Chip({ children, active = false, onClick }: { children: string; active?: boolean; onClick?: () => void }) {
  return (
    <button type="button" className={cn(active && "on")} onClick={onClick} aria-pressed={active}>
      {children}
    </button>
  );
}
