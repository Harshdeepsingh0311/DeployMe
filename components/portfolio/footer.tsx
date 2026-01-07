"use client"

import { Mail, Github, Linkedin, Twitter } from "lucide-react"

export function PortfolioFooter() {
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
              {[
                { icon: Mail, label: "Email" },
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                  title={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© 2026 Jane Doe. All rights reserved.</p>
          <p>Designed & built with care</p>
        </div>
      </div>
    </footer>
  )
}
