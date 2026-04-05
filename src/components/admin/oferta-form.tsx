'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Clock, DollarSign, MapPin, Plus, X } from 'lucide-react';

export interface DestinoOption {
  id: number;
  pais: string;
}

export interface OfertaFormData {
  titulo: string;
  descripcion: string;
  precio: string;
  duracion_dias: string;
  incluye: string[];
  destacado: boolean;
  disponible: boolean;
  destino: string;
}

interface OfertaFormProps {
  destinos: DestinoOption[];
  initialData?: OfertaFormData;
  saving?: boolean;
  submitLabel: string;
  onSubmit: (data: OfertaFormData) => Promise<void> | void;
  cancelHref?: string;
  onCancel?: () => void;
}

const defaultData: OfertaFormData = {
  titulo: '',
  descripcion: '',
  precio: '',
  duracion_dias: '',
  incluye: [],
  destacado: false,
  disponible: true,
  destino: '',
};

function normalizeTag(value: string) {
  return value.trim();
}

export function OfertaForm({
  destinos,
  initialData,
  saving = false,
  submitLabel,
  onSubmit,
  cancelHref,
  onCancel,
}: OfertaFormProps) {
  const [formData, setFormData] = useState<OfertaFormData>(initialData ?? defaultData);
  const [newTag, setNewTag] = useState('');

  const canSubmit = useMemo(() => {
    return Boolean(
      formData.titulo.trim() &&
        formData.descripcion.trim() &&
        formData.precio &&
        formData.duracion_dias &&
        formData.destino
    );
  }, [formData]);

  const addTag = () => {
    const nextTag = normalizeTag(newTag);
    if (!nextTag || formData.incluye.includes(nextTag)) return;

    setFormData((current) => ({
      ...current,
      incluye: [...current.incluye, nextTag],
    }));
    setNewTag('');
  };

  const removeTag = (tag: string) => {
    setFormData((current) => ({
      ...current,
      incluye: current.incluye.filter((item) => item !== tag),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    await onSubmit(formData);
  };

  const cancelButton = cancelHref ? (
    <Link
      href={cancelHref}
      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-center"
    >
      Cancelar
    </Link>
  ) : (
    <button
      type="button"
      onClick={onCancel}
      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
    >
      Cancelar
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Informacion basica</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titulo</label>
              <input
                type="text"
                required
                value={formData.titulo}
                onChange={(event) => setFormData({ ...formData, titulo: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Ej. Estancia Romantica en Paris"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripcion</label>
              <textarea
                required
                rows={5}
                value={formData.descripcion}
                onChange={(event) => setFormData({ ...formData, descripcion: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Describe la oferta y lo mas importante del paquete."
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Detalles del paquete</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.precio}
                  onChange={(event) => setFormData({ ...formData, precio: event.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="1299.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duracion en dias</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  required
                  min="1"
                  step="1"
                  value={formData.duracion_dias}
                  onChange={(event) => setFormData({ ...formData, duracion_dias: event.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="7"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                  required
                  value={formData.destino}
                  onChange={(event) => setFormData({ ...formData, destino: event.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">Selecciona un destino</option>
                  {destinos.map((destino) => (
                    <option key={destino.id} value={String(destino.id)}>
                      {destino.pais}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Incluye</label>
            <div className="flex flex-wrap gap-2 mb-3 min-h-7">
              {formData.incluye.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeTag(item)}
                    className="hover:text-amber-600"
                    aria-label={`Eliminar ${item}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(event) => setNewTag(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Ej. Hotel 4 estrellas, Vuelos, Desayuno"
              />
              <button
                type="button"
                onClick={addTag}
                className="inline-flex items-center gap-2 px-4 py-3 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Visibilidad</h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.destacado}
                onChange={(event) => setFormData({ ...formData, destacado: event.target.checked })}
                className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
              />
              <span className="text-gray-700">Mostrar como oferta destacada</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.disponible}
                onChange={(event) => setFormData({ ...formData, disponible: event.target.checked })}
                className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
              />
              <span className="text-gray-700">Disponible para publicar</span>
            </label>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm text-gray-500 mb-6">
            Los cambios se envian directamente al endpoint `/api/paquetes/`.
          </p>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving || !canSubmit}
              className="flex-1 bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Guardando...' : submitLabel}
            </button>
            {cancelButton}
          </div>
        </section>
      </div>
    </form>
  );
}
