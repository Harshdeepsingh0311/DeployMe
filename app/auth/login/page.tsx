"use client"

import type React from "react"

import { useState } from "react"
import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowRight, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [Loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard') // or wherever
    }
  }

  return (
    
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to your portfolio and continue building</p>
      </div>

      <Card className="px-0 border-cyan-500/20 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleLogin} className="space-y-6 p-6">
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

          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <Button
            type="submit"
            disabled={Loading}
            className="w-full group bg-cyan-500 hover:bg-cyan-600 text-black text-base py-6"
          >
            {Loading ? "Signing in..." : "Sign In"}
            {!Loading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
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
        <Link href="/auth/forget-password" className="text-cyan-400 hover:text-cyan-300 font-medium">
          Reset it here
        </Link>
      </p>
    </div>
  )
}
