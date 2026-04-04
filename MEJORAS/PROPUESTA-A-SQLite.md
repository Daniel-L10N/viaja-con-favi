# PROPUESTA A: Base de Datos SQLite + Prisma

## Problema
Los datos se pierden en cada build porque están en memoria (data.ts).

## Solucion
- Usar SQLite con Prisma como ORM
- Persistencia real de ofertas, posts, leads
- CRUD completo con DB real

## Implementacion

### 1. Instalar dependencias
```bash
npm install prisma @prisma/client
npx prisma init
```

### 2. Schema (prisma/schema.prisma)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Oferta {
  id          String   @id @default(cuid())
  titulo      String
  descripcion String
  precio      Int
  imagen      String
  destino     String
  incluye     String   // JSON array stored as string
  duracion    String
  destacada   Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model BlogPost {
  id          String   @id @default(cuid())
  titulo      String
  slug        String   @unique
  excerpt     String
  contenido   String
  imagen      String
  autor       String
  tags        String   // JSON array
  lectura     Int
  createdAt   DateTime @default(now())
}

model Lead {
  id              String   @id @default(cuid())
  nombre          String
  email           String
  telefono        String
  destinoInteres  String
  mensaje         String?
  status          String   @default("nuevo")
  createdAt       DateTime @default(now())
}
```

### 3. API Routes actualizadas
```typescript
// api/ofertas/route.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET() {
  const ofertas = await prisma.oferta.findMany()
  return NextResponse.json(ofertas)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const oferta = await prisma.oferta.create({ data: body })
  return NextResponse.json(oferta)
}
```

### 4. Ventajas
- Datos persistentes
- Queries tipados
- Migraciones facil
- Desarrollo local sin DB externa

### 5. Desventajas
- requiere部署 con SQLite o migrar a PostgreSQL
- Setup inicial

---

## Tiempo estimado: 4 horas
