import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto - Viaja con Favi',
  description: 'Contacta con nosotros para mas informacion sobre ofertas de viajes exclusivos. WhatsApp disponible.',
  keywords: ['contacto viaje', 'WhatsApp', 'consulta viajes'],
};

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contactanos
          </h1>
          <p className="text-xl text-amber-100">
            Estamos aqui para ayudarte a planificar tu proximo viaje
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
               multiple formas de contactarnos
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-gray-600 text-sm mb-2">Respuesta rapida</p>
                    <a 
                      href="https://wa.me/525616376826" 
                      target="_blank"
                      className="text-amber-600 font-semibold hover:underline"
                    >
                      +52 56 1637 6826
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Llamada telefonica</h3>
                    <p className="text-gray-600 text-sm mb-2">Lunes a Viernes 9am-6pm</p>
                    <a 
                      href="tel:+525616376826" 
                      className="text-amber-600 font-semibold hover:underline"
                    >
                      +52 56 1637 6826
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 text-sm mb-2">Respondemos en 24h</p>
                    <a 
                      href="mailto:info@viajacconfavi.com" 
                      className="text-amber-600 font-semibold hover:underline"
                    >
                      info@viajacconfavi.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-amber-50 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-2">Por que contactarnos?</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>- Recomendaciones personalizadas de destinos</li>
                  <li>- Information sobre ofertas exclusivas</li>
                  <li>- Ayuda con tu membresia Travorium</li>
                  <li>- Soporte post-venta</li>
                </ul>
              </div>
            </div>
            
            <div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
