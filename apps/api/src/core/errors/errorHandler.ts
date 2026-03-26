import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { AppError } from "./AppError";

/**
 * Manejador centralizado de errores para Azure Functions
 * Convierte excepciones en respuestas HTTP estructuradas
 */

export function handleError(error: unknown): HttpResponseInit {
  console.error("Error capturado:", error);

  // Si es un AppError conocido
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      jsonBody: {
        ok: false,
        errorCode: error.errorCode,
        message: error.message,
      },
    };
  }

  // Si es un Error de JavaScript
  if (error instanceof Error) {
    return {
      status: 500,
      jsonBody: {
        ok: false,
        errorCode: "INTERNAL_ERROR",
        message: error.message || "Error interno del servidor",
      },
    };
  }

  // Fallback para errores desconocidos
  return {
    status: 500,
    jsonBody: {
      ok: false,
      errorCode: "UNKNOWN_ERROR",
      message: "Error desconocido",
    },
  };
}

/**
 * Middleware de error para envolver funciones de Azure
 */
export function withErrorHandling<T extends HttpResponseInit>(
  handler: (req: HttpRequest) => Promise<T>
) {
  return async (req: HttpRequest): Promise<T | HttpResponseInit> => {
    try {
      return await handler(req);
    } catch (error) {
      return handleError(error);
    }
  };
}
