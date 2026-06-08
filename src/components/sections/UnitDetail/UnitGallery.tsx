import { useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { getUnitGallery, type UnitGalleryImage } from "@/data/unitDetail";
import { UnitSection } from "@/components/sections/UnitDetail/UnitSection";
import { cn } from "@/lib/utils";

interface UnitGalleryProps {
  slug: string;
  unitName: string;
}

function GalleryLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: UnitGalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[index];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
        aria-label="Fechar galeria"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
            aria-label="Próxima foto"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <figure
        className="relative max-h-[85vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[85vh] w-full rounded-xl object-contain shadow-2xl"
        />
        <figcaption className="mt-3 text-center text-sm text-white/70">
          {image.alt}
          {images.length > 1 && (
            <span className="ml-2 text-white/40">
              {index + 1} / {images.length}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}

export function UnitGallery({ slug, unitName }: UnitGalleryProps) {
  const reduced = useReducedMotion();
  const images = getUnitGallery(slug, unitName);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const goPrev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );
  const goNext = useCallback(
    () =>
      setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  if (images.length === 0) return null;

  return (
    <>
      <UnitSection
        ariaLabel="Galeria de fotos da unidade"
        variant="default"
        eyebrow="Conheça o espaço"
        title="Galeria de fotos"
        description="Ambientes, equipamentos e a energia da unidade em imagens."
      >
        <div
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2"
          role="list"
          aria-label="Fotos da unidade"
        >
          {images.map((image, i) => (
            <motion.button
              key={`${image.src}-${i}`}
              type="button"
              role="listitem"
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.45,
                delay: reduced ? 0 : i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-muted/20 text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                i === 0 && "col-span-2 row-span-2 aspect-[4/3] lg:aspect-auto lg:min-h-[320px]",
                i !== 0 && "aspect-[4/3]"
              )}
              aria-label={`Ampliar: ${image.alt}`}
            >
              <img
                src={image.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <Images className="h-3 w-3" aria-hidden />
                Ampliar
              </span>
            </motion.button>
          ))}
        </div>
      </UnitSection>

      {activeIndex !== null && (
        <GalleryLightbox
          images={images}
          index={activeIndex}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
