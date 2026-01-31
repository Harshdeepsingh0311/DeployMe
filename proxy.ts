import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const res = NextResponse.next()

  if (
    pathname.startsWith("/auth/reset-password") ||
    pathname.startsWith("/auth/forget-password") ||
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/api")
  ) {
    return res
  }

  const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      getAll() {
        return req.cookies.getAll()
      },
      setAll(cookies) {
        cookies.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options)
        })
      },
    },
  }
)


  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session && pathname.startsWith("/dashboard")) {
    const url = req.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url, { headers: res.headers })
  }

  if (session && pathname.startsWith("/auth")) {
    const url = req.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url, { headers: res.headers })
  }

  return res
}


/**
 * ✅ Apply middleware to all routes except static assets
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
