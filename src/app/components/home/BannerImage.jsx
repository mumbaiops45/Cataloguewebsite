import { getImageProps } from "next/image";

// Desktop image (`url`) on wider screens, mobile image (`mobileUrl`) on
// phones. One <img> per banner, so the browser downloads only the one it shows.
export default function BannerImage({ banner, priority = false }) {
  const common = {
    alt: [banner.title1, banner.title2].filter(Boolean).join(" ") || "SEFD banner",
    fill: true,
    sizes: "100vw",
    priority,
  };
  const { props: desktop } = getImageProps({ ...common, src: banner.url });
  const mobile = banner.mobileUrl
    ? getImageProps({ ...common, src: banner.mobileUrl }).props
    : null;

  return (
    <picture>
      {mobile && <source media="(max-width: 767px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...desktop} className="banner-img" />
    </picture>
  );
}
