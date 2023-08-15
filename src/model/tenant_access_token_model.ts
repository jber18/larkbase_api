export interface TenantAccessTokenResponseModel {
  data: {
    code: number,
    msg: string,
    tenant_access_token: string,
    expire: number
  }
}