"use client"
import { CursorAnimation } from "@/components/cursor-animation"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { SocialProof } from "@/components/social-proof"
import { TemplatesSection } from "@/components/templates-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function PortfolioBuilderPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <main>
        <Navbar />
        <CursorAnimation />
        <HeroSection />
        <FeaturesGrid />
        <SocialProof />
        <TemplatesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
