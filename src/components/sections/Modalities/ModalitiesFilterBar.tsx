import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUnidades } from "@/hooks/cms/useUnidades";
import { isActiveUnit } from "@/lib/cms/mappers/unidade";

export function readModalityFilter(params: URLSearchParams): string {
  return params.get("unidade") ?? "";
}

const selectBase =
  "w-full appearance-none rounded-xl border border-border bg-card/5 px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/40 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-40 pr-8";

interface ModalitiesFilterBarProps {
  resultCount: number;
}

export function ModalitiesFilterBar({ resultCount }: ModalitiesFilterBarProps) {
  const [params, setParams] = useSearchParams();
  const selected = readModalityFilter(params);
  const { data: unidades } = useUnidades();

  const unitOptions = useMemo(
    () =>
      unidades.filter(isActiveUnit).map((u) => ({
        value: u.slug,
        label: `Pacer ${u.name} — ${u.city.split(" –")[0]}`,
      })),
    [unidades]
  );

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
    <div className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <fieldset>
          <legend className="sr-only">Filtros de modalidades</legend>
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
                value={selected}
                onChange={(e) => setUnit(e.target.value)}
                className={selectBase}
              >
                <option value="">Todas as unidades</option>
                {unitOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
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
            <p className="ml-auto hidden text-xs text-muted-foreground sm:block">
              {resultCount}{" "}
              {resultCount === 1 ? "modalidade" : "modalidades"}
            </p>
            {selected && (
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
