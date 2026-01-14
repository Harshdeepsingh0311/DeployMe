import { createBrowserClient } from "@supabase/ssr"

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        if (typeof document === "undefined") return undefined
        const match = document.cookie.match(
          new RegExp(`(^| )${name}=([^;]+)`)
        )
        return match ? decodeURIComponent(match[2]) : undefined
      },
      set(name: string, value: string, options: any) {
        if (typeof document === "undefined") return
        document.cookie = `${name}=${encodeURIComponent(
          value
        )}; path=/`
      },
      remove(name: string, options: any) {
        if (typeof document === "undefined") return
        document.cookie = `${name}=; path=/; max-age=0`
      },
    },
  }
)
