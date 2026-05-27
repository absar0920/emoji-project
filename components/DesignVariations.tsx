import { DesignVariations as DesignVariationsType } from "@/types/emoji";

interface DesignVariationsProps {
  character: string;
  variations?: DesignVariationsType;
}

const VENDORS = [
  { key: "apple", label: "Apple", type: "native" as const },
  { key: "google_noto", label: "Google", type: "image" as const },
  { key: "twemoji", label: "Twitter", type: "image" as const },
  { key: "openmoji", label: "OpenMoji", type: "image" as const },
  { key: "samsung", label: "Samsung", type: "native" as const },
];

export default function DesignVariations({
  character,
  variations,
}: DesignVariationsProps) {
  return (
    <section id="design" className="mb-10">
      <h2 className="text-xl font-bold text-primary-dark dark:text-indigo-100 mb-4">
        How It Looks Across Platforms
      </h2>
      <div className="flex flex-wrap gap-3">
        {VENDORS.map((vendor) => {
          const imageUrl =
            vendor.type === "image"
              ? variations?.[vendor.key as keyof DesignVariationsType]
              : null;

          return (
            <div
              key={vendor.key}
              className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700 min-w-[100px]"
            >
              {vendor.type === "native" || !imageUrl ? (
                <span className="text-4xl leading-none">{character}</span>
              ) : (
                <img
                  src={imageUrl}
                  alt={`${vendor.label} ${character}`}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
              )}
              <span className="text-xs font-medium text-neutral-600 dark:text-slate-300">
                {vendor.label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-neutral-400 dark:text-slate-500 mt-2">
        Emoji appearance varies by platform and device. Google Noto, Twemoji,
        and OpenMoji are open-source.
      </p>
    </section>
  );
}
