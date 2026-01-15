"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Menu, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { CursorAnimation } from "@/components/cursor-animation"

const sections = [
  { id: "about", title: "1. About DeployMe" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "accounts", title: "3. User Accounts" },
  { id: "content", title: "4. User Content" },
  { id: "hosting", title: "5. Portfolio Hosting & Access" },
  { id: "username", title: "6. Username & URL Policy" },
  { id: "availability", title: "7. Service Availability" },
  { id: "storage", title: "8. Data Storage & Security" },
  { id: "third-party", title: "9. Third-Party Services" },
  { id: "ip", title: "10. Intellectual Property" },
  { id: "prohibited", title: "11. Prohibited Use" },
  { id: "termination", title: "12. Termination" },
  { id: "disclaimer", title: "13. Disclaimer of Warranties" },
  { id: "liability", title: "14. Limitation of Liability" },
  { id: "changes", title: "15. Changes to Terms" },
  { id: "law", title: "16. Governing Law" },
  { id: "contact", title: "17. Contact Us" },
]

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("about")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <div>
        <Navbar />
        <div className="relative min-h-screen bg-background">
            <CursorAnimation />
      <div className="flex flex-col lg:flex-row">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block sticky top-0 h-screen w-full overflow-y-auto border-r border-border bg-card/30 backdrop-blur-sm lg:w-64 lg:max-w-xs">
          <div className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-cyan-400">Contents</h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeSection === section.id
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full flex-1 px-4 py-8 md:px-6 lg:px-12 lg:py-12">
          {/* Mobile/Tablet Menu Button */}
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg bg-card/50 p-2 text-cyan-400 hover:bg-card transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="mb-8 rounded-lg border border-border bg-card/50 backdrop-blur-sm p-4 lg:hidden">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          )}

          <div className="mx-auto w-full max-w-4xl">
            {/* Header */}
            <div className="mb-12">
              <h1 className="mb-4 text-5xl font-bold">Terms & Conditions</h1>
              <p className="text-lg text-muted-foreground">Last updated: January 2025</p>
            </div>

            {/* Introduction */}
            <div className="mb-12 rounded-lg border border-border bg-card/50 p-6">
              <p className="text-foreground leading-relaxed">
                Welcome to <span className="font-semibold text-cyan-400">DeployMe</span>. By accessing or using
                our website and services, you agree to be bound by these Terms & Conditions. Please read them carefully
                before using the platform.
              </p>
              <p className="mt-4 text-foreground leading-relaxed">
                If you do not agree to these terms, you may not access or use DeployMe.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <section id="about" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">1. About DeployMe</h2>
                <p className="text-foreground leading-relaxed">
                  DeployMe is a platform that allows users to create and deploy personal portfolio websites by
                  filling out structured forms. The platform does <span className="font-semibold">not</span> provide
                  markdown editing or custom coding by default. Portfolios are generated automatically based on
                  user-provided data.
                </p>
              </section>

              {/* Section 2 */}
              <section id="eligibility" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">2. Eligibility</h2>
                <p className="mb-4 text-foreground leading-relaxed">By using DeployMe, you confirm that:</p>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>
                    You are at least <span className="font-semibold">13 years old</span>
                  </li>
                  <li>You have the legal capacity to enter into these Terms</li>
                  <li>The information you provide is accurate and up to date</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="accounts" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">3. User Accounts</h2>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                  <li>You agree to notify us immediately of any unauthorized access or security breach.</li>
                  <li>
                    DeployMe is not responsible for any loss resulting from unauthorized use of your account.
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="content" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">4. User Content</h2>
                <p className="mb-4 text-foreground leading-relaxed">
                  You retain ownership of all content you submit, including:
                </p>
                <ul className="ml-6 mb-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>Personal details</li>
                  <li>Project descriptions</li>
                  <li>Images</li>
                  <li>Skills and experience information</li>
                </ul>
                <p className="mb-4 text-foreground leading-relaxed">
                  By submitting content, you grant DeployMe a{" "}
                  <span className="font-semibold">non-exclusive, royalty-free license</span> to use, store, display, and
                  distribute the content solely for the purpose of generating and hosting your portfolio.
                </p>
                <p className="text-foreground leading-relaxed">
                  You agree <span className="font-semibold">not</span> to upload:
                </p>
                <ul className="ml-6 mt-2 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>False or misleading information</li>
                  <li>Content that infringes intellectual property rights</li>
                  <li>Offensive, illegal, or harmful material</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="hosting" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">5. Portfolio Hosting & Access</h2>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>Public portfolios are accessible via a unique URL.</li>
                  <li>Anyone with the link may view a public portfolio.</li>
                  <li>You are responsible for ensuring that your content is suitable for public viewing.</li>
                  <li>DeployMe does not guarantee uninterrupted availability of portfolio links.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="username" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">6. Username & URL Policy</h2>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>
                    Usernames must be <span className="font-semibold">unique</span>, lowercase, and may contain only
                    letters and numbers.
                  </li>
                  <li>Usernames cannot contain spaces or special characters.</li>
                  <li>
                    DeployMe reserves the right to reject or reclaim usernames that violate policies or
                    impersonate others.
                  </li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="availability" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">7. Service Availability</h2>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>
                    We may modify, suspend, or discontinue any part of the service at any time without prior notice.
                  </li>
                  <li>Features may change as the platform evolves.</li>
                  <li>We are not liable for any data loss, downtime, or service interruption.</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section id="storage" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">8. Data Storage & Security</h2>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>User data is stored securely using third-party services.</li>
                  <li>While we follow best practices, no system is completely secure.</li>
                  <li>You use DeployMe at your own risk.</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section id="third-party" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">9. Third-Party Services</h2>
                <p className="mb-4 text-foreground leading-relaxed">
                  DeployMe may rely on third-party services for:
                </p>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>Authentication</li>
                  <li>Database storage</li>
                  <li>Hosting and deployment</li>
                </ul>
                <p className="mt-4 text-foreground leading-relaxed">
                  We are not responsible for issues caused by third-party service failures.
                </p>
              </section>

              {/* Section 10 */}
              <section id="ip" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">10. Intellectual Property</h2>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>
                    The DeployMe platform, branding, UI, and generated layouts are owned by DeployMe.
                  </li>
                  <li>
                    You may not copy, resell, or reverse engineer any part of the service without written permission.
                  </li>
                </ul>
              </section>

              {/* Section 11 */}
              <section id="prohibited" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">11. Prohibited Use</h2>
                <p className="mb-4 text-foreground leading-relaxed">You agree not to:</p>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>Abuse or overload the platform</li>
                  <li>Attempt to bypass security measures</li>
                  <li>Use DeployMe for spam, scams, or malicious activities</li>
                  <li>Scrape or clone generated portfolios at scale</li>
                </ul>
              </section>

              {/* Section 12 */}
              <section id="termination" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">12. Termination</h2>
                <p className="mb-4 text-foreground leading-relaxed">We reserve the right to:</p>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>Suspend or terminate accounts that violate these Terms</li>
                  <li>Remove content without notice if it breaches policies</li>
                </ul>
                <p className="mt-4 text-foreground leading-relaxed">You may stop using the service at any time.</p>
              </section>

              {/* Section 13 */}
              <section id="disclaimer" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">13. Disclaimer of Warranties</h2>
                <p className="mb-4 text-foreground leading-relaxed">
                  DeployMe is provided <span className="font-semibold">"as is"</span> and{" "}
                  <span className="font-semibold">"as available"</span>.
                </p>
                <p className="text-foreground leading-relaxed">We do not guarantee:</p>
                <ul className="ml-6 mt-2 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>Accuracy of generated portfolios</li>
                  <li>Continuous availability</li>
                  <li>Suitability for employment or hiring decisions</li>
                </ul>
              </section>

              {/* Section 14 */}
              <section id="liability" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">14. Limitation of Liability</h2>
                <p className="mb-4 text-foreground leading-relaxed">DeployMe shall not be liable for:</p>
                <ul className="ml-6 space-y-2 text-foreground leading-relaxed list-disc">
                  <li>Loss of data</li>
                  <li>Loss of opportunities</li>
                  <li>Indirect or consequential damages arising from use of the service</li>
                </ul>
              </section>

              {/* Section 15 */}
              <section id="changes" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">15. Changes to Terms</h2>
                <p className="text-foreground leading-relaxed">
                  We may update these Terms from time to time. Continued use of DeployMe after changes means you
                  accept the updated Terms.
                </p>
              </section>

              {/* Section 16 */}
              <section id="law" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">16. Governing Law</h2>
                <p className="text-foreground leading-relaxed">
                  These Terms shall be governed by the laws of <span className="font-semibold">India</span>, without
                  regard to conflict of law principles.
                </p>
              </section>

              {/* Section 17 */}
              <section id="contact" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">17. Contact Us</h2>
                <p className="mb-4 text-foreground leading-relaxed">
                  For questions or concerns regarding these Terms, contact us at:
                </p>
                <div className="rounded-lg border border-border bg-card/50 p-6">
                  <p className="text-foreground">
                    <span className="font-semibold">Email:</span>{" "}
                    <a href="mailto:harshdeepsingh.dtu@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                      harshdeepsingh.dtu@gmail.com
                    </a>
                  </p>
                  <p className="mt-2 text-foreground">
                    <span className="font-semibold">Website:</span>{" "}
                    <a href="https://deployme-dev.vercel.app" className="text-cyan-400 hover:text-cyan-300">
                      deployme-dev.vercel.app
                    </a>
                  </p>
                </div>
              </section>
            </div>

            {/* Footer Links */}
            <div className="mt-12 md:mt-16 border-t border-border pt-6 md:pt-8">
              <div className="flex flex-col gap-3 md:gap-4 sm:flex-row sm:justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm md:text-base"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
  )
}
