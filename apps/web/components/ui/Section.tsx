import { cn } from "@/lib/utils";

export function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section className={cn("sec", className)} id={id}>
      <div className="c">{children}</div>
    </section>
  );
}
