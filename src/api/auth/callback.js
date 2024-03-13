import connect from 'next-connect';
import { authInstance } from '../../utilities/authInstance';

const authHandler = connect()
  .use(authInstance.authenticate())
  .post((req, res) => {
    // Check to see that cookies were set and then adjust the SameSite attribute on the *-session
    // Cookies to Lax. On the redirect through the Edge Functions the cookies are not passed to it
    // and a redirect back to Stanford Pass happens. This causes an infinite loop of being returned
    // to Stanford Pass. By setting the SameSite attribute to Lax, the cookies are passed to the Edge
    // Functions and the redirect loop is avoided.
    // See the thread of comments at https://github.com/SU-SWS/saa_alumni/pull/820#pullrequestreview-1935373251
    const headers = res.getHeaders();
    if (headers['set-cookie']) {
      const laxCookies = headers['set-cookie'].map((cookie) => {
        if (cookie.startsWith('adapt-auth-session')) {
          // I chose to go with a string replace so that if anything else changes in the adapt-auth-sdk
          // package, this code won't undo it.
          return cookie.replace(/SameSite=Strict/g, 'SameSite=Lax');
        }
        return cookie;
      });
      res.setHeader('set-cookie', laxCookies);
    }

    const redirectUrl = req.samlRelayState.finalDestination || '/';
    res.redirect(redirectUrl);
  });

export default authHandler;
