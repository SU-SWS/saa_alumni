import axios from 'axios';

export class AssetClient {
  constructor(config = {}) {
    this.assetToken = config.assetToken || process.env.ASSET_CLIENT_ASSET_TOKEN;
  }

  /**
   * Get a signed asset url from a private asset
   */
  get = async (asset) => {
    const result = await axios.get(
      `https://api.storyblok.com/v2/cdn/assets/me?token=${this.assetToken}&filename=${asset}`
    );

    const signedUrl = result.data.asset.signed_url;
    const payload = { signedUrl };
    return payload;
  };
}
