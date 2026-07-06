export const CENTRAL_WHATSAPP = "5516957820040";

/** Converts formatted BR numbers like (16) 99191-9191 to wa.me format (5516991919191). */
export function normalizeWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return CENTRAL_WHATSAPP;

  if (digits.startsWith("55") && digits.length >= 12) {
    return digits;
  }

  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }

  return digits;
}

export function buildWhatsAppLink(
  text: string,
  number = CENTRAL_WHATSAPP
): string {
  return `https://wa.me/${normalizeWhatsAppNumber(number)}?text=${encodeURIComponent(text)}`;
}

export function buildTelLink(raw: string): string {
  return `tel:+${normalizeWhatsAppNumber(raw)}`;
}
