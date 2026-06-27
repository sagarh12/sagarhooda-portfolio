import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://sagarpreethooda.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sagarpreet Hooda — Cybersecurity & Software Engineering",
    template: "%s · Sagarpreet Hooda",
  },
  description:
    "Sagarpreet Hooda — Honours CS student at York University, Senior Technical Student in Cybersecurity Operations at Toronto Hydro. SIEM, IAM, PowerShell automation, full-stack & ML projects. Open to co-op opportunities.",
  keywords: [
    "Sagarpreet Hooda",
    "Cybersecurity",
    "Software Engineering",
    "Co-op",
    "Internship",
    "QRadar",
    "SIEM",
    "IAM",
    "PowerShell",
    "Azure",
    "York University",
    "Lassonde",
    "Machine Learning",
  ],
  authors: [{ name: "Sagarpreet Hooda", url: SITE_URL }],
  creator: "Sagarpreet Hooda",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Sagarpreet Hooda — Cybersecurity & Software Engineering",
    description:
      "Cybersecurity operations + software engineering. SIEM, IAM, automation, and ML. Open to co-op opportunities.",
    siteName: "Sagarpreet Hooda",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Sagarpreet Hooda — Cybersecurity & Software Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagarpreet Hooda — Cybersecurity & Software Engineering",
    description:
      "Cybersecurity operations + software engineering. Open to co-op opportunities.",
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${inter.variable}`}>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
