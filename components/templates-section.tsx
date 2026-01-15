"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const templates = [
  {
    name: "The Modern Paper",
    description: "Clean, Swiss-inspired grid layout",
    preview: "/comingSoon.png",
    link: "/coming-soon"
  },
  {
    name: "Dark Theme",
    description: "Monochrome, Professional and Recruiter's favourite",
    preview: "/darkPortfolio.png",
    link: "/portfolio/demo"
  },
  {
    name: "The Glass",
    description: "Glassmorphic UI with depth",
    preview: "/comingSoon.png",
    link: "/coming-soon"
  },
]

export function TemplatesSection() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <section id="templates" className="relative z-10 px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Minimalist Templates</h2>
          <p className="mb-8 text-lg text-muted-foreground">Start with a clean foundation. Switch themes instantly.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {templates.map((template, index) => (
            <div key={index} className="group overflow-hidden rounded-lg border border-border bg-card">
              <Link href={template.link} target="_blank" rel="noopener noreferrer">
                <div className="aspect-video overflow-hidden bg-muted">
                  <Image
                    src={template.preview || "/placeholder.svg"}
                    alt={`${template.name} Template Screenshot`}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    width={1200}
                    height={750}
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
