/**
 * Dominio de Intervenciones
 * Tipos e interfaces relacionadas con intervenciones
 */

export interface MaterialLine {
  referencia: string;
  descripcion: string;
  cantidad: number;
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
  software?: string;
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
