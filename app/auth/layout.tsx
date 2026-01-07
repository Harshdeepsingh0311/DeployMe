import { CursorAnimation } from "@/components/cursor-animation"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import type React from "react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="relative min-h-screen bg-background flex items-center justify-center px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 h-72 w-72 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <Navbar />
        {children}
        <CursorAnimation />
      </div>
    </div>
  )
}
