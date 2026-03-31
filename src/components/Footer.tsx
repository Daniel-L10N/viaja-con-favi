"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

const WHATSAPP_NUMBER = "5491112345678";
const WHATSAPP_MESSAGE = "Hola, quiero más información sobre Viaja con Favi";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de envío - en producción conectaría a Django API
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <footer id="footer" className="bg-ocean text-white">
      <div className="container-custom section-padding">
        <motion.div
          className="grid lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <h3 className="font-heading text-3xl font-bold mb-2">
              ¿Listo para viajar?
            </h3>
            <p className="text-white/70 mb-6">
              Déjanos tus datos y te contactaremos en menos de 24 horas
              con las mejores ofertas personalizadas.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 rounded-2xl p-8 text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="font-heading text-xl font-bold mb-2">
                  ¡Mensaje Enviado!
                </h4>
                <p className="text-white/80">
                  Gracias por contactarnos. Un asesor te escribirá pronto.
                </p>
                <p className="text-gold mt-4">
                  También puedes escribirnos directamente por WhatsApp
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre completo"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu correo electrónico"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Tu teléfono (con código de país)"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="¿Cuál es tu destino soñado?"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar Mensaje</span>
                </button>
                <p className="text-white/50 text-xs text-center">
                  * Al enviar, aceptas nuestros términos y política de privacidad
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact Info & WhatsApp */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* WhatsApp CTA */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-gold" />
                Chatea con nosotros
              </h4>
              <p className="text-white/70 mb-4">
                La forma más rápida de contactarnos. Respuestas inmediatas en
                horario comercial.
              </p>
              <a
                href={buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Abrir WhatsApp</span>
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-heading text-xl font-bold">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/80">
                  <Phone className="w-5 h-5 text-gold" />
                  <span>+54 9 11 1234 5678</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Mail className="w-5 h-5 text-gold" />
                  <span>hola@viajacconfavi.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span>Buenos Aires, Argentina</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-heading text-xl font-bold mb-4">
                Síguenos en redes
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-ocean transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-ocean transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-ocean transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-sm">
            <p>© 2024 Viaja con Favi. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
