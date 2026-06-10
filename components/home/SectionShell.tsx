import { AnimatedSection } from "@/components/MotionWrappers";

interface ChapterProps {
  /** Chapter number, e.g. "01" */
  n: string;
  /** Chapter title (Didone) */
  title: string;
  /** Optional italic dek / standfirst */
  dek?: string;
  /** Optional right-aligned meta, e.g. "13 entries" */
  count?: string;
  /** Anchor id for the Contents index */
  id?: string;
  children: React.ReactNode;
}

/**
 * Field-guide chapter frame: a thick rule, a mono chapter number + meta,
 * a Didone title and an italic dek. One consistent masthead for every
 * section — the layout *inside* varies by content type.
 */
export default function SectionShell({ n, title, dek, count, id, children }: ChapterProps) {
  return (
    <section id={id} className="fg-chapter scroll-mt-24">
      <AnimatedSection>
        <div className="fg-chapter__bar">
          <span className="fg-chapter__n">{n}</span>
          {count && <span className="fg-chapter__count">{count}</span>}
        </div>
        <h2 className="fg-chapter__title">{title}</h2>
        {dek && <p className="fg-chapter__dek">{dek}</p>}
      </AnimatedSection>
      <div className="mt-8">{children}</div>
    </section>
  );
}
