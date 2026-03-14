import type { MaterialResult } from "@ambe/shared";
import { graphClient } from "../services/sharepointClient.js";
import { env } from "../config/env.js";
import { productFamilies } from "../data/productFamilies.js";

interface GraphMaterialItem {
  fields?: {
    Title?: string;
    field_1?: string;
    Stock_x0020_Actual?: number | string;
    Familia?: string;
  };
}

export interface MaterialSearchResult {
  referencia: string;
  descripcion: string;
  stockActual: number;
  familia: string;
}

function escapeODataValue(value: string): string {
  return value.replace(/'/g, "''");
}

function normalize(value: string | undefined | null): string {
  return String(value || "").trim().toLowerCase();
}

function mapMaterial(item: GraphMaterialItem): MaterialSearchResult {
  return {
    referencia: String(item.fields?.Title || "").trim(),
    descripcion: String(item.fields?.field_1 || "").trim(),
    stockActual: Number(item.fields?.Stock_x0020_Actual || 0),
    familia: String(item.fields?.Familia || "").trim()
  };
}

export function getAllowedFamiliesForProduct(producto: string): string[] {
  return productFamilies[producto]?.filter(Boolean) ?? [];
}

function familyMatchesProduct(familia: string, producto?: string): boolean {
  if (!producto) {
    return true;
  }

  const allowedFamilies = getAllowedFamiliesForProduct(producto);

  if (allowedFamilies.length === 0) {
    return false;
  }

  return allowedFamilies.some((allowedFamily) => normalize(allowedFamily) === normalize(familia));
}

export async function findMaterialByReference(referencia: string, producto?: string): Promise<MaterialResult> {
  const safeReference = escapeODataValue(referencia.trim());

  const result = await graphClient
    .api(`/sites/${env.sharePointSiteIdStock}/lists/${env.stockList}/items`)
    .expand("fields")
    .filter(`fields/Title eq '${safeReference}'`)
    .top(10)
    .get();

  const material = (result.value ?? [])
    .map((item: GraphMaterialItem) => mapMaterial(item))
    .find((item: MaterialSearchResult) => familyMatchesProduct(item.familia, producto));

  if (!material) {
    return { found: false };
  }

  return {
    found: true,
    referencia: material.referencia,
    descripcion: material.descripcion,
    stockActual: material.stockActual,
    familia: material.familia
  };
}

export async function searchMaterials(query: string, producto: string, limit = 20): Promise<MaterialSearchResult[]> {
  const allowedFamilies = getAllowedFamiliesForProduct(producto);

  if (allowedFamilies.length === 0) {
    return [];
  }

  const trimmedQuery = query.trim();
  const filters: string[] = [];

  if (trimmedQuery) {
    filters.push(`startswith(fields/Title,'${escapeODataValue(trimmedQuery)}')`);
  }

  const familyFilter = allowedFamilies
    .map((familia) => `fields/Familia eq '${escapeODataValue(familia)}'`)
    .join(" or ");

  filters.push(`(${familyFilter})`);

  const result = await graphClient
    .api(`/sites/${env.sharePointSiteIdStock}/lists/${env.stockList}/items`)
    .expand("fields")
    .filter(filters.join(" and "))
    .top(Math.max(limit, 1))
    .get();

  return (result.value ?? [])
    .map((item: GraphMaterialItem) => mapMaterial(item))
    .filter((item: MaterialSearchResult) => familyMatchesProduct(item.familia, producto))
    .sort((a: MaterialSearchResult, b: MaterialSearchResult) => a.referencia.localeCompare(b.referencia, "es"));
}
