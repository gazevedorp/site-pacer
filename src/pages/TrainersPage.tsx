import { useSearchParams } from "react-router-dom";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { getFilteredTrainers } from "@/data/trainers";
import { readTrainerFilters } from "@/components/sections/Trainers/TrainersFilterBar";
import { TrainersBanner } from "@/components/sections/Trainers/TrainersBanner";
import { TrainersFilterBar } from "@/components/sections/Trainers/TrainersFilterBar";
import { TrainersGrid } from "@/components/sections/Trainers/TrainersGrid";
import { TrainersB2BCTA } from "@/components/sections/Trainers/TrainersB2BCTA";

export default function TrainersPage() {
  const [params] = useSearchParams();
  const { city, unitSlug, modalityId } = readTrainerFilters(params);

  const filtered = getFilteredTrainers({
    city: city || undefined,
    unitSlug: unitSlug || undefined,
    modalityId: modalityId || undefined,
  });

  useSeoMeta({
    title: "Personal Trainers | Pacer Academia — Ribeirão e região",
    description:
      "Conheça os personal trainers certificados da Pacer Academia. Profissionais experientes em musculação, funcional, Muay Thai, Pilates, hidroginástica e muito mais.",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Personal Trainers — Pacer Academia",
      description:
        "Lista de personal trainers certificados da rede Pacer Academia.",
      url: "https://paceracademia.com.br/personais",
    }),
  });

  return (
    <main>
      <TrainersBanner />
      <TrainersFilterBar resultCount={filtered.length} />
      <TrainersGrid trainers={filtered} />
      <TrainersB2BCTA />
    </main>
  );
}
