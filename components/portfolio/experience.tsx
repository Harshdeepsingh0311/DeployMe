"use client"

type Experience = {
  id: string
  role: string
  company: string
  start_date: string
  end_date: string | null
  description: string
}

export function PortfolioExperience({
  experiences,
}: {
  experiences: Experience[]
}) {
  if (!experiences || experiences.length===0) return null
  return (
    <section id="experience" className="py-32 space-y-12 border-b border-gray-800">
      <div className="mb-12">
      <h2 className="text-4xl font-bold mb-2">Experience</h2>
      <p className="text-cyan-400/70">Roles, responsibilities, and real-world impact</p>
      </div>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="relative pl-8 pb-8 group">
            <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 ring-4 ring-black transition-colors"></div>

            {idx !== experiences.length - 1 && (
              <div className="absolute left-2 top-4 w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-gray-800"></div>
            )}

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                {exp.role}
              </h3>
              <p className="text-gray-400">{exp.company}</p>
              <p className="text-sm text-gray-500">
                {exp.start_date} – {exp.end_date ?? "Present"}
              </p>
              <p className="text-gray-400 mt-3 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
