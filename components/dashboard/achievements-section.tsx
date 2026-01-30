"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface Achievement {
    id?: string          // DB id
    client_id: string    // ✅ ALWAYS present
    title: string
    category: "🏆 Competition" | "🎓 Academic" | "📜 Certification" | "🥇 Award" | "🎭 Cultural"
    issuer: string
    date: string
    description: string
}


interface AchievementsSectionProps {
    achievements: Achievement[]
    onChange: (achievements: Achievement[]) => void
}

const CATEGORIES = [
    "🏆 Competition",
    "🎓 Academic",
    "📜 Certification",
    "🥇 Award",
    "🎭 Cultural",
] as const

export default function AchievementsSection({ achievements, onChange }: AchievementsSectionProps) {
    const addAchievement = () => {
        onChange([
            ...achievements,
            {
                client_id: uuidv4(),
                title: "",
                category: "🏆 Competition",
                issuer: "",
                date: "",
                description: "",
            },
        ])
    }

    const removeAchievement = (id: string) => {
        onChange(achievements.filter((a) => a.client_id !== id))
    }

    const updateAchievement = (
        clientId: string,
        field: keyof Achievement,
        value: string
    ) => {
        onChange(
            achievements.map((a) =>
                a.client_id === clientId ? { ...a, [field]: value } : a
            )
        )
    }


    return (
        <Card className="border-cyan-500/20 bg-card/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-cyan-400">Achievements</h2>
                <Button type="button" onClick={addAchievement} className="bg-cyan-500 hover:bg-cyan-600 text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Achievement
                </Button>
            </div>

            <div className="space-y-6">
                {achievements.length > 0 ? (
                    achievements.map((achievement) => (
                        <div key={achievement.client_id} className="border border-cyan-500/20 rounded-lg p-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`title-${achievement.client_id}`}>Achievement Title</Label>
                                    <Input
                                        id={`title-${achievement.client_id}`}
                                        placeholder="e.g., Best Innovation Award"
                                        value={achievement.title}
                                        onChange={(e) => updateAchievement(achievement.client_id, "title", e.target.value)}
                                        className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`category-${achievement.client_id}`}>Category</Label>
                                    <select
                                        id={`category-${achievement.client_id}`}
                                        value={achievement.category}
                                        onChange={(e) => updateAchievement(achievement.client_id, "category", e.target.value)}
                                        className="w-full px-3 py-2 pr-10 rounded-md bg-input/50 border border-cyan-500/20 text-foreground focus-visible:border-cyan-500/50 outline-none transition-colors"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`issuer-${achievement.client_id}`}>Issuer/Organization</Label>
                                    <Input
                                        id={`issuer-${achievement.client_id}`}
                                        placeholder="Organization name"
                                        value={achievement.issuer}
                                        onChange={(e) => updateAchievement(achievement.client_id, "issuer", e.target.value)}
                                        className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`date-${achievement.client_id}`}>Date</Label>
                                    <Input
                                        id={`date-${achievement.client_id}`}
                                        type="month"
                                        value={achievement.date}
                                        onChange={(e) => updateAchievement(achievement.client_id, "date", e.target.value)}
                                        className="bg-input/50 border-cyan-500/20 focus-visible:border-cyan-500/50 [&::-webkit-calendar-picker-indicator]:opacity-60
    [&::-webkit-calendar-picker-indicator]:invert"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`description-${achievement.client_id}`}>Description</Label>
                                <textarea
                                    id={`description-${achievement.client_id}`}
                                    placeholder="Describe your achievement, its impact, and what you learned..."
                                    value={achievement.description}
                                    onChange={(e) => updateAchievement(achievement.client_id, "description", e.target.value)}
                                    rows={3}
                                    className="w-full rounded-md border border-cyan-500/20 bg-input/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-cyan-500/50 focus-visible:outline-none resize-none"
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeAchievement(achievement.client_id)}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-8">
                        No achievements added yet. Click "Add Achievement" to showcase your accomplishments.
                    </p>
                )}
            </div>
        </Card>
    )
}
