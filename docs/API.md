# Documentación de API

## Convención de rutas (vigente)

La convención final para intervenciones es **`/api/intervencion`**.

> Nota de migración: el endpoint documentado previamente como `/api/interventions` queda **deprecado** y debe reemplazarse por `/api/intervencion` en frontend/integraciones.

## 🔌 Endpoints

### Equipment

#### GET `/api/equipo?serie={numeroSerie}`
Obtiene información de un equipamiento por número de serie.

### Materials

#### GET `/api/material?referencia={referencia}&product={modelo}`
Obtiene información de un material por referencia.

---

### Intervenciones

#### POST `/api/intervencion`
Crea una nueva intervención.

#### GET `/api/intervencion`
Lista intervenciones guardadas.

**Query params opcionales**
- `numeroSerie` (string)
- `from` (string ISO date)
- `to` (string ISO date)
- `top` (number, default 20)
- `skip` (number, default 0)

**Response 200**
```json
{
  "items": [
    {
      "id": "25",
      "fecha": "2026-04-08T10:30:00.000Z",
      "tecnicoNombre": "Juan Pérez",
      "numeroSerie": "SN123456",
      "hospital": "Hospital A",
      "tipoIntervencion": "Preventivo",
      "estado": "Activo"
    }
  ],
  "total": 1,
  "top": 20,
  "skip": 0
}
```

#### GET `/api/intervencion/{id}`
Obtiene detalle completo de una intervención.

**Response 200**
```json
{
  "id": "25",
  "tecnicoNombre": "Juan Pérez",
  "fecha": "2026-04-08T10:30:00.000Z",
  "tipoIntervencion": "Preventivo",
  "numeroSerie": "SN123456",
  "hospital": "Hospital A",
  "estado": "Activo",
  "calibracionesJson": [{ "nombre": "Presión", "valor": "12" }],
  "materialesJson": [{ "referencia": "REF-1", "descripcion": "Sensor", "cantidad": 1 }],
  "mes": 4,
  "anio": 2026,
  "archivado": false
}
```

#### PATCH `/api/intervencion/{id}`
Actualiza una intervención existente.

**Request example**
```json
{
  "observaciones": "Se actualizó firmware y calibración.",
  "software": "v3.1.2",
  "calibracionesJson": [{ "nombre": "Presión", "valor": "11.8" }]
}
```

**Response 200**
```json
{
  "ok": true,
  "id": "25"
}
```

### Errores
- `400` validación de payload o query params.
- `404` intervención no encontrada.
- `403` sin permisos de edición en SharePoint.
- `500` error interno.
