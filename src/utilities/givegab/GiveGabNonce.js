import axios from 'axios';

export class GiveGabNonce {
  constructor() {
    const axiosInstance = axios.create({
      baseURL:
        process.env.GG_REPORTSURL ||
        'https://admin.kimbia.com/platform/rest/v1/dssNonce',
    });
    this.httpClient = axiosInstance;
  }

  /**
   * Fetches Nonce Token (kwoCredentials) from API.
   */
  getToken = async (orgId, dssId, scheduleId) => {
    const data = {
      organization: orgId,
      dssId,
      schedule: scheduleId,
    };

    const result = await this.httpClient.post('/', data);
    if (!result.data) {
      throw new Error('Failed to retrieve nonce');
    }
    return result.data;
  };
}
