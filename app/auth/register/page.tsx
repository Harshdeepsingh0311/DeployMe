"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowRight, User, Mail, Lock, MapPin, FileText, Github, Linkedin } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    bio: "",
    location: "",
    resume: null as File | null,
    socialLinks: {
      email: "",
      github: "",
      leetcode: "",
      linkedin: "",
    },
  })

  const [Loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "file") {
      const input = e.target as HTMLInputElement
      setFormData((prev) => ({
        ...prev,
        resume: input.files?.[0] || null,
      }))
    } else if (name.includes("social")) {
      const socialKey = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          username: formData.username.toLowerCase().trim(),
          full_name: formData.fullName,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: formData.email,
          username: formData.username,
          full_name: formData.fullName,
          bio: formData.bio,
          location: formData.location,
          social_links: formData.socialLinks,
        })

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }
    }

    setLoading(false)
    router.push('/dashboard')
    router.refresh()
  }


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   // TODO: Add registration logic
  //   setTimeout(() => setLoading(false), 1000)
  // }

  return (
    <div className="w-full max-w-2xl mt-5">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Create Your Portfolio</h1>
        <p className="text-muted-foreground">Join thousands of developers showcasing their work</p>
      </div>

      <Card className="px-0 border-cyan-500/20 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleRegister} className="space-y-6 p-6 md:p-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-cyan-400" />
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-cyan-400" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Contact Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-400" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="San Francisco, CA"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-cyan-400" />
              Bio
            </Label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-cyan-500/20 bg-input/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-cyan-500/50 focus-visible:outline-none"
              required
            />
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="social.email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  Email Link
                </Label>
                <Input
                  id="social.email"
                  name="social.email"
                  placeholder="mailto:your@email.com"
                  value={formData.socialLinks.email}
                  onChange={handleChange}
                  className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social.github" className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-cyan-400" />
                  GitHub
                </Label>
                <Input
                  id="social.github"
                  name="social.github"
                  placeholder="https://github.com/username"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                  className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social.linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-cyan-400" />
                  LinkedIn
                </Label>
                <Input
                  id="social.linkedin"
                  name="social.linkedin"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.socialLinks.linkedin}
                  onChange={handleChange}
                  className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social.leetcode" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  LeetCode
                </Label>
                <Input
                  id="social.leetcode"
                  name="social.leetcode"
                  placeholder="https://leetcode.com/username"
                  value={formData.socialLinks.leetcode}
                  onChange={handleChange}
                  className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                />
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-2">
            <Label htmlFor="resume" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-cyan-400" />
              Upload Resume (PDF)
            </Label>
            <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
              <input id="resume" name="resume" type="file" accept=".pdf" onChange={handleChange} className="hidden" />
              <label htmlFor="resume" className="cursor-pointer">
                {formData.resume ? (
                  <div className="text-cyan-400">
                    <FileText className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">{formData.resume.name}</p>
                    <p className="text-sm text-muted-foreground">Click to change</p>
                  </div>
                ) : (
                  <div>
                    <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">PDF up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
            />
            <p className="text-xs text-muted-foreground">
              At least 8 characters with uppercase, lowercase, and numbers
            </p>
          </div>

          {error && <p>{error}</p>}
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={Loading}
            className="w-full group bg-cyan-500 hover:bg-cyan-600 text-black text-base py-6"
          >
            {Loading ? "Creating Account..." : "Create Portfolio Account"}
            {!Loading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">Already have an account?</span>
            </div>
          </div>

          

          <Button
            type="button"
            variant="outline"
            className="w-full border-cyan-500/30 hover:bg-cyan-500/10 text-base py-6 bg-transparent"
            asChild
          >
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </form>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        By signing up, you agree to our{" "}
        <Link href="#" className="text-cyan-400 hover:text-cyan-300 font-medium">
          Terms of Service
        </Link>
      </p>
    </div>
  )
}
