import { motion, useReducedMotion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Car,
  Users,
  Waves,
  Baby,
  PersonStanding,
  Coffee,
  Droplets,
  Snowflake,
  type LucideIcon,
} from "lucide-react";
import type { UnitAmenityId } from "@/data/units";
import { UnitSection } from "@/components/sections/UnitDetail/UnitSection";

const AMENITY_META: Record<
  UnitAmenityId,
  { label: string; description: string; icon: LucideIcon }
> = {
  estacionamento: {
    label: "Estacionamento",
    description: "Estacionamento gratuito exclusivo para alunos.",
    icon: Car,
  },
  "aulas-coletivas": {
    label: "Aulas Coletivas",
    description: "Grade variada de aulas coletivas ao longo da semana.",
    icon: Users,
  },
  hidroginastica: {
    label: "Hidroginástica",
    description: "Piscina aquecida com aulas de hidroginástica inclusas.",
    icon: Waves,
  },
  "natacao-infantil": {
    label: "Natação Infantil",
    description: "Aulas de natação para crianças e adolescentes.",
    icon: Baby,
  },
  pilates: {
    label: "Pilates",
    description: "Studio de Pilates com equipamentos profissionais.",
    icon: PersonStanding,
  },
  lanchonete: {
    label: "Lanchonete",
    description: "Lanchonete com opções saudáveis e suplementos.",
    icon: Coffee,
  },
  vestiario: {
    label: "Vestiário",
    description: "Vestiários completos com armários e chuveiros.",
    icon: Droplets,
  },
  climatizado: {
    label: "Climatizado",
    description: "Ambiente 100% climatizado o ano todo.",
    icon: Snowflake,
  },
};

function AmenityCard({ id, index }: { id: UnitAmenityId; index: number }) {
  const reduced = useReducedMotion();
  const meta = AMENITY_META[id];
  const Icon = meta.icon;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        className="w-full rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={`${meta.label} — ${meta.description}`}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{
            duration: 0.5,
            delay: reduced ? 0 : index * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <span className="text-sm font-semibold text-foreground">{meta.label}</span>
        </motion.div>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content
          className="z-50 max-w-[200px] rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted-foreground shadow-lg"
          sideOffset={6}
        >
          {meta.description}
          <Tooltip.Arrow className="fill-background" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

interface UnitAmenitiesProps {
  amenities: UnitAmenityId[];
}

export function UnitAmenities({ amenities }: UnitAmenitiesProps) {
  if (amenities.length === 0) return null;

  return (
    <Tooltip.Provider delayDuration={200}>
      <UnitSection
        ariaLabel="Estrutura e facilidades"
        variant="inset"
        eyebrow="Estrutura"
        title="Facilidades"
        description="Passe o mouse ou toque em cada item para saber mais."
      >
        <div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          role="list"
          aria-label="Lista de facilidades"
        >
          {amenities.map((id, i) => (
            <div key={id} role="listitem">
              <AmenityCard id={id} index={i} />
            </div>
          ))}
        </div>
      </UnitSection>
    </Tooltip.Provider>
  );
}
