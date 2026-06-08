import { motion, useReducedMotion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FAQSectionProps {
  showHeading?: boolean;
}

export function FAQSection({ showHeading = true }: FAQSectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby={showHeading ? "faq-heading" : undefined}
      className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        {showHeading && (
          <div className="mb-8 text-center">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-widest text-primary"
            >
              Tire suas dúvidas
            </motion.p>
            <motion.h2
              id="faq-heading"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="mt-2 text-fluid-2xl font-bold text-foreground"
            >
              Respostas rápidas
            </motion.h2>
          </div>
        )}

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion.Root
            type="single"
            collapsible
            className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
          >
            {faqItems.map((item) => (
              <Accordion.Item key={item.id} value={item.id} className="group">
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "flex w-full items-start justify-between gap-4 px-6 py-5 text-left",
                      "text-sm font-semibold text-foreground transition-colors",
                      "hover:bg-muted/40",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                      "data-[state=open]:bg-primary/5 data-[state=open]:text-primary"
                    )}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                      aria-hidden
                    />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all duration-300 data-[state=closed]:max-h-0 data-[state=open]:max-h-[600px]">
                  <div className="px-6 pb-5 pt-1">{item.answer}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="outline" asChild>
            <Link to="/contato">Fale conosco</Link>
          </Button>
          <Button asChild>
            <Link to="/planos">Ver planos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
