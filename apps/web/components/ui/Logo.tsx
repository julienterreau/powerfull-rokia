import Link from "next/link";
import { MoonIcon } from "./icons";

export function Logo({ name, light = false }: { name: string; light?: boolean }) {
  return (
    <Link href="/" className="logo" style={{ color: light ? "#fff" : undefined }}>
      <i style={{ background: light ? "rgba(255,255,255,.12)" : undefined }} aria-hidden>
        <MoonIcon />
      </i>
      {name}
    </Link>
  );
}
