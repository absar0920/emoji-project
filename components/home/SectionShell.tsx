import { AnimatedSection } from "@/components/MotionWrappers";

interface SectionShellProps {
  /** Visual band: "plain" = page bg, "tint" = subtle raised panel */
  tone?: "plain" | "tint";
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Center the header block */
  centered?: boolean;
  children: React.ReactNode;
  id?: string;
}

/**
 * Consistent wrapper for every editorial section on the homepage.
 * Standardizes vertical rhythm, alternating background tone, and the
 * eyebrow + title + subtitle header treatment.
 */
export default function SectionShell({
  tone = "plain",
  eyebrow,
  title,
  subtitle,
  centered = false,
  children,
  id,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={
        tone === "tint"
          ? "my-8 py-12 sm:py-14 px-6 sm:px-8 rounded-2xl bg-neutral-50 dark:bg-slate-800/40 border border-neutral-200/70 dark:border-slate-700/50"
          : "py-14 sm:py-16 rule-top"
      }
    >
      {(eyebrow || title || subtitle) && (
        <AnimatedSection className={centered ? "text-center max-w-2xl mx-auto mb-10" : "mb-10"}>
          {eyebrow && (
            <p className={`eyebrow mb-3 flex items-center gap-2 ${centered ? "justify-center" : ""}`}>
              <span className="inline-block w-6 h-px bg-primary" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-3xl sm:text-4xl text-primary-dark dark:text-white leading-[1.1]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-neutral-500 dark:text-slate-400 mt-3 leading-relaxed max-w-2xl">{subtitle}</p>
          )}
        </AnimatedSection>
      )}
      {children}
    </section>
  );
}
