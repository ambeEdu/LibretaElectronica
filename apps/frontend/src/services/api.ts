/**
 * Cliente API centralizado
 * Configuración base para todas las peticiones HTTP
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:7071";

interface ApiOptions extends RequestInit {
  timeout?: number;
}

/**
 * Realiza una petición HTTP con manejo de errores centralizado
 */
async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { timeout = 30000, ...requestOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...requestOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(requestOptions.headers || {}),
      },
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Error desconocido" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  get: <T,>(endpoint: string, options?: ApiOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T,>(endpoint: string, data?: unknown, options?: ApiOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T,>(endpoint: string, data?: unknown, options?: ApiOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T,>(endpoint: string, options?: ApiOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};

export { API_BASE_URL };
