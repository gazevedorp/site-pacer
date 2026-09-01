import { useState } from "react";
import { DAYS } from "@/data/schedule";
import type { ScheduleClass, ScheduleDay } from "@/data/schedule";
import { cn } from "@/lib/utils";
import {
  ScheduleClassCard,
  ScheduleClassModal,
} from "@/components/sections/Schedule/ScheduleClassCard";

const GRID_COLS = "4.5rem repeat(7, minmax(0, 1fr))";

interface ScheduleDesktopProps {
  classes: ScheduleClass[];
  highlightDay: ScheduleDay;
}

export function ScheduleDesktop({ classes, highlightDay }: ScheduleDesktopProps) {
  const [selected, setSelected] = useState<ScheduleClass | null>(null);
  const timeSlots = Array.from(new Set(classes.map((c) => c.time))).sort();

  const lookup = new Map<string, Map<ScheduleDay, ScheduleClass[]>>();
  for (const cls of classes) {
    if (!lookup.has(cls.time)) lookup.set(cls.time, new Map());
    const dayMap = lookup.get(cls.time)!;
    if (!dayMap.has(cls.day)) dayMap.set(cls.day, []);
    dayMap.get(cls.day)!.push(cls);
  }

  return (
    <>
      <div
        className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm"
        role="table"
        aria-label="Grade de aulas semanal"
      >
        <div style={{ minWidth: "860px" }}>
          <div
            role="row"
            className="sticky top-0 z-20 grid bg-zinc-50"
            style={{ gridTemplateColumns: GRID_COLS }}
            aria-rowindex={1}
          >
            <div
              role="columnheader"
              className="border-b border-border px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Horário
            </div>
            {DAYS.map((day) => (
              <div
                key={day.key}
                role="columnheader"
                aria-sort="none"
                className={cn(
                  "min-w-0 border-b border-l border-border px-1 py-3 text-center text-xs font-semibold uppercase tracking-wide",
                  day.key === highlightDay
                    ? "bg-primary/15 text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span className="hidden sm:inline">{day.short}</span>
                <span className="sm:hidden">{day.short.charAt(0)}</span>
                {day.key === highlightDay ? (
                  <span className="ml-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-primary align-middle" />
                ) : null}
              </div>
            ))}
          </div>

          <div role="rowgroup">
            {timeSlots.map((time, rowIdx) => (
              <div
                key={time}
                role="row"
                aria-rowindex={rowIdx + 2}
                className="grid border-b border-border last:border-0"
                style={{ gridTemplateColumns: GRID_COLS }}
              >
                <div
                  role="rowheader"
                  className="sticky left-0 z-10 flex items-start border-r border-border bg-white px-3 pt-3 text-xs font-semibold tabular-nums text-foreground"
                >
                  {time}
                </div>

                {DAYS.map((day) => {
                  const cellClasses = lookup.get(time)?.get(day.key) ?? [];
                  return (
                    <div
                      key={day.key}
                      role="cell"
                      className={cn(
                        "min-w-0 border-l border-border p-1",
                        day.key === highlightDay && "bg-primary/5"
                      )}
                    >
                      <div className="flex w-full min-w-0 flex-col gap-1">
                        {cellClasses.map((cls) => (
                          <ScheduleClassCard
                            key={cls.id}
                            cls={cls}
                            onSelect={setSelected}
                          />
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

      <ScheduleClassModal cls={selected} onClose={() => setSelected(null)} />
    </>
  );
}
