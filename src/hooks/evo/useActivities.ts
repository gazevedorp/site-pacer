import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import { fetchActivities } from "@/lib/evo/queries/activities";
import type { EvoActivity } from "@/types/evo";

export function useActivities() {
  return useSupabaseQuery<EvoActivity[]>(fetchActivities, [], []);
}
