import type {
  InterventionDetail,
  InterventionListItem,
  InterventionRequest,
  InterventionUpdateRequest,
  MaterialLine,
  CalibrationValue
} from "@ambe/shared";
import { graphClient } from "../services/sharepointClient.js";
import { env } from "../config/env.js";

interface ListParams {
  numeroSerie?: string;
  from?: string;
  to?: string;
  top: number;
  skip: number;
}

interface SharePointFields {
  Title?: string;
  TecnicoNombre?: string;
  Fecha?: string;
  TipoIntervencion?: string;
  NumeroSerie?: string;
  Hospital?: string;
  Estado?: string;
  NumeroInventario?: string;
  NumeroParte?: string;
  Modelo?: string;
  Software?: string;
  DescripcionError?: string;
  Observaciones?: string;
  SeguridadElectrica?: string;
  CalibracionesJson?: string;
  MaterialesJson?: string;
  Mes?: number;
  A_x00f1_o?: number;
  Archivado?: boolean;
  FechaArchivado?: string | null;
}

interface SharePointItem {
  id: string;
  fields: SharePointFields;
}

const INTERVENTION_FIELDS = [
  "Title",
  "TecnicoNombre",
  "Fecha",
  "TipoIntervencion",
  "NumeroSerie",
  "Hospital",
  "Estado",
  "NumeroInventario",
  "NumeroParte",
  "Modelo",
  "Software",
  "DescripcionError",
  "Observaciones",
  "SeguridadElectrica",
  "CalibracionesJson",
  "MaterialesJson",
  "Mes",
  "A_x00f1_o",
  "Archivado",
  "FechaArchivado"
].join(",");

function normalizeCalibraciones(value: unknown): CalibrationValue[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
      .map((item) => ({
        nombre: typeof item.nombre === "string" ? item.nombre : "",
        valor: typeof item.valor === "string" ? item.valor : ""
      }))
      .filter((item) => item.nombre);
  }

  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).map(([nombre, valor]) => ({
      nombre,
      valor: typeof valor === "string" ? valor : String(valor ?? "")
    }));
  }

  return [];
}

function parseCalibraciones(raw: string | undefined): CalibrationValue[] {
  if (!raw) return [];
  try {
    return normalizeCalibraciones(JSON.parse(raw));
  } catch {
    return [];
  }
}

function parseMateriales(raw: string | undefined): MaterialLine[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    if (parsed.every((item) => typeof item === "string")) {
      return (parsed as string[]).map((item) => {
        const [left, right = ""] = item.split(":");
        const [referencia = "", descripcion = ""] = left.split(" - ");
        const cantidadMatch = right.match(/(\d+)/);
        return {
          referencia: referencia.trim(),
          descripcion: descripcion.trim(),
          cantidad: cantidadMatch ? Number(cantidadMatch[1]) : 0
        };
      });
    }

    const getString = (item: Record<string, unknown>, keys: string[]): string => {
      for (const key of keys) {
        if (typeof item[key] === "string") {
          return String(item[key]).trim();
        }
      }
      return "";
    };

    const getNumber = (item: Record<string, unknown>, keys: string[]): number => {
      for (const key of keys) {
        const value = item[key];
        if (typeof value === "number") return value;
        if (typeof value === "string" && value.trim()) {
          const parsedValue = Number(value);
          if (Number.isFinite(parsedValue)) {
            return parsedValue;
          }
        }
      }
      return 0;
    };

    return parsed
      .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
      .map((item) => ({
        referencia: getString(item, ["referencia", "Referencia", "reference", "Reference"]),
        descripcion: getString(item, ["descripcion", "Descripcion", "description", "Description"]),
        cantidad: getNumber(item, ["cantidad", "Cantidad", "qty", "Qty", "quantity", "Quantity"])
      }))
      .filter((item) => item.referencia);
  } catch {
    return [];
  }
}

function toDetail(item: SharePointItem): InterventionDetail {
  const fields = item.fields;

  return {
    id: item.id,
    tecnicoNombre: fields.TecnicoNombre ?? "",
    fecha: fields.Fecha ?? "",
    tipoIntervencion: fields.TipoIntervencion ?? "",
    numeroSerie: fields.NumeroSerie ?? fields.Title ?? "",
    hospital: fields.Hospital ?? "",
    estado: fields.Estado ?? "",
    numeroInventario: fields.NumeroInventario ?? "",
    numeroParte: fields.NumeroParte ?? "",
    modelo: fields.Modelo ?? "",
    software: fields.Software ?? "",
    descripcionError: fields.DescripcionError ?? "",
    observaciones: fields.Observaciones ?? "",
    seguridadElectrica: fields.SeguridadElectrica ?? "",
    calibracionesJson: parseCalibraciones(fields.CalibracionesJson),
    materialesJson: parseMateriales(fields.MaterialesJson),
    mes: Number(fields.Mes ?? 0),
    anio: Number(fields.A_x00f1_o ?? 0),
    archivado: Boolean(fields.Archivado),
    fechaArchivado: fields.FechaArchivado ?? null
  };
}

