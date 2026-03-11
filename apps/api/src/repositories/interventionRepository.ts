import type { InterventionRequest } from "@ambe/shared";
import { graphClient } from "../services/sharepointClient.js";
import { env } from "../config/env.js";

export async function saveIntervention(input: InterventionRequest): Promise<string> {
  const result = await graphClient
    .api(`/sites/${env.sharePointSiteIdLibreta}/lists/${env.libretaList}/items`)
    .post({
      fields: {
        Title: input.numeroSerie,
        "TecnicoEmail@DisplayName": input.tecnicoEmail,
        TecnicoNombre: input.tecnicoNombre,
        Fecha: input.fecha,
        TipoIntervencion: input.tipoIntervencion,
        NumeroSerie: input.numeroSerie,
        Hospital: input.hospital,
        Estado: input.estado,
        NumeroInventario: input.numeroInventario || "",
        NumeroParte: input.numeroParte || "",
        Modelo: input.modelo || "",
        DescripcionError: input.descripcionError || "",
        Observaciones: input.observaciones || "",
        SeguridadElectrica: input.seguridadElectrica || "",
        MaterialesJson: JSON.stringify(input.materialesJson),
        Mes: input.mes,
        A_x00f1_o: input.anio,
        Archivado: input.archivado,
        FechaArchivado: input.fechaArchivado || null
      }
    });

  return String(result.id);
}