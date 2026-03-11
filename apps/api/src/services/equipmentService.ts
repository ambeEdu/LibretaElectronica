import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";
import type { EquipmentResult } from "@ambe/shared";

interface EquipmentRow {
  ["Serial/Lot Number"]?: string;
  Location?: string;
  Status?: string;
  ["Modelo 3"]?: string;
}

export async function findEquipmentBySerial(numeroSerie: string): Promise<EquipmentResult> {
  const filePath = path.resolve(process.cwd(), "src/data/BBDD.csv");
  const fileContent = await fs.readFile(filePath, "utf8");

const rows = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  relax_column_count: true,
  bom: true
}) as EquipmentRow[];

  const match = rows.find(
    (row) => String(row["Serial/Lot Number"] || "").trim().toLowerCase() === numeroSerie.trim().toLowerCase()
  );

  if (!match) {
    return { found: false };
  }

  return {
    found: true,
    numeroSerie: String(match["Serial/Lot Number"] || "").trim(),
    hospital: String(match.Location || "").trim(),
    estado: String(match.Status || "").trim(),
    modelo: String(match["Modelo 3"] || "").trim()
  };
}