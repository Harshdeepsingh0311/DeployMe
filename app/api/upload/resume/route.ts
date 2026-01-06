import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/utils/supabase/server"

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file")
  const profileId = formData.get("profileId")

  if (!(file instanceof File) || typeof profileId !== "string") {
    return NextResponse.json({ error: "Invalid upload data" }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large" }, { status: 400 })
  }

  const filePath = `${profileId}/resume.pdf`

  const { error: uploadError } = await supabase.storage
    .from("resume")
    .upload(filePath, file, {
      upsert: true,
      contentType: "application/pdf",
    })

  if (uploadError) {
    console.error(uploadError)
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  await supabase
    .from("profiles")
    .update({ resume_url: filePath })
    .eq("id", profileId)

  return NextResponse.json({ url: filePath })
}
