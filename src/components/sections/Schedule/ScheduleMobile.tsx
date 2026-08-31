import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, User, MapPin } from "lucide-react";
import { DAYS, getModalityColor } from "@/data/schedule";
import type { ScheduleClass, ScheduleDay } from "@/data/schedule";
import { cn } from "@/lib/utils";
import { ScheduleClassModal } from "@/components/sections/Schedule/ScheduleClassCard";

function MobileClassCard({
  cls,
  index,
  onSelect,
}: {
  cls: ScheduleClass;
  index: number;
  onSelect: (cls: ScheduleClass) => void;
}) {
  const tone = getModalityColor(cls.modalityId);
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      initial={reduced ? false : { opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
      onClick={() => onSelect(cls)}
      className={cn(
        "relative flex h-[5.75rem] w-full gap-4 overflow-hidden rounded-xl border border-border bg-white p-4 pl-5 text-left shadow-sm",
        "transition-shadow hover:border-primary/30 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      )}
      aria-label={`Ver detalhes de ${cls.modalityLabel} às ${cls.time}`}
    >
      <div
        className={cn("absolute inset-y-0 left-0 w-1", !cls.accentColor && tone.accent)}
        style={cls.accentColor ? { backgroundColor: cls.accentColor } : undefined}
        aria-hidden
      />

      <div className="w-14 shrink-0 text-center">
        <p className="text-lg font-bold leading-none tabular-nums text-primary">
          {cls.time}
        </p>
        <p className="mt-1 truncate text-[12px] text-muted-foreground">
          {cls.durationMin}min
        </p>
      </div>

      <div className="w-px self-stretch rounded-full bg-border" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {cls.modalityLabel}
        </p>
        <p className="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <User className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{cls.instructor}</span>
        </p>
        <p className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground/80">
          <MapPin className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{cls.room || "Sala a confirmar"}</span>
        </p>
      </div>
    </motion.button>
  );
}

interface ScheduleMobileProps {
  classes: ScheduleClass[];
  selectedDay: ScheduleDay;
  onDayChange: (day: ScheduleDay) => void;
}

export function ScheduleMobile({
  classes,
  selectedDay,
  onDayChange,
}: ScheduleMobileProps) {
  const [selected, setSelected] = useState<ScheduleClass | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && carouselRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedDay]);

  const dayClasses = classes
    .filter((c) => c.day === selectedDay)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div>
      <div
        ref={carouselRef}
        role="tablist"
        aria-label="Dias da semana"
        className="flex gap-2 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {DAYS.map((day) => {
          const count = classes.filter((c) => c.day === day.key).length;
          const isActive = day.key === selectedDay;
          return (
            <button
              key={day.key}
              ref={isActive ? activeRef : undefined}
              role="tab"
              aria-selected={isActive}
              aria-controls="schedule-mobile-list"
              onClick={() => onDayChange(day.key)}
              style={{ scrollSnapAlign: "center" }}
              className={cn(
                "flex shrink-0 flex-col items-center gap-0.5 rounded-xl border px-4 py-2.5 text-sm transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "border-primary bg-primary/15 font-semibold text-foreground"
                  : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              <span>{day.short}</span>
              {count > 0 ? (
                <span
                  className={cn(
                    "text-[12px] leading-none",
                    isActive ? "text-primary" : "text-muted-foreground/70"
                  )}
                >
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        id="schedule-mobile-list"
        role="tabpanel"
        aria-label={`Aulas de ${DAYS.find((d) => d.key === selectedDay)?.label}`}
        className="mt-4"
      >
        {dayClasses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Clock
              className="mb-4 h-12 w-12 text-muted"
              aria-hidden
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-muted-foreground">
              Nenhuma aula neste dia
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Tente outro dia ou ajuste os filtros acima.
            </p>
          </div>
        ) : (
          <div
            className="flex flex-col gap-3"
            style={{ contain: "content" }}
            aria-live="polite"
            aria-atomic="true"
          >
            {dayClasses.map((cls, i) => (
              <MobileClassCard
                key={cls.id}
                cls={cls}
                index={i}
                onSelect={setSelected}
              />
            ))}
          </div>
        )}
      </div>

      <ScheduleClassModal cls={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
