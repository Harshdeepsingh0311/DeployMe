"use client"

export const dynamic = "force-dynamic"

import { supabase } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleRecovery = async () => {
      const url = window.location.href

      // ✅ Only exchange if code is present
      if (url.includes("code=")) {
        const { error } =
          await supabase.auth.exchangeCodeForSession(url)

        if (error) {
          console.error("Exchange failed:", error)
          router.replace("/login")
          return
        }
      }

      // ✅ NOW session should exist
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace("/login")
      } else {
        setLoading(false)
      }
    }

    handleRecovery()
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

  if (loading) return <p>Verifying reset link…</p>

  return (
    <div>
      <h1>Reset Password</h1>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleUpdate}>
        Update Password
      </button>
    </div>
  )
}
