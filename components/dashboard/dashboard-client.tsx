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
import { CopyUrlButton } from "../copy-url-button"
import { Input } from "../ui/input"
import AchievementsSection from "./achievements-section"
/* ================= TYPES ================= */

interface Project {
  id?: string
  client_id: string   // ✅ REQUIRED
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
  achievements: any[]
}

type Props = {
  profile: any
  skills: { id: string; name: string }[]
  experience: any[]
  projects: Project[]
  achievements: any[]
}

export default function DashboardClient({
  profile,
  skills,
  experience,
  projects,
  achievements
}: Props) {
  const portfolioUrl = `https://deployme-dev.vercel.app/portfolio/${profile.username}`
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
    achievements: [],
  })
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [autoFillStatus, setAutoFillStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

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
      achievements
    })
  }, [profile, skills, experience, projects, achievements])

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

      // Resume upload
      if (portfolioData.personal.resume) {
        await uploadResume(portfolioData.personal.resume)
        updatedData.personal.resume = null
      }

      // Save DB first
      const res = await fetch("/api/portfolio/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })

      if (!res.ok) throw new Error("Update failed")

      const { projects: savedProjects } = await res.json()

      // ✅ CORRECT image upload mapping
      for (const saved of savedProjects) {
        const localProject = portfolioData.projects.find(
          (p) =>
            // new project match
            (saved.client_id && p.client_id === saved.client_id) ||
            // existing project match
            (p.id && p.id === saved.id)
        )

        if (localProject?.image && saved.id) {
          await uploadProjectImage(saved.id, localProject.image)
        }
      }

      // 🧹 OPTIONAL: clear image files after successful upload
      setPortfolioData((p) => ({
        ...p,
        projects: p.projects.map((proj) => ({
          ...proj,
          image: null,
        })),
      }))


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

  const fillForm = (data: any) => {
    setPortfolioData((prev) => ({
      ...prev,

      /* ================= PERSONAL ================= */
      personal: {
        ...prev.personal,
        fullName: prev.personal.fullName || data.profile?.full_name || "",
        email: prev.personal.email || data.profile?.email || "",
        bio: prev.personal.bio || data.profile?.bio || "",
        location: prev.personal.location || data.profile?.location || "",
        socialLinks: {
          ...prev.personal.socialLinks,
          ...data.profile?.social_links,
        },
      },

      /* ================= SKILLS ================= */
      skills: (() => {
        const cleaned: string[] = (data.skills || [])
          .filter((s: any): s is string => typeof s === "string")
          .map((s: string) => s.trim());

        const unique = Array.from(new Set(cleaned));

        return unique.map((s: string) => ({ name: s }));
      })(),

      /* ================= EXPERIENCE ================= */
      experience: (data.experience || []).map((exp: any) => ({
        ...exp,
        start_date: exp.start_date || "",
        end_date:
          exp.end_date === "Present" || exp.end_date == null
            ? ""
            : exp.end_date,
      })),

      /* ================= PROJECTS ================= */
      projects: (data.projects || []).map((p: any) => ({
        client_id: crypto.randomUUID(), // required
        title: p.title || "",
        description: p.description || "",
        image: null, // cannot autofill files
        tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack : [],
        git_link: p.git_link || null,
        live_link: p.live_link || null,
      })),

      /* ================= ACHIEVEMENTS ================= */
      achievements: (data.achievements || []).map((a: any) => ({
        client_id: crypto.randomUUID(),
        ...a,
        date: a.date === "null" || a.date == null ? "" : a.date,
      })),
    }));
  };

  const handleAutofill = async () => {
    try {
      setIsLoading(true);
      setAutoFillStatus({ type: null, message: "" });

      const res = await fetch("/api/autofill-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: profile.resume_url, // from Supabase public URL
        }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        setAutoFillStatus({
          type: "error",
          message: "Server returned an unexpected response.",
        });
        throw new Error("Autofill failed");
      }

      if (!res.ok) {
        setAutoFillStatus({
          type: "error",
          message: data?.error || "Failed to parse resume.",
        });
        throw new Error(data?.error || "Autofill failed");
      }

      fillForm(data);

      setAutoFillStatus({
        type: "success",
        message: "Autofill completed! Please review your details and enter dates yourselves.",
      });

    } catch (err) {
      console.error(err);
      setAutoFillStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };


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

          {autoFillStatus.type && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${autoFillStatus.type === "success"
                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                : "bg-red-500/10 text-red-600 border border-red-500/20"
                }`}
            >
              {autoFillStatus.message}
            </div>
          )}

          <Link href={`/portfolio/${profile.username}`}>
            <Button
              type="button"
              className="bg-cyan-500 hover:bg-cyan-600 text-black mt-5"
            >
              View Portfolio
            </Button>
          </Link>

          {!profile.resume_url && (
            <Button type="button" disabled={true} className="bg-cyan-500 hover:bg-cyan-600 text-black ml-3 mt-5">
              Upload Resume to enable Autofill
            </Button>
          )}
          {profile.resume_url && (
            <Button type="button" disabled={isLoading} onClick={handleAutofill} className="bg-cyan-500 hover:bg-cyan-600 text-black ml-3 mt-5">
              {isLoading ? "Autofill takes around 2-3 minutes in worst case..." : "Autofill from Resume!"}
            </Button>
          )}

          <div className="flex items-center gap-2 mt-5">
            <Input
              value={portfolioUrl}
              readOnly
              className="flex-1 px-3 py-2 border rounded-md text-sm bg-muted"
            />
            <CopyUrlButton url={portfolioUrl} />
          </div>


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

          <AchievementsSection
            achievements={portfolioData.achievements}
            onChange={(achievements) => setPortfolioData((p) => ({ ...p, achievements }))} />

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
