import { notFound } from "next/navigation"
import { createSupabaseServerClient } from "@/utils/supabase/server"
import PortfolioClient from "@/components/portfolio/portfolio-client"

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createSupabaseServerClient()

  /* ---------------- PROFILE ---------------- */
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username.toLowerCase())
    .maybeSingle()

  if (!profile) notFound()

  /* ---------------- EXPERIENCES ---------------- */
  const { data: experiences } = await supabase
    .from("experience")
    .select("id, role, company, start_date, end_date, description")
    .eq("profile_id", profile.id)
    .order("start_date", { ascending: false })

  // console.log(experiences)

  /* ---------------- PROJECTS ---------------- */
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, description, image_url, git_link, live_link, tech_stack")
    .eq("profile_id", profile.id)

  /* ---------------- SKILLS ---------------- */
  const { data: skills } = await supabase
    .from("skills")
    .select("id, name")
    .eq("profile_id", profile.id)

  /* ---------------- NORMALIZE & RENDER ---------------- */
  return (
    <PortfolioClient
      profile={{
        id: profile.id,
        username: profile.username,

        /* 🔑 NORMALIZED FIELDS */
        name: profile.full_name,
        bio: profile.bio,
        location: profile.location,
        resume_url: profile.resume_url,

        social_links: {
          mail: profile.social_links?.email,
          github: profile.social_links?.github,
          leetcode: profile.social_links?.leetcode,
          linkedin: profile.social_links?.linkedin,
        },

        experiences: experiences ?? [],
        projects: projects ?? [],
        skills: skills ?? [],
      }}
    />
  )
}
