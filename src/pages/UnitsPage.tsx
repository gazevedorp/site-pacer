import { useSearchParams } from "react-router-dom";
import { units, comingSoon } from "@/data/units";
import type { UnitModalityId, UnitAmenityId } from "@/data/units";
import { readFiltersFromParams } from "@/components/sections/Units/UnitsFilterBar";
import { UnitsBanner } from "@/components/sections/Units/UnitsBanner";
import { UnitsFilterBar } from "@/components/sections/Units/UnitsFilterBar";
import { UnitsGrid } from "@/components/sections/Units/UnitsGrid";

export default function UnitsPage() {
  const [params, setParams] = useSearchParams();
  const { cidade, modalidade, facilidade } = readFiltersFromParams(params);

  const hasActiveFilters =
    cidade !== "" || modalidade !== "" || facilidade !== "";

  const filtered = units.filter((unit) => {
    if (cidade && unit.city !== cidade) return false;
    if (modalidade && !unit.unitModalities.includes(modalidade as UnitModalityId))
      return false;
    if (facilidade && !unit.amenities.includes(facilidade as UnitAmenityId))
      return false;
    return true;
  });

  function clearFilters() {
    setParams(new URLSearchParams(), { replace: true });
  }

  return (
    <main>
      <UnitsBanner />
      <UnitsFilterBar resultCount={filtered.length} />
      <UnitsGrid
        filteredUnits={filtered}
        comingSoonUnits={comingSoon}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </main>
  );
}
