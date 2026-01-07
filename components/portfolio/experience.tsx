"use client"

export function PortfolioExperience() {
  const experiences = [
    {
      role: "Senior Frontend Engineer",
      company: "Tech Company Inc",
      period: "2022 - Present",
      description:
        "Led the redesign of the entire product dashboard, improving performance by 40% and reducing bundle size by 35%.",
    },
    {
      role: "Full Stack Engineer",
      company: "Startup Co",
      period: "2020 - 2022",
      description:
        "Built and shipped multiple features for the core platform, mentored junior engineers, and established coding standards.",
    },
    {
      role: "Frontend Developer",
      company: "Digital Agency",
      period: "2019 - 2020",
      description:
        "Developed responsive web applications for diverse clients, optimized SEO, and improved user engagement.",
    },
  ]

  return (
    <section id="experience" className="py-32 space-y-12 border-b border-gray-800">
      <h2 className="text-4xl font-bold">Experience</h2>

      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-8 pb-8 group">
            <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 ring-4 ring-black transition-colors"></div>
            {idx !== experiences.length - 1 && (
              <div className="absolute left-2 top-4 w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-gray-800"></div>
            )}

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
              <p className="text-gray-400">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.period}</p>
              <p className="text-gray-400 mt-3 leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
