import { NextResponse } from 'next/server';
import { getOfertas, createOferta } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ofertas = await getOfertas();
    return NextResponse.json(ofertas);
  } catch (error) {
    console.error('Error fetching ofertas:', error);
    return NextResponse.json({ error: 'Error al obtener ofertas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nuevaOferta = await createOferta({
      titulo: body.titulo,
      descripcion: body.descripcion,
      precio: body.precio,
      imagen: body.imagen,
      destino: body.destino,
      incluye: JSON.stringify(body.incluye || []),
      duracion: body.duracion,
      destacada: body.destacada || false,
    });
    return NextResponse.json({ success: true, oferta: nuevaOferta });
  } catch (error) {
    console.error('Error creating oferta:', error);
    return NextResponse.json({ error: 'Error al crear oferta' }, { status: 500 });
  }
}
