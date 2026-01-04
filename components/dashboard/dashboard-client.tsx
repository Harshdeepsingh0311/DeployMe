"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import PersonalDetailsSection from "@/components/dashboard/personal-details-section"
import SkillsSection from "@/components/dashboard/skills-section"
import ExperienceSection from "@/components/dashboard/experience-section"
import ProjectsSection from "@/components/dashboard/projects-section"

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
  skills: Array<{ id: string; name: string }>
  experience: Array<{
    id: string
    company: string
    role: string
    startDate: string
    endDate: string
    description: string
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    image: File | null
    technologies: string[]
  }>
}

type Props = {
  profile: {
    id: string
    username: string
    full_name: string | null
    resume_url: string | null
  }
}

export default function DashboardClient({profile}: Props) {
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

  const [isLoading, setIsLoading] = useState(false)

  const handlePersonalDetailsChange = (updatedPersonal: typeof portfolioData.personal) => {
    setPortfolioData((prev) => ({
      ...prev,
      personal: updatedPersonal,
    }))
  }

  const handleSkillsChange = (skills: typeof portfolioData.skills) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills,
    }))
  }

  const handleExperienceChange = (experience: typeof portfolioData.experience) => {
    setPortfolioData((prev) => ({
      ...prev,
      experience,
    }))
  }

  const handleProjectsChange = (projects: typeof portfolioData.projects) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Add portfolio submission logic
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Hi, {profile.full_name}</h1>
          <p className="text-muted-foreground">
            Create and customize your professional portfolio with all your achievements
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Details Section */}
          <PersonalDetailsSection data={portfolioData.personal} onChange={handlePersonalDetailsChange} profile={profile}/>

          {/* Skills Section */}
          <SkillsSection skills={portfolioData.skills} onChange={handleSkillsChange} />

          {/* Experience Section */}
          <ExperienceSection experiences={portfolioData.experience} onChange={handleExperienceChange} />

          {/* Projects Section */}
          <ProjectsSection projects={portfolioData.projects} onChange={handleProjectsChange} />

          {/* Submit Button */}
          <div className="flex gap-3 justify-end pt-4">
            <Button type="submit" disabled={isLoading} className="group bg-cyan-500 hover:bg-cyan-600 text-black px-6">
              {isLoading ? "Updating..." : "Update Portfolio"}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
