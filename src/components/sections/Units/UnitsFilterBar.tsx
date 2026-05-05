import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data/units";
import type { UnitAmenityId, UnitModalityId } from "@/data/units";

// ---------- static label maps ------------------------------------------

const MODALITY_LABELS: Record<UnitModalityId, string> = {
  musculacao: "Musculação",
  funcional: "Funcional",
  "muay-thai": "Muay Thai",
  pilates: "Pilates",
  hidroginastica: "Hidroginástica",
  natacao: "Natação",
  danca: "Dança",
  zumba: "Zumba",
};

const AMENITY_LABELS: Record<UnitAmenityId, string> = {
  estacionamento: "Estacionamento",
  "aulas-coletivas": "Aulas Coletivas",
  hidroginastica: "Hidroginástica",
  "natacao-infantil": "Natação Infantil",
  pilates: "Pilates",
  lanchonete: "Lanchonete",
  vestiario: "Vestiário",
  climatizado: "Climatizado",
};

// Derive unique cities from data for the select
const CITIES = Array.from(new Set(units.map((u) => u.city))).sort();

// Derive which modalities / amenities actually appear in data
const AVAILABLE_MODALITIES = (
  Object.keys(MODALITY_LABELS) as UnitModalityId[]
).filter((m) => units.some((u) => u.unitModalities.includes(m)));

const AVAILABLE_AMENITIES = (Object.keys(AMENITY_LABELS) as UnitAmenityId[]).filter(
  (a) => units.some((u) => u.amenities.includes(a))
);

// ─── Shared select style ─────────────────────────────────────────────────────

const selectBase =
  "w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition-colors hover:border-primary/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-40 pr-8";

// ---------- helpers -------------------------------------------------------

export type FilterState = {
  cidade: string;
  modalidade: string;
  facilidade: string;
};

export function readFiltersFromParams(params: URLSearchParams): FilterState {
  return {
    cidade: params.get("cidade") ?? "",
    modalidade: params.get("modalidade") ?? "",
    facilidade: params.get("facilidade") ?? "",
  };
}

// ---------- main component ------------------------------------------------

interface UnitsFilterBarProps {
  resultCount: number;
}

export function UnitsFilterBar({ resultCount }: UnitsFilterBarProps) {
  const [params, setParams] = useSearchParams();
  const { cidade, modalidade, facilidade } = readFiltersFromParams(params);

  const hasActiveFilters = Boolean(cidade || modalidade || facilidade);

  function update(key: string, value: string) {
    setParams(
      (p) => {
        const next = new URLSearchParams(p);
        if (value) next.set(key, value);
        else next.delete(key);
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
          <legend className="sr-only">Filtros de unidades</legend>

          <div className="flex flex-wrap items-center gap-3">
            <SlidersHorizontal
              className="h-4 w-4 shrink-0 text-white/40"
              aria-hidden
            />

            {/* City */}
            <div className="relative min-w-[140px] flex-1 sm:flex-none sm:w-44">
              <label htmlFor="filter-cidade" className="sr-only">
                Cidade
              </label>
              <select
                id="filter-cidade"
                value={cidade}
                onChange={(e) => update("cidade", e.target.value)}
                className={selectBase}
              >
                <option value="">Todas as cidades</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40"
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
                value={modalidade}
                onChange={(e) => update("modalidade", e.target.value)}
                className={selectBase}
              >
                <option value="">Todas as modalidades</option>
                {AVAILABLE_MODALITIES.map((id) => (
                  <option key={id} value={id}>{MODALITY_LABELS[id]}</option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40"
                aria-hidden
              >
                ▾
              </span>
            </div>

            {/* Amenity */}
            <div className="relative min-w-[150px] flex-1 sm:flex-none sm:w-48">
              <label htmlFor="filter-facilidade" className="sr-only">
                Facilidade
              </label>
              <select
                id="filter-facilidade"
                value={facilidade}
                onChange={(e) => update("facilidade", e.target.value)}
                className={selectBase}
              >
                <option value="">Todas as facilidades</option>
                {AVAILABLE_AMENITIES.map((id) => (
                  <option key={id} value={id}>{AMENITY_LABELS[id]}</option>
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
              {resultCount === 1 ? "unidade encontrada" : "unidades encontradas"}
            </p>

            {/* Clear */}
            {hasActiveFilters && (
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
