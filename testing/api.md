# API Documentation - Viaja con Favi

## Base URL
```
https://cmxserver.curlew-vector.ts.net/viaja-con-favi/api/
```

---

## Endpoints Disponibles

| Recurso | Endpoint | Métodos |
|---------|----------|---------|
| Destinos | `/destinos/` | GET, POST, PUT, DELETE |
| Paquetes | `/paquetes/` | GET, POST, PUT, DELETE |
| Blog | `/blog/` | GET, POST, PUT, DELETE |
| Testimonios | `/testimonios/` | GET, POST, PUT, DELETE |
| Garantías | `/garantias/` | GET, POST, PUT, DELETE |
| Leads | `/leads/` | GET, POST, PUT, DELETE |
| Planes | `/planes/` | GET, POST, PUT, DELETE |

---

## Ejemplos de Uso

### GET - Obtener todos los registros

```javascript
// JavaScript
const response = await fetch('https://cmxserver.curlew-vector.ts.net/viaja-con-favi/api/destinos/');
const data = await response.json();
```

```bash
# cURL
curl https://cmxserver.curlew-vector.ts.net/viaja-con-favi/api/destinos/
```

### POST - Crear nuevo registro

```bash
# cURL
curl -X POST https://cmxserver.curlew-vector.ts.net/viaja-con-favi/api/blog/ \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Nuevo Post",
    "slug": "nuevo-post",
    "excerpt": "Resumen del post",
    "contenido": "Contenido completo",
    "autor": "Viaja con Favi",
    "tags": ["viajes"],
    "lectura_minutos": 5,
    "status": "borrador"
  }'
```

### PUT - Actualizar registro

```bash
curl -X PUT https://cmxserver.curlew-vector.ts.net/viaja-con-favi/api/blog/3/ \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Post actualizado",
    "status": "publicada"
  }'
```

### DELETE - Eliminar registro

```bash
curl -X DELETE https://cmxserver.curlew-vector.ts.net/viaja-con-favi/api/blog/3/
```

---

## Modelos y Campos

### Blog (BlogEmpresa)

| Campo | Tipo | Requerido |
|-------|------|---------|
| titulo | string | Sí |
| slug | string (unique) | Sí |
| excerpt | text | No |
| contenido | text | No |
| imagen | file | No |
| autor | string | No |
| tags | JSON array | No |
| lectura_minutos | integer | No |
| status | choices | No |
| created_at | datetime | auto |

**Status options:** `borrador`, `publicada`, `archivada`

### Destino

| Campo | Tipo | Requerido |
|-------|------|---------|
| pais | string | Sí |
| codigo_pais | string (3 chars) | Sí |
| bandera_emoji | string | No |
| imagen | file | No |
| numero_resorts | integer | No |
| continente | choices | No |
| comida | string | No |
| transfers | string | No |
| precio_desde | string | No |
| descripcion | text | No |
| activo | boolean | No |
| orden | integer | No |

**Continente options:** `america_norte`, `america_central`, `america_sur`, `europa`, `asia`, `africa`, `oceania`

### Paquete

| Campo | Tipo | Requerido |
|-------|------|---------|
| destino | ForeignKey | Sí |
| titulo | string | Sí |
| descripcion | text | No |
| duracion_dias | integer | Sí |
| precio | decimal | Sí |
| moneda | string | No |
| incluye | JSON array | No |
| imagen | URL | No |
| disponible | boolean | No |
| destacado | boolean | No |

### Testimonio

| Campo | Tipo | Requerido |
|-------|------|---------|
| nombre | string | Sí |
| foto | URL | No |
| texto | text | Sí |
| viaje | string | No |
| rating | integer | No |
| aprobado | boolean | No |

### Garantía

| Campo | Tipo | Requerido |
|-------|------|---------|
| titulo | string | Sí |
| descripcion | text | No |
| icono | string | No |
| orden | integer | No |
| activo | boolean | No |

### Lead

| Campo | Tipo | Requerido |
|-------|------|---------|
| nombre | string | Sí |
| email | email | Sí |
| telefono | string | No |
| destinoInteres | string | No |
| mensaje | text | No |

---

## Configuración del Servidor

### Django Settings (importante)

```python
# Fix DRF URLs para reverse proxy
FORCE_SCRIPT_NAME = '/viaja-con-favi'

# Permitir todos los hosts
ALLOWED_HOSTS = ['*']

# CORS
CORS_ALLOW_ALL_ORIGINS = True
```

### Puerto y Servicios

- Puerto HTTP: 80 (nginx)
- Puerto HTTPS: 443, 8443 (nginx)
- Puerto Gunicorn: 8001 (Django)

---

## Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| "Connection refused" | Gunicorn no corre | `sudo systemctl restart gunicorn` |
| "Mixed content" | HTTP en HTTPS | Usar `https://` en la URL |
| "404 Not Found" | Ruta mal | Verificar nginx proxy_pass |
| "CORS error" | No permite origen | `CORS_ALLOW_ALL_ORIGINS = True` |

---

## URLs de Referencia

| Servicio | URL |
|----------|-----|
| API Base | `https://cmxserver.curlew-vector.ts.net/viaja-con-favi/api/` |
| Admin | `https://cmxserver.curlew-vector.ts.net/viaja-con-favi/admin/` |
| Media | `https://cmxserver.curlew-vector.ts.net/viaja-con-favi/media/` |

---

## JavaScript API Client

```javascript
class ViajaAPI {
  constructor(baseUrl = 'https://cmxserver.curlew-vector.ts.net/viaja-con-favi') {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
  }

  async put(endpoint, data) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
  }

  async delete(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
  }
}

// Uso
const api = new ViajaAPI();

// Obtener destinos
api.get('/api/destinos/').then(console.log);

// Crear post
api.post('/api/blog/', {
  titulo: 'Nuevo post',
  slug: 'nuevo-post',
  contenido: 'Contenido...',
  status: 'borrador'
}).then(console.log);
```

---

## Fecha de documentación
2026-04-11