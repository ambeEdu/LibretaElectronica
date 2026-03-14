import { app, type HttpRequest } from "@azure/functions";
import { badRequest, ok, serverError } from "../shared/http.js";
import { searchMaterials } from "../repositories/materialRepository.js";

app.http("searchMaterials", {
  route: "materiales",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      const query = request.query.get("query") || "";
      const modelo = request.query.get("modelo");

      if (!modelo) {
        return badRequest("El parámetro 'modelo' es obligatorio");
      }

      const result = await searchMaterials(query, modelo);
      return ok(result);
    } catch (error) {
      return serverError(error instanceof Error ? error.message : "Unexpected error");
    }
  }
});
