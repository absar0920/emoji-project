"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Shared motion vocabulary — restrained editorial.
 * All entrance/hover motion is now CSS-driven (see globals.css): gentle ease-out,
 * short durations, no spring/bounce. framer-motion was removed because it shipped
 * ~50KB of JS onto every page's critical bundle to express fades a keyframe does
 * for free — which wrecked mobile FCP/LCP under slow networks.
 *
 * These constants are kept so any future JS-driven motion stays on the same curve.
 */
export const EASE = [0.22, 1, 0.36, 1] as const; // easeOut, no overshoot
export const DURATION = 0.3;
export const DURATION_FAST = 0.18;

/**
 * On-load entrance — CSS-driven (see .fg-fade-in in globals.css).
 * `immediate` skips even the CSS fade (paints at full opacity on the first
 * frame) — use it on the LCP element so LCP ≈ first paint.
 */
export function FadeIn({
  children,
  className = "",
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  immediate?: boolean;
}) {
  const cls = immediate ? className : `fg-fade-in ${className}`.trim();
  return <div className={cls}>{children}</div>;
}

/**
 * Scroll-reveal — fades/slides content in the first time it enters the viewport.
 * Was framer `whileInView`; now a ~1KB IntersectionObserver toggling a data
 * attribute that CSS transitions (see [data-reveal] in globals.css). Reveals
 * once, slightly early (-50px), and shows immediately under reduced-motion or
 * when IntersectionObserver is unavailable so content can never get stuck hidden.
 */
export function AnimatedSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-50px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={shown ? "in" : "out"} className={className}>
      {children}
    </div>
  );
}

/**
 * Staggered list entrance — was framer staggerChildren; now the container marks
 * itself `.fg-stagger` and CSS nth-child delays cascade the fade over its direct
 * children (see globals.css). StaggerItem is just the child wrapper.
 */
export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`fg-stagger ${className}`.trim()}>{children}</div>;
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

/**
 * Editorial hover wrapper — a hairline/translate lift, NO shadow (the Field Guide
 * has no shadows). Was framer whileHover/whileTap; now a CSS class (see globals.css).
 */
export function AnimatedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`fg-card-lift ${className}`.trim()}>{children}</div>;
}
