import { Metadata } from 'next';
import { getOfertas } from '@/lib/data';
import OfertaCard from '@/components/OfertaCard';

export const metadata: Metadata = {
  title: 'Ofertas de Viajes 2026 - Paquetes Turisticos Exclusivos | Viaja con Favi',
  description: 'Descubre nuestras ofertas exclusivas de viajes 5 estrellas a precios de mayorista. Paris, Bali, Dubai y mas destinos.',
  keywords: ['ofertas viajes', 'paquetes туristicos', 'viajes lujo', 'destinos exclusive'],
};

export default async function DestinosPage() {
  const ofertas = await getOfertas();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ofertas Exclusivas
          </h1>
          <p className="text-xl text-amber-100">
            Viajes 5 estrellas a precios de mayorista
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ofertas.map((oferta, index) => (
              <OfertaCard key={oferta.id} oferta={oferta} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
