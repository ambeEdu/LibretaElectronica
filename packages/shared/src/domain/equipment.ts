/**
 * Dominio de Equipamiento
 * Tipos e interfaces relacionadas con equipamiento
 */

export interface EquipmentResult {
  found: boolean;
  numeroSerie?: string;
  hospital?: string;
  estado?: string;
  modelo?: string;
}
