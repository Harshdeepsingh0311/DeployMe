"use client"

import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between border-b border-border px-6 py-4 backdrop-blur-sm lg:px-12">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-cyan-500" />
        <span className="text-xl font-bold">PortfolioEngine</span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Features
        </a>
        <a href="#templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Templates
        </a>
        <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </a>
        <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Docs
        </a>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">
          Login
        </Button>
        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-black">
          Register
        </Button>
      </div>
    </nav>
  )
}
