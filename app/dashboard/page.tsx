import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/utils/supabase/server'
import DashboardClient from '@/components/dashboard/dashboard-client'
import { Navbar } from '@/components/navbar'
import { CursorAnimation } from '@/components/cursor-animation'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, full_name, resume_url')
    .eq('id', user.id)
    .single()

  // ✅ HARD GUARANTEE
  if (!profile) {
    redirect('/auth/login') // or onboarding page
  }

  let resumeSignedUrl: string | null = null

  if (profile.resume_url) {
    const { data } = await supabase.storage
      .from("resume")
      .createSignedUrl(profile.resume_url, 60) // 60 seconds

    resumeSignedUrl = data?.signedUrl ?? null
  }

  profile.resume_url = resumeSignedUrl

  return (
    <div>
      <DashboardClient profile={profile}/>
    </div>
  
)
}
