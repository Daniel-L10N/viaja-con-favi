import { NextResponse } from 'next/server';
import { getBlogPosts, createBlogPost } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error al obtener articulos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = body.slug || body.titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const nuevoPost = await createBlogPost({
      titulo: body.titulo,
      slug,
      excerpt: body.excerpt,
      contenido: body.contenido,
      imagen: body.imagen,
      autor: body.autor || 'Viaja con Favi',
      tags: JSON.stringify(body.tags || []),
      lectura: body.lectura || 5,
      fechaPublicacion: body.fechaPublicacion || new Date().toISOString().split('T')[0],
    });
    return NextResponse.json({ success: true, post: nuevoPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error al crear articulo' }, { status: 500 });
  }
}
