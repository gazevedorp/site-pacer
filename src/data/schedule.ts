import type { UnitModalityId } from "@/data/units";
import { units } from "@/data/units";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ScheduleDay =
  | "seg"
  | "ter"
  | "qua"
  | "qui"
  | "sex"
  | "sab"
  | "dom";

export type PublicoAlvo = "adulto" | "kids";

export interface ScheduleClass {
  id: string;
  unitSlug: string;
  day: ScheduleDay;
  time: string; // "HH:MM"
  durationMin: number;
  modalityId: UnitModalityId;
  modalityLabel: string;
  instructor: string;
  room?: string;
  publicoAlvo: PublicoAlvo;
}

export interface DayMeta {
  key: ScheduleDay;
  label: string;
  short: string;
  jsDay: number; // JS Date.getDay(): 0=Sun
}

// ─── Days config ──────────────────────────────────────────────────────────────

export const DAYS: DayMeta[] = [
  { key: "seg", label: "Segunda-feira", short: "Seg", jsDay: 1 },
  { key: "ter", label: "Terça-feira",   short: "Ter", jsDay: 2 },
  { key: "qua", label: "Quarta-feira",  short: "Qua", jsDay: 3 },
  { key: "qui", label: "Quinta-feira",  short: "Qui", jsDay: 4 },
  { key: "sex", label: "Sexta-feira",   short: "Sex", jsDay: 5 },
  { key: "sab", label: "Sábado",        short: "Sáb", jsDay: 6 },
  { key: "dom", label: "Domingo",       short: "Dom", jsDay: 0 },
];

export function getTodayScheduleDay(): ScheduleDay {
  const map: Record<number, ScheduleDay> = {
    0: "dom", 1: "seg", 2: "ter", 3: "qua", 4: "qui", 5: "sex", 6: "sab",
  };
  return map[new Date().getDay()];
}

// ─── Modality meta ────────────────────────────────────────────────────────────

export const MODALITY_LABELS: Record<UnitModalityId, string> = {
  musculacao:    "Musculação",
  funcional:     "Funcional",
  "muay-thai":   "Muay Thai",
  pilates:       "Pilates",
  hidroginastica:"Hidroginástica",
  natacao:       "Natação Infantil",
  danca:         "Dança",
  zumba:         "Zumba",
};

export const MODALITY_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  musculacao:    { bg: "bg-blue-500/15",   text: "text-blue-300",   border: "border-blue-500/30"   },
  funcional:     { bg: "bg-orange-500/15", text: "text-orange-300", border: "border-orange-500/30" },
  "muay-thai":   { bg: "bg-red-500/15",    text: "text-red-300",    border: "border-red-500/30"    },
  pilates:       { bg: "bg-teal-500/15",   text: "text-teal-300",   border: "border-teal-500/30"   },
  hidroginastica:{ bg: "bg-cyan-500/15",   text: "text-cyan-300",   border: "border-cyan-500/30"   },
  natacao:       { bg: "bg-indigo-500/15", text: "text-indigo-300", border: "border-indigo-500/30" },
  danca:         { bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-500/30" },
  zumba:         { bg: "bg-pink-500/15",   text: "text-pink-300",   border: "border-pink-500/30"   },
};

// ─── Instructor pool per modality ─────────────────────────────────────────────

const INSTRUCTORS: Record<UnitModalityId, string[]> = {
  musculacao:    ["Carlos Moura", "Marcos Alves", "Felipe Santos", "Rodrigo Costa"],
  funcional:     ["Ana Lima", "Rafael Souza", "Lucas Ferreira", "Camila Torres"],
  "muay-thai":   ["Bruno Castro", "Diego Oliveira", "Alexandre Ramos", "Paulo Mendes"],
  pilates:       ["Patrícia Melo", "Diana Costa"],
  hidroginastica:["Renata Dias", "Cláudia Pires"],
  natacao:       ["Eduardo Matos", "Viviane Cruz"],
  danca:         ["Juliana Neves", "Fernanda Reis", "Isabela Porto"],
  zumba:         ["Fernanda Reis", "Luciana Gomes", "Thaís Marques"],
};

// ─── Weekly slot templates per modality ──────────────────────────────────────

type SlotTemplate = {
  day: ScheduleDay;
  time: string;
  durationMin: number;
  room?: string;
  publicoAlvo?: PublicoAlvo;
};

