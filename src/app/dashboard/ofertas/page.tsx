'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader2, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { getClienteOfertas } from '@/lib/api';
import type { Oferta } from '@/lib/types';

const DEFAULT_CLIENTE_ID = '1';

function formatDate(value?: string) {
  if (!value) return 'Sin fecha';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Sin fecha';

  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export default function OfertasPage() {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const loadOfertas = async () => {
      try {
        const data = await getClienteOfertas(DEFAULT_CLIENTE_ID);
        setOfertas(data);
      } catch (error) {
        console.error(error);
        setOfertas([]);
      } finally {
        setLoading(false);
      }
    };

    loadOfertas();
  }, []);

  const filteredOfertas = useMemo(() => {
    return ofertas.filter((oferta) => {
      const matchesSearch =
        oferta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        oferta.destino.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || oferta.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [filterStatus, ofertas, searchTerm]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Ofertas</h1>
          <p className="text-gray-600">Gestiona tus publicaciones de destinos</p>
        </div>
        <Link
          href="/dashboard/ofertas/nueva"
          className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nueva Oferta
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar ofertas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">Todos los estados</option>
            <option value="publicada">Publicadas</option>
            <option value="borrador">Borradores</option>
            <option value="archivada">Archivadas</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center gap-3 p-12 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
            <span>Cargando ofertas...</span>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Título</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Destino</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Precio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Visitas</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOfertas.map((oferta) => (
                  <tr key={oferta.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{oferta.titulo}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{oferta.destino}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">${oferta.precio}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        oferta.status === 'publicada'
                          ? 'bg-green-100 text-green-700'
                          : oferta.status === 'borrador'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {oferta.status || 'borrador'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{oferta.visitas || 0}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{formatDate(oferta.fechaPublicacion)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/destinos/${oferta.id}`}
                          className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {!loading && filteredOfertas.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">No se encontraron ofertas</p>
            <Link
              href="/dashboard/ofertas/nueva"
              className="inline-flex items-center gap-2 text-amber-600 hover:underline"
            >
              <Plus className="w-4 h-4" />
              Crear tu primera oferta
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
