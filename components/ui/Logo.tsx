import Link from "next/link";
import { MoonIcon } from "./icons";

export function Logo({ name, light = false, large = false }: { name: string; light?: boolean; large?: boolean }) {
  return (
    <Link href="/" className={large ? "logo logo-lg" : "logo"} style={{ color: light ? "#fff" : undefined }}>
      <i style={{ background: light ? "rgba(255,255,255,.12)" : undefined }} aria-hidden>
        <MoonIcon size={large ? 18 : 20} />
      </i>
      {name}
    </Link>
  );
}
