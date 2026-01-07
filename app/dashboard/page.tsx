import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/utils/supabase/server"
import DashboardClient from "@/components/dashboard/dashboard-client"
import { Navbar } from "@/components/navbar"

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  /* ---------- PROFILE ---------- */
  const { data: profile } = await supabase
    .from("profiles")
    .select(`
      id,
      username,
      full_name,
      email,
      bio,
      location,
      resume_url,
      social_links
    `)
    .eq("id", user.id)
    .single()

  if (!profile) redirect("/auth/login")

  /* ---------- RESUME SIGNED URL ---------- */
  let resumeSignedUrl: string | null = null
  if (profile.resume_url) {
    const { data } = await supabase.storage
      .from("resume")
      .createSignedUrl(profile.resume_url, 60)

    resumeSignedUrl = data?.signedUrl ?? null
  }

  /* ---------- SKILLS ---------- */
  const { data: skills } = await supabase
    .from("skills")
    .select("id, name")
    .eq("profile_id", profile.id)

  /* ---------- EXPERIENCE ---------- */
  const { data: experience } = await supabase
    .from("experience")
    .select(`
      id,
      company,
      role,
      start_date,
      end_date,
      description
    `)
    .eq("profile_id", profile.id)

  /* ---------- PROJECTS ---------- */
  const { data: projects } = await supabase
    .from("projects")
    .select(`
    id,
    title,
    description,
    tech_stack,
    git_link,
    live_link
  `).eq("profile_id", profile.id)

  const normalizedProjects =
    projects?.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: null,
      tech_stack: p.tech_stack ?? [],
      git_link: p.git_link ?? null,
      live_link: p.live_link ?? null,
    })) ?? []




  const normalizedExperience =
    experience?.map((e) => ({
      id: e.id,
      company: e.company,
      role: e.role,
      startDate: e.start_date?.slice(0, 7) ?? "",
      endDate: e.end_date?.slice(0, 7) ?? "",
      description: e.description,
    })) ?? []

  return (
    <div>
      <Navbar />
      <DashboardClient
        profile={{ ...profile, resume_url: resumeSignedUrl }}
        skills={skills ?? []}
        experience={normalizedExperience}
        projects={normalizedProjects}
      />
    </div>

  )
}
