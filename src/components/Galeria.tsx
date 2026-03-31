"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Utensils, Car, Gift, Star } from "lucide-react";
import { destinations } from "@/lib/destinations";
import { useState } from "react";

export default function Galeria() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            Destinos Exclusivos
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-ocean mt-2 mb-4">
            Top 26 Países
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explora los destinos más prestigiosos del mundo. Haz clic en cada uno
            para descubrir los beneficios exclusivos que incluye tu viaje.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredId(destination.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.country}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/20 to-transparent" />

                {/* Flag & Country */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-3xl">{destination.flag}</span>
                  <span className="text-white font-heading font-bold text-lg">
                    {destination.country}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 bg-gold text-ocean font-bold px-3 py-1 rounded-full">
                  Desde {destination.priceFrom}
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-ocean/95 flex flex-col justify-center items-center p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === destination.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-white font-heading text-xl font-bold mb-4 text-center">
                    {destination.resorts} Resorts disponibles
                  </h4>

                  <div className="space-y-3 w-full">
                    <div className="flex items-center gap-3 text-white/90">
                      <Utensils className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-sm">{destination.benefits.meals}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <Car className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-sm">{destination.benefits.transfers}</span>
                    </div>
                    {destination.benefits.extras.map((extra, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/90">
                        <Gift className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-sm">{extra}</span>
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 btn-primary text-sm py-2 px-6">
                    Ver Detalles
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="#footer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Star className="w-5 h-5" />
            <span>Ver todos los destinos</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
