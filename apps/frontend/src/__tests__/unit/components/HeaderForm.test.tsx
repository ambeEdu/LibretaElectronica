/**
 * Ejemplo de test para un componente React
 * NOTA: Requiere configurar Vitest y React Testing Library
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// import { HeaderForm } from "../../src/components/HeaderForm";

describe("HeaderForm", () => {
  it("debe renderizar el formulario", () => {
    // render(<HeaderForm />);
    // expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("debe mostrar error si email es inválido", async () => {
    // const user = userEvent.setup();
    // render(<HeaderForm />);

    // const input = screen.getByPlaceholderText("Email");
    // await user.type(input, "invalid-email");
    // await user.click(screen.getByRole("button", { name: /enviar/i }));

    // expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
  });
});
