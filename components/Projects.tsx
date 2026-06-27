"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { projects, type Project } from "@/lib/data";

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 12;
    const rotateX = (0.5 - py) * 12;
    setTransform(
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`
    );
    setGlow({ x: px * 100, y: py * 100, on: true });
  };

  const onLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg)");
    setGlow((g) => ({ ...g, on: false }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transform, transition: "transform 0.25s ease-out" }}
        className="group relative h-full overflow-hidden rounded-xl border border-white/8 bg-card p-6 will-change-transform"
      >
        {/* cursor-follow glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: glow.on ? 1 : 0,
            background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(0,255,136,0.10), transparent 60%)`,
          }}
        />
        {/* neon border on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-xl border border-primary/0 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-neon" />

        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-white/30">
              0{index + 1}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/60">
              project
            </span>
          </div>

          <h3 className="mt-4 font-mono text-xl font-semibold text-body transition-colors group-hover:text-glow-primary">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-body/70">{project.blurb}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="chip border-secondary/25 bg-secondary/[0.06] text-secondary/90"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-5 border-t border-white/5 pt-4">
            <p className="flex items-center gap-2 font-mono text-xs text-primary/90">
              <span className="text-primary">▸</span>
              {project.metric}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36 line-grid">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="03" eyebrow="projects" title="// build_log" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <TiltCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
