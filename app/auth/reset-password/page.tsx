"use client"

export const dynamic = "force-dynamic"

import { supabase } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowRight, Lock, Eye, EyeOff } from "lucide-react"

export default function ResetPassword() {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  // 🔐 Handle recovery + session creation
  useEffect(() => {
    let active = true

    const run = async () => {

      // ✅ Exchange recovery code for session
      const { error } =
        await supabase.auth.exchangeCodeForSession(window.location.href)

      if (!active) return

      // if (error) {
      //   console.error(error)
      //   setError("Reset link is invalid or expired.")
      //   setLoading(false)
      //   return
      // }

      // ✅ Session now exists
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    run()

    return () => {
      active = false
    }
  }, [])

  // 🔁 Keep session in sync (handles rerenders / layout changes)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      return
    }

    alert("Password updated successfully.")
    router.replace("/dashboard")
  }

  // ⏳ Loading state
  if (loading) {
    return <p className="text-center mt-20">Verifying reset link…</p>
  }

  // ❌ Invalid or failed session
  if (!session) {
    return (
      <p className="text-center mt-20 text-red-500">
        Failed to verify reset link.
      </p>
    )
  }

  // ✅ Reset password UI
  return (
    // <div className="max-w-md mx-auto mt-10 text-center">
    //   <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

    //   <input
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     className="input w-full mb-3"
    //     placeholder="New password"
    //   />

    //   {error && <p className="text-red-500 mb-3">{error}</p>}

    //   <button
    //     onClick={handleUpdate}
    //     className="btn btn-primary w-full"
    //   >
    //     Update Password
    //   </button>
    // </div>

    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
        <p className="text-muted-foreground">Create a new password for your account</p>
      </div>

      <Card className="px-0 border-cyan-500/20 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleUpdate} className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading || password !== confirmPassword}
            className="w-full group bg-cyan-500 hover:bg-cyan-600 text-black text-base py-6 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
          </Button>
        </form>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Back to{" "}
        <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
