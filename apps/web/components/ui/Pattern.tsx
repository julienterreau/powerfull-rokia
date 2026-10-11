import { cn } from "@/lib/utils";

export function Pattern({ className }: { className?: string }) {
  return <div className={cn("pat", className)} aria-hidden />;
}
