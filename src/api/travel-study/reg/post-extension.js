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
  const trips = await getAllTrips(storyblok, res);

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

  trips.forEach((trip) => {
    // No trip Id. No Entry.
    if (!Number(trip.content.tripId)) {
      return;
    }

    if (trip?.content?.postExtendPrice) {
      const dollarValue = trip.content.postTripExtensionDeposit
        ? trip.content.postTripExtensionDeposit
        : trip.content?.extendDepositPrice?.replace(/\D/g, '');
      data.push([
        'prompt',
        trip.content.tripId,
        'Yes',
        'TRUE',
        '',
        'Yes',
        'TRUE',
        'USD',
        `${dollarValue}00`,
        '',
        '',
        '',
        '',
        'TRUE',
      ]);
      data.push([
        'prompt',
        trip.content.tripId,
        'No',
        'TRUE',
        '',
        'No',
        'TRUE',
        'USD',
        '',
        '',
        '',
        '',
        '',
        'TRUE',
      ]);
    }
  });

  // Trip.
  res.status(200).send(formatData(data));
}
