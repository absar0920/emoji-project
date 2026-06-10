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

export default function DesignVariations({ character, variations }: DesignVariationsProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-x-10 gap-y-6 border-y border-[var(--line)] py-7">
        {VENDORS.map((vendor) => {
          const imageUrl = vendor.type === "image" ? variations?.[vendor.key as keyof DesignVariationsType] : null;
          return (
            <figure key={vendor.key} className="fg-specimen">
              {vendor.type === "native" || !imageUrl ? (
                <span className="fg-specimen__g">{character}</span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt={`${vendor.label} ${character}`} width={40} height={40} className="w-10 h-10 object-contain" loading="lazy" />
              )}
              <figcaption className="fg-specimen__c">{vendor.label}</figcaption>
            </figure>
          );
        })}
      </div>
      <p className="mono text-[0.66rem] leading-relaxed t-muted mt-4">
        Appearance varies by platform and device. Google Noto, Twemoji, and OpenMoji are open-source.
      </p>
    </div>
  );
}
