# Guía de Desarrollo

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+
- pnpm 10+
- Azure Functions Core Tools (para API)

### Instalación

```bash
# Clonar repo
git clone https://github.com/ambeEdu/LibretaElectronica.git
cd LibretaElectronica

# Instalar dependencias
pnpm install

# Crear archivos de configuración
cp apps/api/.env.example apps/api/.env.local
cp apps/frontend/.env.example apps/frontend/.env.local
```

---

## 🛠️ Comandos Disponibles

### Desde la raíz del proyecto

```bash
# Desarrollo
pnpm dev:frontend    # Inicia Frontend en http://localhost:5173
pnpm dev:api        # Inicia API en http://localhost:7071

# Build
pnpm build           # Compila API y Frontend

# Instalar dependencias del proyecto completo
pnpm install

# Agregar nueva dependencia a un workspace
pnpm -F @ambe/shared add lodash
pnpm -F api add express
pnpm -F frontend add react-query
```

---

## 📂 Estructura de Desarrollo

### API (apps/api/)

```bash
cd apps/api

# Compilar
pnpm build

# Iniciar en desarrollo
pnpm start             # Requiere que shared esté compilado
```

**Archivos importantes:**
- `.env.local` - Variables de entorno (NO versionable)
- `local.settings.json` - Configuración local de Azure Functions
- `host.json` - Configuración del host

### Frontend (apps/frontend/)

```bash
cd apps/frontend

# Desarrollo con hot reload
pnpm dev

# Build para producción
pnpm build

# Preview de build
pnpm preview
```

**Variables de entorno:**
```javascript
// .env.local
VITE_API_URL=http://localhost:7071
```

---

## 🔧 Flujo de Desarrollo

### 1. Crear una nueva función en el API

```typescript
// apps/api/src/functions/getInterventions.ts
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { withErrorHandling } from "../core/errors/errorHandler";
import { interventionService } from "../services/interventionService";

export const getInterventions = withErrorHandling(async (req: HttpRequest) => {
  const interventions = await interventionService.getAll();
  
  return {
    status: 200,
    jsonBody: { ok: true, data: interventions }
  };
});
```

### 2. Crear tipo compartido

```typescript
// packages/shared/src/domain/interventions.ts
export interface GetInterventionsResponse {
  ok: boolean;
  data: InterventionRequest[];
}
```

### 3. Crear servicio en Frontend

```typescript
// apps/frontend/src/services/interventionService.ts
export const interventionService = {
  async getAll() {
    return api.get<InterventionRequest[]>('/api/interventions');
  }
};
```

### 4. Crear hook en Frontend

```typescript
// apps/frontend/src/hooks/useInterventions.ts
export function useInterventions() {
  const [interventions, setInterventions] = useState<InterventionRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    interventionService.getAll()
      .then(setInterventions)
      .finally(() => setLoading(false));
  }, []);

  return { interventions, loading };
}
```

### 5. Usar en componente

```typescript
// apps/frontend/src/components/features/intervention/InterventionList.tsx
export function InterventionList() {
  const { interventions, loading } = useInterventions();

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {interventions.map(i => (
        <div key={i.numeroSerie}>{i.numeroSerie}</div>
      ))}
    </div>
  );
}
```

---

## 🧪 Testing

### API

```bash
pnpm -F api test          # Ejecutar tests
pnpm -F api test:watch   # Watch mode
```

### Frontend

```bash
pnpm -F frontend test          # Ejecutar tests
pnpm -F frontend test:watch   # Watch mode
```

---

## 🔍 Debugging

### VSCode

Crear `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Azure Functions",
      "program": "${workspaceFolder}/apps/api/src/index.ts",
      "preLaunchTask": "build",
      "outFiles": ["${workspaceFolder}/apps/api/dist/**/*.js"]
    }
  ]
}
```

### Console Logs

```typescript
// API
console.log('Info:', { data });    // Logger
console.error('Error:', error);    // Logger

// Frontend
console.log('Debug:', element);    // DevTools
```

---

## 📦 Actualizar Dependencias

```bash
# Ver qué paquetes pueden actualizarse
pnpm outdated

# Actualizar todos los paquetes
pnpm update

# Actualizar paquete específico
pnpm update react@latest
pnpm update -F api express@latest
```

---

## 🔐 Variables de Entorno

### API (.env.local)

```env
# Azure
AZURE_TENANT_ID=xxx
AZURE_CLIENT_ID=xxx
AZURE_CLIENT_SECRET=xxx

# SharePoint
SHAREPOINT_SITE_URL=https://xxx.sharepoint.com/sites/xxx
SHAREPOINT_LIST_ID=xxx

# CSV
CSV_PATH=./data/BBDD.csv
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:7071
VITE_ENV=development
```

---

## 🚀 Deploy

### API a Azure

```bash
cd apps/api
func azure functionapp publish <app-name>
```

### Frontend a vercel/netlify

```bash
cd apps/frontend
pnpm build          # Genera dist/
# Subir dist/ a hosting
```

---

## 📚 Recursos Útiles

- [Monorepo con pnpm](https://pnpm.io/workspaces)
- [Azure Functions CLI](https://learn.microsoft.com/en-us/azure/azure-functions/functions-core-tools-reference)
- [Vite Guide](https://vitejs.dev/)
- [React Hooks](https://react.dev/reference/react)

---

## 💬 Ayuda

¿Dudas? Consulta los siguientes docs:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Estructura del proyecto
- [API.md](./API.md) - Documentación de endpoints
- README.md - Overview general
