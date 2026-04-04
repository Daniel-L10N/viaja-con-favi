# PROPUESTA C: Error Boundaries + Loading States

## Problema
- No hay manejo global de errores
- Experiencia de usuario pobre durante cargas
- No hay estados vacios

## Solucion
- Error boundaries con Next.js
- Skeleton loaders
- Estados vacios
- Toast notifications

## Implementacion

### 1. Error Boundary Global (app/error.tsx)
```typescript
'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Algo salio mal
        </h2>
        <p className="text-gray-600 mb-6">
          Lo sentimos, hubo un error al cargar esta pagina.
        </p>
        <button
          onClick={() => reset()}
          className="bg-amber-500 text-white px-6 py-2 rounded-xl"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
```

### 2. Loading States (app/loading.tsx)
```typescript
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200" />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 3. Skeleton Components
```typescript
// components/Skeleton.tsx
export function OfertaCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
      <div className="h-56 bg-gray-200" />
      <div className="p-6">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
        <div className="h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  )
}
```

### 4. Estado Vacio
```typescript
// components/EmptyState.tsx
export function EmptyState({ 
  titulo, 
  mensaje, 
  icono 
}: {
  titulo: string
  mensaje: string
  icono: ReactNode
}) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {icono}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{titulo}</h3>
      <p className="text-gray-500">{mensaje}</p>
    </div>
  )
}
```

### 5. Notificaciones Toast
```typescript
// components/Toast.tsx
'use client'
import { useState, createContext, useContext } from 'react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

const ToastContext = createContext<{
  showToast: (message: string, type: ToastType) => void
}>({ showToast: () => {} })

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now().toString()
    setToasts([...toasts, { id, message, type }])
    setTimeout(() => {
      setToasts(t => t.filter(x => x.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div key={toast.id} className={`px-6 py-3 rounded-xl shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' : 'bg-gray-900'
          } text-white`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
```

### 6. Not Found Custom (app/not-found.tsx)
```typescript
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-amber-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pagina no encontrada
        </h2>
        <p className="text-gray-600 mb-6">
          La pagina que buscas no existe.
        </p>
        <Link href="/" className="bg-amber-500 text-white px-6 py-2 rounded-xl">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
```

---

## Tiempo estimado: 2 horas
