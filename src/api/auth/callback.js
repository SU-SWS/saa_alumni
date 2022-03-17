import connect from 'next-connect';
import { authInstance } from '../../utilities/authInstance';

const authHandler = connect()
  .use(authInstance.authenticate())
  .post((req, res) => {
    const redirectUrl = req.samlRelayState.finalDestination || '/';
    res.redirect(redirectUrl);
  });

export default authHandler;
