import * as Dialog from "@radix-ui/react-dialog";
import { X, MapPin, MessageCircle, Instagram, Mail, Phone } from "lucide-react";
import { useMemo } from "react";
import { useUnidades } from "@/hooks/cms/useUnidades";
import { getTrainerWhatsAppLink } from "@/lib/cms/trainerHelpers";
import { buildTelLink } from "@/lib/whatsapp";
import { isActiveUnit } from "@/lib/cms/mappers/unidade";
import type { Personal } from "@/types/cms";
import { cn } from "@/lib/utils";

interface TrainerDetailModalProps {
  trainer: Personal | null;
  onClose: () => void;
}

export function TrainerDetailModal({ trainer, onClose }: TrainerDetailModalProps) {
  const open = trainer !== null;
  const { data: unidades } = useUnidades();

  const trainerUnits = useMemo(() => {
    if (!trainer) return [];
    const slugSet = new Set(trainer.unitSlugs);
    return unidades.filter((u) => isActiveUnit(u) && slugSet.has(u.slug));
  }, [trainer, unidades]);

  const contact = trainer?.contact;
  const phoneHref = contact ? buildTelLink(contact.phone) : undefined;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2",
            "overflow-hidden rounded-2xl border border-border bg-background shadow-xl focus:outline-none"
          )}
          aria-describedby={trainer ? "trainer-modal-bio" : undefined}
        >
          {trainer && (
            <div className="flex max-h-[min(85vh,560px)] flex-col md:flex-row">
              <div className="relative min-h-[200px] shrink-0 overflow-hidden bg-muted/20 md:w-[38%] md:min-h-0">
                <img
                  src={trainer.photoUrl}
                  alt={trainer.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5 sm:p-6">
                <Dialog.Title className="pr-10 text-xl font-bold text-foreground">
                  {trainer.name}
                </Dialog.Title>
                {trainer.credential && (
                  <p className="mt-1 text-sm text-primary">{trainer.credential}</p>
                )}
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {trainer.city}
                </p>

                <Dialog.Description
                  id="trainer-modal-bio"
                  className="mt-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {trainer.bio}
                </Dialog.Description>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Unidades
                  </p>
                  <ul className="mt-2 space-y-1" role="list">
                    {trainerUnits.map((unit) => (
                      <li
                        key={unit.slug}
                        className="text-xs leading-snug text-muted-foreground sm:text-sm"
                      >
                        Pacer {unit.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {contact && (
                  <div className="mt-5 border-t border-border pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                      Contato
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <a
                        href={getTrainerWhatsAppLink(trainer)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-2.5 text-xs font-semibold text-[#128C7E]"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                        WhatsApp
                      </a>
                      <a
                        href={`https://instagram.com/${contact.instagram.replace(/^@/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-xs font-semibold text-foreground"
                      >
                        <Instagram className="h-4 w-4 shrink-0" aria-hidden />
                        Instagram
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-xs font-semibold text-foreground"
                      >
                        <Mail className="h-4 w-4 shrink-0" aria-hidden />
                        E-mail
                      </a>
                      <a
                        href={phoneHref}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-xs font-semibold text-foreground"
                      >
                        <Phone className="h-4 w-4 shrink-0" aria-hidden />
                        Telefone
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <Dialog.Close
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
