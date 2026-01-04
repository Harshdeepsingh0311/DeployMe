import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export function proxy(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // IMPORTANT: middleware must be sync-compatible
  // Supabase internally handles async
  return supabase.auth
    .getSession()
    .then(({ data: { session } }) => {
      const pathname = req.nextUrl.pathname

      if (!session && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(
          new URL('/auth/login', req.url)
        )
      }

      if (session && pathname.startsWith('/auth')) {
        return NextResponse.redirect(
          new URL('/dashboard', req.url)
        )
      }

      return res
    })
}
