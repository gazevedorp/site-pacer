import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight, CalendarDays } from "lucide-react";
import { getUnitClasses, getTodayName } from "@/data/unitDetail";
import type { UnitClassPreview } from "@/types/unit";
import { SCHEDULE_PAGE_ENABLED } from "@/config/features";

// ─── Class Card ──────────────────────────────────────────────────────────────

function ClassCard({
  cls,
  index,
}: {
  cls: UnitClassPreview;
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.45,
        delay: reduced ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex items-start gap-4 rounded-2xl border border-card-border bg-card p-4 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-surface-raised"
    >
      {/* Time badge */}
      <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 px-3 py-2 text-center">
        <Clock className="mb-0.5 h-3.5 w-3.5 text-primary" aria-hidden />
        <span className="text-sm font-bold tabular-nums text-primary">{cls.time}</span>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-white">{cls.modality}</p>
        <p className="mt-0.5 text-xs text-white/50">
          Prof. {cls.instructor}
        </p>
        {cls.room && (
          <p className="mt-1 flex items-center gap-1 text-xs text-white/40">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
            {cls.room}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

interface UnitSchedulePreviewProps {
  slug: string;
}

export function UnitSchedulePreview({ slug }: UnitSchedulePreviewProps) {
  const classes = getUnitClasses(slug);
  const todayName = getTodayName();

  return (
    <section
      aria-label="Grade de aulas de hoje"
      className="section-padding container mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="mb-1 text-fluid-xl font-bold text-foreground">
            Aulas de hoje
          </h2>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 text-primary/70" aria-hidden />
            {todayName} — próximas {classes.length} aulas
          </p>
        </div>
        {SCHEDULE_PAGE_ENABLED ? (
          <Link
            to={`/aulas?unidade=${slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Ver grade completa
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : (
          <span
            className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-xl border border-border bg-muted/20 px-4 py-2 text-sm font-semibold text-muted-foreground/50"
            aria-disabled="true"
            title="Em breve"
          >
            Grade em breve
          </span>
        )}
      </div>

      {/* Class cards grid */}
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Aulas disponíveis hoje"
      >
        {classes.map((cls, i) => (
          <div key={cls.id} role="listitem">
            <ClassCard cls={cls} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
