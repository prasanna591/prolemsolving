import Image from "next/image";
import type { Founder } from "@/lib/founders";

interface FounderPhotoProps {
  founder: Founder;
  /** extra classes on the wrapping `.person-photo` shell */
  className?: string;
  width?: string;
}

/**
 * Founder portrait with an initials fallback when no photo is on file.
 * `photo` is optional on the model, so every call site would otherwise repeat
 * the same narrowing branch.
 */
export function FounderPhoto({ founder, className = "", width }: FounderPhotoProps) {
  const alt = `${founder.name}, ${founder.role.toLowerCase()} of PSM`;

  return (
    <div
      className={`person-photo ${founder.photo ? "person-photo--img" : ""} ${className}`.trim()}
      style={width ? { width } : undefined}
    >
      {founder.photo ? (
        <Image src={founder.photo} alt={alt} sizes="(max-width: 640px) 100vw, (max-width: 899px) 45vw, 260px" />
      ) : (
        <span className="person-mono">{founder.initials}</span>
      )}
      <span className="person-caption">{founder.role}</span>
    </div>
  );
}
