import axios from 'axios';
import connect from 'next-connect';
import { authInstance } from '../../utilities/authInstance';
import { ExceptionHandler } from '../../utilities/ApiExceptions';

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
const tokenFetcher = async () => {
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

const profileFetcher = async (profileID, token) => {
  let response;
  const endpoint = `${process.env.MEGAPROFILE_PROFILE_URL}/${profileID}/${process.env.MEGAPROFILE_PROFILE_TYPE}`;
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

// GG Profile Data
//-----------------------------------------------------------------------------
const ggProfileHandler = async (req, res) => {
  let tokenData;
  const { user } = req;

  // Fetch the bearer from the API Gateway
  try {
    tokenData = await tokenFetcher();
  } catch (error) {
    res.status(500).send('Could not fetch bearer token.');
  }

  try {
    const { data: ggProfile } = await profileFetcher(
      req.user?.encodedSUID,
      tokenData
    );
    const ggUserData = { user, ggProfile };
    return res.status(200).json(ggUserData);
  } catch (err) {
    return ExceptionHandler(res, err);
  }
};

const handler = connect().use(authInstance.authorize()).get(ggProfileHandler);

export default handler;
