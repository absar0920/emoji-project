interface ToolHeroProps {
  title: string;
  description: string;
  badge?: string;
}

export default function ToolHero({ title, description, badge }: ToolHeroProps) {
  return (
    <div className="bg-gradient-to-b from-primary-light/30 dark:from-indigo-900/20 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary text-sm font-medium mb-4">
          {badge}
        </span>
      )}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-indigo-100 mb-2">
        {title}
      </h1>
      <p className="text-neutral-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
