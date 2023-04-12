/* eslint-disable no-console */
import connect from 'next-connect';
import { authInstance } from '../../utilities/authInstance';
import { AssetClient } from '../../utilities/asset';

const assetHandler = async (req, res) => {
  const asset = new AssetClient();

  const { filename } = req.query;

  if (!filename) {
    res.status(400).send('Missing filename');
    return;
  }

  try {
    const result = await asset.get(filename);
    res.status(200).json(result);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      res.status(error.response.status).send('Something went wrong.');
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      res.status(408).send('Request Timeout');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      res.status(500).send('Bad Request');
    }
    console.log(error.config);
  }
};

const handler = connect().use(authInstance.authorize()).get(assetHandler);
export default handler;
