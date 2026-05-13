import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { units } from "@/data/units";
import { MODALITY_LABELS } from "@/data/schedule";
import { TRAINER_CITIES } from "@/data/trainers";
import { cn } from "@/lib/utils";

// ─── URL helper ───────────────────────────────────────────────────────────────

export function readTrainerFilters(params: URLSearchParams) {
  return {
    city: params.get("cidade") ?? "",
    unitSlug: params.get("unidade") ?? "",
    modalityId: params.get("modalidade") ?? "",
  };
}

// ─── Shared select style ─────────────────────────────────────────────────────

const selectBase =
  "w-full appearance-none rounded-xl border border-border bg-card/5 px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/40 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-40 pr-8";

// ─── Component ───────────────────────────────────────────────────────────────

interface TrainersFilterBarProps {
  resultCount: number;
}

export function TrainersFilterBar({ resultCount }: TrainersFilterBarProps) {
  const [params, setParams] = useSearchParams();
  const { city, unitSlug, modalityId } = readTrainerFilters(params);

  // Units filtered by selected city
  const cityUnits = city
    ? units.filter((u) => u.city === city)
    : units;

  function update(key: string, value: string) {
    setParams(
      (p) => {
        const next = new URLSearchParams(p);
        if (value) next.set(key, value);
        else next.delete(key);
        // Reset dependent filters on city change
        if (key === "cidade") {
          next.delete("unidade");
        }
        return next;
      },
      { replace: true }
    );
  }

  function clearAll() {
    setParams({}, { replace: true });
  }

  const hasFilters = Boolean(city || unitSlug || modalityId);

  return (
    <div className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <fieldset>
          <legend className="sr-only">Filtros de personal trainers</legend>

          <div className="flex flex-wrap items-center gap-3">
            <SlidersHorizontal
              className="h-4 w-4 shrink-0 text-muted-foreground"
              aria-hidden
            />

            {/* City */}
            <div className="relative min-w-[140px] flex-1 sm:flex-none sm:w-44">
              <label htmlFor="filter-cidade" className="sr-only">
                Cidade
              </label>
              <select
                id="filter-cidade"
                value={city}
                onChange={(e) => update("cidade", e.target.value)}
                className={selectBase}
              >
                <option value="">Todas as cidades</option>
                {TRAINER_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c.split(" –")[0]}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              >
                ▾
              </span>
            </div>

            {/* Unit */}
            <div className="relative min-w-[160px] flex-1 sm:flex-none sm:w-52">
              <label htmlFor="filter-unidade" className="sr-only">
                Unidade
              </label>
              <select
                id="filter-unidade"
                value={unitSlug}
                onChange={(e) => update("unidade", e.target.value)}
                className={selectBase}
              >
                <option value="">Todas as unidades</option>
                {cityUnits.map((u) => (
                  <option key={u.slug} value={u.slug}>
                    Pacer {u.name}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              >
                ▾
              </span>
            </div>

            {/* Modality */}
            <div className="relative min-w-[150px] flex-1 sm:flex-none sm:w-48">
              <label htmlFor="filter-modalidade" className="sr-only">
                Modalidade
              </label>
              <select
                id="filter-modalidade"
                value={modalityId}
                onChange={(e) => update("modalidade", e.target.value)}
                className={selectBase}
              >
                <option value="">Todas as modalidades</option>
                {(Object.entries(MODALITY_LABELS) as [string, string][]).map(
                  ([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  )
                )}
              </select>
              <span
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              >
                ▾
              </span>
            </div>

            {/* Result count */}
            <p className="ml-auto hidden text-xs text-muted-foreground sm:block">
              {resultCount}{" "}
              {resultCount === 1 ? "profissional" : "profissionais"}
            </p>

            {/* Clear */}
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors",
                  "hover:border-primary/40 hover:text-foreground",
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
