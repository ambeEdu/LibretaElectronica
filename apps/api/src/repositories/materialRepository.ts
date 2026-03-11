import type { MaterialResult } from "@ambe/shared";
import { graphClient } from "../services/sharepointClient.js";
import { env } from "../config/env.js";

export async function findMaterialByReference(referencia: string): Promise<MaterialResult> {
  const safeReference = referencia.replace(/'/g, "''");

  const result = await graphClient
    .api(`/sites/${env.sharePointSiteId}/lists/${env.stockList}/items`)
    .expand("fields")
    .filter(`fields/Title eq '${safeReference}'`)
    .get();

  const item = result.value?.[0];

  if (!item) {
    return { found: false };
  }

  return {
    found: true,
    referencia: String(item.fields.Title || ""),
    descripcion: String(item.fields.field_1 || ""),
    stockActual: Number(item.fields.Stock_x0020_Actual || 0),
    familia: String(item.fields.Familia || "")
  };
}