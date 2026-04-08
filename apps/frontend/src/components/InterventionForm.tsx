import { useEffect, useMemo, useState } from "react";
import type { InterventionDetail, InterventionRequest } from "@ambe/shared";
import HeaderForm from "./HeaderForm";
import InterventionInfo from "./InterventionInfo";
import MaterialSearch from "./MaterialSearch";
import MaterialsTable from "./MaterialsTable";
import SoftwareCalibrationSection from "./SoftwareCalibrationSection";
import type { MaterialLine } from "../types/intervention";

interface CalibrationRange {
  nombre: string;
  min: number | string;
  max: number | string;
}

interface CalibrationValue {
  nombre: string;
  valor: string;
  min?: number | string;
  max?: number | string;
}

interface Props {
  mode: "create" | "edit";
  initialData?: InterventionDetail;
  onSubmit: (payload: InterventionRequest) => Promise<void>;
  submitLabel: string;
  readOnly?: boolean;
}

const dateParts = (value?: string) => {
  const source = value ? new Date(value) : new Date();
  const day = String(source.getDate()).padStart(2, "0");
  const month = String(source.getMonth() + 1).padStart(2, "0");
  const year = source.getFullYear();
  return { day, month, year, input: `${year}-${month}-${day}` };
};

export default function InterventionForm({ mode, initialData, onSubmit, submitLabel, readOnly = false }: Props) {
  const initialDate = dateParts(initialData?.fecha);

  const [numeroSerie, setNumeroSerie] = useState(initialData?.numeroSerie ?? "");
  const [hospital, setHospital] = useState(initialData?.hospital ?? "");
  const [estado, setEstado] = useState(initialData?.estado ?? "");
  const [modelo, setModelo] = useState(initialData?.modelo ?? "");
  const [tecnicoNombre, setTecnicoNombre] = useState(initialData?.tecnicoNombre ?? "");
  const [tipoIntervencion, setTipoIntervencion] = useState(initialData?.tipoIntervencion ?? "");
  const [numeroInventario, setNumeroInventario] = useState(initialData?.numeroInventario ?? "");
  const [numeroParte, setNumeroParte] = useState(initialData?.numeroParte ?? "");
  const [descripcionError, setDescripcionError] = useState(initialData?.descripcionError ?? "");
  const [observaciones, setObservaciones] = useState(initialData?.observaciones ?? "");
  const [seguridadElectrica, setSeguridadElectrica] = useState(initialData?.seguridadElectrica ?? "OK");
  const [referenciaBusqueda, setReferenciaBusqueda] = useState("");
  const [materiales, setMateriales] = useState<MaterialLine[]>(
    (initialData?.materialesJson ?? []).map((item) => ({ ...item, stockActual: 0 }))
  );
  const [softwareSeleccionado, setSoftwareSeleccionado] = useState(initialData?.software ?? "");
  const [calibrationValues, setCalibrationValues] = useState<CalibrationValue[]>(initialData?.calibracionesJson ?? []);

  const [valoresFamilia, setValoresFamilia] = useState<Record<string, string[]>>({});
  const [softwarePorFamilia, setSoftwarePorFamilia] = useState<Record<string, string[]>>({});
  const [calibracionesPorFamilia, setCalibracionesPorFamilia] = useState<Record<string, CalibrationRange[]>>({});

  useEffect(() => {
    const loadData = async () => {
      const [valoresRes, softwareRes, calibracionesRes] = await Promise.all([
        fetch("/api/valores-familia"),
        fetch("/api/software-por-familia"),
        fetch("/api/calibraciones-por-familia")
      ]);
      if (valoresRes.ok) setValoresFamilia(await valoresRes.json());
      if (softwareRes.ok) setSoftwarePorFamilia(await softwareRes.json());
      if (calibracionesRes.ok) setCalibracionesPorFamilia(await calibracionesRes.json());
    };

    void loadData();
  }, []);

  const familiasExcel = modelo ? valoresFamilia[modelo] || [] : [];
  const softwareOptions = useMemo(
    () => Array.from(new Set(familiasExcel.flatMap((familia) => softwarePorFamilia[familia] || []))),
    [familiasExcel, softwarePorFamilia]
  );

  const calibraciones = useMemo(
    () =>
      Array.from(
        new Map(
          familiasExcel.flatMap((familia) => calibracionesPorFamilia[familia] || []).map((item) => [item.nombre, item])
        ).values()
      ),
    [familiasExcel, calibracionesPorFamilia]
  );

  function parseCalibrationNumber(value: string | number | undefined): number | null {
    if (value === undefined || value === null) return null;
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  const invalidCalibrationNames = new Set(
    calibrationValues
      .filter((value) => {
        const valNum = parseCalibrationNumber(value.valor);
        const minNum = parseCalibrationNumber(value.min);
        const maxNum = parseCalibrationNumber(value.max);
        if (!value.valor.trim() || valNum === null || minNum === null || maxNum === null) {
          return false;
        }
        return valNum < minNum || valNum > maxNum;
      })
      .map((item) => item.nombre)
  );

  const hasInvalidCalibration = invalidCalibrationNames.size > 0;

  function setCalibrationValue(nombre: string, valor: string) {
    const calibracion = calibraciones.find((c) => c.nombre === nombre);

    setCalibrationValues((prev) => {
      const existing = prev.find((c) => c.nombre === nombre);
      if (existing) {
        return prev.map((c) =>
          c.nombre === nombre ? { ...c, valor, min: calibracion?.min, max: calibracion?.max } : c
        );
      }
      return [...prev, { nombre, valor, min: calibracion?.min, max: calibracion?.max }];
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
      alert("Equipo no encontrado");
    }
  }

  async function agregarMaterial() {
    if (!referenciaBusqueda || !modelo) return;

    const res = await fetch(
      `/api/material?referencia=${encodeURIComponent(referenciaBusqueda)}&product=${encodeURIComponent(modelo)}`
    );
    const data = await res.json();

    if (!data.found) {
      alert("Referencia no encontrada o no válida para este equipo");
      return;
    }

    const existing = materiales.find((m) => m.referencia === data.referencia);
    if (existing) {
      setMateriales((prev) => prev.map((m) => (m.referencia === data.referencia ? { ...m, cantidad: m.cantidad + 1 } : m)));
    } else {
      setMateriales((prev) => [...prev, { referencia: data.referencia, descripcion: data.descripcion, cantidad: 1, stockActual: data.stockActual }]);
    }
    setReferenciaBusqueda("");
  }

  async function handleSubmit() {
    if (hasInvalidCalibration) {
      alert("No puedes guardar con valores de calibración fuera de los márgenes mínimos o máximos.");
      return;
    }

    const payload: InterventionRequest = {
      tecnicoNombre,
      fecha: initialData?.fecha ?? new Date().toISOString(),
      tipoIntervencion,
      numeroSerie,
      hospital,
      estado,
      numeroInventario,
      numeroParte,
      modelo,
      software: softwareSeleccionado,
      calibracionesJson: calibrationValues,
      descripcionError,
      observaciones,
      seguridadElectrica,
      materialesJson: materiales.map(({ stockActual: _stock, familia: _familia, ...rest }) => rest),
      mes: Number(initialDate.month),
      anio: initialDate.year,
      archivado: initialData?.archivado ?? false,
      fechaArchivado: initialData?.fechaArchivado ?? null
    };

    await onSubmit(payload);
    if (mode === "create") {
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
      setMateriales([]);
    }
  }

  return (
    <div style={{ opacity: readOnly ? 0.75 : 1 }}>
      <HeaderForm
        numeroSerie={numeroSerie}
        setNumeroSerie={setNumeroSerie}
        hospital={hospital}
        estado={estado}
        modelo={modelo}
        tecnicoNombre={tecnicoNombre}
        setTecnicoNombre={setTecnicoNombre}
        fecha={initialDate.input}
        tipoIntervencion={tipoIntervencion}
        setTipoIntervencion={setTipoIntervencion}
        numeroInventario={numeroInventario}
        setNumeroInventario={setNumeroInventario}
        numeroParte={numeroParte}
        setNumeroParte={setNumeroParte}
        buscarEquipo={buscarEquipo}
      />

      <MaterialSearch referenciaBusqueda={referenciaBusqueda} setReferenciaBusqueda={setReferenciaBusqueda} agregarMaterial={agregarMaterial} />
      <MaterialsTable
        materiales={materiales}
        actualizarCantidad={(referencia, cantidad) => setMateriales((prev) => prev.map((m) => (m.referencia === referencia ? { ...m, cantidad } : m)))}
        eliminarMaterial={(referencia) => setMateriales((prev) => prev.filter((m) => m.referencia !== referencia))}
      />

      <SoftwareCalibrationSection
        softwareOptions={softwareOptions}
        softwareSeleccionado={softwareSeleccionado}
        setSoftwareSeleccionado={setSoftwareSeleccionado}
        calibraciones={calibraciones}
        calibrationValues={calibrationValues}
        setCalibrationValue={setCalibrationValue}
        invalidCalibrationNames={invalidCalibrationNames}
      />

      <InterventionInfo
        descripcionError={descripcionError}
        setDescripcionError={setDescripcionError}
        observaciones={observaciones}
        setObservaciones={setObservaciones}
        seguridadElectrica={seguridadElectrica}
        setSeguridadElectrica={setSeguridadElectrica}
      />

      <button onClick={() => void handleSubmit()} disabled={hasInvalidCalibration || readOnly} style={{ marginTop: 24 }}>
        {submitLabel}
      </button>
    </div>
  );
}
