"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

const WHATSAPP_NUMBER = "5491112345678";
const CTA_MESSAGE = "¡Hola! Quiero unirme a la comunidad de Viaja con Favi";

export default function Hero() {
  const whatsappLink = buildWhatsAppLink(WHATSAPP_NUMBER, CTA_MESSAGE);

  const images = [
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{
            backgroundImage: `url('${images[0]}')`,
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/70 via-ocean/50 to-ocean/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          className="container-custom px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-4"
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-gold fill-gold"
              />
            ))}
            <span className="text-white/80 ml-2 text-sm font-medium">
              Experiencias de Lujo Verificadas
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Viaja con{" "}
            <span className="text-gradient">Favi</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-body"
          >
            Experiencias de <span className="text-gold font-semibold">5 Estrellas</span> a{" "}
            <span className="text-gold font-semibold">Precios de Mayorista</span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg flex items-center gap-3"
            >
              <span>¡Unirme a la Comunidad!</span>
              <span className="text-2xl">→</span>
            </a>
            <a
              href="#concepto"
              className="text-white/80 hover:text-white font-medium underline underline-offset-4 transition-colors"
            >
              Descubrir cómo funciona
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              { number: "26", label: "Países" },
              { number: "2,000+", label: "Resorts" },
              { number: "70%", label: "Ahorro" },
              { number: "50K+", label: "Viajeros" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold font-heading">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#concepto"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.a>
    </section>
  );
}
