const { AdaptAuth } = require('adapt-auth-sdk');
const getSiteUrl = require('../../src/utilities/getSiteUrl');

// Automatically set origin, if not passed explicitly.
const siteUrl = getSiteUrl();
const authInstance = new AdaptAuth({
  saml: {
    cert: process.env.ADAPT_AUTH_SAML_CERT,
    decryptionKey: process.env.ADAPT_AUTH_SAML_DECRYPTION_KEY,
    returnToOrigin: siteUrl,
    returnToPath: process.env.ADAPT_AUTH_SAML_RETURN_PATH,
  },
  session: {
    secret: process.env.ADAPT_AUTH_SESSION_SECRET,
    loginRedirectUrl: process.env.ADAPT_AUTH_SESSION_LOGIN_URL || '/',
    unauthorizedRedirectUrl: '/403-access-denied',
  },
});

module.exports = authInstance;
