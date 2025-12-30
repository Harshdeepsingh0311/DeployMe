import { createClient } from '@supabase/supabase-js'

export default async function TestConnection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Attempt to fetch any data (even from a non-existent table) 
  // to check if the network request reaches Supabase.
  const { data, error } = await supabase.from('users').select('*').limit(1)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p><strong>Error:</strong> {error.message}</p>
          <p className="text-sm">Check if your URL and Anon Key in .env.local are correct.</p>
        </div>
      ) : (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p><strong>Success!</strong> Successfully connected to Supabase.</p>
          <p className="text-sm">Environment variables are loaded correctly.</p>
        </div>
      )}
    </div>
  )
}