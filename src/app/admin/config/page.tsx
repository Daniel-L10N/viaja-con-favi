'use client';

import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

interface Config {
  siteName: string;
  siteDescription: string;
  whatsapp: string;
  email: string;
  facebook: string;
  instagram: string;
}

export default function ConfigAdmin() {
  const [config, setConfig] = useState<Config>({
    siteName: 'Viaja con Favi',
    siteDescription: 'Viajes de lujo a precios de mayorista',
    whatsapp: '+525616376826',
    email: 'info@viajacconfavi.com',
    facebook: '',
    instagram: '',
  });
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const handleGuardar = async () => {
    setGuardando(true);
    await new Promise(r => setTimeout(r, 1000));
    setGuardando(false);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuracion</h1>
      <p className="text-gray-600 mb-8">Configura los datos de tu sitio</p>

      <div className="bg-white rounded-2xl p-6 shadow max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del sitio</label>
            <input
              type="text"
              value={config.siteName}
              onChange={(e) => setConfig({...config, siteName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
            <textarea
              value={config.siteDescription}
              onChange={(e) => setConfig({...config, siteDescription: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input
                type="tel"
                value={config.whatsapp}
                onChange={(e) => setConfig({...config, whatsapp: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="+52 55 1234 5678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => setConfig({...config, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input
                type="url"
                value={config.facebook}
                onChange={(e) => setConfig({...config, facebook: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input
                type="url"
                value={config.instagram}
                onChange={(e) => setConfig({...config, instagram: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>

          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {guardando ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : guardado ? (
              'Guardado!'
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar Configuracion
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
