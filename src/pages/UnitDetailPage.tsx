import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useUnidade } from "@/hooks/cms/useUnidades";
import { useModalidades } from "@/hooks/cms/useModalidades";
import { usePlanosUnidade } from "@/hooks/cms/usePlanos";
import { buildWhatsAppLink, CENTRAL_WHATSAPP } from "@/lib/whatsapp";
import { UnitHero } from "@/components/sections/UnitDetail/UnitHero";
import { UnitAmenities } from "@/components/sections/UnitDetail/UnitAmenities";
import { UnitGallery } from "@/components/sections/UnitDetail/UnitGallery";
import { UnitModalities } from "@/components/sections/UnitDetail/UnitModalities";
import { UnitPlans } from "@/components/sections/UnitDetail/UnitPlans";
import { CmsLoading } from "@/components/shared/CmsStates";

export default function UnitDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: unit, isLoading } = useUnidade(slug);
  const { data: allModalidades } = useModalidades();
  const { data: plans, isLoading: plansLoading } = usePlanosUnidade(slug);

  const unitModalities = useMemo(() => {
    if (!unit) return [];
    const slugSet = new Set(unit.modalitySlugs);
    return allModalidades.filter((m) => slugSet.has(m.slug));
  }, [unit, allModalidades]);

  useEffect(() => {
    if (!isLoading && !unit) navigate("/unidades", { replace: true });
  }, [unit, isLoading, navigate]);

  const seoTitle = unit
    ? `Pacer Academia ${unit.name} — ${unit.city} | Pacer Academia`
    : "Pacer Academia";
  const seoDescription = unit
    ? `Conheça a Pacer Academia ${unit.name} em ${unit.address}, ${unit.city}. Musculação, aulas coletivas, ${unit.facilidades.length} facilidades. Matricule-se já!`
    : "";
  const jsonLd = unit
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "SportsActivityLocation"],
        name: `Pacer Academia ${unit.name}`,
        description: seoDescription,
        address: {
          "@type": "PostalAddress",
          streetAddress: unit.address,
          addressLocality: unit.city.split(" –")[0],
          addressRegion: "SP",
          addressCountry: "BR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: unit.lat,
          longitude: unit.lng,
        },
        openingHours: ["Mo-Fr 05:00-22:00", "Sa-Su 08:00-13:00"],
        telephone: unit.whatsapp
          ? `+${unit.whatsapp}`
          : `+${CENTRAL_WHATSAPP}`,
        url: `https://paceracademia.com.br/unidades/${unit.slug}`,
      })
    : undefined;

  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    jsonLd,
  });

  if (isLoading) {
    return (
      <main>
        <CmsLoading className="min-h-[60vh]" />
      </main>
    );
  }

  if (!unit) return null;

  const waNumber = unit.whatsapp ?? CENTRAL_WHATSAPP;
  const whatsappHref = buildWhatsAppLink(
    `Olá! Tenho interesse em me matricular na Pacer Academia ${unit.name}. Poderia me informar sobre os planos disponíveis?`,
    waNumber
  );

  return (
    <main>
      <UnitHero unit={unit} whatsappHref={whatsappHref} />
      <UnitAmenities facilidades={unit.facilidades} />
      <UnitGallery slug={unit.slug} unitName={unit.name} />
      <UnitModalities modalidades={unitModalities} />
      {!plansLoading && plans.length > 0 && (
        <UnitPlans plans={plans} unit={unit} />
      )}
    </main>
  );
}
