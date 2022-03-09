import { AdaptAuth } from 'adapt-auth-sdk';
import getSiteUrl from './getSiteUrl';

// Automatically set origin, if not passed explicitly.
const siteUrl = getSiteUrl();
export const authInstance = new AdaptAuth({
  saml: {
    serviceProviderLoginUrl: process.env.ADAPT_AUTH_SAML_SP_URL,
    entity: process.env.ADAPT_AUTH_SAML_ENTITY || 'adapt-sso-uat',
    cert: process.env.ADAPT_AUTH_SAML_CERT,
    decryptionKey: process.env.ADAPT_AUTH_SAML_DECRYPTION_KEY,
    returnTo: process.env.ADAPT_AUTH_SAML_RETURN_URL,
    returnToOrigin: siteUrl,
    returnToPath: process.env.ADAPT_AUTH_SAML_RETURN_PATH,
  },
  session: {
    secret: process.env.ADAPT_AUTH_SESSION_SECRET,
    name: process.env.ADAPT_AUTH_SESSION_NAME || 'adapt-auth',
    expiresIn: process.env.ADAPT_AUTH_SESSION_EXPIRES_IN || '12h',
    loginRedirectUrl: process.env.ADAPT_AUTH_SESSION_LOGIN_URL || '/',
    unauthorizedRedirectUrl: process.env.ADAPT_AUTH_SESSION_UNAUTHORIZED_URL,
  },
});
