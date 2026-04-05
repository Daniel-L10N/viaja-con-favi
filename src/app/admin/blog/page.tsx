'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

interface Destino {
  id: number;
  pais: string;
  codigo_pais: string;
  bandera_emoji: string;
  imagen: string;
  descripcion: string;
  activo: boolean;
  numero_resorts: number;
  continente: string;
  comida: string;
  transfers: string;
  precio_desde: string;
  extras: string[];
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Partial<Destino> | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState<number | null>(null);

  const cargarPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/destinos/`);
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.error('Error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPosts();
  }, []);

  const abrirNuevo = () => {
    setEditando({
      pais: '',
      codigo_pais: '',
      bandera_emoji: '🌍',
      imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      descripcion: '',
      activo: true,
      numero_resorts: 0,
      continente: 'europa',
      comida: 'Internacional',
      transfers: 'Privado',
      precio_desde: '999'
    });
    setMostrarModal(true);
  };

  const abrirEditar = (post: Destino) => {
    setEditando({ ...post });
    setMostrarModal(true);
  };

  const eliminar = async (id: number) => {
    if (!confirm('¿Eliminar este destino?')) return;
    setEliminando(id);
    try {
      const res = await fetch(`${API_BASE}/api/destinos/${id}/`, { method: 'DELETE' });
      if (res.ok) cargarPosts();
    } catch (e) {
      console.error(e);
    } finally {
      setEliminando(null);
    }
  };

  const guardar = async () => {
    if (!editando?.pais || !editando?.codigo_pais) return;
    
    setGuardando(true);
    const payload = {
      pais: editando.pais,
      codigo_pais: editando.codigo_pais.toUpperCase(),
      bandera_emoji: editando.bandera_emoji || '🌍',
      imagen: editando.imagen || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      descripcion: editando.descripcion || '',
      activo: editando.activo ?? true,
      numero_resorts: editando.numero_resorts || 0,
      continente: editando.continente || 'europa',
      comida: editando.comida || 'Internacional',
      transfers: editando.transfers || 'Privado',
      extras: editando.extras || [],
      precio_desde: editando.precio_desde || '999'
    };

    try {
      const method = editando.id ? 'PUT' : 'POST';
      const url = editando.id 
        ? `${API_BASE}/api/destinos/${editando.id}/`
        : `${API_BASE}/api/destinos/`;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setMostrarModal(false);
        setEditando(null);
        cargarPosts();
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
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Destinos (Blog)</h2>
        <button
          onClick={abrirNuevo}
          className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-amber-600"
        >
          <Plus className="w-5 h-5" />
          Nuevo Destino
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay destinos. Crea uno nuevo.
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl p-4 shadow flex gap-4 items-center">
              <div className="text-4xl">{post.bandera_emoji}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{post.pais}</h3>
                <p className="text-sm text-gray-500">Código: {post.codigo_pais} · Continente: {post.continente}</p>
                <p className="text-sm text-gray-600 mt-1">{post.descripcion?.slice(0, 100)}...</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{post.numero_resorts} resorts</span>
                  {post.activo ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Activo</span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Inactivo</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => abrirEditar(post)}
                  className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => eliminar(post.id)}
                  disabled={eliminando === post.id}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  {eliminando === post.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {mostrarModal && editando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">
              {editando.id ? 'Editar Destino' : 'Nuevo Destino'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">País *</label>
                <input
                  type="text"
                  value={editando.pais || ''}
                  onChange={(e) => setEditando({...editando, pais: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="Francia"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código País *</label>
                  <input
                    type="text"
                    value={editando.codigo_pais || ''}
                    onChange={(e) => setEditando({...editando, codigo_pais: e.target.value.toUpperCase()})}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="FRA"
                    maxLength={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emoji Bandera</label>
                  <input
                    type="text"
                    value={editando.bandera_emoji || ''}
                    onChange={(e) => setEditando({...editando, bandera_emoji: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="🇫🇷"
                  />
                </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={editando.descripcion || ''}
                  onChange={(e) => setEditando({...editando, descripcion: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  rows={3}
                  placeholder="Descripción del destino..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nº Resorts</label>
                  <input
                    type="number"
                    value={editando.numero_resorts || 0}
                    onChange={(e) => setEditando({...editando, numero_resorts: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Continente</label>
                  <select
                    value={editando.continente || 'europa'}
                    onChange={(e) => setEditando({...editando, continente: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                  >
                    <option value="america_norte">América del Norte</option>
                    <option value="america_central">América Central</option>
                    <option value="america_sur">América del Sur</option>
                    <option value="europa">Europa</option>
                    <option value="asia">Asia</option>
                    <option value="africa">África</option>
                    <option value="oceania">Oceanía</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comida</label>
                  <select
                    value={editando.comida || 'Internacional'}
                    onChange={(e) => setEditando({...editando, comida: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                  >
                    <option value="Todo incluido">Todo incluido</option>
                    <option value="Internacional">Internacional</option>
                    <option value="Francesa">Francesa</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Local">Local</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transfers</label>
                  <select
                    value={editando.transfers || 'Privado'}
                    onChange={(e) => setEditando({...editando, transfers: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                  >
                    <option value="Privado">Privado</option>
                    <option value="Aeropuerto-Hotel">Aeropuerto-Hotel</option>
                    <option value="Compartido">Compartido</option>
                    <option value="Sin transfers">Sin transfers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio desde</label>
                  <input
                    type="text"
                    value={editando.precio_desde || ''}
                    onChange={(e) => setEditando({...editando, precio_desde: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="999"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editando.activo ?? true}
                  onChange={(e) => setEditando({...editando, activo: e.target.checked})}
                  className="w-5 h-5 text-amber-500"
                />
                <span className="font-medium">Activo (visible en el blog)</span>
              </label>
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
                disabled={guardando || !editando.pais || !editando.codigo_pais}
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