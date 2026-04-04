import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOfertaBySlug, getOfertas } from '@/lib/data';
import { MapPin, Calendar, Check, ArrowLeft, Share2 } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const ofertas = await getOfertas();
  return ofertas.map((oferta) => ({ slug: oferta.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const oferta = await getOfertaBySlug(slug);
  
  if (!oferta) {
    return { title: 'Oferta no encontrada | Viaja con Favi' };
  }
  
  return {
    title: `${oferta.titulo} | Viaja con Favi`,
    description: oferta.descripcion,
    openGraph: {
      title: oferta.titulo,
      description: oferta.descripcion,
      images: [oferta.imagen],
    },
  };
}

export default async function OfertaDetallePage({ params }: Props) {
  const { slug } = await params;
  const oferta = await getOfertaBySlug(slug);
  
  if (!oferta) {
    notFound();
  }

  const incluyeArray = Array.isArray(oferta.incluye) ? oferta.incluye : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={oferta.imagen}
          alt={oferta.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link 
              href="/destinos"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a destinos
            </Link>
            <div className="flex items-center gap-3 text-white/80 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{oferta.destino}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {oferta.titulo}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Descripcion del Paquete
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                {oferta.descripcion}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Que incluye
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {incluyeArray.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-amber-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-1">Desde</p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-bold text-amber-600">${oferta.precio}</span>
                  <span className="text-gray-500">USD</span>
                </div>
                <p className="text-gray-500 text-sm">por persona</p>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-6 p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-gray-900">{oferta.duracion}</span>
              </div>
              
              <Link
                href="/contacto"
                className="block w-full bg-amber-500 text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-colors mb-4"
              >
                Reservar Ahora
              </Link>
              
              <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
