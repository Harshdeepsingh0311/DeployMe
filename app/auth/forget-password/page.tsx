"use client"

import { supabase } from "@/utils/supabase/client"
import { useState } from "react"
import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowRight, Mail, ArrowLeft } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleReset = async () => {
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://deployme-dev.vercel.app/auth/callback`,
    })

    alert("If an account with this email exists, a password reset link has been sent.")

    setLoading(false)
  }

  return (
    // <div className="max-w-md mx-auto mt-20">
    //   <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>

    //   <input
    //     type="email"
    //     placeholder="Enter your email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     className="input w-full mb-3"
    //   />

    //   <button
    //     onClick={handleReset}
    //     disabled={loading}
    //     className="btn btn-primary w-full"
    //   >
    //     {loading ? "Sending..." : "Send Reset Link"}
    //   </button>

    //   {message && <p className="text-sm mt-3">{message}</p>}
    // </div>

    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
        <p className="text-muted-foreground">No worries, we'll send you reset instructions to your email</p>
        {message && <p className="text-sm mt-3 text-cyan-400">{message}</p>}
      </div>

      <Card className="px-0 border-cyan-500/20 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleReset} className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-400" />
              Email Address
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full group bg-cyan-500 hover:bg-cyan-600 text-black text-base py-6"
          >
            {loading ? "Sending..." : "Send Reset Link"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
          </Button>
        </form>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
          Sign in instead
        </Link>
      </p>
    </div>
  )
}
