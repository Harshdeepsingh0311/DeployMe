"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface Experience {
  id?: string            // ✅ optional (DB-owned)
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
  isCurrent: boolean
}

interface ExperienceSectionProps {
  experiences: Experience[]
  onChange: (experiences: Experience[]) => void
}

export default function ExperienceSection({
  experiences,
  onChange,
}: ExperienceSectionProps) {

  /* ---------- ADD EXPERIENCE (NO UUID) ---------- */
  const addExperience = () => {
    onChange([
      ...experiences,
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
        isCurrent: false
      },
    ])
  }

  /* ---------- UPDATE EXPERIENCE (BY INDEX) ---------- */
  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    onChange(
      experiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    )
  }

  /* ---------- REMOVE EXPERIENCE (BY INDEX) ---------- */
  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index))
  }

  return (
    <Card className="border-cyan-500/20 bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-cyan-400">Experience</h2>
        <Button
          type="button"
          onClick={addExperience}
          className="bg-cyan-500 hover:bg-cyan-600 text-black"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {experiences.length > 0 ? (
          experiences.map((experience, index) => (
            <div
              key={experience.id ?? index}
              className="border border-cyan-500/20 rounded-lg p-4 space-y-4"
            >
              {/* Company + Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company / Organization</Label>
                  <Input
                    placeholder="e.g., Google, Microsoft"
                    value={experience.company}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Role / Position</Label>
                  <Input
                    placeholder="e.g., Senior Developer"
                    value={experience.role}
                    onChange={(e) =>
                      updateExperience(index, "role", e.target.value)
                    }
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) =>
                      updateExperience(index, "startDate", e.target.value)
                    }
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50 [&::-webkit-calendar-picker-indicator]:opacity-60
    [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    disabled={experience.isCurrent}
                    onChange={(e) =>
                      updateExperience(index, "endDate", e.target.value)
                    }
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-calendar-picker-indicator]:opacity-60
    [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/8 transition-all duration-100">
                <input
                  type="checkbox"
                  id={`isCurrently-${experience.id}`}
                  checked={experience.isCurrent || false}
                  onChange={(e) => {
                    const checked = e.currentTarget.checked

                    onChange(
                      experiences.map((exp, i) =>
                        i === index
                          ? {
                            ...exp,
                            isCurrent: checked,
                            endDate: checked ? "" : exp.endDate, // ✅ clear end date
                          }
                          : exp
                      )
                    )
                  }}
                  className="h-4 w-4 accent-cyan-500 cursor-pointer focus:ring-2 focus:ring-cyan-400 border-cyan-500/40 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                />
                <Label htmlFor={`isCurrently-${experience.id}`} className="cursor-pointer text-sm font-medium transition-colors hover:text-cyan-400">
                  Currently Working Here
                </Label>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  placeholder="Describe your responsibilities and achievements..."
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={3}
                  className="w-full rounded-md border border-cyan-500/20 bg-input/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-cyan-500/50 focus-visible:outline-none"
                />
              </div>

              {/* Remove */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeExperience(index)}
                >
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
