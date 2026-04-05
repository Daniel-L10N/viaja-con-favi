import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.11:8000';

describe('API CRUD Tests - Ofertas (Paquetes)', () => {
  let testOfertaId: number;

  it('1. CREATE oferta - should create a new oferta', async () => {
    const response = await fetch(`${API_BASE}/api/paquetes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: 'Test Oferta Create',
        descripcion: 'Descripción de prueba',
        precio: '999',
        duracion_dias: 7,
        incluye: ['Hotel 5*', 'Vuelos'],
        destacado: true,
        disponible: true,
        destino_nombre: 'Test Destino',
        destino: 3
      }),
    });
    
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.id).toBeDefined();
    testOfertaId = data.id;
  });

  it('2. READ ofertas - should return all ofertas', async () => {
    const response = await fetch(`${API_BASE}/api/paquetes/`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('3. UPDATE oferta - should update existing oferta', async () => {
    const response = await fetch(`${API_BASE}/api/paquetes/${testOfertaId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: 'Oferta Actualizada',
        descripcion: 'Descripción actualizada',
        precio: '1299',
        duracion_dias: 10,
        incluye: ['Hotel 5*', 'Vuelos', 'Todo incluido'],
        destacado: true,
        disponible: true,
        destino_nombre: 'Paris',
        destino: 3
      }),
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.titulo).toBe('Oferta Actualizada');
  });
});

describe('API CRUD Tests - Destinos', () => {
  let testDestinoId: number;

  it('4. CREATE destino - should create a new destino', async () => {
    const response = await fetch(`${API_BASE}/api/destinos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pais: 'Test País Create',
        codigo_pais: 'TST',
        bandera_emoji: '🗽',
        imagen: 'https://example.com/test.jpg',
        descripcion: 'Descripción de prueba',
        activo: true,
        numero_resorts: 10,
        continente: 'america_norte',
        comida: 'Internacional',
        transfers: 'Privado',
        precio_desde: '999'
      }),
    });
    
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.id).toBeDefined();
    testDestinoId = data.id;
  });

  it('5. READ destinos - should return all destinos', async () => {
    const response = await fetch(`${API_BASE}/api/destinos/`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('6. UPDATE destino - should update existing destino', async () => {
    const response = await fetch(`${API_BASE}/api/destinos/${testDestinoId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pais: 'País Actualizado',
        codigo_pais: 'UPD',
        bandera_emoji: '🌟',
        imagen: 'https://example.com/updated.jpg',
        descripcion: 'Descripción actualizada',
        activo: true,
        numero_resorts: 25,
        continente: 'europa',
        comida: 'Todo incluido',
        transfers: 'Aeropuerto-Hotel',
        precio_desde: '1299'
      }),
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.pais).toBe('País Actualizado');
  });
});
