/**
 * MEGAPROFILE API ENDPOINT
 */

// Variables.
// -----------------------------------------------------------------------------
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const fetch = require('node-fetch');
const Url = require('url-parse');
const { Headers } = require('node-fetch');
const serverless = require('serverless-http');
const { ClientCredentials } = require('simple-oauth2');
const { AdaptAuth } = require('adapt-auth-sdk');
const getSiteUrl = require('../src/utilities/getSiteUrl');

// Express Configuration.
// Configure express to be able to handle json and cookies.
// -----------------------------------------------------------------------------
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

// Bearer token fetcher through the simple-oauth2 package.
// -----------------------------------------------------------------------------
const bearerUrl = Url(process.env.MEGAPROFILE_TOKEN_URL);
const megaTokenAuth = new ClientCredentials({
  client: {
    id: process.env.MEGAPROFILE_CLIENT_ID,
    secret: process.env.MEGAPROFILE_CLIENT_SECRET,
  },
  auth: {
    tokenHost: `${bearerUrl.protocol}//${bearerUrl.host}`,
    tokenPath: bearerUrl.pathname,
  },
});

/**
 * Get Bearer Token
 *
 * Fetches and returns a bearer token string using the client/secret provided.
 *
 * @returns {string|bool}
 *   The bearer token string if successful or false if not.
 */
const tokenFetcher = async () => {
  let response;
  const tokenParams = { scope: [] };
  const tokenOpts = { json: true };

  try {
    response = await megaTokenAuth.getToken(tokenParams, tokenOpts);
  } catch (error) {
    console.error(error.output);
    return false;
  }

  if (response && response.token && response.token.access_token) {
    return response.token.access_token;
  }

  console.error(response);
  throw new Error('Response did not contain access token');
};

/**
 * Get profile data from the MEGA PROFILE
 *
 * @param {string} profileID
 *   The encodedsuid of the person you are fetching data on.
 * @param {string} token
 *   The bearer token used to gain access to the megaprofile api endpoint.
 *
 * @returns {string|bool}
 *   Either json data about the person or false.
 */
const profileFetcher = async (profileID, token) => {
  let response;
  let body;
  const endpoint = `${process.env.MEGAPROFILE_PROFILE_URL}/${profileID}/${process.env.MEGAPROFILE_PROFILE_TYPE}`;
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  try {
    response = await fetch(endpoint, {
      headers,
      timeout: 9000,
    });
  } catch (error) {
    console.error(error);
    return error;
  }

  try {
    body = await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }

  if (body) {
    return body;
  }

  return { error: true, message: 'Could not fetch profile from API' };
};

// Get A Token.
// Do not enable for public use. This is for debugging purposes only.
// -----------------------------------------------------------------------------
app.get(`/api/mega/token`, async (req, res) => {
  const data = await tokenFetcher();
  res.send(JSON.stringify(data));
});

// Profile Data Endpoint
//-----------------------------------------------------------------------------
app.get(
  `/api/mega/profile`,
  authInstance.authorize({ allowUnauthorized: false }),
  async (req, res) => {
    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    let tokenData;

    // Fetch the bearer from the API Gateway
    try {
      tokenData = await tokenFetcher();
    } catch (error) {
      res.status(500).send('Could not fetch bearer token.');
    }

    const profile = await profileFetcher(req.user?.encodedSUID, tokenData);

    // If we get a profile from the profile API send it to the browser.
    if (profile && profile.data) {
      res.status(200).json(profile.data);
    }
    // Otherwise, put out an error json message.
    else {
      console.error(profile);
      res.status(500).send('Could not fetch profile data.');
    }
  }
);

// Start the express service as the serverless version by wrapping it.
// -----------------------------------------------------------------------------
exports.handler = serverless(app);
