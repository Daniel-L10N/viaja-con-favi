"use client";

import { motion } from "framer-motion";
import { Globe, Percent, CreditCard, Sparkles, ArrowRight, Check } from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "26 Países",
    description: "Acceso a destinos de lujo en 26 países alrededor del mundo",
  },
  {
    icon: Percent,
    title: "Hasta 70% OFF",
    description: "Descuentos exclusivos en hoteles y resorts de 5 estrellas",
  },
  {
    icon: CreditCard,
    title: "Precio Mayorista",
    description: "Tarifas de agente de viajes directo, sin intermediarios",
  },
  {
    icon: Sparkles,
    title: "Experiencias Únicas",
    description: "Upgrade automático y beneficios adicionales en tu reserva",
  },
];

export default function Concepto() {
  const priceComparison = [
    { label: "Precio público", tradicional: "$3,500", favi: "$1,050", savings: "70%" },
    { label: "5 noches hotel 5★", tradicional: "$2,800", favi: "$980", savings: "65%" },
    { label: "Paquete todo incluido", tradicional: "$4,200", favi: "$1,260", savings: "70%" },
    { label: "Vuelo + Hotel", tradicional: "$5,500", favi: "$1,925", savings: "65%" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="concepto" className="section-padding bg-gradient-to-b from-cream to-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            El Modelo Travorium
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-ocean mt-2 mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Accede a precios exclusivos de mayorista através de nuestra comunidad.
            Lo que otros pagan caro, tú lo obtienes al mejor precio.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-ocean rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-xl font-bold text-ocean mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Price Comparison */}
        <motion.div
          className="bg-ocean rounded-3xl p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              Compara y Ahorra
            </h3>
            <p className="text-white/70">
              El mismo viaje, una fracción del precio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Header */}
            <div className="hidden md:grid grid-cols-4 gap-4 text-white/60 text-sm font-medium pb-2 border-b border-white/20">
              <div>Tipo de Reserva</div>
              <div className="text-right">Precio Público</div>
              <div className="text-right">Precio Favi</div>
              <div className="text-right">¡Ahorras!</div>
            </div>

            {/* Rows */}
            {priceComparison.map((row, index) => (
              <div
                key={index}
                className="grid md:grid-cols-4 gap-4 md:gap-2 items-center py-4 border-b border-white/10"
              >
                <div className="text-white font-medium">{row.label}</div>
                <div className="text-white/60 line-through text-right md:text-left">
                  {row.tradicional}
                </div>
                <div className="text-gold font-bold text-xl text-right md:text-left">
                  {row.favi}
                </div>
                <div className="bg-green-500/20 text-green-400 font-bold text-center py-1 rounded-full text-sm">
                  {row.savings}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="#footer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>¡Quiero estos precios!</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            "IATA Member",
            "ASTA Verified",
            "SSL Secure",
            "24/7 Support",
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-500"
            >
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-medium">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
