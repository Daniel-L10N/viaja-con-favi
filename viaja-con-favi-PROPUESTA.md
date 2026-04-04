# PROPUESTA: REESTRUCTURACION FRONTEND - VIAJA CON FAVI

**Objetivo**: Transformar la landing page en una plataforma de contenido y marketing para mostrar ofertas de Travorium y capturar leads.

---

## 1. ANALISIS DEL PROYECTO ACTUAL

### Lo que funciona
- Landing page operativa con Next.js 14
- Componentes visuales: Hero, Galeria, Confianza, Footer
- Diseno profesional con Tailwind + Framer Motion

### Lo que hay que cambiar
- Sistema de membresias directo al usuario -> Plataforma publisitaria para Travorium
- Falta: Blog, Catalogo de ofertas, Admin para publicar

---

## 2. NUEVA ESTRUCTURA (SEO + MARKETING)

### Paginas/Secciones

| Ruta | Descripcion |
|------|-------------|
| / | Landing Principal (SEO optimized) |
| /destinos | Catalogo de ofertas (Cards visuales) |
| /destinos/[slug] | Detalle de cada destino/oferta |
| /blog | Blog de la empresa |
| /blog/[slug] | Articulos individuales |
| /contacto | Formulario de contacto + WhatsApp |
| /admin | Panel de administracion (privado) |

### Arquitectura SEO

| Pagina | Title SEO | Descripcion Meta |
|--------|-----------|------------------|
| Home | Viaja con Favi - Viajes de Lujo a Precios de Mayorista | Descubre ofertas exclusivas de viajes 5 estrellas |
| Destinos | Ofertas de Viajes 2026 - Paquetes Turisticos Exclusivos | Ver todos los destinos y paquetes disponibles |
| Blog | Blog de Viajes - Consejos y Experiencias | Articulos sobre viajes, destinos y tips |
| Contacto | Contacto - Viaja con Favi | Contacta para mas informacion |

---

## 3. COMPONENTES NUEVOS

### 3.1 OfertasCards (Catalogo Visual)

```
interface Oferta {
  id: string;
  titulo: string;          // "Paris - 5 Noches"
  descripcion: string;     // "Hotel 5★ + Auto + Tours"
  precio: number;          // 450 USD
  imagen: string;          // URL de imagen
  destino: string;         // "Paris, Francia"
  incluye: string[];       // ["Hotel Ritz", "Auto", "Traslados"]
  duracion: string;        // "5 noches / 6 dias"
  fechaPublicacion: Date;
  destacada: boolean;      // Si aparece en home
}
```

### 3.2 BlogCard

```
interface BlogPost {
  id: string;
  titulo: string;
  slug: string;
  excerpt: string;         // 160 chars para SEO
  contenido: string;       // Markdown o MDX
  imagen: string;
  autor: string;
  fechaPublicacion: Date;
  tags: string[];
  lectura: number;         // Minutos de lectura
}
```

### 3.3 LeadForm
- Nombre, Email, Telefono
- Destino de interes (dropdown)
- Mensaje
- Guardar en DB + WhatsApp notification

### 3.4 Admin Dashboard
- Dashboard: Metricas (visitas, leads, ofertas publicadas)
- Ofertas: CRUD completo con imagenes
- Blog: Editor WYSIWYG o Markdown
- Config: Logo, colores, texto de contacto

---

## 4. SEO TECNICO (IMPLEMENTAR)

### 4.1 Meta Tags Dinamicos
- generateMetadata por pagina
- OpenGraph images
- Twitter cards

### 4.2 Schema.org
- TravelAgency schema en cada pagina
- Product schema para ofertas
- Article schema para blog

### 4.3 Sitemap.xml Dinamico
- next-sitemap para generacion automatica

### 4.4 Core Web Vitals
- LCP: Optimizar imagenes con next/image
- CLS: Evitar layout shifts
- INP: Minimizar JavaScript

---

## 5. FLUJO DE USUARIO

```
VISITANTE
    |
    v
LANDING PAGE
- Hero con oferta destacada
- Ofertas destacadas (top 3)
- Ultimos posts del blog
- CTA: "Contactanos" -> WhatsApp / Formulario
    |
    v
LEAD CAPTURED (guardado en DB)
    |
    v
ADMIN (Favi)
- Publica nuevas ofertas
- Escribe posts de blog
- Responde leads
- Ve metricas
```

---

## 6. STACK TECNICO ADICIONAL

| Paquete | Uso |
|---------|-----|
| next-sitemap | Generar sitemap.xml automaticamente |
| @tailwindcss/typography | Estilos para el blog |
| react-hook-form | Formularios |
| zod | Validacion |
| date-fns | Fechas |
| framer-motion | Animaciones |

---

## 7. PRIORIDADES DE IMPLEMENTACION

### Fase 1: Fundamentos (Semana 1)
- Reestructurar proyecto
- Crear sistema de rutas (/destinos, /blog, /contacto)
- Implementar components base

### Fase 2: Catalogo de Ofertas (Semana 2)
- CRUD de ofertas (admin)
- Page de catalogo
- Page de detalle

### Fase 3: Blog (Semana 3)
- Editor de posts
- Page de blog
- Optimizacion SEO

### Fase 4: Lead Capture (Semana 4)
- Formulario de contacto
- Integracion WhatsApp
- Dashboard admin

### Fase 5: Chatbot (Opcional)
- Integracion con WhatsApp Business API

---

## 8. PRESUPUESTO DE TIEMPO

| Fase | Estimacion |
|------|------------|
| Fase 1 | 8 horas |
| Fase 2 | 12 horas |
| Fase 3 | 10 horas |
| Fase 4 | 8 horas |
| Total | 38 horas |

---

## 9. ENTREGABLES

1. Codigo fuente en repositorio
2. Panel admin funcional
3. Catalogo de ofertas con CRUD
4. Blog con editor
5. Formulario de leads
6. SEO tecnico implementado
7. Despliegue en Vercel/GitHub Pages

---

*Propuesta creada: Abril 2026*
*Desarrollador: CMX-CORE AI Assistant*
