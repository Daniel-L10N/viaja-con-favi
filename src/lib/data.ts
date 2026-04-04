import type { BlogPost, Oferta } from './types';

const API_BASE = 'http://127.0.0.1:8000';

async function fetchAPI(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, { 
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function getOfertas(): Promise<Oferta[]> {
  try {
    const data = await fetchAPI('/api/paquetes/');
    return data
      .filter((p: any) => p.disponible)
      .map((p: any) => ({
        id: String(p.id),
        titulo: p.titulo,
        descripcion: p.descripcion,
        precio: Number(p.precio),
        imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        destino: p.destino_nombre,
        incluye: p.incluye,
        duracion: `${p.duracion_dias} días`,
        fechaPublicacion: p.created_at,
        destacada: p.destacado,
        status: 'publicada',
      }));
  } catch (e) {
    console.error('getOfertas error:', e);
    return [];
  }
}

export async function getOfertasDestacadas(): Promise<Oferta[]> {
  const ofertas = await getOfertas();
  return ofertas.filter((o) => o.destacada);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const data = await fetchAPI('/api/destinos/');
    return data
      .filter((d: any) => d.activo)
      .map((d: any) => ({
        id: String(d.id),
        titulo: d.pais,
        slug: d.codigo_pais,
        excerpt: d.descripcion?.slice(0, 150) || '',
        contenido: d.descripcion || '',
        imagen: d.imagen || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        autor: 'Viaja con Favi',
        tags: [],
        lectura: 5,
        fechaPublicacion: d.created_at,
        status: 'publicada',
      }));
  } catch (e) {
    console.error('getBlogPosts error:', e);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find(p => p.slug === slug || p.id === slug);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return getBlogPost(slug);
}

export async function getRecientesBlog(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.slice(0, limit);
}

export async function getOfertaBySlug(slug: string): Promise<Oferta | undefined> {
  const ofertas = await getOfertas();
  return ofertas.find(o => o.id === slug);
}

export type { Oferta, BlogPost } from './types';