// Get A User Data. Delete this prior to merging branch into TSGG
// Do not enable for public use. This is for development/debugging purposes only.
// Data can be viewed at /api/megaprofile-test
// -----------------------------------------------------------------------------
import { AdaptAuth } from 'adapt-auth-sdk';
import fetch from 'node-fetch';
import { MegaProfile } from '../utilities/MegaProfile';
import getSiteUrl from '../utilities/getSiteUrl';

// Automatically set origin, if not passed explicitly.
const siteUrl = getSiteUrl();
const authInstance = new AdaptAuth({
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

export default async function handler(req, res) {
  // TODO: Put behind authentication.
  // const mp = new MegaProfile();
  const url = `http://localhost:64946/api/auth/session`;

  try {
    authInstance.authorize({ redirectUrl: 'api/auth/login' });
    // const result = await fetch(url).then(async (userRes) => {
    //   if (userRes.status === 200) {
    //     const body = await userRes.json();
    //     console.log(body);
    //   } else {
    //     console.log('Not authenticated');
    //   }
    // });
    const result = await fetch(url);
    const body = await result.json();
    console.log(body);
    res.status(200).json(body);
    // TODO: Once we have the user data, we can append the megaprofile data.
    // const { contact } = await mp.get(`${user.encodedSUID}/profiles/contact`);
    // const { addresses } = await mp.get(`${user.encodedSUID}/profiles/addresses`);
    // const { emails } = await mp.get(`${user.encodedSUID}/profiles/emails`);
    // const { phoneNumbers } = await mp.get(`${user.encodedSUID}/profiles/phonenumbers`);
    // const newUser = { ...user, contact, addresses, emails, phoneNumbers };
    // res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json(e.response.data);
  }
}
