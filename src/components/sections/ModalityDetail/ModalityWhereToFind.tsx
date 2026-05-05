import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { units } from "@/data/units";
import { modalities } from "@/data/modalities";

type ModalityItem = (typeof modalities)[number];

interface ModalityWhereToFindProps {
  modality: ModalityItem;
}

export function ModalityWhereToFind({ modality }: ModalityWhereToFindProps) {
  const reduced = useReducedMotion();
  const availableUnitData = units.filter((u) =>
    modality.availableUnits.includes(u.slug)
  );

  if (availableUnitData.length === 0) {
    return (
      <section
        aria-label="Onde encontrar"
        className="section-padding container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="mb-4 text-fluid-xl font-bold text-white">
          Onde encontrar
        </h2>
        <p className="text-sm text-white/50">
          Modalidade disponível em breve em nossas unidades.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label={`Onde encontrar ${modality.title}`}
      className="section-padding container mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="mb-1 text-fluid-xl font-bold text-white">
            Onde encontrar
          </h2>
          <p className="text-sm text-white/50">
            {availableUnitData.length}{" "}
            {availableUnitData.length === 1
              ? "unidade oferece"
              : "unidades oferecem"}{" "}
            {modality.title}.
          </p>
        </div>
        <Link
          to="/unidades"
          className="inline-flex items-center gap-1.5 text-sm text-primary/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Ver todas as unidades
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        role="list"
      >
        {availableUnitData.map((unit, i) => (
          <motion.div
            key={unit.slug}
            role="listitem"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 0.5,
              delay: reduced ? 0 : Math.min(i * 0.08, 0.4),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              to={`/unidades/${unit.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-white/[0.06] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label={`Ver unidade Pacer ${unit.name}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-primary/90 transition-colors">
                    Pacer {unit.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-white/40">{unit.city}</p>
                </div>
                <ChevronRight
                  className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-primary"
                  aria-hidden
                />
              </div>

              {/* Address */}
              <p className="flex items-start gap-1.5 text-xs text-white/55">
                <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-primary/60" aria-hidden />
                {unit.address}
              </p>

              {/* Hours */}
              {unit.hours[0] && (
                <p className="text-xs text-white/35">{unit.hours[0]}</p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
