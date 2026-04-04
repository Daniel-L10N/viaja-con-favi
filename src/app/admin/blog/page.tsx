'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, X, Loader2 } from 'lucide-react';
import { BlogPost } from '@/lib/types';

const postVacio: Partial<BlogPost> = {
  titulo: '',
  slug: '',
  excerpt: '',
  contenido: '',
  imagen: '',
  autor: 'Viaja con Favi',
  tags: [],
  lectura: 5
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Partial<BlogPost> | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const cargarPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPosts();
  }, []);

  const generarSlug = (titulo: string) => {
    return titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const abrirNuevo = () => {
    setEditando({ ...postVacio });
    setMostrarModal(true);
  };

  const abrirEditar = (post: BlogPost) => {
    setEditando({ ...post });
    setMostrarModal(true);
  };

  const guardar = async () => {
    if (!editando?.titulo) return;
    
    const slug = editando.slug || generarSlug(editando.titulo);
    
    setGuardando(true);
    await new Promise(r => setTimeout(r, 500));
    
    const nuevoPost = {
      ...editando,
      id: editando.id || String(Date.now()),
      slug,
      fechaPublicacion: editando.fechaPublicacion || new Date().toISOString().split('T')[0]
    };
    
    if (editando.id) {
      setPosts(posts.map(p => p.id === editando.id ? { ...p, ...nuevoPost } as BlogPost : p));
    } else {
      setPosts([...posts, nuevoPost as BlogPost]);
    }
    
    setMostrarModal(false);
    setEditando(null);
    setGuardando(false);
  };

  const getTagsArray = (tags: string | string[]) => {
    return Array.isArray(tags) ? tags : [];
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion del Blog</h2>
        <button
          onClick={abrirNuevo}
          className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-amber-600"
        >
          <Plus className="w-5 h-5" />
          Nuevo Articulo
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" />
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl p-4 shadow flex gap-4 items-center">
              <img src={post.imagen} alt={post.titulo} className="w-24 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{post.titulo}</h3>
                <p className="text-sm text-gray-500">{post.slug} · {post.lectura} min lectura</p>
                <div className="flex gap-2 mt-2">
                  {getTagsArray(post.tags).map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => abrirEditar(post)}
                className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
              >
                <Pencil className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {mostrarModal && editando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {editando.id ? 'Editar Articulo' : 'Nuevo Articulo'}
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
                  onChange={(e) => setEditando({...editando, titulo: e.target.value, slug: generarSlug(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-xl"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (resumen para SEO)</label>
                <textarea
                  value={editando.excerpt || ''}
                  onChange={(e) => setEditando({...editando, excerpt: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  rows={2}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <textarea
                  value={editando.contenido || ''}
                  onChange={(e) => setEditando({...editando, contenido: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  rows={6}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                  <input
                    type="text"
                    value={editando.autor || ''}
                    onChange={(e) => setEditando({...editando, autor: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minutos lectura</label>
                  <input
                    type="number"
                    value={editando.lectura || ''}
                    onChange={(e) => setEditando({...editando, lectura: Number(e.target.value)})}
                    className="w-full px-4 py-2 border rounded-xl"
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
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (separados por coma)</label>
                <input
                  type="text"
                  value={Array.isArray(editando.tags) ? editando.tags.join(', ') : ''}
                  onChange={(e) => setEditando({...editando, tags: e.target.value.split(', ')})}
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="Viajes, Luxo, Travorium"
                />
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
