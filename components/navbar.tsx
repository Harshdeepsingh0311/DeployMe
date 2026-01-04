"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { supabase } from "@/utils/supabase/client"
import { LogoutButton } from "@/components/logout-button"
import type { Session } from "@supabase/supabase-js"

export function Navbar() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav className="relative z-10 flex items-center justify-between border-b border-border px-6 py-4 backdrop-blur-sm lg:px-12">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-cyan-500" />
        <span className="text-xl font-bold">
          <Link href="/">DeployMe</Link>
        </span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Features
        </Link>
        <Link href="/#templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Templates
        </Link>
        <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Avoid flicker while loading */}
        {!loading && (
          session ? (
            <LogoutButton />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>

              <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-black" asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          )
        )}
      </div>
    </nav>
  )
}
