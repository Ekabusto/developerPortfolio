import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ekaitz Busto | Full Stack Developer",
  description:
    "Full Stack Developer specializing in creating exceptional digital experiences with React, Next.js, and modern web technologies.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Web Development", "Ekaitz Busto"],
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
      "Full Stack Developer specializing in creating exceptional digital experiences with React, Next.js, and modern web technologies.",
    url: "https://ekaitzbusto.dev",
    siteName: "Ekaitz Busto Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ekaitz Busto - Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekaitz Busto | Full Stack Developer",
    description:
      "Full Stack Developer specializing in creating exceptional digital experiences with React, Next.js, and modern web technologies.",
    images: ["/og-image.png"],
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
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
