/**
 * Tipos internos específicos del API
 * No se exportan a @ambe/shared
 */

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  errorCode?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface QueryFilters {
  [key: string]: unknown;
}
