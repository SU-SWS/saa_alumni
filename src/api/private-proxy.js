import StoryblokClient from 'storyblok-js-client';

export default async function (req, res) {
  const storyblok = new StoryblokClient({
    accessToken: process.env.GATSBY_STORYBLOK_ACCESS_TOKEN,
  });
  // TODO: Check for JWT, decode it and confirm the user is authorized.
  const { slug } = req.query;
  const storyblokRes = await storyblok.get(`cdn/stories/${slug}`);
  const { story } = storyblokRes.data;
  res.status(200).json({ story });
}
