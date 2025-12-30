"use client"

import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function SupabaseDebugger() {
  useEffect(() => {
    // Only run this in development mode
    if (process.env.NODE_ENV === 'development') {
      (window as any).supabase = createClient()
      console.log('🛠️ Supabase client exposed to window.supabase')
    }
  }, [])

  return null // This component doesn't render anything
}