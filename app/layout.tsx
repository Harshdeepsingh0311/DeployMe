import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { CursorAnimation } from "@/components/cursor-animation";
import { Toaster } from "@/components/ui/toaster";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const title = "DeployMe - Your Portfolio, Engineered in Minutes";
const description =
  "Build and share your professional portfolio with projects, skills, and experience.";

const url = "https://deployme-dev.vercel.app";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    images: [
      {
        url: `${url}/og-default.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "udSSgU82c4kHZSQO0bTLRNdxHnJbdxnNeZAJ4XD526g",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        {/* <Navbar />
        <Toaster /> */}
        {children}
        {/* <CursorAnimation /> */}
      </body>
    </html>
  );
}
