// Get MP User Data and append to User
// Do not enable for public use. This is for development/debugging purposes only.
// Data can be viewed at /api/auth/megaprofile-data
// -----------------------------------------------------------------------------
import connect from 'next-connect';
import { MegaProfile } from '../../utilities/MegaProfile';
import { authInstance } from '../../utilities/authInstance';
import { ExceptionHandler } from '../../utilities/ApiExceptions';
import { tokenFetcher, profileFetcher } from '../../utilities/getGgProfile';
import { fullggMockData } from '../../utilities/mocks';
import { isStoryblokEditor } from '../../utilities/isStoryblokEditor';

/**
 * Fetches the profile data from the MEGA PROFILE API endpoints.
 */
const megaprofileHandler = async (req, res) => {
  const mp = new MegaProfile();
  try {
    const session = req.user;
    const profileId = req.user.encodedSUID;
    const token = await tokenFetcher();
    const fullgg = await profileFetcher(profileId, token);

    const { data: affiliations } = await mp.get(
      `/${profileId}/profiles/affiliations`
    );

    const mpUser = { ...fullgg, affiliations, session };
    return res.status(200).json(mpUser);
  } catch (err) {
    return ExceptionHandler(res, err);
  }
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
