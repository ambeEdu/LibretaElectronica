/**
 * Hook para gestionar búsqueda de materiales
 */
import { useState, useCallback } from "react";
import { MaterialResult } from "@ambe/shared";
import { materialService } from "../services/materialService";

export function useMaterial() {
  const [material, setMaterial] = useState<MaterialResult | null>(null);
  const [materials, setMaterials] = useState<MaterialResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMaterial = useCallback(async (referencia: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await materialService.getMaterial(referencia);
      setMaterial(result);
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

  return { material, materials, loading, error, fetchMaterial, setMaterials };
}
