import axios from 'axios';

export class ApiGatewayAuth {
  constructor(config = {}) {
    this.url = config.url || process.env.API_GATEWAY_AUTH_URL;
    this.clientId = config.clientId || process.env.API_GATEWAY_AUTH_CLIENT_ID;
    this.clientSecret =
      config.clientSecret || process.env.API_GATEWAY_AUTH_CLIENT_SECRET;
    this.token = config.token;
    // TODO: Configurable?
    this.grantType = 'CLIENT_CREDENTIALS';
  }

  isAuthenticated = () => !!this.token;

  authenticate = async () => {
    const params = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: this.grantType,
    };
    const result = await axios.post(this.url, undefined, {
      params,
    });
    this.token = result.data;

    return this.token;
  };
}

// Get A Token.
// Do not enable for public use. This is for development/debugging purposes only.
// Token can be viewed at http://localhost:8000/api/api-gateway-auth/ApiGatewayAuth
// -----------------------------------------------------------------------------
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const apiGatewayAuth = new ApiGatewayAuth();
    const token = await apiGatewayAuth.authenticate();
    res.status(200).json(token);
  } catch (e) {
    res.status(500).json(e);
  }
}
