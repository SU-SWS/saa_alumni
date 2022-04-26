import axios from 'axios';

/**
 * Get Bearer Token
 * Fetches and returns a bearer token string using the client/secret provided.
 */
const baseUrl = process.env.MEGAPROFILE_TOKEN_URL;
const params = {
  client_id: process.env.MEGAPROFILE_CLIENT_ID,
  client_secret: process.env.MEGAPROFILE_CLIENT_SECRET,
  grant_type: 'client_credentials',
};

export const tokenFetcher = async () => {
  const response = await axios.post(baseUrl, null, { params });

  if (response && response.data && response.data.access_token) {
    return response.data.access_token;
  }

  console.error(response);
  throw new Error('Response did not contain access token');
};

/**
 * Get profile data from the MEGA PROFILE API
 */

export const profileFetcher = async (profileID, token) => {
  let response;
  const endpoint = `${process.env.MEGAPROFILE_PROFILE_URL}/${profileID}/profiles/fullgg`;
  const client = await axios.create({
    baseURL: endpoint,
    headers: {
      common: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  try {
    response = await client.get();
    return response;
  } catch (error) {
    console.error(error);
  }

  return { error: true, message: 'Could not fetch profile from API' };
};
