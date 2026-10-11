"use client";

import { useEffect } from "react";

export function VideoModal({ id, title, onClose }: { id: string; title: string; onClose: () => void }) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <button className="x" type="button" aria-label="Fermer" onClick={onClose}>
        ×
      </button>
      <div className="frame" onClick={(event) => event.stopPropagation()}>
        <iframe title={title} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      </div>
    </div>
  );
}
