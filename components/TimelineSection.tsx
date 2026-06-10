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
    <ol className="fg-steps">
      {years.map(({ key, year }) => (
        <li key={key} className="fg-step">
          <span className="fg-step__n tabular-nums" style={{ width: "4.5rem" }}>{year}</span>
          <div>
            <p className="fg-step__t">{timeEvolution[key]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
