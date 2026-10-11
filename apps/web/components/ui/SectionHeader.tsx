import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  titleAfter?: string;
  lead?: string;
  align?: "left" | "center";
  onDark?: boolean;
  stackAccent?: boolean;
  className?: string;
};

export function SectionHeader({ eyebrow, title, titleAccent, titleAfter, lead, align = "left", onDark = false, stackAccent = false, className }: Props) {
  return (
    <div className={cn(align === "center" ? "sh ct" : "sh", className)}>
      {eyebrow ? <Eyebrow centered={align === "center"} onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <h2 className={onDark ? "text-white" : undefined}>
        {title}{" "}
        {titleAccent ? <em className={cn(stackAccent && "block", onDark && "text-gold-light")}>{titleAccent}</em> : null}
        {titleAfter}
      </h2>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}
