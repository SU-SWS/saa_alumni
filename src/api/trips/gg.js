import StoryblokClient from 'storyblok-js-client';

const { EOL } = require('os');

const storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
});

const formatData = (data) => {
  let ret = '';
  data.forEach((row) => {
    ret += `${row.concat(',')}${EOL}`;
  });

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
  // Get the trip ID out of the URL and sanitize it to number.
  const tripId = Number(req?.query?.urlData);
  if (!tripId) {
    res.status(404).send(`Trip ID parameter not found`);
    return;
  }

  // Fetch the trip story from storyblok.
  const trip = await getTripStory(tripId);
  if (!trip) {
    res.status(404).send(`Trip with id ${tripId} not found`);
    return;
  }

  // Fetch the trip form information from storyblok.
  const registrationForm = await getTripFormStory(trip.uuid);
  if (!registrationForm) {
    res.status(404).send(`Registration Form with id ${tripId} not found`);
    return;
  }

  // Aggregate and compile it in the format that GG expects.
  const data = [];
  data.push([
    'prompt',
    tripId,
    'single',
    'TRUE',
    '',
    'Single Bedroom',
    'TRUE',
    'USD',
    0,
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
    0,
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
    0,
    '',
    '',
    '',
    '',
    'TRUE',
  ]);

  // Trip.
  res.status(200).send(formatData(data));
}
