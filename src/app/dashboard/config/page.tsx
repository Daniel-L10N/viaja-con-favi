import { Metadata } from 'next';
import {
  Bell,
  Camera,
  CreditCard,
  Globe,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Configuración | Viaja con Favi',
  description: 'Administra tu perfil, membresía, preferencias y seguridad.',
};

const membershipBenefits = [
  'Publicación destacada en la página principal',
  'Acceso prioritario a nuevas herramientas',
  'Estadísticas avanzadas de visitas y conversiones',
];

const activeSessions = [
  { device: 'MacBook Pro', location: 'Ciudad de México, MX', status: 'Sesión actual' },
  { device: 'iPhone 15', location: 'Cancún, MX', status: 'Activa hace 2 horas' },
];

export default function DashboardConfigPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600">
            Actualiza tu información personal, plan, preferencias y accesos.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
          <ShieldCheck className="h-4 w-4" />
          Cuenta verificada
        </div>
      </div>

      <section className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Perfil</h2>
              <p className="text-sm text-gray-500">
                La información visible para clientes y visitantes.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <Camera className="h-4 w-4" />
              Cambiar foto
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4 text-amber-600" />
                Nombre completo
              </span>
              <input
                type="text"
                defaultValue="Favi Travel Studio"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4 text-amber-600" />
                Correo electrónico
              </span>
              <input
                type="email"
                defaultValue="hola@viajaconfavi.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-gray-700">Biografía</span>
              <textarea
                rows={4}
                defaultValue="Especialista en experiencias personalizadas, escapadas románticas y viajes premium."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Teléfono</span>
              <input
                type="tel"
                defaultValue="+52 998 123 4567"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Globe className="h-4 w-4 text-amber-600" />
                Sitio web
              </span>
              <input
                type="url"
                defaultValue="https://viajaconfavi.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-700">
              Guardar perfil
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Membresía</h2>
            <p className="text-sm text-gray-500">Resumen de tu plan y beneficios activos.</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-amber-100">Plan actual</p>
                <h3 className="mt-2 text-2xl font-bold">Premium Plus</h3>
              </div>
              <CreditCard className="h-8 w-8 text-amber-100" />
            </div>
            <p className="mt-4 text-sm text-amber-50">Renovación automática el 18 de abril de 2026.</p>
          </div>

          <div className="mt-6 space-y-3">
            {membershipBenefits.map((benefit) => (
              <div key={benefit} className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-gray-700">
                {benefit}
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button className="rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
              Gestionar plan
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              Ver facturas
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Preferencias</h2>
            <p className="text-sm text-gray-500">
              Ajusta el idioma, notificaciones y comportamiento de tu panel.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 p-4">
              <div>
                <p className="font-medium text-gray-900">Notificaciones por email</p>
                <p className="text-sm text-gray-500">Recibe alertas de reservas, mensajes y vencimientos.</p>
              </div>
              <input type="checkbox" defaultChecked className="mt-1 h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
            </div>

            <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 p-4">
              <div>
                <p className="font-medium text-gray-900">Alertas push</p>
                <p className="text-sm text-gray-500">Notificaciones rápidas cuando una oferta recibe interacción.</p>
              </div>
              <input type="checkbox" defaultChecked className="mt-1 h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
            </div>

            <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 p-4">
              <div>
                <p className="font-medium text-gray-900">Resumen semanal</p>
                <p className="text-sm text-gray-500">Un reporte con rendimiento de publicaciones y blog.</p>
              </div>
              <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700">Idioma</span>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500">
                  <option>Español</option>
                  <option>English</option>
                  <option>Português</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Bell className="h-4 w-4 text-amber-600" />
                  Frecuencia de avisos
                </span>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500">
                  <option>En tiempo real</option>
                  <option>Una vez al día</option>
                  <option>Solo importantes</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Seguridad</h2>
            <p className="text-sm text-gray-500">Protege tu cuenta y revisa los accesos recientes.</p>
          </div>

          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Lock className="h-4 w-4 text-amber-600" />
                  Nueva contraseña
                </span>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700">Confirmar contraseña</span>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                />
              </label>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="font-medium text-emerald-900">Autenticación en dos pasos activa</p>
              <p className="mt-1 text-sm text-emerald-700">
                Tu cuenta tiene una capa extra de seguridad vía correo y dispositivo móvil.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Sesiones abiertas
              </h3>
              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <div
                    key={`${session.device}-${session.location}`}
                    className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-4"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{session.device}</p>
                      <p className="text-sm text-gray-500">{session.location}</p>
                    </div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {session.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-700">
                Actualizar seguridad
              </button>
              <button className="rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50">
                Cerrar otras sesiones
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
