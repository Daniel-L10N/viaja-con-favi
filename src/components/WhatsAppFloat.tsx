"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

const WHATSAPP_NUMBER = "525616376826";
const DEFAULT_MESSAGE = "Hola Favi, quiero información sobre cómo viajar gratis con el club";

export default function WhatsAppFloat() {
  const whatsappLink = buildWhatsAppLink(WHATSAPP_NUMBER, DEFAULT_MESSAGE);

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <motion.span
        className="absolute -top-1 -right-1 bg-gold text-ocean text-xs font-bold px-2 py-1 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        ¡Escríbenos!
      </motion.span>
    </motion.a>
  );
}
