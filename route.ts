import { NextRequest, NextResponse } from 'next/server';

const leads: { id: string; nombre: string; email: string; telefono: string; destinoInteres: string; mensaje: string; fecha: string; status: string }[] = [];

export async function GET() {
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const nuevoLead = {
      id: String(Date.now()),
      ...body,
      fecha: new Date().toISOString(),
      status: 'nuevo',
    };
    leads.push(nuevoLead);
    
    console.log('Nuevo lead:', nuevoLead);
    
    return NextResponse.json({ success: true, lead: nuevoLead });
  } catch {
    return NextResponse.json({ error: 'Error al guardar lead' }, { status: 500 });
  }
}
