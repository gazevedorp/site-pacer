import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Unidade } from "@/types/cms";

// ---------- Unit Card (active) ------------------------------------------

interface UnitCardProps {
  unit: Unidade;
  index: number;
}

function UnitCard({ unit, index }: UnitCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : Math.min(index * 0.06, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md"
    >
      <div className="relative aspect-thumb overflow-hidden bg-muted/30">
        <img
          src={unit.coverImageUrl}
          alt={`Academia Pacer ${unit.name}`}
          loading="lazy"
          decoding="async"
          width={400}
          height={267}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          Pacer {unit.name}
        </h3>

        <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-snug text-muted-foreground">
          <MapPin
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60"
            aria-hidden
          />
          <span className="line-clamp-2">
            {unit.address} · {unit.city}
          </span>
        </p>

        {unit.hours.length > 0 && (
          <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
            <Clock
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60"
              aria-hidden
            />
            <div className="flex flex-col gap-0.5">
              {unit.hours.map((h, i) => (
                <span key={i}>{h}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4">
          <Button
            variant="default"
            size="sm"
            className="w-full justify-between"
            asChild
          >
            <Link to={`/unidades/${unit.slug}`}>
              Ver unidade
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

// ---------- Coming Soon Card -------------------------------------------

interface ComingSoonCardProps {
  unit: Unidade;
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
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card/70 opacity-80"
    >
      {/* Blurred image placeholder */}
      <div className="aspect-card relative overflow-hidden">
        <img
          src={unit.coverImageUrl}
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
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-card-border bg-card">
        <MapPin className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
      </div>
      <div>
        <p className="text-lg font-semibold text-foreground">
          Nenhuma unidade encontrada
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
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
  filteredUnits: Unidade[];
  comingSoonUnits: Unidade[];
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
          <h2 className="mb-6 flex items-center gap-2 text-fluid-md font-bold text-muted-foreground">
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
