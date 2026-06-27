# Deploying to Vercel — sagarpreethooda.com

This is a standard Next.js 14 (App Router) app. Vercel auto-detects everything.

## 1. Push to GitHub

```bash
cd portfolio-site
git init
git add .
git commit -m "Initial portfolio build"
git branch -M main
git remote add origin https://github.com/sagarh12/portfolio.git
git push -u origin main
```

## 2. Import into Vercel

1. Go to https://vercel.com/new
2. Import the `portfolio` repo.
3. Framework preset: **Next.js** (auto-detected). No env vars needed.
4. Click **Deploy**. First build takes ~1–2 min.

## 3. Connect your custom domain

1. In the Vercel project → **Settings → Domains**.
2. Add `sagarpreethooda.com` and `www.sagarpreethooda.com`.
3. At your domain registrar, set the DNS records Vercel shows you:
   - `A` record `@` → `76.76.21.21`, **or** the `CNAME`/nameserver option Vercel recommends.
   - `CNAME` `www` → `cname.vercel-dns.com`.
4. Wait for DNS propagation (minutes to a few hours). Vercel provisions HTTPS automatically.

## 4. Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Things to swap in later

- **`public/resume.pdf`** — currently `Sagarpreet_Hooda.pdf`. Replace anytime.
- **`public/og.svg`** — social preview card. SVG works, but for best compatibility
  across LinkedIn/X, export a 1200×630 **PNG** named `og.png` and update the two
  `images` references in `app/layout.tsx`.
- **3D hero** — the orb is built with React Three Fiber in `components/HeroOrb.tsx`.
  If you later want a Spline scene instead, drop in `@splinetool/react-spline` and
  replace the `<Orb />` canvas with `<Spline scene="YOUR_URL" />` inside a `<Suspense>`.
- **Contact form** — currently opens the visitor's mail client via `mailto:` to
  `sagarhooda.uscan@gmail.com`. To capture submissions without email, wire the
  `onSubmit` in `components/Contact.tsx` to a free endpoint like Formspree or Resend.
