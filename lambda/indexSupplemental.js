const algoliasearch = require("algoliasearch");
const StoryblokClient = require("storyblok-js-client");

const storyblok = new StoryblokClient({
  accessToken: process.env.GATSBY_STORYBLOK_ACCESS_TOKEN,
});

const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.ALGOLIA_WRITE_KEY
);

exports.handler = async (event, context) => {
  if (
    !event.queryStringParameters.key ||
    event.queryStringParameters.key !== process.env.LAMBDA_SECRET
  ) {
    throw Error("Secret key is missing or invalid");
  }

  const response = await storyblok
    .get("cdn/stories/", {
      starts_with: "search-configuration/custom-search-entries",
    })
    .then((res) => res);

  if (response.data.stories) {
    const indexEntries = response.data.stories.map((story) => ({
      objectID: story.uuid,
      title: story.content.title,
      domain: story.content.domain,
      url: story.content.url,
      body: story.content.body,
      siteName: story.content.siteName,
      image: story.content.image.filename,
    }));
    const index = algoliaClient.initIndex("alumni_supplemental");
    index.saveObjects(indexEntries);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Saved custom entries to alumni_supplemental index.",
      }),
    };
  }
};
