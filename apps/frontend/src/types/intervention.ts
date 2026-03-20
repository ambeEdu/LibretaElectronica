export interface MaterialLine {
  referencia: string;
  descripcion: string;
  cantidad: number;
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