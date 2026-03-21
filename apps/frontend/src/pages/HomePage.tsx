import { useEffect, useState } from "react";
import HeaderForm from "../components/HeaderForm";
import MaterialSearch from "../components/MaterialSearch";
import MaterialsTable from "../components/MaterialsTable";
import InterventionInfo from "../components/InterventionInfo";
import type { MaterialLine } from "../types/intervention";
import SoftwareCalibrationSection from "../components/SoftwareCalibrationSection";
import { valoresFamilia } from "../types/valoresFamilia";
import {
  softwarePorFamilia,
  calibracionesPorFamilia
} from "../types/software";

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
  const [seguridadElectrica, setSeguridadElectrica] = useState("OK");

  const [referenciaBusqueda, setReferenciaBusqueda] = useState("");
  const [materiales, setMateriales] = useState<MaterialLine[]>([]);

  const [softwareSeleccionado, setSoftwareSeleccionado] = useState("");
  const [calibrationValues, setCalibrationValues] = useState<
    { nombre: string; valor: string; min?: number | string; max?: number | string }[]
  >([]);

  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = hoy.getFullYear();

  const fechaInput = `${anio}-${mes}-${dia}`;
  const fechaTexto = `${dia}/${mes}/${anio}`;

  const familiasExcel = modelo ? valoresFamilia[modelo] || [] : [];

  const softwareOptions = Array.from(
    new Set(
      familiasExcel.flatMap((familia) => softwarePorFamilia[familia] || [])
    )
  );

  const calibraciones = Array.from(
    new Map(
      familiasExcel
        .flatMap((familia) => calibracionesPorFamilia[familia] || [])
        .map((item) => [item.nombre, item])
    ).values()
  );

  useEffect(() => {
    setSoftwareSeleccionado("");
    setCalibrationValues([]);
  }, [modelo]);

  function setCalibrationValue(nombre: string, valor: string) {
    const calibracion = calibraciones.find((c) => c.nombre === nombre);

    setCalibrationValues((prev) => {
      const existente = prev.find((c) => c.nombre === nombre);

      if (existente) {
        return prev.map((c) =>
          c.nombre === nombre
            ? {
                ...c,
                valor,
                min: calibracion?.min,
                max: calibracion?.max
              }
            : c
        );
      }

      return [
        ...prev,
        {
          nombre,
          valor,
          min: calibracion?.min,
          max: calibracion?.max
        }
      ];
    });
  }

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
      `/api/material?referencia=${encodeURIComponent(
        referenciaBusqueda
      )}&product=${encodeURIComponent(modelo)}`
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
      familiasExcel,
      software: softwareSeleccionado,
      calibracionesJson: calibrationValues,
      descripcionError,
      observaciones,
      seguridadElectrica,
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
      setSeguridadElectrica("OK");
      setReferenciaBusqueda("");
      setSoftwareSeleccionado("");
      setCalibrationValues([]);
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

      <SoftwareCalibrationSection
        softwareOptions={softwareOptions}
        softwareSeleccionado={softwareSeleccionado}
        setSoftwareSeleccionado={setSoftwareSeleccionado}
        calibraciones={calibraciones}
        calibrationValues={calibrationValues}
        setCalibrationValue={setCalibrationValue}
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