import "cross-fetch/polyfill";
import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";
import { env } from "../config/env.js";

const credential = new ClientSecretCredential(env.tenantId, env.clientId, env.clientSecret);

export const graphClient = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const token = await credential.getToken("https://graph.microsoft.com/.default");
      return token?.token ?? "";
    }
  }
});