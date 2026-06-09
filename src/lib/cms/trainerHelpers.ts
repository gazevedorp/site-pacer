import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Personal } from "@/types/cms";

export function getTrainerWhatsAppLink(trainer: Personal): string {
  return buildWhatsAppLink(
    `Olá! Gostaria de saber mais sobre os serviços de ${trainer.name} na Pacer Academia.`,
    trainer.contact.whatsapp
  );
}
