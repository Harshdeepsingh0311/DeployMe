"use client"

export const dynamic = "force-dynamic"

import { supabase } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 1️⃣ Listen for recovery event
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // ✅ Link is valid, user can reset password
        setLoading(false)
      }
    })

    // 2️⃣ Fallback: if nothing happens after a short delay, mark invalid
    const timeout = setTimeout(async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        setError("Reset link is invalid or expired.")
        setLoading(false)
      }
    }, 1500)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  const handleUpdate = async () => {
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
    router.push("/login")
  }

  if (loading) {
    return <p className="text-center mt-20">Verifying reset link…</p>
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.push("/login")}
          className="btn btn-primary"
        >
          Go to Login
        </button>
      </div>
    )
  }

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

      <button
        onClick={handleUpdate}
        className="btn btn-primary w-full"
      >
        Update Password
      </button>
    </div>
  )
}
