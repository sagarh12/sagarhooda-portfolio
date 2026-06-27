# Sagarpreet Hooda — Portfolio

A dark, terminal/hacker-aesthetic personal portfolio with 3D interactive elements, built to showcase cybersecurity and software-engineering work.

**Live:** [sagarhooda-portfolio.vercel.app](https://sagarhooda-portfolio.vercel.app)

## Tech stack

- **[Next.js 14](https://nextjs.org/)** (App Router) + TypeScript
- **[Tailwind CSS](https://tailwindcss.com/)** — design system & theming
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei)** — 3D hero orb & particle starfield
- **[GSAP](https://gsap.com/) + ScrollTrigger** — scroll-driven timeline & reveals
- **[Framer Motion](https://www.framer.com/motion/)** — page transitions & micro-interactions
- **next/font** — JetBrains Mono + Inter

## Sections

Hero (terminal typewriter + 3D orb) · About · Experience timeline · Projects · Skills · Contact.

All content lives in [`lib/data.ts`](lib/data.ts).

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deployment

Hosted on Vercel. See [`DEPLOY.md`](DEPLOY.md) for deploy and custom-domain steps.
