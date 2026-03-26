/**
 * Hook para gestionar intervenciones
 */
import { useState, useCallback } from "react";
import { InterventionRequest, InterventionResponse } from "@ambe/shared";
import { interventionService } from "../services/interventionService";

export function useIntervention() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<InterventionResponse | null>(
    null
  );

  const createIntervention = useCallback(
    async (intervention: InterventionRequest) => {
      try {
        setLoading(true);
        setError(null);
        const response = await interventionService.create(intervention);
        setLastResponse(response);
        return response;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error desconocido";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, lastResponse, createIntervention };
}
