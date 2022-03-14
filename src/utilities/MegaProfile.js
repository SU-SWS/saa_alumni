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
    });
    if (this.auth.isAuthenticated()) {
      this.setAuthParams();
    }
  }

  /**
   * Auth handler
   */
  authenticate = async () => {
    await this.auth.authenticate();
    this.client.defaults.params = { token: this.auth?.token?.access_token };
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

  // TODO: Remove this method once test-405 is confirmed?
  post = async (url, data, config = {}) =>
    this.request({
      ...config,
      method: 'POST',
      url,
      data,
    });
}
