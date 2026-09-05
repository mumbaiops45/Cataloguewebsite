// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import { ArrowUpRight } from "lucide-react";
// import { gsap, ScrollTrigger, prefersReducedMotion } from "../anim/gsap";
// import SplitHeading from "../anim/SplitHeading";
// import { ishwariCatalogue } from "../../lib/site";

// const featured = ishwariCatalogue.filter((p) => p.featured);

// export default function IshwariShowcase() {
//   const section = useRef(null);
//   const track = useRef(null);

//   useGSAP(
//     () => {
//       if (prefersReducedMotion() || window.innerWidth < 760) return;

//       const el = track.current;
//       const cards = gsap.utils.toArray(".ishop-card", el);
//       const distance = () => el.scrollWidth - window.innerWidth + 80;

//       const tween = gsap.to(el, {
//         x: () => -distance(),
//         ease: "none",
//       });

//       // Rhythm offset (alternating rows) lives on the same transform GSAP
//       // drives for the focus effect below — an inline transform from GSAP
//       // would otherwise silently override the CSS translateY.
//       const baseY = (card) => (card.dataset.alt === "1" ? 30 : 0);

//       const focusCards = () => {
//         const centerX = window.innerWidth / 2;
//         cards.forEach((card) => {
//           const rect = card.getBoundingClientRect();
//           const cardCenter = rect.left + rect.width / 2;
//           const dist = Math.min(Math.abs(cardCenter - centerX), window.innerWidth);
//           const t = 1 - dist / window.innerWidth;
//           gsap.set(card, {
//             y: baseY(card),
//             scale: 0.88 + t * 0.12,
//             opacity: 0.55 + t * 0.45,
//           });
//         });
//       };

//       cards.forEach((card) => {
//         const enter = () => gsap.to(card, { y: baseY(card) - 8, duration: 0.4, ease: "power2.out", overwrite: "auto" });
//         const leave = () => gsap.to(card, { y: baseY(card), duration: 0.4, ease: "power2.out", overwrite: "auto" });
//         card.addEventListener("mouseenter", enter);
//         card.addEventListener("mouseleave", leave);
//       });

//       ScrollTrigger.create({
//         trigger: section.current,
//         start: "top top",
//         end: () => "+=" + distance(),
//         pin: true,
//         scrub: 1,
//         animation: tween,
//         invalidateOnRefresh: true,
//         anticipatePin: 1,
//         onUpdate: focusCards,
//         onRefresh: focusCards,
//       });

//       focusCards();
//     },
//     { scope: section }
//   );

//   return (
//     <section className="ishwari-shop section" id="ishwari-shop" ref={section}>
//       <div className="wrap ishop-head">
//         <div>
//           <p className="eyebrow">Shop Ishwari</p>
//           <SplitHeading as="h2" scroll className="display-2">
//             A few favourites,
//             <br />
//             <em>priced &amp; ready.</em>
//           </SplitHeading>
//         </div>
//         <Link href="/ishwari" className="link-underline">
//           Shop the full catalogue <ArrowUpRight size={15} />
//         </Link>
//       </div>

//       <div className="ishop-viewport">
//         <div className="ishop-track" ref={track}>
//           {featured.map((p, i) => (
//             <div className="ishop-card" key={p.name} data-alt={i % 2}>
//               <div className="ishop-media">
//                 <Image
//                   src={p.img}
//                   alt={p.name}
//                   fill
//                   sizes="340px"
//                   style={{ objectFit: "contain" }}
//                 />
//                 <span className="ishop-price">{p.priceLabel}/-</span>
//               </div>
//               <h3 className="ishop-name">{p.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="wrap htrack-hint" style={{ color: "var(--ink-soft)" }}>
//         Scroll to explore →
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Sparkles, ShoppingBag } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../anim/gsap";
import SplitHeading from "../anim/SplitHeading";
import { ishwariCatalogue } from "../../lib/site";

const featured = ishwariCatalogue.filter((p) => p.featured);

