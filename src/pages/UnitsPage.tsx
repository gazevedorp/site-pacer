import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { units, comingSoon } from "@/data/units";
import type { UnitModalityId, UnitAmenityId } from "@/data/units";
import { readFiltersFromParams } from "@/components/sections/Units/UnitsFilterBar";
import { UnitsBanner } from "@/components/sections/Units/UnitsBanner";
import { UnitsFilterBar } from "@/components/sections/Units/UnitsFilterBar";
import { UnitsGrid } from "@/components/sections/Units/UnitsGrid";
import { useCepGeocode, haversineKm } from "@/hooks/useCepGeocode";

export default function UnitsPage() {
  const [params, setParams] = useSearchParams();
  const { cidade, modalidade, facilidade, cep } = readFiltersFromParams(params);
  const geocode = useCepGeocode(cep);

  const hasActiveFilters =
    cidade !== "" || modalidade !== "" || facilidade !== "" || cep !== "";

  const filtered = units.filter((unit) => {
    if (cidade && unit.city !== cidade) return false;
    if (modalidade && !unit.unitModalities.includes(modalidade as UnitModalityId))
      return false;
    if (facilidade && !unit.amenities.includes(facilidade as UnitAmenityId))
      return false;
    return true;
  });

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

  return (
    <main>
      <UnitsBanner />
      <UnitsFilterBar resultCount={sortedFiltered.length} />
      <UnitsGrid
        filteredUnits={sortedFiltered}
        comingSoonUnits={comingSoon}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </main>
  );
}
