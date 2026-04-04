'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Oferta } from '@/lib/types';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface OfertaCardProps {
  oferta: Oferta;
  index?: number;
}

export default function OfertaCard({ oferta, index = 0 }: OfertaCardProps) {
  const incluyeArray = Array.isArray(oferta.incluye) ? oferta.incluye : [];
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristPackage",
    "name": oferta.titulo,
    "description": oferta.descripcion,
    "image": oferta.imagen,
    "offers": {
      "@type": "Offer",
      "price": oferta.precio,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "touristType": ["Family", "Couple", "Adventure"],
    "duration": oferta.duracion
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="relative h-56 overflow-hidden">
        <Image
          src={oferta.imagen}
          alt={`${oferta.titulo} - ${oferta.destino} - Viaja con Favi`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {oferta.destacada && (
          <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold" role="status">
            DESTACADA
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          <span>{oferta.destino}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{oferta.titulo}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{oferta.descripcion}</p>
        
        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Incluye">
          {incluyeArray.slice(0, 3).map((item, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full" role="listitem">
              {item}
            </span>
          ))}
          {incluyeArray.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              +{incluyeArray.length - 3} mas
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-amber-600">${oferta.precio}</span>
            <span className="text-gray-500 text-sm"> USD</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span>{oferta.duracion}</span>
          </div>
        </div>
        
        <Link
          href={`/destinos/${oferta.id}`}
          className="block mt-4 w-full text-center bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
          aria-label={`Ver detalles de ${oferta.titulo}`}
        >
          Ver Detalles
        </Link>
      </div>
    </motion.article>
  );
}