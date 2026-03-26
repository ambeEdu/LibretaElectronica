/**
 * Fixture: Datos de prueba para intervenciones
 */

import { InterventionRequest } from "@ambe/shared";

export const mockInterventionRequest: InterventionRequest = {
  tecnicoEmail: "test@example.com",
  tecnicoNombre: "Test Técnico",
  fecha: "2024-03-26",
  tipoIntervencion: "Preventivo",
  numeroSerie: "SN123456",
  hospital: "Hospital Test",
  estado: "Activo",
  numeroInventario: "INV001",
  numeroParte: "PART001",
  modelo: "Modelo Test",
  software: "v1.0",
  descripcionError: "Error de prueba",
  observaciones: "Observaciones de prueba",
  seguridadElectrica: "OK",
  materialesJson: [
    {
      referencia: "REF-001",
      descripcion: "Material de prueba",
      cantidad: 2,
    },
  ],
  mes: 3,
  anio: 2024,
  archivado: false,
};

export const mockInterventions = [
  mockInterventionRequest,
  {
    ...mockInterventionRequest,
    numeroSerie: "SN789012",
    hospital: "Hospital B",
  },
];
