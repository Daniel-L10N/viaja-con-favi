'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, FileText, Eye, EyeOff } from 'lucide-react';
import { ImageUpload } from '@/components/ImageUpload';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

interface BlogPost {
  id: number;
  titulo: string;
  slug: string;
  excerpt: string;
  contenido: string;
  imagen: string | null;
  autor: string;
  tags: string[];
  lectura_minutos: number;
  status: string;
  created_at: string;
}

export default function BlogAdmin() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Partial<BlogPost> | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState<number | null>(null);
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const cargar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/blog/`);
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
    setImagenFile(null);
    setPreviewUrl(null);
    setEditando({
      titulo: '',
      slug: '',
      excerpt: '',
      contenido: '',
      imagen: '',
      autor: 'Admin',
      tags: [],
      lectura_minutos: 5,
      status: 'borrador'
    });
    setMostrarModal(true);
  };

  const abrirEditar = (item: BlogPost) => {
    setImagenFile(null);
    setPreviewUrl(item.imagen || null);
    setEditando({ ...item });
    setMostrarModal(true);
  };

  const eliminar = async (id: number) => {
    if (!confirm(`¿Eliminar el post #${id}?`)) return;
    setEliminando(id);
    try {
      await fetch(`${API_BASE}/api/blog/${id}/`, { method: 'DELETE' });
      cargar();
    } catch (e) {
      console.error(e);
    } finally {
      setEliminando(null);
    }
  };

  const guardar = async () => {
    if (!editando?.titulo || !editando?.slug) return;
    
    setGuardando(true);
    
    // Create FormData for multipart/form-data upload
    const formData = new FormData();
    formData.append('titulo', editando.titulo);
    formData.append('slug', editando.slug.toLowerCase().replace(/\s+/g, '-'));
    formData.append('excerpt', editando.excerpt || '');
    formData.append('contenido', editando.contenido || '');
    formData.append('autor', editando.autor || 'Admin');
    formData.append('tags', JSON.stringify(editando.tags || []));
    formData.append('lectura_minutos', String(editando.lectura_minutos || 5));
    formData.append('status', editando.status || 'borrador');
    
    // Append image file if selected
    if (imagenFile) {
      formData.append('imagen', imagenFile);
    }

    try {
      const method = editando.id ? 'PUT' : 'POST';
      const url = editando.id 
        ? `${API_BASE}/api/blog/${editando.id}/`
        : `${API_BASE}/api/blog/`;
      
      await fetch(url, {
        method,
        body: formData
      });
      
      setMostrarModal(false);
      setEditando(null);
      setImagenFile(null);
      setPreviewUrl(null);
      cargar();
    } catch (e) {
      console.error(e);
    } finally {
      setGuardando(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-500 text-sm">Gestiona los artículos del blog</p>
        </div>
        <button
          onClick={abrirNuevo}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
          Nuevo Post
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" />
          <p className="text-gray-500 mt-2">Cargando...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No hay posts. Crea uno nuevo.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border p-4 flex gap-4 items-start">
              <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {item.imagen ? (
                  <img src={item.imagen} alt={item.titulo} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <FileText className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.titulo}</h3>
                <p className="text-sm text-gray-500">/{item.slug}</p>
                <p className="text-sm text-gray-600 truncate mt-1">{item.excerpt}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-500">{item.lectura_minutos} min lectura</span>
                  <span className="text-xs text-gray-500">{formatDate(item.created_at)}</span>
                  {item.status === 'publicado' ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Publicado</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">Borrador</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => abrirEditar(item)}
                  className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"
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
            </div>
          ))}
        </div>
      )}

      {mostrarModal && editando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">
              {editando.id ? `Editar Post #${editando.id}` : 'Nuevo Post'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  value={editando.titulo || ''}
                  onChange={(e) => setEditando({...editando, titulo: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Título del artículo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  value={editando.slug || ''}
                  onChange={(e) => setEditando({...editando, slug: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                  placeholder="titulo-del-articulo"
                />
                <p className="text-xs text-gray-500 mt-1">URL: /blog/{editando.slug || '...'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Extracto</label>
                <textarea
                  value={editando.excerpt || ''}
                  onChange={(e) => setEditando({...editando, excerpt: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                  placeholder="Resumen del artículo..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <textarea
                  value={editando.contenido || ''}
                  onChange={(e) => setEditando({...editando, contenido: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={6}
                  placeholder="Contenido del artículo..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ImageUpload
                    value={previewUrl}
                    onChange={(file) => {
                      setImagenFile(file);
                      // Create temporary preview URL for the file
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setPreviewUrl(url);
                      } else {
                        setPreviewUrl(null);
                      }
                    }}
                    label="Imagen"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                  <input
                    type="text"
                    value={editando.autor || ''}
                    onChange={(e) => setEditando({...editando, autor: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Admin"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (separados por coma)</label>
                  <input
                    type="text"
                    value={Array.isArray(editando.tags) ? editando.tags.join(', ') : ''}
                    onChange={(e) => setEditando({
                      ...editando, 
                      tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="viaje, playa, lujo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minutos lectura</label>
                  <input
                    type="number"
                    value={editando.lectura_minutos || 5}
                    onChange={(e) => setEditando({...editando, lectura_minutos: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={editando.status || 'borrador'}
                    onChange={(e) => setEditando({...editando, status: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="borrador">Borrador</option>
                    <option value="publicada">Publicada</option>
                    <option value="archivada">Archivada</option>
                  </select>
                </div>
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
                disabled={guardando || !editando.titulo || !editando.slug}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
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
