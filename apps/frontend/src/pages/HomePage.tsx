import { useState } from "react";

export default function HomePage() {
  const [numeroSerie, setNumeroSerie] = useState("");
  const [hospital, setHospital] = useState("");
  const [estado, setEstado] = useState("");
  const [modelo, setModelo] = useState("");

  async function buscarEquipo() {
    if (!numeroSerie) return;

    const res = await fetch(`/api/equipo?serie=${encodeURIComponent(numeroSerie)}`);
    const data = await res.json();

    if (data.found) {
      setHospital(data.hospital || "");
      setEstado(data.estado || "");
      setModelo(data.modelo || "");
    } else {
      setHospital("");
      setEstado("");
      setModelo("");
      alert("Equipo no encontrado");
    }
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial, sans-serif" }}>
      <h2>Libreta electrónica</h2>

      <div style={{ display: "grid", gridTemplateColumns: "200px 300px", gap: 10 }}>
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
      </div>
    </div>
  );
}