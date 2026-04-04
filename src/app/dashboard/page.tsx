import { Metadata } from 'next';
import Link from 'next/link';
import { Package, MapPin, FileText, TrendingUp, Plus, Eye, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mi Dashboard | Viaja con Favi',
  description: 'Resumen de tu actividad y estadísticas.',
};

const stats = [
  { label: 'Ofertas Publicadas', value: '5', icon: Package, color: 'bg-blue-500' },
  { label: 'Visitas Totales', value: '1,234', icon: Eye, color: 'bg-green-500' },
  { label: 'Publicaciones Blog', value: '3', icon: FileText, color: 'bg-purple-500' },
  { label: 'Este Mes', value: '12', icon: TrendingUp, color: 'bg-amber-500' },
];

const recentActivity = [
  { type: 'oferta', title: 'Paris - Estancia Romántica', date: 'Hace 2 días', status: 'publicada' },
  { type: 'blog', title: '10 razones para visitar Bali', date: 'Hace 1 semana', status: 'publicada' },
  { type: 'oferta', title: 'Dubai - Fin de Año', date: 'Hace 2 semanas', status: 'borrador' },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido a tu Dashboard</h1>
        <p className="text-gray-600">Gestiona tus publicaciones y observa tu progreso</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/dashboard/ofertas/nueva"
              className="flex flex-col items-center justify-center p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <Plus className="w-8 h-8 text-amber-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Nueva Oferta</span>
            </Link>
            <Link
              href="/dashboard/blog/nuevo"
              className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Nuevo Blog</span>
            </Link>
            <Link
              href="/dashboard/destinos"
              className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <MapPin className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Mis Destinos</span>
            </Link>
            <Link
              href="/"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Eye className="w-8 h-8 text-gray-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Ver Mi Web</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Actividad Reciente</h2>
          <div className="space-y-4">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'publicada' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}