import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ADMIN_PHONE = process.env.WHATSAPP_ADMIN_PHONE;

interface Lead {
  nombre: string;
  email: string;
  telefono: string;
  destinoInteres: string;
  mensaje: string;
}

async function sendWhatsApp(lead: Lead) {
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID || !ADMIN_PHONE) {
    console.log('WhatsApp no configurado, saltando notificacion');
    return { success: false, reason: 'not_configured' };
  }

  const message = `🔔 *Nuevo Lead - Viaja con Favi*

*Nombre:* ${lead.nombre}
*Telefono:* ${lead.telefono}
*Email:* ${lead.email}
*Destino:* ${lead.destinoInteres}
*Mensaje:* ${lead.mensaje || 'Sin mensaje'}

📱 Responder pronto!`;

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

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('WhatsApp error:', error);
    return { success: false, error };
  }
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

    const whatsappResult = await sendWhatsApp({
      nombre: body.nombre,
      email: body.email,
      telefono: body.telefono,
      destinoInteres: body.destinoInteres,
      mensaje: body.mensaje,
    });

    console.log('Lead guardado, WhatsApp:', whatsappResult.success ? 'enviado' : 'fallido');

    return NextResponse.json({ 
      success: true, 
      lead: nuevoLead,
      whatsapp: whatsappResult
    });
  } catch {
    return NextResponse.json({ error: 'Error al guardar lead' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    configured: !!WHATSAPP_TOKEN,
    message: WHATSAPP_TOKEN ? 'WhatsApp configurado' : 'WhatsApp no configurado'
  });
}
