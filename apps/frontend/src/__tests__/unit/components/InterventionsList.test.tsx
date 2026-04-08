import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import InterventionsList from "../../../components/InterventionsList";

describe("InterventionsList", () => {
  it("render listado", () => {
    const onEdit = vi.fn();
    render(
      <InterventionsList
        items={[{ id: "1", fecha: "2026-04-08", tecnicoNombre: "Ana", numeroSerie: "SN1", hospital: "H", tipoIntervencion: "Preventivo", estado: "Activo" }]}
        loading={false}
        error={null}
        numeroSerie=""
        from=""
        to=""
        onNumeroSerieChange={() => {}}
        onFromChange={() => {}}
        onToChange={() => {}}
        onEdit={onEdit}
      />
    );

    expect(screen.getByText("SN1")).toBeTruthy();
    fireEvent.click(screen.getByText("Abrir / editar"));
    expect(onEdit).toHaveBeenCalledWith("1");
  });
});
