/**
 * Servicio para gestionar equipamiento
 */
import { EquipmentResult } from "@ambe/shared";
import { api } from "./api";

export const equipmentService = {
  /**
   * Obtiene información de un equipo por número de serie
   */
  async getEquipment(numeroSerie: string): Promise<EquipmentResult> {
    return api.get<EquipmentResult>(
      `/api/equipment/${encodeURIComponent(numeroSerie)}`
    );
  },
};
