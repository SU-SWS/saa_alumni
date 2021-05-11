// Global variables for this project.

const config = {
  isNetlify: process.env.GATSBY_NETLIFY ?? false,
  basePath:
    process.env.GATSBY_BASE_PATH === undefined
      ? "/"
      : process.env.GATSBY_BASE_PATH,
  assetCdn: process.env.GATSBY_ASSET_CDN ?? "https://assets.stanford.edu/",
};

export { config };
