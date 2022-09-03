import StoryblokClient from 'storyblok-js-client';
import connect from 'next-connect';
import { authInstance } from '../utilities/authInstance';
import { MegaProfile } from '../utilities/MegaProfile';

const accessAllowed = (userAffiliations, protectedContentItem) => {
  console.log("userAffiliations");
  let allowed = false;
  const allowedAffiliations = protectedContentItem.content.allowedAffiliations
    ? protectedContentItem.content.allowedAffiliations
    : [];

  allowedAffiliations.forEach((affiliation) => {
    if (userAffiliations.includes(affiliation)) {
      allowed = true;
    }
  });

  return allowed;
};

const privateProxy = async (req, res) => {
  const mp = new MegaProfile();
  let storyblokRes;
  console.log("LOG 1");

  const storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  });

  console.log("LOG 2");

  const { data: affiliationsData } = await mp.get(
    `/${req.user.encodedSUID}/profiles/affiliations`
  );
  console.log("LOG 3.3");
  const { slug } = req.query;
  console.log('slug', slug);
  console.log(req.query);
  try {
    storyblokRes = await storyblok.get(`cdn/stories/${slug}`);
  } catch (err) {
    console.error(err);
  }

  const { story } = storyblokRes.data;

  console.log("LOG 4");

  if (accessAllowed(affiliationsData.affiliations, story)) {
    res.status(200).json({ story });
  } else {
    res.status(403).send('Access Denied');
  }
};

const handler = connect().use(authInstance.authorize()).get(privateProxy);

export default handler;
