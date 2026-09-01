import { evoFetch } from "@/lib/evo/client";
import { EVO_ACTIVITY_STATUS_CANCELLED, type EvoScheduleItem } from "@/types/evo";

function todayIsoDate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export async function fetchActivitySchedule(
  idBranch: number
): Promise<EvoScheduleItem[]> {
  const search = new URLSearchParams({
    showFullWeek: "true",
    take: "500",
    idBranch: String(idBranch),
    date: todayIsoDate(),
  });

  const items = await evoFetch<EvoScheduleItem[] | null>(
    "/activities/schedule",
    search
  );

  const list = Array.isArray(items) ? items : [];
  return list.filter((item) => item.status !== EVO_ACTIVITY_STATUS_CANCELLED);
}
