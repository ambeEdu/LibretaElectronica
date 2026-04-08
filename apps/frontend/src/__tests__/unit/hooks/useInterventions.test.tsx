import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useInterventions } from "../../../hooks/useInterventions";

const serviceMock = {
  list: vi.fn(),
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn()
};

vi.mock("../../../services/interventionService", () => ({
  interventionService: serviceMock
}));

describe("useInterventions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("flujo editar + guardar + refresco", async () => {
    serviceMock.list.mockResolvedValue({ items: [{ id: "1" }], total: 1, top: 100, skip: 0 });
    serviceMock.getById.mockResolvedValue({ id: "1", fecha: "2026-04-08", tecnicoNombre: "Ana", tipoIntervencion: "Preventivo", numeroSerie: "SN", hospital: "H", estado: "A", materialesJson: [], mes: 4, anio: 2026, archivado: false });
    serviceMock.update.mockResolvedValue({ ok: true, id: "1" });

    const { result } = renderHook(() => useInterventions({}));
    await waitFor(() => expect(result.current.items.length).toBe(1));
    await result.current.update("1", { observaciones: "nuevo" });
    expect(serviceMock.list).toHaveBeenCalledTimes(2);
  });

  it("error de actualización", async () => {
    serviceMock.list.mockResolvedValue({ items: [], total: 0, top: 100, skip: 0 });
    serviceMock.update.mockRejectedValue(new Error("403"));
    const { result } = renderHook(() => useInterventions({}));
    await waitFor(() => expect(result.current.loading).toBe(false));
    await expect(result.current.update("1", { observaciones: "x" })).rejects.toThrow("403");
  });
});
