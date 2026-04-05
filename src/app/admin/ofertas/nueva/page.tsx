'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { DestinoOption, OfertaForm, OfertaFormData } from '@/components/admin/oferta-form';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

async function fetchDestinos(): Promise<DestinoOption[]> {
  const response = await fetch(`${API_BASE_URL}/api/destinos/`, { cache: 'no-store' });
  if (!response.ok) throw new Error('No se pudieron cargar los destinos');
  const data = await response.json();
  return Array.isArray(data)
    ? data.map((item: { id: number; pais: string }) => ({
        id: item.id,
        pais: item.pais,
      }))
    : [];
}

export default function NuevaOfertaAdminPage() {
  const router = useRouter();
  const [destinos, setDestinos] = useState<DestinoOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        setDestinos(await fetchDestinos());
      } catch (loadError) {
        console.error(loadError);
        setError('No fue posible cargar los destinos.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleSubmit = async (data: OfertaFormData) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/paquetes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: data.titulo.trim(),
          descripcion: data.descripcion.trim(),
          precio: Number(data.precio),
          duracion_dias: Number(data.duracion_dias),
          incluye: data.incluye,
          destacado: data.destacado,
          disponible: data.disponible,
          destino: Number(data.destino),
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo crear la oferta');
      }

      router.push('/admin/ofertas');
    } catch (submitError) {
      console.error(submitError);
      setError('No se pudo guardar la oferta. Revisa los datos e intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/ofertas"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a ofertas
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nueva oferta</h1>
        <p className="text-gray-600">Crea un paquete nuevo con el mismo flujo visual del admin.</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow p-10 flex items-center justify-center gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
          <span>Cargando formulario...</span>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
              {error}
            </div>
          )}

          <OfertaForm
            destinos={destinos}
            saving={saving}
            submitLabel="Crear oferta"
            cancelHref="/admin/ofertas"
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}
