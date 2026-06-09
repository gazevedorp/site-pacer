import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CENTRAL_WHATSAPP } from "@/lib/whatsapp";

const waLink = `https://wa.me/${CENTRAL_WHATSAPP}?text=${encodeURIComponent(
  "Olá! Gostaria de conhecer os planos da Pacer Academia."
)}`;

export function HomeCTABand() {
  const reduced = useReducedMotion();
  return (
    <section
      aria-label="Comece agora na Pacer"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background image */}
      <div aria-hidden className="absolute inset-0">
        <img
          src="/fundo-section.jpeg"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Top divider */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
      {/* Bottom divider */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      {/* Gold radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(233,181,29,0.10) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          className="text-sm font-semibold uppercase tracking-widest text-primary"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          #pacernoseuritmo
        </motion.p>

        <motion.h2
          className="mt-4 text-fluid-2xl font-bold uppercase tracking-tight text-white"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Saúde e bem estar
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-lg text-fluid-md leading-relaxed text-white/75"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          Fale com a gente pelo WhatsApp. Agendamos uma{" "}
          <strong className="text-white">aula experimental gratuita</strong>{" "}
          na unidade mais próxima de você.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-start sm:gap-4"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex w-full max-w-xs flex-col items-center gap-2 sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              style={{ backgroundColor: "#25D366", color: "#fff" }}
              asChild
            >
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Fale com a gente pelo WhatsApp
              </a>
            </Button>
            <p className="text-xs text-white/60">Fale conosco e tire suas dúvidas!</p>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full max-w-xs sm:w-auto"
            asChild
          >
            <Link to="/faq">
              Ver FAQ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
