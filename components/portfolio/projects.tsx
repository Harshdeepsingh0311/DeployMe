"use client"

import { Github, ExternalLink } from "lucide-react"

export function PortfolioProjects() {
  const projects = [
    {
      title: "Design System",
      description:
        "Comprehensive component library with 50+ components, accessibility guidelines, and design tokens for consistent UI.",
      image: "/design-system-dashboard.png",
      technologies: ["React", "TypeScript", "Storybook"],
      links: { github: "#", demo: "#" },
    },
    {
      title: "Analytics Dashboard",
      description:
        "Real-time analytics platform with interactive charts, data visualization, and custom reporting capabilities.",
      image: "/analytics-dashboard.png",
      technologies: ["React", "Chart.js", "Node.js"],
      links: { github: "#", demo: "#" },
    },
    {
      title: "E-commerce Platform",
      description:
        "Full-featured e-commerce platform with cart management, payment integration, and inventory tracking.",
      image: "/ecommerce-platform-concept.png",
      technologies: ["Next.js", "Stripe", "PostgreSQL"],
      links: { github: "#", demo: "#" },
    },
  ]

  return (
    <section id="projects" className="py-32 space-y-12 border-b border-gray-800">
      <h2 className="text-4xl font-bold">Featured Projects</h2>

      <div className="space-y-16">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="relative group overflow-hidden rounded-xl">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white">{project.title}</h3>
              <p className="text-gray-400 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href={project.links.github}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-700 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
                <a
                  href={project.links.demo}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Project
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
