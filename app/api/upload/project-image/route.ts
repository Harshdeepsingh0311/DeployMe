import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/utils/supabase/server"

function getStoragePath(publicUrl: string) {
  try {
    const url = new URL(publicUrl)
    const index = url.pathname.indexOf("/project-images/")
    if (index === -1) return null
    return url.pathname.slice(index + "/project-images/".length)
  } catch {
    return null
  }
}



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

  const { data: existingProject } = await supabase
    .from("projects")
    .select("image_url")
    .eq("id", projectId)
    .single()

  const oldImageUrl = existingProject?.image_url


  if (!(file instanceof File) || typeof projectId !== "string") {
    return NextResponse.json({ error: "Invalid upload data" }, { status: 400 })
  }

  const filePath = `${user.id}/${projectId}-${Date.now()}.png`

  //   console.log("UPLOAD DEBUG", {
  //   fileType: file?.constructor?.name,
  //   projectId,
  // })

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

  if (oldImageUrl) {
    const oldPath = getStoragePath(oldImageUrl)

    if (oldPath) {
      const { error: deleteError } = await supabase.storage
        .from("project-images")
        .remove([oldPath])

      if (deleteError) {
        console.error("❌ OLD IMAGE DELETE FAILED:", deleteError)
        // DO NOT fail the request
      }
    }
  }


  return NextResponse.json({ url: publicUrl })
}
