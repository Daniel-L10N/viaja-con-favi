'use client';
 
import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Algo salió mal
        </h2>
        <p className="text-gray-600 mb-6">
          Lo sentimos, hubo un error al cargar esta página. Por favor intenta de nuevo.
        </p>
        
        {error?.message && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
            <p className="text-sm text-red-700">{error.message}</p>
          </div>
        )}
        
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
