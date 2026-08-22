import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

/**
 * Browser-side Supabase Client for client components.
 * Strongly typed with our complete PostgreSQL database schema.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export function getSupabaseBrowserClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
