"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowRight, Lock, Mail } from "lucide-react"
import { CursorAnimation } from "@/components/cursor-animation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Add authentication logic
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    
    <div className="w-full max-w-md">
      <CursorAnimation />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to your portfolio and continue building</p>
      </div>

      <Card className="px-0 border-cyan-500/20 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-400" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full group bg-cyan-500 hover:bg-cyan-600 text-black text-base py-6"
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">Don't have an account?</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-cyan-500/30 hover:bg-cyan-500/10 text-base py-6 bg-transparent"
            asChild
          >
            <Link href="/auth/register">Create Account</Link>
          </Button>
        </form>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Forgot your password?{" "}
        <Link href="#" className="text-cyan-400 hover:text-cyan-300 font-medium">
          Reset it here
        </Link>
      </p>
    </div>
  )
}
