import axios from 'axios';
import { RefreshAccessTokenModel } from './model/refresh_access_token_model'


export class GetRefreshToken {
  code: string;
  bearer_token: string;

  constructor(code: string, bearer_token: string) {
    this.code = code;
    this.bearer_token = bearer_token;
  }

  public async getRefreshToken(): Promise<RefreshAccessTokenModel> {
    const responseData: RefreshAccessTokenModel = await axios({
      method: 'POST',
      url: 'https://open.larksuite.com/open-apis/authen/v1/access_token',
      headers: {
        "Authorization": `Bearer ${this.bearer_token}`
      },
      data: {
        "grant_type": "authorization_code",
        "code": this.code
      }
    });

    return responseData;
  }
}