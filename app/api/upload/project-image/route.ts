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
  const projectId = formData.get("projectId")

  if (!(file instanceof File) || typeof projectId !== "string") {
    return NextResponse.json({ error: "Invalid upload data" }, { status: 400 })
  }

  const filePath = `${user.id}/${projectId}`

  console.log("UPLOAD DEBUG", {
  fileType: file?.constructor?.name,
  projectId,
})

  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(filePath, file, {
      upsert: true,
      contentType: file.type,
    })

  if (uploadError) {
    console.error(uploadError)
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const publicUrl = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath).data.publicUrl

  await supabase
    .from("projects")
    .update({ image_url: publicUrl })
    .eq("id", projectId)

  return NextResponse.json({ url: publicUrl })
}
