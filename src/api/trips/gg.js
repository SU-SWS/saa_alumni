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
const getTripStory = async (tripId) => {
  const tripRes = await storyblok.get(`cdn/stories`, {
    filter_query: {
      component: {
        in: 'trip',
      },
      tripId: {
        in: tripId,
      },
    },
    per_page: 1,
  });

  return tripRes?.data?.stories.pop();
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
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('x-robots-tag', ['noindex', 'nofollow', 'nosnippet']);
  res.setHeader('x-content-type-options', 'nosniff');
  res.setHeader('x-xss-protection', '1; mode=block');
  res.setHeader('Cache-Control', ['max-age=300', 'private']);
  res.setHeader('Expires', '0');
  res.setHeader('date', new Date().toUTCString());
  res.setHeader('accept-ranges', 'none');
  res.setHeader('vary', 'Accept-Encoding');

  // const defaultArray = [
  //   'prompt', '', 'none', 'TRUE', '', 'No URLData or data query parameter provided.', 'TRUE', 'USD', '', '', '', '', '', 'TRUE',
  // ];

  // Get the trip ID out of the URL and sanitize it to number.
  const tripId = Number(req?.query?.data || req?.query?.urlData);
  res.setHeader(
    'content-disposition',
    `attachment; filename="trip-${tripId}.csv"`
  );

  console.log(req.query);

  // if (!tripId) {
  //   res.status(200).send(`${defaultArray.concat(',').slice(0, -1)}`);
  //   return;
  // }

  // Fetch the trip story from storyblok.
  // const trip = await getTripStory(tripId);
  // if (!trip) {
  //   res.status(404).send(`Trip with id ${tripId} not found`);
  //   return;
  // }

  // // Fetch the trip form information from storyblok.
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
  data.push([
    'prompt',
    tripId,
    'single',
    'TRUE',
    '',
    'Single Bedroom',
    'TRUE',
    'USD',
    '',
    '',
    '',
    '',
    '',
    'TRUE',
  ]);

  data.push([
    'prompt',
    tripId,
    'double',
    'TRUE',
    '',
    'Double Bedroom',
    'TRUE',
    'USD',
    '',
    '',
    '',
    '',
    '',
    'TRUE',
  ]);

  data.push([
    'prompt',
    tripId,
    'queen',
    'TRUE',
    '',
    'Queen Bedroom',
    'TRUE',
    'USD',
    '',
    '',
    '',
    '',
    '',
    'TRUE',
  ]);

  data.push([
    'prompt',
    tripId,
    'king',
    'TRUE',
    '',
    'King Bedroom',
    'TRUE',
    'USD',
    '',
    '',
    '',
    '',
    '',
    'TRUE',
  ]);

  // Trip.
  res.status(200).send(formatData(data));
}
