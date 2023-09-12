import axios from 'axios';
import keys from './keys';

class ContentFulAPI {
  constructor(space = keys.space, accessToken = keys.accessToken) {
    this.space = space;
    this.accessToken = accessToken;
  }

  async fethEntries(limit, skip) {
    const apiUrl = `https://cdn.contentful.com/spaces/${this.space}/entries?access_token=${this.accessToken}&limit=${limit}&skip=${skip}&order=sys.id`;

    const response = await axios.get(apiUrl);
    const { items, total } = response.data;

    return {
      items: items.map((item) => item.fields),
      total,
    };
  }
}

export default ContentFulAPI;
