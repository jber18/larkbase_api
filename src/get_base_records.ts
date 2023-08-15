import axios from "axios";
import { GetBaseRecordsQueryModel, GetListBaseRecords } from './model/base_get_record_request_model';



interface Error {
  response: {
    data: {
      code: number,
      msg: string,
      error: object
    }
  }
}

export class GetBaseRecords {
  app_token: string
  table_id: string;

  constructor(app_token: string, table_id: string) {
    this.app_token = app_token;
    this.table_id = table_id;
  }


  public async listRecords(user_refresh_token: string) {
    try {
      const baseResponseData = await axios({
        method: "GET",
        url: `https://open.larksuite.com/open-apis/bitable/v1/apps/${this.app_token}/tables/${this.table_id}/records?page_size=20`,
        headers: {
          'Authorization': `Bearer ${user_refresh_token}`
        }
      });

      return baseResponseData.data;
    } catch (error) {
      const errorData = error as Error;
      return errorData.response.data
    }




  }
}