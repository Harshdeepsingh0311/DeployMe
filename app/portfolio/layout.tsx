import type React from "react"
import type { Metadata } from "next"
import { CursorAnimation } from "@/components/cursor-animation"

export const metadata: Metadata = {
  title: "Portfolio | DeployMe",
  description: "A premium portfolio showcasing professional work and experience.",
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <CursorAnimation />
      {children}
    </div>
  )
}

