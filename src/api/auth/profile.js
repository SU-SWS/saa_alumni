// Get MP User Data and append to User
// Do not enable for public use. This is for development/debugging purposes only.
// Data can be viewed at /api/auth/megaprofile-data
// -----------------------------------------------------------------------------
import connect from 'next-connect';
import { MegaProfile } from '../../utilities/MegaProfile';
import { authInstance } from '../../utilities/authInstance';
import { ExceptionHandler } from '../../utilities/ApiExceptions';

/**
 * Fetches the profile data from the MEGA PROFILE API endpoints.
 */
const megaprofileHandler = async (req, res) => {
  const mp = new MegaProfile();
  const profileId = req.user.encodedSUID;
  let fullgg;
  let affiliations;

  // While the authentication is between states support fetching by both oauth
  // services for the majority of the profile information.
  try {
    const fullggresult = await mp.get(`/${profileId}/profiles/fullgg`);
    fullgg = fullggresult.data;
  } catch (err) {
    return ExceptionHandler(res, err);
  }

  // Affiliations is already on the keycloak ouath so we fetch here.
  try {
    const mpresult = await mp.get(`/${profileId}/profiles/affiliations`);
    affiliations = mpresult.data.affiliations;
  } catch (err) {
    return ExceptionHandler(res, err);
  }

  const mpUser = { ...fullgg, affiliations };
  return res.status(200).json(mpUser);
};

const handler = connect().use(authInstance.authorize()).get(megaprofileHandler);

export default handler;
