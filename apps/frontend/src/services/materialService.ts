/**
 * Servicio para gestionar materiales
 */
import { MaterialResult } from "@ambe/shared";
import { api } from "./api";

export const materialService = {
  /**
   * Obtiene información de un material por referencia
   */
  async getMaterial(referencia: string): Promise<MaterialResult> {
    return api.get<MaterialResult>(
      `/api/material/${encodeURIComponent(referencia)}`
    );
  },
};
