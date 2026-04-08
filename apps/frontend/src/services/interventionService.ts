/**
 * Servicio para gestionar intervenciones
 */
import type {
  InterventionDetail,
  InterventionListResponse,
  InterventionRequest,
  InterventionResponse,
  InterventionUpdateRequest
} from "@ambe/shared";
import { api } from "./api";

interface ListParams {
  numeroSerie?: string;
  from?: string;
  to?: string;
  top?: number;
  skip?: number;
}

function buildQuery(params: ListParams): string {
  const query = new URLSearchParams();
  if (params.numeroSerie) query.set("numeroSerie", params.numeroSerie);
  if (params.from) query.set("from", params.from);
  if (params.to) query.set("to", params.to);
  if (params.top !== undefined) query.set("top", String(params.top));
  if (params.skip !== undefined) query.set("skip", String(params.skip));
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

export const interventionService = {
  async create(intervention: InterventionRequest): Promise<InterventionResponse> {
    return api.post<InterventionResponse>("/api/intervencion", intervention);
  },

  async list(params: ListParams): Promise<InterventionListResponse> {
    return api.get<InterventionListResponse>(`/api/intervencion${buildQuery(params)}`);
  },

  async getById(id: string): Promise<InterventionDetail> {
    return api.get<InterventionDetail>(`/api/intervencion/${id}`);
  },

  async update(id: string, payload: InterventionUpdateRequest): Promise<InterventionResponse> {
    return api.patch<InterventionResponse>(`/api/intervencion/${id}`, payload);
  }
};
