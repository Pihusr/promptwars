import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

/**
 * Server-side Supabase Client for Server Components, Server Actions, and API Route Handlers.
 */
export function getSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}
