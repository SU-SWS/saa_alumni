// Get MP User Data and append to User
// Do not enable for public use. This is for development/debugging purposes only.
// Data can be viewed at /api/auth/megaprofile-data
// -----------------------------------------------------------------------------
import connect from 'next-connect';
import { MegaProfile } from '../../utilities/MegaProfile';
import { authInstance } from '../../utilities/authInstance';
import { fullggMockData } from '../../utilities/mocks';
import { isStoryblokEditor } from '../../utilities/isStoryblokEditor';

/**
 * Fetches the profile data from the MEGA PROFILE API endpoints.
 */
const megaprofileHandler = async (req, res, next) => {
  const mp = new MegaProfile();
  // const profileId = req.user.encodedSUID;
  const profileId = undefined;
  const session = req.user;
  let fullgg = {};
  let affiliations = [];

  // While the authentication is between states support fetching by both oauth
  // services for the majority of the profile information.
  try {
    const fullggresult = await mp.get(`/${profileId}/profiles/fullgg`);
    fullgg = fullggresult.data;
  } catch (err) {
    console.error(err);
    fullgg.name = {};
    fullgg.name.digitalName = `${req.user.firstName} ${req.user.lastName}`;
  }

  // // Affiliations is already on the keycloak ouath so we fetch here.
  try {
    const mpresult = await mp.get(`/${profileId}/profiles/affiliations`);
    affiliations = mpresult.data.affiliations;
  } catch (err) {
    console.error(err);
  }

  const mpUser = { session, ...fullgg, affiliations };
  res.status(200).json(mpUser);
  next();
};

const storyblokPreviewPassthrough = async (req, res, next) => {
  const isEditor = await isStoryblokEditor(req);
  if (isEditor) {
    res.json(fullggMockData);
  } else next();
};

const handler = connect()
  .get(storyblokPreviewPassthrough)
  .use(authInstance.authorize())
  .get(megaprofileHandler);

export default handler;
