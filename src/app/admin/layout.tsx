'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, MapPin, FileText, Users, Settings, LogOut } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard' },
  { id: 'ofertas', label: 'Ofertas', href: '/admin/ofertas' },
  { id: 'blog', label: 'Blog', href: '/admin/blog' },
  { id: 'destinos', label: 'Destinos (API)', href: '/admin/destinos' },
  { id: 'config', label: 'Configuracion', href: '/admin/config' },
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="p-6">
          <h1 className="text-xl font-bold text-amber-500">Viaja con Favi</h1>
          <p className="text-xs text-gray-400">Panel de Admin</p>
        </div>
        
        <nav className="px-3">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
            >
              {tab.id === 'dashboard' && <Home className="w-5 h-5" />}
              {tab.id === 'ofertas' && <MapPin className="w-5 h-5" />}
              {tab.id === 'blog' && <FileText className="w-5 h-5" />}
              {tab.id === 'destinos' && <Users className="w-5 h-5" />}
              {tab.id === 'config' && <Settings className="w-5 h-5" />}
              <span>{tab.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
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
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
