"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface Skill {
  id: string
  name: string
}

interface SkillsSectionProps {
  skills: Skill[]
  onChange: (skills: Skill[]) => void
}

export default function SkillsSection({ skills, onChange }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim()) {
      onChange([...skills, { id: uuidv4(), name: newSkill }])
      setNewSkill("")
    }
  }

  const removeSkill = (id: string) => {
    onChange(skills.filter((skill) => skill.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <Card className="border-cyan-500/20 bg-card/50 backdrop-blur-sm p-6">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Skills</h2>

      <div className="space-y-4">
        {/* Add New Skill */}
        <div className="space-y-2">
          <Label htmlFor="skillName">Add a Skill</Label>
          <div className="flex gap-2">
            <Input
              id="skillName"
              placeholder="e.g., React, JavaScript, TypeScript"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
            />
            <Button type="button" onClick={addSkill} className="bg-cyan-500 hover:bg-cyan-600 text-black px-4">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-2 min-h-[100px]">
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm"
                >
                  <span className="text-foreground">{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No skills added yet. Add your first skill above.</p>
          )}
        </div>
      </div>
    </Card>
  )
}
