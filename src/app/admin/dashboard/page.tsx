'use client';

import { useState, useEffect } from 'react';
import { Users, MapPin, TrendingUp, Eye, MessageCircle, ArrowUp, ArrowDown } from 'lucide-react';

interface Metrica {
  label: string;
  value: number;
  change: number;
  icon: any;
}

export default function DashboardAdmin() {
  const [metricas, setMetricas] = useState<Metrica[]>([
    { label: 'Leads Totales', value: 0, change: 0, icon: Users },
    { label: 'Ofertas Publicadas', value: 0, change: 0, icon: MapPin },
    { label: 'Visitas Este Mes', value: 0, change: 0, icon: Eye },
    { label: 'Mensajes WhatsApp', value: 0, change: 0, icon: MessageCircle },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setMetricas([
      { label: 'Leads Totales', value: 12, change: 25, icon: Users },
      { label: 'Ofertas Publicadas', value: 5, change: 0, icon: MapPin },
      { label: 'Visitas Este Mes', value: 342, change: 15, icon: Eye },
      { label: 'Mensajes WhatsApp', value: 8, change: 33, icon: MessageCircle },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Resumen de tu plataforma de viajes</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricas.map((metrica, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <metrica.icon className="w-6 h-6 text-amber-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${metrica.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metrica.change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(metrica.change)}%
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{metrica.value}</p>
            <p className="text-gray-500 text-sm">{metrica.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ultimos Leads</h2>
          <div className="space-y-4">
            {[
              { nombre: 'Juan Garcia', destino: 'Paris, Francia', fecha: 'Hace 2 horas' },
              { nombre: 'Maria Lopez', destino: 'Cancun, Mexico', fecha: 'Ayer' },
              { nombre: 'Carlos Ruiz', destino: 'Bali, Indonesia', fecha: 'Hace 2 dias' },
            ].map((lead, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">{lead.nombre}</p>
                  <p className="text-sm text-gray-500">{lead.destino}</p>
                </div>
                <span className="text-xs text-gray-400">{lead.fecha}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ofertas Destacadas</h2>
          <div className="space-y-4">
            {[
              { titulo: 'Paris - 5 Noches', vistas: 156 },
              { titulo: 'Cancun - 7 Noches', vistas: 134 },
              { titulo: 'Bali - 10 Noches', vistas: 98 },
            ].map((oferta, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">{oferta.titulo}</p>
                  <p className="text-sm text-gray-500">{oferta.vistas} vistas</p>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
