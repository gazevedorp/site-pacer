import { CENTRAL_WHATSAPP, buildWhatsAppLink } from "@/lib/whatsapp";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface ContactChannel {
  id: string;
  icon: string; // lucide icon name
  label: string;
  value: string;
  href: string;
  description?: string;
}

export interface ContactSubjectOption {
  value: string;
  label: string;
}

export interface BusinessHour {
  days: string;
  hours: string;
}

// ─── Business hours ────────────────────────────────────────────────────────────

export const businessHours: BusinessHour[] = [
  { days: "Segunda a Sexta", hours: "06h – 22h" },
  { days: "Sábado", hours: "08h – 18h" },
  { days: "Domingo e Feriados", hours: "09h – 14h" },
];

// ─── Contact channels ──────────────────────────────────────────────────────────

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    icon: "Mail",
    label: "E-mail",
    value: "sac@paceracademia.com.br",
    href: "mailto:sac@paceracademia.com.br",
    description: "Respondemos em até 2 dias úteis.",
  },
  {
    id: "whatsapp",
    icon: "MessageCircle",
    label: "WhatsApp",
    value: "(16) 95782-0040",
    href: buildWhatsAppLink("Olá! Gostaria de mais informações sobre a Pacer Academia.", CENTRAL_WHATSAPP),
    description: "Atendimento rápido, seg–sex 8h–18h.",
  },
  {
    id: "phone",
    icon: "Phone",
    label: "Telefone",
    value: "(16) 3333-4444",
    href: "tel:+551633334444",
    description: "Central de atendimento presencial.",
  },
  {
    id: "instagram",
    icon: "Instagram",
    label: "Instagram",
    value: "@paceracademia",
    href: "https://instagram.com/paceracademia",
    description: "Acompanhe novidades e promoções.",
  },
];

// ─── Contact subject options ───────────────────────────────────────────────────

export const contactSubjectOptions: ContactSubjectOption[] = [
  { value: "duvida", label: "Dúvida" },
  { value: "cancelamento", label: "Cancelamento" },
  { value: "reclamacao", label: "Reclamação" },
  { value: "elogio", label: "Elogio" },
  { value: "outro", label: "Outro" },
];
