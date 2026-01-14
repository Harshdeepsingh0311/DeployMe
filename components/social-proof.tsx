import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiGo, SiRust } from "react-icons/si"

const techStack = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiGo, name: "Go" },
  { icon: SiRust, name: "Rust" },
]

const testimonials = [
  {
    quote:
      "Finally, a portfolio builder that doesn't make me cringe. Clean, fast, and built the way I'd code it myself.",
    author: "Sarah Chen",
    role: "Senior Engineer at Stripe",
  },
  {
    quote:
      "Hiring managers love it. The Markdown structure makes it so easy to scan and the load times are incredible.",
    author: "Michael Roberts",
    role: "Engineering Manager",
  },
  {
    quote: "Switched from my custom Jekyll site to this in 10 minutes. Never looked back.",
    author: "Alex Kumar",
    role: "Full-Stack Developer",
  },
]

export function SocialProof() {
  return (
    <section className="relative z-10 px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">The Developer's Choice</h2>
          <p className="text-lg text-muted-foreground">Built for developers at every stage — students, interns, and professionals.</p>
        </div>

        {/* Tech Stack Logos */}
        <div className="mb-20 flex flex-wrap items-center justify-center gap-12">
          {techStack.map((tech, index) => {
            const Icon = tech.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
              >
                <Icon className="h-12 w-12" />
                <span className="text-xs text-muted-foreground">{tech.name}</span>
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-lg border border-border bg-card p-6">
              <p className="mb-4 text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
