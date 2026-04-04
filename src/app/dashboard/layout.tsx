import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Package, MapPin, FileText, Settings, User, Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mi Dashboard | Viaja con Favi',
  description: 'Gestiona tus publicaciones, destinos y blog personal. Crea y administra tus ofertas de viajes.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { icon: Home, label: 'Inicio', href: '/dashboard' },
    { icon: Plus, label: 'Nueva Oferta', href: '/dashboard/ofertas/nueva' },
    { icon: Package, label: 'Mis Ofertas', href: '/dashboard/ofertas' },
    { icon: MapPin, label: 'Destinos', href: '/dashboard/destinos' },
    { icon: FileText, label: 'Mi Blog', href: '/dashboard/blog' },
    { icon: Settings, label: 'Configuración', href: '/dashboard/config' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-amber-600">
              Viaja con Favi
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Mi Panel</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}