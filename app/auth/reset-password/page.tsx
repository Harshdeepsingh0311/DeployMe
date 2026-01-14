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

  useEffect(() => {
    let active = true

    const run = async () => {
      const params = new URLSearchParams(window.location.search)

      // ✅ Ensure this is a recovery link
      if (params.get("type") !== "recovery") {
        setError("Invalid password reset link.")
        return
      }

      // ✅ Force logout to allow recovery session
      await supabase.auth.signOut()

      const { error } =
        await supabase.auth.exchangeCodeForSession(window.location.href)

      if (!active) return

      if (error) {
        console.error(error)
        setError("Reset link is invalid or expired.")
        return
      }

      setReady(true)
    }

    run()

    return () => {
      active = false
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
    router.replace("/login")
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
