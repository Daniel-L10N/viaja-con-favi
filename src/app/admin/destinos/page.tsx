'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

interface Destino {
  id: number;
  pais: string;
  codigo_pais: string;
  bandera_emoji: string;
  imagen: string;
  numero_resorts: number;
  continente: string;
  comida: string;
  transfers: string;
  precio_desde: string;
  descripcion: string;
  activo: boolean;
  orden: number;
}

export default function BlogAdmin() {
  const [items, setItems] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Partial<Destino> | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState<number | null>(null);
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  const cargar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/destinos/`);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error('Error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const abrirNuevo = () => {
    setEditando({
      pais: '',
      codigo_pais: '',
      bandera_emoji: '🌍',
      imagen: '',
      numero_resorts: 0,
      continente: 'europa',
      comida: 'Internacional',
      transfers: 'Privado',
      precio_desde: '',
      descripcion: '',
      activo: true,
      orden: 0
    });
    setImagenFile(null);
    setImagenPreview(null);
    setMostrarModal(true);
  };

  const abrirEditar = (item: Destino) => {
    setEditando({ ...item });
    setImagenFile(null);
    setImagenPreview(item.imagen || null);
    setMostrarModal(true);
  };

  const eliminar = async (id: number) => {
    if (!confirm(`¿Eliminar el destino #${id}?`)) return;
    setEliminando(id);
    try {
      await fetch(`${API_BASE}/api/destinos/${id}/`, { method: 'DELETE' });
      cargar();
    } catch (e) {
      console.error(e);
    } finally {
      setEliminando(null);
    }
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Tipo de archivo no permitido. Usa JPG, PNG, WebP o GIF');
        return;
      }
      // Validar tamaño (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo excede 5MB');
        return;
      }
      setImagenFile(file);
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImagen = () => {
    setImagenFile(null);
    setImagenPreview(null);
    if (editando) {
      setEditando({ ...editando, imagen: '' });
    }
  };

  const guardar = async () => {
    if (!editando?.pais || !editando?.codigo_pais) return;
    
    setGuardando(true);
    
    // Usar FormData si hay archivo de imagen
    if (imagenFile) {
      const formData = new FormData();
      formData.append('pais', editando.pais);
      formData.append('codigo_pais', editando.codigo_pais.toUpperCase());
      formData.append('bandera_emoji', editando.bandera_emoji || '🌍');
      formData.append('imagen', imagenFile);
      formData.append('numero_resorts', String(editando.numero_resorts || 0));
      formData.append('continente', editando.continente || 'europa');
      formData.append('comida', editando.comida || 'Internacional');
      formData.append('transfers', editando.transfers || 'Privado');
      formData.append('precio_desde', editando.precio_desde || '0');
      formData.append('descripcion', editando.descripcion || '');
      formData.append('activo', String(editando.activo ?? true));
      formData.append('orden', String(editando.orden || 0));

      try {
        const method = editando.id ? 'PUT' : 'POST';
        const url = editando.id 
          ? `${API_BASE}/api/destinos/${editando.id}/`
          : `${API_BASE}/api/destinos/`;
        
        await fetch(url, {
          method,
          body: formData
        });
        
        setMostrarModal(false);
        setEditando(null);
        setImagenFile(null);
        setImagenPreview(null);
        cargar();
      } catch (e) {
        console.error(e);
      } finally {
        setGuardando(false);
      }
      return;
    }
    
    // Método original (sin archivo) - para compatibilidad
    const payload = {
      pais: editando.pais,
      codigo_pais: editando.codigo_pais.toUpperCase(),
      bandera_emoji: editando.bandera_emoji || '🌍',
      imagen: editando.imagen || '',
      numero_resorts: editando.numero_resorts || 0,
      continente: editando.continente || 'europa',
      comida: editando.comida || 'Internacional',
      transfers: editando.transfers || 'Privado',
      precio_desde: editando.precio_desde || '0',
      descripcion: editando.descripcion || '',
      activo: editando.activo ?? true,
      orden: editando.orden || 0
    };

    try {
      const method = editando.id ? 'PUT' : 'POST';
      const url = editando.id 
        ? `${API_BASE}/api/destinos/${editando.id}/`
        : `${API_BASE}/api/destinos/`;
      
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

  const continenteLabel = (v: string) => {
    const map: Record<string, string> = {
      america_norte: 'América del Norte',
      america_central: 'América Central',
      america_sur: 'América del Sur',
      europa: 'Europa',
      asia: 'Asia',
      africa: 'África',
      oceania: 'Oceanía'
    };
    return map[v] || v;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Destinos</h1>
          <p className="text-gray-500 text-sm">Gestiona los destinos del blog</p>
        </div>
        <button
          onClick={abrirNuevo}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Añadir Destino
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
          <p className="text-gray-500 mt-2">Cargando...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">No hay destinos. Crea uno nuevo.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-600">ID</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">País</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Código</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Continente</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Resorts</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Precio desde</th>
                <th className="text-center p-4 text-sm font-medium text-gray-600">Activo</th>
                <th className="text-right p-4 text-sm font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-500">#{item.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.bandera_emoji}</span>
                      <span className="font-medium">{item.pais}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 font-mono">{item.codigo_pais}</td>
                  <td className="p-4 text-gray-600">{continenteLabel(item.continente)}</td>
                  <td className="p-4 text-gray-600">{item.numero_resorts}</td>
                  <td className="p-4 font-medium text-green-600">${item.precio_desde}</td>
                  <td className="p-4 text-center">
                    {item.activo ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        <Eye className="w-3 h-3" /> Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                        <EyeOff className="w-3 h-3" /> Inactivo
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => abrirEditar(item)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
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
              {editando.id ? `Editar Destino #${editando.id}` : 'Nuevo Destino'}
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">País *</label>
                <input
                  type="text"
                  value={editando.pais || ''}
                  onChange={(e) => setEditando({...editando, pais: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Francia"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código *</label>
                <input
                  type="text"
                  value={editando.codigo_pais || ''}
                  onChange={(e) => setEditando({...editando, codigo_pais: e.target.value.toUpperCase()})}
                  className="w-full px-3 py-2 border rounded-lg font-mono"
                  placeholder="FRA"
                  maxLength={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bandera</label>
                <input
                  type="text"
                  value={editando.bandera_emoji || ''}
                  onChange={(e) => setEditando({...editando, bandera_emoji: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="🇫🇷"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio desde</label>
                <input
                  type="text"
                  value={editando.precio_desde || ''}
                  onChange={(e) => setEditando({...editando, precio_desde: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nº Resorts</label>
                <input
                  type="number"
                  value={editando.numero_resorts || 0}
                  onChange={(e) => setEditando({...editando, numero_resorts: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Continente</label>
                <select
                  value={editando.continente || 'europa'}
                  onChange={(e) => setEditando({...editando, continente: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comida</label>
                <select
                  value={editando.comida || 'Internacional'}
                  onChange={(e) => setEditando({...editando, comida: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Todo incluido">Todo incluido</option>
                  <option value="Internacional">Internacional</option>
                  <option value="Francesa">Francesa</option>
                  <option value="Local">Local</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transfers</label>
                <select
                  value={editando.transfers || 'Privado'}
                  onChange={(e) => setEditando({...editando, transfers: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Privado">Privado</option>
                  <option value="Aeropuerto-Hotel">Aeropuerto-Hotel</option>
                  <option value="Compartido">Compartido</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImagenChange}
                className="w-full px-3 py-2 border rounded-lg bg-white"
              />
              {imagenPreview && (
                <div className="mt-2 relative inline-block">
                  <img src={imagenPreview} alt="Preview" className="h-32 w-auto rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={clearImagen}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
              {editando.imagen && !imagenPreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Imagen actual:</p>
                  <img src={editando.imagen} alt="Actual" className="h-32 w-auto rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={clearImagen}
                    className="text-xs text-red-500 hover:text-red-700 mt-1"
                  >
                    Eliminar imagen
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={editando.descripcion || ''}
                onChange={(e) => setEditando({...editando, descripcion: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="activo"
                checked={editando.activo ?? true}
                onChange={(e) => setEditando({...editando, activo: e.target.checked})}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor="activo" className="text-sm text-gray-700">Activo (visible en el sitio)</label>
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
                disabled={guardando || !editando.pais || !editando.codigo_pais}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
