import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/db';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ADMIN_PHONE = process.env.WHATSAPP_ADMIN_PHONE;

export const dynamic = 'force-dynamic';

interface LeadData {
  nombre: string;
  email: string;
  telefono: string;
  destinoInteres: string;
  mensaje: string;
}

async function sendWhatsApp(lead: LeadData) {
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID || !ADMIN_PHONE) {
    console.log('WhatsApp no configurado');
    return { success: false, reason: 'not_configured' };
  }

  const message = `🔔 *Nuevo Lead - Viaja con Favi*

*Nombre:* ${lead.nombre}
*Telefono:* ${lead.telefono}
*Email:* ${lead.email}
*Destino:* ${lead.destinoInteres}
*Mensaje:* ${lead.mensaje || 'Sin mensaje'}`;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: ADMIN_PHONE,
          type: 'text',
          text: { body: message },
        }),
      }
    );

    return { success: response.ok, data: await response.json() };
  } catch (error) {
    console.error('WhatsApp error:', error);
    return { success: false, error };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const nuevoLead = await createLead({
      nombre: body.nombre,
      email: body.email,
      telefono: body.telefono,
      destinoInteres: body.destinoInteres,
      mensaje: body.mensaje || '',
      status: 'nuevo',
    });

    const whatsappResult = await sendWhatsApp({
      nombre: body.nombre,
      email: body.email,
      telefono: body.telefono,
      destinoInteres: body.destinoInteres,
      mensaje: body.mensaje,
    });

    return NextResponse.json({ 
      success: true, 
      lead: nuevoLead,
      whatsapp: whatsappResult.success
    });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json({ error: 'Error al guardar lead' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    configured: !!WHATSAPP_TOKEN,
    message: WHATSAPP_TOKEN ? 'WhatsApp configurado' : 'WhatsApp no configurado'
  });
}
