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
  title: "WanderLust · Apple Edition — Explore the world, beautifully",
  description:
    "WanderLust Apple Edition: exceptional stays in the world's most breathtaking destinations. Prices in USD & EGP. Premium white theme with deep glassmorphism.",
  keywords: [
    "WanderLust",
    "travel",
    "stays",
    "Apple Edition",
    "glassmorphism",
    "USD",
    "EGP",
  ],
  authors: [{ name: "WanderLust" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
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
