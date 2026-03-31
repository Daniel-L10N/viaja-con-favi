import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://cmxserver.curlew-vector.ts.net/viajaconfavi';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_URL}/api/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Set-Cookie': `admin_token=${data.token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Error de conexión' },
      { status: 500 }
    );
  }
}
