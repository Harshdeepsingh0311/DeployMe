"use client"

import { Github, Linkedin, Mail, MapPin } from "lucide-react"

type SocialLinks = {
  mail?: string
  github?: string
  leetcode?: string
  linkedin?: string
}

type Profile = {
  name: string
  bio: string
  location: string
  social_links: SocialLinks
}

export function PortfolioAbout({ profile }: { profile: Profile }) {
  const { name, bio, location, social_links } = profile

  return (
    <section id="about" className="py-32 space-y-8 border-b border-gray-800">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-5xl">👋</span> Hi, I'm
          </h1>
          <h2 className="text-6xl md:text-6xl font-bold text-white">
            {name}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <MapPin className="w-5 h-5" />
          <span>{location}</span>
        </div>

        <div className="flex gap-3 pt-4">
          {social_links?.mail && (
            <a
              href={`mailto:${social_links.mail}`}
              className="p-3 rounded-lg bg-gray-900 border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-900/80 transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
            </a>
          )}

          {social_links?.github && (
            <a
              href={social_links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-900 border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-900/80 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
            </a>
          )}

          {social_links?.linkedin && (
            <a
              href={social_links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-900 border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-900/80 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
            </a>
          )}
        </div>

        <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
          {bio}
        </p>
      </div>
    </section>
  )
}
