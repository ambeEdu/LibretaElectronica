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
      const body = (await request.json()) as InterventionRequest;

      if (!body.tecnicoEmail || !body.tecnicoNombre || !body.fecha || !body.tipoIntervencion || !body.numeroSerie) {
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