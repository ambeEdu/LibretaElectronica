import { app, type HttpRequest } from "@azure/functions";
import { ok, serverError } from "../shared/http.js";
import { softwarePorFamilia, calibracionesPorFamilia } from "../data/softwareCalibraciones.js";
import { productFamilies as valoresFamilia } from "../data/productFamilies.js";

app.http("getSoftwarePorFamilia", {
  route: "software-por-familia",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      return ok(softwarePorFamilia);
    } catch (error) {
      return serverError(error instanceof Error ? error.message : "Unexpected error");
    }
  }
});

app.http("getCalibracionesPorFamilia", {
  route: "calibraciones-por-familia",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      return ok(calibracionesPorFamilia);
    } catch (error) {
      return serverError(error instanceof Error ? error.message : "Unexpected error");
    }
  }
});

app.http("getValoresFamilia", {
  route: "valores-familia",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest) => {
    try {
      return ok(valoresFamilia);
    } catch (error) {
      return serverError(error instanceof Error ? error.message : "Unexpected error");
    }
  }
});