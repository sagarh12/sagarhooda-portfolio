"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // parallax depth on the big ghost number
      gsap.to(".heading-ghost", {
        yPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.from(".heading-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="relative mb-14">
      <span className="heading-ghost pointer-events-none absolute -top-16 -left-2 select-none font-mono text-[7rem] font-bold leading-none text-white/[0.03] sm:text-[10rem]">
        {index}
      </span>
      <p className="heading-reveal eyebrow mb-3">
        <span className="text-primary">{index}.</span> {eyebrow}
      </p>
      <h2 className="heading-reveal font-mono text-3xl font-bold tracking-tight text-body sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
