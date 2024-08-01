import { createRouter } from 'next-connect';
import axios from 'axios';

const lookupHandler = async (req, res) => {
  const { q: query } = req.query;
  const params = new URLSearchParams({
    address: query,
    key: process.env.GOOGLE_MAPS_API_KEY,
  });

  const location = await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`
    )
    .then((mapsResult) => {
      if (mapsResult.data.results) {
        return mapsResult.data.results[0];
      }
      return null;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });

  if (location) {
    res.status(200).json({
      location,
    });
  } else {
    res.status(400).json({
      message: 'Unable to find address',
    });
  }
};

const router = createRouter().get(lookupHandler);

export default router.handler();
