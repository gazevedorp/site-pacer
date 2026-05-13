import { motion, useReducedMotion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/plans";
import { cn } from "@/lib/utils";

export function PlansFAQ() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="faq-heading"
      className="container mx-auto px-4 pb-16 pt-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="mb-8 text-center">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Dúvidas frequentes
          </motion.p>
          <motion.h2
            id="faq-heading"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-2 text-fluid-2xl font-bold text-foreground"
          >
            FAQ
          </motion.h2>
        </div>

        {/* Accordion */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion.Root
            type="single"
            collapsible
            className="flex flex-col divide-y divide-card-border rounded-2xl border border-card-border bg-card overflow-hidden"
          >
            {faqItems.map((item) => (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className="group"
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "flex w-full items-start justify-between gap-4 px-6 py-5 text-left",
                      "text-sm font-semibold text-white/80 transition-colors",
                      "hover:bg-white/[0.025] hover:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                      "data-[state=open]:text-primary data-[state=open]:bg-primary/[0.04]"
                    )}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className="mt-0.5 h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                      aria-hidden
                    />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content
                  className="overflow-hidden text-sm text-white/50 leading-relaxed transition-all duration-300 data-[state=closed]:max-h-0 data-[state=open]:max-h-[600px]"
                >
                  <div className="px-6 pb-5 pt-1">{item.answer}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
