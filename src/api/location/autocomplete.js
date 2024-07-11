import { createRouter } from 'next-connect';
import axios from 'axios';

const autocompleteHandler = async (req, res) => {
  const { q: query } = req.query;
  const params = new URLSearchParams({
    input: query,
    types: '(cities)',
    key: process.env.GOOGLE_MAPS_API_KEY,
  });

  console.log('Params:', params);

  // eslint-disable-next-line max-len
  const suggestions = await axios
    .get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`
    )
    .then((mapsResult) => {
      if (mapsResult.data.predictions) {
        return mapsResult.data.predictions;
      }

      return [];
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });

  if (suggestions) {
    res.status(200).json({
      results: suggestions,
    });
  } else {
    res.status(400).json({
      message: 'Unable to find address',
    });
  }
};

const router = createRouter().get(autocompleteHandler);

export default router.handler();
