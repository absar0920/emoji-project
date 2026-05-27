interface TimelineSectionProps {
  timeEvolution: {
    usage_2010: string;
    usage_2015: string;
    usage_2020: string;
    usage_2026: string;
  };
}

const years = [
  { key: "usage_2010", year: "2010" },
  { key: "usage_2015", year: "2015" },
  { key: "usage_2020", year: "2020" },
  { key: "usage_2026", year: "2026" },
] as const;

export default function TimelineSection({ timeEvolution }: TimelineSectionProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-300 sm:hidden" />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {years.map(({ key, year }) => (
          <div key={key} className="relative pl-10 sm:pl-0">
            <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-slate-800 sm:hidden" />
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700">
              <div className="text-sm font-bold text-primary mb-1">{year}</div>
              <p className="text-sm text-neutral-700 dark:text-slate-300">{timeEvolution[key]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
