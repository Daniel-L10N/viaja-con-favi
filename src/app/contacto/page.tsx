import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contacto | Viaja con Favi - Preguntas sobre Viajes de Lujo',
  description: 'Contáctanos para información sobre ofertas de viajes exclusivos, membresías y destinos de lujo. Respondemos rápido por WhatsApp.',
  keywords: ['contacto viaje', 'WhatsApp', 'consulta viajes', 'membresía travel', 'soporte cliente'],
  alternates: {
    canonical: 'https://viajaconfavi.com/contacto',
  },
};

export default function ContactoPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contacto Viaja con Favi",
    "description": "Página de contacto para consultas sobre viajes de lujo y membresías",
    "url": "https://viajaconfavi.com/contacto",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+525616376826",
        "contactType": "customer service",
        "availableTime": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "20:00"
        }
      },
      {
        "@type": "ContactPoint",
        "email": "info@viajaconfavi.com",
        "contactType": "customer service"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      
      <nav className="bg-white border-b" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm" role="list">
            <li><Link href="/" className="text-gray-500 hover:text-amber-600">Inicio</Link></li>
            <li className="text-gray-400">/</li>
            <li><span className="text-gray-900 font-medium">Contacto</span></li>
          </ol>
        </div>
      </nav>

      <section className="bg-gradient-to-r from-amber-600 to-amber-800 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-amber-100">
            Estamos aquí para ayudarte a planificar tu próximo viaje
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Múltiples formas de contactarnos
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <MessageCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-gray-600 text-sm mb-2">Respuesta rápida</p>
                    <a 
                      href="https://wa.me/525616376826" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 font-semibold hover:underline"
                    >
                      +52 56 1637 6826
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Llamada telefónica</h3>
                    <p className="text-gray-600 text-sm mb-2">Lunes a Viernes 9am-8pm</p>
                    <a 
                      href="tel:+525616376826" 
                      className="text-amber-600 font-semibold hover:underline"
                    >
                      +52 56 1637 6826
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 text-sm mb-2">Respondemos en 24h</p>
                    <a 
                      href="mailto:info@viajaconfavi.com" 
                      className="text-amber-600 font-semibold hover:underline"
                    >
                      info@viajaconfavi.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-amber-50 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-2">¿Por qué contactarnos?</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>✓ Recomendaciones personalizadas de destinos</li>
                  <li>✓ Información sobre ofertas exclusivas</li>
                  <li>✓ Ayuda con tu membresía Travorium</li>
                  <li>✓ Soporte post-venta</li>
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