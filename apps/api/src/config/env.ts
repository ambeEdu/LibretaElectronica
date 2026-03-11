function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export const env = {
  sharePointSiteId: required("SHAREPOINT_SITE_ID"),
  stockList: required("SHAREPOINT_LIST_STOCK"),
  tenantId: required("ENTRA_TENANT_ID"),
  clientId: required("ENTRA_CLIENT_ID"),
  clientSecret: required("ENTRA_CLIENT_SECRET")
};