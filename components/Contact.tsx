"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LINKS = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "linkedin", value: "in/sagarhooda", href: profile.linkedin },
  { label: "github", value: "sagarh12", href: profile.github },
];

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-rise", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio contact — ${form.name || "no name"}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div ref={root} className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="05" eyebrow="contact" title="// get_in_touch" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.8fr]">
          {/* terminal form */}
          <div className="contact-rise terminal-chrome overflow-hidden rounded-xl">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-white/40">
                send_message.sh
              </span>
            </div>

            <form onSubmit={onSubmit} className="space-y-5 p-6 font-mono">
              <p className="text-sm text-primary/80">
                <span className="text-white/40">$</span> ./send_message
                <span className="text-secondary">()</span>
              </p>

              <Field
                label="--name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Jane Recruiter"
              />
              <Field
                label="--email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="you@company.com"
              />
              <div>
                <label className="mb-1.5 block text-xs text-white/45">
                  <span className="text-secondary">&gt;</span> --message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Let's talk about a co-op opportunity..."
                  className="w-full resize-none rounded-md border border-white/10 bg-black/40 px-4 py-3 text-sm text-body outline-none transition-all placeholder:text-white/25 focus:border-primary/60 focus:shadow-neon"
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-md border border-primary/60 bg-primary/10 px-6 py-3 text-sm font-medium text-primary shadow-neon transition-all duration-300 hover:bg-primary/20 hover:shadow-neon-strong"
              >
                <span>execute</span>
                <span className="transition-transform group-hover:translate-x-1">↵</span>
              </button>
            </form>
          </div>

          {/* direct links */}
          <div className="contact-rise flex flex-col justify-center gap-3">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              ~/connect
            </p>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.label === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-white/8 bg-card/60 px-5 py-4 transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-neon"
              >
                <span className="font-mono text-sm text-white/55 group-hover:text-primary">
                  <span className="text-primary/50">/</span>
                  {l.label}
                </span>
                <span className="font-mono text-sm text-body/80 group-hover:text-glow-primary">
                  {l.value}
                </span>
              </a>
            ))}
            <p className="mt-3 font-mono text-xs text-white/35">
              <span className="text-primary">▹</span> based in {profile.location}
            </p>
          </div>
        </div>

        {/* footer */}
        <footer className="mt-24 border-t border-white/5 pt-8 text-center">
          <p className="font-mono text-xs text-white/35">
            <span className="text-primary">&gt;</span> designed &amp; built by{" "}
            {profile.name} · {new Date().getFullYear()} ·{" "}
            <span className="text-secondary">{profile.domain}</span>
          </p>
        </footer>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-white/45">
        <span className="text-secondary">&gt;</span> {label}
      </label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-white/10 bg-black/40 px-4 py-3 text-sm text-body outline-none transition-all placeholder:text-white/25 focus:border-primary/60 focus:shadow-neon"
      />
    </div>
  );
}
