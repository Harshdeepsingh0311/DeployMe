import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/utils/supabase/server'
import { LogoutButton } from '@/components/logout-button'
import { Navbar } from '@/components/navbar'
import { CursorAnimation } from '@/components/cursor-animation'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()

  // 1. Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 2. If not logged in → redirect
  if (!user) {
    redirect('/auth/login')
  }

  // 3. Fetch username from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  return (
    <div>
      <Navbar />
      <CursorAnimation />
      <div className="p-8">
      <h1 className="text-2xl font-semibold">
        Hi, {profile?.username}
      </h1>
      <LogoutButton />
    </div>
    </div>
    
  )
}
