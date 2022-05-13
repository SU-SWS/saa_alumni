import StoryblokClient from 'storyblok-js-client';

const { EOL } = require('os');

/**
 * The Storyblok API client.
 */
const storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
});

/**
 * Format for CSV export.
 * @param {*} data
 *  Rows of arrays of strings
 * @returns
 */
const formatData = (data) => {
  let ret = '';
  data.forEach((row) => {
    ret += `${row.concat(',').slice(0, -1)}${EOL}`;
  });

  ret += EOL;
  return ret;
};

/**
 * Fetch the Trip from Storyblok.
 * @param {*} tripId
 * @returns
 */
const getAllTrips = async (res) => {
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

/**
 * Export Handler.
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Content-Type', 'text/csv');
  res.setHeader('x-robots-tag', ['noindex', 'nofollow', 'nosnippet']);
  res.setHeader('x-content-type-options', 'nosniff');
  res.setHeader('x-xss-protection', '1; mode=block');
  res.setHeader('Cache-Control', ['max-age=300', 'private']);
  res.setHeader('Expires', new Date().toUTCString());
  res.setHeader('date', new Date().toUTCString());
  res.setHeader('accept-ranges', 'none');
  res.setHeader('vary', 'Accept-Encoding');

  // TMP: for testing
  const options = {
    single: 'Single Bed',
    double: 'Double Bed',
    triple: 'Triple Bed',
    quad: 'Quad Bed',
    king: 'King Bed',
    queen: 'Queen Bed',
    twin: 'Twin Bed',
    sofa: 'Sofa',
    sofaBed: 'Sofa Bed',
    sofaCabinet: 'Sofa Cabinet',
  };

  // Fetch the trip stories from storyblok.
  const trips = await getAllTrips(res);

  if (!trips) {
    res.status(404).send(`Unable to find any trips`);
    return;
  }

  // TMP FOR TESTING.
  trips.push({ content: { tripId: '123' } });

  // // Fetch the trip form information from storyblok. if we need it.
  // const registrationForm = await getTripFormStory(trip.uuid);
  // if (!registrationForm) {
  //   res.status(404).send(`Registration Form with id ${tripId} not found`);
  //   return;
  // }

  // Aggregate and compile it in the format that GG expects.
  const data = [
    [
      'type',
      'code',
      'answer',
      'available',
      'description',
      'label',
      'price_fixed',
      'currency',
      'list_price_amount',
      'minimum_price_amount',
      'maximum_price_amount',
      'invalid_after_uses',
      'invalid_after_date',
      'answer_fixed',
    ],
  ];

  trips.forEach((trip) => {
    // No trip Id. No Entry.
    if (!Number(trip.content.tripId)) {
      return;
    }

    // Loop through the bed types in our temporary array. In the future we will
    // pull the options right from the trip information.
    Object.entries(options).forEach((option) => {
      const [bedTypeKey, bedTypeValue] = option;
      data.push([
        'prompt',
        trip.content.tripId,
        bedTypeKey,
        'TRUE',
        '',
        bedTypeValue,
        'TRUE',
        'USD',
        '',
        '',
        '',
        '',
        '',
        'TRUE',
      ]);
    });
  });

  // Trip.
  res.status(200).send(formatData(data));
}
