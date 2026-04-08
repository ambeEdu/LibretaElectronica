import type { InterventionRequest } from "@ambe/shared";
import { graphClient } from "../services/sharepointClient.js";
import { env } from "../config/env.js";

export async function saveIntervention(input: InterventionRequest): Promise<string> {
  const calibracionesObj = (input.calibracionesJson ?? []).reduce((acc, cal) => {
    acc[cal.nombre] = cal.valor;
    return acc;
  }, {} as Record<string, string>);

  const materialesText = (input.materialesJson ?? []).map((material) =>
    `${material.referencia} - ${material.descripcion}: ${material.cantidad} und`
  );

  const result = await graphClient
    .api(`/sites/${env.sharePointSiteIdLibreta}/lists/${env.libretaList}/items`)
    .post({
      fields: {
        Title: input.numeroSerie,
        TecnicoNombre: input.tecnicoNombre,
        Fecha: input.fecha,
        TipoIntervencion: input.tipoIntervencion,
        NumeroSerie: input.numeroSerie,
        Hospital: input.hospital,
        Estado: input.estado,
        NumeroInventario: input.numeroInventario || "",
        NumeroParte: input.numeroParte || "",
        Modelo: input.modelo || "",
        Software: input.software || "",
        DescripcionError: input.descripcionError || "",
        Observaciones: input.observaciones || "",
        SeguridadElectrica: input.seguridadElectrica || "",
        CalibracionesJson: JSON.stringify(calibracionesObj),
        MaterialesJson: JSON.stringify(materialesText),
        Mes: input.mes,
        A_x00f1_o: input.anio,
        Archivado: input.archivado,
        FechaArchivado: input.fechaArchivado || null
      }
    });

  return String(result.id);
}
