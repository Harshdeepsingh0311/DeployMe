"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative z-10 flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
          <Terminal className="h-4 w-4" />
          <span>Built for developers, by developers</span>
        </div>

        <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
          Your portfolio,{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">engineered</span>{" "}
          in minutes.
        </h1>

        <p className="mx-auto mb-12 max-w-3xl text-pretty text-lg text-muted-foreground md:text-xl">
          A high-performance, minimalist portfolio builder designed for developers. No drag-and-drop fluff—just clean
          code, Markdown support, and dark mode by default.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="group bg-cyan-500 hover:bg-cyan-600 text-black text-lg px-8">
            Start Building – It's Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-cyan-500/30 hover:bg-cyan-500/10 bg-transparent"
          >
            Claim Your URL
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-500" />
            <span>Deploy in 2 minutes</span>
          </div>
        </div>
      </div>

      {/* Terminal Preview */}
      <div className="mt-20 w-full max-w-5xl">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-4 text-xs text-muted-foreground">portfolio.md</span>
          </div>
          <div className="p-6 font-mono text-sm">
            <div className="space-y-2">
              <div className="text-cyan-400"># John Doe</div>
              <div className="text-muted-foreground">## Senior Full-Stack Engineer</div>
              <div className="mt-4 text-foreground">
                Building high-performance web applications with **React**, **Node.js**, and **TypeScript**.
              </div>
              <div className="mt-4 text-cyan-400">### Featured Projects</div>
              <div className="mt-2 text-muted-foreground">- [AI-Powered Dashboard](#)</div>
              <div className="text-muted-foreground">- [Real-time Analytics Platform](#)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
