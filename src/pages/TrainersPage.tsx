import { useSearchParams } from "react-router-dom";
import { readTrainerFilters } from "@/components/sections/Trainers/TrainersFilterBar";
import { TrainersBanner } from "@/components/sections/Trainers/TrainersBanner";
import { TrainersFilterBar } from "@/components/sections/Trainers/TrainersFilterBar";
import { TrainersGrid } from "@/components/sections/Trainers/TrainersGrid";
import { TrainersB2BCTA } from "@/components/sections/Trainers/TrainersB2BCTA";
import { CmsLoading } from "@/components/shared/CmsStates";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { usePersonais } from "@/hooks/cms/usePersonais";
import { SITE_URL } from "@/config/site";

export default function TrainersPage() {
  const [params] = useSearchParams();
  const { city, unitSlug, modalityId } = readTrainerFilters(params);

  const { data: filtered, cities, isLoading } = usePersonais({
    cidade: city || undefined,
    unidade: unitSlug || undefined,
    modalidade: modalityId || undefined,
  });

  useSeoMeta({
    title: "Personal Trainers | Pacer Academia — Ribeirão e região",
    description:
      "Conheça os personal trainers certificados da Pacer Academia. Profissionais experientes em musculação, funcional, Muay Thai, Pilates, hidroginástica e muito mais.",
    canonical: "/personais",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Personal Trainers — Pacer Academia",
      url: `${SITE_URL}/personais`,
      itemListElement: filtered.map((trainer, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: trainer.name,
        url: `${SITE_URL}/personais`,
      })),
    }),
  });

  if (isLoading) {
    return (
      <main>
        <TrainersBanner />
        <CmsLoading className="py-24" />
      </main>
    );
  }

  return (
    <main>
      <TrainersBanner />
      <TrainersFilterBar resultCount={filtered.length} cities={cities} />
      <TrainersGrid trainers={filtered} />
      <TrainersB2BCTA />
    </main>
  );
}
