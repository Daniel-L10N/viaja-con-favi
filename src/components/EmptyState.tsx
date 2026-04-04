import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  titulo: string;
  mensaje: string;
  icono: LucideIcon;
  accion?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ titulo, mensaje, icono: Icono, accion }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icono className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{titulo}</h3>
      <p className="text-gray-500 mb-6">{mensaje}</p>
      {accion && (
        <button
          onClick={accion.onClick}
          className="bg-amber-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-amber-600 transition-colors"
        >
          {accion.label}
        </button>
      )}
    </div>
  );
}
