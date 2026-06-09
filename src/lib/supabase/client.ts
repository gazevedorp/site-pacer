import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não configurados."
  );
}

export const supabase = createClient<Database>(
  url ?? "https://placeholder.supabase.co",
  anonKey ?? "placeholder"
);

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
