"use client"
import { CursorAnimation } from "@/components/home/cursor-animation"
import { Navbar } from "@/components/home/navbar"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesGrid } from "@/components/home/features-grid"
import { SocialProof } from "@/components/home/social-proof"
import { TemplatesSection } from "@/components/home/templates-section"
import { PricingSection } from "@/components/home/pricing-section"
import { Footer } from "@/components/home/footer"

export default function PortfolioBuilderPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <CursorAnimation />
      <Navbar />
      <main>
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
