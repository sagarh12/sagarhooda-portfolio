"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const NAV = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", ...NAV.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-bg/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#home" className="group font-mono text-sm font-bold tracking-tight">
          <span className="text-primary">~/</span>
          <span className="text-body group-hover:text-primary transition-colors">
            sagarpreet
          </span>
          <span className="animate-blink text-primary">_</span>
        </a>

        {/* desktop */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`group relative font-mono text-sm transition-colors ${
                  active === item.id ? "text-primary" : "text-white/55 hover:text-body"
                }`}
              >
                <span className="text-primary/40">/</span>
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-primary transition-all duration-300 ${
                    active === item.id ? "w-full shadow-neon" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resume}
              download
              className="rounded border border-primary/50 px-4 py-1.5 font-mono text-sm text-primary transition-all hover:bg-primary/10 hover:shadow-neon"
            >
              resume
            </a>
          </li>
        </ul>

        {/* mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-primary transition-all ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span className={`h-px w-6 bg-primary transition-all ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-primary transition-all ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-t border-white/5 bg-bg/95 backdrop-blur-md md:hidden"
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block py-2 font-mono text-sm text-white/70 hover:text-primary"
              >
                <span className="text-primary/40">/</span>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resume}
              download
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded border border-primary/50 px-4 py-2 font-mono text-sm text-primary"
            >
              download resume
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
