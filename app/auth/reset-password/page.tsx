"use client"

export const dynamic = "force-dynamic"

import { supabase } from "@/utils/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpdate = async () => {
    setError(null)

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    alert("Password updated successfully.")
    router.push("/login")
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

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  )
}
