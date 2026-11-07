import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./wanderlust.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WanderLust — Be a Traveller",
  description:
    "Exceptional stays in real destinations — from the Pyramids of Giza and the Red Sea to Alaska, Hawaii and beyond. Prices in USD & EGP.",
  keywords: [
    "WanderLust",
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
  authors: [{ name: "WanderLust" }],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
