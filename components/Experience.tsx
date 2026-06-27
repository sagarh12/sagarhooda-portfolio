"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { experience } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // draw the spine downward
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".timeline-track",
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node) => {
        gsap.from(node, {
          opacity: 0,
          y: 36,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 82%" },
        });
        const dot = node.querySelector(".timeline-dot");
        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: node, start: "top 82%" },
          });
        }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div ref={root} className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="02" eyebrow="experience" title="// career.log" />

        <div className="timeline-track relative ml-3 pl-8 sm:ml-4 sm:pl-12">
          {/* spine */}
          <div className="absolute left-0 top-2 h-full w-px bg-white/8" />
          <div className="timeline-line absolute left-0 top-2 h-full w-px bg-gradient-to-b from-primary via-secondary to-primary/0 shadow-neon" />

          <div className="space-y-12">
            {experience.map((job) => (
              <article key={job.company + job.dates} className="timeline-node relative">
                {/* node dot */}
                <span className="timeline-dot absolute -left-[2.45rem] top-1.5 flex h-4 w-4 items-center justify-center sm:-left-[3.45rem]">
                  <span className="absolute h-4 w-4 animate-ping rounded-full bg-primary/30" />
                  <span className="h-3 w-3 rounded-full border-2 border-primary bg-bg shadow-neon" />
                </span>

                <div className="group rounded-xl border border-white/5 bg-card/60 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-mono text-lg font-semibold text-body">
                      {job.role}
                    </h3>
                    <span className="font-mono text-xs text-secondary">{job.dates}</span>
                  </div>
                  <p className="mt-1 font-mono text-sm text-primary/90">
                    {job.company}
                    <span className="ml-2 rounded border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/45">
                      {job.type}
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-relaxed text-body/75">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
