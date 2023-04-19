/* eslint-disable no-console */
// Get MP User Data and append to User
// Do not enable for public use. This is for development/debugging purposes only.
// Data can be viewed at /api/auth/megaprofile-data
// -----------------------------------------------------------------------------
import connect from 'next-connect';
import { MegaProfile } from '../../utilities/MegaProfile';
import { authInstance } from '../../utilities/authInstance';
import { fullprofileMockData } from '../../utilities/mocks';
import { isStoryblokEditor } from '../../utilities/isStoryblokEditor';

/**
 * Fetches the profile data from the MEGA PROFILE API endpoints.
 */
const megaprofileHandler = async (req, res, next) => {
  const mp = new MegaProfile();
  const profileId = req.user.encodedSUID;
  const session = req.user;
  let fullprofile = {};
  // @TODO: Comment back in and test when endpoint is live
  // let membership = {}
  // Four simultaneous requests to the API in hopes to stay under 10s.
  const requests = [
    mp.get(`/${profileId}/profiles/fullprofile`),
    // @TODO: Comment back in and test when endpoint is live
    // mp.get(`/${profileId}/profiles/memberships`),
  ];

  const resolved = await Promise.allSettled(requests);

  // Full GG Data.
  if (resolved[0].status === 'fulfilled') {
    fullprofile = resolved[0].value.data;
  } else {
    fullprofile.contact.name = {};
    fullprofile.contact.name.digitalName = `${req.user.firstName} ${req.user.lastName}`;
  }

  // @TODO: Comment back in and test when endpoint is live
  // Membership Data;
  // if (resolved[3].status === 'fulfilled') {
  //   membership = resolved[3].value.data.membership;
  // }

  const mpUser = {
    session,
    ...fullprofile,
    // @TODO: Comment back in and test when endpoint is live
    // membership,
  };
  res.status(200).json(mpUser);
  next();
};

const storyblokPreviewPassthrough = async (req, res, next) => {
  const isEditor = await isStoryblokEditor(req);
  if (isEditor) {
    res.json(fullprofileMockData);
  } else next();
};

const handler = connect()
  .get(storyblokPreviewPassthrough)
  .use(authInstance.authorize())
  .get(megaprofileHandler);

export default handler;
