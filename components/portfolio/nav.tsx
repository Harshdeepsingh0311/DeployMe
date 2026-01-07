"use client"

import { Button } from "@/components/ui/button"
import { Download, Menu, X } from "lucide-react"
import { useState } from "react"

type Profile = {
  name: string
  resume_url?: string | null
}

export function PortfolioNav({ profile }: { profile: Profile }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-black/50 border-b border-cyan-500/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Name */}
        <div className="text-2xl font-bold text-white">
          {profile.name}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
            About
          </a>
          <a href="#experience" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
            Experience
          </a>
          <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
            Projects
          </a>
          <a href="#skills" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
            Skills
          </a>
        </div>

        {/* Desktop Resume */}
        {profile.resume_url && (
          <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
            <Button className="hidden md:flex bg-cyan-500 hover:bg-cyan-600 text-black gap-2 font-semibold">
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </a>
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-400"
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-cyan-500/10 bg-black/95 p-4 space-y-3">
          <a href="#about" className="block text-gray-400 hover:text-cyan-400">
            About
          </a>
          <a href="#experience" className="block text-gray-400 hover:text-cyan-400">
            Experience
          </a>
          <a href="#projects" className="block text-gray-400 hover:text-cyan-400">
            Projects
          </a>
          <a href="#skills" className="block text-gray-400 hover:text-cyan-400">
            Skills
          </a>

          {profile.resume_url && (
            <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black">
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </a>
          )}
        </div>
      )}
    </nav>
  )
}
