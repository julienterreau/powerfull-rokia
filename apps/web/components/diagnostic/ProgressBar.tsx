"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const reduce = useReducedMotion();
  const width = `${Math.round((value / max) * 100)}%`;
  return (
    <div>
      <div className="prog">
        <span>{label}</span>
        <span aria-live="polite">
          {value} / {max}
        </span>
      </div>
      <div className="bar2" aria-hidden>
        {reduce ? <i style={{ width }} /> : <motion.i initial={false} animate={{ width }} transition={{ duration: 0.45, ease: "easeOut" }} />}
      </div>
    </div>
  );
}
