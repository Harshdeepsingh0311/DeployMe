import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/utils/supabase/server"

export async function GET() {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect("/auth/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("resume_url")
    .eq("id", user.id)
    .single()

  if (!profile?.resume_url) {
    return NextResponse.json({ error: "No resume found" }, { status: 404 })
  }

  const { data, error } = await supabase.storage
    .from("resume")
    .createSignedUrl(profile.resume_url, 300) // 5 minutes

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.redirect(data.signedUrl)
}
