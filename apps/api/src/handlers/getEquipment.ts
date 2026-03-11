import { app, type HttpRequest } from "@azure/functions";
import { badRequest, ok, serverError } from "../shared/http.js";
import { findEquipmentBySerial } from "../services/equipmentService.js";

app.http("getEquipment", {
  route: "equipo",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      const serie = request.query.get("serie");

      if (!serie) {
        return badRequest("El parámetro 'serie' es obligatorio");
      }

      const result = await findEquipmentBySerial(serie);
      return ok(result);
    } catch (error) {
      return serverError(error instanceof Error ? error.message : "Unexpected error");
    }
  }
});