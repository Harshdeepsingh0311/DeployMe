import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function FooterWithoutCTA() {
  return (
    <footer className="relative z-10 border-t border-border px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
          <Link href="/">
            <div className="flex items-center">
              <Image src="/logo.png" alt="PortfolioEngine" width={48} height={48} unoptimized />
              <span className="text-xl font-bold ml-0">
                eployMe
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/#templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="/coming-soon" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Link href={"https://www.github.com/harshdeepsingh0311/"}><Github className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link href={"https://www.linkedin.com/in/harshdeepsingh0311/"}><Linkedin className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DeployMe. Built with ❤️ by <Link href={"https://www.linkedin.com/in/harshdeepsingh0311/"}>Harshdeep Singh</Link>
        </div>
      </div>
    </footer>
  )
}
