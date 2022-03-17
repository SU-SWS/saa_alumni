// Gateway Auth Token
// Do not enable for public use. This is for development/debugging purposes only.
// Data can be viewed at /api/auth/status
// -----------------------------------------------------------------------------
import connect from 'next-connect';
import { authInstance } from '../../utilities/authInstance';
import { ApiGatewayAuth } from '../../utilities/ApiGatewayAuth';

const gatewayAuthHandler = async (req, res) => {
  const auth = new ApiGatewayAuth();
  // let tokenData;

  // Token protect enpoint.
  // if (req.query.token !== process.env.STATUSCAKE_TOKEN) {
  //   res.status(403).send('Could not validate page token.');
  //   return;
  // }

  // Fetch the token from the API Gateway
  try {
    const tokenData = await auth.authenticate();
    res.status(200).json({ tokenData });
  } catch (error) {
    res.status(500).send('Could not fetch bearer token.');
  }

  // const userProfile = await profileFetcher('66530456105', tokenData);

  // If we get a profile from the profile API send it to the browser.
  // if (userProfile && userProfile.encodedSUID) {
  //   res.status(200).send('Success');
  // }
  // Otherwise, put out an error json message.
  // else {
  //   console.error(userProfile);
  //   res.status(500).send('Could not fetch user profile data.');
  // }
};

const handler = connect().use(authInstance.authorize()).get(gatewayAuthHandler);

export default handler;
