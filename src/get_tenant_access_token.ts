import axios from "axios";
import { TenantAccessTokenResponseModel } from './model/tenant_access_token_model';


export class GetTenantAccessToken {
  app_id: string;
  app_secret: string;

  constructor(app_id: string, app_secret: string) {
    this.app_id = app_id;
    this.app_secret = app_secret;
  }

  public async getTenantAccessToken() {
    const tenantAccessTokenResponse: TenantAccessTokenResponseModel = await axios({
      method: "POST",
      url: "https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal",
      data: {
        app_id: this.app_id,
        app_secret: this.app_secret
      }
    });

    return tenantAccessTokenResponse.data.tenant_access_token;
  }

}