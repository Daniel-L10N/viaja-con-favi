"use client";

import { useState, useEffect } from 'react';
import { API_CONFIG, apiFetch } from '@/lib/api';

interface Destino {
  id: number;
  pais: string;
  bandeira_emoji: string;
  imagen: string;
  numero_resorts: number;
  continente: string;
  comida: string;
  transfers: string;
  extras: string[];
  precio_desde: string;
  activo: boolean;
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
  activo: boolean;
}

interface Testimonio {
  id: number;
  nombre: string;
  foto: string | null;
  texto: string;
  viaje: string;
  rating: number;
  aprobado: boolean;
}

interface Garantia {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  activo: boolean;
}

interface Lead {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  plan_interes: string;
  estado: string;
  created_at: string;
}

type TabType = 'destinos' | 'planes' | 'testimonios' | 'garantias' | 'leads';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabType>('destinos');
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [garantias, setGarantias] = useState<Garantia[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'destinos':
          setDestinos(await apiFetch<Destino[]>(API_CONFIG.endpoints.destinos));
          break;
        case 'planes':
          setPlanes(await apiFetch<Plan[]>(API_CONFIG.endpoints.planes));
          break;
        case 'testimonios':
          setTestimonios(await apiFetch<Testimonio[]>(API_CONFIG.endpoints.testimonios));
          break;
        case 'garantias':
          setGarantias(await apiFetch<Garantia[]>(API_CONFIG.endpoints.garantias));
          break;
        case 'leads':
          setLeads(await apiFetch<Lead[]>(API_CONFIG.endpoints.leads));
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (endpoint: string, id: number) => {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;
    try {
      await apiFetch(`${endpoint}${id}/`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleToggleActive = async (endpoint: string, id: number, currentState: boolean) => {
    try {
      await apiFetch(`${endpoint}${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ activo: !currentState }),
      });
      loadData();
    } catch (error) {
      console.error('Error toggling:', error);
    }
  };

  const renderDestinos = () => (
    <div className="grid gap-4">
      {destinos.map((d) => (
        <div key={d.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{d.bandeira_emoji}</span>
            <div>
              <h3 className="font-bold">{d.pais}</h3>
              <p className="text-sm text-gray-500">{d.precio_desde} - {d.numero_resorts} resorts</p>
            </div>
          </div>
          <button onClick={() => handleToggleActive(API_CONFIG.endpoints.destinos, d.id, d.activo)} className={`px-3 py-1 rounded ${d.activo ? 'bg-green-500' : 'bg-gray-300'}`}>
            {d.activo ? 'Activo' : 'Inactivo'}
          </button>
        </div>
      ))}
    </div>
  );

  const renderPlanes = () => (
    <div className="grid gap-4">
      {planes.map((p) => (
        <div key={p.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">{p.nombre.toUpperCase()}</h3>
            <p className="text-gray-500">{p.subtitulo}</p>
            <p className="text-gold font-bold">${p.precio} ({p.mensualidad}/mes)</p>
          </div>
          <button onClick={() => handleToggleActive(API_CONFIG.endpoints.planes, p.id, p.activo)} className={`px-3 py-1 rounded ${p.activo ? 'bg-green-500' : 'bg-gray-300'}`}>
            {p.activo ? 'Activo' : 'Inactivo'}
          </button>
        </div>
      ))}
    </div>
  );

  const renderTestimonios = () => (
    <div className="grid gap-4">
      {testimonios.map((t) => (
        <div key={t.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">{t.nombre}</h3>
              <p className="text-sm text-gray-500">{t.viaje}</p>
              <p className="mt-2">{t.texto.substring(0, 100)}...</p>
              <div className="text-gold">{'★'.repeat(t.rating)}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(API_CONFIG.endpoints.testimonios, t.id)} className="px-3 py-1 bg-red-500 text-white rounded">Eliminar</button>
              <button onClick={() => handleToggleActive(API_CONFIG.endpoints.testimonios, t.id, t.aprobado)} className={`px-3 py-1 rounded ${t.aprobado ? 'bg-green-500' : 'bg-gray-300'}`}>
                {t.aprobado ? 'Aprobado' : 'Pendiente'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGarantias = () => (
    <div className="grid gap-4">
      {garantias.map((g) => (
        <div key={g.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <h3 className="font-bold">{g.titulo}</h3>
            <p className="text-gray-500">{g.descripcion.substring(0, 60)}...</p>
          </div>
          <button onClick={() => handleToggleActive(API_CONFIG.endpoints.garantias, g.id, g.activo)} className={`px-3 py-1 rounded ${g.activo ? 'bg-green-500' : 'bg-gray-300'}`}>
            {g.activo ? 'Activo' : 'Inactivo'}
          </button>
        </div>
      ))}
    </div>
  );

  const renderLeads = () => (
    <div className="grid gap-4">
      {leads.map((l) => (
        <div key={l.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold">{l.nombre}</h3>
              <p className="text-sm text-gray-500">{l.email}</p>
              <p className="text-sm text-gray-500">{l.telefono}</p>
              <p className="mt-2 text-sm">{l.mensaje}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded text-sm ${l.estado === 'nuevo' ? 'bg-yellow-200' : l.estado === 'convertido' ? 'bg-green-200' : 'bg-gray-200'}`}>
                {l.estado}
              </span>
              <p className="text-xs text-gray-400 mt-2">{new Date(l.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'destinos', label: 'Destinos' },
    { id: 'planes', label: 'Planes' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'garantias', label: 'Garantías' },
    { id: 'leads', label: 'Leads' },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin - Viaja con Favi</h1>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === tab.id ? 'bg-gold text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Cargando...</div>
          ) : (
            <>
              {activeTab === 'destinos' && renderDestinos()}
              {activeTab === 'planes' && renderPlanes()}
              {activeTab === 'testimonios' && renderTestimonios()}
              {activeTab === 'garantias' && renderGarantias()}
              {activeTab === 'leads' && renderLeads()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}