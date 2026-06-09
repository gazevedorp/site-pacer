import type { UnitClassPreview } from "@/types/unit";

/** Schedule preview mock — hidden from unit detail until CMS schedule (future phase). */

const DAY_NAMES = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const;

export function getTodayName(): string {
  return DAY_NAMES[new Date().getDay()];
}

const BASE_SCHEDULE: UnitClassPreview[] = [
  { id: "b1", time: "05:30", modality: "Funcional", instructor: "Ana Lima", day: "hoje" },
  { id: "b2", time: "07:00", modality: "Musculação", instructor: "Carlos Moura", day: "hoje" },
  { id: "b3", time: "08:30", modality: "Zumba & Dança", instructor: "Juliana Neves", room: "Sala 1", day: "hoje" },
  { id: "b4", time: "12:00", modality: "Funcional", instructor: "Rafael Souza", room: "Sala 2", day: "hoje" },
  { id: "b5", time: "17:00", modality: "Muay Thai", instructor: "Bruno Castro", room: "Tatame", day: "hoje" },
  { id: "b6", time: "18:30", modality: "Zumba & Dança", instructor: "Fernanda Reis", day: "hoje" },
];

export function getUnitClasses(_slug: string): UnitClassPreview[] {
  return [...BASE_SCHEDULE].sort((a, b) => a.time.localeCompare(b.time)).slice(0, 6);
}
