import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUnitBySlug } from "@/data/units";
import { getUnitPlans, buildWhatsAppLink, CENTRAL_WHATSAPP } from "@/data/unitDetail";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { UnitHero } from "@/components/sections/UnitDetail/UnitHero";
import { UnitAmenities } from "@/components/sections/UnitDetail/UnitAmenities";
import { UnitModalities } from "@/components/sections/UnitDetail/UnitModalities";
import { UnitSchedulePreview } from "@/components/sections/UnitDetail/UnitSchedulePreview";
import { UnitPlans } from "@/components/sections/UnitDetail/UnitPlans";

export default function UnitDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const unit = getUnitBySlug(slug ?? "");

  // Redirect unknown slugs
  useEffect(() => {
    if (!unit) navigate("/unidades", { replace: true });
  }, [unit, navigate]);

  // Derive SEO values — memoised via string serialization
  const seoTitle = unit
    ? `Pacer Academia ${unit.name} — ${unit.city} | Pacer Academia`
    : "Pacer Academia";
  const seoDescription = unit
    ? `Conheça a Pacer Academia ${unit.name} em ${unit.address}, ${unit.city}. Musculação, aulas coletivas, ${unit.amenities.length} facilidades. Matricule-se já!`
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
        telephone: `+55 16 99999-9999`,
        url: `https://paceracademia.com.br/unidades/${unit.slug}`,
      })
    : undefined;

  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    jsonLd,
  });

  if (!unit) return null;

  const waNumber = unit.whatsapp ?? CENTRAL_WHATSAPP;
  const whatsappHref = buildWhatsAppLink(
    `Olá! Tenho interesse em me matricular na Pacer Academia ${unit.name}. Poderia me informar sobre os planos disponíveis?`,
    waNumber
  );
  const plans = getUnitPlans(unit);

  return (
    <main>
      <UnitHero unit={unit} whatsappHref={whatsappHref} />
      <UnitAmenities amenities={unit.amenities} />
      <UnitModalities unitModalities={unit.unitModalities} />
      <UnitSchedulePreview slug={unit.slug} />
      <UnitPlans plans={plans} unit={unit} />
    </main>
  );
}
