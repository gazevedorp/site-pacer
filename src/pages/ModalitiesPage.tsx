import { useSearchParams } from "react-router-dom";
import { modalities } from "@/data/modalities";
import { readModalityFilter } from "@/components/sections/Modalities/ModalitiesFilterBar";
import { ModalitiesBanner } from "@/components/sections/Modalities/ModalitiesBanner";
import { ModalitiesFilterBar } from "@/components/sections/Modalities/ModalitiesFilterBar";
import { ModalitiesGrid } from "@/components/sections/Modalities/ModalitiesGrid";

export default function ModalitiesPage() {
  const [params] = useSearchParams();
  const selectedUnit = readModalityFilter(params);

  const filtered = selectedUnit
    ? modalities.filter((m) => m.availableUnits.includes(selectedUnit))
    : modalities;

  return (
    <main>
      <ModalitiesBanner />
      <ModalitiesFilterBar resultCount={filtered.length} />
      <ModalitiesGrid filteredItems={filtered} />
    </main>
  );
}
