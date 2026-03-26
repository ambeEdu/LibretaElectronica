# Estructura de Carpetas - Guía de Arquitectura

## 📁 Visión General

Este proyecto utiliza un **monorepo** con arquitectura modular que separa claramente las responsabilidades entre:
- **Backend**: Azure Functions (API serverless)
- **Frontend**: React + Vite (SPA)
- **Shared**: Código compartido y tipos TypeScript

---

## 🏗️ Estructura del Proyecto

### Root Level

```
libreta-electronica/
├── .env.example              # Variables de entorno de ejemplo
├── package.json              # Configuración del monorepo
├── pnpm-workspace.yaml       # Definición del workspace
├── tsconfig.base.json        # Config TypeScript base
├── .github/workflows/        # CI/CD Actions
└── docs/                     # Documentación
```

### Apps

#### API (`apps/api/src/`)

```
functions/              ← Handlers HTTP de Azure Functions
├── getEquipment.ts    # GET /api/equipment/:id
├── getMaterial.ts     # GET /api/material/:id
└── postIntervention.ts # POST /api/interventions

core/                  ← Infraestructura central
├── config/
│   ├── env.ts        # Variables de entorno
│   └── constants.ts  # Constantes globales
├── errors/
│   ├── AppError.ts           # Clase de error personalizado
│   └── errorHandler.ts       # Manejador centralizado
└── middleware/
    ├── errorMiddleware.ts    # Manejo de errores
    └── authMiddleware.ts     # Autenticación (futuro)

services/              ← Lógica de negocio
├── equipmentService.ts
├── materialService.ts
├── interventionService.ts
└── sharepointClient.ts

repositories/          ← Acceso a datos
├── equipmentRepository.ts
├── materialRepository.ts
└── interventionRepository.ts

validators/            ← Validación de datos
└── interventionValidator.ts

utils/                 ← Utilidades
├── csvParser.ts
├── dateHelpers.ts
└── http.ts

types/                 ← Tipos locales
└── internal.ts

__tests__/             ← Tests
├── unit/
│   ├── services/
│   └── repositories/
├── integration/
└── fixtures/         ← Datos de prueba
```

#### Frontend (`apps/frontend/src/`)

```
components/
├── common/            ← Componentes reutilizables globales
│   ├── Header.tsx
│   ├── Button.tsx
│   └── Modal.tsx
└── features/          ← Componentes agrupados por funcionalidad
    ├── intervention/
    │   ├── InterventionForm.tsx
    │   ├── InterventionInfo.tsx
    │   └── index.ts
    └── material/
        ├── MaterialSearch.tsx
        ├── MaterialsTable.tsx
        └── index.ts

pages/                 ← Páginas completas (rutas principales)
├── HomePage.tsx
├── NotFound.tsx
└── Layout.tsx

hooks/                 ← Hooks personalizados (lógica reutilizable)
├── useEquipment.ts    # Obtener equipamiento
├── useMaterial.ts     # Buscar materiales
└── useIntervention.ts # Crear intervenciones

services/              ← API client (comunicación con backend)
├── api.ts            # Cliente HTTP base
├── equipmentService.ts
├── materialService.ts
└── interventionService.ts

store/                 ← Estado global (Zustand/Redux)
├── interventionStore.ts
└── uiStore.ts

styles/                ← Estilos globales
├── globals.css
└── variables.css

utils/                 ← Utilidades
├── formatters.ts     # Formateo de datos
└── validators.ts     # Validación de formularios

types/                 ← Tipos locales
└── index.ts

__tests__/             ← Tests
├── unit/
│   └── components/
└── integration/

public/                ← Archivos estáticos
```

### Packages

#### Shared (`packages/shared/src/`)

```
domain/                ← Modelo de dominio
├── interventions.ts   # Tipos de intervenciones
├── materials.ts       # Tipos de materiales
├── equipment.ts       # Tipos de equipamiento
└── index.ts

errors/                ← Errores compartidos
├── SharedError.ts
└── index.ts

utils/                 ← Utilidades compartidas
├── constants.ts
└── index.ts

index.ts               ← Punto de entrada (exports públicos)
```

---

## 🔄 Flujo de Datos

```
Frontend (React)
    ↓
services/
    ├── api.ts          (HTTP client)
    ├── equipmentService.ts
    ├── materialService.ts
    └── interventionService.ts
    ↓
API Backend (Azure Functions)
    ↓
handlers/
    ├── getEquipment
    ├── getMaterial
    └── postIntervention
    ↓
services/              (Lógica de negocio)
    ↓
repositories/          (Acceso a datos)
    ├── CSV
    ├── SharePoint
    └── Microsoft Graph
```

---

## 📦 Tipos Compartidos

Todos los tipos se definen en `packages/shared/src/domain/`:

```typescript
// En shared/src/domain/interventions.ts
export interface InterventionRequest {
  tecnicoEmail: string;
  tecnicoNombre: string;
  // ...más campos
}

// Se importan en API y Frontend:
import { InterventionRequest } from "@ambe/shared";
```

---

## 🔑 Principios de Arquitectura

### 1. **Separación de Capas (API)**
- **Functions**: Entrada HTTP, parseado de params
- **Services**: Lógica de negocio
- **Repositories**: Acceso a datos (CSV, SharePoint, etc)
- **Validators**: Validación de entrada

### 2. **Feature-Based (Frontend)**
- Componentes agrupados por funcionalidad
- Cada feature auto-contenida
- Fácil de reutilizar, testear y mantener

### 3. **Type Safety**
- `strict: true` en TypeScript
- Tipos compartidos via `@ambe/shared`
- Validación en runtime (API)

### 4. **Error Handling Centralizado**
- Clase `AppError` en API
- Middleware de errores
- Manejo consistente en Frontend

---

## 🚀 Cómo Agregar una Funcionalidad Nueva

### Ejemplo: Agregar búsqueda de intervenciones

1. **Actualizar tipos** (`packages/shared/src/domain/interventions.ts`)
   ```typescript
   export interface InterventionSearchQuery {
     hospital?: string;
     startDate?: string;
   }
   ```

2. **Backend API** (`apps/api/`)
   - Crear handler: `apps/api/src/functions/searchInterventions.ts`
   - Lógica en service: `apps/api/src/services/interventionService.ts`
   - Validador: `apps/api/src/validators/interventionValidator.ts`

3. **Frontend** (`apps/frontend/`)
   - Hook: `apps/frontend/src/hooks/useInterventionSearch.ts`
   - Servicio: `apps/frontend/src/services/interventionService.ts`
   - Componente: `apps/frontend/src/components/features/intervention/InterventionSearch.tsx`

---

## 📝 Convenciones de Nombres

- **Carpetas**: minúscula, guiones para múltiples palabras
- **Archivos**: PascalCase para componentes, camelCase para otros
- **Funciones**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Interfaces**: PascalCase, prefijo según contexto (Request, Response, etc)

---

## 🔗 Referencias

- [Azure Functions Docs](https://learn.microsoft.com/azure/azure-functions/)
- [React Best Practices](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
