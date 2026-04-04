'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Oferta } from '@/lib/types';
import { MapPin, Calendar } from 'lucide-react';

interface OfertaCardProps {
  oferta: Oferta;
  index?: number;
}

export default function OfertaCard({ oferta, index = 0 }: OfertaCardProps) {
  const incluyeArray = Array.isArray(oferta.incluye) ? oferta.incluye : [];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={oferta.imagen}
          alt={oferta.titulo}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {oferta.destacada && (
          <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            DESTACADA
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span>{oferta.destino}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{oferta.titulo}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{oferta.descripcion}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {incluyeArray.slice(0, 3).map((item, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
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
            <Calendar className="w-4 h-4" />
            <span>{oferta.duracion}</span>
          </div>
        </div>
        
        <Link
          href={`/destinos/${oferta.id}`}
          className="block mt-4 w-full text-center bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
        >
          Ver Detalles
        </Link>
      </div>
    </motion.div>
  );
}
