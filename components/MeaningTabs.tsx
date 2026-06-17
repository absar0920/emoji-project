"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/MotionWrappers";

interface MeaningLayer {
  key: string;
  label: string;
  content: Record<string, string | number | boolean>;
}

interface MeaningTabsProps {
  meanings: MeaningLayer[];
}

export default function MeaningTabs({ meanings }: MeaningTabsProps) {
  const [active, setActive] = useState(meanings[0]?.key || "genz");
  const activeMeaning = meanings.find((m) => m.key === active);

  return (
    <div>
      <div className="fg-tabs mb-7 overflow-x-auto scrollbar-hide">
        {meanings.map((m) => (
          <button key={m.key} onClick={() => setActive(m.key)} data-active={active === m.key} className="fg-tab">
            {m.label}
          </button>
        ))}
      </div>

      {activeMeaning && (
        <motion.dl
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="fg-deflist border-t border-[var(--line)]"
        >
          {Object.entries(activeMeaning.content).map(([key, value]) => {
            if (typeof value === "boolean") {
              return (
                <div key={key}>
                  <dt>{key.replace(/_/g, " ")}</dt>
                  <dd className="mono" style={{ color: value ? "var(--accent)" : "var(--good)" }}>{value ? "Yes" : "No"}</dd>
                </div>
              );
            }
            if (typeof value === "number") {
              return (
                <div key={key}>
                  <dt>{key.replace(/_/g, " ")}</dt>
                  <dd className="mono"><b className="t-accent text-base">{value}</b> <span className="t-muted">/ 10</span></dd>
                </div>
              );
            }
            return (
              <div key={key}>
                <dt>{key.replace(/_/g, " ")}</dt>
                <dd>{String(value)}</dd>
              </div>
            );
          })}
        </motion.dl>
      )}
    </div>
  );
}
