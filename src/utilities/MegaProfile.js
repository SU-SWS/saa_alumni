import axios from 'axios';
import { ApiGatewayAuth } from './ApiGatewayAuth';

export class MegaProfile {
  constructor(config = {}) {
    // Set variables
    const host = config.host || process.env.MEGAPROFILE_HOST;
    const path = config.path || process.env.MEGAPROFILE_PATH;
    const builtUrl = `${host}${path}`;
    this.url = config.url || process.env.MEGAPROFILE_URL || builtUrl;
    this.auth = config.auth || new ApiGatewayAuth();

    // Create Client
    this.client = axios.create({
      baseURL: this.url,
      // Other request defaults? Headers?
      params: {
        token: this.authenticate(),
      },
    });
    this.authenticate();
  }

  /**
   * Auth handler
   */
  authenticate = async () => {
    await this.auth.authenticate();
     this.client.defaults.params.token = this.auth.token.access_token;
  };

  // Generic request handler w/ auth check
  request = async (config = {}) => {
    // Check authentication first
    if (!this.auth.isAuthenticated()) {
      await this.authenticate();
    }
    const result = await this.client.request(config);
    return result;
  };

  // Method wrapped request handlers
  get = async (url, config = {}) =>
    this.request({ ...config, method: 'GET', url });

  post = async (url, data, config = {}) =>
    this.request({
      ...config,
      method: 'POST',
      url,
      data,
    });

  put = async (url, data, config = {}) =>
    this.request({
      ...config,
      method: 'PUT',
      url,
      data,
    });

  delete = async (url, config = {}) =>
    this.request({ ...config, method: 'DELETE', url });
}
