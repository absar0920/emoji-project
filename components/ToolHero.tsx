interface ToolHeroProps {
  title: string;
  description: string;
  badge?: string;
}

export default function ToolHero({ title, description, badge }: ToolHeroProps) {
  return (
    <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          {badge}
        </span>
      )}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-2">
        {title}
      </h1>
      <p className="text-neutral-500">{description}</p>
    </div>
  );
}
