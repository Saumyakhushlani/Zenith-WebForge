import { Kalam, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const kalam = Kalam({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
  display: "swap",
});

const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-patrick",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zenith-webforge.vercel.app"),
  title: "WEB FORGE 2026 // Zenith Programming Club // MANIT Bhopal",
  description: "A 12-hour high-intensity virtual hackathon testing rapid prototyping and shipping MVPs under pressure. Hosted by Zenith, Programming Club MANIT Bhopal. Strictly 3-member squads (1 girl compulsory).",
  keywords: ["Web Forge", "Zenith MANIT", "MANIT Bhopal", "Hackathon 2026", "Programming Club", "Web Development"],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Web Forge 2026 // Zenith MANIT",
    description: "12-Hour Virtual Hackathon on 22nd October 2026 by Zenith - Programming Club MANIT Bhopal. Strictly 3-member squads (1 girl compulsory). Register your team now!",
    url: "/",
    siteName: "Web Forge 2026",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Web Forge 2026 Hackathon Banner - Zenith Programming Club MANIT",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Forge 2026 // Zenith MANIT",
    description: "12-Hour Virtual Hackathon by Zenith - Programming Club MANIT Bhopal. Strictly 3-member squads (1 girl compulsory).",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${kalam.variable} ${patrickHand.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#fdfbf7] text-[#2d2d2d] font-patrick antialiased selection:bg-[#fff9c4] selection:text-[#2d2d2d] paper-dots">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
