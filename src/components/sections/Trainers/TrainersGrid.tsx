import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Users, Award } from "lucide-react";
import { modalities } from "@/data/modalities";
import { units } from "@/data/units";
import type { Trainer } from "@/data/trainers";
import { cn } from "@/lib/utils";
import gymCover from "@/assets/images/gym.png";

// ─── Avatar initials ──────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "from-blue-600 to-blue-400",
  "from-orange-600 to-orange-400",
  "from-red-600 to-red-400",
  "from-teal-600 to-teal-400",
  "from-cyan-600 to-cyan-400",
  "from-indigo-600 to-indigo-400",
  "from-purple-600 to-purple-400",
  "from-pink-600 to-pink-400",
  "from-amber-600 to-amber-400",
  "from-emerald-600 to-emerald-400",
] as const;

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getAvatarColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── Trainer card ─────────────────────────────────────────────────────────────

function TrainerCard({ trainer, index }: { trainer: Trainer; index: number }) {
  const reduced = useReducedMotion();

  // Resolve unit labels (max 2 shown + overflow count)
  const trainerUnits = units.filter((u) => trainer.unitSlugs.includes(u.slug));
  const visibleUnits = trainerUnits.slice(0, 2);
  const extraUnits = trainerUnits.length - visibleUnits.length;

  // Resolve modality icons
  const trainerModalities = modalities.filter((m) =>
    trainer.modalityIds.includes(m.id as (typeof trainer.modalityIds)[number])
  );

  const initials = getInitials(trainer.name);
  const avatarGradient = getAvatarColor(trainer.id);

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : Math.min(index * 0.07, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.03] backdrop-blur-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40",
        trainer.featured
          ? "border-primary/30 hover:border-primary/50"
          : "border-white/10 hover:border-white/20"
      )}
      aria-label={trainer.name}
    >
      {/* Featured badge */}
      {trainer.featured && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full border border-primary/30 bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
          <Award className="h-2.5 w-2.5" aria-hidden />
          Destaque
        </div>
      )}

      {/* Photo / avatar */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
        {/* Background image subtle */}
        <img
          src={gymCover}
          alt=""
          role="presentation"
          loading="lazy"
          decoding="async"
          width={480}
          height={360}
          className="absolute inset-0 h-full w-full object-cover opacity-20 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Initials avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br text-2xl font-bold text-white shadow-lg",
              avatarGradient
            )}
            aria-hidden
          >
            {initials}
          </div>
        </div>

        {/* Gradient bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />

        {/* Modality icons row (bottom overlay) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          {trainerModalities.slice(0, 4).map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                title={m.title}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-black/50 backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 text-primary/80" aria-hidden />
              </div>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Name + credential */}
        <div>
          <h3 className="text-base font-bold text-white">{trainer.name}</h3>
          {trainer.credential && (
            <p className="mt-0.5 text-xs text-primary/70">{trainer.credential}</p>
          )}
        </div>

        {/* Bio — 2 lines truncated */}
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-white/50">
          {trainer.bio}
        </p>

        {/* Unit badges */}
        <div className="flex flex-wrap items-center gap-1.5" aria-label="Unidades de atuação">
          {visibleUnits.map((u) => (
            <span
              key={u.slug}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/60"
            >
              Pacer {u.name}
            </span>
          ))}
          {extraUnits > 0 && (
            <span className="text-[11px] text-white/30">
              +{extraUnits} {extraUnits === 1 ? "unidade" : "unidades"}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

interface TrainersGridProps {
  trainers: Trainer[];
}

export function TrainersGrid({ trainers: list }: TrainersGridProps) {
  return (
    <section
      aria-label="Lista de personal trainers"
      className="container mx-auto px-4 py-10 sm:px-6 lg:px-8"
    >
      <AnimatePresence mode="wait">
        {list.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <Users
              className="mb-5 h-14 w-14 text-white/10"
              aria-hidden
              strokeWidth={1.5}
            />
            <p className="text-base font-medium text-white/40">
              Nenhum profissional encontrado
            </p>
            <p className="mt-1 text-sm text-white/25">
              Tente ajustar os filtros acima.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            role="list"
          >
            {list.map((trainer, i) => (
              <div key={trainer.id} role="listitem">
                <TrainerCard trainer={trainer} index={i} />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
