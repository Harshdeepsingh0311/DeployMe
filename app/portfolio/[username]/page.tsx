import { notFound } from "next/navigation"
import { createSupabaseServerClient } from "@/utils/supabase/server"
import PortfolioClient from "@/components/portfolio/portfolio-client"
import { Metadata } from "next";
// import { getProfileByUsername } from "@/utils/data";

export const revalidate = 60;

export async function generateMetadata(
  { params }: { params: { username: string } }
): Promise<Metadata> {
  const { username } = await params
  const supabase = await createSupabaseServerClient()

  /* ---------------- PROFILE ---------------- */
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username.toLowerCase())
    .maybeSingle()
  // const profile = await getProfileByUsername(params.username);

  if (!profile) {
    return {
      title: "Portfolio not found",
      robots: { index: false, follow: false },
    };
  }

  const fullName = profile.full_name;

  const description =
    profile.bio ??
    `${fullName} | View projects, skills, and experience.`;

  const url = `https://localhost:3000/${profile.username}`;

  return {
    title: `${fullName} | Portfolio`,
    description,
    alternates: {
      canonical: url
    },

    openGraph: {
      title: `${fullName} | Portfolio`,
      description,
      url,
      type: "profile",
      images: [
        {
          url: "https://localhost:3000/og-default.png",
          width: 1200,
          height: 630
        }
      ]
    },

    twitter: {
      card: "summary_large_image",
      title: `${fullName} | Portfolio`,
      description
    }
  };
}




export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  /* ---------------- PROFILE ---------------- */
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username.toLowerCase())
    .maybeSingle()

  if (!profile) notFound()

  const isOwner = user?.id === profile.id

  let resumeUrl: string | null = null;

  if (profile?.resume_url) {
    const { data } = supabase
      .storage
      .from("resume")
      .getPublicUrl(profile.resume_url);

    resumeUrl = data.publicUrl;
  }

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
      isOwner = {isOwner}
      profile={{
        id: profile.id,
        username: profile.username,

        /* 🔑 NORMALIZED FIELDS */
        name: profile.full_name,
        bio: profile.bio,
        location: profile.location,
        resume_url: resumeUrl,

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
