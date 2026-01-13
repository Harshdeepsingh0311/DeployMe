import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { PublicProfile } from "./types";

/**
 * Create Supabase server client
 * This ensures:
 * - Runs only on server
 * - Uses secure cookies
 */
async function getSupabase() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // IMPORTANT: server-only
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                }
            }
        }
    );
}

/**
 * Fetch a public profile by username
 * Used for:
 * - /[username] page
 * - generateMetadata
 */
export async function getProfileByUsername(
    username: string
): Promise<PublicProfile | null> {
    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name, bio")
        .eq("username", username)
        .eq("is_public", true)
        .maybeSingle(); // 👈 IMPORTANT

    if (error || !data) {
        return null;
    }

    return data;
}

/**
 * Fetch all public usernames
 * Used ONLY for sitemap generation
 */
export async function getAllUsernames() {
    const supabase = await getSupabase();

    const { data, error } = await supabase
        .from("profiles")
        .select("username");

    if (error || !data) {
        return [];
    }

    return data.map((row) => row.username);
}
