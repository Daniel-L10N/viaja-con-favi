import type { BlogPost, Oferta, Destino } from './types';

const API_BASE = 'http://127.0.0.1:8000';

async function fetchAPI(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, { 
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

// Función auxiliar para formatear URL de imagen
function formatImagenUrl(imagen: string | null): string {
  if (!imagen) return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
  
  // Si es una URL externa (ya starts con http y no es del servidor local)
  if (imagen.startsWith('http') && !imagen.includes('localhost:8000/media/')) {
    return imagen;
  }
  
  // Si es una ruta de archivo local (/media/destinos/...)
  if (imagen.startsWith('/media/') || imagen.startsWith('media/')) {
    return `http://127.0.0.1:8000${imagen}`;
  }
  
  // Si la URL está encodeada (problema de migración) -limpiar
  if (imagen.includes('%3A') || imagen.includes('images.unsplash.com')) {
    // Decodificar y limpiar URL corrupta de migración
    try {
      const decoded = decodeURIComponent(imagen);
      if (decoded.startsWith('http')) return decoded;
    } catch (e) {}
  }
  
  // Default
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
}

export async function getDestinos(): Promise<Destino[]> {
  try {
    const data = await fetchAPI('/api/destinos/');
    return data
      .filter((d: any) => d.activo)
      .map((d: any) => ({
        id: String(d.id),
        pais: d.pais,
        codigo_pais: d.codigo_pais,
        bandera_emoji: d.bandera_emoji,
        imagen: formatImagenUrl(d.imagen),
        numero_resorts: d.numero_resorts,
        continente: d.continente,
        comida: d.comida,
        transfers: d.transfers,
        precio_desde: d.precio_desde,
        descripcion: d.descripcion || '',
      }));
  } catch (e) {
    console.error('getDestinos error:', e);
    return [];
  }
}

export async function getOfertas(): Promise<Oferta[]> {
  try {
    // Usar destinos como fuente de imágenes
    const destinos = await getDestinos();
    
    // Mapear destinos a ofertas (para compatibilidad con la UI existente)
    return destinos.map((d) => ({
      id: d.id,
      titulo: `Viaje a ${d.pais}`,
      descripcion: d.descripcion || `Explora ${d.pais} con nuestros paquetes exclusivos`,
      precio: Number(d.precio_desde) || 0,
      imagen: d.imagen,
      destino: d.pais,
      incluye: [],
      duracion: `${d.numero_resorts || 7} días`,
      fechaPublicacion: new Date().toISOString(),
      destacada: false,
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
    const data = await fetchAPI('/api/blog/');
    return data
      .filter((d: any) => d.status === 'publicada')
      .map((d: any) => ({
        id: String(d.id),
        titulo: d.titulo,
        slug: d.slug,
        excerpt: d.excerpt?.slice(0, 150) || '',
        contenido: d.contenido || '',
        imagen: d.imagen ? `http://127.0.0.1:8000${d.imagen}` : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        autor: d.autor || 'Viaja con Favi',
        tags: d.tags || [],
        lectura: d.lectura_minutos || 5,
        fechaPublicacion: d.created_at,
        status: d.status,
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