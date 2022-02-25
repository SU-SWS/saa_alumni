import { ApiGatewayAuth } from '../utilities/ApiGatewayAuth';

// Get A Token. Delete this prior to merging branch into TSGG
// Do not enable for public use. This is for development/debugging purposes only.
// Token can be viewed at /api/api-gateway-auth/ApiGatewayAuth
// -----------------------------------------------------------------------------

export default async function handler(req, res) {
  try {
    const apiGatewayAuth = new ApiGatewayAuth();
    const token = await apiGatewayAuth.authenticate();
    res.status(200).json(token);
  } catch (e) {
    res.status(500).json(e.response.data);
  }
}
