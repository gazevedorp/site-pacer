import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getModalityBySlug } from "@/data/modalities";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { ModalityHero } from "@/components/sections/ModalityDetail/ModalityHero";
import { ModalityAbout } from "@/components/sections/ModalityDetail/ModalityAbout";
import { ModalityWhereToFind } from "@/components/sections/ModalityDetail/ModalityWhereToFind";

export default function ModalityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const modality = getModalityBySlug(slug ?? "");

  useEffect(() => {
    if (!modality) navigate("/modalidades", { replace: true });
  }, [modality, navigate]);

  const seoTitle = modality
    ? `${modality.title} — Pacer Academia | Ribeirão Preto e Sertãozinho`
    : "Pacer Academia";
  const seoDescription = modality
    ? `Conheça a modalidade ${modality.title} na Pacer Academia. ${modality.description} Disponível em ${modality.availableUnits.length} unidades.`
    : "";
  const jsonLd = modality
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        name: `Pacer Academia — ${modality.title}`,
        description: seoDescription,
        url: `https://paceracademia.com.br/modalidades/${modality.slug}`,
        sport: modality.title,
      })
    : undefined;

  useSeoMeta({ title: seoTitle, description: seoDescription, jsonLd });

  if (!modality) return null;

  return (
    <main>
      <ModalityHero modality={modality} />
      <ModalityAbout modality={modality} />
      <ModalityWhereToFind modality={modality} />
    </main>
  );
}
