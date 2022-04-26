// Get MP User Data and append to User
// Do not enable for public use. This is for development/debugging purposes only.
// Data can be viewed at /api/auth/megaprofile-data
// -----------------------------------------------------------------------------
import connect from 'next-connect';
import Url from 'url-parse';
import { ClientCredentials } from 'simple-oauth2';
import axios from 'axios';
import { MegaProfile } from '../../utilities/MegaProfile';
import { authInstance } from '../../utilities/authInstance';
import { ExceptionHandler } from '../../utilities/ApiExceptions';

const fetchProfileToken = async () => {
  // The OAuth Bearer token granter.
  const TOKEN_URL = process.env.LEGACY_MEGAPROFILE_TOKEN_URL;

  const bearerUrl = Url(TOKEN_URL);
  // These are required to operate and are not defaulted. Contact a developer for
  // these credentials. These credentials are used to fetch a bearer token from
  // the TOKEN_URL endpoint.
  const CLIENT_ID = process.env.LEGACY_MEGAPROFILE_CLIENT_ID;
  const CLIENT_SECRET = process.env.LEGACY_MEGAPROFILE_CLIENT_SECRET;

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

const fetchLegacyProfile = async (profileId) => {
  const token = await fetchProfileToken();
  const contact = await axios
    .get(`${process.env.MEGAPROFILE_URL}${profileId}/profiles/fullgg`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => result.data)
    .catch((err) => {
      throw new Error('Failed to fetch legacy profile.');
    });

  return contact;
};

const megaprofileHandler = async (req, res) => {
  const mp = new MegaProfile();
  try {
    const profileId = req.user.encodedSUID;
    const contact = await fetchLegacyProfile(profileId);
    const { data: affiliations } = await mp.get(
      `/${profileId}/profiles/affiliations`
    );
    const mpUser = { ...contact, affiliations };
    return res.status(200).json(mpUser);
  } catch (err) {
    return ExceptionHandler(res, err);
  }
};

const handler = connect().use(authInstance.authorize()).get(megaprofileHandler);

export default handler;
