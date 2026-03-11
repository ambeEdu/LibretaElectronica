export interface MaterialLine {
  referencia: string;
  descripcion: string;
  cantidad: number;
}

export interface EquipmentResult {
  found: boolean;
  numeroSerie?: string;
  hospital?: string;
  estado?: string;
  modelo?: string;
}

export interface MaterialResult {
  found: boolean;
  referencia?: string;
  descripcion?: string;
  stockActual?: number;
  familia?: string;
}

export interface InterventionRequest {
  tecnicoEmail: string;
  tecnicoNombre: string;
  fecha: string;
  tipoIntervencion: string;
  numeroSerie: string;
  hospital: string;
  estado: string;
  numeroInventario?: string;
  numeroParte?: string;
  modelo?: string;
  descripcionError?: string;
  observaciones?: string;
  seguridadElectrica?: string;
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