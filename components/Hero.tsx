"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const HeroOrb = dynamic(() => import("./HeroOrb"), { ssr: false });

type Line = { prompt: string; output: string; accent?: "primary" | "secondary" };

const LINES: Line[] = [
  { prompt: "whoami", output: profile.name, accent: "primary" },
  { prompt: "role", output: profile.role },
  { prompt: "status", output: profile.status, accent: "secondary" },
];

function useTypewriter(lines: Line[]) {
  const [done, setDone] = useState<number>(0); // fully-typed line count
  const [typed, setTyped] = useState<string>(""); // current line partial output

  useEffect(() => {
    if (done >= lines.length) return;
    const full = lines[done].output;
    if (typed.length < full.length) {
      const t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 38);
      return () => clearTimeout(t);
    }
    // line finished — pause, then advance
    const t = setTimeout(() => {
      setDone((d) => d + 1);
      setTyped("");
    }, 450);
    return () => clearTimeout(t);
  }, [typed, done, lines]);

  return { done, typed };
}

function Cursor() {
  return (
    <span className="ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.12em] animate-blink bg-primary align-middle" />
  );
}

export default function Hero() {
  const { done, typed } = useTypewriter(LINES);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden dot-grid"
    >
      {/* layered atmosphere */}
      <div className="pointer-events-none absolute inset-0 vignette" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[36rem] w-[36rem] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-28 pb-20 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT — terminal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            // portfolio.init()
          </motion.p>

          <div className="terminal-chrome max-w-xl rounded-xl">
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-white/40">
                sagarpreet@hooda: ~/portfolio
              </span>
            </div>

            {/* body */}
            <div className="space-y-3 p-5 font-mono text-sm sm:text-base">
              {LINES.map((line, i) => {
                const isCurrent = i === done;
                const isPast = i < done;
                if (i > done) return null;
                const accentClass =
                  line.accent === "secondary"
                    ? "text-glow-secondary"
                    : line.accent === "primary"
                    ? "text-glow-primary"
                    : "text-body";
                return (
                  <div key={line.prompt} className="leading-relaxed">
                    <span className="text-primary/70">&gt; </span>
                    <span className="text-white/70">{line.prompt}</span>
                    <div className={`mt-1 ${accentClass}`}>
                      {isPast ? line.output : typed}
                      {isCurrent && <Cursor />}
                    </div>
                  </div>
                );
              })}
              {done >= LINES.length && (
                <div className="leading-relaxed">
                  <span className="text-primary/70">&gt; </span>
                  <Cursor />
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <motion.div
            className="mt-9 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-md border border-primary/60 bg-primary/10 px-6 py-3 font-mono text-sm font-medium text-primary shadow-neon transition-all duration-300 hover:bg-primary/20 hover:shadow-neon-strong"
            >
              <span className="relative z-10">[ View Projects ]</span>
            </a>
            <a
              href={profile.resume}
              download
              className="rounded-md border border-secondary/50 px-6 py-3 font-mono text-sm font-medium text-secondary transition-all duration-300 hover:border-secondary hover:bg-secondary/10 hover:shadow-neon-cyan"
            >
              [ Download Resume ]
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D orb */}
        <motion.div
          className="relative h-[340px] w-full md:h-[460px] lg:h-[520px]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroOrb />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          scroll
        </span>
        <svg
          className="h-5 w-5 animate-scroll-cue text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.a>
    </section>
  );
}
