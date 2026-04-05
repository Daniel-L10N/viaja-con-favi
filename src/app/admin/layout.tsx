'use client';

import Link from 'next/link';
import { Home, MapPin, Globe, Settings, LogOut } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard' },
  { id: 'ofertas', label: 'Ofertas', href: '/admin/ofertas' },
  { id: 'destinos', label: 'Destinos', href: '/admin/destinos' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-amber-500">Viaja con Favi</h1>
          <p className="text-xs text-gray-400">Administración</p>
        </div>
        
        <nav className="flex-1 p-3">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition mb-1"
            >
              {tab.id === 'dashboard' && <Home className="w-5 h-5" />}
              {tab.id === 'ofertas' && <MapPin className="w-5 h-5" />}
              {tab.id === 'destinos' && <Globe className="w-5 h-5" />}
              <span>{tab.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-3 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Volver al sitio</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
