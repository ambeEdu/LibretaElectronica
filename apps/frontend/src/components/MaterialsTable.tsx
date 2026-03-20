import type { CSSProperties } from "react";
import type { MaterialLine } from "../types/intervention";

interface MaterialsTableProps {
  materiales: MaterialLine[];
  actualizarCantidad: (referencia: string, cantidad: number) => void;
  eliminarMaterial: (referencia: string) => void;
}

export default function MaterialsTable({
  materiales,
  actualizarCantidad,
  eliminarMaterial
}: MaterialsTableProps) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={thStyle}>Referencia</th>
          <th style={thStyle}>Descripción</th>
          <th style={thStyle}>Cantidad</th>
          <th style={thStyle}>Stock</th>
          <th style={thStyle}>Familia</th>
          <th style={thStyle}></th>
        </tr>
      </thead>

      <tbody>
        {materiales.map((m) => (
          <tr
            key={m.referencia}
            style={{
              backgroundColor: m.stockActual === 0 ? "#fd5e5e" : "white",
              color: m.stockActual === 0 ? "#ffeaee" : "black",
              fontWeight: m.stockActual === 0 ? "bold" : "normal"
            }}
          >
            <td style={tdStyle}>{m.referencia}</td>
            <td style={tdStyle}>{m.descripcion}</td>

            <td style={tdStyle}>
              <input
                type="number"
                min={1}
                value={m.cantidad}
                onChange={(e) =>
                  actualizarCantidad(m.referencia, Number(e.target.value))
                }
                style={{ width: 70 }}
              />
            </td>

            <td style={tdStyle}>{m.stockActual}</td>
            <td style={tdStyle}>{m.familia}</td>

            <td style={tdStyle}>
              <button onClick={() => eliminarMaterial(m.referencia)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle: CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
  background: "#f2f2f2",
  textAlign: "left"
};

const tdStyle: CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px"
};