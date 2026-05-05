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

// ─── Amenity meta map ─────────────────────────────────────────────────────────

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

// ─── Amenity Card ─────────────────────────────────────────────────────────────

interface AmenityCardProps {
  id: UnitAmenityId;
  index: number;
}

function AmenityCard({ id, index }: AmenityCardProps) {
  const reduced = useReducedMotion();
  const meta = AMENITY_META[id];
  const Icon = meta.icon;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        className="w-full rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
          className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/5"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <span className="text-sm font-semibold text-white/90">{meta.label}</span>
        </motion.div>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content
          className="z-50 max-w-[200px] rounded-xl border border-white/10 bg-zinc-900/95 px-3 py-2 text-xs text-white/80 shadow-xl backdrop-blur-sm"
          sideOffset={6}
        >
          {meta.description}
          <Tooltip.Arrow className="fill-zinc-900/95" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface UnitAmenitiesProps {
  amenities: UnitAmenityId[];
}

export function UnitAmenities({ amenities }: UnitAmenitiesProps) {
  if (amenities.length === 0) return null;

  return (
    <Tooltip.Provider delayDuration={200}>
      <section
        aria-label="Estrutura e facilidades"
        className="section-padding container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="mb-2 text-fluid-xl font-bold text-white">
          Estrutura &amp; Facilidades
        </h2>
        <p className="mb-8 text-sm text-white/50">
          Passe o mouse ou toque em cada item para saber mais.
        </p>

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
      </section>
    </Tooltip.Provider>
  );
}
