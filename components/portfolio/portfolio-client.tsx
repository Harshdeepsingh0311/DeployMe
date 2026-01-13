"use client"

import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioAbout } from "@/components/portfolio/about"
import { PortfolioExperience } from "@/components/portfolio/experience"
import { PortfolioProjects } from "@/components/portfolio/projects"
import { PortfolioSkills } from "@/components/portfolio/skills"
import { PortfolioFooter } from "@/components/portfolio/footer"

type SocialLinks = {
  mail?: string
  github?: string
  leetcode?: string
  linkedin?: string
}

type Experience = {
  id: string
  role: string
  company: string
  start_date: string
  end_date: string | null
  description: string
}

type Project = {
  id: string
  title: string
  description: string
  image_url: string
  git_link: string
  live_link: string
  tech_stack: string[]
}

type Skill = {
  id: string
  name: string
}

type Profile = {
  id: string
  username: string
  name: string
  bio: string
  location: string
  resume_url: string | null
  social_links: SocialLinks
  experiences: Experience[]
  projects: Project[]
  skills: Skill[]
}

export default function PortfolioClient({
  profile,
}: {
  profile: Profile
}) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <header>
          <PortfolioNav profile={profile} />
        </header>

        <main className="max-w-6xl mx-auto px-6 py-20">
          <section>
            <PortfolioAbout profile={profile} />
          </section>
          <section><PortfolioExperience experiences={profile.experiences} /></section>
          <section><PortfolioProjects projects={profile.projects} /></section>
          <section><PortfolioSkills skills={profile.skills} /></section>

        </main>

        <footer><PortfolioFooter profile={profile} /></footer>
        
      </div>
    </div>
  )
}
