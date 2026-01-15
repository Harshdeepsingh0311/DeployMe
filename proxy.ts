import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  /**
   * ✅ 1. Always allow these routes (NO AUTH CHECKS)
   * These routes must never be intercepted or redirected
   */
  if (
    pathname.startsWith("/auth/reset-password") ||
    pathname.startsWith("/auth/forget-password") ||
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next()
  }

  /**
   * ✅ 2. Create response + Supabase server client
   */
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          res.cookies.set({ name, value: "", ...options })
        },
      },
    }
  )

  /**
   * ✅ 3. Read session ONCE
   */
  return supabase.auth.getSession().then(({ data }) => {
    const session = data.session

    /**
     * 🔒 Protect dashboard routes
     */
    if (!session && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    /**
     * 🚫 Prevent logged-in users from auth pages
     * (EXCEPT reset-password which was already excluded above)
     */
    if (session && pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    /**
     * ✅ Allow everything else
     */
    return res
  })
}

/**
 * ✅ Apply middleware to all routes except static assets
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
