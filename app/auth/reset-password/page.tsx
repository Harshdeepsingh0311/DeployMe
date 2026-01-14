"use client"

export const dynamic = "force-dynamic"

import { supabase } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  // 🔑 THIS IS THE KEY PART
  useEffect(() => {
    const exchange = async () => {
      const { error } =
        await supabase.auth.exchangeCodeForSession(
          window.location.href
        )

      if (error) {
        console.error("Exchange failed:", error)
        setError("Reset link is invalid or expired.")
        return
      }

      // ✅ session is now created
      setReady(true)
    }

    exchange()
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

  if (!ready) {
    return <p className="text-center mt-20">Verifying reset link…</p>
  }

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input w-full mb-3"
        placeholder="New password"
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        onClick={handleUpdate}
        className="btn btn-primary w-full"
      >
        Update Password
      </button>
    </div>
  )
}
