import StoryblokClient from 'storyblok-js-client';
import getAllTrips from '../../../utilities/getAllTrips';
import formatData from '../../../utilities/formatDataCsv';

/**
 * The Storyblok API client.
 */
const storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
});

/**
 * Get Rooom Category Object from Storyblok.
 * @returns
 */
const getRoomCategory = async () => {
  const roomCategoryRes = await storyblok.get(`cdn/datasource_entries`, {
    datasource: 'room-category',
  });

  const { data } = roomCategoryRes;
  const roomCategory = {};
  data.datasource_entries.forEach((category) => {
    roomCategory[category.name] = category.value;
  });
  return roomCategory;
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

  // Fetch the trip stories from storyblok.
  const trips = await getAllTrips(res);

  if (!trips) {
    res.status(404).send(`Unable to find any trips`);
    return;
  }

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

  const roomCategory = await getRoomCategory();

  trips.forEach((trip) => {
    // No trip Id. No Entry.
    if (!Number(trip.content.tripId)) {
      return;
    }

    // Loop through the bed types in our temporary array. In the future we will
    // pull the options right from the trip information.
    trip?.content?.roomCategory?.forEach((categoryValue) => {
      const categoryKey = Object.keys(roomCategory).find(
        (key) => roomCategory[key] === categoryValue
      );
      data.push([
        'prompt',
        trip.content.tripId,
        categoryValue,
        'TRUE',
        '',
        categoryKey,
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
