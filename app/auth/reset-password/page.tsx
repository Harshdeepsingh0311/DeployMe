"use client"

export const dynamic = "force-dynamic"

import { supabase } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)

  // 🔑 CRITICAL: exchange recovery token for session
  useEffect(() => {
    const exchange = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (error) {
        console.error(error)
        router.replace("/login")
      } else {
        setLoading(false)
      }
    }

    exchange()
  }, [router])

  const handleUpdate = async () => {
    if (password.length < 8) {
      alert("Password must be at least 8 characters")
      return
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      alert(error.message)
    } else {
      alert("Password updated successfully")
      router.push("/login")
    }
  }

  if (loading) return <p>Verifying reset link...</p>

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input w-full mb-3"
      />

      <button onClick={handleUpdate} className="btn btn-primary w-full">
        Update Password
      </button>
    </div>
  )
}
