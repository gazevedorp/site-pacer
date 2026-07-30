import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { readModalityFilter } from "@/components/sections/Modalities/ModalitiesFilterBar";
import { ModalitiesBanner } from "@/components/sections/Modalities/ModalitiesBanner";
import { ModalitiesFilterBar } from "@/components/sections/Modalities/ModalitiesFilterBar";
import { ModalitiesGrid } from "@/components/sections/Modalities/ModalitiesGrid";
import { CmsLoading } from "@/components/shared/CmsStates";
import { useModalidades } from "@/hooks/cms/useModalidades";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function ModalitiesPage() {
  useSeoMeta({
    title: "Modalidades — Pacer Academia",
    description:
      "Conheça as modalidades da Pacer Academia: musculação, aulas coletivas, luta, dança e muito mais. Treine no seu ritmo.",
    canonical: "/modalidades",
  });

  const [params] = useSearchParams();
  const selectedUnit = readModalityFilter(params);
  const { data: modalidades, isLoading } = useModalidades();

  const filtered = useMemo(() => {
    if (!selectedUnit) return modalidades;
    return modalidades.filter((m) => m.unitSlugs.includes(selectedUnit));
  }, [modalidades, selectedUnit]);

  if (isLoading) {
    return (
      <main>
        <ModalitiesBanner />
        <CmsLoading className="py-24" />
      </main>
    );
  }

  return (
    <main>
      <ModalitiesBanner />
      <ModalitiesFilterBar resultCount={filtered.length} />
      <ModalitiesGrid filteredItems={filtered} />
    </main>
  );
}
