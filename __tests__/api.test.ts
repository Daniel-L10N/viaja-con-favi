import { render, screen, waitFor, act } from '@testing-library/react';
import { getOfertas, getOfertasDestacadas, getBlogPosts } from '../lib/data';

const mockFetch = (data: any) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
  });
};

describe('API - Ofertas', () => {
  beforeEach(() => {
    mockFetch([
      { id: 1, titulo: 'París Romántico', precio: 1299, destino: 'París', incluye: ['Hotel'], destacada: true, status: 'activa' }
    ]);
  });

  test('getOfertas debe retorna ofertas del API', async () => {
    const ofertas = await getOfertas();
    expect(ofertas).toHaveLength(1);
    expect(ofertas[0].titulo).toBe('París Romántico');
    expect(ofertas[0].precio).toBe(1299);
  });

  test('getOfertas debe filtrar ofertas destacada', async () => {
    const ofertas = await getOfertasDestacadas();
    expect(ofertas[0].destacada).toBe(true);
  });

  test('getOfertas debe manejar error de red', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    const ofertas = await getOfertas();
    expect(ofertas).toEqual([]);
  });
});

describe('API - Blog', () => {
  beforeEach(() => {
    mockFetch([
      { id: 1, titulo: 'Mi viaje a París', slug: 'mi-viaje-paris', excerpt: 'Fue increíble', imagen: 'img.jpg', autor: 'Favi', tags: [], lectura: 5, fechaPublicacion: '2026-04-01', status: 'publicada' }
    ]);
  });

  test('getBlogPosts debe retornar posts del API', async () => {
    const posts = await getBlogPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].titulo).toBe('Mi viaje a París');
  });

  test('getBlogPosts debe mapear correctamente los campos', async () => {
    const posts = await getBlogPosts();
    expect(posts[0].slug).toBe('mi-viaje-paris');
    expect(posts[0].autor).toBe('Favi');
  });

  test('getBlogPosts debe manejar API no disponible', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
    const posts = await getBlogPosts();
    expect(posts).toEqual([]);
  });
});