'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, Star, Calendar, DollarSign } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

interface Destino {
  id: number;
  pais: string;
  bandera_emoji: string;
}

interface Paquete {
  id: number;
  destino: number;
  titulo: string;
  descripcion: string;
  duracion_dias: number;
  precio: string;
  moneda: string;
  incluye: string[];
  imagen: string | null;
  disponible: boolean;
  destacado: boolean;
}

export default function OfertasAdmin() {
  const [items, setItems] = useState<Paquete[]>([]);
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Partial<Paquete> | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState<number | null>(null);

  const cargar = async () => {
    setLoading(true);
    try {
      const [paqRes, destRes] = await Promise.all([
        fetch(`${API_BASE}/api/paquetes/`),
        fetch(`${API_BASE}/api/destinos/`)
      ]);
      const paqData = await paqRes.json();
      const destData = await destRes.json();
      setItems(paqData);
      setDestinos(destData);
    } catch (e) {
      console.error('Error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const getDestinoNombre = (destinoId: number) => {
    const d = destinos.find(x => x.id === destinoId);
    return d ? `${d.bandera_emoji} ${d.pais}` : `#${destinoId}`;
  };

  const abrirNuevo = () => {
    setEditando({
      destino: destinos[0]?.id || 1,
      titulo: '',
      descripcion: '',
      duracion_dias: 5,
      precio: '',
      moneda: 'USD',
      incluye: [],
      imagen: null,
      disponible: true,
      destacado: false
    });
    setMostrarModal(true);
  };

  const abrirEditar = (item: Paquete) => {
    setEditando({ ...item });
    setMostrarModal(true);
  };

  const eliminar = async (id: number) => {
    if (!confirm(`¿Eliminar la oferta #${id}?`)) return;
    setEliminando(id);
    try {
      await fetch(`${API_BASE}/api/paquetes/${id}/`, { method: 'DELETE' });
      cargar();
    } catch (e) {
      console.error(e);
    } finally {
      setEliminando(null);
    }
  };

  const guardar = async () => {
    if (!editando?.titulo || !editando?.precio || !editando?.destino) return;
    
    setGuardando(true);
    const payload = {
      destino: editando.destino,
      titulo: editando.titulo,
      descripcion: editando.descripcion || '',
      duracion_dias: editando.duracion_dias || 5,
      precio: editando.precio,
      moneda: editando.moneda || 'USD',
      incluye: editando.incluye || [],
      imagen: editando.imagen || null,
      disponible: editando.disponible ?? true,
      destacado: editando.destacado ?? false,
      destino_nombre: getDestinoNombre(editando.destino)
    };

    try {
      const method = editando.id ? 'PUT' : 'POST';
      const url = editando.id 
        ? `${API_BASE}/api/paquetes/${editando.id}/`
        : `${API_BASE}/api/paquetes/`;
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      setMostrarModal(false);
      setEditando(null);
      cargar();
    } catch (e) {
      console.error(e);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ofertas / Paquetes</h1>
          <p className="text-gray-500 text-sm">Gestiona los paquetes turísticos</p>
        </div>
        <button
          onClick={abrirNuevo}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
        >
          <Plus className="w-4 h-4" />
          Nueva Oferta
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-600" />
          <p className="text-gray-500 mt-2">Cargando...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">No hay ofertas. Crea una nueva.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-600">ID</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Título</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Destino</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Precio</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Días</th>
                <th className="text-center p-4 text-sm font-medium text-gray-600">Destacado</th>
                <th className="text-center p-4 text-sm font-medium text-gray-600">Activo</th>
                <th className="text-right p-4 text-sm font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-500">#{item.id}</td>
                  <td className="p-4 font-medium">{item.titulo}</td>
                  <td className="p-4 text-gray-600">{getDestinoNombre(item.destino)}</td>
                  <td className="p-4 font-bold text-amber-600">${item.precio}</td>
                  <td className="p-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.duracion_dias} días
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {item.destacado ? (
                      <Star className="w-5 h-5 text-amber-500 mx-auto fill-amber-500" />
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {item.disponible ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Activo</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">Inactivo</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => abrirEditar(item)}
                        className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => eliminar(item.id)}
                        disabled={eliminando === item.id}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Eliminar"
                      >
                        {eliminando === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mostrarModal && editando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">
              {editando.id ? `Editar Oferta #${editando.id}` : 'Nueva Oferta'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destino *</label>
                <select
                  value={editando.destino || ''}
                  onChange={(e) => setEditando({...editando, destino: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {destinos.map(d => (
                    <option key={d.id} value={d.id}>{d.bandera_emoji} {d.pais}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  value={editando.titulo || ''}
                  onChange={(e) => setEditando({...editando, titulo: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Estancia Romántica en París"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={editando.descripcion || ''}
                  onChange={(e) => setEditando({...editando, descripcion: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="7 días y 6 noches..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                  <input
                    type="number"
                    value={editando.precio || ''}
                    onChange={(e) => setEditando({...editando, precio: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="1299"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
                  <select
                    value={editando.moneda || 'USD'}
                    onChange={(e) => setEditando({...editando, moneda: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="MXN">MXN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duración (días)</label>
                  <input
                    type="number"
                    value={editando.duracion_dias || 5}
                    onChange={(e) => setEditando({...editando, duracion_dias: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Incluye (separado por comas)</label>
                <input
                  type="text"
                  value={Array.isArray(editando.incluye) ? editando.incluye.join(', ') : ''}
                  onChange={(e) => setEditando({
                    ...editando, 
                    incluye: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Hotel 5*, Vuelos, Desayuno"
                />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editando.destacado ?? false}
                    onChange={(e) => setEditando({...editando, destacado: e.target.checked})}
                    className="w-4 h-4 text-amber-600"
                  />
                  <span className="text-sm text-gray-700">⭐ Destacado</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editando.disponible ?? true}
                    onChange={(e) => setEditando({...editando, disponible: e.target.checked})}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm text-gray-700">Activo (visible)</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setMostrarModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={guardar}
                disabled={guardando || !editando.titulo || !editando.precio || !editando.destino}
                className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50"
              >
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
