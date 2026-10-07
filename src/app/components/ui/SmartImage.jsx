"use client";

import Image, { getImageProps } from "next/image";
import { PDP_IMAGE_SIZES } from "../../lib/images";

export { PDP_IMAGE_SIZES };

const CLOUDINARY = /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//;

// Backend images live on Cloudinary, which can resize and convert them
// (WebP/AVIF, auto quality) on its own CDN. Asking it directly is much faster
// than routing every image through the Next.js optimizer first.
export function cloudinaryLoader({ src, width }) {
  return src.replace("/image/upload/", `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
}

export const isCloudinary = (src) => typeof src === "string" && CLOUDINARY.test(src);

// Start downloading an image before it's on screen (e.g. the product page
// photo while a product card is being tapped), using the same srcset/sizes
// as the real <img> so the browser reuses the download.
const warmed = new Set();
export function preloadImage(src, sizes) {
  if (!src || typeof window === "undefined" || warmed.has(src)) return;
  warmed.add(src);
  const { props } = getImageProps({
    src,
    alt: "",
    fill: true,
    sizes,
    ...(isCloudinary(src) && { loader: cloudinaryLoader }),
  });
  const img = new window.Image();
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
}

// Drop-in replacement for next/image: Cloudinary URLs use the Cloudinary
// loader, everything else (local /public images) keeps Next's optimizer.
export default function SmartImage({ alt, ...props }) {
  return isCloudinary(props.src) ? (
    <Image loader={cloudinaryLoader} alt={alt} {...props} />
  ) : (
    <Image alt={alt} {...props} />
  );
}
