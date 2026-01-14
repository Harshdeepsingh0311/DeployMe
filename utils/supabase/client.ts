import { createBrowserClient } from "@supabase/ssr"

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name) {
        if (typeof document === "undefined") return undefined
        return document.cookie
          .split("; ")
          .find(row => row.startsWith(name + "="))
          ?.split("=")[1]
      },
      set(name, value, options) {
        document.cookie = `${name}=${value}; path=/; ${
          options?.maxAge ? `max-age=${options.maxAge};` : ""
        } ${options?.secure ? "secure;" : ""} samesite=lax`
      },
      remove(name) {
        document.cookie = `${name}=; path=/; max-age=0`
      },
    },
  }
)
