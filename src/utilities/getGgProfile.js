import Url from 'url-parse';
import { ClientCredentials } from 'simple-oauth2';
import axios from 'axios';
import mockServer from './mockServer';

/**
 * Get Bearer Token
 * Fetches and returns a bearer token string using the client/secret provided.
 */
export const tokenFetcher = async () => {
  // The OAuth Bearer token granter.
  const TOKEN_URL = process.env.MEGAPROFILE_TOKEN_URL;

  const bearerUrl = Url(TOKEN_URL);
  // These are required to operate and are not defaulted. Contact a developer for
  // these credentials. These credentials are used to fetch a bearer token from
  // the TOKEN_URL endpoint.
  const CLIENT_ID = process.env.MEGAPROFILE_CLIENT_ID;
  const CLIENT_SECRET = process.env.MEGAPROFILE_CLIENT_SECRET;

  const megaTokenAuth = new ClientCredentials({
    client: {
      id: CLIENT_ID,
      secret: CLIENT_SECRET,
    },
    auth: {
      tokenHost: `${bearerUrl.protocol}//${bearerUrl.host}`,
      tokenPath: bearerUrl.pathname,
    },
  });

  let response;
  const tokenParams = { scope: [] };
  const tokenOpts = { json: true };

  try {
    response = await megaTokenAuth.getToken(tokenParams, tokenOpts);
  } catch (error) {
    return false;
  }

  if (response && response.token && response.token.access_token) {
    return response.token.access_token;
  }

  throw new Error('Response did not contain access token');
};

/**
 * Get profile data from the MEGA PROFILE API
 */
export const profileFetcher = async (profileId, token) => {
  const client = axios.create({
    baseURL: process.env.MEGAPROFILE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (process.env.MEGAPROFILE_MOCK === 'true') {
    mockServer(client);
  }

  const contact = await client
    .get(`${profileId}/profiles/fullgg`)
    .then((result) => result.data)
    .catch((err) => {
      throw new Error('Failed to fetch profile.');
    });

  return contact;
};
