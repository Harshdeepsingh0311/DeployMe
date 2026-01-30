"use client"

interface Achievement {
  id: string
  title: string
  category: string
  issuer: string
  date: string | null
  description: string
}

export function PortfolioAchievements({achievements,}:{achievements:Achievement[]}) {
//   const achievements: Achievement[] = [
//     {
//       title: "Best Innovation Award",
//       category: "🏆 Competition",
//       issuer: "Tech Innovation Summit 2024",
//       date: "2024-03",
//       description: "Won first place for developing an AI-powered portfolio builder that revolutionizes how developers showcase their work.",
//     },
//     {
//       title: "Full Stack Development Certification",
//       category: "📜 Certification",
//       issuer: "Vercel Academy",
//       date: "2024-02",
//       description: "Completed comprehensive certification in modern full-stack development with Next.js and cloud deployment.",
//     },
//     {
//       title: "Dean's List",
//       category: "🎓 Academic",
//       issuer: "Tech University",
//       date: "2023-12",
//       description: "Recognized for academic excellence with GPA above 3.8 and outstanding contributions to the computer science department.",
//     },
//     {
//       title: "Community Impact Award",
//       category: "🥇 Award",
//       issuer: "Developer Community",
//       date: "2023-11",
//       description: "Awarded for open-source contributions and mentoring 50+ junior developers in the community.",
//     },
//   ]
    if (!achievements || achievements.length===0) return null
  return (
    <section id="achievements" className="py-20 border-t border-cyan-500/10">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-2">Achievements</h2>
        <p className="text-cyan-400/70">Recognitions and accomplishments</p>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-6 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/5"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 to-transparent transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{achievement.category.split(" ")[0]}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-medium">
                  {achievement.category.split(" ").slice(1).join(" ")}
                </span>
              </div>

              <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">
                {achievement.title}
              </h3>

              <div className="flex items-center justify-between text-sm">
                <span className="text-cyan-400/80">{achievement.issuer}</span>
                <span className="text-muted-foreground">
                  {achievement.date ? new Date(achievement.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  }):"Recently"}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>

              <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent group-hover:from-cyan-500/60 transition-all duration-300 mt-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
