import { Button } from "@/components/ui/button"
import { Github, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to deploy your portfolio?</h2>
          <p className="mb-8 text-lg text-muted-foreground">Join thousands of developers showcasing their work</p>
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black text-lg px-8">
            <Link href={"/dashboard"}>Build Your Portfolio Now</Link>
          </Button>
        </div>

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
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </a>
            <a href="#templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          © 2025 DeployMe. Built with ❤️ by Harshdeep Singh
        </div>
      </div>
    </footer>
  )
}
