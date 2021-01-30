// Global variables for this project.

const config = {
  isNetlify: process.env.GATSBY_NETLIFY ?? false,
  basePath: process.env.GATSBY_BASE_PATH === undefined ? '/' : process.env.GATSBY_BASE_PATH,
  assetCdn: "https://assets.stanford.edu/",
};

export { config };
