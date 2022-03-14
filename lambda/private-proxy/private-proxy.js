const StoryblokClient = require('storyblok-js-client');
const storyblok = new StoryblokClient({
  accessToken: process.env.GATSBY_STORYBLOK_ACCESS_TOKEN,
});

exports.handler = async function(event, context) {
  // TODO: Check for JWT, decode it and confirm the user is authorized.
  const { slug } = event.queryStringParameters;
  const storyblokRes = await storyblok.get(`cdn/stories/${slug}`);
  const { story } = storyblokRes.data;

  return {
    statusCode: 200,
    body: JSON.stringify({
      story,
    }),
  };
};
