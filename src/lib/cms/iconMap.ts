import type { LucideIcon } from "lucide-react";
import {
  Dumbbell,
  HeartPulse,
  Waves,
  Swords,
  PersonStanding,
  Music,
  Snowflake,
  Baby,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Dumbbell,
  HeartPulse,
  Waves,
  Swords,
  PersonStanding,
  Music,
  Snowflake,
  Baby,
};

export function getModalityIcon(iconName?: string): LucideIcon {
  if (!iconName) return Dumbbell;
  return ICON_MAP[iconName] ?? Dumbbell;
}

export function getModalityLabel(slug: string, title?: string): string {
  return title ?? slug;
}
