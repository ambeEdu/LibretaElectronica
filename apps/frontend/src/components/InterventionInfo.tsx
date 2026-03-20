interface InterventionInfoProps {
  descripcionError: string;
  setDescripcionError: (value: string) => void;
  observaciones: string;
  setObservaciones: (value: string) => void;
  seguridadElectrica: string;
  setSeguridadElectrica: (value: string) => void;
}

export default function InterventionInfo({
  descripcionError,
  setDescripcionError,
  observaciones,
  setObservaciones,
  seguridadElectrica,
  setSeguridadElectrica
}: InterventionInfoProps) {
  return (
    <>
      <h3 style={{ marginTop: 40 }}>Información intervención</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxWidth: 600
        }}
      >
        <label>Descripción error</label>
        <textarea
          value={descripcionError}
          onChange={(e) => setDescripcionError(e.target.value)}
        />

        <label>Observaciones</label>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />

        <label>Seguridad eléctrica</label>
        <select
          value={seguridadElectrica}
          onChange={(e) => setSeguridadElectrica(e.target.value)}
        >
          <option value="OK">OK</option>
          <option value="No OK">No OK</option>
        </select>
      </div>
    </>
  );
}