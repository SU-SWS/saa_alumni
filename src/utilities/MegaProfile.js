import axios from 'axios';
import { ApiGatewayAuth } from './ApiGatewayAuth';
import mockServer from './mockServer';

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

    if (process.env.MEGAPROFILE_MOCK === 'true') {
      mockServer(this.client);
    }

    if (this.auth.isAuthenticated()) {
      this.setAuthParams();
    }
  }

  /**
   * Auth handler
   */
  authenticate = async () => {
    await this.auth.authenticate();
    this.client.defaults.headers.common = {
      Authorization: `Bearer ${this.auth?.token?.access_token}`,
    };
  };

  // Generic request handler w/ auth check
  request = async (config = {}) => {
    let result;
    // Check authentication first
    if (!this.auth.isAuthenticated()) {
      await this.authenticate();
    }

    try {
      result = await this.client.request(config);
    } catch (err) {
      console.error(err);
    }
    return result;
  };

  // Method wrapped request handlers
  get = async (url, config = {}) =>
    this.request({ ...config, method: 'GET', url });
}
