import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import InterventionForm from "../../../components/InterventionForm";

describe("InterventionForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("caso de calibración inválida en edición", async () => {
    const fetchMock = vi.spyOn(global, "fetch" as never).mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("valores-familia")) {
        return Promise.resolve(new Response(JSON.stringify({ "Modelo X": ["Fam1"] })));
      }
      if (url.includes("software-por-familia")) {
        return Promise.resolve(new Response(JSON.stringify({ Fam1: ["v1"] })));
      }
      if (url.includes("calibraciones-por-familia")) {
        return Promise.resolve(new Response(JSON.stringify({ Fam1: [{ nombre: "Presión", min: 1, max: 2 }] })));
      }
      return Promise.resolve(new Response(JSON.stringify({ found: false })));
    });

    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <InterventionForm
        mode="edit"
        submitLabel="Guardar"
        onSubmit={onSubmit}
        initialData={{
          id: "1",
          tecnicoNombre: "Ana",
          fecha: "2026-04-08T00:00:00.000Z",
          tipoIntervencion: "Preventivo",
          numeroSerie: "SN1",
          hospital: "H1",
          estado: "Activo",
          modelo: "Modelo X",
          materialesJson: [],
          calibracionesJson: [],
          mes: 4,
          anio: 2026,
          archivado: false
        }}
      />
    );

    await waitFor(() => expect(screen.getByText("Presión")).toBeTruthy());

    const inputs = screen.getAllByRole("textbox");
    const calibrationInput = inputs[inputs.length - 1];
    fireEvent.change(calibrationInput, { target: { value: "10" } });

    fireEvent.click(screen.getByText("Guardar"));
    expect(alertSpy).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
    fetchMock.mockRestore();
  });
});
