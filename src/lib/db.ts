import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Oferta {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  destino: string;
  incluye: string | string[];
  duracion: string;
  destacada: boolean;
  createdAt: Date;
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
  createdAt: Date;
}

function parseIncluye(incluye: string | string[]): string[] {
  if (Array.isArray(incluye)) return incluye;
  try {
    return JSON.parse(incluye || '[]');
  } catch {
    return [];
  }
}

function parseTags(tags: string | string[]): string[] {
  if (Array.isArray(tags)) return tags;
  try {
    return JSON.parse(tags || '[]');
  } catch {
    return [];
  }
}

export async function getOfertas(): Promise<Oferta[]> {
  const ofertas = await prisma.oferta.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return ofertas.map(o => ({
    ...o,
    incluye: parseIncluye(o.incluye),
  }));
}

export async function getOfertaBySlug(id: string): Promise<Oferta | undefined> {
  const oferta = await prisma.oferta.findUnique({
    where: { id },
  });
  if (!oferta) return undefined;
  return {
    ...oferta,
    incluye: parseIncluye(oferta.incluye),
  };
}

export async function getOfertasDestacadas(): Promise<Oferta[]> {
  const ofertas = await prisma.oferta.findMany({
    where: { destacada: true },
    orderBy: { createdAt: 'desc' },
  });
  return ofertas.map(o => ({
    ...o,
    incluye: parseIncluye(o.incluye),
  }));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return posts.map(p => ({
    ...p,
    tags: parseTags(p.tags),
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });
  if (!post) return undefined;
  return {
    ...post,
    tags: parseTags(post.tags),
  };
}

export async function getRecientesBlog(limit: number = 3): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  return posts.map(p => ({
    ...p,
    tags: parseTags(p.tags),
  }));
}

export async function createOferta(data: any) {
  return prisma.oferta.create({
    data: {
      titulo: data.titulo,
      descripcion: data.descripcion,
      precio: data.precio,
      imagen: data.imagen,
      destino: data.destino,
      incluye: Array.isArray(data.incluye) ? JSON.stringify(data.incluye) : data.incluye,
      duracion: data.duracion,
      destacada: data.destacada || false,
    },
  });
}

export async function createBlogPost(data: any) {
  return prisma.blogPost.create({
    data: {
      titulo: data.titulo,
      slug: data.slug,
      excerpt: data.excerpt,
      contenido: data.contenido,
      imagen: data.imagen,
      autor: data.autor,
      tags: Array.isArray(data.tags) ? JSON.stringify(data.tags) : data.tags,
      lectura: data.lectura,
      fechaPublicacion: data.fechaPublicacion,
    },
  });
}

export async function createLead(data: any) {
  return prisma.lead.create({
    data,
  });
}

export async function getLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });
}
