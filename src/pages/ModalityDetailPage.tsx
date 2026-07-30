import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useModalidade } from "@/hooks/cms/useModalidades";
import { ModalityHero } from "@/components/sections/ModalityDetail/ModalityHero";
import { ModalityAbout } from "@/components/sections/ModalityDetail/ModalityAbout";
import { ModalityWhereToFind } from "@/components/sections/ModalityDetail/ModalityWhereToFind";
import { CmsLoading } from "@/components/shared/CmsStates";
import { SITE_URL } from "@/config/site";

export default function ModalityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: modality, isLoading } = useModalidade(slug);

  useEffect(() => {
    if (!isLoading && !modality) navigate("/modalidades", { replace: true });
  }, [modality, isLoading, navigate]);

  const seoTitle = modality
    ? `${modality.title} — Pacer Academia | Ribeirão e região`
    : "Pacer Academia";
  const seoDescription = modality
    ? `Conheça a modalidade ${modality.title} na Pacer Academia. ${modality.description} Disponível em ${modality.unitSlugs.length} unidades.`
    : "";
  const jsonLd = modality
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        name: `Pacer Academia — ${modality.title}`,
        description: seoDescription,
        url: `${SITE_URL}/modalidades/${modality.slug}`,
        sport: modality.title,
      })
    : undefined;

  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    canonical: modality ? `/modalidades/${modality.slug}` : undefined,
    jsonLd,
  });

  if (isLoading) {
    return (
      <main>
        <CmsLoading className="min-h-[60vh]" />
      </main>
    );
  }

  if (!modality) return null;

  return (
    <main>
      <ModalityHero modality={modality} />
      <ModalityAbout modality={modality} />
      <ModalityWhereToFind modality={modality} />
    </main>
  );
}
