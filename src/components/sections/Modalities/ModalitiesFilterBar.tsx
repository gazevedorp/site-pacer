import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data/units";

// Derive city → unit options from units data
const UNIT_OPTIONS = units.map((u) => ({
  value: u.slug,
  label: `Pacer ${u.name} — ${u.city.split(" –")[0]}`,
}));

export function readModalityFilter(params: URLSearchParams): string {
  return params.get("unidade") ?? "";
}

// ─── Shared select style ─────────────────────────────────────────────────────

const selectBase =
  "w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition-colors hover:border-primary/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-40 pr-8";

// ─── Component ───────────────────────────────────────────────────────────────

interface ModalitiesFilterBarProps {
  resultCount: number;
}

export function ModalitiesFilterBar({ resultCount }: ModalitiesFilterBarProps) {
  const [params, setParams] = useSearchParams();
  const selected = readModalityFilter(params);

  function setUnit(value: string) {
    setParams(
      (p) => {
        const next = new URLSearchParams(p);
        if (value) next.set("unidade", value);
        else next.delete("unidade");
        return next;
      },
      { replace: true }
    );
  }

  function clearAll() {
    setParams({}, { replace: true });
  }

  return (
    <div className="sticky top-16 z-30 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <fieldset>
          <legend className="sr-only">Filtros de modalidades</legend>

          <div className="flex flex-wrap items-center gap-3">
            <SlidersHorizontal
              className="h-4 w-4 shrink-0 text-white/40"
              aria-hidden
            />

            {/* Unit */}
            <div className="relative min-w-[180px] flex-1 sm:flex-none sm:w-56">
              <label htmlFor="filter-unidade" className="sr-only">
                Unidade
              </label>
              <select
                id="filter-unidade"
                value={selected}
                onChange={(e) => setUnit(e.target.value)}
                className={selectBase}
              >
                <option value="">Todas as unidades</option>
                {UNIT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40"
                aria-hidden
              >
                ▾
              </span>
            </div>

            {/* Result count */}
            <p className="ml-auto hidden text-xs text-white/30 sm:block">
              {resultCount}{" "}
              {resultCount === 1 ? "modalidade" : "modalidades"}
            </p>

            {/* Clear */}
            {selected && (
              <button
                type="button"
                onClick={clearAll}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/50 transition-colors",
                  "hover:border-white/20 hover:text-white/80",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                aria-label="Limpar filtros"
              >
                <X className="h-3 w-3" aria-hidden />
                Limpar
              </button>
            )}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
