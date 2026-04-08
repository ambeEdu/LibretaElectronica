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


  it("detalle parsea referencias legacy", async () => {
    apiMock.get.mockResolvedValueOnce({
      id: "7",
      fields: {
        NumeroSerie: "SN7",
        Fecha: "2026-04-07",
        TecnicoNombre: "Luis",
        Hospital: "H7",
        TipoIntervencion: "Correctivo",
        Estado: "Activo",
        MaterialesJson: JSON.stringify([
          { Referencia: "REF-1", Descripcion: "Cable", Cantidad: "2" },
          { reference: "REF-2", description: "Sensor", quantity: 1 }
        ])
      }
    });

    const result = await getInterventionById("7");
    expect(result?.materialesJson).toEqual([
      { referencia: "REF-1", descripcion: "Cable", cantidad: 2 },
      { referencia: "REF-2", descripcion: "Sensor", cantidad: 1 }
    ]);
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
