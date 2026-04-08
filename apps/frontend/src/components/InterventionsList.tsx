import type { CSSProperties } from "react";
import type { InterventionListItem } from "@ambe/shared";

interface Props {
  items: InterventionListItem[];
  loading: boolean;
  error: string | null;
  numeroSerie: string;
  from: string;
  to: string;
  onNumeroSerieChange: (value: string) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onEdit: (id: string) => void;
}

export default function InterventionsList(props: Props) {
  const {
    items,
    loading,
    error,
    numeroSerie,
    from,
    to,
    onNumeroSerieChange,
    onFromChange,
    onToChange,
    onEdit
  } = props;

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Intervenciones guardadas</h3>

      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <input placeholder="Filtrar por serie" value={numeroSerie} onChange={(e) => onNumeroSerieChange(e.target.value)} />
        <input type="date" value={from} onChange={(e) => onFromChange(e.target.value)} />
        <input type="date" value={to} onChange={(e) => onToChange(e.target.value)} />
      </div>

      {loading && <p>Cargando intervenciones...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && items.length === 0 && <p>No hay intervenciones para los filtros seleccionados.</p>}

      {!loading && !error && items.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "Fecha",
                "Técnico",
                "Serie",
                "Hospital",
                "Tipo",
                "Estado",
                "Acciones"
              ].map((label) => (
                <th key={label} style={cellHeader}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={cell}>{new Date(item.fecha).toLocaleDateString()}</td>
                <td style={cell}>{item.tecnicoNombre}</td>
                <td style={cell}>{item.numeroSerie}</td>
                <td style={cell}>{item.hospital}</td>
                <td style={cell}>{item.tipoIntervencion}</td>
                <td style={cell}>{item.estado}</td>
                <td style={cell}>
                  <button onClick={() => onEdit(item.id)}>Abrir / editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const cellHeader: CSSProperties = {
  border: "1px solid #ddd",
  textAlign: "left",
  padding: "8px",
  backgroundColor: "#f5f5f5"
};

const cell: CSSProperties = {
  border: "1px solid #ddd",
  textAlign: "left",
  padding: "8px"
};
