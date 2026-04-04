'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, MapPin, DollarSign, Clock, CheckCircle, X } from 'lucide-react';
import { saveOferta } from '@/lib/api';

const DEFAULT_CLIENTE_ID = '1';

export default function NuevaOfertaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    destino: '',
    descripcion: '',
    precio: '',
    duracion: '',
    incluye: [] as string[],
    imagen: '',
    destacada: false,
  });
  const [newIncluye, setNewIncluye] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await saveOferta({
        ...formData,
        cliente: Number(DEFAULT_CLIENTE_ID),
        precio: Number(formData.precio),
        status: 'publicada',
      });
      router.push('/dashboard/ofertas');
    } catch (error) {
      console.error('Error saving oferta:', error);
    } finally {
      setSaving(false);
    }
  };

  const addIncluye = () => {
    if (newIncluye.trim()) {
      setFormData({ ...formData, incluye: [...formData.incluye, newIncluye.trim()] });
      setNewIncluye('');
    }
  };

  const removeIncluye = (index: number) => {
    setFormData({ ...formData, incluye: formData.incluye.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/dashboard/ofertas"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a ofertas
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Nueva Oferta</h1>
        <p className="text-gray-600">Crea una nueva publicación de destino</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Información básica</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la oferta *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej: Paris - Estancia Romántica 5 días"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destino *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.destino}
                    onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                    placeholder="Ciudad, País"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Describe los detalles de la oferta..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Detalles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (USD) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    required
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.duracion}
                    onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                    placeholder="Ej: 5 días / 4 noches"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Qué incluye?
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.incluye.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeIncluye(index)}
                      className="hover:text-amber-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newIncluye}
                  onChange={(e) => setNewIncluye(e.target.value)}
                  placeholder="Agregar: Hotel, Vuelo, Auto..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncluye())}
                />
                <button
                  type="button"
                  onClick={addIncluye}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Imagen</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600">
                Arrastra una imagen o <span className="text-amber-600">busca</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 5MB</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Opciones</h2>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.destacada}
                onChange={(e) => setFormData({ ...formData, destacada: e.target.checked })}
                className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
              />
              <span className="text-gray-700">Marcar como destacada</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              {saving ? 'Guardando...' : 'Publicar Oferta'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/ofertas')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
