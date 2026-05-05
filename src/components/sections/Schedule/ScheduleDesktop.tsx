import { Clock, User, MapPin } from "lucide-react";
import { DAYS, MODALITY_COLORS } from "@/data/schedule";
import type { ScheduleClass, ScheduleDay } from "@/data/schedule";
import { cn } from "@/lib/utils";

// ─── Class card ───────────────────────────────────────────────────────────────

function ClassCard({ cls }: { cls: ScheduleClass }) {
  const color = MODALITY_COLORS[cls.modalityId] ?? MODALITY_COLORS["funcional"];

  return (
    <div
      className={cn(
        "rounded-lg border p-2.5 text-left transition-shadow hover:shadow-md",
        "contain-content",
        color.bg,
        color.border
      )}
      role="article"
      aria-label={`${cls.modalityLabel} às ${cls.time} com ${cls.instructor}`}
    >
      <div className={cn("mb-1 text-[11px] font-semibold uppercase tracking-wide", color.text)}>
        {cls.modalityLabel}
      </div>
      <div className="flex items-center gap-1 text-[11px] text-white/70">
        <Clock className="h-2.5 w-2.5 shrink-0" aria-hidden />
        <span>{cls.time}</span>
        <span className="text-white/30">·</span>
        <span>{cls.durationMin}min</span>
      </div>
      <div className="mt-1 flex items-center gap-1 text-[11px] text-white/50">
        <User className="h-2.5 w-2.5 shrink-0" aria-hidden />
        <span className="truncate">{cls.instructor}</span>
      </div>
      {cls.room && (
        <div className="mt-0.5 flex items-center gap-1 text-[11px] text-white/40">
          <MapPin className="h-2.5 w-2.5 shrink-0" aria-hidden />
          <span className="truncate">{cls.room}</span>
        </div>
      )}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ScheduleDesktopProps {
  classes: ScheduleClass[];
  highlightDay: ScheduleDay;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ScheduleDesktop({ classes, highlightDay }: ScheduleDesktopProps) {
  // Collect and sort unique time slots present in the filtered list
  const timeSlots = Array.from(new Set(classes.map((c) => c.time))).sort();

  // Build lookup: time → day → classes[]
  const lookup = new Map<string, Map<ScheduleDay, ScheduleClass[]>>();
  for (const cls of classes) {
    if (!lookup.has(cls.time)) lookup.set(cls.time, new Map());
    const dayMap = lookup.get(cls.time)!;
    if (!dayMap.has(cls.day)) dayMap.set(cls.day, []);
    dayMap.get(cls.day)!.push(cls);
  }

  return (
    <div
      className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02]"
      role="table"
      aria-label="Grade de aulas semanal"
    >
      <div style={{ minWidth: "860px" }}>
        {/* Day-header row */}
        <div
          role="row"
          className="grid bg-white/[0.03]"
          style={{ gridTemplateColumns: "72px repeat(7, 1fr)" }}
          aria-rowindex={1}
        >
          <div
            role="columnheader"
            className="border-b border-white/[0.08] px-3 py-3 text-xs font-medium text-white/30"
          >
            Horário
          </div>
          {DAYS.map((day) => (
            <div
              key={day.key}
              role="columnheader"
              aria-sort="none"
              className={cn(
                "border-b border-l border-white/[0.08] px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide transition-colors",
                day.key === highlightDay
                  ? "bg-primary/10 text-primary"
                  : "text-white/50"
              )}
            >
              <span className="hidden sm:inline">{day.short}</span>
              <span className="sm:hidden">{day.short.charAt(0)}</span>
              {day.key === highlightDay && (
                <span className="ml-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-primary align-middle" />
              )}
            </div>
          ))}
        </div>

        {/* Time rows */}
        <div role="rowgroup">
          {timeSlots.map((time, rowIdx) => (
            <div
              key={time}
              role="row"
              aria-rowindex={rowIdx + 2}
              className="grid border-b border-white/[0.05] last:border-0"
              style={{ gridTemplateColumns: "72px repeat(7, 1fr)" }}
            >
              {/* Time label — sticky left */}
              <div
                role="rowheader"
                className="sticky left-0 z-10 flex items-start border-r border-white/[0.05] bg-background/90 px-3 pt-3 text-xs font-mono text-white/40"
              >
                {time}
              </div>

              {/* Day cells */}
              {DAYS.map((day) => {
                const cellClasses = lookup.get(time)?.get(day.key) ?? [];
                return (
                  <div
                    key={day.key}
                    role="cell"
                    className={cn(
                      "border-l border-white/[0.05] p-1.5",
                      day.key === highlightDay && "bg-primary/[0.03]"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      {cellClasses.map((cls) => (
                        <ClassCard key={cls.id} cls={cls} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
