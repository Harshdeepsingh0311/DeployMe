"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface Project {
  id?: string            // ✅ optional (DB id only)
  title: string
  description: string
  image: File | null
  tech_stack: string[]
  git_link: string | null
  live_link: string | null
}

interface ProjectsSectionProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export default function ProjectsSection({
  projects,
  onChange,
}: ProjectsSectionProps) {
  // local state ONLY for technology input text (per project)
  const [techInput, setTechInput] = useState<Record<number, string>>({})

  /* ---------- ADD PROJECT ---------- */
  const addProject = () => {
    onChange([
      ...projects,
      {
        title: "",
        description: "",
        image: null,
        tech_stack: [],
        git_link: "",
        live_link: ""
      },
    ])
  }

  /* ---------- REMOVE PROJECT ---------- */
  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index))
  }

  /* ---------- UPDATE PROJECT FIELD ---------- */
  const updateProject = (
    index: number,
    field: keyof Project,
    value: any
  ) => {
    onChange(
      projects.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj
      )
    )
  }

  /* ---------- ADD TECHNOLOGY ---------- */
  const addTechnology = (projectIndex: number) => {
    const tech = techInput[projectIndex]?.trim()
    if (!tech) return

    updateProject(projectIndex, "tech_stack", [
      ...projects[projectIndex].tech_stack,
      tech,
    ])

    setTechInput((prev) => ({ ...prev, [projectIndex]: "" }))
  }

  /* ---------- REMOVE TECHNOLOGY ---------- */
  const removeTechnology = (projectIndex: number, techIndex: number) => {
    updateProject(
      projectIndex,
      "tech_stack",
      projects[projectIndex].tech_stack.filter((_, i) => i !== techIndex)
    )
  }

  return (
    <Card className="border-cyan-500/20 bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-cyan-400">Projects</h2>
        <Button
          type="button"
          onClick={addProject}
          className="bg-cyan-500 hover:bg-cyan-600 text-black"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={project.id ?? index}
              className="border border-cyan-500/20 rounded-lg p-4 space-y-4"
            >
              {/* Title + Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input
                    placeholder="e.g., Portfolio Builder"
                    value={project.title}
                    onChange={(e) =>
                      updateProject(index, "title", e.target.value)
                    }
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Image</Label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updateProject(
                        index,
                        "image",
                        e.target.files?.[0] ?? null
                      )
                    }
                    className="w-full px-3 py-2 text-sm border border-cyan-500/20 rounded-md bg-input/50 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-cyan-500 file:text-black file:cursor-pointer"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  placeholder="Describe your project, what problems it solves, and key features..."
                  value={project.description}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  rows={3}
                  className="w-full rounded-md border border-cyan-500/20 bg-input/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-cyan-500/50 focus-visible:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>GitHub Link</Label>
                  <Input
                    placeholder="https://github.com/username/repo"
                    value={project.git_link ?? ""}
                    onChange={(e) =>
                      updateProject(index, "git_link", e.target.value)
                    }
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Live Demo Link</Label>
                  <Input
                    placeholder="https://your-project.vercel.app"
                    value={project.live_link ?? ""}
                    onChange={(e) =>
                      updateProject(index, "live_link", e.target.value)
                    }
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                </div>
              </div>


              {/* Technologies */}
              <div className="space-y-2">
                <Label>Technologies Used</Label>

                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g., React, TypeScript"
                    value={techInput[index] ?? ""}
                    onChange={(e) =>
                      setTechInput((prev) => ({
                        ...prev,
                        [index]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTechnology(index)
                      }
                    }}
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />

                  <Button
                    type="button"
                    onClick={() => addTechnology(index)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-black px-4"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm"
                      >
                        <span className="text-foreground">{tech}</span>
                        <button
                          type="button"
                          onClick={() =>
                            removeTechnology(index, techIndex)
                          }
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Remove */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No projects added yet. Click "Add Project" to showcase your work.
          </p>
        )}
      </div>
    </Card>
  )
}
