/**
 * Constantes globales de la aplicación
 */

export const CONSTANTS = {
  // Tipos de intervención
  INTERVENTION_TYPES: {
    PREVENTIVO: "Preventivo",
    CORRECTIVO: "Correctivo",
    PREVENTIVO_CORRECTIVO: "Preventivo-Correctivo",
  },

  // Estados de equipamiento
  EQUIPMENT_STATES: {
    ACTIVO: "Activo",
    INACTIVO: "Inactivo",
    MANTENIMIENTO: "Mantenimiento",
    FUERA_DE_SERVICIO: "Fuera de Servicio",
  },

  // Validaciones
  VALIDATION: {
    MIN_EMAIL_LENGTH: 5,
    MAX_EMAIL_LENGTH: 255,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MIN_DESCRIPTION_LENGTH: 5,
    MAX_DESCRIPTION_LENGTH: 1000,
  },

  // Paginación
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },

  // Meses
  MONTHS: {
    ENERO: 1,
    FEBRERO: 2,
    MARZO: 3,
    ABRIL: 4,
    MAYO: 5,
    JUNIO: 6,
    JULIO: 7,
    AGOSTO: 8,
    SEPTIEMBRE: 9,
    OCTUBRE: 10,
    NOVIEMBRE: 11,
    DICIEMBRE: 12,
  },
} as const;
