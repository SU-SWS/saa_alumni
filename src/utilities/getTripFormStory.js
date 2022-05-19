import StoryblokClient from 'storyblok-js-client';

/**
 * The Storyblok API client.
 */
const storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
});

/**
 * Fetch the Trip Form from Storyblok.
 * @param {*} tripId
 * @returns
 */
const getTripFormStory = async (uuid) => {
  const formRes = await storyblok.get(`cdn/stories`, {
    filter_query: {
      component: {
        in: 'registrationFormPage',
      },
      trip: {
        in: uuid,
      },
    },
    per_page: 1,
  });

  return formRes?.data?.stories.pop();
};

export default getTripFormStory;
