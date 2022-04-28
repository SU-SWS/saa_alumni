import connect from 'next-connect';
import URLParse from 'url-parse';
import { authInstance } from '../../utilities/authInstance';

const handler = connect()
  // Return user to page they were previously on after logging in.
  .use((req, res, next) => {
    if (!req.query.final_destination) {
      const { referer } = req.headers;
      const { pathname } = URLParse(referer);
      req.query.final_destination = pathname;
    }
    next();
  })
  .use(authInstance.initiate());

export default handler;
