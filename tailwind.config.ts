import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        card: "#111111",
        primary: "#00ff88",
        secondary: "#00e5ff",
        body: "#e0e0e0",
        muted: "#444444",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 20px #00ff8866",
        "neon-cyan": "0 0 20px #00e5ff66",
        "neon-strong": "0 0 32px #00ff8899, 0 0 8px #00ff88cc",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(0)", opacity: "0.2" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "0.2" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 40px" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        "scroll-cue": "scroll-cue 2s ease-in-out infinite",
        "grid-pan": "grid-pan 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
