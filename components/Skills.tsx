"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skills, extracurriculars } from "@/lib/data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const chip = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="04" eyebrow="skills" title="// toolkit" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {skills.map((group, gi) => {
            const accent =
              group.accent === "secondary"
                ? "border-secondary/25 bg-secondary/[0.06] text-secondary/90 hover:border-secondary/60 hover:shadow-neon-cyan"
                : "border-primary/25 bg-primary/[0.06] text-primary/90 hover:border-primary/60 hover:shadow-neon";
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.6, delay: gi * 0.08 }}
                className="rounded-xl border border-white/5 bg-card/50 p-6"
              >
                <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/45">
                  <span
                    className={
                      group.accent === "secondary" ? "text-secondary" : "text-primary"
                    }
                  >
                    ▣
                  </span>
                  {group.category}
                </p>
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-10%" }}
                  className="flex flex-wrap gap-2.5"
                >
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      variants={chip}
                      className={`chip cursor-default ${accent}`}
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* extracurriculars */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6 }}
          className="mt-6 rounded-xl border border-white/5 bg-card/50 p-6"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/45">
            <span className="text-primary">▣</span> Leadership & Community
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {extracurriculars.map((e) => (
              <div key={e.role} className="flex flex-col">
                <span className="font-mono text-sm text-body">{e.role}</span>
                <span className="font-mono text-xs text-white/40">{e.dates}</span>
                {e.note && (
                  <span className="mt-1 text-sm text-body/65">{e.note}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
