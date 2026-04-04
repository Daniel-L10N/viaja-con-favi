import type { BlogPost, Oferta } from './types';
import { apiFetch, API_CONFIG, normalizeBlogPost, normalizeOferta } from './api';

type OfertaPayload = Partial<Oferta> & {
  cliente?: number | string;
  cliente_id?: number | string;
  created_at?: string;
  status?: 'publicada' | 'borrador' | 'archivada';
};

type BlogPayload = Partial<BlogPost> & {
  cliente?: number | string;
  cliente_id?: number | string;
  created_at?: string;
  lectura_minutos?: number | string;
  status?: 'publicada' | 'borrador' | 'archivada';
};

function extractList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === 'object') {
    const results = (payload as { results?: unknown; data?: unknown }).results;
    if (Array.isArray(results)) return results as T[];

    const data = (payload as { results?: unknown; data?: unknown }).data;
    if (Array.isArray(data)) return data as T[];
  }
  return [];
}

function isPublicStatus(status?: string) {
  return !status || status === 'publicada';
}

export async function getOfertas(): Promise<Oferta[]> {
  const payload = await apiFetch<unknown>(API_CONFIG.endpoints.ofertasCliente);
  return extractList<OfertaPayload>(payload)
    .map(normalizeOferta)
    .filter((oferta) => isPublicStatus(oferta.status));
}

export async function getOfertaBySlug(slug: string): Promise<Oferta | undefined> {
  try {
    const payload = await apiFetch<OfertaPayload>(`${API_CONFIG.endpoints.ofertasCliente}${slug}/`);
    const oferta = normalizeOferta(payload);
    return isPublicStatus(oferta.status) ? oferta : undefined;
  } catch {
    const ofertas = await getOfertas();
    return ofertas.find((oferta) => oferta.id === slug);
  }
}

export async function getOfertasDestacadas(): Promise<Oferta[]> {
  const ofertas = await getOfertas();
  return ofertas.filter((oferta) => oferta.destacada);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const payload = await apiFetch<unknown>(API_CONFIG.endpoints.blogCliente);
  return extractList<BlogPayload>(payload)
    .map(normalizeBlogPost)
    .filter((post) => isPublicStatus(post.status));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const payload = await apiFetch<BlogPayload>(`${API_CONFIG.endpoints.blogCliente}${slug}/`);
    const post = normalizeBlogPost(payload);
    return isPublicStatus(post.status) ? post : undefined;
  } catch {
    const posts = await getBlogPosts();
    return posts.find((post) => post.slug === slug);
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return getBlogPost(slug);
}

export async function getRecientesBlog(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.slice(0, limit);
}

export type { Oferta, BlogPost } from './types';
