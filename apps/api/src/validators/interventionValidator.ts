import { InterventionRequest } from "@ambe/shared";
import { AppError } from "../core/errors/AppError.js";
import { CONSTANTS } from "../core/config/constants.js";

/**
 * Validador para InterventionRequest
 * Valida los datos de una intervención antes de procesarla
 */

export class InterventionValidator {
  /**
   * Valida un objeto InterventionRequest completo
   */
  static validate(intervention: unknown): InterventionRequest {
    if (!intervention || typeof intervention !== "object") {
      throw AppError.BadRequest("La intervención debe ser un objeto válido");
    }

    const data = intervention as Record<string, unknown>;

    // Validaciones de campos requeridos
    this.validateRequiredField(data, "tecnicoEmail", "string");
    this.validateRequiredField(data, "tecnicoNombre", "string");
    this.validateRequiredField(data, "fecha", "string");
    this.validateRequiredField(data, "tipoIntervencion", "string");
    this.validateRequiredField(data, "numeroSerie", "string");
    this.validateRequiredField(data, "hospital", "string");
    this.validateRequiredField(data, "estado", "string");
    this.validateRequiredField(data, "mes", "number");
    this.validateRequiredField(data, "anio", "number");
    this.validateRequiredField(data, "archivado", "boolean");

    // Validaciones específicas
    this.validateEmail(data.tecnicoEmail as string);
    this.validateMonth(data.mes as number);
    this.validateYear(data.anio as number);
    this.validateMaterials(data.materialesJson as unknown);

    return data as unknown as InterventionRequest;
  }

  /**
   * Valida que un campo requerido exista y sea del tipo correcto
   */
  private static validateRequiredField(
    obj: Record<string, unknown>,
    field: string,
    expectedType: string
  ): void {
    if (!(field in obj)) {
      throw AppError.BadRequest(`El campo '${field}' es requerido`);
    }

    if (typeof obj[field] !== expectedType) {
      throw AppError.BadRequest(
        `El campo '${field}' debe ser de tipo ${expectedType}`
      );
    }
  }

  /**
   * Valida formato de email
   */
  private static validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw AppError.BadRequest(`El email '${email}' no es válido`);
    }
  }

  /**
   * Valida el mes (1-12)
   */
  private static validateMonth(month: number): void {
    if (month < 1 || month > 12) {
      throw AppError.BadRequest(`El mes debe estar entre 1 y 12`);
    }
  }

  /**
   * Valida el año (razonable)
   */
  private static validateYear(year: number): void {
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear + 10) {
      throw AppError.BadRequest(
        `El año debe estar entre 1900 y ${currentYear + 10}`
      );
    }
  }

  /**
   * Valida el array de materiales
   */
  private static validateMaterials(materials: unknown): void {
    if (!Array.isArray(materials)) {
      throw AppError.BadRequest("Los materiales deben ser un array");
    }

    materials.forEach((material, index) => {
      if (typeof material !== "object" || material === null) {
        throw AppError.BadRequest(
          `Material en posición ${index} no es válido`
        );
      }

      const m = material as Record<string, unknown>;
      if (typeof m.referencia !== "string") {
        throw AppError.BadRequest(
          `Material ${index}: 'referencia' es requerida`
        );
      }
      if (typeof m.cantidad !== "number" || m.cantidad <= 0) {
        throw AppError.BadRequest(
          `Material ${index}: 'cantidad' debe ser un número positivo`
        );
      }
    });
  }
}
