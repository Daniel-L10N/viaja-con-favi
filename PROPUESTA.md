# 🚀 PROYECTO: "VIAJA CON FAVI"
## Propuesta de Marketing Digital y Desarrollo FullStack

---

## 1. ANÁLISIS DEL PROYECTO ACTUAL

### 📊 Estado Actual
| Componente | Estado | Tecnología |
|------------|--------|------------|
| Frontend | ✅ Landing operativa | Next.js 14 + Tailwind |
| Backend | ✅ API REST | Django 6 + DRF |
| Admin Panel | ✅ En desarrollo | Next.js Auth |
| Base de datos | ✅ Modelos definidos | SQLite (dev) |

### 🏗️ Modelo de Negocio Actual
```
┌─────────────────────────────────────────────────────────────┐
│                    CLUB DE VIAJES PRIVADO                   │
├─────────────────────────────────────────────────────────────┤
│  💳 MEMBERSÍAS                                             │
│  ├── Titanium: $249.90 inicial + $75/mes                   │
│  └── VIP Platinum: $369.90 inicial + $135/mes              │
├─────────────────────────────────────────────────────────────┤
│  🎁 PUNTOS                                                 │
│  ├── 150 pts (Titanium) → Vacaciones regalo                │
│  └── 270 pts (Platinum) → Vacaciones VIP regalo            │
├─────────────────────────────────────────────────────────────┤
│  🤝 REFERIDOS                                               │
│  └── 3 referidos → ¡Membresía gratis!                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. DEFINICIÓN ESTRATÉGICA

### 🎯 Finalidad del Proyecto
> **Crear una plataforma digital de membresías de viajes que funcione como un club privado exclusivo, donde los miembros acceden a precios de mayorista y pueden obtener su membresía gratis mediante un sistema de referidos viral.**

### 🎯 Objetivo Final
> **Convertirse en el principal club de viajes porreferencia en México y Latinoamérica, logrando:**
> 1. **5,000 miembros activos** en el primer año
> 2. **70% de crecimiento viral** mediante referidos
> 3. **Tasa de conversión** del 3% en visitantes a leads
> 4. **Retención del 85%** (renovaciones anuales)

---

## 3. FUNCIONES DEL SITIO WEB

### 📌 Módulos Requeridos (Priorizados)

| # | Módulo | Prioridad | Descripción |
|---|--------|----------|-------------|
| 1 | **Landing Page** | 🔴 Crítica | Ya existe, optimizar conversión |
| 2 | **Sistema de Leads** | 🔴 Crítica | Formulario capture + WhatsApp |
| 3 | **Panel de Miembros** | 🔴 Crítico | Dashboard usuario con puntos |
| 4 | **Catálogo de Destinos** | 🟠 Alta | Galería visual de +20 destinos |
| 5 | **Sistema de Referidos** | 🟠 Alta | Tracking de referidos + rewards |
| 6 | **Blog/Guía de Viajes** | 🟡 Media | SEO + contenido de valor |
| 7 | **Booking de Viajes** | 🟡 Media | Reserva directa de paquetes |
| 8 | **Chatbot IA** | 🟡 Media | Atención 24/7 con WhatsApp |

---

## 4. ARQUITECTURA TÉCNICA

```
                    ┌──────────────────────────────────────┐
                    │           FRONTEND (Vercel)          │
                    │  ┌────────────────────────────────┐ │
                    │  │ Next.js 14 (App Router)        │ │
                    │  │ ├── Landing + SEO              │ │
                    │  │ ├── Member Dashboard           │ │
                    │  │ └── Admin Panel                │ │
                    │  └────────────────────────────────┘ │
                    └──────────────────────────────────────┘
                              ↕ REST API / GraphQL
                    ┌──────────────────────────────────────┐
                    │         BACKEND (Servidor CMX)       │
                    │  ┌────────────────────────────────┐ │
                    │  │ Django 6 + DRF                 │ │
                    │  │ ├── Auth (JWT)                 │ │
                    │  │ ├── Membresías                │ │
                    │  │ ├── Puntos/Referidos          │ │
                    │  │ ├── Destinos/Paquetes         │ │
                    │  │ └── Webhooks (Stripe/PayPal)  │ │
                    │  └────────────────────────────────┘ │
                    └──────────────────────────────────────┘
                              ↕
         ┌──────────────────────┴──────────────────────┐
         ↓                                             ↓
