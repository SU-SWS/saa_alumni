/* eslint-disable no-console */
import axios from 'axios';
import qs from 'qs';

export class ApiGatewayAuth {
  constructor(config = {}) {
    this.url = config.url || process.env.API_GATEWAY_AUTH_URL;
    this.clientId = config.clientId || process.env.API_GATEWAY_AUTH_CLIENT_ID;
    this.clientSecret =
      config.clientSecret || process.env.API_GATEWAY_AUTH_CLIENT_SECRET;
    this.token = config.token || false;
    this.grantType = 'client_credentials';
  }

  isAuthenticated = () => !!this.token;

  authenticate = async () => {
    const body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: this.grantType,
    };
    await axios
      .post(this.url, qs.stringify(body))
      .then((response) => {
        this.token = response.data;
        return this.token;
      })
      .catch((error) => {
        console.log('Error:', error.config);
        console.log('Error:', error.message);

        if (error.response) {
          console.log('Error:', error.response.status, error.response.data);
        }

        if (error.request) {
          console.log('Error:', error.request);
        }

        Promise.reject(error);
      });
  };
}
