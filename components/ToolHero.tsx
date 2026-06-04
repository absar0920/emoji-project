interface ToolHeroProps {
  title: string;
  description: string;
  badge?: string;
}

export default function ToolHero({ title, description, badge }: ToolHeroProps) {
  return (
    <div className="rule-top pt-10 pb-8 mb-8">
      {badge && (
        <p className="eyebrow mb-3 flex items-center gap-2">
          <span className="inline-block w-6 h-px bg-primary" aria-hidden="true" />
          {badge}
        </p>
      )}
      <h1 className="font-display text-4xl sm:text-5xl text-primary-dark dark:text-white leading-[1.05]">
        {title}
      </h1>
      <p className="mt-4 text-lg text-neutral-500 dark:text-slate-400 max-w-2xl leading-relaxed">{description}</p>
    </div>
  );
}
