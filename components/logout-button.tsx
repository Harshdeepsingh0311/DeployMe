'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()

        router.push('/auth/login')
        router.refresh()
    }

    return (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="group bg-cyan-500 hover:bg-cyan-600 text-lg px-8"
                variant="outline"
                onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}
