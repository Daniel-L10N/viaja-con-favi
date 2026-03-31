import { useState, useEffect } from 'react';
import { API_CONFIG, apiFetch } from './api';

interface Destino {
  id: number;
  pais: string;
  bandera_emoji: string;
  imagen: string;
  numero_resorts: number;
  continente: string;
  comida: string;
  transfers: string;
  extras: string[];
  precio_desde: string;
}

interface Plan {
  id: number;
  nombre: string;
  subtitulo: string;
  precio: string;
  mensualidad: string;
  puntos_inicio: number;
  puntos_mensuales: number;
  descripcion: string;
  caracteristicas: string[];
}

interface Testimonio {
  id: number;
  nombre: string;
  foto: string | null;
  texto: string;
  viaje: string;
  rating: number;
}

interface Garantia {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
}

// Hook para cargar destinos
export function useDestinos() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Destino[]>(API_CONFIG.endpoints.destinos)
      .then(data => {
        setDestinos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { destinos, loading, error };
}

// Hook para cargar planes
export function usePlanes() {
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Plan[]>(API_CONFIG.endpoints.planes)
      .then(data => {
        setPlanes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { planes, loading, error };
}

// Hook para cargar testimonios
export function useTestimonios() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Testimonio[]>(API_CONFIG.endpoints.testimonios)
      .then(data => {
        setTestimonios(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { testimonios, loading, error };
}

// Hook para cargar garantías
export function useGarantias() {
  const [garantias, setGarantias] = useState<Garantia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Garantia[]>(API_CONFIG.endpoints.garantias)
      .then(data => {
        setGarantias(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { garantias, loading, error };
}