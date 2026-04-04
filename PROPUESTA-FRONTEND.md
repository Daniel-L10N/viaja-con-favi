# PROPUESTA: Viaja con Favi - Frontend Público + Panel de Cliente

## 1. Resumen Ejecutivo

**Cliente:** Favi (Viajes con Favi)  
**Negocio:** Agencia de viajes para miembros con membresía  
**Modelo de negocio:** Los clientes compran membresía y acceden a un dashboard personal donde pueden publicar sus propias ofertas de viajes

---

## 2. Análisis del Proyecto Actual

### Estado Actual
- ✅ Frontend Next.js con Prisma (SQLite)
- ✅ Backend Django REST
- ✅ Sistema de ofertas, blog, leads
- ✅ Admin panel básico

### Problemas Identificados
1. No hay distinción clara entre página pública y dashboard del cliente
2. El dashboard actual es solo para admin, no para clientes con membresía
3. Falta sistema de publicaciones del cliente
4. No hay SEO optimizado para conversión

---

## 3. Arquitectura Propuesta

```
├── 🌐 FRONTEND PÚBLICO (viaja-con-favi)
│   ├── Home (Hero + ofertas destacadas + blog)
│   ├── Destinos (catálogo de ofertas)
│   ├── Blog (artículos de viajes)
│   ├── Membresía (planes y beneficios)
│   └── Contacto (formulario + WhatsApp)
│
├── 🔐 PANEL DEL CLIENTE (dashboard.viajaconfavi.com)
│   ├── Mi Perfil (datos del cliente)
│   ├── Mis Publicaciones (crear/editar ofertas)
│   ├── Mis Destinos (gestionar ofertas propias)
│   ├── Mi Blog (publicaciones personales)
│   └── Configuración
│
└── 🔄 BACKEND API (viaja-con-favi-backend)
    ├── Autenticación JWT (admin + clientes)
    ├── CRUD Ofertas (público + cliente)
    ├── CRUD Blog (público + cliente)
    └── Webhooks para pagos
```

---

## 4. Estructura de Datos

### Cliente (nuevo modelo)
```
- id, email, password, nombre, apellido
- telefono, fecha_registro
- membresia_activa (boolean)
- plan (basic/premium/vip)
- fecha_inicio_membresia, fecha_fin_membresia
- publicaciones_permitidas (int)
```

### Publicación del Cliente
```
- id, cliente_id, titulo, descripcion
- precio, imagen, destino, incluye[]
- duracion, destacada (boolean)
- status (borrador/publicada/archivada)
- fecha_creacion, fecha_actualizacion
```

---

## 5. SEO y Marketing Digital

### Optimizaciones On-Page
| Elemento | Acción |
|----------|--------|
| Meta titles | Dinámicos por página |
| Meta descriptions | Personalizadas por sección |
| Schema markup | Organization, Product, FAQ |
| URL semánticas | /destinos/paris, /blog/10-dias-espana |
| Heading hierarchy | H1 → H2 → H3 optimizado |
| Images alt text | Descriptivo y semántico |

### Contenido SEO
- Blog con artículos de destinos (1000+ palabras)
- Páginas de destino optimizadas
- FAQ schema para preguntas frecuentes
- Reviews/testimonios con schema

### Velocidad y Core Web Vitals
- Next.js Image optimization
- Lazy loading para galerías
- SSR para SEO crítico
- Lighthouse target: 90+

---

## 6. UX/UI Propuesto

### Frontend Público
- **Hero:** Video background + CTA "Explora el Mundo"
- **Ofertas:** Grid visual con precios destacados
- **Blog:** Cards con imagen + título + excerpt
- **CTA flotante:** WhatsApp always visible

### Dashboard Cliente
- **Onboarding:** Wizard de primera publicación
- **Editor visual:** WYSIWYG para ofertas
- **Estadísticas:** Vistas de mis publicaciones
- **Preview:** Ver cómo queda antes de publicar

---

## 7. Funcionalidades Clave

### Fase 1: Frontend Público (Prioridad Alta)
1. ✅ Refactorizar landing page para conversión
2. ✅ Optimizar SEO técnica
3. ✅ Mobile-first responsive
4. ✅ Integrar WhatsApp API
5. ✅ Sistema de leads optimizado

### Fase 2: Dashboard Cliente (Prioridad Media)
1. ✅ Autenticación JWT para clientes
2. ✅ CRUD de publicaciones del cliente
3. ✅ Editor de ofertas visual
4. ✅ Preview en tiempo real
5. ✅ Límite de publicaciones por plan

### Fase 3: Extras (Prioridad Baja)
1. Chatbot con IA (opcional)
2. Sistema de reservas
3. Pagos integrados
4. Analytics avanzado

---

## 8. Tecnologías Recomendadas

| Capa | Tecnología |
|------|-------------|
| Frontend | Next.js 14 (App Router) + Tailwind |
| Backend | Django REST + PostgreSQL |
| Auth | JWT + Django allauth |
| Storage | AWS S3 / Cloudinary |
| SEO | next-seo, schema-dts |
| Chatbot | Botpress / Custom AI |

---

## 9. Timeline Estimado

| Fase | Duración | Entregable |
|------|----------|------------|
| Frontend Público v2 | 2 semanas | Landing optimizada + SEO |
| API + Auth | 1 semana | Endpoints cliente |
| Dashboard Cliente | 2 semanas | Panel funcional |
| Testing + Deploy | 1 semana | Production ready |

**Total:** 6 semanas

---

## 10. Métricas de Éxito

- **SEO:** Posiciones top 10 para keywords principales
- **Conversión:** 5% de visitantes → leads
- **Velocidad:** Lighthouse > 90
- **UX:** Time on page > 2 min
- **Retención:** Dashboard activo > 60%

---

## 11. Siguiente Paso

1. Aprobar esta propuesta
2. Iniciar desarrollo Frontend Público v2
3. Iterar según feedback

---

*Propuesta elaborada: Viaja con Favi - Senior Developer + SEO Expert*