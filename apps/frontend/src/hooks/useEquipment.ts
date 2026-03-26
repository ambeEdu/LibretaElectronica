/**
 * Hook para gestionar datos de equipamiento
 * Obtiene información de un equipo por número de serie
 */
import { useState, useCallback } from "react";
import { EquipmentResult } from "@ambe/shared";
import { equipmentService } from "../services/equipmentService";

export function useEquipment() {
  const [equipment, setEquipment] = useState<EquipmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipment = useCallback(async (numeroSerie: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await equipmentService.getEquipment(numeroSerie);
      setEquipment(result);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { equipment, loading, error, fetchEquipment };
}
