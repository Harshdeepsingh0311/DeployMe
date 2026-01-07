"use client"

export function PortfolioSkills() {
  const allSkills = [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "REST APIs",
    "Docker",
    "Git",
    "GitHub Actions",
    "AWS",
    "Vercel",
    "Figma",
    "UI Design",
    "Responsive Design",
    "Accessibility",
    "Design Systems",
  ]

  return (
    <section id="skills" className="py-32 space-y-12 border-b border-gray-800">
      <h2 className="text-4xl font-bold">Skills</h2>

      <div className="flex flex-wrap gap-3">
        {allSkills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 text-sm hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
