"use client";

import { motion } from "framer-motion";
import { Check, Crown, Zap, Gift, Users, Percent, ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

const WHATSAPP_NUMBER = "5491112345678";

const membershipPlans = [
  {
    name: "Comunidad Favi",
    price: "GRATIS",
    period: "",
    description: "Perfecto para comenzar a explorar destinos de lujo",
    icon: Users,
    features: [
      "Acceso a catálogos de destinos",
      "Precios exclusivos de mayorista",
      "Asistencia en español 24/7",
      "Newsletter con ofertas",
      "Grupo privado de viajeros",
    ],
    cta: "Unirse Gratis",
    highlight: false,
    message: "Hola, quiero unirme a la comunidad gratuita de Viaja con Favi",
  },
  {
    name: "Club Favi Premium",
    price: "$29",
    period: "/mes",
    description: "Máximos beneficios y ahorros exclusivos",
    icon: Crown,
    features: [
      "Todo en Comunidad Favi",
      "26% de descuento adicional en reservas",
      "Acceso prioritario a ofertas flash",
      "Asesor personalizado dedicado",
      "Benefits residuales en cada reserva",
      "VIP support con tiempo de respuesta < 1hr",
    ],
    cta: "¡Quiero ser Premium!",
    highlight: true,
    message: "Hola, quiero información sobre el Club Favi Premium",
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
    <section className="section-padding bg-gradient-to-b from-cream to-white">
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
            Membresía
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-ocean mt-2 mb-4">
            Únete a la Comunidad
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Elige el plan que mejor se adapte a tus necesidades de viaje.
            Ambos incluyen acceso a precios exclusivos.
          </p>
        </motion.div>

        {/* Plans */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {membershipPlans.map((plan, index) => {
            const whatsappLink = buildWhatsAppLink(WHATSAPP_NUMBER, plan.message);
            const IconComponent = plan.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative rounded-3xl overflow-hidden ${
                  plan.highlight
                    ? "bg-ocean shadow-2xl scale-105 z-10"
                    : "bg-white shadow-xl"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-gold to-gold-light py-2 text-center">
                    <span className="text-ocean font-bold text-sm flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      MÁS POPULAR
                    </span>
                  </div>
                )}

                <div className={`p-8 ${plan.highlight ? "pt-12" : ""}`}>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        plan.highlight
                          ? "bg-gold/20"
                          : "bg-ocean/10"
                      }`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${
                          plan.highlight ? "text-gold" : "text-ocean"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-heading text-xl font-bold ${
                          plan.highlight ? "text-white" : "text-ocean"
                        }`}
                      >
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span
                      className={`font-heading text-4xl font-bold ${
                        plan.highlight ? "text-gold" : "text-ocean"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${
                        plan.highlight ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className={`mb-6 ${
                      plan.highlight ? "text-white/70" : "text-gray-600"
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                      >
                        <Check
                          className={`w-5 h-5 flex-shrink-0 ${
                            plan.highlight ? "text-gold" : "text-green-500"
                          }`}
                        />
                        <span
                          className={
                            plan.highlight ? "text-white/80" : "text-gray-700"
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
                    className={`block w-full py-4 px-6 rounded-full font-semibold text-center transition-all ${
                      plan.highlight
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

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 text-gray-600">
            <Gift className="w-5 h-5 text-gold" />
            <span>Puedes cancelar en cualquier momento</span>
          </div>
        </motion.div>

        {/* Benefits Explained */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Percent className="w-10 h-10 text-gold mb-4" />
            <h4 className="font-heading text-xl font-bold text-ocean mb-2">
              Descuentos Permanentes
            </h4>
            <p className="text-gray-600">
              Una vez unido, tus descuentos se mantienen para siempre.
              No hay límites en la cantidad de viajes que puedes reservar.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Users className="w-10 h-10 text-gold mb-4" />
            <h4 className="font-heading text-xl font-bold text-ocean mb-2">
              Beneficios Residuales
            </h4>
            <p className="text-gray-600">
              Recomienda la comunidad y gana beneficios en tus próximas reservas.
              Comparte y viaja más barato.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Crown className="w-10 h-10 text-gold mb-4" />
            <h4 className="font-heading text-xl font-bold text-ocean mb-2">
              Acceso VIP
            </h4>
            <p className="text-gray-600">
              Reservas prioritarias, upgrades automáticos y beneficios
              exclusivos en los resorts más solicitados.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