const BASE_SLOTS: Record<UnitModalityId, SlotTemplate[]> = {
  musculacao: [
    { day: "seg", time: "07:00", durationMin: 60 },
    { day: "ter", time: "08:30", durationMin: 60 },
    { day: "qua", time: "07:00", durationMin: 60 },
    { day: "qui", time: "08:30", durationMin: 60 },
    { day: "sex", time: "07:00", durationMin: 60 },
    { day: "sab", time: "09:00", durationMin: 60 },
  ],
  funcional: [
    { day: "seg", time: "06:00", durationMin: 60, room: "Sala Funcional" },
    { day: "seg", time: "08:30", durationMin: 60, room: "Sala Funcional" },
    { day: "seg", time: "17:30", durationMin: 60, room: "Sala Funcional" },
    { day: "seg", time: "19:00", durationMin: 60, room: "Sala Funcional" },
    { day: "ter", time: "06:30", durationMin: 60, room: "Sala Funcional" },
    { day: "ter", time: "08:00", durationMin: 60, room: "Sala Funcional" },
    { day: "ter", time: "18:00", durationMin: 60, room: "Sala Funcional" },
    { day: "ter", time: "19:30", durationMin: 60, room: "Sala Funcional" },
    { day: "qua", time: "06:00", durationMin: 60, room: "Sala Funcional" },
    { day: "qua", time: "08:30", durationMin: 60, room: "Sala Funcional" },
    { day: "qua", time: "17:30", durationMin: 60, room: "Sala Funcional" },
    { day: "qua", time: "19:00", durationMin: 60, room: "Sala Funcional" },
    { day: "qui", time: "06:30", durationMin: 60, room: "Sala Funcional" },
    { day: "qui", time: "08:00", durationMin: 60, room: "Sala Funcional" },
    { day: "qui", time: "18:00", durationMin: 60, room: "Sala Funcional" },
    { day: "qui", time: "19:30", durationMin: 60, room: "Sala Funcional" },
    { day: "sex", time: "06:00", durationMin: 60, room: "Sala Funcional" },
    { day: "sex", time: "08:30", durationMin: 60, room: "Sala Funcional" },
    { day: "sex", time: "17:30", durationMin: 60, room: "Sala Funcional" },
    { day: "sex", time: "19:00", durationMin: 60, room: "Sala Funcional" },
    { day: "sab", time: "08:00", durationMin: 60, room: "Sala Funcional" },
    { day: "sab", time: "09:30", durationMin: 60, room: "Sala Funcional" },
  ],
  "muay-thai": [
    { day: "seg", time: "07:00", durationMin: 60, room: "Tatame" },
    { day: "ter", time: "19:30", durationMin: 60, room: "Tatame" },
    { day: "qua", time: "07:00", durationMin: 60, room: "Tatame" },
    { day: "qui", time: "19:30", durationMin: 60, room: "Tatame" },
    { day: "sex", time: "07:00", durationMin: 60, room: "Tatame" },
    { day: "sab", time: "09:00", durationMin: 60, room: "Tatame" },
    // Kids
    { day: "ter", time: "16:00", durationMin: 50, room: "Tatame", publicoAlvo: "kids" },
    { day: "qui", time: "16:00", durationMin: 50, room: "Tatame", publicoAlvo: "kids" },
    { day: "sab", time: "10:30", durationMin: 50, room: "Tatame", publicoAlvo: "kids" },
  ],
  pilates: [
    { day: "seg", time: "08:00", durationMin: 50, room: "Studio Pilates" },
    { day: "seg", time: "10:00", durationMin: 50, room: "Studio Pilates" },
    { day: "ter", time: "08:00", durationMin: 50, room: "Studio Pilates" },
    { day: "ter", time: "14:00", durationMin: 50, room: "Studio Pilates" },
    { day: "qua", time: "08:00", durationMin: 50, room: "Studio Pilates" },
    { day: "qua", time: "10:00", durationMin: 50, room: "Studio Pilates" },
    { day: "qui", time: "08:00", durationMin: 50, room: "Studio Pilates" },
    { day: "qui", time: "14:00", durationMin: 50, room: "Studio Pilates" },
    { day: "sex", time: "08:00", durationMin: 50, room: "Studio Pilates" },
    { day: "sex", time: "10:00", durationMin: 50, room: "Studio Pilates" },
    { day: "sab", time: "09:00", durationMin: 50, room: "Studio Pilates" },
  ],
  hidroginastica: [
    { day: "seg", time: "07:00", durationMin: 45, room: "Piscina" },
    { day: "seg", time: "17:30", durationMin: 45, room: "Piscina" },
    { day: "ter", time: "09:00", durationMin: 45, room: "Piscina" },
    { day: "ter", time: "19:00", durationMin: 45, room: "Piscina" },
    { day: "qua", time: "07:00", durationMin: 45, room: "Piscina" },
    { day: "qua", time: "17:30", durationMin: 45, room: "Piscina" },
    { day: "qui", time: "09:00", durationMin: 45, room: "Piscina" },
    { day: "qui", time: "19:00", durationMin: 45, room: "Piscina" },
    { day: "sex", time: "07:00", durationMin: 45, room: "Piscina" },
    { day: "sex", time: "17:30", durationMin: 45, room: "Piscina" },
    { day: "sab", time: "08:30", durationMin: 45, room: "Piscina" },
    { day: "sab", time: "10:00", durationMin: 45, room: "Piscina" },
    // Kids
    { day: "ter", time: "15:00", durationMin: 40, room: "Piscina", publicoAlvo: "kids" },
    { day: "qui", time: "15:00", durationMin: 40, room: "Piscina", publicoAlvo: "kids" },
    { day: "sab", time: "09:30", durationMin: 40, room: "Piscina", publicoAlvo: "kids" },
  ],
  natacao: [
    { day: "seg", time: "09:00", durationMin: 45, room: "Piscina" },
    { day: "ter", time: "10:30", durationMin: 45, room: "Piscina" },
    { day: "qua", time: "09:00", durationMin: 45, room: "Piscina" },
    { day: "qui", time: "10:30", durationMin: 45, room: "Piscina" },
    { day: "sex", time: "09:00", durationMin: 45, room: "Piscina" },
    { day: "sab", time: "10:00", durationMin: 45, room: "Piscina" },
  ],
  danca: [
    { day: "seg", time: "20:00", durationMin: 60, room: "Sala 1" },
    { day: "ter", time: "19:30", durationMin: 60, room: "Sala 1" },
    { day: "qua", time: "20:00", durationMin: 60, room: "Sala 1" },
    { day: "qui", time: "19:30", durationMin: 60, room: "Sala 1" },
    { day: "sex", time: "20:30", durationMin: 60, room: "Sala 1" },
    { day: "sab", time: "10:30", durationMin: 60, room: "Sala 1" },
    // Kids
    { day: "ter", time: "15:30", durationMin: 50, room: "Sala 1", publicoAlvo: "kids" },
    { day: "qui", time: "15:30", durationMin: 50, room: "Sala 1", publicoAlvo: "kids" },
    { day: "sab", time: "09:00", durationMin: 50, room: "Sala 1", publicoAlvo: "kids" },
  ],
  zumba: [
    { day: "seg", time: "20:30", durationMin: 60, room: "Sala 2" },
    { day: "qua", time: "20:30", durationMin: 60, room: "Sala 2" },
    { day: "sex", time: "20:00", durationMin: 60, room: "Sala 2" },
    { day: "sab", time: "10:00", durationMin: 60, room: "Sala 2" },
    // Kids
    { day: "sab", time: "09:00", durationMin: 45, room: "Sala 2", publicoAlvo: "kids" },
    { day: "qua", time: "15:30", durationMin: 45, room: "Sala 2", publicoAlvo: "kids" },
  ],
};

