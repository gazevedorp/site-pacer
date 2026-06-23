import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Instagram, Youtube, Music2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface SocialItem {
  title: string;
  link: string;
  icon: ReactNode;
}

const socialLinks: SocialItem[] = [
  {
    title: "Instagram",
    link: "https://instagram.com/paceracademia",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    title: "YouTube",
    link: "https://youtube.com/@paceracademia",
    icon: <Youtube className="h-5 w-5" />,
  },
  {
    title: "TikTok",
    link: "https://www.tiktok.com/@pacer.academia",
    icon: <Music2 className="h-5 w-5" />,
  },
];

export function HomeFooterCTA() {
  const reduced = useReducedMotion();
  return (
    <section
      aria-label="Redes sociais e fale conosco"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background image */}
      <div aria-hidden className="absolute inset-0">
        <img
          src="/fundo-section-2.jpeg"
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
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <h2 className="mt-3 text-fluid-xl font-bold tracking-tight text-white">
              Tem alguma dúvida?
            </h2>
            <p className="mt-4 max-w-md text-fluid-md leading-relaxed text-white/75">
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

          {/* ── Right: Social compact links ─────────────────────── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            {socialLinks.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-card-border bg-card px-5 py-4 text-sm font-medium text-white transition-colors hover:border-primary/40 hover:text-primary"
              >
                {item.icon}
                {item.title}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