function toListItem(item: SharePointItem): InterventionListItem {
  const detail = toDetail(item);
  return {
    id: detail.id,
    fecha: detail.fecha,
    tecnicoNombre: detail.tecnicoNombre,
    numeroSerie: detail.numeroSerie,
    hospital: detail.hospital,
    tipoIntervencion: detail.tipoIntervencion,
    estado: detail.estado
  };
}

function toSharePointFields(input: InterventionRequest | InterventionUpdateRequest): SharePointFields {
  const fields: SharePointFields = {};

  if (input.numeroSerie !== undefined) {
    fields.Title = input.numeroSerie;
    fields.NumeroSerie = input.numeroSerie;
  }
  if (input.tecnicoNombre !== undefined) fields.TecnicoNombre = input.tecnicoNombre;
  if (input.fecha !== undefined) fields.Fecha = input.fecha;
  if (input.tipoIntervencion !== undefined) fields.TipoIntervencion = input.tipoIntervencion;
  if (input.hospital !== undefined) fields.Hospital = input.hospital;
  if (input.estado !== undefined) fields.Estado = input.estado;
  if (input.numeroInventario !== undefined) fields.NumeroInventario = input.numeroInventario || "";
  if (input.numeroParte !== undefined) fields.NumeroParte = input.numeroParte || "";
  if (input.modelo !== undefined) fields.Modelo = input.modelo || "";
  if (input.software !== undefined) fields.Software = input.software || "";
  if (input.descripcionError !== undefined) fields.DescripcionError = input.descripcionError || "";
  if (input.observaciones !== undefined) fields.Observaciones = input.observaciones || "";
  if (input.seguridadElectrica !== undefined) fields.SeguridadElectrica = input.seguridadElectrica || "";
  if (input.calibracionesJson !== undefined) fields.CalibracionesJson = JSON.stringify(input.calibracionesJson);
  if (input.materialesJson !== undefined) fields.MaterialesJson = JSON.stringify(input.materialesJson);
  if (input.mes !== undefined) fields.Mes = input.mes;
  if (input.anio !== undefined) fields.A_x00f1_o = input.anio;
  if (input.archivado !== undefined) fields.Archivado = input.archivado;
  if (input.fechaArchivado !== undefined) fields.FechaArchivado = input.fechaArchivado;

  return fields;
}

async function listAllItems(): Promise<SharePointItem[]> {
  const result = await graphClient
    .api(`/sites/${env.sharePointSiteIdLibreta}/lists/${env.libretaList}/items`)
    .expand(`fields($select=${INTERVENTION_FIELDS})`)
    .top(5000)
    .get();

  return (result.value ?? []) as SharePointItem[];
}

export async function saveIntervention(input: InterventionRequest): Promise<string> {
  const result = await graphClient
    .api(`/sites/${env.sharePointSiteIdLibreta}/lists/${env.libretaList}/items`)
    .post({
      fields: toSharePointFields(input)
    });

  return String(result.id);
}

export async function listInterventions(params: ListParams): Promise<{ items: InterventionListItem[]; total: number }> {
  const allItems = await listAllItems();

  const filtered = allItems.filter((item) => {
    const detail = toDetail(item);

    if (params.numeroSerie && !detail.numeroSerie.toLowerCase().includes(params.numeroSerie.toLowerCase())) {
      return false;
    }

    if (params.from && detail.fecha && new Date(detail.fecha) < new Date(params.from)) {
      return false;
    }

    if (params.to && detail.fecha && new Date(detail.fecha) > new Date(params.to)) {
      return false;
    }

    return true;
  });

  const ordered = filtered.sort((a, b) => {
    const aDate = new Date(a.fields.Fecha ?? 0).getTime();
    const bDate = new Date(b.fields.Fecha ?? 0).getTime();
    return bDate - aDate;
  });

  const paged = ordered.slice(params.skip, params.skip + params.top).map(toListItem);

  return {
    items: paged,
    total: filtered.length
  };
}

export async function getInterventionById(id: string): Promise<InterventionDetail | null> {
  try {
    const result = (await graphClient
      .api(`/sites/${env.sharePointSiteIdLibreta}/lists/${env.libretaList}/items/${id}`)
      .expand(`fields($select=${INTERVENTION_FIELDS})`)
      .get()) as SharePointItem;

    return toDetail(result);
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode;
    if (statusCode === 404) {
      return null;
    }
    throw error;
  }
}

export async function updateIntervention(id: string, input: InterventionUpdateRequest): Promise<void> {
  await graphClient
    .api(`/sites/${env.sharePointSiteIdLibreta}/lists/${env.libretaList}/items/${id}/fields`)
    .patch(toSharePointFields(input));
}
