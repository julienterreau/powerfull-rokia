import Image from "next/image";

export function Hero() {
  return (
    <section className="hx flex h-[calc(100svh-16px)] min-h-0 flex-col pb-7 max-md:h-auto max-md:min-h-[calc(100svh-12px)] max-md:pb-10">
      <Image src="/hero.jpg" alt="" width={1920} height={1080} priority className="absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,46,39,0.62),rgba(11,46,39,0.28)_46%,rgba(11,46,39,0.80))]" />
    </section>
  );
}
