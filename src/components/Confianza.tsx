"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Clock, Tag, Shield, Users, Quote } from "lucide-react";
import { testimonials, guarantees } from "@/lib/testimonials";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  tag: Tag,
  shield: Shield,
  users: Users,
};

export default function Confianza() {
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
    <section className="section-padding bg-ocean relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            Testimonios Reales
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Viaja con Favi transmite confianza
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Miles de viajeros han vivido experiencias unforgettable con Viaja con Favi.
            Esto es lo que dicen nuestros miembros.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-gold/50 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-gold fill-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/80 mb-6 italic leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-gold text-sm">{testimonial.trip}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantees */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {guarantees.map((guarantee) => {
            const IconComponent = iconMap[guarantee.icon] || Shield;
            return (
              <motion.div
                key={guarantee.id}
                variants={itemVariants}
                className="bg-white/5 rounded-xl p-5 border border-gold/20 text-center hover:border-gold/50 transition-colors"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-white font-heading font-bold mb-1">
                  {guarantee.title}
                </h4>
                <p className="text-white/60 text-sm">
                  {guarantee.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Overall Rating */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <span className="text-white font-semibold">4.9/5</span>
            <span className="text-white/60">basado en 2,500+ reseñas</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
