import { interventionTypes } from "../types/intervention";

interface HeaderFormProps {
  numeroSerie: string;
  setNumeroSerie: (value: string) => void;
  hospital: string;
  estado: string;
  modelo: string;
  tecnicoNombre: string;
  setTecnicoNombre: (value: string) => void;
  fecha: string;
  tipoIntervencion: string;
  setTipoIntervencion: (value: string) => void;
  numeroInventario: string;
  setNumeroInventario: (value: string) => void;
  numeroParte: string;
  setNumeroParte: (value: string) => void;
  buscarEquipo: () => void;
}

export default function HeaderForm({
  numeroSerie,
  setNumeroSerie,
  hospital,
  estado,
  modelo,
  tecnicoNombre,
  setTecnicoNombre,
  fecha,
  tipoIntervencion,
  setTipoIntervencion,
  numeroInventario,
  setNumeroInventario,
  numeroParte,
  setNumeroParte,
  buscarEquipo
}: HeaderFormProps) {
  return (
    <>
      <h3>Cabecera</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 300px",
          gap: 10,
          marginBottom: 30
        }}
      >
        <label>Nº Serie</label>
        <input
          value={numeroSerie}
          onChange={(e) => setNumeroSerie(e.target.value)}
          onBlur={buscarEquipo}
        />

        <label>Hospital</label>
        <input value={hospital} readOnly />

        <label>Estado</label>
        <input value={estado} readOnly />

        <label>Modelo</label>
        <input value={modelo} readOnly />

        <label>Técnico</label>
        <input
          value={tecnicoNombre}
          onChange={(e) => setTecnicoNombre(e.target.value)}
        />

        <label>Fecha</label>
        <input type="date" value={fecha} readOnly />

        <label>Tipo intervención</label>
        <select
          value={tipoIntervencion}
          onChange={(e) => setTipoIntervencion(e.target.value)}
        >
          <option value="">Selecciona un tipo</option>
          {interventionTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label>Nº Inventario</label>
        <input
          value={numeroInventario}
          onChange={(e) => setNumeroInventario(e.target.value)}
        />

        <label>Nº Parte</label>
        <input
          value={numeroParte}
          onChange={(e) => setNumeroParte(e.target.value)}
        />
      </div>
    </>
  );
}