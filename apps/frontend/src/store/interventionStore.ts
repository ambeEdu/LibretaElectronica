/**
 * Store global de intervenciones usando Zustand
 * Gestiona el estado de las intervenciones en la aplicación
 */
import { InterventionRequest } from "@ambe/shared";
import { create } from "zustand";

interface InterventionStore {
  currentIntervention: InterventionRequest | null;
  interventions: InterventionRequest[];
  setCurrentIntervention: (intervention: InterventionRequest | null) => void;
  addIntervention: (intervention: InterventionRequest) => void;
  updateIntervention: (
    id: string,
    intervention: Partial<InterventionRequest>
  ) => void;
  clearCurrent: () => void;
}

/**
 * NOTA: Para usar este store necesitas instalar Zustand:
 * pnpm add zustand
 */

// Placeholder mientras se agrega Zustand
export const useInterventionStore = create<InterventionStore>(() => ({
  currentIntervention: null,
  interventions: [],
  setCurrentIntervention: () => {},
  addIntervention: () => {},
  updateIntervention: () => {},
  clearCurrent: () => {},
}));
