# Documentación de API

## 🔌 Endpoints

### Equipment

#### GET `/api/equipment/{numeroSerie}`
Obtiene información de un equipamiento por número de serie.

**Parámetros:**
- `numeroSerie` (string, requerido) - Número de serie del equipo

**Respuesta exitosa (200):**
```json
{
  "found": true,
  "numeroSerie": "SN123456",
  "hospital": "Hospital A",
  "estado": "Activo",
  "modelo": "Modelo X"
}
```

**Respuesta no encontrado (404):**
```json
{
  "found": false
}
```

---

### Materials

#### GET `/api/material/{referencia}`
Obtiene información de un material por referencia.

**Parámetros:**
- `referencia` (string, requerido) - Referencia del material

**Respuesta exitosa (200):**
```json
{
  "found": true,
  "referencia": "REF-001",
  "descripcion": "Sensor de temperatura",
  "stockActual": 15,
  "familia": "Sensores"
}
```

**Respuesta no encontrado (404):**
```json
{
  "found": false
}
```

---

### Interventions

#### POST `/api/interventions`
Crea una nueva intervención.

**Body:**
```json
{
  "tecnicoEmail": "tecnico@example.com",
  "tecnicoNombre": "Juan Pérez",
  "fecha": "2024-03-26",
  "tipoIntervencion": "Preventivo",
  "numeroSerie": "SN123456",
  "hospital": "Hospital A",
  "estado": "Activo",
  "numeroInventario": "INV001",
  "numeroParte": "PART001",
  "modelo": "Modelo X",
  "software": "v2.0",
  "descripcionError": "Problema de conectividad",
  "observaciones": "Se reemplazó componente",
  "seguridadElectrica": "OK",
  "materialesJson": [
    {
      "referencia": "REF-001",
      "descripcion": "Sensor",
      "cantidad": 2
    }
  ],
  "mes": 3,
  "anio": 2024,
  "archivado": false
}
```

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "id": "63f5a3c2e1d4b8f9a2c3d4e5"
}
```

**Respuesta error (400):**
```json
{
  "ok": false,
  "errorCode": "BAD_REQUEST",
  "message": "El campo 'tecnicoEmail' es requerido"
}
```

---

## 🔐 Autenticación

Actualmente sin autenticación. En futuro:
```
Header: Authorization: Bearer {token}
```

---

## 📊 Códigos de Error

| Código | Status | Descripción |
|--------|--------|-------------|
| `BAD_REQUEST` | 400 | Datos inválidos o incompletos |
| `UNAUTHORIZED` | 401 | No autenticado |
| `FORBIDDEN` | 403 | No tiene permisos |
| `NOT_FOUND` | 404 | Recurso no encontrado |
| `CONFLICT` | 409 | Conflicto de datos |
| `INTERNAL_ERROR` | 500 | Error en el servidor |

---

## 🧪 Ejemplos con cURL

```bash
# Obtener equipamiento
curl -X GET http://localhost:7071/api/equipment/SN123456

# Obtener material
curl -X GET http://localhost:7071/api/material/REF-001

# Crear intervención
curl -X POST http://localhost:7071/api/interventions \
  -H "Content-Type: application/json" \
  -d '{"tecnicoEmail":"...","tecnicoNombre":"...",...}'
```

---

## 📝 Tipos TypeScript

Ver [packages/shared/src/domain/](../packages/shared/src/domain/) para las definiciones completas:

```typescript
import {
  InterventionRequest,
  InterventionResponse,
  MaterialResult,
  EquipmentResult
} from "@ambe/shared";
```

---

## 🚀 Configuración Base URL

### Desarrollo
```
http://localhost:7071
```

### Producción (Azure)
```
https://<function-app-name>.azurewebsites.net
```

---

## 📞 Rate Limiting

- Límite: 100 requests/minuto por IP
- Esperar si se excede

---

## 🔗 Datos Relacionados

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Estructura del proyecto
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Guía de desarrollo
