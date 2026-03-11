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