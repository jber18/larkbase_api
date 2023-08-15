export interface GetListBaseRecords {
  data: {
    code: number,
    data: {
      has_more: boolean,
      items:[]
    }
  }

}

export interface GetBaseRecordsQueryModel{
  app_token:string;
  table_id:string;
  refresh_token:string;
  
}