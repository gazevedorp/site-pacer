import { useState, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Loader2, X, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCepGeocode, haversineKm, formatCep } from "@/hooks/useCepGeocode";
import { useUnidades } from "@/hooks/cms/useUnidades";
import { isActiveUnit } from "@/lib/cms/mappers/unidade";
import { CmsEmpty, CmsLoading } from "@/components/shared/CmsStates";
import type { Unidade } from "@/types/cms";

type UnitWithDistance = Unidade & { distance: number | null };

export function HomeUnitsSearch() {
  const reduced = useReducedMotion();
  const [cep, setCep] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const geocode = useCepGeocode(cep);
  const { data: unidades, isLoading } = useUnidades();

  const activeUnits = useMemo(
    () => unidades.filter(isActiveUnit),
    [unidades]
  );

  const sortedUnits = useMemo((): UnitWithDistance[] => {
    if (geocode.result) {
      const { lat, lng } = geocode.result;
      return [...activeUnits]
        .map((u) => ({
          ...u,
          distance: haversineKm(lat, lng, u.lat, u.lng),
        }))
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
    }
    return activeUnits.slice(0, 8).map((u) => ({ ...u, distance: null }));
  }, [activeUnits, geocode.result]);

  const unitCountLabel =
    activeUnits.length > 0
      ? `${activeUnits.length} unidade${activeUnits.length === 1 ? "" : "s"}`
      : "Unidades";

  return (
    <section
      id="unidades"
      aria-label="Encontre uma unidade"
      className="relative py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Unidades
          </p>
          <h2 className="mt-3 text-fluid-xl font-bold tracking-tight">
            Perto de <span className="text-primary">você</span>
          </h2>
          <p className="mt-4 text-fluid-md leading-relaxed text-muted-foreground">
            {unitCountLabel} em Ribeirão e região. Mesma qualidade,
            equipamentos de alto padrão e ambiente 100% climatizado.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-md">
          <div className="relative">
            <label htmlFor="units-cep" className="sr-only">
              Buscar unidade mais próxima pelo CEP
            </label>
            <Navigation
              aria-hidden
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              ref={inputRef}
              id="units-cep"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="Digite seu CEP…"
              value={cep}
              onChange={(e) => setCep(formatCep(e.target.value))}
              maxLength={9}
              className="w-full rounded-xl border border-border bg-card/5 py-3.5 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-xl outline-none transition-all focus:border-primary/60 focus:bg-card/10 focus:shadow-glow-sm"
            />
            {geocode.status === "loading" ? (
              <Loader2
                aria-hidden
                className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-primary"
              />
            ) : cep ? (
              <button
                onClick={() => {
                  setCep("");
                  inputRef.current?.focus();
                }}
                aria-label="Limpar CEP"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground touch-target flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          {geocode.status === "success" && geocode.result && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Mostrando unidades mais próximas de{" "}
              <span className="text-primary">{geocode.result.label}</span>
            </p>
          )}
          {geocode.status === "error" && (
            <p className="mt-2 text-center text-xs text-destructive">
              CEP não encontrado. Verifique e tente novamente.
            </p>
          )}
        </div>

        {isLoading ? (
          <CmsLoading className="mt-10 py-16" />
        ) : sortedUnits.length === 0 ? (
          <CmsEmpty
            message="Unidades em breve."
            className="mt-10"
          />
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedUnits.map((unit, idx) => (
              <motion.article
                key={unit.slug}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(idx, 7) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20"
              >
                <div className="relative aspect-thumb overflow-hidden bg-muted/30">
                  <img
                    src={unit.coverImageUrl}
                    alt={`Academia Pacer ${unit.name}`}
                    width={400}
                    height={267}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-foreground leading-snug">
                      Pacer {unit.name}
                    </h3>
                    {unit.distance !== null && (
                      <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[12px] font-medium text-primary">
                        {unit.distance < 1
                          ? `${Math.round(unit.distance * 1000)} m`
                          : `${unit.distance.toFixed(1)} km`}
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-snug text-muted-foreground">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
                    <span className="line-clamp-2">
                      {unit.address} · {unit.city}
                    </span>
                  </p>

                  {unit.hours[0] && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                      {unit.hours[0]}
                    </p>
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
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!cep && activeUnits.length > 0 && (
          <motion.div
            className="mt-10 text-center"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button
              variant="ghost"
              className="text-foreground/60 hover:text-foreground hover:bg-foreground/5"
              asChild
            >
              <Link to="/unidades" className="gap-2">
                Ver todas as unidades
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
