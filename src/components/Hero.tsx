"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown, Globe, Gift } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

const WHATSAPP_NUMBER = "525616376826";
const CTA_MESSAGE = "Hola Favi, quiero información sobre cómo viajar gratis con el club";

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
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/80 via-ocean/60 to-ocean/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean/70 to-transparent" />
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
            <Gift className="w-6 h-6 text-gold" />
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">
              Club de Viajes Privado
            </span>
            <Gift className="w-6 h-6 text-gold" />
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
            className="text-xl md:text-2xl text-white/90 mb-4 max-w-4xl mx-auto font-body"
          >
            El Club Privado que te permite viajar como millonario,{" "}
            <span className="text-gold font-bold">pagando como mayorista</span>
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto font-body flex items-center justify-center gap-2"
          >
            <Globe className="w-5 h-5 text-gold" />
            Accede a más de <span className="text-gold font-bold">100 Giras Mundiales</span> y Getaways en los 5 continentes
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
              <span>¡Quiero Mi Membresía Gratis!</span>
              <span className="text-2xl">→</span>
            </a>
            <a
              href="#membresia"
              className="text-white/80 hover:text-white font-medium underline underline-offset-4 transition-colors"
            >
              Ver planes
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              { number: "100+", label: "Giras Mundiales" },
              { number: "5", label: "Continentes" },
              { number: "70%", label: "Ahorro Promedio" },
              { number: "¡GRATIS!", label: "Con 3 Referidos" },
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
