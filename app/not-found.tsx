"use client"

import { CursorAnimation } from "@/components/cursor-animation"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden">
        <CursorAnimation />
      {/* Gradient blur backgrounds */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="mx-auto max-w-3xl text-center">
          {/* Animated 404 illustration */}
          <div className="mb-12 flex justify-center">
            <div className="relative w-48 h-48">
              {/* Main 404 text with animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text leading-none mb-4">
                    404
                  </div>
                  {/* Floating elements around 404 */}
                  <div
                    className="absolute top-8 -left-16 w-12 h-12 bg-cyan-500/20 rounded-lg animate-pulse"
                    style={{ animationDuration: "3s" }}
                  />
                  <div
                    className="absolute bottom-16 -right-12 w-16 h-16 border-2 border-cyan-500/30 rounded-full animate-spin"
                    style={{ animationDuration: "4s" }}
                  />
                  <div className="absolute top-24 right-0 w-8 h-8 bg-blue-500/20 rounded-lg animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="mb-4 text-4xl font-bold md:text-5xl text-foreground">Page not found</h1>

          {/* Description */}
          <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
            Oops! It looks like you've wandered into uncharted territory. The page you're looking for doesn't exist or
            has been moved.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center mb-12">
            <Link href="/">
              <Button size="lg" className="group bg-cyan-500 hover:bg-cyan-600 text-black text-lg px-8">
                <Home className="h-5 w-5" />
                Back to home
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-cyan-500/30 hover:bg-cyan-500/10 bg-transparent"
              >
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Helpful suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border bg-card/50 hover:border-cyan-500/30 transition-colors">
              <h3 className="font-semibold text-foreground mb-2">Build Portfolio</h3>
              <p className="text-sm text-muted-foreground">Create your stunning portfolio in minutes</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card/50 hover:border-cyan-500/30 transition-colors">
              <h3 className="font-semibold text-foreground mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">Learn how to get the most out of our platform</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card/50 hover:border-cyan-500/30 transition-colors">
              <h3 className="font-semibold text-foreground mb-2">Get Support</h3>
              <p className="text-sm text-muted-foreground">Reach out to our helpful support team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}