export default function IshwariShowcase() {
  const section = useRef(null);
  const track = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      if (window.innerWidth < 760) {
        gsap.from(gsap.utils.toArray(".ishop-card", track.current), {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section.current, start: "top 80%" },
        });
        return;
      }

      const el = track.current;
      const cards = gsap.utils.toArray(".ishop-card", el);
      const distance = () => el.scrollWidth - window.innerWidth + 80;

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
      });

      const focusCards = () => {
        const centerX = window.innerWidth / 2;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.min(Math.abs(cardCenter - centerX), window.innerWidth);
          const t = 1 - dist / window.innerWidth;
          
          gsap.set(card, {
            scale: 0.85 + t * 0.15,
            opacity: 0.4 + t * 0.6,
            filter: `blur(${(1 - t) * 3}px)`,
          });
        });
      };

      cards.forEach((card) => {
        const enter = () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        const leave = () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
      });

      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        scrub: 1.5,
        animation: tween,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: focusCards,
        onRefresh: focusCards,
      });

      focusCards();
    },
    { scope: section }
  );

  return (
    <section 
      className="ishwari-showcase section" 
      id="ishwari-shop" 
      ref={section}
      style={{
        background: "linear-gradient(180deg, #faf8f5 0%, #f0ebe4 100%)",
        padding: "clamp(2.75rem, 6vw, 4rem) 0 clamp(3.5rem, 7vw, 6rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div style={{
        position: "absolute",
        top: "-20%",
        right: "-10%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(226, 43, 43, 0.08) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-30%",
        left: "-15%",
        width: "800px",
        height: "800px",
        background: "radial-gradient(circle, rgba(226, 43, 43, 0.05) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      <div className="wrap" style={{ 
        maxWidth: "1400px", 
        margin: "0 auto", 
        padding: "0 2rem" 
      }}>
        {/* Header - Original heading preserved */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "clamp(1.75rem, 6vw, 4rem)",
          flexWrap: "wrap",
          gap: "2rem",
        }}>
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <Sparkles size={18} style={{ color: "#e22b2b" }} />
              <p style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#8a7a6a",
              }}>
                Curated Selection
              </p>
            </div>
            {/* Original heading - no changes to font or color */}
            <SplitHeading as="h2" scroll className="display-2">
              A few favourites,
              <br />
              <em>priced &amp; ready.</em>
            </SplitHeading>
          </div>
          
          <Link 
            href="/ishwari" 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.875rem 2rem",
              background: "linear-gradient(135deg, #e22b2b 0%, #d12727 100%)",
              color: "#ffffff",
              borderRadius: "50px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(226, 43, 43, 0.3)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(226, 43, 43, 0.4)";
              e.currentTarget.style.background = "linear-gradient(135deg, #d12727 0%, #a8181c 100%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(226, 43, 43, 0.3)";
              e.currentTarget.style.background = "linear-gradient(135deg, #e22b2b 0%, #d12727 100%)";
            }}
          >
            Explore full collection
            <ArrowUpRight size={18} style={{ transition: "transform 0.3s" }} />
          </Link>
        </div>

        {/* Scrollable track */}
        <div style={{
          position: "relative",
          margin: "0 -2rem",
          padding: "0 2rem",
          overflow: "hidden",
        }}>
          <div 
            className="ishop-track" 
            ref={track}
            style={{
              display: "flex",
              gap: "2.5rem",
              padding: "clamp(0.75rem, 3vw, 2rem) 0",
              width: "max-content",
              cursor: "grab",
            }}
          >
            {featured.map((p, i) => (
              <div 
                className="ishop-card" 
                key={p.name}
                style={{
                  flex: "0 0 340px",
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "1.5rem",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.4s ease, transform 0.4s ease",
                  border: "1px solid rgba(255,255,255,0.5)",
                  backdropFilter: "blur(10px)",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#ffffff",
                  marginBottom: "1.5rem",
                }}>
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="340px"
                    priority={i < 3}
                    style={{
                      objectFit: "cover",
                      padding: "0.5rem",
                      transition: "transform 0.6s ease",
                    }}
                    className="ishop-image"
                    quality={100}
                  />
                  <span style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    background: "rgba(226, 43, 43, 0.95)",
                    backdropFilter: "blur(8px)",
                    color: "#ffffff",
                    padding: "0.5rem 1.25rem",
                    borderRadius: "50px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    boxShadow: "0 2px 10px rgba(226, 43, 43, 0.3)",
                  }}>
                    {p.priceLabel}/-
                  </span>
                </div>
                
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  color: "#1a1614",
                  margin: "0 0 0.75rem 0",
                  letterSpacing: "-0.01em",
                }}>
                  {p.name}
                </h3>
                
                {/* Orange Shop Now Button */}
                <Link
                  href={`/ishwari/${p.slug || p.name.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    width: "100%",
                    padding: "0.75rem 1.5rem",
                    background: "linear-gradient(135deg, #e22b2b 0%, #d12727 100%)",
                    color: "#ffffff",
                    borderRadius: "50px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    border: "none",
                    boxShadow: "0 2px 15px rgba(226, 43, 43, 0.25)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #d12727 0%, #a8181c 100%)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(226, 43, 43, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #e22b2b 0%, #d12727 100%)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 15px rgba(226, 43, 43, 0.25)";
                  }}
                >
                  <ShoppingBag size={16} />
                  Shop Now
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3rem",
          color: "#b5a89a",
          fontSize: "0.875rem",
          letterSpacing: "0.05em",
          gap: "0.75rem",
          alignItems: "center",
        }}>
          {/* <span style={{ opacity: 0.6 }}>⟵</span>
          <span>Scroll to explore the collection</span>
          <span style={{ opacity: 0.6 }}>⟶</span> */}
        </div>
      </div>
    </section>
  );
}