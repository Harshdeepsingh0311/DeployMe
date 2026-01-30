"use client"

type Skill = {
  id: string
  name: string
}

export function PortfolioSkills({ skills }: { skills: Skill[] }) {
  if (!skills || skills.length === 0) return null
  return (
    <section id="skills" className="py-32 space-y-12 border-b border-gray-800">

      <div className="mb-12">
        <h2 className="text-4xl font-bold">Skills</h2>
        <p className="text-cyan-400/70">My technical toolbox</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill.id}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 text-sm hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  )
}
