/**
 * Fetch the Trip Form from Storyblok.
 * @param {*} tripId
 * @returns
 */
const getTripFormStory = async (storyblok, uuid) => {
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
