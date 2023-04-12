/* eslint-disable no-console */
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
  const profileId = req.user.encodedSUID;
  const session = req.user;
  let fullgg = {};
  let affiliations = {};
  let contact = {};
  // Three simultaneous requests to the API in hopes to stay under 10s.
  const requests = [
    mp.get(`/${profileId}/profiles/fullgg`),
    mp.get(`/${profileId}/profiles/affiliations`),
    mp.get(`/${profileId}/profiles/contact`),
  ];

  const resolved = await Promise.allSettled(requests);

  // Full GG Data.
  if (resolved[0].status === 'fulfilled') {
    fullgg = resolved[0].value.data;
  } else {
    fullgg.name = {};
    fullgg.name.digitalName = `${req.user.firstName} ${req.user.lastName}`;
  }

  // Affiliations Data;
  if (resolved[1].status === 'fulfilled') {
    affiliations = resolved[1].value.data.affiliations;
  }

  // Contact Data;
  if (resolved[2].status === 'fulfilled') {
    contact = resolved[2].value.data.contact;
  }

  const mpUser = {
    session,
    ...fullgg,
    affiliations,
    profilePhotoURL: contact?.profilePhotoURL,
  };
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
