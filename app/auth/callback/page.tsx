// app/auth/callback/page.tsx
"use client"

import { supabase } from "@/utils/supabase/client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.exchangeCodeForSession(window.location.href)
      .then(() => router.replace("/auth/reset-password"))
  }, [])

  return <p>Verifying...</p>
}
