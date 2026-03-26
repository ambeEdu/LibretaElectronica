/**
 * Servicio para gestionar intervenciones
 */
import { InterventionRequest, InterventionResponse } from "@ambe/shared";
import { api } from "./api";

export const interventionService = {
  /**
   * Crea una nueva intervención
   */
  async create(intervention: InterventionRequest): Promise<InterventionResponse> {
    return api.post<InterventionResponse>("/api/interventions", intervention);
  },
};
