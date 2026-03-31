# Viaja con Favi - Documentación del Proyecto

## Descripción
Landing page para club de viajes con sistema de membresías y referidos.

## URLs del Proyecto

### Frontend (Vercel)
- **Sitio**: https://daniel-l10n.github.io/viaja-con-favi/
- **Repositorio Frontend**: https://github.com/Daniel-L10N/viaja-con-favi

### Backend (Servidor CMX)
- **API**: http://100.81.171.84:8001
- **URL Producción**: https://cmxserver.curlew-vector.ts.net/viajaconfavi/ (pendiente configurar Apache)
- **Repositorio Backend**: https://github.com/Daniel-L10N/viaja-con-favi-backend (privado)

## Credenciales de Acceso

### Admin Panel (Frontend - Vercel)
- **URL**: `/admin/login`
- **Usuario**: `admin`
- **Contraseña**: `Favi2024!`

### Django Admin (Backend - Servidor CMX)
- **URL**: http://100.81.171.84:8001/admin/
- **Usuario**: `admin`
- **Contraseña**: `admin123` (crear con createsuperuser)

## Endpoints de la API

| Recurso | Endpoint |
|---------|----------|
| Leads | `/api/leads/` |
| Destinos | `/api/destinos/` |
| Planes | `/api/planes/` |
| Testimonios | `/api/testimonios/` |
| Garantías | `/api/garantias/` |
| Paquetes | `/api/paquetes/` |

## Tecnologías

### Frontend
- Next.js 14
- Tailwind CSS
- Framer Motion
- TypeScript

### Backend
- Python 3.12
- Django 6
- Django REST Framework
- SQLite (desarrollo) / PostgreSQL (producción)

## Estructura del Proyecto

```
viaja-con-favi/          # Frontend (Next.js)
├── src/
│   ├── app/            # Páginas Next.js
│   │   ├── page.tsx    # Landing page principal
│   │   ├── admin/       # Panel de administración
│   │   └── admin/login/ # Login del admin
│   ├── components/     # Componentes React
│   ├── hooks/          # Custom hooks (useBackendData)
│   └── lib/            # Utilidades y API client

viaja-con-favi-backend/ # Backend (Django)
├── leads/              # App de leads (formulario)
├── membresias/         # App de membresías y planes
├── usuarios/           # App de usuarios
├── destinos/           # App de destinos y paquetes
└── api/                # URLs de la API REST
```

## Desarrollo Local

### Frontend
```bash
cd viaje-con-favi
npm run dev
```

### Backend
```bash
cd viaje-con-favi-backend
python manage.py runserver
```

## Notas de Desarrollo

- El frontend se conecta directamente al backend del servidor CMX
- Para producción, configurar Apache para servir en `/viajaconfavi/`
- Los datos del sitio pueden gestionarse desde el Admin Panel en Vercel
- Las credenciales de admin son de prueba - cambiar en producción