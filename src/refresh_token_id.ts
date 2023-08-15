import axios from "axios";
import { RefreshAccessTokenModel } from './model/refresh_access_token_model'

export class RefreshTokenId {
  tenant_access_token: string;

  constructor(tenant_access_token: string) {
    this.tenant_access_token = tenant_access_token;

  }
  public async refreshTokenId(refresh_token: string): Promise<RefreshAccessTokenModel> {
    const responseData: RefreshAccessTokenModel = await axios({
      method: "POST",
      url: "https://open.larksuite.com/open-apis/authen/v1/refresh_access_token",
      headers: {
        "Authorization": `Bearer ${this.tenant_access_token}`
      },
      data: {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token
      }

    });
    return responseData;
  }
}