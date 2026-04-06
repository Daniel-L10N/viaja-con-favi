export interface Oferta {
  id: string;
  cliente_id?: string;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  destino: string;
  incluye: string | string[];
  duracion: string;
  fechaPublicacion?: string;
  destacada: boolean;
  status?: 'publicada' | 'borrador' | 'archivada';
  visitas?: number;
}

export interface Destino {
  id: string;
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
}

export interface BlogPost {
  id: string;
  cliente_id?: string;
  titulo: string;
  slug: string;
  excerpt: string;
  contenido: string;
  imagen: string;
  autor: string;
  tags: string | string[];
  lectura: number;
  fechaPublicacion: string;
  status?: 'publicada' | 'borrador' | 'archivada';
}

export interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  destinoInteres: string;
  mensaje: string;
  fecha: string;
  status: 'nuevo' | 'contactado' | 'convertido';
}
