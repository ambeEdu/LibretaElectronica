/**
 * Dominio de Intervenciones
 * Tipos e interfaces relacionadas con intervenciones
 */

export interface MaterialLine {
  referencia: string;
  descripcion: string;
  cantidad: number;
}

export interface CalibrationValue {
  nombre: string;
  valor: string;
}

export interface InterventionRequest {
  tecnicoNombre: string;
  fecha: string;
  tipoIntervencion: string;
  numeroSerie: string;
  hospital: string;
  estado: string;
  numeroInventario?: string;
  numeroParte?: string;
  modelo?: string;
  software?: string;
  descripcionError?: string;
  observaciones?: string;
  seguridadElectrica?: string;
  calibracionesJson?: CalibrationValue[];
  materialesJson: MaterialLine[];
  mes: number;
  anio: number;
  archivado: boolean;
  fechaArchivado?: string | null;
}

export interface InterventionResponse {
  ok: boolean;
  id?: string;
}

export interface InterventionListItem {
  id: string;
  fecha: string;
  tecnicoNombre: string;
  numeroSerie: string;
  hospital: string;
  tipoIntervencion: string;
  estado: string;
}

export interface InterventionDetail extends InterventionRequest {
  id: string;
}

export interface InterventionListResponse {
  items: InterventionListItem[];
  total: number;
  top: number;
  skip: number;
}

export type InterventionUpdateRequest = Partial<InterventionRequest>;
