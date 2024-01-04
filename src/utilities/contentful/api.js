import axios from 'axios';
import keys from './keys';

class ContentFulAPI {
  constructor(space = keys.space, accessToken = keys.accessToken) {
    this.host = 'https://cdn.contentful.com';
    this.space = space;
    this.accessToken = accessToken;
  }

  async fetchEntries(limit, skip) {
    const apiUrl = `${this.host}/spaces/${this.space}/entries?access_token=${this.accessToken}&limit=${limit}&skip=${skip}&order=sys.id`;

    const response = await axios.get(apiUrl);
    const { items, total } = response.data;

    return {
      items: items.map((item) => item.fields),
      total,
    };
  }
}

export default ContentFulAPI;
