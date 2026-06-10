interface ToolHeroProps {
  title: string;
  description: string;
  badge?: string;
}

export default function ToolHero({ title, description, badge }: ToolHeroProps) {
  return (
    <header className="border-b-2 border-[var(--rule)] pb-7 mb-9">
      <p className="fg-kicker mb-4">{badge || "Tool"}</p>
      <h1 className="font-display t-ink leading-[1.0] tracking-[-0.015em] text-[2.4rem] sm:text-[3.4rem]">
        {title}
      </h1>
      <p className="t-muted font-read mt-4 max-w-2xl text-lg leading-relaxed">{description}</p>
    </header>
  );
}
