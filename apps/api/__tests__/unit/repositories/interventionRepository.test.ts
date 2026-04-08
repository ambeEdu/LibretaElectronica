import { describe, expect, it, vi, beforeEach } from "vitest";

const apiMock = {
  expand: vi.fn().mockReturnThis(),
  top: vi.fn().mockReturnThis(),
  get: vi.fn(),
  patch: vi.fn(),
  post: vi.fn()
};

vi.mock("../../../src/services/sharepointClient.js", () => ({
  graphClient: {
    api: vi.fn(() => apiMock)
  }
}));

vi.mock("../../../src/config/env.js", () => ({
  env: {
    sharePointSiteIdLibreta: "site",
    libretaList: "list"
  }
}));

import { getInterventionById, listInterventions, updateIntervention } from "../../../src/repositories/interventionRepository.js";
import { validateUpdate } from "../../../src/handlers/intervencion.js";

describe("interventionRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("listado ok", async () => {
    apiMock.get.mockResolvedValueOnce({
      value: [
        { id: "1", fields: { NumeroSerie: "SN1", Fecha: "2026-04-01", TecnicoNombre: "Ana", Hospital: "H1", TipoIntervencion: "Preventivo", Estado: "Activo" } }
      ]
    });

    const result = await listInterventions({ top: 20, skip: 0 });
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it("detalle 404", async () => {
    apiMock.get.mockRejectedValueOnce({ statusCode: 404 });
    const result = await getInterventionById("99");
    expect(result).toBeNull();
  });

  it("update ok", async () => {
    apiMock.patch.mockResolvedValueOnce({});
    await expect(updateIntervention("3", { observaciones: "ok" })).resolves.toBeUndefined();
  });

  it("update con validación 400", () => {
    expect(validateUpdate({ fecha: "fecha-invalida" })).toContain("formato válido");
  });
});
