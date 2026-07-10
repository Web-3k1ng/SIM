import { createClient } from "@supabase/supabase-js";

// Fall back to harmless placeholder values so `next build` (and prerendering
// of client components) never crashes just because .env.local hasn't been
// set up yet. Real Supabase calls will simply fail gracefully at runtime
// until NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type IncidentType =
  | "stabbing"
  | "robbery"
  | "theft"
  | "assault"
  | "sexual_assault"
  | "murder"
  | "burglary"
  | "other";

export type IncidentStatus =
  | "pending"
  | "verified"
  | "in_progress"
  | "resolved"
  | "dismissed";

export interface Incident {
  id: string;
  incident_type: IncidentType;
  description: string;
  location: string;
  incident_date: string;
  reporter_name: string | null;
  is_anonymous: boolean;
  status: IncidentStatus;
  created_at: string;
}
