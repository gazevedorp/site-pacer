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
import type { FacilidadeId } from "@/types/cms";

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

  const sortedFiltered = useMemo(() => {
    if (geocode.result) {
      const { lat, lng } = geocode.result;
      return [...filtered].sort(
        (a, b) =>
          haversineKm(lat, lng, a.lat, a.lng) -
          haversineKm(lat, lng, b.lat, b.lng)
      );
    }
    return filtered;
  }, [filtered, geocode.result]);

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
      />
    </main>
  );
}
