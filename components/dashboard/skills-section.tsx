"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface Skill {
  id?: string
  name: string
}

interface Props {
  skills: Skill[]
  onChange: (skills: Skill[]) => void
}

export default function SkillsSection({ skills, onChange }: Props) {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (!newSkill.trim()) return
    onChange([...skills, { name: newSkill.trim() }])
    setNewSkill("")
  }

  return (
    <Card className="border-cyan-500/20 bg-card/50 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Skills</h2>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="e.g., React"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
        />
        <Button type="button" onClick={addSkill} className="bg-cyan-500 hover:bg-cyan-600 text-black px-4">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <div key={skill.id ?? i} className="flex gap-2 items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm">
            <span className="text-foreground">{skill.name}</span>
            <button type="button" onClick={() => onChange(skills.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  )
}
