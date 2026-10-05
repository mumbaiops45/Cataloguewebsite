"use client";

import Image from "next/image";

const CLOUDINARY = /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//;

// Backend images live on Cloudinary, which can resize and convert them
// (WebP/AVIF, auto quality) on its own CDN. Asking it directly is much faster
// than routing every image through the Next.js optimizer first.
export function cloudinaryLoader({ src, width }) {
  return src.replace("/image/upload/", `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
}

export const isCloudinary = (src) => typeof src === "string" && CLOUDINARY.test(src);

// Drop-in replacement for next/image: Cloudinary URLs use the Cloudinary
// loader, everything else (local /public images) keeps Next's optimizer.
export default function SmartImage({ alt, ...props }) {
  return isCloudinary(props.src) ? (
    <Image loader={cloudinaryLoader} alt={alt} {...props} />
  ) : (
    <Image alt={alt} {...props} />
  );
}
