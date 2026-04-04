# PROPUESTA B: Testing con Jest + React Testing Library

## Problema
No hay tests unitarios ni de integracion.

## Solucion
- Jest para tests unitarios
- React Testing Library para componentes
- Coverage de componentes criticos

## Implementacion

### 1. Instalar dependencias
```bash
npm install -D jest @types/jest ts-jest jest-dom @testing-library/react @testing-library/jest-dom
```

### 2. Configuracion (jest.config.ts)
```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
```

### 3. Tests de ejemplo

```typescript
// components/__tests__/LeadForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import LeadForm from '../LeadForm'

describe('LeadForm', () => {
  it('renderiza todos los campos', () => {
    render(<LeadForm />)
    expect(screen.getByLabelText(/Nombre/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Telefono/)).toBeInTheDocument()
  })

  it('envia formulario con datos validos', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    })

    render(<LeadForm />)
    fireEvent.change(screen.getByLabelText(/Nombre/), { target: { value: 'Juan' } })
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'juan@email.com' } })
    fireEvent.change(screen.getByLabelText(/Telefono/), { target: { value: '1234567890' } })
    fireEvent.click(screen.getByRole('button', { name: /Enviar/ }))
    
    await screen.findByText(/Mensaje Enviado/)
    expect(screen.getByText(/Mensaje Enviado/)).toBeInTheDocument()
  })

  it('muestra error en falla', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false
    })

    render(<LeadForm />)
    // ... test error handling
  })
})
```

### 4. Tests de utilidades

```typescript
// lib/__tests__/data.test.ts
import { getOfertas, getBlogPosts } from '../data'

describe('data helpers', () => {
  it('retorna array de ofertas', async () => {
    const ofertas = await getOfertas()
    expect(ofertas).toBeInstanceOf(Array)
    expect(ofertas.length).toBeGreaterThan(0)
  })

  it('retorna ofertas destacadas', async () => {
    const destacadas = await getOfertasDestacadas()
    expect(destacadas.every(o => o.destacada)).toBe(true)
  })
})
```

### 5. Coverage objetivo
- Componentes: 80%
- Utilidades: 90%
- API routes: 70%

### 6. Scripts agregar
```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

---

## Tiempo estimado: 3 horas
