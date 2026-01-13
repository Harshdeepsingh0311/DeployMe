import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/utils/supabase/server"

export async function GET() {
    return NextResponse.json({ message: "API works" })
}

export async function POST(req: Request) {
    try {
        const supabase = await createSupabaseServerClient()

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", user.id)
            .single()

        if (!profile) {
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 }
            )
        }

        const profileId = profile.id

        const { personal, skills, experience, projects } = await req.json()

        /* ---------------- PROFILE ---------------- */
        await supabase
            .from("profiles")
            .update({
                username: personal.username,
                full_name: personal.fullName,
                email: personal.email,
                bio: personal.bio,
                location: personal.location,
                social_links: personal.socialLinks,
            })
            .eq("id", profileId)

        /* ============================================================
           ======================= SKILLS =============================
           ============================================================ */

        const { data: dbSkills } = await supabase
            .from("skills")
            .select("id")
            .eq("profile_id", profileId)

        const incomingSkillIds = skills.filter((s: any) => s.id).map((s: any) => s.id)
        const dbSkillIds = dbSkills?.map((s) => s.id) ?? []

        // DELETE removed skills
        const skillsToDelete = dbSkillIds.filter(
            (id) => !incomingSkillIds.includes(id)
        )

        if (skillsToDelete.length > 0) {
            await supabase.from("skills").delete().in("id", skillsToDelete)
        }

        // INSERT new skills
        const skillsToInsert = skills.filter((s: any) => !s.id)

        if (skillsToInsert.length > 0) {
            await supabase.from("skills").insert(
                skillsToInsert.map((s: any) => ({
                    profile_id: profileId,
                    name: s.name,
                }))
            )
        }

        /* ============================================================
   ===================== EXPERIENCE ===========================
   ============================================================ */

        const { data: dbExp } = await supabase
            .from("experience") // ✅ FIXED TABLE NAME
            .select("id")
            .eq("profile_id", profileId)

        const incomingExpIds = experience
            .filter((e: any) => e.id)
            .map((e: any) => e.id)

        const dbExpIds = dbExp?.map((e) => e.id) ?? []

        /* ---------- DELETE REMOVED ---------- */
        const expToDelete = dbExpIds.filter(
            (id) => !incomingExpIds.includes(id)
        )

        if (expToDelete.length > 0) {
            await supabase
                .from("experience")
                .delete()
                .in("id", expToDelete)
        }

        /* ---------- UPDATE EXISTING ---------- */
        const expToUpdate = experience.filter((e: any) => e.id)

        for (const e of expToUpdate) {
            const { error } = await supabase
                .from("experience")
                .update({
                    company: e.company,
                    role: e.role,
                    start_date: e.startDate ? `${e.startDate}-01` : null,
                    end_date: e.endDate ? `${e.endDate}-01` : null,
                    description: e.description,
                })
                .eq("id", e.id)

            if (error) {
                console.error("❌ EXPERIENCE UPDATE ERROR:", error)
                return NextResponse.json(
                    { error: error.message },
                    { status: 500 }
                )
            }
        }

        /* ---------- INSERT NEW ---------- */
        const expToInsert = experience.filter((e: any) => !e.id)

        if (expToInsert.length > 0) {
            await supabase.from("experience").insert(
                expToInsert.map((e: any) => ({
                    profile_id: profileId,
                    company: e.company,
                    role: e.role,
                    start_date: e.startDate ? `${e.startDate}-01` : null,
                    end_date: e.endDate ? `${e.endDate}-01` : null,
                    description: e.description,
                }))
            )
        }


        /* ============================================================
           ======================= PROJECTS ===========================
           ============================================================ */

        const { data: dbProjects } = await supabase
            .from("projects")
            .select("id")
            .eq("profile_id", profileId)

        const incomingProjIds = projects.filter((p: any) => p.id).map((p: any) => p.id)
        const dbProjIds = dbProjects?.map((p) => p.id) ?? []

        const projToDelete = dbProjIds.filter(
            (id) => !incomingProjIds.includes(id)
        )

        if (projToDelete.length > 0) {
            await supabase.from("projects").delete().in("id", projToDelete)
        }

        const projToUpdate = projects.filter((p: any) => p.id)
        const projToInsert = projects.filter((p: any) => !p.id)

        if (projToInsert.length > 0) {
            const { error } = await supabase
                .from("projects")
                .insert(
                    projToInsert.map((p: any) => ({
                        profile_id: profileId,
                        title: p.title,
                        description: p.description,
                        tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack : [],
                        git_link: p.git_link || null,
                        live_link: p.live_link || null,
                    }))
                )

            if (error) {
                console.error("❌ PROJECT INSERT ERROR:", error)
                return NextResponse.json({ error: error.message }, { status: 500 })
            }
        }


        for (const p of projToUpdate) {
            const { error } = await supabase
                .from("projects")
                .update({
                    title: p.title,
                    description: p.description,
                    tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack : [],
                    git_link: p.git_link || null,
                    live_link: p.live_link || null,
                })
                .eq("id", p.id)

            if (error) {
                console.error("❌ PROJECT UPDATE ERROR:", error)
                return NextResponse.json({ error: error.message }, { status: 500 })
            }
        }


        return NextResponse.json({ success: true, redirectTo: `/portfolio/${personal.username}`, })
    } catch (err) {
        console.error("Portfolio update failed:", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
