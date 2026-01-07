"use client"

import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

type SocialLinks = {
  mail?: string
  github?: string
  linkedin?: string
  twitter?: string
}

type Profile = {
  name: string
  social_links: SocialLinks
}

export function PortfolioFooter({ profile }: { profile: Profile }) {
  const { name, social_links } = profile

  return (
    <footer className="border-t border-gray-800 bg-black/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-cyan-400 font-bold mb-4">Get In Touch</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              I'm always interested in hearing about new projects and opportunities.
            </p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-cyan-400 font-bold mb-4">Follow</h3>
            <div className="flex gap-4">
              {social_links?.mail && (
                <a
                  href={`mailto:${social_links.mail}`}
                  className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}

              {social_links?.github && (
                <a
                  href={social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}

              {social_links?.linkedin && (
                <a
                  href={social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p>Powered by @<Link href={'/'}>DeployMe</Link></p>
        </div>
      </div>
    </footer>
  )
}
