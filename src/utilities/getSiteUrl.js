const getSiteUrl = () => {
  // Support for Gatsby CLI
  let siteUrl = 'http://localhost:8000';

  console.debug('process.env.CONTEXT', process.env.CONTEXT);
  console.debug('process.env.NETLIFY', process.env.NETLIFY);
  console.debug('process.env.DEPLOY_PRIME_URL', process.env.DEPLOY_PRIME_URL);
  console.debug('process.env.NETLIFY_DEV', process.env.NETLIFY_DEV);

  // Support for Production site builds.
  if (process.env.CONTEXT === 'production') {
    siteUrl = process.env.URL;
  }
  // Support for non-production netlify builds (branch/preview)
  else if (process.env.CONTEXT !== 'production' && process.env.NETLIFY) {
    siteUrl = process.env.DEPLOY_PRIME_URL;
  }
  // Support for Netlify CLI. (String comparsion intentional - all environment variables are strings)
  else if (process.env.NETLIFY_DEV === 'true') {
    siteUrl = 'http://localhost:64946';
  }
  console.debug('siteUrl', siteUrl);

  return siteUrl;
};

module.exports = getSiteUrl;
