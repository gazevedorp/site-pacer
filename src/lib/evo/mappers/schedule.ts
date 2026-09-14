import { DAYS, type PublicoAlvo, type ScheduleClass, type ScheduleDay } from "@/data/schedule";
import type { EvoActivity, EvoScheduleItem } from "@/types/evo";

function parseDurationMin(startTime: string | null, endTime: string | null): number {
  if (!startTime || !endTime) return 0;
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  if ([startH, startM, endH, endM].some((n) => Number.isNaN(n))) return 0;
  return Math.max(endH * 60 + endM - (startH * 60 + startM), 0);
}

function dayFromActivityDate(iso: string): ScheduleDay {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return DAYS.find((item) => item.jsDay === date.getDay())?.key ?? "seg";
}

function audienceText(audience: unknown): string {
  if (!audience) return "";
  if (typeof audience === "string") return audience;
  if (Array.isArray(audience)) return audience.map(audienceText).join(" ");
  if (typeof audience === "object") {
    const record = audience as Record<string, unknown>;
    return [record.name, record.audience, record.description, record.title]
      .filter((value): value is string => typeof value === "string")
      .join(" ");
  }
  return "";
}

const KIDS_PATTERN = /kid|infantil|beb[êe]|baby|\d+\s*a\s*\d+\s*anos/;

function isKidsClass(item: EvoScheduleItem, activity?: EvoActivity): boolean {
  const haystack = [
    item.audience,
    audienceText(activity?.audience),
    activity?.activityGroup,
    activity?.name,
    activity?.description,
    item.name,
    item.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return KIDS_PATTERN.test(haystack);
}

export function mapScheduleItem(
  item: EvoScheduleItem,
  unitSlug: string,
  activity?: EvoActivity
): ScheduleClass {
  const time = item.startTime?.slice(0, 5) || "00:00";

  return {
    id: `${item.idAtividadeSessao}-${item.activityDate}-${time}`,
    unitSlug,
    day: dayFromActivityDate(item.activityDate),
    time,
    durationMin: parseDurationMin(item.startTime, item.endTime),
    modalityId: String(item.idActivity),
    modalityLabel: item.name,
    instructor: item.instructor?.trim() || "A confirmar",
    room: item.area?.trim() || undefined,
    publicoAlvo: (isKidsClass(item, activity) ? "kids" : "adulto") as PublicoAlvo,
    accentColor: activity?.color || undefined,
    description: item.description?.trim() || activity?.description?.trim() || undefined,
    endTime: item.endTime?.slice(0, 5) || undefined,
  };
}

export function uniqueScheduleModalities(
  classes: ScheduleClass[]
): { id: string; name: string }[] {
  const seen = new Map<string, string>();
  for (const cls of classes) {
    if (!seen.has(cls.modalityId)) seen.set(cls.modalityId, cls.modalityLabel);
  }
  return [...seen.entries()]
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}
