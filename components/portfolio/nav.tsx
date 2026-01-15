"use client"

import { Button } from "@/components/ui/button"
import { Download, Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

type Profile = {
  name: string
  resume_url?: string | null
}

export function PortfolioNav({ profile, isOwner }: { profile: Profile, isOwner: boolean }) {
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
        <div className="hidden md:flex">
          {profile.resume_url && (
          <Link href={profile.resume_url} target="_blank" rel="noopener noreferrer">
            <Button className=" bg-cyan-500 hover:bg-cyan-600 text-black m-1 font-semibold">
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </Link>
        )}

        {isOwner && (
          <Link href='/dashboard'>
            <Button className=" bg-gray-900 hover:bg-gray-800 text-gray-300 border m-1 border-gray-700 transition-colors font-semibold">
              Go back to Dashboard
            </Button>
          </Link>
        )}
        </div>
        

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
          {isOwner && (
          <Link href='/dashboard'>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-gray-300 border mt-2 border-gray-700 transition-colors font-semibold">
              Go to Dashboard
            </Button>
          </Link>
        )}
        </div>
      )}
    </nav>
  )
}
