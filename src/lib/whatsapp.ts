export const CENTRAL_WHATSAPP = "5516957820040";

export function buildWhatsAppLink(
  text: string,
  number = CENTRAL_WHATSAPP
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
