import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Clock, ChevronRight, Construction } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Unit, ComingSoonUnit } from "@/data/units";
import gymCover from "@/assets/images/gym.png";

// ---------- Unit Card (active) ------------------------------------------

interface UnitCardProps {
  unit: Unit;
  index: number;
}

function UnitCard({ unit, index }: UnitCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : Math.min(index * 0.07, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Image */}
      <div className="aspect-card relative overflow-hidden">
        <img
          src={gymCover}
          alt={`Fachada da unidade Pacer Academia ${unit.name}`}
          loading="lazy"
          decoding="async"
          width={480}
          height={320}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          aria-hidden="true"
        />
        {/* City badge */}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white/80 backdrop-blur-sm">
          {unit.city.split(" –")[0]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Name */}
        <h3 className="text-fluid-md font-bold leading-tight text-white">
          Pacer {unit.name}
        </h3>

        {/* Address */}
        <p className="flex items-start gap-1.5 text-sm text-white/60">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
          {unit.address}
        </p>

        {/* Hours */}
        <div className="flex flex-col gap-0.5">
          {unit.hours.map((h) => (
            <p key={h} className="flex items-center gap-1.5 text-xs text-white/50">
              <Clock className="h-3 w-3 shrink-0 text-primary/70" aria-hidden="true" />
              {h}
            </p>
          ))}
        </div>

        {/* Note */}
        {unit.note && (
          <p className="rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary/90">
            {unit.note}
          </p>
        )}

        {/* Spacer + CTA */}
        <div className="mt-auto pt-2">
          <Link
            to={`/unidades/${unit.slug}`}
            className={cn(
              "inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary",
              "transition-all duration-200 hover:bg-primary hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            )}
          >
            Ver unidade
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ---------- Coming Soon Card -------------------------------------------

interface ComingSoonCardProps {
  unit: ComingSoonUnit;
  index: number;
}

function ComingSoonCard({ unit, index }: ComingSoonCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : Math.min(index * 0.07, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label={`${unit.name} — em breve`}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] opacity-70"
    >
      {/* Blurred image placeholder */}
      <div className="aspect-card relative overflow-hidden">
        <img
          src={gymCover}
          alt=""
          aria-hidden="true"
          width={480}
          height={320}
          className="h-full w-full scale-105 object-cover blur-sm grayscale"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60"
          aria-hidden="true"
        >
          <Construction className="h-8 w-8 text-white/40" />
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/60">
            Em Breve
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-fluid-md font-bold text-white/70">
          Pacer {unit.name}
        </h3>
        <p className="flex items-start gap-1.5 text-sm text-white/40">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {unit.address}
        </p>
        <p className="mt-1 text-xs text-white/30">{unit.city}</p>
      </div>
    </motion.article>
  );
}

// ---------- Empty State -------------------------------------------------

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-full flex flex-col items-center gap-4 py-20 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <MapPin className="h-7 w-7 text-white/30" aria-hidden="true" />
      </div>
      <div>
        <p className="text-lg font-semibold text-white/70">
          Nenhuma unidade encontrada
        </p>
        <p className="mt-1 text-sm text-white/40">
          Tente remover alguns filtros para ver mais resultados.
        </p>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="rounded-xl border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-black"
      >
        Limpar filtros
      </button>
    </motion.div>
  );
}

// ---------- Grid --------------------------------------------------------

interface UnitsGridProps {
  filteredUnits: Unit[];
  comingSoonUnits: ComingSoonUnit[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function UnitsGrid({
  filteredUnits,
  comingSoonUnits,
  onClearFilters,
  hasActiveFilters,
}: UnitsGridProps) {
  const hasComingSoon = !hasActiveFilters && comingSoonUnits.length > 0;

  return (
    <section
      aria-label="Lista de unidades"
      className="section-padding container mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Active units grid */}
      {filteredUnits.length > 0 ? (
        <div
          className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
        >
          {filteredUnits.map((unit, i) => (
            <div key={unit.slug} role="listitem" className="h-full">
              <UnitCard unit={unit} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1">
          <EmptyState onClear={onClearFilters} />
        </div>
      )}

      {/* Coming soon section — only shown when no active filters */}
      {hasComingSoon && (
        <div className="mt-14">
          <h2 className="mb-6 flex items-center gap-2 text-fluid-md font-bold text-white/60">
            <Construction className="h-5 w-5 text-primary/60" aria-hidden="true" />
            Em Breve
          </h2>
          <div
            className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            role="list"
            aria-label="Unidades em breve"
          >
            {comingSoonUnits.map((unit, i) => (
              <div key={unit.slug} role="listitem" className="h-full">
                <ComingSoonCard unit={unit} index={i} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
