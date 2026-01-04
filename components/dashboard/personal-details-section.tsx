"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, MapPin, FileText, Github, Linkedin } from "lucide-react"

interface PersonalDetailsProps {
  data: {
    username: string
    fullName: string
    email: string
    password: string
    bio: string
    location: string
    resume: File | null
    socialLinks: {
      email: string
      github: string
      leetcode: string
      linkedin: string
    }
  }
  onChange: (data: PersonalDetailsProps["data"]) => void
  profile: {
    id: string
    username: string
    full_name: string | null
    resume_url: string | null
  }
}


type Props = {
  profile: {
    id: string
    username: string
    full_name: string | null
    resume_url: string | null
  }
}

export default function PersonalDetailsSection({
  data,
  onChange,
  profile,
}: PersonalDetailsProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "file") {
      const input = e.target as HTMLInputElement
      onChange({
        ...data,
        resume: input.files?.[0] || null,
      })
    } else if (name.includes("social")) {
      const socialKey = name.split(".")[1]
      onChange({
        ...data,
        socialLinks: {
          ...data.socialLinks,
          [socialKey]: value,
        },
      })
    } else {
      onChange({
        ...data,
        [name]: value,
      })
    }
  }

  return (
    <Card className="border-cyan-500/20 bg-card/50 backdrop-blur-sm p-6">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Personal Details</h2>

      <div className="space-y-6">
        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-foreground">Basic Information</h3>
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
                value={data.username}
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
                value={data.fullName}
                onChange={handleChange}
                required
                className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-foreground">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                value={data.email}
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
                value={data.location}
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
            value={data.bio}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-cyan-500/20 bg-input/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-cyan-500/50 focus-visible:outline-none"
          />
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-foreground">Social Links</h3>
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
                value={data.socialLinks.email}
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
                value={data.socialLinks.github}
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
                value={data.socialLinks.linkedin}
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
                value={data.socialLinks.leetcode}
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
          {profile.resume_url && (
            <div className="mt-3">
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:underline"
              >
                View Current Resume
              </a>
            </div>
          )}

          <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
            <input id="resume" name="resume" type="file" accept=".pdf" onChange={handleChange} className="hidden" />
            <label htmlFor="resume" className="cursor-pointer">
              {data.resume ? (
                <div className="text-cyan-400">
                  <FileText className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">{data.resume.name}</p>
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
            value={data.password}
            onChange={handleChange}
            required
            className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
          />
          <p className="text-xs text-muted-foreground">At least 8 characters with uppercase, lowercase, and numbers</p>
        </div>
      </div>
    </Card>
  )
}
