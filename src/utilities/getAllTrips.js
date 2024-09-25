/**
 * Fetch the Trip from Storyblok.
 * @param {*} tripId
 * @returns
 */
const getAllTrips = async (storyblok) => {
  try {
    const trips = await storyblok.getAll(`cdn/stories`, {
      filter_query: {
        component: {
          in: 'trip',
        },
      },
    });

    return trips;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
};

export default getAllTrips;
