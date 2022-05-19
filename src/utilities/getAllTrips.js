/**
 * Fetch the Trip from Storyblok.
 * @param {*} tripId
 * @returns
 */
const getAllTrips = async (storyblok, res) => {
  let currentPage = 1;
  let trips = [];
  const perpage = 25;
  const requests = [];
  const storyblokRes = await storyblok.get(`cdn/stories/`, {
    filter_query: {
      component: {
        in: 'trip',
      },
    },
    per_page: perpage,
    page: currentPage,
  });

  const { total } = storyblokRes;
  trips = trips.concat(storyblokRes.data.stories);

  while (currentPage * perpage < total) {
    currentPage += 1;
    requests.push(
      storyblok.get(`cdn/stories/`, {
        filter_query: {
          component: {
            in: 'trip',
          },
        },
        per_page: perpage,
        page: currentPage,
      })
    );
  }

  await Promise.all(requests)
    .then((vals) => {
      vals.forEach((val) => {
        trips = trips.concat(val.data.stories);
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err);
    });

  return trips;
};

export default getAllTrips;
