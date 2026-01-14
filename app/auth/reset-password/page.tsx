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

    if (!error) {
      router.push("/login")
    }
  }

  if (loading) return <p>Verifying reset link...</p>

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Password</button>
    </div>
  )
}
