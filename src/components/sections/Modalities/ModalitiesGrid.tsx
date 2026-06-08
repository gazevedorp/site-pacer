import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { modalities } from "@/data/modalities";
import gymCover from "@/assets/images/gym.png";

type ModalityItem = (typeof modalities)[number];

function ModalityCard({ item, index }: { item: ModalityItem; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : Math.min(index * 0.07, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        to={`/modalidades/${item.slug}`}
        className={cn(
          "group relative block overflow-hidden rounded-2xl border border-card-border",
          "bg-card backdrop-blur-sm transition-all duration-300",
          "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
        aria-label={`Ver detalhes de ${item.title}`}
      >
        {/* Cover image */}
        <div className="aspect-card relative overflow-hidden">
          <img
            src={gymCover}
            alt={`${item.title} na Pacer Academia`}
            loading="lazy"
            decoding="async"
            width={480}
            height={320}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-bold text-white group-hover:text-primary/90 transition-colors">
            {item.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/55">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-full flex flex-col items-center gap-4 py-20 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-card-border bg-card">
        <Layers className="h-7 w-7 text-muted-foreground" aria-hidden />
      </div>
      <div>
        <p className="text-lg font-semibold text-foreground">
          Nenhuma modalidade encontrada nesta unidade
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tente selecionar outra unidade.
        </p>
      </div>
    </motion.div>
  );
}

interface ModalitiesGridProps {
  filteredItems: ModalityItem[];
}

export function ModalitiesGrid({ filteredItems }: ModalitiesGridProps) {
  return (
    <section
      aria-label="Lista de modalidades"
      className="section-padding container mx-auto px-4 sm:px-6 lg:px-8"
    >
      <AnimatePresence mode="wait">
        {filteredItems.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            role="list"
          >
            {filteredItems.map((item, i) => (
              <div key={item.id} role="listitem">
                <ModalityCard item={item} index={i} />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="empty">
            <EmptyState />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
