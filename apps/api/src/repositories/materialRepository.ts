import type { MaterialResult } from "@ambe/shared";
import { graphClient } from "../services/sharepointClient.js";
import { env } from "../config/env.js";
import { productFamilies } from "../data/productFamilies.js";

function normalize(value: string): string {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function getAllowedFamiliesForProduct(product: string): string[] {
  return productFamilies[product] ?? [];
}

function familyMatchesProduct(product: string, familia: string): boolean {
  const allowedFamilies = getAllowedFamiliesForProduct(product);
  const familiaNormalizada = normalize(familia);

  return allowedFamilies.some((allowed) => normalize(allowed) === familiaNormalizada);
}

export async function findMaterialByReference(
  referencia: string,
  product: string
): Promise<MaterialResult> {
  const safeReference = referencia.replace(/'/g, "''");

  const result = await graphClient
    .api(`/sites/${env.sharePointSiteIdStock}/lists/${env.stockList}/items`)
    .expand("fields")
    .filter(`fields/Title eq '${safeReference}'`)
    .get();

  const item = result.value?.[0];

  if (!item) {
    return { found: false };
  }

  const familia = String(item.fields.Familia || "").trim();

  if (!familyMatchesProduct(product, familia)) {
    return {
      found: false
    };
  }

  return {
    found: true,
    referencia: String(item.fields.Title || ""),
    descripcion: String(item.fields.field_1 || ""),
    stockActual: Number(item.fields.Stock_x0020_Actual || 0),
    familia
  };
}