import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Instagram, Youtube, Music2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HoverEffect, type HoverEffectItem } from "@/components/ui/hover-effect";
import type { ReactNode } from "react";

interface SocialItem extends HoverEffectItem {
  icon: ReactNode;
}

const socialLinks: SocialItem[] = [
  {
    title: "Instagram",
    description: "@paceracademia — fotos, vídeos e novidades das unidades.",
    link: "https://instagram.com/paceracademia",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    title: "YouTube",
    description: "Treinos, dicas de saúde e tour pelas academias.",
    link: "https://youtube.com/@paceracademia",
    icon: <Youtube className="h-5 w-5" />,
  },
  {
    title: "TikTok",
    description: "Conteúdo rápido sobre treino, nutrição e lifestyle.",
    link: "https://tiktok.com/@paceracademia",
    icon: <Music2 className="h-5 w-5" />,
  },
];

export function HomeFooterCTA() {
  const reduced = useReducedMotion();
  return (
    <section
      aria-label="Redes sociais e fale conosco"
      className="relative py-24 sm:py-32"
    >
      {/* Top divider */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* ── Left: CTA copy ──────────────────────────────────── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Fale conosco
            </p>
            <h2 className="mt-3 text-fluid-xl font-bold tracking-tight">
              Tem alguma{" "}
              <span className="text-muted-foreground">dúvida?</span>
            </h2>
            <p className="mt-4 max-w-md text-fluid-md leading-relaxed text-muted-foreground">
              Nossa equipe está pronta para te atender. Envie uma mensagem,
              visite uma unidade ou fique por dentro das novidades nas nossas
              redes sociais.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/contato">
                  Ir para contato
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/unidades">
                  Ver unidades
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* ── Right: Social HoverEffect ───────────────────────── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <HoverEffect items={socialLinks} className="grid-cols-1 md:grid-cols-3 lg:grid-cols-1" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