// ─── Generate full schedule from unit data ────────────────────────────────────

export const scheduleClasses: ScheduleClass[] = units.flatMap(
  (unit, unitIndex) =>
    unit.unitModalities.flatMap((modalityId, modIndex) => {
      const slots = BASE_SLOTS[modalityId] ?? [];
      const instructorPool = INSTRUCTORS[modalityId];
      return slots.map((slot, slotIndex) => ({
        id: `${unit.slug}-${modalityId}-${slot.day}-${slot.time.replace(":", "")}`,
        unitSlug: unit.slug,
        day: slot.day,
        time: slot.time,
        durationMin: slot.durationMin,
        modalityId,
        modalityLabel: MODALITY_LABELS[modalityId],
        instructor:
          instructorPool[
            (unitIndex + modIndex + slotIndex) % instructorPool.length
          ],
        room: slot.room,        publicoAlvo: (slot.publicoAlvo ?? (modalityId === "natacao" ? "kids" : "adulto")) as PublicoAlvo,      }));
    })
);

// ─── Filter helper ────────────────────────────────────────────────────────────

export function getFilteredClasses({
  unitSlug,
  modalityId,
  day,
  publicoAlvo,
}: {
  unitSlug?: string;
  modalityId?: string;
  day?: ScheduleDay;
  publicoAlvo?: PublicoAlvo;
}): ScheduleClass[] {
  return scheduleClasses.filter((c) => {
    if (unitSlug && c.unitSlug !== unitSlug) return false;
    if (modalityId && c.modalityId !== modalityId) return false;
    if (day && c.day !== day) return false;
    if (publicoAlvo && c.publicoAlvo !== publicoAlvo) return false;
    return true;
  });
}
