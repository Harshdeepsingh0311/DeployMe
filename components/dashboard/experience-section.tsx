"use client"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"


interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
}

interface ExperienceSectionProps {
  experiences: Experience[]
  onChange: (experiences: Experience[]) => void
}

export default function ExperienceSection({ experiences, onChange }: ExperienceSectionProps) {
  const addExperience = () => {
    onChange([
      ...experiences,
      {
        id: uuidv4(),
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const removeExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  return (
    <Card className="border-cyan-500/20 bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-cyan-400">Experience</h2>
        <Button type="button" onClick={addExperience} className="bg-cyan-500 hover:bg-cyan-600 text-black">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {experiences.length > 0 ? (
          experiences.map((experience) => (
            <div key={experience.id} className="border border-cyan-500/20 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${experience.id}`}>Company / Organization</Label>
                  <Input
                    id={`company-${experience.id}`}
                    placeholder="e.g., Google, Microsoft"
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`role-${experience.id}`}>Role / Position</Label>
                  <Input
                    id={`role-${experience.id}`}
                    placeholder="e.g., Senior Developer"
                    value={experience.role}
                    onChange={(e) => updateExperience(experience.id, "role", e.target.value)}
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${experience.id}`}
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${experience.id}`}
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${experience.id}`}>Description</Label>
                <textarea
                  id={`description-${experience.id}`}
                  placeholder="Describe your responsibilities and achievements..."
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-cyan-500/20 bg-input/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-cyan-500/50 focus-visible:outline-none"
                />
              </div>

              <div className="flex justify-end">
                <Button type="button" variant="destructive" size="sm" onClick={() => removeExperience(experience.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No experiences added yet. Click "Add Experience" to get started.
          </p>
        )}
      </div>
    </Card>
  )
}
