"use client"

import { Github, Linkedin, Mail, MapPin } from "lucide-react"

export function PortfolioAbout() {
  return (
    <section id="about" className="py-32 space-y-8 border-b border-gray-800">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-5xl">👋</span> Hi, I'm 
          </h1>
          <h2 className="text-6xl md:text-6xl font-bold text-white">John Doe</h2>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <MapPin className="w-5 h-5" />
          <span>San Francisco, CA</span>
        </div>

        <div className="flex gap-3 pt-4">
          <a
            href="#"
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-900/80 transition-all"
          >
            <Mail className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
          </a>
          <a
            href="#"
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-900/80 transition-all"
          >
            <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
          </a>
          <a
            href="#"
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-900/80 transition-all"
          >
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
          </a>
        </div>

        <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
          Full-stack engineer passionate about building beautiful, accessible, and performant web experiences. I
          specialize in frontend architecture and design systems, with a focus on delivering exceptional user
          experiences.
        </p>
      </div>
    </section>
  )
}
