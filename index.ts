import express from 'express';
import bodyParser from 'body-parser';
import { UserAccessTokenModel } from './src/access_token_model';
import { GetRefreshToken } from './src/get_refresh_token';
import { GetTenantAccessToken } from './src/get_tenant_access_token';
import { GetBaseRecordsQueryModel } from './src/model/base_get_record_request_model';
import { GetBaseRecords } from './src/get_base_records';
import { RefreshTokenId } from './src/refresh_token_id';

const app_id: string = "<app_id>";
const app_secret: string = "<app_secret>"
const getTenantAccessToken = new GetTenantAccessToken(app_id, app_secret);


//middleware
const app = express();
app.use(bodyParser.json());

app.get('/authorize', async (request: UserAccessTokenModel, response: any) => {
  if (request.query.code) {
    const tenantAccessToken = await getTenantAccessToken.getTenantAccessToken();
    const refreshToken = new GetRefreshToken(request.query.code, tenantAccessToken);

    const refreshTokenValue = await refreshToken.getRefreshToken();
    response.send(refreshTokenValue.data.data);
  }
});

app.post('/refresh_token/:refresh_token_id', async (request, response) => {
  const refresh_token_id = request.params.refresh_token_id;
  const tenantAccessToken = await getTenantAccessToken.getTenantAccessToken();
  const refreshToken = new RefreshTokenId(tenantAccessToken);
  const refreshTokenValue = await refreshToken.refreshTokenId(refresh_token_id);
  response.send(refreshTokenValue.data);
});

app.post('/refresh_token', async (request, response) => {
  response.status(403).send({
    "code": 403,
    "msg": "Access denied, refresh_token_id params must be filled"
  });
});


app.post('/baserecords', async (request: any, response: any) => {
  if (request.body.app_token && request.body.table_id && request.body.refresh_token) {
    const baseRecords = new GetBaseRecords(request.body.app_token, request.body.table_id);
    const baseRecordsValues = await baseRecords.listRecords(request.body.refresh_token);
    response.send(baseRecordsValues);

  } else {
    response.send({
      code: 401,
      message: "Unauthorized request"
    })
  }

});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
