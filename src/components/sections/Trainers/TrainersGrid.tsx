import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Users } from "lucide-react";
import type { Trainer } from "@/data/trainers";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TrainerDetailModal } from "@/components/sections/Trainers/TrainerDetailModal";
import gymCover from "@/assets/images/gym.png";

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

function TrainerCard({
  trainer,
  index,
  onViewMore,
}: {
  trainer: Trainer;
  index: number;
  onViewMore: (trainer: Trainer) => void;
}) {
  const reduced = useReducedMotion();
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
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        trainer.featured
          ? "border-primary/40 hover:border-primary/60"
          : "border-border hover:border-primary/30"
      )}
      aria-label={trainer.name}
    >
      {trainer.featured && (
        <div className="absolute left-3 top-3 z-10 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          Destaque
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden bg-muted/20">
        <img
          src={gymCover}
          alt=""
          role="presentation"
          loading="lazy"
          decoding="async"
          width={480}
          height={360}
          className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-105"
        />

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
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-bold text-foreground">{trainer.name}</h3>
          {trainer.credential && (
            <p className="mt-0.5 text-xs text-primary/80">{trainer.credential}</p>
          )}
        </div>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {trainer.bio}
        </p>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onViewMore(trainer)}
        >
          Ver mais
        </Button>
      </div>
    </motion.article>
  );
}

interface TrainersGridProps {
  trainers: Trainer[];
}

export function TrainersGrid({ trainers: list }: TrainersGridProps) {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  return (
    <>
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
                className="mb-5 h-14 w-14 text-muted-foreground/40"
                aria-hidden
                strokeWidth={1.5}
              />
              <p className="text-base font-medium text-foreground">
                Nenhum profissional encontrado
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
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
                  <TrainerCard
                    trainer={trainer}
                    index={i}
                    onViewMore={setSelectedTrainer}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <TrainerDetailModal
        trainer={selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
      />
    </>
  );
}
