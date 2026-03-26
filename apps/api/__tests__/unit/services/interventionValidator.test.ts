/**
 * Ejemplo de test unitario para un servicio
 * NOTA: Requiere configurar Jest o Vitest en package.json
 */

import { describe, it, expect } from "vitest";
import { InterventionValidator } from "../../src/validators/interventionValidator";
import { AppError } from "../../src/core/errors/AppError";
import { mockInterventionRequest } from "../fixtures/interventionFixtures";

describe("InterventionValidator", () => {
  it("debe validar una intervención correcta", () => {
    const result = InterventionValidator.validate(mockInterventionRequest);
    expect(result).toEqual(mockInterventionRequest);
  });

  it("debe lanzar error si falta email", () => {
    const invalid = { ...mockInterventionRequest };
    delete (invalid as Partial<typeof invalid>).tecnicoEmail;

    expect(() => {
      InterventionValidator.validate(invalid);
    }).toThrow(AppError);
  });

  it("debe lanzar error si email es inválido", () => {
    const invalid = {
      ...mockInterventionRequest,
      tecnicoEmail: "invalid-email",
    };

    expect(() => {
      InterventionValidator.validate(invalid);
    }).toThrow(AppError);
  });

  it("debe lanzar error si mes está fuera de rango", () => {
    const invalid = { ...mockInterventionRequest, mes: 13 };

    expect(() => {
      InterventionValidator.validate(invalid);
    }).toThrow(AppError);
  });
});
