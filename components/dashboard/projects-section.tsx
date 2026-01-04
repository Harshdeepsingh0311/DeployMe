"use client"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface Project {
  id: string
  title: string
  description: string
  image: File | null
  technologies: string[]
}

interface ProjectsSectionProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export default function ProjectsSection({ projects, onChange }: ProjectsSectionProps) {
  const addProject = () => {
    onChange([
      ...projects,
      {
        id: uuidv4(),
        title: "",
        description: "",
        image: null,
        technologies: [],
      },
    ])
  }

  const removeProject = (id: string) => {
    onChange(projects.filter((proj) => proj.id !== id))
  }

  const updateProject = (id: string, field: keyof Project, value: string | File | string[]) => {
    onChange(projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)))
  }

  const addTechnology = (projectId: string, tech: string) => {
    if (tech.trim()) {
      onChange(
        projects.map((proj) =>
          proj.id === projectId ? { ...proj, technologies: [...proj.technologies, tech] } : proj,
        ),
      )
    }
  }

  const removeTechnology = (projectId: string, techIndex: number) => {
    onChange(
      projects.map((proj) =>
        proj.id === projectId
          ? {
              ...proj,
              technologies: proj.technologies.filter((_, i) => i !== techIndex),
            }
          : proj,
      ),
    )
  }

  return (
    <Card className="border-cyan-500/20 bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-cyan-400">Projects</h2>
        <Button type="button" onClick={addProject} className="bg-cyan-500 hover:bg-cyan-600 text-black">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="border border-cyan-500/20 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                  <Input
                    id={`title-${project.id}`}
                    placeholder="e.g., Portfolio Builder"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, "title", e.target.value)}
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`image-${project.id}`}>Project Image</Label>
                  <input
                    id={`image-${project.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateProject(project.id, "image", e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 text-sm border border-cyan-500/20 rounded-md bg-input/50 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-cyan-500 file:text-black file:cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${project.id}`}>Description</Label>
                <textarea
                  id={`description-${project.id}`}
                  placeholder="Describe your project, what problems it solves, and key features..."
                  value={project.description}
                  onChange={(e) => updateProject(project.id, "description", e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-cyan-500/20 bg-input/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-cyan-500/50 focus-visible:outline-none"
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g., React, TypeScript"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTechnology(project.id, (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ""
                      }
                    }}
                    className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector(
                        `input[placeholder="e.g., React, TypeScript"]`,
                      ) as HTMLInputElement
                      if (input) {
                        addTechnology(project.id, input.value)
                        input.value = ""
                      }
                    }}
                    className="bg-cyan-500 hover:bg-cyan-600 text-black px-4"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm"
                      >
                        <span className="text-foreground">{tech}</span>
                        <button
                          type="button"
                          onClick={() => removeTechnology(project.id, idx)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button type="button" variant="destructive" size="sm" onClick={() => removeProject(project.id)}>
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
