/**
 * Dominio de Materiales
 * Tipos e interfaces relacionadas con materiales
 */

export interface MaterialResult {
  found: boolean;
  referencia?: string;
  descripcion?: string;
  stockActual?: number;
  familia?: string;
}
