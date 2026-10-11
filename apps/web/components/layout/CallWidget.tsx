"use client";

import { useEffect } from "react";
import { PhoneIcon } from "../ui/icons";

const TENANT = process.env.NEXT_PUBLIC_WEBCALLHUB_ID || "86035c81-4ea2-4ac6-9a65-5a6f29d0c366";

export function CallWidget({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled || document.querySelector('script[data-wch="1"]')) return;
    const script = document.createElement("script");
    script.src = "https://webcallhub.com/embed/widget.js";
    script.dataset.tenant = TENANT;
    script.dataset.color = "#0F3D33";
    script.dataset.branding = "hide";
    script.dataset.wch = "1";
    document.body.appendChild(script);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    function dress(container: HTMLElement) {
      if (container.querySelector(".call-head")) return;
      const head = document.createElement("div");
      head.className = "call-head";
      head.innerHTML = "<strong>Appeler <em>Powerfull Rokia</em></strong>";
      const close = document.createElement("button");
      close.type = "button";
      close.setAttribute("aria-label", "Fermer");
      close.textContent = "×";
      close.addEventListener("click", () => document.getElementById("wch-launcher")?.click());
      head.append(close);
      container.prepend(head);
    }
    const seen = document.getElementById("wch-container");
    if (seen) dress(seen);
    const observer = new MutationObserver(() => {
      const container = document.getElementById("wch-container");
      if (container) dress(container);
    });
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    function onPointerDown(event: PointerEvent) {
      const launcher = document.getElementById("wch-launcher");
      if (launcher?.getAttribute("aria-expanded") !== "true") return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      const panel = document.getElementById("wch-container");
      const button = document.querySelector(".call");
      if (panel?.contains(target) || button?.contains(target) || launcher.contains(target)) return;
      launcher.click();
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="call" id="appel">
      <button
        className="call-btn"
        type="button"
        aria-label="Appeler"
        onClick={() => {
          const open = () => document.getElementById("wch-launcher")?.click();
          if (document.getElementById("wch-launcher")) {
            open();
            return;
          }
          const started = Date.now();
          const timer = window.setInterval(() => {
            if (document.getElementById("wch-launcher") || Date.now() - started > 5000) {
              window.clearInterval(timer);
              open();
            }
          }, 100);
        }}
      >
        <PhoneIcon />
      </button>
    </div>
  );
}
