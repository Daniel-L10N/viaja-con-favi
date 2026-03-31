// API Configuration
// Backend: Viaja con Favi Django API

const isProduction = process.env.NODE_ENV === 'production';

export const API_CONFIG = {
  // Producción: via Apache proxy at /viajaconfavi/
  baseUrl: isProduction 
    ? 'https://cmxserver.curlew-vector.ts.net/viajaconfavi'
    : 'http://100.81.171.84:8001',
  endpoints: {
    leads: '/api/leads/',
    destinos: '/api/destinos/',
    paquetes: '/api/paquetes/',
    planes: '/api/planes/',
    testimonios: '/api/testimonios/',
    garantias: '/api/garantias/',
  }
};

// Helper para hacer fetch
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

// Submit lead desde formulario
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