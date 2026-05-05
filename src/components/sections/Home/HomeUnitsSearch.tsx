import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, MapPin, Clock, ArrowRight, Loader2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { units } from "@/data/units";
import gymCover from "@/assets/images/gym.png";
function getModalitiesForUnit(unit: { note?: string }): string[] {
  const base = ["Musculação", "Funcional", "Aulas Coletivas"];
  if (unit.note?.toLowerCase().includes("pilates")) base.push("Pilates");
  if (unit.note?.toLowerCase().includes("hidroginástica") || unit.note?.toLowerCase().includes("hidroginastica")) base.push("Hidroginástica");
  if (unit.note?.toLowerCase().includes("natação") || unit.note?.toLowerCase().includes("natacao")) base.push("Natação");
  return base.slice(0, 4);
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const CITIES = [...new Set(units.map((u) => u.city))].sort();

export function HomeUnitsSearch() {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  const suggestions = useMemo(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) return [];
    const term = debouncedQuery.toLowerCase();
    return CITIES.filter((c) => c.toLowerCase().includes(term)).slice(0, 4);
  }, [debouncedQuery]);

  const filteredUnits = useMemo(() => {
    const term = debouncedQuery.trim().toLowerCase();
    if (!term) return units.slice(0, 8);
    return units.filter(
      (u) =>
        u.city.toLowerCase().includes(term) ||
        u.name.toLowerCase().includes(term) ||
        u.address.toLowerCase().includes(term)
    );
  }, [debouncedQuery]);

  const isPending = query !== debouncedQuery;

  return (
    <section
      id="unidades"
      aria-label="Encontre uma unidade"
      className="relative py-24 sm:py-32"
    >
      {/* Section divider */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Heading ────────────────────────────────────────────── */}
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
            Perto de <span className="text-muted-foreground">você</span>
          </h2>
          <p className="mt-4 text-fluid-md leading-relaxed text-muted-foreground">
            13 unidades em Ribeirão Preto e Sertãozinho. Mesma qualidade,
            equipamentos de alto padrão e ambiente 100% climatizado.
          </p>
        </motion.div>

        {/* ── Search input ───────────────────────────────────────── */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="relative">
            <label htmlFor="units-search" className="sr-only">
              Buscar unidade por cidade ou endereço
            </label>
            <Search
              aria-hidden
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              ref={inputRef}
              id="units-search"
              type="search"
              autoComplete="off"
              placeholder="Cidade ou nome da unidade…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-xl outline-none transition-all focus:border-primary/50 focus:bg-white/[0.07] focus:shadow-glow-sm"
              aria-autocomplete="list"
              aria-controls="units-suggestions"
              aria-expanded={showSuggestions && suggestions.length > 0}
            />
            {isPending ? (
              <Loader2
                aria-hidden
                className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-primary"
              />
            ) : query ? (
              <button
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                aria-label="Limpar busca"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground touch-target flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                id="units-suggestions"
                role="listbox"
                aria-label="Sugestões de cidades"
                className="absolute top-full z-20 mt-1 w-full rounded-xl border border-white/10 bg-card shadow-card overflow-hidden"
              >
                {suggestions.map((city) => (
                  <li key={city} role="option" aria-selected={query === city}>
                    <button
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground text-left"
                      onMouseDown={() => {
                        setQuery(city);
                        setShowSuggestions(false);
                      }}
                    >
                      <MapPin className="h-3.5 w-3.5 text-primary/60" />
                      {city}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ── Units grid ─────────────────────────────────────────── */}
        {filteredUnits.length === 0 ? (
          <motion.div
            key="empty"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex flex-col items-center gap-4 text-center"
          >
            <MapPin className="h-12 w-12 text-muted-foreground/30" />
            <p className="text-base text-muted-foreground">
              Nenhuma unidade encontrada para &ldquo;{debouncedQuery}&rdquo;.
            </p>
            <button
              onClick={() => setQuery("")}
              className="text-sm text-primary hover:underline"
            >
              Limpar busca
            </button>
          </motion.div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUnits.map((unit, idx) => {
              const modalities = getModalitiesForUnit(unit);
              return (
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
                  className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  {/* Card image */}
                  <div className="relative aspect-thumb overflow-hidden bg-surface">
                    <img
                      src={gymCover}
                      alt={`Academia Pacer ${unit.name}`}
                      width={400}
                      height={267}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent"
                    />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-foreground leading-snug">
                        Pacer {unit.name}
                      </h3>
                    </div>

                    <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-snug text-muted-foreground">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
                      <span className="line-clamp-2">{unit.address} · {unit.city}</span>
                    </p>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                      {unit.hours[0]}
                    </p>

                    {/* Modality badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {modalities.map((m) => (
                        <Badge
                          key={m}
                          className="border-white/10 bg-white/[0.04] text-muted-foreground px-2 py-0.5 text-[10px]"
                        >
                          {m}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto pt-4">
                      <Button
                        variant="outline"
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
              );
            })}
          </div>
        )}

        {/* See all link */}
        {!debouncedQuery.trim() && (
          <motion.div
            className="mt-10 text-center"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button variant="ghost" asChild>
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
