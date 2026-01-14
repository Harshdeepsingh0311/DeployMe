"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import PersonalDetailsSection from "@/components/dashboard/personal-details-section"
import SkillsSection from "@/components/dashboard/skills-section"
import ExperienceSection from "@/components/dashboard/experience-section"
import ProjectsSection from "@/components/dashboard/projects-section"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
/* ================= TYPES ================= */

interface Project {
  id?: string
  title: string
  description: string
  image: File | null
  tech_stack: string[]
  git_link: string | null
  live_link: string | null
}

interface PortfolioData {
  personal: {
    username: string
    fullName: string
    email: string
    password: string
    bio: string
    location: string
    resume: File | null
    socialLinks: {
      email: string
      github: string
      leetcode: string
      linkedin: string
    }
  }
  skills: { id?: string; name: string }[]
  experience: any[]
  projects: Project[]
}

type Props = {
  profile: any
  skills: { id: string; name: string }[]
  experience: any[]
  projects: Project[]
}

export default function DashboardClient({
  profile,
  skills,
  experience,
  projects,
}: Props) {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    personal: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      bio: "",
      location: "",
      resume: null,
      socialLinks: {
        email: "",
        github: "",
        leetcode: "",
        linkedin: "",
      },
    },
    skills: [],
    experience: [],
    projects: [],
  })
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  /* ================= PREFILL ================= */

  useEffect(() => {
    setPortfolioData({
      personal: {
        username: profile.username ?? "",
        fullName: profile.full_name ?? "",
        email: profile.email ?? "",
        password: "",
        bio: profile.bio ?? "",
        location: profile.location ?? "",
        resume: null,
        socialLinks: {
          email: profile.social_links?.email ?? "",
          github: profile.social_links?.github ?? "",
          leetcode: profile.social_links?.leetcode ?? "",
          linkedin: profile.social_links?.linkedin ?? "",
        },
      },
      skills,
      experience,
      projects,
    })
  }, [profile, skills, experience, projects])

  /* ================= UPLOAD HELPERS ================= */

  const uploadResume = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("profileId", profile.id)

    const res = await fetch("/api/upload/resume", {
      method: "POST",
      body: formData,
      credentials: "include",
    })

    if (!res.ok) throw new Error("Resume upload failed")

    const data = await res.json()
    return data.url
  }

  const uploadProjectImage = async (projectId: string, file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("projectId", projectId)

    const res = await fetch("/api/upload/project-image", {
      method: "POST",
      body: formData,
      credentials: "include",
    })

    if (!res.ok) throw new Error("Project image upload failed")

    const data = await res.json()
    return data.url
  }

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updatedData: PortfolioData = structuredClone(portfolioData)

      /* ---------- RESUME ---------- */
      if (portfolioData.personal.resume) {
        await uploadResume(portfolioData.personal.resume)
        updatedData.personal.resume = null
      }

      /* ---------- DB UPDATE ---------- */
      const res = await fetch("/api/portfolio/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })

      if (!res.ok) throw new Error("Update failed")

      /* ---------- PROJECT IMAGES (ISSUE #3 FIX) ---------- */
      for (const project of portfolioData.projects) {
        if (
          project.image &&
          typeof project.id === "string" &&
          project.id.length > 0
        ) {
          await uploadProjectImage(project.id, project.image)
        }
      }

      toast({
        title: "Portfolio updated",
        description: "Your changes have been saved successfully.",
      })

      router.push(`/portfolio/${portfolioData.personal.username}`)
    } catch (err) {
      console.error(err)
      toast({
        title: "Update failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Hi, {profile.full_name}
          </h1>
          <p className="text-muted-foreground">
            Create and customize your professional portfolio
          </p>
          <Link href={`/portfolio/${profile.username}`}>
            <Button
              type="button"
              className="bg-cyan-500 hover:bg-cyan-600 text-black mt-5"
            >
              View Portfolio
            </Button>
          </Link>

        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <PersonalDetailsSection
            data={portfolioData.personal}
            profile={profile}
            onChange={(personal) =>
              setPortfolioData((p) => ({ ...p, personal }))
            }
          />

          <SkillsSection
            skills={portfolioData.skills}
            onChange={(skills) =>
              setPortfolioData((p) => ({ ...p, skills }))
            }
          />

          <ExperienceSection
            experiences={portfolioData.experience}
            onChange={(experience) =>
              setPortfolioData((p) => ({ ...p, experience }))
            }
          />

          <ProjectsSection
            projects={portfolioData.projects}
            onChange={(projects) =>
              setPortfolioData((p) => ({ ...p, projects }))
            }
          />

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-6"
            >
              {isLoading ? "Updating..." : "Update Portfolio"}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
