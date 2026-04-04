'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, X, Loader2 } from 'lucide-react';
import { Oferta } from '@/lib/types';

const ofertaVacia: Partial<Oferta> = {
  titulo: '',
  descripcion: '',
  precio: 0,
  imagen: '',
  destino: '',
  incluye: [],
  duracion: '',
  destacada: false
};

export default function OfertasAdmin() {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Partial<Oferta> | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const cargarOfertas = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ofertas');
      const data = await res.json();
      setOfertas(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarOfertas();
  }, []);

  const abrirNuevo = () => {
    setEditando({ ...ofertaVacia });
    setMostrarModal(true);
  };

  const abrirEditar = (oferta: Oferta) => {
    setEditando({ ...oferta });
    setMostrarModal(true);
  };

  const guardar = async () => {
    if (!editando?.titulo || !editando?.precio) return;
    
    setGuardando(true);
    try {
      const res = await fetch('/api/ofertas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editando)
      });
      
      if (res.ok) {
        setMostrarModal(false);
        setEditando(null);
        cargarOfertas();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion de Ofertas</h2>
        <button
          onClick={abrirNuevo}
          className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-amber-600"
        >
          <Plus className="w-5 h-5" />
          Nueva Oferta
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-600">Imagen</th>
                <th className="text-left p-4 font-semibold text-gray-600">Titulo</th>
                <th className="text-left p-4 font-semibold text-gray-600">Destino</th>
                <th className="text-left p-4 font-semibold text-gray-600">Precio</th>
                <th className="text-left p-4 font-semibold text-gray-600">Estado</th>
                <th className="text-right p-4 font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ofertas.map((oferta) => (
                <tr key={oferta.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <img src={oferta.imagen} alt={oferta.titulo} className="w-16 h-12 object-cover rounded-lg" />
                  </td>
                  <td className="p-4 font-medium">{oferta.titulo}</td>
                  <td className="p-4 text-gray-600">{oferta.destino}</td>
                  <td className="p-4 font-bold text-amber-600">${oferta.precio}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${oferta.destacada ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                      {oferta.destacada ? 'Destacada' : 'Normal'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => abrirEditar(oferta)}
                      className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mostrarModal && editando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {editando.id ? 'Editar Oferta' : 'Nueva Oferta'}
              </h3>
              <button onClick={() => setMostrarModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
                <input
                  type="text"
                  value={editando.titulo || ''}
                  onChange={(e) => setEditando({...editando, titulo: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="Paris - 5 Noches"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
                <textarea
                  value={editando.descripcion || ''}
                  onChange={(e) => setEditando({...editando, descripcion: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio (USD)</label>
                  <input
                    type="number"
                    value={editando.precio || ''}
                    onChange={(e) => setEditando({...editando, precio: Number(e.target.value)})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duracion</label>
                  <input
                    type="text"
                    value={editando.duracion || ''}
                    onChange={(e) => setEditando({...editando, duracion: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="5 noches / 6 dias"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                <input
                  type="text"
                  value={editando.destino || ''}
                  onChange={(e) => setEditando({...editando, destino: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="Paris, Francia"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagen</label>
                <input
                  type="url"
                  value={editando.imagen || ''}
                  onChange={(e) => setEditando({...editando, imagen: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="https://..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Incluye (separados por coma)</label>
                <input
                  type="text"
                  value={Array.isArray(editando.incluye) ? editando.incluye.join(', ') : ''}
                  onChange={(e) => setEditando({...editando, incluye: e.target.value.split(', ')})}
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="Hotel 5★, Auto, Traslados"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="destacada"
                  checked={editando.destacada || false}
                  onChange={(e) => setEditando({...editando, destacada: e.target.checked})}
                  className="w-5 h-5 text-amber-500"
                />
                <label htmlFor="destacada" className="font-medium">Oferta destacada</label>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setMostrarModal(false)}
                className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={guardar}
                disabled={guardando}
                className="flex-1 bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 disabled:opacity-50"
              >
                {guardando ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
