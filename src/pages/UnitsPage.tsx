import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { readFiltersFromParams } from "@/components/sections/Units/UnitsFilterBar";
import { UnitsBanner } from "@/components/sections/Units/UnitsBanner";
import { UnitsFilterBar } from "@/components/sections/Units/UnitsFilterBar";
import { UnitsGrid } from "@/components/sections/Units/UnitsGrid";
import { CmsLoading } from "@/components/shared/CmsStates";
import { useCepGeocode, haversineKm } from "@/hooks/useCepGeocode";
import { useUnidades } from "@/hooks/cms/useUnidades";
import { useModalidades } from "@/hooks/cms/useModalidades";
import { isActiveUnit, isComingSoonUnit } from "@/lib/cms/mappers/unidade";
import type { FacilidadeId, Unidade } from "@/types/cms";

type UnitWithDistance = Unidade & { distance: number | null };

export default function UnitsPage() {
  const [params, setParams] = useSearchParams();
  const { cidade, modalidade, facilidade, cep } = readFiltersFromParams(params);
  const geocode = useCepGeocode(cep);
  const { data: unidades, isLoading } = useUnidades();
  const { data: modalidades } = useModalidades();

  const hasActiveFilters =
    cidade !== "" || modalidade !== "" || facilidade !== "" || cep !== "";

  const activeUnits = useMemo(
    () => unidades.filter(isActiveUnit),
    [unidades]
  );

  const comingSoonUnits = useMemo(
    () => unidades.filter(isComingSoonUnit),
    [unidades]
  );

  const filtered = useMemo(() => {
    return activeUnits.filter((unit) => {
      if (cidade && unit.city !== cidade) return false;
      if (modalidade && !unit.modalitySlugs.includes(modalidade)) return false;
      if (facilidade && !unit.facilidades.includes(facilidade as FacilidadeId))
        return false;
      return true;
    });
  }, [activeUnits, cidade, modalidade, facilidade]);

  const sortedFiltered = useMemo((): UnitWithDistance[] => {
    if (geocode.status === "success" && geocode.result) {
      const { lat, lng } = geocode.result;
      return [...filtered]
        .map((unit) => ({
          ...unit,
          distance: haversineKm(lat, lng, unit.lat, unit.lng),
        }))
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
    }
    return filtered.map((unit) => ({ ...unit, distance: null }));
  }, [filtered, geocode.result, geocode.status]);

  function clearFilters() {
    setParams(new URLSearchParams(), { replace: true });
  }

  if (isLoading) {
    return (
      <main>
        <UnitsBanner />
        <CmsLoading className="py-24" />
      </main>
    );
  }

  return (
    <main>
      <UnitsBanner />
      <UnitsFilterBar
        resultCount={sortedFiltered.length}
        unidades={activeUnits}
        modalidades={modalidades}
      />
      <UnitsGrid
        filteredUnits={sortedFiltered}
        comingSoonUnits={comingSoonUnits}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        showDistance={geocode.status === "success" && Boolean(geocode.result)}
      />
    </main>
  );
}
