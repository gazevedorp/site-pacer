import { motion, useReducedMotion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { employeeTestimonials } from "@/data/careers";

export function CareersTestimonials() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="overflow-hidden py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Quem já faz parte
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 text-fluid-2xl font-bold text-foreground"
          >
            O time fala por si
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Histórias reais de quem construiu carreira na Pacer Academia.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <InfiniteMovingCards
          items={employeeTestimonials}
          direction="left"
          speed="slow"
          pauseOnHover
        />
      </motion.div>
    </section>
  );
}
