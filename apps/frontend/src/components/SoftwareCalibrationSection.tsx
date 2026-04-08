interface CalibrationRange {
  nombre: string;
  min: number | string;
  max: number | string;
}

interface CalibrationValue {
  nombre: string;
  valor: string;
}

interface Props {
  softwareOptions: string[];
  softwareSeleccionado: string;
  setSoftwareSeleccionado: (value: string) => void;
  calibraciones: CalibrationRange[];
  calibrationValues: CalibrationValue[];
  setCalibrationValue: (nombre: string, valor: string) => void;
  invalidCalibrationNames: Set<string>;
}

export default function SoftwareCalibrationSection({
  softwareOptions,
  softwareSeleccionado,
  setSoftwareSeleccionado,
  calibraciones,
  calibrationValues,
  setCalibrationValue,
  invalidCalibrationNames
}: Props) {
  return (
    <>
      <h3 style={{ marginTop: 40 }}>Software y calibraciones</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
        <div style={{ display: "grid", gridTemplateColumns: "200px 300px", gap: 10 }}>
          <label>Software</label>
          <select
            value={softwareSeleccionado}
            onChange={(e) => setSoftwareSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un software</option>
            {softwareOptions.map((software) => (
              <option key={software} value={software}>
                {software}
              </option>
            ))}
          </select>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Calibración</th>
              <th style={thStyle}>Mínimo</th>
              <th style={thStyle}>Máximo</th>
              <th style={thStyle}>Valor medido</th>
            </tr>
          </thead>
          <tbody>
            {calibraciones.map((item) => {
              const actual = calibrationValues.find((c) => c.nombre === item.nombre);
              const isInvalid = actual ? invalidCalibrationNames.has(item.nombre) : false;

              return (
                <tr
                  key={item.nombre}
                  style={{ backgroundColor: isInvalid ? "#ffe6e6" : "white" }}
                >
                  <td style={tdStyle}>{item.nombre}</td>
                  <td style={tdStyle}>{item.min}</td>
                  <td style={tdStyle}>{item.max}</td>
                  <td style={tdStyle}>
                    <input
                      value={actual?.valor || ""}
                      onChange={(e) => setCalibrationValue(item.nombre, e.target.value)}
                      style={{
                        borderColor: isInvalid ? "red" : "#ccc",
                        borderWidth: 1,
                        borderStyle: "solid"
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

const thStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
  background: "#f2f2f2",
  textAlign: "left"
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px"
};