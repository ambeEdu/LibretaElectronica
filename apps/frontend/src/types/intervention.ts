import type { MaterialLine as BaseMaterialLine } from "@ambe/shared";

export interface MaterialLine extends BaseMaterialLine {
  stockActual: number;
  familia?: string;
}

export const interventionTypes = [
  "Correctivo",
  "Preventivo",
  "FSCA",
  "F.Action Open",
  "F.Action Close"
];