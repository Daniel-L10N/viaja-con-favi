export interface Oferta {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  destino: string;
  incluye: string | string[];
  duracion: string;
  fechaPublicacion?: string;
  destacada: boolean;
}

export interface BlogPost {
  id: string;
  titulo: string;
  slug: string;
  excerpt: string;
  contenido: string;
  imagen: string;
  autor: string;
  tags: string | string[];
  lectura: number;
  fechaPublicacion: string;
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
