"use client";

import { motion } from "framer-motion";
import { Check, Crown, Zap, Gift, ArrowRight, Sparkles, Star } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

const WHATSAPP_NUMBER = "525616376826";

const membershipPlans = [
  {
    name: "Membresía Titanium",
    subtitle: "El estándar de aventura",
    price: "$249.90",
    initial: "USD",
    monthly: "$75.00",
    monthlyNote: "¡Gratis con 3 referidos!",
    points: "150 puntos",
    pointsMonthly: "+150 puntos/mes",
    icon: Crown,
    color: "ocean",
    features: [
      "Vacaciones de regalo en los 5 continentes al inscribirse",
      "Precios de segundo nivel y habitaciones regulares World Touch",
      "Acceso a precios de mayorista en hoteles, resorts, cruceros y renta de autos",
      "Asistencia 24/7 en español",
      "Descuentos exclusivos en paquetes turísticos",
    ],
    cta: "¡Quiero Titanium!",
    highlight: false,
    message: "Hola Favi, quiero información sobre la Membresía Titanium",
  },
  {
    name: "Membresía VIP Platinum",
    subtitle: "Lujo Total",
    price: "$369.90",
    initial: "USD",
    monthly: "$135.00",
    monthlyNote: "¡Gratis con 3 referidos!",
    points: "270 puntos",
    pointsMonthly: "+270 puntos/mes",
    icon: Sparkles,
    color: "gold",
    features: [
      "Vacaciones VIP de regalo en los 5 continentes al inscribirse",
      "Precios de primer nivel y habitaciones de lujo",
      "Mayor acumulación de puntos para Getaways y World Tours",
      "Asesor personal dedicado",
      "Acceso prioritario a ofertas flash",
      "Upgrade automático sujeto a disponibilidad",
    ],
    cta: "¡Quiero ser VIP Platinum!",
    highlight: true,
    message: "Hola Favi, quiero información sobre la Membresía VIP Platinum",
  },
];

export default function Membresia() {
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
    <section id="membresia" className="section-padding bg-gradient-to-b from-cream to-white">
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
            Planes de Membresía
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-ocean mt-2 mb-4">
            Elige Tu Plan de Viajes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Dos opciones diseñadas para diferentes estilos de viaje. 
            Ambas incluyen puntos para tus primeras vacaciones gratis.
          </p>
        </motion.div>

        {/* Plans */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {membershipPlans.map((plan, index) => {
            const whatsappLink = buildWhatsAppLink(WHATSAPP_NUMBER, plan.message);
            const IconComponent = plan.icon;
            const isHighlight = plan.highlight;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative rounded-3xl overflow-hidden ${
                  isHighlight
                    ? "bg-ocean shadow-2xl scale-105 z-10 border-2 border-gold"
                    : "bg-white shadow-xl border-2 border-transparent hover:border-ocean/20"
                }`}
              >
                {isHighlight && (
                  <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-gold to-gold-light py-3 text-center z-20">
                    <span className="text-ocean font-bold text-sm flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      RECOMENDADO
                    </span>
                  </div>
                )}

                <div className={`p-8 ${isHighlight ? "pt-14" : ""}`}>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        isHighlight
                          ? "bg-gold"
                          : "bg-ocean"
                      }`}
                    >
                      <IconComponent
                        className={`w-7 h-7 ${
                          isHighlight ? "text-ocean" : "text-white"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-heading text-2xl font-bold ${
                          isHighlight ? "text-white" : "text-ocean"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p className={`text-sm ${isHighlight ? "text-gold" : "text-gray-500"}`}>
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Price - Initial */}
                  <div className="mt-6 mb-2">
                    <span
                      className={`font-heading text-3xl font-bold ${
                        isHighlight ? "text-white" : "text-ocean"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${
                        isHighlight ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      {" "} {plan.initial} inversión inicial
                    </span>
                  </div>

                  {/* Monthly */}
                  <div className="mb-2">
                    <span
                      className={`font-heading text-2xl font-bold ${
                        isHighlight ? "text-gold" : "text-ocean"
                      }`}
                    >
                      {plan.monthly}
                    </span>
                    <span
                      className={`text-sm ${
                        isHighlight ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      {" "}/mes
                    </span>
                    <span className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      {plan.monthlyNote}
                    </span>
                  </div>

                  {/* Points */}
                  <div className={`mb-6 p-3 rounded-xl ${isHighlight ? "bg-white/10" : "bg-gold/10"}`}>
                    <div className="flex items-center gap-2">
                      <Star className={`w-5 h-5 ${isHighlight ? "text-gold" : "text-gold"}`} />
                      <span className={`font-bold ${isHighlight ? "text-white" : "text-ocean"}`}>
                        {plan.points}
                      </span>
                    </div>
                    <p className={`text-sm ${isHighlight ? "text-white/70" : "text-gray-600"}`}>
                      {plan.pointsMonthly}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check
                          className={`w-5 h-5 flex-shrink-0 ${
                            isHighlight ? "text-gold" : "text-green-500"
                          }`}
                        />
                        <span
                          className={
                            isHighlight ? "text-white/80 text-sm" : "text-gray-700 text-sm"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-4 px-6 rounded-full font-bold text-center transition-all ${
                      isHighlight
                        ? "bg-gold text-ocean hover:bg-gold-light"
                        : "bg-ocean text-white hover:bg-ocean-light"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="inline ml-2 w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Referral Info */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 md:p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Gift className="w-16 h-16 mx-auto mb-4 text-gold" />
          <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Tu Membresía puede ser ¡GRATIS!
          </h3>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
            &ldquo;Comparte el secreto. Refiere a <span className="text-gold font-bold">3 amigos o familiares</span> a nuestro club y tu mensualidad desaparece. 
            Mantienes tus puntos, mantienes tus viajes, eliminas el costo.&rdquo;
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">0 referidos</div>
              <div className="text-sm">Pagas mensualidad completa</div>
            </div>
            <div className="bg-white/20 rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">1-2 referidos</div>
              <div className="text-sm">Descuento en mensualidad</div>
            </div>
            <div className="bg-gold text-ocean rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">3+ referidos</div>
              <div className="text-sm font-bold">¡Membresía Gratis!</div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 text-gray-600">
            <Gift className="w-5 h-5 text-gold" />
            <span>Puedes cancelar en cualquier momento • Sin compromisos</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
