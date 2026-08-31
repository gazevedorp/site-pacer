import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { EVO_BRANCHES } from "@/lib/evo/branches";
import { cn } from "@/lib/utils";

export function readScheduleFilters(params: URLSearchParams) {
  return {
    unitSlug: params.get("unidade") ?? "",
    modalityId: params.get("modalidade") ?? "",
  };
}

const selectBase =
  "w-full appearance-none rounded-xl border border-border bg-card/5 px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/40 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-40 pr-8";

interface ScheduleFilterBarProps {
  modalities: { id: string; name: string }[];
}

export function ScheduleFilterBar({ modalities }: ScheduleFilterBarProps) {
  const [params, setParams] = useSearchParams();
  const { unitSlug, modalityId } = readScheduleFilters(params);
  function update(key: string, value: string) {
    setParams(
      (p) => {
        const next = new URLSearchParams(p);
        if (value) next.set(key, value);
        else next.delete(key);
        next.delete("publico");
        if (key === "unidade") {
          next.delete("modalidade");
          next.delete("dia");
        }
        return next;
      },
      { replace: true }
    );
  }

  function clearAll() {
    setParams({}, { replace: true });
  }

  const hasFilters = Boolean(unitSlug || modalityId);

  return (
    <div className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <fieldset>
          <legend className="sr-only">Filtros da grade de aulas</legend>

          <div className="flex flex-wrap items-center gap-3">
            <SlidersHorizontal
              className="h-4 w-4 shrink-0 text-muted-foreground"
              aria-hidden
            />

            <div className="relative min-w-[180px] flex-1 sm:flex-none sm:w-56">
              <label htmlFor="filter-unidade" className="sr-only">
                Unidade
              </label>
              <select
                id="filter-unidade"
                value={unitSlug}
                onChange={(e) => update("unidade", e.target.value)}
                className={selectBase}
              >
                <option value="">Selecione a unidade</option>
                {EVO_BRANCHES.map((branch) => (
                  <option key={branch.slug} value={branch.slug}>
                    Pacer {branch.name}
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

            <div className="relative min-w-[160px] flex-1 sm:flex-none sm:w-52">
              <label htmlFor="filter-modalidade" className="sr-only">
                Modalidade
              </label>
              <select
                id="filter-modalidade"
                value={modalityId}
                onChange={(e) => update("modalidade", e.target.value)}
                disabled={!unitSlug}
                className={selectBase}
              >
                <option value="">Todas as modalidades</option>
                {modalities.map((modality) => (
                  <option key={modality.id} value={modality.id}>
                    {modality.name}
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

            {hasFilters ? (
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
            ) : null}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
