import { motion } from "framer-motion";
import { useCategoriasComPlanos } from "@/hooks/cms/useCategoriaPlanos";
import { PlansCarousel } from "@/components/sections/Plans/PlansCarousel";
import { plansSectionContainerClass } from "@/components/sections/Plans/plansCarouselLayout";
import { CmsLoading } from "@/components/shared/CmsStates";
import { cn } from "@/lib/utils";

export function PlansCategories() {
  const { data: categorias, isLoading } = useCategoriasComPlanos();

  if (isLoading) return <CmsLoading className="py-16" />;
  if (categorias.length === 0) return null;

  return (
    <>
      {categorias.map((categoria, index) => {
        const isSecondary = categoria.slug !== "terrestres";
        const headingId = `plans-category-${categoria.slug}`;

        return (
          <section
            key={categoria.id}
            aria-labelledby={headingId}
            className={cn(
              index > 0 && "relative border-t border-border bg-muted/30"
            )}
          >
            <div className={cn(plansSectionContainerClass, "py-12 sm:py-16")}>
              <div className="text-center">
                <motion.h2
                  id={headingId}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-fluid-2xl font-bold text-foreground"
                >
                  {categoria.name}
                </motion.h2>
                {categoria.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground"
                  >
                    {categoria.description}
                  </motion.p>
                )}
              </div>

              <div className="mt-10">
                <PlansCarousel
                  plans={categoria.planos}
                  variant={isSecondary ? "secondary" : "default"}
                  ariaLabel={categoria.name}
                />
              </div>

              {index === 0 && (
                <p className="mt-8 text-center text-xs text-muted-foreground/80">
                  * Valores sujeitos a alteração. Consulte a recepção da unidade
                  para promoções e condições especiais.
                </p>
              )}

              {isSecondary && (
                <p className="mt-8 text-center text-xs text-muted-foreground/80">
                  * Setor aquático incluso no Multi e Família apenas nas unidades
                  com piscina.
                </p>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
