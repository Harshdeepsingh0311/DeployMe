import { Code2, Zap, Github, Globe, Minimize2, Lock } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Markdown Driven",
    description: "Write your project descriptions in the format you already use. No WYSIWYG editors.",
  },
  {
    icon: Zap,
    title: "SEO Optimized",
    description: "Blazing fast load times and clean metadata so recruiters actually find you.",
  },
  {
    icon: Github,
    title: "GitHub Integration",
    description: 'Sync your repositories directly to your "Projects" section with one click.',
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Connect your name.dev or name.com with zero configuration required.",
  },
  {
    icon: Minimize2,
    title: "Zero Bloat",
    description: "No heavy tracking scripts or unnecessary CSS. Just raw performance.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data stays yours. No analytics tracking without your explicit consent.",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="relative z-10 px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Built for developers</h2>
          <p className="text-lg text-muted-foreground">Everything you need to showcase your work, nothing you don't.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition-colors group-hover:bg-cyan-500/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
