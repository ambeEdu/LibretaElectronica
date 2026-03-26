/**
 * Error personalizado para la aplicación
 * Permite mensajes de error estructurados y códigos HTTP específicos
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errorCode?: string
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Convierte el error a formato JSON
   */
  toJSON() {
    return {
      errorCode: this.errorCode,
      message: this.message,
      statusCode: this.statusCode,
    };
  }

  /**
   * Errores comunes predefinidos
   */
  static NotFound(message: string) {
    return new AppError(message, 404, "NOT_FOUND");
  }

  static Unauthorized(message: string = "No autorizado") {
    return new AppError(message, 401, "UNAUTHORIZED");
  }

  static BadRequest(message: string) {
    return new AppError(message, 400, "BAD_REQUEST");
  }

  static Forbidden(message: string = "Acceso denegado") {
    return new AppError(message, 403, "FORBIDDEN");
  }

  static Internal(message: string = "Error interno del servidor") {
    return new AppError(message, 500, "INTERNAL_ERROR");
  }

  static Conflict(message: string) {
    return new AppError(message, 409, "CONFLICT");
  }
}
