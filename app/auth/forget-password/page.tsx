"use client"

import { supabase } from "@/utils/supabase/client"
import { useState } from "react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleReset = async () => {
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://deployme-dev.vercel.app/auth/callback`,
    })

    setMessage("If an account with this email exists, a password reset link has been sent.")

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input w-full mb-3"
      />

      <button
        onClick={handleReset}
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      {message && <p className="text-sm mt-3">{message}</p>}
    </div>
  )
}
