import StoryblokClient from 'storyblok-js-client';
import connect from 'next-connect';
import { authInstance } from '../utilities/authInstance';
import { MegaProfile } from '../utilities/MegaProfile';

const accessAllowed = (userAffiliations, protectedContentItem) => {
  let allowed = false;
  const allowedAffiliations = protectedContentItem.content.allowedAffiliations
    ? protectedContentItem.content.allowedAffiliations
    : [];

  allowedAffiliations.forEach((affiliation) => {
    if (
      userAffiliations.includes(affiliation) ||
      affiliation.includes('Authenticated')
    ) {
      allowed = true;
    }
  });

  return allowed;
};

const privateProxy = async (req, res) => {
  const mp = new MegaProfile();

  const storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  });
  const { data: affiliationsData } = await mp.get(
    `/${req.user.encodedSUID}/profiles/affiliations`
  );

  const { slug } = req.query;
  const storyblokRes = await storyblok.get(`cdn/stories/${slug}`);
  const { story } = storyblokRes.data;

  if (accessAllowed(affiliationsData.affiliations, story)) {
    res.status(200).json({ story });
  } else {
    res.status(403).send('Access Denied');
  }
};

const handler = connect().use(authInstance.authorize()).get(privateProxy);

export default handler;
