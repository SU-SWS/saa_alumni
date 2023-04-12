# Asset Client

A simple asset service client. Handles all the configuration for creating
and retrieving private assets in Storyblok.

## Usage

Import and instantiate AssetClients in any server side code to retrive private assets.

```typescript
import { AssetClient } from './AssetClient';

const assets = new AssetClient({
  spaceId: 'storyblok-space-id',
  assetToken: 'storyblok-asset-api-token',
  accessToken: 'storyblok-user-access-token',
});

const main = async () => {
  const { signedUrl } = await assets.get(fileUrl);
  // You can access your private asset directly from the signed url
}
```

## Configuration

You can configure your asset client with either environment variables or per-instace by passing a config.

### Global Env Var Config
```bash
# .env
ASSET_CLIENT_SPACE_ID="storyblok-space-id"
ASSET_CLIENT_ASSET_TOKEN="Storyblok API token with asset scope"
ASSET_CLIENT_ACCESS_TOKEN="Storyblok management API Access Token"
```

### Per-Instance Config

Pass config values to the constructor when creating a new MegaProfile instance ([See usage](#usage)).
Instance level configuration overrides global configuration for that instance.

## API
### `get(asset: string)`
Get a signed url for the given asset.

## PrivateImage component
For convenience, we also have a component for rendering Private Images.
Theis will handle the underlying calls to the Asset Client for you.

Below is a working example:

```
import React from 'react';
import { PrivateImage } from '../components/PrivateImage';

export const AssetTest = () => {

  return (
    <div>
      <h1>Private Image Test</h1>
      <PrivateImage src={fileUrl} width={500} height={400} />
    </div>
  );
};

export default AssetTest;
```