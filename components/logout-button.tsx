'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function LogoutButton() {
    const router = useRouter()
    const [Loading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        await supabase.auth.signOut()
        setLoading(false)

        router.push('/auth/login')
        router.refresh()
    }

    return (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600"
                variant="outline"
                onClick={handleLogout}
                disabled={Loading}>
                {Loading ? "Logging out..." : "Logout"}
            </Button>
        </div>
    )
}
