import { app, type HttpRequest } from "@azure/functions";
import type {
  InterventionListResponse,
  InterventionRequest,
  InterventionResponse,
  InterventionUpdateRequest
} from "@ambe/shared";
import { badRequest, forbidden, notFound, ok, serverError } from "../shared/http.js";
import {
  getInterventionById,
  listInterventions,
  saveIntervention,
  updateIntervention
} from "../repositories/interventionRepository.js";

function toNumber(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function normalizeInterventionPayload(rawBody: Record<string, unknown>): InterventionRequest {
  const normalizedCalibraciones = Array.isArray(rawBody.calibracionesJson)
    ? rawBody.calibracionesJson
    : Array.isArray(rawBody.calibrationValues)
      ? rawBody.calibrationValues
      : [];

  return {
    ...(rawBody as Partial<InterventionRequest>),
    software:
      typeof rawBody.software === "string"
        ? rawBody.software
        : typeof rawBody.softwareSeleccionado === "string"
          ? rawBody.softwareSeleccionado
          : "",
    calibracionesJson: normalizedCalibraciones
      .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
      .map((item) => ({
        nombre:
          typeof item.nombre === "string"
            ? item.nombre
            : typeof item.name === "string"
              ? item.name
              : "",
        valor:
          typeof item.valor === "string"
            ? item.valor
            : typeof item.value === "string"
              ? item.value
              : ""
      }))
      .filter((item) => item.nombre !== "")
  } as InterventionRequest;
}

export function validateUpdate(input: InterventionUpdateRequest): string | null {
  if (input.fecha && Number.isNaN(new Date(input.fecha).getTime())) {
    return "El campo 'fecha' no tiene un formato válido";
  }

  if (input.calibracionesJson && !Array.isArray(input.calibracionesJson)) {
    return "El campo 'calibracionesJson' debe ser un arreglo";
  }

  if (input.materialesJson && !Array.isArray(input.materialesJson)) {
    return "El campo 'materialesJson' debe ser un arreglo";
  }

  return null;
}

app.http("postIntervencion", {
  route: "intervencion",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      const body = normalizeInterventionPayload((await request.json()) as Record<string, unknown>);

      if (!body.tecnicoNombre || !body.fecha || !body.tipoIntervencion || !body.numeroSerie) {
        return badRequest("Faltan campos obligatorios");
      }

      const id = await saveIntervention(body);

      const response: InterventionResponse = {
        ok: true,
        id
      };

      return ok(response, 201);
    } catch (error) {
      return serverError(error instanceof Error ? error.message : "Unexpected error");
    }
  }
});

app.http("listIntervenciones", {
  route: "intervencion",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      const numeroSerie = request.query.get("numeroSerie") ?? undefined;
      const from = request.query.get("from") ?? undefined;
      const to = request.query.get("to") ?? undefined;
      const top = toNumber(request.query.get("top"), 20);
      const skip = toNumber(request.query.get("skip"), 0);

      const result = await listInterventions({ numeroSerie, from, to, top, skip });
      const response: InterventionListResponse = {
        ...result,
        top,
        skip
      };

      return ok(response);
    } catch (error) {
      return serverError(error instanceof Error ? error.message : "Unexpected error");
    }
  }
});

app.http("getIntervencionById", {
  route: "intervencion/{id}",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      const id = request.params.id;
      if (!id) {
        return badRequest("El parámetro 'id' es obligatorio");
      }

      const intervention = await getInterventionById(id);
      if (!intervention) {
        return notFound("Intervención no encontrada");
      }

      return ok(intervention);
    } catch (error) {
      return serverError(error instanceof Error ? error.message : "Unexpected error");
    }
  }
});

app.http("patchIntervencionById", {
  route: "intervencion/{id}",
  methods: ["PATCH"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      const id = request.params.id;
      if (!id) {
        return badRequest("El parámetro 'id' es obligatorio");
      }

      const body = (await request.json()) as InterventionUpdateRequest;
      const validationError = validateUpdate(body);
      if (validationError) {
        return badRequest(validationError);
      }

      const existing = await getInterventionById(id);
      if (!existing) {
        return notFound("Intervención no encontrada");
      }

      await updateIntervention(id, body);
      return ok({ ok: true, id });
    } catch (error) {
      const statusCode = (error as { statusCode?: number }).statusCode;
      if (statusCode === 403) {
        return forbidden("No tienes permisos para editar esta intervención en SharePoint");
      }

      return serverError(error instanceof Error ? error.message : "Unexpected error");
    }
  }
});
