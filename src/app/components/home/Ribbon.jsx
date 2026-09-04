"use client";

import Marquee from "../anim/Marquee";

const phrases = [
  "Handcrafted with dignity",
  "Recycled temple sarees",
  "Hand-painted Warli art",
  "Every purchase creates work",
  "Made in Navi Mumbai",
  "Beyond charity",
];

export default function Ribbon() {
  return (
    <div className="ribbon">
      <Marquee speed={70}>
        {phrases.map((p) => (
          <span key={p}>
            {p}
            <i className="dot" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
