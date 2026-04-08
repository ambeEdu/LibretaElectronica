import type { HttpResponseInit } from "@azure/functions";

export function ok(body: unknown, status = 200): HttpResponseInit {
  return { status, jsonBody: body };
}

export function badRequest(message: string): HttpResponseInit {
  return { status: 400, jsonBody: { message } };
}

export function notFound(message: string): HttpResponseInit {
  return { status: 404, jsonBody: { message } };
}

export function forbidden(message: string): HttpResponseInit {
  return { status: 403, jsonBody: { message } };
}

export function serverError(message: string): HttpResponseInit {
  return { status: 500, jsonBody: { message } };
}
