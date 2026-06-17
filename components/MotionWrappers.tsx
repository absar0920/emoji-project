"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Shared motion vocabulary — restrained editorial.
 * Gentle ease-out, short durations, no spring/bounce. Keep all framer transitions
 * referencing these so the whole site moves with one consistent feel.
 */
export const EASE = [0.22, 1, 0.36, 1] as const; // easeOut, no overshoot
export const DURATION = 0.3;
export const DURATION_FAST = 0.18;

export function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: DURATION, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: DURATION, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial hover wrapper — a hairline/translate lift, NO shadow (the Field Guide
 * has no shadows). Use on interactive surfaces that aren't already fg-* hover-styled.
 */
export function AnimatedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: DURATION_FAST, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
