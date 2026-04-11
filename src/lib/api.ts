import type { BlogPost, Oferta } from './types';

const DEFAULT_API_URL = 'https://cmxserver.curlew-vector.ts.net/viaja-con-favi';

type QueryValue = string | number | boolean | null | undefined;
type ApiFetchOptions = RequestInit & {
  query?: Record<string, QueryValue>;
};

type OfertaPayload = Partial<Oferta> & {
  cliente?: number | string;
  cliente_id?: number | string;
  created_at?: string;
  updated_at?: string;
  status?: 'publicada' | 'borrador' | 'archivada';
  imagen?: string | null;
};

type BlogPayload = Partial<BlogPost> & {
  cliente?: number | string;
  cliente_id?: number | string;
  created_at?: string;
  updated_at?: string;
  lectura_minutos?: number | string;
  status?: 'publicada' | 'borrador' | 'archivada';
  imagen?: string | null;
};

function getApiBaseUrl() {
  return (process.env.VIAJA_BACKEND_URL || DEFAULT_API_URL).replace(/\/$/, '');
}

function buildApiUrl(endpoint: string, query?: Record<string, QueryValue>) {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = new URL(`${getApiBaseUrl()}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  if (typeof value !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [];
  } catch {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function toAbsoluteMediaUrl(value?: string | null) {
  if (!value) return '';
  if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) return value;
  return value.startsWith('/')
    ? `${getApiBaseUrl()}${value}`
    : `${getApiBaseUrl()}/${value}`;
}

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

function defaultSlug(value: string, fallback: string) {
  const slug = value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return slug || fallback;
}

export function normalizeOferta(payload: OfertaPayload): Oferta {
  return {
    id: String(payload.id ?? ''),
    cliente_id: payload.cliente_id != null
      ? String(payload.cliente_id)
      : payload.cliente != null
      ? String(payload.cliente)
      : undefined,
    titulo: payload.titulo || '',
    descripcion: payload.descripcion || '',
    precio: Number(payload.precio ?? 0),
    imagen: toAbsoluteMediaUrl(payload.imagen),
    destino: payload.destino || '',
    incluye: parseJsonArray(payload.incluye),
    duracion: payload.duracion || '',
    fechaPublicacion: payload.fechaPublicacion || payload.created_at,
    destacada: Boolean(payload.destacada),
    status: payload.status,
    visitas: Number(payload.visitas ?? 0),
  };
}

export function normalizeBlogPost(payload: BlogPayload): BlogPost {
  const id = String(payload.id ?? '');
  return {
    id,
    cliente_id: payload.cliente_id != null
      ? String(payload.cliente_id)
      : payload.cliente != null
      ? String(payload.cliente)
      : undefined,
    titulo: payload.titulo || '',
    slug: payload.slug || defaultSlug(payload.titulo || '', id),
    excerpt: payload.excerpt || '',
    contenido: payload.contenido || '',
    imagen: toAbsoluteMediaUrl(payload.imagen),
    autor: payload.autor || 'Viaja con Favi',
    tags: parseJsonArray(payload.tags),
    lectura: Number(payload.lectura ?? payload.lectura_minutos ?? 0),
    fechaPublicacion: payload.fechaPublicacion || payload.created_at || '',
    status: payload.status,
  };
}

export const API_CONFIG = {
  baseUrl: getApiBaseUrl(),
  endpoints: {
    leads: '/api/leads/',
    destinos: '/api/destinos/',
    paquetes: '/api/paquetes/',
    planes: '/api/planes/',
    testimonios: '/api/testimonios/',
    garantias: '/api/garantias/',
    ofertasCliente: '/api/ofertas-cliente/',
    blogCliente: '/api/blog-cliente/',
  },
};

export async function apiFetch<T>(endpoint: string, options?: ApiFetchOptions): Promise<T> {
  const { query, headers, ...rest } = options || {};
  const response = await fetch(buildApiUrl(endpoint, query), {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    cache: rest.cache ?? 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function submitLead(data: {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  plan_interes?: string;
}) {
  return apiFetch(API_CONFIG.endpoints.leads, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getClienteOfertas(cliente_id: number | string): Promise<Oferta[]> {
  const payload = await apiFetch<unknown>(API_CONFIG.endpoints.ofertasCliente, {
    query: { cliente: cliente_id },
  });

  return extractList<OfertaPayload>(payload)
    .filter((oferta) => String(oferta.cliente_id ?? oferta.cliente ?? '') === String(cliente_id))
    .map(normalizeOferta);
}

export async function getClienteBlogs(cliente_id: number | string): Promise<BlogPost[]> {
  const payload = await apiFetch<unknown>(API_CONFIG.endpoints.blogCliente, {
    query: { cliente: cliente_id },
  });

  return extractList<BlogPayload>(payload)
    .filter((post) => String(post.cliente_id ?? post.cliente ?? '') === String(cliente_id))
    .map(normalizeBlogPost);
}

export async function saveOferta(data: Record<string, unknown>) {
  return apiFetch<unknown>(API_CONFIG.endpoints.ofertasCliente, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function saveBlog(data: Record<string, unknown>) {
  return apiFetch<unknown>(API_CONFIG.endpoints.blogCliente, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
