const platformIcons: Record<string, string> = {
  tiktok: "🎵",
  whatsapp: "💬",
  instagram: "📸",
};

interface PlatformCardProps {
  platform: string;
  data: Record<string, string | string[] | number>;
}

export default function PlatformCard({ platform, data }: PlatformCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{platformIcons[platform] || "📱"}</span>
        <h3 className="font-bold text-neutral-900 dark:text-slate-100 capitalize">{platform}</h3>
      </div>
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <div key={key}>
                <span className="text-xs text-neutral-500 dark:text-slate-400 capitalize">{key.replace(/_/g, " ")}</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {value.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-primary-light dark:bg-indigo-900/30 text-primary rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            );
          }
          if (typeof value === "number") {
            return (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-neutral-500 dark:text-slate-400 capitalize">{key.replace(/_/g, " ")}</span>
                <span className="font-medium text-accent-amber">{value}/100</span>
              </div>
            );
          }
          return (
            <div key={key} className="text-sm">
              <span className="text-neutral-500 dark:text-slate-400 capitalize block text-xs">{key.replace(/_/g, " ")}</span>
              <p className="text-neutral-700 dark:text-slate-300">{String(value)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
