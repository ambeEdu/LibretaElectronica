function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export const env = {
  sharePointSiteIdStock: required("SHAREPOINT_SITE_ID_STOCK"),
  stockList: required("SHAREPOINT_LIST_STOCK"),
  sharePointSiteIdLibreta: required("SHAREPOINT_SITE_ID_LIBRETA"),
  libretaList: required("SHAREPOINT_LIST_LIBRETA"),
  tenantId: required("ENTRA_TENANT_ID"),
  clientId: required("ENTRA_CLIENT_ID"),
  clientSecret: required("ENTRA_CLIENT_SECRET")
};