import { app, type HttpRequest } from "@azure/functions";
import type { InterventionRequest, InterventionResponse } from "@ambe/shared";
import { badRequest, ok, serverError } from "../shared/http.js";
import { saveIntervention } from "../repositories/interventionRepository.js";

app.http("postIntervention", {
  route: "intervencion",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      const rawBody = (await request.json()) as Record<string, unknown>;
      const normalizedCalibraciones = Array.isArray(rawBody.calibracionesJson)
        ? rawBody.calibracionesJson
        : Array.isArray(rawBody.calibrationValues)
          ? rawBody.calibrationValues
          : [];

      const body = {
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
