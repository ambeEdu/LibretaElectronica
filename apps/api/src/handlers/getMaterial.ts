import { app, type HttpRequest } from "@azure/functions";
import { badRequest, ok, serverError } from "../shared/http.js";
import { findMaterialByReference } from "../repositories/materialRepository.js";

app.http("getMaterial", {
  route: "material",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      const referencia = request.query.get("referencia");
      const modelo = request.query.get("modelo") || undefined;

      if (!referencia) {
        return badRequest("El parámetro 'referencia' es obligatorio");
      }

      const result = await findMaterialByReference(referencia, modelo);
      return ok(result);
    } catch (error) {
      return serverError(error instanceof Error ? error.message : "Unexpected error");
    }
  }
});