┌─────────────────┐                       ┌─────────────────┐
│  PostgreSQL    │                       │  WhatsApp API   │
│  (Producción)  │                       │  (Business)     │
└─────────────────┘                       └─────────────────┘
```

### 🛠️ Stack Tecnológico
| Capa | Tecnología | Status |
|------|-------------|--------|
| Frontend | Next.js 14, React 18, Tailwind | ✅ Listo |
| Backend | Django 6, DRF | ✅ Listo |
| Auth | JWT (SimpleJWT) | ✅ Listo |
| DB | PostgreSQL (prod) | ⏳ Por configurar |
| Hosting | Vercel + Servidor CMX | ✅ Configurado |

---

## 5. FUNNEL DE MARKETING

```
┌─────────────────────────────────────────────────────────────────┐
│                        FUNNEL DE VENTAS                          │
├─────────────────────────────────────────────────────────────────┤
│   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    │
│   │  AWARE  │ →  │INTEREST │ →  │ DECISION│ →  │ PURCHASE│    │
│   │ Landing │    │ Catálogo│    │ Pricing │    │ Checkout│    │
│   │   Page  │    │ Destinos│    │  Plans  │    │ Stripe  │    │
│   └─────────┘    └─────────┘    └─────────┘    └─────────┘    │
│        ↓             ↓              ↓              ↓           │
│   Social Ads    WhatsApp       Demo Call      Membresía      │
│   SEO           Follow-up      Testimonials   Upgrade        │
│   Influencers   Newsletter                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 📈 KPIs del Proyecto

| Métrica | Meta Mes 1 | Meta Mes 6 | Meta Año 1 |
|---------|------------|------------|------------|
| Visitas mensuales | 5,000 | 25,000 | 50,000 |
| Leads capturados | 150 | 750 | 1,500 |
| Conversión a membresía | 3% | 5% | 7% |
| Miembros activos | 50 | 500 | 5,000 |
| Ingresos recurrentes | $5,000 | $50,000 | $300,000 |

---

## 6. PROPUESTA DE VALOR

### 🧠 Propuesta Única de Venta (PUV)
> **"Viaja como millonario, pagando como mayorista. Y si referís 3 amigos, tu membresía es gratis."**

### 🎯 Diferenciación Competitiva

| Competidor Tradicional | Viaja con Favi |
|------------------------|----------------|
| Precios públicos | Precios de mayorista |
| Sin comunidad | Club exclusivo VIP |
| Sin incentivos | Referidos = gratis |
| Sin seguimiento | Dashboard personal |

---

## 7. ROADMAP DE IMPLEMENTACIÓN

### 📅 Fase 1: Fundamentos (Semanas 1-4)
- [ ] Optimizar landing page actual (conversion rate)
- [ ] Sistema de leads funcional con WhatsApp
- [ ] Panel de usuario básico (ver puntos, referidos)
- [ ] Base de datos PostgreSQL en producción

### 📅 Fase 2: Crecimiento (Semanas 5-8)
- [ ] Sistema completo de referidos con tracking
- [ ] Catálogo de destinos con filtering
- [ ] Blog con SEO optimizado
- [ ] Email marketing (newsletters)

### 📅 Fase 3: Escalabilidad (Semanas 9-12)
- [ ] Sistema de booking de paquetes
- [ ] Chatbot IA para atención 24/7
- [ ] Integración con Stripe/PayPal
- [ ] Analytics dashboard avanzado

---

## 8. DESTINOS DISPONIBLES

El proyecto incluye +25 destinos en los 5 continentes:
- **Caribe**: México, República Dominicana, Jamaica, Bahamas, Puerto Rico
- **América**: Estados Unidos, Canadá
- **Europa**: España, Italia, Francia, Portugal, Grecia, Turquí
- **Asia**: Tailandia, Bali, Singapur, Japón
- **Oceanía**: Maldivas, Seychelles, Mauricio, Fiyi, Australia, Nueva Zelanda
- **Medio Oriente**: Dubai

---

## 9. CREDITOS Y CONTACTOS

- **Sitio**: https://daniel-l10n.github.io/viaja-con-favi/
- **WhatsApp**: +52 56 1637 6826
- **Frontend Repo**: https://github.com/Daniel-L10N/viaja-con-favi
- **Backend Repo**: https://github.com/Daniel-L10N/viaja-con-favi-backend

---

*Propuesta desarrollada por CMX-CORE - Especialista en Marketing y FullStack*
*Fecha: Abril 2026*
