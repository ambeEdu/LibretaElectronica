import { useCallback, useEffect, useState } from "react";
import type { InterventionDetail, InterventionRequest, InterventionUpdateRequest } from "@ambe/shared";
import { interventionService } from "../services/interventionService";

interface Filters {
  numeroSerie?: string;
  from?: string;
  to?: string;
}

export function useInterventions(filters: Filters) {
  const [items, setItems] = useState<InterventionDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await interventionService.list({ ...filters, top: 100, skip: 0 });
      const detailed = await Promise.all(response.items.map((item) => interventionService.getById(item.id)));
      setItems(detailed);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error cargando intervenciones";
      setError(message === "Failed to fetch" ? "No se pudo conectar con la API (/api/intervencion). Verifica proxy/base URL." : message);
    } finally {
      setLoading(false);
    }
  }, [filters.from, filters.numeroSerie, filters.to]);

  useEffect(() => {
    void load();
  }, [load]);

  const create = useCallback(async (payload: InterventionRequest) => {
    await interventionService.create(payload);
    await load();
  }, [load]);

  const update = useCallback(async (id: string, payload: InterventionUpdateRequest) => {
    await interventionService.update(id, payload);
    await load();
  }, [load]);

  return { items, loading, error, reload: load, create, update };
}
