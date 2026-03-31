"use client";

import { motion } from "framer-motion";
import { Globe, Percent, CreditCard, ArrowRight, Check, Users, Gift } from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "100+ Giras Mundiales",
    description: "Acceso a destinos exclusivos en los 5 continentes",
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
    icon: Users,
    title: "Tu Membresía es Gratis",
    description: "Refiere 3 amigos y tu mensualidad desaparece",
  },
];

export default function Concepto() {
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
            ¿Cómo Funciona?
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-ocean mt-2 mb-4">
            El Club Privado de Viajes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Viaja con Favi es un club exclusivo que te da acceso a precios de mayorista 
            y la oportunidad de que tu membresía sea completamente gratuita mediante referidos.
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

        {/* How It Works - Referral */}
        <motion.div
          className="bg-ocean rounded-3xl p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <Gift className="w-16 h-16 text-gold mx-auto mb-4" />
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              ¿Cómo obtener tu membresía gratis?
            </h3>
            <p className="text-white/70">
              Es simple: refiere amigos y familia, ytu mensualidad desaparece
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="text-center p-6 bg-white/5 rounded-2xl">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-ocean font-bold text-xl">
                1
              </div>
              <h4 className="text-white font-bold mb-2">Únete al Club</h4>
              <p className="text-white/60 text-sm">
                Elige tu membresía Titanium o VIP Platinum y comienza a acumular puntos
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center p-6 bg-white/5 rounded-2xl">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-ocean font-bold text-xl">
                2
              </div>
              <h4 className="text-white font-bold mb-2">Comparte con 3</h4>
              <p className="text-white/60 text-sm">
                Recomienda Viaja con Favi a 3 amigos o familiares
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center p-6 bg-white/5 rounded-2xl">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                ✓
              </div>
              <h4 className="text-green-400 font-bold mb-2">¡Membresía Gratis!</h4>
              <p className="text-white/60 text-sm">
                Mantienes puntos, mantenés tus viajes, eliminás el costo mensual
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="#membresia"
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>¡Quiero comenzar ahora!</span>
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
            "Precios de Mayorista",
            "Asistencia 24/7",
            "100+ Destinos",
            "Comunidad VIP",
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
