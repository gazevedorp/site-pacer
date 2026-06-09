import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, User, MapPin } from "lucide-react";
import { DAYS, MODALITY_COLORS } from "@/data/schedule";
import type { ScheduleClass, ScheduleDay } from "@/data/schedule";
import { cn } from "@/lib/utils";

// ─── Mobile class card ────────────────────────────────────────────────────────

function MobileClassCard({
  cls,
  index,
}: {
  cls: ScheduleClass;
  index: number;
}) {
  const color = MODALITY_COLORS[cls.modalityId] ?? MODALITY_COLORS["funcional"];
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
      className={cn(
        "flex gap-4 rounded-xl border p-4",
        "contain-content",
        color.bg,
        color.border
      )}
      aria-label={`${cls.modalityLabel} às ${cls.time} com ${cls.instructor}`}
    >
      {/* Time column */}
      <div className="shrink-0 text-center">
        <p className={cn("text-lg font-bold leading-none", color.text)}>
          {cls.time}
        </p>
        <p className="mt-1 text-[12px] text-white/35">{cls.durationMin}min</p>
      </div>

      {/* Divider */}
      <div className={cn("w-px self-stretch rounded-full opacity-40", color.border)} />

      {/* Details */}
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-semibold", color.text)}>
          {cls.modalityLabel}
        </p>
        <div className="mt-1.5 flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-xs text-white/55">
            <User className="h-3 w-3 shrink-0" aria-hidden />
            {cls.instructor}
          </span>
          {cls.room && (
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden />
              {cls.room}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-white/35">
            <Clock className="h-3 w-3 shrink-0" aria-hidden />
            {cls.time} · {cls.durationMin} minutos
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ScheduleMobileProps {
  classes: ScheduleClass[];
  selectedDay: ScheduleDay;
  onDayChange: (day: ScheduleDay) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ScheduleMobile({
  classes,
  selectedDay,
  onDayChange,
}: ScheduleMobileProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active day button into view when it changes
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
      {/* Day carousel */}
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
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"
              )}
            >
              <span>{day.short}</span>
              {count > 0 && (
                <span
                  className={cn(
                    "text-[12px] leading-none",
                    isActive ? "text-primary/70" : "text-white/30"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Class list */}
      <div
        id="schedule-mobile-list"
        role="tabpanel"
        aria-label={`Aulas de ${DAYS.find((d) => d.key === selectedDay)?.label}`}
        className="mt-4"
      >
        {dayClasses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Clock
              className="mb-4 h-12 w-12 text-white/15"
              aria-hidden
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-white/40">
              Nenhuma aula neste dia
            </p>
            <p className="mt-1 text-xs text-white/25">
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
              <MobileClassCard key={cls.id} cls={cls} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
