import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// title1 + title2 rendered as one heading, each part in its own colour.
export default function BannerTitle({ banner, as: Tag = "h2", className }) {
  const { title1, title2, color1, color2 } = banner;
  if (!title1 && !title2) return null;
  return (
    <Tag className={className}>
      {title1 && <span style={{ color: color1 || "#ffffff" }}>{title1}</span>}
      {title1 && title2 && " "}
      {title2 && <span style={{ color: color2 || "#ffffff" }}>{title2}</span>}
    </Tag>
  );
}

// "01 / 03" counter shown on the right of a slider.
export function BannerCount({ current, total }) {
  if (total < 2) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="banner-count" aria-live="polite">
      <span className="banner-count-cur">{pad(current + 1)}</span>
      <span className="banner-count-sep" />
      <span className="banner-count-total">{pad(total)}</span>
    </div>
  );
}

// CTA button from the banner's ctaText / ctaUrl. Hidden when either is empty.
export function BannerCta({ banner, className = "btn btn-orange" }) {
  const text = banner?.ctaText?.trim();
  const url = banner?.ctaUrl?.trim();
  if (!text || !url) return null;

  // Always opens in the same tab. Full URLs pass through as-is;
  // bare paths like "shop" become "/shop".
  const href = /^https?:\/\//i.test(url) || url.startsWith("/") ? url : `/${url}`;

  return (
    <Link href={href} className={className}>
      {text} <ArrowUpRight size={16} />
    </Link>
  );
}
