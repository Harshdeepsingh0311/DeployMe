"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { CursorAnimation } from "@/components/cursor-animation"
import { FooterWithoutCTA } from "@/components/footer-without-cta"

export default function ComingSoon() {
    return (
        <div>
            <Navbar />
            <div className="relative min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden">
                <CursorAnimation />
                {/* Gradient blur backgrounds */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 h-72 w-72 bg-cyan-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 h-96 w-96 bg-blue-500/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-cyan-500/5 rounded-full blur-3xl" />
                </div>

                <section className="relative z-10 flex min-h-screen flex-col items-center justify-center">
                    <div className="mx-auto max-w-3xl text-center">
                        {/* Animated sparkle illustration */}
                        <div className="mb-12 flex justify-center">
                            <div className="relative w-48 h-48">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <Sparkles className="w-32 h-32 text-cyan-400 mx-auto mb-4 animate-pulse" />
                                        {/* Floating elements around sparkle */}
                                        <div
                                            className="absolute top-8 -left-16 w-12 h-12 bg-cyan-500/20 rounded-lg animate-pulse"
                                            style={{ animationDuration: "3s" }}
                                        />
                                        <div
                                            className="absolute bottom-16 -right-12 w-16 h-16 border-2 border-cyan-500/30 rounded-full animate-spin"
                                            style={{ animationDuration: "4s" }}
                                        />
                                        <div className="absolute top-24 right-0 w-8 h-8 bg-blue-500/20 rounded-lg animate-bounce" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl text-foreground">Coming Soon...</h1>

                        {/* Description */}
                        <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                            We're working hard to bring you something incredible. Stay tuned and be the first to know when we launch!
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center mb-12">
                            <Link href="/#templates">
                                <Button size="lg" className="group bg-cyan-500 hover:bg-cyan-600 text-black text-lg px-8">
                                    Back to Home
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/auth/login">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="text-lg px-8 border-cyan-500/30 hover:bg-cyan-500/10 bg-transparent"
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </div>

                        {/* Feature highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg border border-border bg-card/50 hover:border-cyan-500/30 transition-colors">
                                <h3 className="font-semibold text-foreground mb-2">Advanced Features</h3>
                                <p className="text-sm text-muted-foreground">Powerful tools to showcase your work like never before</p>
                            </div>
                            <div className="p-4 rounded-lg border border-border bg-card/50 hover:border-cyan-500/30 transition-colors">
                                <h3 className="font-semibold text-foreground mb-2">Seamless Experience</h3>
                                <p className="text-sm text-muted-foreground">Intuitive interface designed for maximum creativity</p>
                            </div>
                            <div className="p-4 rounded-lg border border-border bg-card/50 hover:border-cyan-500/30 transition-colors">
                                <h3 className="font-semibold text-foreground mb-2">Community Driven</h3>
                                <p className="text-sm text-muted-foreground">Connect with other creators and share your portfolio</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <FooterWithoutCTA />
        </div>
    )
}
