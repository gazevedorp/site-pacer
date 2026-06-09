import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CENTRAL_WHATSAPP } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={`https://wa.me/${CENTRAL_WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-green-500/30 transition-shadow hover:shadow-xl hover:shadow-green-500/40"
      style={{ backgroundColor: "#25D366" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-6 w-6 text-white" />

      {/* Pulse ring */}
      <span className="absolute inset-0 animate-ping rounded-full opacity-20" style={{ backgroundColor: "#25D366" }} />
    </motion.a>
  );
}
