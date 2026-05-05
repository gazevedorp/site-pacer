import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Phone,
  Instagram,
  Clock,
  type LucideProps,
} from "lucide-react";
import type { ElementType } from "react";
import { contactChannels, businessHours } from "@/data/contact";
import { cn } from "@/lib/utils";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, ElementType<LucideProps>> = {
  Mail,
  MessageCircle,
  Phone,
  Instagram,
};

// ─── Channel card ─────────────────────────────────────────────────────────────

function ChannelCard({
  channel,
  index,
}: {
  channel: (typeof contactChannels)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  const Icon = iconMap[channel.icon] ?? Mail;

  return (
    <motion.a
      href={channel.href}
      target={channel.href.startsWith("http") ? "_blank" : undefined}
      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5",
        "transition-all duration-300",
        "hover:border-primary/25 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-primary/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
      aria-label={`${channel.label}: ${channel.value}`}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-colors group-hover:bg-primary/15"
        aria-hidden
      >
        <Icon className="h-5 w-5 text-primary" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/35">
          {channel.label}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-white transition-colors group-hover:text-primary">
          {channel.value}
        </p>
        {channel.description && (
          <p className="mt-0.5 text-xs text-white/35">{channel.description}</p>
        )}
      </div>
    </motion.a>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ContactInfo() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="contact-info-heading"
      className="container mx-auto px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
        {/* Channels */}
        <div>
          <motion.h2
            id="contact-info-heading"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-lg font-bold text-white"
          >
            Canais de atendimento
          </motion.h2>

          <div
            className="grid gap-3 sm:grid-cols-2"
            role="list"
            aria-label="Formas de contato"
          >
            {contactChannels.map((ch, i) => (
              <div key={ch.id} role="listitem">
                <ChannelCard channel={ch} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Business hours */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 lg:w-72"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <Clock className="h-4 w-4 text-primary" aria-hidden />
            </div>
            <h3 className="text-sm font-bold text-white">Horários de atendimento</h3>
          </div>

          <ul className="flex flex-col gap-3" role="list">
            {businessHours.map((bh) => (
              <li
                key={bh.days}
                className="flex items-center justify-between gap-4 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"
              >
                <span className="text-xs text-white/45">{bh.days}</span>
                <span className="whitespace-nowrap text-xs font-semibold text-white">
                  {bh.hours}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-white/25">
            * Horários válidos para a central de atendimento. Cada unidade pode
            ter horários distintos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
