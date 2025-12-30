import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SupabaseDebugger from '@/components/supabase-debugger'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PortfolioEngine - Your Portfolio, Engineered in Minutes",
  description:
    "A high-performance, minimalist portfolio builder designed for developers. No drag-and-drop fluff—just clean code, Markdown support, and dark mode by default.",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SupabaseDebugger />
        {children}
      </body>
    </html>
  );
}
