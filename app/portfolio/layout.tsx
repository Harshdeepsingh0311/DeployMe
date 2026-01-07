import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio | PortfolioEngine",
  description: "A premium portfolio showcasing professional work and experience.",
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

