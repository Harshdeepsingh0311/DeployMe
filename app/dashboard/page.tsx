import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/utils/supabase/server"
import DashboardClient from "@/components/dashboard/dashboard-client"
import { Navbar } from "@/components/navbar"
import { FooterWithoutCTA } from "@/components/footer-without-cta"
import { cookies } from "next/headers"

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
    client_id,
    title,
    description,
    tech_stack,
    git_link,
    live_link
  `).eq("profile_id", profile.id)

  /* ---------- ACHIEVEMENTS ---------- */
  const { data: achievements } = await supabase
    .from("achievements")
    .select(`
    id,
    title,
    category,
    issuer,
    date,
    description
  `)
    .eq("profile_id", profile.id)
    .order("date", { ascending: false })


  const normalizedProjects =
    projects?.map((p) => ({
      id: p.id,
      client_id: p.client_id,
      title: p.title,
      description: p.description,
      image: null,
      tech_stack: p.tech_stack ?? [],
      git_link: p.git_link ?? null,
      live_link: p.live_link ?? null,
    })) ?? []

  const normalizedAchievements =
    achievements?.map((a) => ({
      id: a.id,
      client_id: a.id, // 👈 important for frontend matching
      title: a.title,
      category: a.category,
      issuer: a.issuer,
      date: a.date?.slice(0, 7) ?? "",
      description: a.description,
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
        achievements={normalizedAchievements}
      />
      <FooterWithoutCTA />
    </div>

  )
}
