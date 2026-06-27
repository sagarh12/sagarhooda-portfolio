"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import StatCounter from "./StatCounter";
import { about, stats } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HIGHLIGHTS = [
  "SIEM / QRadar",
  "IAM",
  "PowerShell",
  "Azure",
  "Python",
  "Java",
  "Next.js",
  "Machine Learning",
];

export default function About() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-fade", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 72%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div ref={root} className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="01" eyebrow="about" title="// who_am_i" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* bio + highlights */}
          <div>
            {about.bio.map((p, i) => (
              <p
                key={i}
                className="about-fade mb-5 max-w-2xl text-base leading-relaxed text-body/80 sm:text-lg"
              >
                {p}
              </p>
            ))}

            <div className="about-fade mt-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                $ stack --at-a-glance
              </p>
              <div className="flex flex-wrap gap-2.5">
                {HIGHLIGHTS.map((h) => (
                  <span
                    key={h}
                    className="chip border-primary/25 bg-primary/[0.06] text-primary/90 hover:border-primary/60 hover:shadow-neon"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* education card */}
          <aside className="about-fade">
            <div className="terminal-chrome rounded-xl p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-secondary/80">
                ~/education
              </p>
              <h3 className="font-mono text-lg font-semibold text-body">
                {about.education.degree}
              </h3>
              <p className="mt-1 text-sm text-body/70">{about.education.school}</p>
              <p className="mt-2 font-mono text-xs text-white/40">
                {about.education.dates}
              </p>
              <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                {about.education.awards.map((a) => (
                  <li key={a} className="flex gap-2 text-sm text-body/75">
                    <span className="text-primary">▹</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* stat counters */}
        <div className="about-fade mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/5 bg-white/5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-bg/80 px-6 py-8 text-center transition-colors hover:bg-card"
            >
              <div className="font-mono text-4xl font-bold text-glow-primary sm:text-5xl">
                <StatCounter value={s.value} decimals={s.decimals ?? 0} />
                {s.suffix}
              </div>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-white/45">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
