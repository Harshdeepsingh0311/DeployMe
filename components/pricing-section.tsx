import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for students and first-time portfolios",
    features: [
      "Subdomain (yourname.deployme.dev)",
      "3 projects",
      "Markdown editor",
      "Dark mode",
      "GitHub integration",
    ],
    cta: "Create free portfolios",
    popular: false,
  },
  {
    name: "Pro",
    price: "$5",
    period: "/month",
    description: "For developers who want custom domains, unlimited projects, and branding control",
    features: [
      "Custom domain",
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Early access to new themes",
      "Remove branding",
    ],
    cta: "Go Pro",
    popular: true,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-lg border p-8 ${
                plan.popular ? "border-cyan-500 bg-cyan-500/5 shadow-lg shadow-cyan-500/20" : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-4 py-1 text-xs font-semibold text-black">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>

              <Button
                className={`mb-8 w-full ${plan.popular ? "bg-cyan-500 hover:bg-cyan-600 text-black" : ""}`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
