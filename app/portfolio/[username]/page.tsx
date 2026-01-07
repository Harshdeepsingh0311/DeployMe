"use client"

import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioAbout } from "@/components/portfolio/about"
import { PortfolioExperience } from "@/components/portfolio/experience"
import { PortfolioProjects } from "@/components/portfolio/projects"
import { PortfolioSkills } from "@/components/portfolio/skills"
import { PortfolioFooter } from "@/components/portfolio/footer"

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <PortfolioNav />
        <main className="max-w-6xl mx-auto px-6 py-20">
          <PortfolioAbout />
          <PortfolioExperience />
          <PortfolioProjects />
          <PortfolioSkills />
        </main>
        <PortfolioFooter />
      </div>
    </div>
  )
}
