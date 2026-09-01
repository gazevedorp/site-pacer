import { evoFetch } from "@/lib/evo/client";
import type { EvoActivity } from "@/types/evo";

export async function fetchActivities(): Promise<EvoActivity[]> {
  const activities = await evoFetch<EvoActivity[]>(
    "/activities",
    new URLSearchParams({ take: "100" })
  );
  return activities.filter((activity) => !activity.inactive);
}
