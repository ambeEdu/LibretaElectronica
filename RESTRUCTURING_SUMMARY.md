## 📋 Checklist de Instalación Pendiente

Para completar la reorganización y mejorar el proyecto, se recomienda:

### 🔧 Dependencias para el API

```bash
cd apps/api

# Validación de datos (IMPORTANTE)
pnpm add zod

# Testing
pnpm add -D vitest @vitest/ui

# Logger
pnpm add pino pino-pretty

# Utilities
pnpm add lodash-es
pnpm add -D @types/lodash-es
```

### 🎨 Dependencias para el Frontend

```bash
cd apps/frontend

# Estado global
pnpm add zustand

# Consultas HTTP mejoradas
pnpm add react-query

# Formularios
pnpm add react-hook-form

# UI Components
pnpm add @headlessui/react

# Testing
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/user-event

# CSS
pnpm add tailwindcss postcss autoprefixer
```

### 📦 Dependencias para Shared

```bash
cd packages/shared

# Validación compartida
pnpm add zod

# Testing
pnpm add -D vitest
```

### ✅ Tareas Completadas

- ✅ Crear estructura de carpetas recomendada
- ✅ Crear archivos base para API (AppError, errorHandler, validators)
- ✅ Crear hooks personalizados para Frontend
- ✅ Crear servicio API client centralizado
- ✅ Crear store base (Zustand placeholder)
- ✅ Reorganizar shared en subdominios (domain, errors, utils)
- ✅ Crear documentación (ARCHITECTURE.md, DEVELOPMENT.md, API.md)
- ✅ Crear .env.example en todos los packages
- ✅ Crear ejemplos de tests
- ✅ Crear GitHub Actions workflow

### ⏭️ Próximos Pasos

1. **Instalar dependencias recomendadas** (ver arriba)
2. **Configurar Vitest** en API y Frontend
3. **Integrar Zod** para validación runtime en API
4. **Integrar Zustand** en Frontend para estado global
5. **Integrar React Query** para caché de datos
6. **Mover código existente** a la nueva estructura
7. **Actualizar tests** con datos reales
8. **Configurar CI/CD** completo en GitHub Actions

---

## 📁 Estructura Actual

La estructura ha sido reorganizada según best practices de monorepos:

```
libreta-electronica/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── functions/          ← Handlers HTTP
│   │   │   ├── core/               ← Config, errores, middleware
│   │   │   ├── services/           ← Lógica de negocio
│   │   │   ├── repositories/       ← Acceso a datos
│   │   │   ├── validators/         ← Validación (NUEVO)
│   │   │   ├── types/              ← Tipos internos
│   │   │   └── utils/              ← Utilidades
│   │   ├── __tests__/              ← Tests (NUEVO)
│   │   └── .env.example            ← (NUEVO)
│   │
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── common/         ← Componentes globales (NUEVO)
│       │   │   └── features/       ← Por funcionalidad (NUEVO)
│       │   ├── hooks/              ← Hooks personalizados (NUEVO)
│       │   ├── services/           ← API client (NUEVO)
│       │   ├── store/              ← Estado global (NUEVO)
│       │   ├── utils/              ← Utilidades (NUEVO)
│       │   └── __tests__/          ← Tests (NUEVO)
│       ├── public/                 ← Assets estáticos (NUEVO)
│       └── .env.example            ← (NUEVO)
│
├── packages/
│   └── shared/
│       ├── src/
│       │   ├── domain/             ← Modelos (REORGANIZADO)
│       │   ├── errors/             ← Errores (NUEVO)
│       │   └── utils/              ← Utilidades (NUEVO)
│       ├── __tests__/              ← Tests (NUEVO)
│       └── .env.example            ← (NUEVO)
│
├── docs/                           ← NUEVO
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT.md
│   └── API.md
│
└── .github/workflows/              ← CI/CD (NUEVO)
    └── test.yml
```

---

## 🎯 Beneficios de la Nueva Estructura

✅ **Escalabilidad** - Fácil de agregar nuevas funcionalidades  
✅ **Mantenibilidad** - Código bien organizado y documentado  
✅ **Testing** - Estructura lista para tests  
✅ **Tipado seguro** - TypeScript strict en todo el proyecto  
✅ **Errores centralizados** - Manejo consistente de errores  
✅ **Documentación** - Guías claras para desarrollo  
✅ **CI/CD** - Tests automáticos en PRs  

---

## 📚 Documentación

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Explicación detallada de la estructura
- **[DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Guía para desarrolladores
- **[API.md](./docs/API.md)** - Documentación de endpoints

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Agregar dependencias recomendadas
cd apps/api && pnpm add zod vitest -D && cd ../..
cd apps/frontend && pnpm add zustand && cd ../..

# Copiar .env.example a .env.local
cp apps/api/.env.example apps/api/.env.local
cp apps/frontend/.env.example apps/frontend/.env.local

# Desarrollo
pnpm dev:frontend  # Frontend en http://localhost:5173
pnpm dev:api       # API en http://localhost:7071
```

---

## 💡 Ejemplos de Uso

### Crear nueva funcionalidad

1. Definir tipo en `packages/shared/src/domain/`
2. Crear handler en `apps/api/src/functions/`
3. Crear service en `apps/frontend/src/services/`
4. Crear hook en `apps/frontend/src/hooks/`
5. Usar en componente

Ver [DEVELOPMENT.md](./docs/DEVELOPMENT.md) para ejemplo completo.

---

## 🔗 Referencias

- [Monorepo con pnpm](https://pnpm.io/workspaces)
- [Azure Functions](https://learn.microsoft.com/azure/azure-functions/)
- [React Best Practices](https://react.dev/)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
