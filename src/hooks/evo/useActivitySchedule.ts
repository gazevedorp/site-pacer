import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import { fetchActivitySchedule } from "@/lib/evo/queries/schedule";
import type { EvoScheduleItem } from "@/types/evo";

export function useActivitySchedule(idBranch: number | undefined) {
  return useSupabaseQuery<EvoScheduleItem[]>(
    () =>
      idBranch
        ? fetchActivitySchedule(idBranch)
        : Promise.resolve([]),
    [],
    [idBranch]
  );
}
