import { useState } from "react";
import HeaderForm from "../components/HeaderForm";
import MaterialSearch from "../components/MaterialSearch";
import MaterialsTable from "../components/MaterialsTable";
import InterventionInfo from "../components/InterventionInfo";
import type { MaterialLine } from "../types/intervention";

export default function HomePage() {
  const [numeroSerie, setNumeroSerie] = useState("");
  const [hospital, setHospital] = useState("");
  const [estado, setEstado] = useState("");
  const [modelo, setModelo] = useState("");

  const [tecnicoNombre, setTecnicoNombre] = useState("");
  const [tipoIntervencion, setTipoIntervencion] = useState("");
  const [numeroInventario, setNumeroInventario] = useState("");
  const [numeroParte, setNumeroParte] = useState("");

  const [descripcionError, setDescripcionError] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [referenciaBusqueda, setReferenciaBusqueda] = useState("");
  const [materiales, setMateriales] = useState<MaterialLine[]>([]);

  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = hoy.getFullYear();

  const fechaInput = `${anio}-${mes}-${dia}`;
  const fechaTexto = `${dia}/${mes}/${anio}`;

  const [seguridadElectrica, setSeguridadElectrica] = useState("OK");

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

  async function agregarMaterial() {
    if (!referenciaBusqueda) return;

    if (!modelo) {
      alert("Primero debes buscar un equipo válido");
      return;
    }

    const res = await fetch(
      `/api/material?referencia=${encodeURIComponent(referenciaBusqueda)}&product=${encodeURIComponent(modelo)}`
    );

    const data = await res.json();

    if (!data.found) {
      alert("Referencia no encontrada o no válida para este equipo");
      return;
    }

    const existente = materiales.find((m) => m.referencia === data.referencia);

    if (existente) {
      setMateriales((prev) =>
        prev.map((m) =>
          m.referencia === data.referencia
            ? { ...m, cantidad: m.cantidad + 1 }
            : m
        )
      );
    } else {
      setMateriales((prev) => [
        ...prev,
        {
          referencia: data.referencia,
          descripcion: data.descripcion,
          cantidad: 1,
          stockActual: data.stockActual,
          familia: data.familia
        }
      ]);
    }

    setReferenciaBusqueda("");
  }

  function actualizarCantidad(referencia: string, cantidad: number) {
    setMateriales((prev) =>
      prev.map((m) => (m.referencia === referencia ? { ...m, cantidad } : m))
    );
  }

  function eliminarMaterial(referencia: string) {
    setMateriales((prev) => prev.filter((m) => m.referencia !== referencia));
  }

  async function guardarIntervencion() {
    if (!tipoIntervencion) {
      alert("Debes seleccionar un tipo de intervención");
      return;
    }

    const payload = {
      tecnicoNombre,
      fecha: fechaTexto,
      tipoIntervencion,
      numeroSerie,
      hospital,
      estado,
      numeroInventario,
      numeroParte,
      modelo,
      descripcionError,
      observaciones,
      seguridadElectrica: "OK",
      materialesJson: materiales,
      mes,
      anio,
      archivado: false,
      fechaArchivado: null
    };

    const res = await fetch("/api/intervencion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Intervención guardada");
      setMateriales([]);
      setNumeroSerie("");
      setHospital("");
      setEstado("");
      setModelo("");
      setTecnicoNombre("");
      setTipoIntervencion("");
      setNumeroInventario("");
      setNumeroParte("");
      setDescripcionError("");
      setObservaciones("");
      setReferenciaBusqueda("");
    } else {
      alert("Error guardando intervención");
    }
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>Libreta electrónica</h2>

      <HeaderForm
        numeroSerie={numeroSerie}
        setNumeroSerie={setNumeroSerie}
        hospital={hospital}
        estado={estado}
        modelo={modelo}
        tecnicoNombre={tecnicoNombre}
        setTecnicoNombre={setTecnicoNombre}
        fecha={fechaInput}
        tipoIntervencion={tipoIntervencion}
        setTipoIntervencion={setTipoIntervencion}
        numeroInventario={numeroInventario}
        setNumeroInventario={setNumeroInventario}
        numeroParte={numeroParte}
        setNumeroParte={setNumeroParte}
        buscarEquipo={buscarEquipo}
      />

      <MaterialSearch
        referenciaBusqueda={referenciaBusqueda}
        setReferenciaBusqueda={setReferenciaBusqueda}
        agregarMaterial={agregarMaterial}
      />

      <MaterialsTable
        materiales={materiales}
        actualizarCantidad={actualizarCantidad}
        eliminarMaterial={eliminarMaterial}
      />

      <InterventionInfo
        descripcionError={descripcionError}
        setDescripcionError={setDescripcionError}
        observaciones={observaciones}
        setObservaciones={setObservaciones}
        seguridadElectrica={seguridadElectrica}
        setSeguridadElectrica={setSeguridadElectrica}
      />

      <button onClick={guardarIntervencion} style={{ marginTop: 30 }}>
        Guardar intervención
      </button>
    </div>
  );
}