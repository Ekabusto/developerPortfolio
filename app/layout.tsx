import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Outfit, Syne } from "next/font/google"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "600", "700", "800"] })

export const metadata: Metadata = {
  title: "Ekaitz Busto | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, Python, and modern web technologies. Building web applications, MES systems, and data tools.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Python", "Web Development", "Ekaitz Busto", "MES", "Generative AI"],
  authors: [{ name: "Ekaitz Busto" }],
  creator: "Ekaitz Busto",
  publisher: "Ekaitz Busto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ekaitzbusto.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ekaitz Busto | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Python, and modern web technologies. Building web applications, MES systems, and data tools.",
    url: "https://ekaitzbusto.dev",
    siteName: "Ekaitz Busto Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekaitz Busto | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Python, and modern web technologies. Building web applications, MES systems, and data tools.",
    creator: "@ekaitzbusto",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ekaitz Busto",
  url: "https://ekaitzbusto.dev",
  jobTitle: "Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, Python, and modern web technologies.",
  sameAs: [
    "https://github.com/Ekabusto",
    "https://linkedin.com/in/ekaitzbusto",
  ],
  knowsAbout: ["React", "Next.js", "TypeScript", "Python", "Node.js", "MES Systems", "Generative AI", "Azure"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${syne.variable} font-sans`}>{children}</body>
    </html>
  )
}
