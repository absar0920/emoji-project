import { AnimatedSection } from "@/components/MotionWrappers";

const PARAS = [
  "On June 20, 1986, a Japanese user named Yasushi Wakabayashi typed (^_^) into an ASCII NET bulletin board and changed digital communication forever. He had no idea that forty years later, millions of people around the world would still be using the same characters to express joy, heartbreak, confusion, and everything in between.",
  "You have almost certainly seen kaomoji before. They float through Discord servers, Instagram bios, Reddit threads, and Twitter feeds. Most people just call them “those cute text faces” and copy-paste them without knowing what they are, where they came from, or how to make one from scratch.",
  "This guide fixes that. By the end, you will know the full history of kaomoji, how to read any kaomoji you encounter, how to type them on every device you own, how to build your own from raw Unicode characters, and which ones to use in every emotional situation imaginable. You will also find over 100 examples organized by category, ready to copy and paste.",
];

export default function IntroLead() {
  return (
    <AnimatedSection>
      <section className="mt-14 pt-9 border-t-2 border-[var(--rule)]">
        <p className="fg-kicker mb-4">The Complete Guide · 2026</p>
        <h2 className="font-display t-ink leading-[1.05] tracking-[-0.015em] text-[1.9rem] sm:text-[2.6rem] mb-7 max-w-3xl">
          The Complete Guide to Japanese Text Emoticons
        </h2>
        <div className="fg-lead fg-lead--cap fg-prose max-w-2xl">
          {PARAS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
