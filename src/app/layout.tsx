import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./travello.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Editorial display serif — Blacklane-style headlines */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Travello — Be a Traveller",
  description:
    "Exceptional stays in real destinations — from the Pyramids of Giza and the Red Sea to Alaska, Hawaii and beyond. Prices in USD & EGP.",
  keywords: [
    "Travello",
    "travel",
    "stays",
    "Egypt",
    "Pyramids",
    "Hurghada",
    "Alaska",
    "Hawaii",
    "USD",
    "EGP",
  ],
  authors: [{ name: "Travello" }],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
