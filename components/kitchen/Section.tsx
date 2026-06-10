import { AnimatedSection } from "@/components/MotionWrappers";

export function KSection({
  kicker,
  title,
  dek,
  children,
}: {
  kicker: string;
  title: string;
  dek?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatedSection>
      <section className="fg-chapter">
        <div className="fg-chapter__bar">
          <span className="fg-chapter__n">{kicker}</span>
        </div>
        <h2 className="fg-chapter__title mt-5 text-[1.6rem] sm:text-[2rem]">{title}</h2>
        {dek && <p className="fg-chapter__dek">{dek}</p>}
        <div className="mt-7">{children}</div>
      </section>
    </AnimatedSection>
  );
}
