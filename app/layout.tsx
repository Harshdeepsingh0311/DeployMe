import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { CursorAnimation } from "@/components/cursor-animation"
import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PortfolioEngine - Your Portfolio, Engineered in Minutes",
  description:
    "A high-performance, minimalist portfolio builder designed for developers. No drag-and-drop fluff—just clean code, Markdown support, and dark mode by default.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <Navbar />
        <Toaster />
        {children}
        <CursorAnimation />
      </body>
    </html>
  )
}
