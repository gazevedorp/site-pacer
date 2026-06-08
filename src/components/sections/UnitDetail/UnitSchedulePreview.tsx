import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight, CalendarDays } from "lucide-react";
import { getUnitClasses, getTodayName } from "@/data/unitDetail";
import type { UnitClassPreview } from "@/types/unit";
import { SCHEDULE_PAGE_ENABLED } from "@/config/features";
import { UnitSection } from "@/components/sections/UnitDetail/UnitSection";

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
      className="flex items-start gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm transition-colors hover:border-primary/25 hover:shadow-md"
    >
      <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 px-3 py-2 text-center">
        <Clock className="mb-0.5 h-3.5 w-3.5 text-primary" aria-hidden />
        <span className="text-sm font-bold tabular-nums text-primary">{cls.time}</span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-foreground">{cls.modality}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Prof. {cls.instructor}
        </p>
        {cls.room && (
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground/80">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
            {cls.room}
          </p>
        )}
      </div>
    </motion.div>
  );
}

interface UnitSchedulePreviewProps {
  slug: string;
}

export function UnitSchedulePreview({ slug }: UnitSchedulePreviewProps) {
  const classes = getUnitClasses(slug);
  const todayName = getTodayName();

  return (
    <UnitSection
      ariaLabel="Grade de aulas de hoje"
      variant="inset"
      eyebrow="Grade"
      title="Aulas de hoje"
      description={`${todayName} — próximas ${classes.length} aulas nesta unidade.`}
      action={
        SCHEDULE_PAGE_ENABLED ? (
          <Link
            to={`/aulas?unidade=${slug}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <CalendarDays className="h-4 w-4" aria-hidden />
            Ver grade completa
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : (
          <span
            className="inline-flex shrink-0 cursor-not-allowed items-center gap-1.5 rounded-xl border border-border bg-muted/30 px-4 py-2 text-sm font-semibold text-muted-foreground/50"
            aria-disabled="true"
            title="Em breve"
          >
            Grade em breve
          </span>
        )
      }
    >
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
    </UnitSection>
  );
}
