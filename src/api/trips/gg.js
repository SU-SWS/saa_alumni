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
  res.setHeader('Content-Type', ['text/csv', 'charset=utf-8']);
  res.setHeader('Strict-Transport-Security', 'max-age=2592000');
  res.setHeader('Cache-Control', [
    'max-age=0',
    'no-cache',
    'no-store',
    'must-revalidate',
  ]);

  // Get the trip ID out of the URL and sanitize it to number.
  const tripId = Number(req?.query?.data || req?.query?.urlData);
  console.log(req.query);

  if (!tripId) {
    res
      .status(200)
      .send(`prompt,,nothing,TRUE,,No URL Param Passed,TRUE,USD,,,,,,TRUE`);
    return;
  }

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
